// Pulls sourced facts for every country into src/data/countryFacts.json, which countriesData.ts
// merges over the generated profiles at load time.
//
//   npx tsx scripts/fetch-country-facts.ts            (reuses downloads cached in node_modules/.cache)
//   npx tsx scripts/fetch-country-facts.ts --refresh  (downloads everything again)
//
// Sources:
//   World Bank API         population, GDP, GDP per capita, life expectancy, urbanisation, military spend (SIPRI)
//   CIA World Factbook     climate, terrain, coastline, elevation extremes, median age, religions, languages,
//                          government type, national holiday, independence, industries, exports, conscription
//                          and the dossier details: internet domain, capital time zone, natural resources, rivers,
//                          trade partners, GDP by sector, airports, ports, railways, power sources, armed forces, organisations
//                          (via github.com/factbook/factbook.json)
//   Wikidata               currency, heads of state and government, motto, UN membership, alliances, UNESCO sites, calling code,
//                          driving side, Human Development Index
//   Global Firepower 2026  military rank, PwrIndx, personnel and equipment inventories
//
// Measured figures are refreshed for every country. Descriptive text only replaces the generic template
// text, so hand-written profiles keep their wording.
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { baseCountriesData } from '../src/data/countriesData';
import type { CountryData } from '../src/types';

const countryList = Object.values(baseCountriesData);

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, 'node_modules/.cache/atlas-facts');
const OUT = path.join(ROOT, 'src/data/countryFacts.json');
const REFRESH = process.argv.includes('--refresh');
const USER_AGENT = 'AtlasDataRefresh/1.0 (local dev data build)';

fs.mkdirSync(CACHE, { recursive: true });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function cached(file: string, fetcher: () => Promise<string>): Promise<string> {
  const full = path.join(CACHE, file);
  if (!REFRESH && fs.existsSync(full)) return fs.readFileSync(full, 'utf8');
  const body = await fetcher();
  fs.writeFileSync(full, body);
  return body;
}

async function get(url: string, headers: Record<string, string> = {}): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, ...headers } });
    if (res.ok) return res.text();
    if (attempt >= 4) throw new Error(`${res.status} ${url}`);
    await sleep(2000 * attempt);
  }
}

// ---------- text helpers ----------

const ENTITIES: Record<string, string> = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', ndash: '–', mdash: '—' };
const clean = (s = '') =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|[a-z]+);/gi, (m, e) => (e[0] === '#' ? String.fromCharCode(+e.slice(1)) : ENTITIES[e.toLowerCase()] ?? m))
    .replace(/\s+/g, ' ')
    .trim();
const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const titleCase = (s: string) => s.replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\b(Of|And|The|In)\b/g, (m) => m.toLowerCase());
const num = (s?: string | null) => {
  if (!s) return undefined;
  const m = s.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : undefined;
};
const shorten = (s: string, max = 220) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const at = Math.max(cut.lastIndexOf('; '), cut.lastIndexOf(', '));
  return (at > 80 ? cut.slice(0, at) : cut.slice(0, cut.lastIndexOf(' '))).trim();
};
const dropNotes = (s: string) => s.replace(/[;,]?\s*\bnote( \d+)?\s*[:-].*$/i, '').trim();
const round = (n: number, digits = 1) => Math.round(n * 10 ** digits) / 10 ** digits;
const dropYear = (s: string) => s.replace(/\s*\((\d{4}( est\.)?|est\.)\)\s*$/i, '').trim();

// ---------- World Bank ----------

const WB_INDICATORS = {
  population: 'SP.POP.TOTL',
  gdp: 'NY.GDP.MKTP.CD',
  gdpPerCapita: 'NY.GDP.PCAP.CD',
  lifeExpectancy: 'SP.DYN.LE00.IN',
  urban: 'SP.URB.TOTL.IN.ZS',
  militaryUSD: 'MS.MIL.XPND.CD',
  militaryPctGDP: 'MS.MIL.XPND.GD.ZS',
} as const;
type WbKey = keyof typeof WB_INDICATORS;

async function loadWorldBank() {
  const out: Record<string, Partial<Record<WbKey, { value: number; year: number }>>> = {};
  for (const [key, ind] of Object.entries(WB_INDICATORS) as [WbKey, string][]) {
    const body = await cached(`wb-${ind}.json`, () =>
      get(`https://api.worldbank.org/v2/country/all/indicator/${ind}?format=json&mrnev=1&per_page=400`),
    );
    for (const row of JSON.parse(body)[1] || []) {
      if (row.value == null || !row.countryiso3code) continue;
      (out[row.countryiso3code] ||= {})[key] = { value: row.value, year: Number(row.date) };
    }
  }
  return out;
}

// ---------- Wikidata ----------

async function sparql(name: string, query: string): Promise<any[]> {
  const body = await cached(`wd-${name}.json`, () =>
    get(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, { Accept: 'application/sparql-results+json' }),
  );
  return JSON.parse(body).results.bindings.map((b: any) =>
    Object.fromEntries(Object.entries(b).map(([k, v]: [string, any]) => [k, v.value])),
  );
}

const NOT_DEPRECATED = 'wikibase:rank ?rank . FILTER(?rank != wikibase:DeprecatedRank)';
const CURRENT = 'FILTER NOT EXISTS { ?st pq:P582 ?end }';

// Membership labels from Wikidata, mapped to the short names the app already uses
const ALLIANCES: Record<string, string> = {
  'North Atlantic Treaty Organization': 'NATO',
  'European Union': 'European Union',
  'Collective Security Treaty Organization': 'CSTO',
  'Commonwealth of Independent States': 'CIS',
  'Shanghai Cooperation Organisation': 'SCO',
  BRICS: 'BRICS',
  'African Union': 'African Union',
  'Association of Southeast Asian Nations': 'ASEAN',
  'Arab League': 'Arab League',
  'Gulf Cooperation Council': 'GCC',
  'Organization of American States': 'OAS',
  'Commonwealth of Nations': 'Commonwealth',
};

// Dresden Elbe Valley (2009), Liverpool Maritime Mercantile City (2021), Arabian Oryx Sanctuary (2007)
const DELISTED_SITES = new Set(['1156', '1150', '654']);

async function loadWikidata() {
  // One query at a time: the endpoint rate-limits parallel requests
  const queries: (() => Promise<any[]>)[] = [
    () => sparql('fips', `SELECT ?iso ?fips WHERE { ?c wdt:P297 ?iso; wdt:P901 ?fips . }`),
    () => sparql(
      'currency',
      `SELECT ?iso ?code ?name ?symbol ?rank WHERE {
        ?c wdt:P297 ?iso; p:P38 ?st . ?st ps:P38 ?cur; ${NOT_DEPRECATED} ${CURRENT}
        ?cur wdt:P498 ?code . OPTIONAL { ?cur rdfs:label ?name . FILTER(LANG(?name) = "en") }
        OPTIONAL { ?cur wdt:P5061 ?symbol }
      }`,
    ),
    () => sparql('motto-current', `SELECT ?iso ?motto (LANG(?motto) AS ?lang) WHERE { ?c wdt:P297 ?iso; p:P1451 ?st . ?st ps:P1451 ?motto; wikibase:rank ?rank . FILTER(?rank != wikibase:DeprecatedRank) FILTER NOT EXISTS { ?st pq:P3831 ?role } FILTER NOT EXISTS { ?st pq:P582 ?end } }`),
    () => sparql('official-langs', `SELECT ?iso ?code WHERE { ?c wdt:P297 ?iso; wdt:P37 ?l . ?l wdt:P218 ?code . }`),
    () => sparql('un', `SELECT ?iso ?start WHERE { ?c wdt:P297 ?iso; p:P463 ?st . ?st ps:P463 wd:Q1065; pq:P580 ?start . }`),
    () => sparql(
      'memberships',
      `SELECT DISTINCT ?iso ?orgLabel WHERE {
        ?c wdt:P297 ?iso; p:P463 ?st . ?st ps:P463 ?org; ${NOT_DEPRECATED} ${CURRENT}
        ?org rdfs:label ?orgLabel . FILTER(LANG(?orgLabel) = "en")
        FILTER(?orgLabel IN (${Object.keys(ALLIANCES).map((l) => `"${l}"@en`).join(', ')}))
      }`,
    ),
    () => sparql(
      'leaders',
      `SELECT ?iso ?role ?person ?start WHERE {
        ?c wdt:P297 ?iso .
        VALUES (?prop ?role) { (p:P35 "hos") (p:P6 "hog") }
        ?c ?prop ?st . ?st ${NOT_DEPRECATED} ${CURRENT}
        { ?st ps:P35 ?p } UNION { ?st ps:P6 ?p }
        ?p rdfs:label ?person . FILTER(LANG(?person) = "en")
        OPTIONAL { ?st pq:P580 ?start }
      }`,
    ),
    () => sparql(
      'heritage',
      // Fixed join order: the planner otherwise times out on this one
      `SELECT ?iso ?whs ?label ?links WHERE {
        hint:Query hint:optimizer "None" .
        ?item wdt:P757 ?whs . ?item wdt:P17 ?c . ?c wdt:P297 ?iso . ?item wikibase:sitelinks ?links .
        OPTIONAL { ?item rdfs:label ?label . FILTER(LANG(?label) = "en") }
      }`,
    ),
    () => sparql('calling-code', `SELECT ?iso ?code WHERE { ?c wdt:P297 ?iso; p:P474 ?st . ?st ps:P474 ?code; ${NOT_DEPRECATED} ${CURRENT} }`),
    () => sparql(
      'driving-side',
      `SELECT ?iso ?side WHERE { ?c wdt:P297 ?iso; p:P1622 ?st . ?st ps:P1622 ?s; ${NOT_DEPRECATED} ${CURRENT}
        ?s rdfs:label ?side . FILTER(LANG(?side) = "en") }`,
    ),
    () => sparql('hdi', `SELECT ?iso ?hdi ?time WHERE { ?c wdt:P297 ?iso; p:P1081 ?st . ?st ps:P1081 ?hdi; pq:P585 ?time; ${NOT_DEPRECATED} }`),
  ];
  const results: any[][] = [];
  for (const query of queries) results.push(await query());
  const [fips, currencies, mottos, officialLangs, un, memberships, leaders, heritage, callingCodes, driving, hdi] = results;

  const byIso = <T>(rows: any[], fn: (acc: T | undefined, row: any) => T) => {
    const out: Record<string, T> = {};
    for (const r of rows) out[r.iso] = fn(out[r.iso], r);
    return out;
  };

  const shortestSymbol = (a?: string, b?: string) => (!a ? b : !b ? a : b.length < a.length ? b : a);
  const currencyRows = byIso<any[]>(currencies, (acc = [], r) => [...acc, r]);
  const currency: Record<string, { name: string; code: string; symbol?: string }> = {};
  for (const [iso, rows] of Object.entries(currencyRows)) {
    // Preferred statement first, then a local currency over the US dollar used alongside it
    const pick =
      rows.find((r) => r.rank.endsWith('PreferredRank')) ||
      rows.find((r) => r.code !== 'USD') ||
      rows[0];
    const symbol = rows.filter((r) => r.code === pick.code).reduce<string | undefined>((s, r) => shortestSymbol(s, r.symbol), undefined);
    currency[iso] = { name: pick.name ? titleCase(pick.name) : '', code: pick.code, symbol };
  }

  const leaderRows = byIso<Record<string, any[]>>(leaders, (acc = {}, r) => ({ ...acc, [r.role]: [...(acc[r.role] || []), r] }));
  const latest = (rows?: any[]) =>
    rows?.slice().sort((a, b) => (b.start || '').localeCompare(a.start || ''))[0]?.person as string | undefined;

  // UNESCO IDs carry extension suffixes (3bis, 532ter) and component numbers (1363-001); the leading
  // number is the property. Sites removed from the list are left out.
  const sites = byIso<Map<string, { label: string; links: number; whole: boolean }>>(heritage, (acc = new Map(), r) => {
    const id = String(r.whs).match(/^\d+/)?.[0];
    if (!id || DELISTED_SITES.has(id) || !r.label) return acc;
    const prev = acc.get(id);
    // Prefer the item for the whole property over a component, then the best-known one
    const whole = !String(r.whs).includes('-');
    const links = Number(r.links);
    if (!prev || (whole && !prev.whole) || (whole === prev.whole && links > prev.links)) acc.set(id, { label: r.label, links, whole });
    return acc;
  });

  return {
    fips: byIso<string>(fips, (acc, r) => acc || String(r.fips).toLowerCase()),
    currency,
    motto: (() => {
      // English first (the app is in English), else an official language; tourism slogans, past mottos and other-language translations are skipped
      const official = byIso<string[]>(officialLangs, (acc = [], r) => [...acc, r.code]);
      const options = byIso<any[]>(mottos, (acc = [], r) => [...acc, r]);
      return Object.fromEntries(
        Object.entries(options).map(([iso, rows]) => {
          const pick = rows.find((r) => r.lang === 'en') || rows.find((r) => official[iso]?.includes(r.lang));
          return [iso, pick?.motto as string | undefined];
        }),
      );
    })(),
    unSince: byIso<number>(un, (acc, r) => Math.min(acc ?? 9999, Number(String(r.start).slice(0, 4)))),
    alliances: byIso<string[]>(memberships, (acc = [], r) => [...acc, ALLIANCES[r.orgLabel]]),
    headOfState: Object.fromEntries(Object.entries(leaderRows).map(([iso, r]) => [iso, latest(r.hos)])),
    headOfGovernment: Object.fromEntries(Object.entries(leaderRows).map(([iso, r]) => [iso, latest(r.hog)])),
    leaderConflicts: Object.entries(leaderRows)
      .flatMap(([iso, r]) => (['hos', 'hog'] as const).filter((k) => (r[k]?.length || 0) > 1).map((k) => `${iso} ${k}: ${r[k].map((x: any) => `${x.person} (${(x.start || '?').slice(0, 10)})`).join(', ')}`)),
    heritage: Object.fromEntries(
      Object.entries(sites).map(([iso, m]) => [
        iso,
        { count: m.size, top: [...m.values()].sort((a, b) => b.links - a.links).slice(0, 4).map((s) => s.label) },
      ]),
    ),
    // "+1", or "+1 268" style codes for NANP members; several codes are joined
    callingCode: byIso<string>(callingCodes, (acc, r) => {
      const code = String(r.code).trim().replace(/^(\d)/, '+$1').replace(/^\+1-?(\d{3})$/, '+1 $1');
      // a dialling prefix through another country's code ("+390549" for San Marino via Italy) is not a country code
      if (/^\+\d{5,}$/.test(code)) return acc!;
      return acc && !acc.split(', ').includes(code) ? `${acc}, ${code}` : code;
    }),
    // Countries with one driving side only; a split answer (left and right) is left out
    drivingSide: Object.fromEntries(
      Object.entries(byIso<Set<string>>(driving, (acc = new Set(), r) => acc.add(/left/i.test(r.side) ? 'Left' : 'Right')))
        .filter(([, sides]) => sides.size === 1)
        .map(([iso, sides]) => [iso, [...sides][0] as 'Left' | 'Right']),
    ),
    hdi: byIso<{ score: number; year: number }>(hdi, (acc, r) => {
      const year = Number(String(r.time).slice(0, 4));
      return !acc || year > acc.year ? { score: round(Number(r.hdi), 3), year } : acc;
    }),
  };
}

// ---------- CIA World Factbook ----------

function loadFactbook(fipsByIso: Record<string, string>) {
  const dir = path.join(CACHE, 'factbook');
  if (REFRESH && fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  if (!fs.existsSync(dir)) execSync(`git clone -q --depth 1 https://github.com/factbook/factbook.json.git "${dir}"`);

  const files: Record<string, string> = {};
  const byTld: Record<string, string> = {};
  for (const region of fs.readdirSync(dir)) {
    const regionDir = path.join(dir, region);
    if (!fs.statSync(regionDir).isDirectory() || region.startsWith('.') || region === 'meta') continue;
    for (const f of fs.readdirSync(regionDir).filter((f) => f.endsWith('.json'))) {
      const full = path.join(regionDir, f);
      files[f.replace('.json', '')] = full;
      const tld = clean(JSON.parse(fs.readFileSync(full, 'utf8'))?.Communications?.['Internet country code']?.text).match(/\.([a-z]{2})\b/);
      if (tld) byTld[tld[1] === 'uk' ? 'GB' : tld[1].toUpperCase()] ||= full;
    }
  }
  return (iso: string, fipsOverride?: string): any | null => {
    const file = files[fipsOverride || fipsByIso[iso] || ''] || byTld[iso];
    return file ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  };
}

function parseList(text: string, limit: number) {
  return dropNotes(dropYear(clean(text)))
    .split(/,(?![^(]*\))|;/)
    .map((s) => capitalize(s.trim().replace(/\.$/, '')))
    .filter((s) => s && !/^(and )?other/i.test(s) && s.length < 60)
    .slice(0, limit);
}

function parseReligions(text: string) {
  const items = dropNotes(clean(text))
    .replace(/\(\d{4}( est\.)?\)/g, '')
    .split(/,(?![^(]*\))/)
    .map((s) => s.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const item of items) {
    const m = item.match(/^(.*?)\s+(<?\d+(?:\.\d+)?(?:\s*[-–]\s*\(?\d+(?:\.\d+)?)?%)/);
    const name = capitalize((m ? m[1] : item).replace(/\s*\(.*?\)\s*/g, ' ').trim());
    if (!name || /^(other|unspecified|none|no religion|don't know|no answer)/i.test(name)) {
      if (m && /^(none|no religion|unaffiliated)/i.test(name)) out.push(`Unaffiliated (${m[2]})`);
      continue;
    }
    out.push(m ? `${name} (${m[2]})` : name);
    if (out.length >= 4) break;
  }
  return out;
}

function parseLanguages(text: string) {
  const items = dropNotes(clean(text))
    .replace(/\(\d{4}( est\.)?\)/g, '')
    .split(/[,;](?![^(]*\))/)
    .map((s) => s.trim())
    .filter(Boolean);
  const name = (s: string) => capitalize(s.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+[<\d][\d.,%<\s]*$/, '').trim());
  const official = items.filter((s) => /\bofficial\b/i.test(s) && !/^(other|unspecified)/i.test(s)).map(name);
  const list = (official.length ? official : items.slice(0, 3).map(name)).filter((s) => s && !/^(other|unspecified)/i.test(s));
  return [...new Set(list)].slice(0, 6);
}

function parseElevation(text?: string) {
  const t = clean(text);
  const m = t.match(/^(.*?)\s+(-?[\d,.]+)\s*(m\b|$)/);
  return m ? { name: m[1].replace(/\s*\(.*?\)$/, '').trim(), elevationM: round(num(m[2])!) } : undefined;
}

function parseFoundation(text: string) {
  const t = clean(text);
  if (/^none\b/i.test(t)) return undefined;
  const first = t.split(/;\s*/)[0];
  const bc = first.match(/(\d[\d,]*)\s*B\.?C/i);
  const year = bc ? -num(bc[1])! : num(first.match(/\b(\d{3,4})\b/)?.[1]);
  if (year === undefined) return undefined;
  return { year, event: capitalize(shorten(first, 160)) };
}

// "previous 1919; latest drafted ... 1948, approved 12 May 1949, ... entered into force 24 May 1949" -> 1949
function parseConstitutionYear(text: string): number | null {
  const t = clean(text);
  if (/unwritten|no single constitution/i.test(t)) return null;
  const latest = t.includes('latest') ? t.slice(t.indexOf('latest')) : t;
  const inForce = latest.match(/(?:into force|effective|enacted)[^;]{0,25}?\b(1[5-9]\d\d|20\d\d)\b/);
  const year = Number(inForce?.[1] ?? latest.match(/\b(1[5-9]\d\d|20\d\d)\b/)?.[1]);
  return year || null;
}

function parseConscription(text: string, forces: string): CountryData['military']['conscription'] | undefined {
  const t = `${clean(text)} ${clean(forces)}`.toLowerCase();
  if (/no regular (military|armed)|no (military|armed forces)|has no military|defen[cs]e is the responsibility/.test(t)) return 'Abolished / None';
  if (/selective/.test(t)) return 'Selective / Hybrid';
  if (/(compulsory|mandatory|obligatory)/.test(t) && !/(conscription|compulsory service) (was )?(ended|abolished|suspended)/.test(t)) return 'Mandatory';
  if (/conscript/.test(t) && !/(ended|abolished|suspended|no conscription)/.test(t)) return 'Mandatory';
  if (/voluntary/.test(t)) return 'Voluntary';
  return undefined;
}

const stripParens = (s: string) => {
  let out = s;
  while (/\([^()]*\)/.test(out)) out = out.replace(/\s*\([^()]*\)/g, '');
  return out.replace(/[()]/g, '').trim();
};

// "Amazon river mouth (shared with Peru [s]) - 6,400 km; Tocantins - 3,650 km" -> ["Amazon (6,400 km)", "Tocantins (3,650 km)"]
function parseRivers(text: string) {
  return clean(text)
    .replace(/\s*note:.*$/i, '')
    .split(/;\s*/)
    .map((part) => {
      const m = part.match(/^(.*?)\s+-\s+([\d,.]+)\s*km/);
      if (!m) return '';
      // the name ends where the "river source (shared with ... [m])" annotation starts
      const name = m[1]
        .split(/\s*(?:\((?:mouth\s+)?shared|\b(?:river\s+)?(?:source|mouth)\b|\[|,)/i)[0]
        .replace(/\s+river$/i, '')
        .trim();
      return name ? `${name} (${m[2]} km)` : '';
    })
    .filter(Boolean)
    .slice(0, 6);
}

// "USA 19%, China 18%, Taiwan 6% (2023)" -> ["USA 19%", "China 18%", "Taiwan 6%"]; prose answers are dropped
function parsePartners(text: string) {
  const items = dropYear(dropNotes(clean(text))).split(/,\s*/).map((s) => s.trim());
  return items.every((s) => /^\S.*\s<?\d+(\.\d+)?%$/.test(s)) ? items.slice(0, 5) : [];
}

function parseSectors(sectors: any) {
  const pct = (k: string) => num(clean(sectors?.[k]?.text).match(/^-?[\d.]+(?=%)/)?.[0]);
  const [agriculture, industry, services] = ['agriculture', 'industry', 'services'].map(pct);
  if (agriculture === undefined || industry === undefined || services === undefined) return undefined;
  const year = num(clean(sectors.services.text).match(/\((\d{4})/)?.[1]);
  return { agriculture, industry, services, ...(year ? { year } : {}) };
}

// "Japan Self-Defense Force (JSDF): Ground Self-Defense Force (...), Maritime ... (2025)" -> the named forces.
// Only the first paragraph: the ones after it list police and interior-ministry forces.
function parseForces(text = '') {
  const t = stripParens(dropNotes(clean(text.split(/<br\s*\/?>/i)[0])));
  if (!t || /\bno (regular )?(military|armed forces)\b/i.test(t)) return [];
  return [
    ...new Set(
      t
        .split(/;\s*/)
        .flatMap((seg) => {
          const body = seg.includes(':') ? seg.slice(seg.indexOf(':') + 1) : seg;
          return body.split(/,\s*/);
        })
        // "Ground Forces or People's Liberation Army Army" -> "Ground Forces"
        .map((s) => s.trim().replace(/\.$/, '').replace(/\s+or\s+.*$/, ''))
        .filter((s) => s.length > 2 && s.length < 70 && /^[A-Z]/.test(s) && !/^(includes|the |note)/i.test(s)),
    ),
  ].slice(0, 8);
}

// Full members only, of the groupings a reader would recognise
const ORGANIZATIONS: Record<string, string> = {
  WTO: 'World Trade Organization (WTO)', IMF: 'International Monetary Fund (IMF)',
  NATO: 'NATO', AU: 'African Union', ASEAN: 'ASEAN', OAS: 'Organization of American States', LAS: 'Arab League',
  GCC: 'Gulf Cooperation Council', C: 'Commonwealth of Nations', 'G-20': 'G20',
  CIS: 'Commonwealth of Independent States', CSTO: 'CSTO',
  Mercosur: 'Mercosur', ECOWAS: 'ECOWAS', SADC: 'Southern African Development Community', EAC: 'East African Community',
  CARICOM: 'CARICOM', APEC: 'APEC', PIF: 'Pacific Islands Forum', OSCE: 'OSCE',
  OIC: 'Organisation of Islamic Cooperation', NAM: 'Non-Aligned Movement', OIF: 'Francophonie', CPLP: 'Community of Portuguese Language Countries',
};

// The Factbook lists are out of date for these (the UK in the EU, Qatar in OPEC, India in the OECD, Russia in the
// Council of Europe, no Indonesia in BRICS or Belarus in the SCO), so current membership is listed here (2026)
const CURRENT_MEMBERS: Record<string, string[]> = {
  'Council of Europe': 'AL AD AM AT AZ BE BA BG HR CY CZ DK EE FI FR GE DE GR HU IS IE IT LV LI LT LU MT MD MC ME NL MK NO PL PT RO SM RS SK SI ES SE CH TR UA GB'.split(' '),
  BRICS: 'BR RU IN CN ZA EG ET IR AE ID'.split(' '),
  'Shanghai Cooperation Organisation': 'CN IN IR KZ KG PK RU TJ UZ BY'.split(' '),
  'European Union': 'AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE'.split(' '),
  OECD: 'AU AT BE CA CL CO CR CZ DK EE FI FR DE GR HU IS IE IL IT JP KR LV LT LU MX NL NZ NO PL PT SK SI ES SE CH TR GB US'.split(' '),
  OPEC: 'DZ CG GQ GA IR IQ KW LY NG SA AE VE'.split(' '),
  G7: 'CA FR DE IT JP GB US'.split(' '),
};

function parseOrganizations(text: string) {
  const items = dropNotes(clean(text)).split(/,\s*(?![^(]*\))/).map((s) => s.trim());
  return items.filter((s) => ORGANIZATIONS[s]).map((s) => ORGANIZATIONS[s]);
}

function factbookFacts(fb: any) {
  const geo = fb.Geography || {};
  const ppl = fb['People and Society'] || {};
  const gov = fb.Government || {};
  const eco = fb.Economy || {};
  const mil = fb['Military and Security'] || {};
  const comms = fb.Communications || {};
  const transport = fb.Transportation || {};
  const power = fb.Energy?.['Electricity generation sources'];
  const notes = clean(geo['Geography - note']?.text)
    .split(/note(?: \d+)?:/i)
    .map((s) => capitalize(s.trim()))
    .filter((s) => s.length > 30)
    .map((s) => shorten(s, 240).replace(/[;,]$/, '') + (/[.!?]$/.test(s) ? '' : '.'));

  const gdpText = clean(eco['GDP (official exchange rate)']?.text);
  const gdpScale = /trillion/.test(gdpText) ? 1000 : /billion/.test(gdpText) ? 1 : /million/.test(gdpText) ? 0.001 : 0;

  return {
    climate: geo.Climate?.text && capitalize(shorten(dropNotes(clean(geo.Climate.text)))),
    terrain: geo.Terrain?.text && capitalize(shorten(dropNotes(clean(geo.Terrain.text)))),
    coastlineKm: geo.Coastline?.text !== undefined ? num(clean(geo.Coastline.text)) : undefined,
    highestPoint: parseElevation(geo.Elevation?.['highest point']?.text),
    lowestPoint: parseElevation(geo.Elevation?.['lowest point']?.text),
    medianAge: num(clean(ppl['Median age']?.total?.text)),
    population: num(clean(ppl.Population?.total?.text ?? ppl.Population?.text)),
    lifeExpectancy: num(clean(ppl['Life expectancy at birth']?.['total population']?.text)),
    urban: num(clean(ppl.Urbanization?.['urban population']?.text)),
    gdpBillions: gdpScale ? num(gdpText)! * gdpScale : undefined,
    religions: parseReligions(ppl.Religions?.Religions?.text ?? ppl.Religions?.text ?? ''),
    // "euros (EUR) per US dollar -"
    currency: clean(eco['Exchange rates']?.['Currency']?.text ?? eco['Exchange rates']?.text).match(/^([a-z' ]+?)\s*\(([A-Z]{3})\)/i),
    languages: parseLanguages(ppl.Languages?.Languages?.text ?? ppl.Languages?.text ?? ''),
    governmentType: gov['Government type']?.text && titleCase(dropNotes(clean(gov['Government type'].text)).replace(/\.$/, '')),
    nationalDay: gov['National holiday']?.text && shorten(dropNotes(clean(gov['National holiday'].text)).split(/;\s*/)[0], 120),
    foundation: gov.Independence?.text ? parseFoundation(gov.Independence.text) : undefined,
    constitutionYear: gov.Constitution?.history?.text ? parseConstitutionYear(gov.Constitution.history.text) : null,
    industries: eco.Industries?.text ? parseList(eco.Industries.text, 5) : [],
    exports: eco['Exports - commodities']?.text ? parseList(eco['Exports - commodities'].text, 5) : [],
    activePersonnel: num(clean(mil['Military and security service personnel strengths']?.text).match(/[\d,]{3,}/)?.[0]),
    conscription: parseConscription(mil['Military service age and obligation']?.text || '', mil['Military and security forces']?.text || ''),
    serviceObligation: mil['Military service age and obligation']?.text
      ? capitalize(shorten(dropYear(dropNotes(clean(mil['Military service age and obligation'].text)).replace(/\s*\(\s*$/, '')), 260))
      : undefined,
    noMilitary: /no regular (military|armed)|has no (military|armed)|defen[cs]e is the responsibility/i.test(clean(mil['Military and security forces']?.text)),
    notes,
    details: {
      tld: clean(comms['Internet country code']?.text).match(/^\.[a-z]{2}\b/)?.[0],
      // "UTC+5.5" -> "UTC+5:30"
      timeZone: clean(gov.Capital?.['time difference']?.text)
        .match(/^UTC\s?[+-]?\s?[\d:.]*/)?.[0]
        .replace(/\s/g, '')
        .replace(/^UTC0$/, 'UTC±0')
        .replace(/\.(\d+)$/, (_, frac) => `:${String(Math.round(Number(`0.${frac}`) * 60)).padStart(2, '0')}`),
      timeZoneNote: gov.Capital?.['time zone note']?.text ? capitalize(shorten(clean(gov.Capital['time zone note'].text), 160)) : undefined,
      naturalResources: geo['Natural resources']?.text ? parseList(geo['Natural resources'].text, 8).map((s) => capitalize(s.replace(/^and /i, ''))) : [],
      exportPartners: parsePartners(eco['Exports - partners']?.text),
      importPartners: parsePartners(eco['Imports - partners']?.text),
      majorRivers: parseRivers(geo['Major rivers (by length in km)']?.text),
      gdpBySector: parseSectors(eco['GDP - composition, by sector of origin']),
      airports: num(clean(transport.Airports?.text ?? transport.Airports?.total?.text)),
      keyPorts: transport.Ports?.['key ports']?.text ? parseList(transport.Ports['key ports'].text, 6) : [],
      railwaysKm: num(clean(transport.Railways?.total?.text)),
      nonFossilPowerPercent: power?.['fossil fuels']?.text ? round(100 - num(clean(power['fossil fuels'].text))!) : undefined,
      armedForces: parseForces(mil['Military and security forces']?.text),
      organizations: parseOrganizations(gov['International organization participation']?.text),
    },
  };
}

// ---------- Global Firepower ----------

const GFP_SLUG_TO_ISO: Record<string, string> = {
  beliz: 'BZ', 'bosnia-and-herzegovina': 'BA', 'czech-republic': 'CZ', 'democratic-republic-of-the-congo': 'CD',
  'ivory-coast': 'CI', 'republic-of-the-congo': 'CG', 'north-korea': 'KP', 'south-korea': 'KR', 'north-macedonia': 'MK',
  'united-states-of-america': 'US', 'united-kingdom': 'GB', 'united-arab-emirates': 'AE', 'south-sudan': 'SS', kosovo: 'XK',
  laos: 'LA', russia: 'RU', syria: 'SY', iran: 'IR', vietnam: 'VN', taiwan: 'TW', moldova: 'MD', tanzania: 'TZ', bolivia: 'BO',
  venezuela: 'VE',
};

async function loadGfp(nameToIso: (name: string) => string | undefined) {
  const listing = await cached('gfp-listing.html', () => get('https://www.globalfirepower.com/countries-listing.php'));
  const slugs = [...new Set([...listing.matchAll(/country_id=([a-z-]+)/g)].map((m) => m[1]))];
  const out: Record<string, any> = {};
  const unmatched: string[] = [];
  for (const slug of slugs) {
    const iso = GFP_SLUG_TO_ISO[slug] || nameToIso(slug.replace(/-/g, ' '));
    if (!iso) {
      unmatched.push(slug);
      continue;
    }
    const html = await cached(`gfp-${slug}.html`, async () => {
      await sleep(800); // be gentle with the site
      return get(`https://www.globalfirepower.com/country-military-strength-detail.php?country_id=${slug}`);
    });
    const lines = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .split(/<[^>]+>/)
      .map((l) => clean(l))
      .filter(Boolean);
    const after = (label: string, re = /^(?:Stock:\s*)?\$?([\d,]+)/) => {
      const i = lines.findIndex((l) => l === label);
      if (i < 0) return undefined;
      for (const l of lines.slice(i + 1, i + 4)) {
        const m = l.match(re);
        if (m) return num(m[1]);
      }
      return undefined;
    };
    const text = lines.join(' ');
    const fighters = after('Fighters:') ?? 0;
    const attack = after('Attack Types:') ?? 0;
    out[iso] = {
      globalRank: num(text.match(/ranked (\d+) of \d+/i)?.[1]),
      powerIndex: num(text.match(/PwrIndx\* score of\s*([\d.]+)/)?.[1]),
      activePersonnel: after('Active Personnel'),
      reservePersonnel: after('Reserve Personnel'),
      paramilitary: after('Paramilitary'),
      totalAircraft: after('Aircraft Total:'),
      combatAircraft: fighters + attack,
      attackHelicopters: after('Attack Helicopters:'),
      tanks: after('Tanks:'),
      armoredVehicles: after('Vehicles:'),
      navalFleetTotal: after('Total Assets:'),
      aircraftCarriers: after('Aircraft Carriers:'),
      submarines: after('Submarines:'),
      destroyersFrigates: (after('Destroyers:') ?? 0) + (after('Frigates:') ?? 0),
      budgetUSD: after('Defense Budget:'),
      inventory: {
        availableManpower: after('Available Manpower'),
        fitForService: after('Fit-for-Service'),
        fighters,
        attackAircraft: attack,
        transports: after('Transports (Fixed-Wing):'),
        trainers: after('Trainers:'),
        specialMission: after('Special-Mission:'),
        tankers: after('Tanker Fleet:'),
        helicopters: after('Helicopters:'),
        selfPropelledArtillery: after('Self-Propelled Artillery:'),
        towedArtillery: after('Towed Artillery:'),
        rocketArtillery: after('MLRS (Rocket Artillery):'),
        helicopterCarriers: after('Helicopter Carriers:'),
        destroyers: after('Destroyers:'),
        frigates: after('Frigates:'),
        corvettes: after('Corvettes:'),
        patrolVessels: after('Patrol Vessels:'),
        mineWarfare: after('Mine Warfare:'),
      },
    };
  }
  return { byIso: out, unmatched };
}

// ---------- assemble ----------

// Fixed facts that no source above covers cleanly
const NUCLEAR: Record<string, { status: CountryData['military']['nuclearStatus']; warheads: number }> = {
  // Federation of American Scientists, Status of World Nuclear Forces 2025 (total inventories)
  PK: { status: 'Declared Nuclear State', warheads: 170 },
  KP: { status: 'Declared Nuclear State', warheads: 50 },
  // NATO nuclear sharing hosts
  DE: { status: 'Nuclear Sharing / NATO', warheads: 0 },
  IT: { status: 'Nuclear Sharing / NATO', warheads: 0 },
  NL: { status: 'Nuclear Sharing / NATO', warheads: 0 },
  BE: { status: 'Nuclear Sharing / NATO', warheads: 0 },
};
// Wikidata lists an outdated or ambiguous current holder for these
const LEADER_OVERRIDES: Record<string, { hos?: string; hog?: string }> = {
  WS: { hog: "La'auli Leuatea Schmidt" },
  TH: { hog: 'Anutin Charnvirakul' },
  MM: { hos: 'Min Aung Hlaing', hog: 'Min Aung Hlaing' },
  MX: { hos: 'Claudia Sheinbaum', hog: 'Claudia Sheinbaum' },
  GW: { hos: 'Horta Inta-A Na Man', hog: 'Ilídio Vieira Té' },
  // Dependent territories: the sovereign's head of state, and the local head of government
  GS: { hos: 'Charles III', hog: 'Alison Blake (Commissioner)' },
  FK: { hos: 'Charles III', hog: 'Alison Blake (Governor)' },
  BM: { hos: 'Charles III' },
  MS: { hos: 'Charles III' },
  SX: { hog: 'Luc Mercelina' },
  AW: { hog: 'Mike Eman' },
  JE: { hog: 'Lyndon Farnham' },
  IM: { hog: 'Chris Thomas' },
  AX: { hos: 'Alexander Stubb (President of Finland)', hog: 'Katrin Sjögren' },
  PF: { hos: 'Emmanuel Macron', hog: 'Moetai Brotherson' },
  TF: { hos: 'Emmanuel Macron', hog: 'Prefect & Administrator Superior (appointed by France)' },
  GU: { hos: 'Donald Trump' },
  HM: { hos: 'Charles III', hog: 'Administered by the Australian Government' },
  HK: { hos: 'Xi Jinping (President of China)' },
  MO: { hos: 'Xi Jinping (President of China)' },
  NC: { hos: 'Emmanuel Macron', hog: 'Alcide Ponga' },
  NF: { hos: 'Charles III', hog: 'Administrator (appointed by Australia)' },
  MP: { hos: 'Donald Trump', hog: 'David M. Apatang' },
  PN: { hos: 'Charles III', hog: 'Simon Young (Mayor)' },
  PR: { hos: 'Donald Trump' },
  BL: { hos: 'Emmanuel Macron', hog: 'Xavier Lédée' },
  SH: { hos: 'Charles III', hog: 'Nigel Phillips (Governor)' },
  AI: { hos: 'Charles III', hog: 'Cora Richardson-Hodge' },
  MF: { hos: 'Emmanuel Macron', hog: 'Louis Mussington' },
  PM: { hos: 'Emmanuel Macron', hog: 'Bernard Briand' },
  EH: { hos: 'Disputed (Morocco / Sahrawi Arab Democratic Republic)', hog: 'Disputed (Morocco / Sahrawi Arab Democratic Republic)' },
  VI: { hos: 'Donald Trump' },
  WF: { hos: 'Emmanuel Macron', hog: 'Administrator Superior (appointed by France)' },
  AS: { hos: 'Donald Trump', hog: 'Pula Nikolao Pula (Governor)' },
  IO: { hos: 'Charles III', hog: 'Commissioner (appointed by the UK)' },
  VG: { hos: 'Charles III', hog: 'Natalio Wheatley' },
  AQ: { hos: 'None (governed by the Antarctic Treaty System)', hog: 'None (governed by the Antarctic Treaty System)' },
  SN: { hog: 'Ahmadou Al Aminou Lo' },
  SA: { hog: 'Mohammed bin Salman' },
  CH: { hos: 'Swiss Federal Council (2026 President: Guy Parmelin)' },
  MW: { hos: 'Peter Mutharika' },
  PS: { hog: 'Mohammad Mustafa' },
  TC: { hog: 'Washington Misick' },
  AD: { hos: 'Emmanuel Macron and Josep-Lluís Serrano Pentinat (Co-Princes)' },
  BA: { hos: 'Three-member Presidency (rotating chair)' },
  SM: { hos: 'Two Captains Regent (elected every six months)' },
};
const UNINHABITED = (languages: string[]) => ({
  demographics: { population: 0, densityPerKm2: 0, lifeExpectancy: 0, urbanPercentage: 0, medianAge: 0 },
  economy: { gdpNominalUSD: 0, gdpPerCapitaUSD: 0 },
  culture: { officialLanguages: languages, majorReligions: ['None (no permanent population)'] },
});
const NOT_MEASURED_GDP = { economy: { gdpNominalUSD: 0, gdpPerCapitaUSD: 0 } };
// Base profiles seeded these with "National Independence Day" / "Constitutional Democratic State"
const GOVERNANCE_FIXES: Record<string, { nationalDay?: string; governmentType?: string }> = {
  GS: { nationalDay: 'None (no permanent population)', governmentType: 'British Overseas Territory (no permanent population)' },
  AX: { nationalDay: 'Autonomy Day, 9 June (1922)', governmentType: 'Autonomous region of Finland (parliamentary)' },
  TF: { nationalDay: 'Bastille Day, 14 July (France)', governmentType: 'Overseas territory of France (no permanent population)' },
  PS: { nationalDay: 'Independence Day, 15 November (1988)', governmentType: 'Semi-presidential republic (partially recognised)' },
  HM: { nationalDay: 'Australia Day, 26 January', governmentType: 'External territory of Australia (no permanent population)' },
  VA: { nationalDay: 'Election of Pope Leo XIV, 8 May (2025)' },
  EH: { nationalDay: 'Disputed (SADR proclamation, 27 February 1976)' },
  TC: { nationalDay: 'Constitution Day, 30 August (1976)' },
  IO: { nationalDay: 'None (no permanent population)', governmentType: 'British Overseas Territory (no permanent population)' },
  AQ: { nationalDay: 'Antarctica Day, 1 December (1959 Treaty)' },
};

const MANUAL_FACTS: Record<string, Record<string, Record<string, unknown>>> = {
  GS: UNINHABITED(['English']),
  HM: UNINHABITED(['English']),
  TF: UNINHABITED(['French']),
  IO: UNINHABITED(['English']),
  AQ: { ...UNINHABITED([]), culture: { officialLanguages: [], majorReligions: ['None (no permanent population)'] } },
  // Wikidata keeps the Republic of China's 1945 UN seat, which passed to the PRC in 1971
  TW: { governance: { unMemberSince: 0 } },
  VN: { longevity: { foundationEvent: 'Legendary founding of Văn Lang by the Hùng kings (2879 BCE)', constitutionYear: 2013, ancientOrigin: null } },
  // Åland Statistics (ÅSUB), 2023
  AX: {
    demographics: { population: 30541, densityPerKm2: 19.6, lifeExpectancy: 0 },
    economy: { gdpNominalUSD: 1.8, gdpPerCapitaUSD: 59000 },
    geography: { highestPoint: { name: 'Orrdalsklint', elevationM: 129.1 } },
    culture: { officialLanguages: ['Swedish'], majorReligions: ['Evangelical Lutheran'] },
  },
  VA: { demographics: { lifeExpectancy: 0 }, ...NOT_MEASURED_GDP },
  NU: { demographics: { lifeExpectancy: 0 }, ...NOT_MEASURED_GDP },
  NF: { demographics: { lifeExpectancy: 0 }, ...NOT_MEASURED_GDP },
  PN: { demographics: { lifeExpectancy: 0 }, ...NOT_MEASURED_GDP },
  BL: { ...NOT_MEASURED_GDP, culture: { majorReligions: ['Roman Catholic'] } },
  SH: NOT_MEASURED_GDP,
  EH: NOT_MEASURED_GDP,
  WF: NOT_MEASURED_GDP,
  KN: { culture: { majorReligions: ['Anglican (16.6%)', 'Methodist (15.8%)', 'Pentecostal (10.8%)', 'Roman Catholic (5.9%)'] } },
};
// Factbook entries whose free text doesn't parse into a clean list
const LANGUAGE_OVERRIDES: Record<string, string[]> = {
  GQ: ['Spanish', 'French', 'Portuguese'],
  IQ: ['Arabic', 'Kurdish'],
  LR: ['English'],
  MX: ['Spanish'],
  MA: ['Arabic', 'Tamazight'],
  GG: ['English', 'French'],
  JE: ['English', 'French'],
};
const RELIGION_OVERRIDES: Record<string, string[]> = {
  CD: ['Roman Catholic (29.9%)', 'Protestant (26.7%)', 'Other Christian (36.5%)', 'Kimbanguist (2.8%)'],
  MG: ['Protestant (34%)', 'Roman Catholic (32.3%)', 'Other Christian (8.1%)', 'Unaffiliated (21.9%)'],
  AZ: ['Muslim (97.3%)', 'Christian (2.6%)'],
  BE: ['Roman Catholic (57.1%)', 'Muslim (6.8%)', 'Protestant (2.3%)', 'Unaffiliated (29.3%)'],
  AD: ['Roman Catholic (89.5%)', 'Unaffiliated (1.7%)'],
  SA: ['Sunni Muslim (85-90%)', 'Shia Muslim (10-12%)'],
  PS: ['Muslim (98-99%)', 'Christian (<1%)'],
  IS: ['Evangelical Lutheran (58.6%)', 'Roman Catholic (3.8%)', 'Other Christian', 'Unaffiliated (6.4%)'],
  SK: ['Roman Catholic (55.8%)', 'Lutheran (5.3%)', 'Greek Catholic (4%)', 'Unaffiliated (23.8%)'],
  BT: ['Buddhist (75.3%)', 'Hindu (22.1%)'],
  RS: ['Serbian Orthodox (81.1%)', 'Muslim (4.2%)', 'Roman Catholic (3.9%)'],
  PL: ['Roman Catholic (70.7%)', 'Unaffiliated (6.9%)'],
  CZ: ['Roman Catholic (7%)', 'Unaffiliated (47.8%)'],
};
// Mottos Wikidata is missing or has wrong
const MOTTO_OVERRIDES: Record<string, string> = {
  KE: 'Harambee (Let us all pull together)',
  EC: 'God, Homeland and Liberty',
  TZ: 'Freedom and Unity',
  GR: 'Freedom or Death',
  BG: 'Unity makes strength',
  CA: 'From sea to sea',
  ID: 'Unity in Diversity',
  KP: 'Powerful and Prosperous Nation',
  LU: 'We want to remain what we are',
  MC: "With God's help",
  NL: 'I will maintain',
  NI: 'In God We Trust',
  NO: 'All for Norway',
  PK: 'Faith, Unity, Discipline',
  PA: 'For the Benefit of the World',
  PG: 'Unity in diversity',
  PH: 'For God, People, Nature, and Country',
  ES: 'Further Beyond',
  UY: 'Liberty or Death',
  WS: 'Samoa is founded on God',
  BR: 'Order and Progress',
  AR: 'In Union and Liberty',
  AO: 'Virtue is stronger when united',
  AD: 'Virtue united is stronger',
  AM: 'One Nation, One Culture',
  KI: 'Health, Peace and Prosperity',
  FK: 'Desire the right',
  // Wikidata only has these in the local language or script
  KH: 'Nation, Religion, King',
  TH: 'Nation, Religion, King',
  GE: 'Strength is in unity',
  CZ: 'Truth prevails',
  GT: 'Grow Free and Fertile',
  HT: 'Unity makes strength',
  LV: 'For Fatherland and Freedom',
  LT: 'Let unity blossom',
  MA: 'God, Homeland, King',
  PR: 'John is his name',
  CR: 'Long live work and peace',
  ZA: 'Unity in diversity',
  SD: 'Victory is ours',
  TN: 'Freedom, Order, Justice',
  BN: "Always in service with God's guidance",
  BH: 'Our Bahrain',
  DZ: 'By the people and for the people',
  GU: '',
  PM: 'From the sea, work',
};
const NO_MILITARY_DATA = {
  globalRank: 146, powerIndex: 0, defenseBudgetUSD: 0, defenseBudgetPercentGDP: 0, activePersonnel: 0, reservePersonnel: 0, paramilitary: 0,
  totalAircraft: 0, combatAircraft: 0, attackHelicopters: 0, tanks: 0, armoredVehicles: 0, navalFleetTotal: 0,
  aircraftCarriers: 0, submarines: 0, destroyersFrigates: 0, tier: 'Minimal / Neutral', alliances: [] as string[],
};
// Where the base data still has the "Declaration of Sovereignty (1960)" placeholder and the Factbook
// lists no independence date: the event the place's current status dates from.
type History = { year: number; event: string; era: string; constitutionYear?: number | null; notes?: string; independence?: string };
const PLACEHOLDER_EVENT = 'Declaration of Sovereignty (1960)';
// Template text the base data uses for every other country without a curated history
const GENERIC_EVENT = /^Declaration of Sovereignty \(-?\d+\)$/;
const GENERIC_ORIGIN = 'Ancient settlements and regional cultures.';
const BOT = 'British Overseas Territory';
const HISTORY_FIXES: Record<string, History> = {
  KY: { year: 1962, event: 'Became a separate British colony when Jamaica gained independence (1962)', era: BOT },
  FO: { year: 1948, event: 'Home Rule within the Kingdom of Denmark (1 April 1948)', era: 'Self-governing territory of the Kingdom of Denmark', constitutionYear: 1948 },
  FK: { year: 1833, event: 'Continuous British administration since 1833', era: BOT },
  GS: { year: 1985, event: 'Separated from the Falkland Islands Dependencies (3 October 1985)', era: BOT, constitutionYear: 1985 },
  AX: { year: 1921, event: 'League of Nations confirmed autonomy within Finland (24 June 1921)', era: 'Autonomous region of Finland', constitutionYear: 1991 },
  PF: { year: 1842, event: 'French protectorate (1842); overseas collectivity of France since 2003', era: 'Overseas collectivity of France', constitutionYear: 2004 },
  TF: { year: 1955, event: 'Created as a French overseas territory (6 August 1955)', era: 'Overseas territory of France', constitutionYear: null },
  PS: { year: 1988, event: 'Palestinian Declaration of Independence (15 November 1988)', era: 'UN non-member observer state (since 2012)', constitutionYear: 2003, independence: '15 November 1988 (declared)' },
  GL: { year: 1979, event: 'Home Rule within the Kingdom of Denmark (1 May 1979); self-government since 21 June 2009', era: 'Self-governing territory of the Kingdom of Denmark' },
  GU: { year: 1898, event: 'Ceded by Spain to the United States (Treaty of Paris, 1898)', era: 'Unincorporated territory of the United States' },
  HM: { year: 1947, event: 'Transferred from the United Kingdom to Australia (26 December 1947)', era: 'External territory of Australia', constitutionYear: null },
  HK: { year: 1997, event: 'Transfer of sovereignty from the United Kingdom to China (1 July 1997)', era: 'Special Administrative Region of China' },
  MO: { year: 1999, event: 'Transfer of sovereignty from Portugal to China (20 December 1999)', era: 'Special Administrative Region of China' },
  MS: { year: 1632, event: 'English settlement (1632)', era: BOT },
  CW: { year: 2010, event: 'Became a constituent country of the Kingdom of the Netherlands (10 October 2010)', era: 'Constituent country of the Kingdom of the Netherlands' },
  AW: { year: 1986, event: 'Separate status within the Kingdom of the Netherlands (1 January 1986)', era: 'Constituent country of the Kingdom of the Netherlands', constitutionYear: 1986 },
  SX: { year: 2010, event: 'Became a constituent country of the Kingdom of the Netherlands (10 October 2010)', era: 'Constituent country of the Kingdom of the Netherlands' },
  NC: { year: 1853, event: 'Annexed by France (24 September 1853)', era: 'Special collectivity of France', constitutionYear: 1998 },
  NF: { year: 1914, event: 'Became an external territory of Australia (1 July 1914)', era: 'External territory of Australia' },
  MP: { year: 1978, event: 'Commonwealth in political union with the United States (9 January 1978)', era: 'Commonwealth of the United States' },
  PN: { year: 1838, event: 'Became a British colony (1838), settled by HMS Bounty mutineers in 1790', era: BOT },
  PR: { year: 1952, event: 'Commonwealth constitution took effect (25 July 1952); a US territory since 1898', era: 'Unincorporated territory of the United States (Commonwealth)' },
  BL: { year: 2007, event: 'Became an overseas collectivity of France, separate from Guadeloupe (15 July 2007)', era: 'Overseas collectivity of France', constitutionYear: 2007 },
  SH: { year: 1659, event: 'Settled by the English East India Company (1659)', era: BOT, constitutionYear: 2009 },
  AI: { year: 1980, event: 'Formally separated from Saint Kitts and Nevis (19 December 1980)', era: BOT },
  MF: { year: 2007, event: 'Became an overseas collectivity of France, separate from Guadeloupe (15 July 2007)', era: 'Overseas collectivity of France', constitutionYear: 2007 },
  PM: { year: 1816, event: 'Returned to France for the last time (1816); overseas collectivity since 2003', era: 'Overseas collectivity of France', constitutionYear: null },
  EH: { year: 1976, event: 'Sahrawi Arab Democratic Republic proclaimed (27 February 1976)', era: 'Disputed non-self-governing territory', constitutionYear: null, independence: '27 February 1976 (declared by the SADR)' },
  TC: { year: 1973, event: 'Became a separate British colony when the Bahamas gained independence (1973)', era: BOT },
  GG: { year: 1204, event: 'Stayed with the English Crown after the loss of Normandy (1204)', era: 'British Crown Dependency' },
  JE: { year: 1204, event: 'Stayed with the English Crown after the loss of Normandy (1204)', era: 'British Crown Dependency' },
  IM: { year: 979, event: 'Tynwald parliament traditionally founded (979)', era: 'British Crown Dependency', constitutionYear: null },
  VI: { year: 1917, event: 'Purchased by the United States from Denmark (31 March 1917)', era: 'Unincorporated territory of the United States' },
  WF: { year: 1961, event: 'Became a French overseas territory (29 July 1961)', era: 'Overseas collectivity of France', constitutionYear: 1961 },
  AS: { year: 1900, event: 'Tutuila ceded to the United States (17 April 1900)', era: 'Unincorporated territory of the United States', constitutionYear: 1967 },
  IO: {
    year: 1965, event: 'Created as a British overseas territory (8 November 1965)', era: BOT,
    notes: 'Created as a British overseas territory (8 November 1965). In May 2025 the UK and Mauritius signed a treaty to transfer sovereignty to Mauritius, with Diego Garcia leased back to the UK.',
  },
  BM: { year: 1612, event: 'Settled by the Virginia Company (1612)', era: BOT },
  VG: { year: 1672, event: 'Under English control since 1672', era: BOT },
  AQ: { year: 1959, event: 'Antarctic Treaty signed (1 December 1959)', era: 'International zone under the Antarctic Treaty System', constitutionYear: null },
};
const longevityFrom = (h: History) => ({
  foundationYear: h.year,
  foundationEvent: h.event,
  sovereignEra: h.era,
  yearsAlive: 2026 - h.year,
  historicalContinuityNotes: h.notes ?? `${h.event}.`,
  // only sovereign states have an independence date
  independenceDate: h.independence ?? null,
  ancientOrigin: null,
  ...(h.constitutionYear !== undefined && { constitutionYear: h.constitutionYear }),
});
const SKIP_FACTS: Record<string, Record<string, Record<string, unknown> | string>> = {
  Somaliland: {
    officialName: 'Republic of Somaliland',
    // shares ISO codes with Somalia; no code of its own
    code3: '',
    capital: 'Hargeisa',
    largestCity: 'Hargeisa',
    // Somaliland government estimate (2021); no census since 1975
    demographics: { population: 5700000, densityPerKm2: 32.3, lifeExpectancy: 0, urbanPercentage: 0 },
    geography: {
      areaKm2: 176120, areaSqMi: 68000, highestPoint: { name: 'Shimbiris', elevationM: 2416 }, lowestPoint: { name: 'Gulf of Aden', elevationM: 0 },
      coastlineKm: 850, borders: ['DJI', 'ETH', 'SOM'],
      terrain: 'A hot coastal plain on the Gulf of Aden rising to the Golis and Ogo highlands, with a dry plateau inland',
      climate: 'Arid to semi-arid; hot coastal lowlands and cooler highlands, with rains in April–June and October–November',
    },
    economy: {
      gdpNominalUSD: 0, gdpPerCapitaUSD: 0, currencyName: 'Somaliland Shilling', currencyCode: 'SLSH', currencySymbol: 'Sl.Sh.',
      majorIndustries: ['Livestock herding', 'Port and logistics services (Berbera)', 'Telecommunications'],
      mainExports: ['Livestock (sheep, goats, camels)', 'Hides and skins', 'Frankincense'],
    },
    longevity: longevityFrom({
      year: 1991, event: 'Restoration of sovereignty declared (18 May 1991)', era: 'Self-declared state without international recognition', constitutionYear: 2001,
      independence: '18 May 1991 (declared; first independent as the State of Somaliland, 26 June 1960)',
      notes: 'British Somaliland became independent as the State of Somaliland on 26 June 1960 and joined Somalia five days later. It declared the union void on 18 May 1991.',
    }),
    governance: { headOfState: 'Abdirahman Mohamed Abdullahi', headOfGovernment: 'Abdirahman Mohamed Abdullahi', governmentType: 'Unrecognised presidential republic', unMemberSince: 0, nationalMotto: null, nationalDay: 'Restoration of Sovereignty, 18 May (1991)' },
    culture: {
      officialLanguages: ['Somali', 'Arabic', 'English'], majorReligions: ['Sunni Muslim'], unescoSitesCount: 0,
      famousLandmarks: ['Laas Geel rock art', 'Berbera', 'Zeila', 'Daallo Mountain'],
      interestingFacts: [
        "The cave paintings at Laas Geel, rediscovered in 2002, are among the best-preserved rock art in Africa and thought to be several thousand years old.",
        'Live animal exports, mostly sheep and goats shipped from Berbera to the Arabian Peninsula, are the backbone of the economy.',
        'Despite having no international recognition, it has held several peaceful, contested presidential elections since 2003.',
      ],
    },
    // Somaliland uses Somalia's +252 country code; no internet domain of its own
    details: { callingCode: '+252', timeZone: 'UTC+3', drivingSide: 'Right' },
    military: NO_MILITARY_DATA,
  },
  'N. Cyprus': {
    officialName: 'Turkish Republic of Northern Cyprus',
    code3: '',
    capital: 'North Nicosia',
    largestCity: 'North Nicosia',
    // 2011 census, the last with published results
    demographics: { population: 294906, densityPerKm2: 87.9, lifeExpectancy: 0, urbanPercentage: 0 },
    geography: {
      areaKm2: 3355, areaSqMi: 1295, highestPoint: { name: 'Selvili Tepe', elevationM: 1024 }, lowestPoint: { name: 'Mediterranean Sea', elevationM: 0 },
      // the UN buffer zone (Green Line) separates it from the Republic of Cyprus
      coastlineKm: null, borders: ['CYP'],
      terrain: 'The Kyrenia mountain range along the north coast, the central Mesaoria plain, and the long Karpas peninsula to the north-east',
      climate: 'Mediterranean; hot, dry summers and mild, wet winters',
    },
    economy: {
      gdpNominalUSD: 0, gdpPerCapitaUSD: 0, currencyName: 'Turkish Lira', currencyCode: 'TRY', currencySymbol: '₺',
      majorIndustries: ['Tourism', 'Higher education', 'Construction', 'Agriculture (citrus)'],
      mainExports: [],
    },
    longevity: longevityFrom({ year: 1983, event: 'Turkish Republic of Northern Cyprus declared (15 November 1983)', era: 'Self-declared state, recognised only by Türkiye', constitutionYear: 1985, independence: '15 November 1983 (declared)' }),
    governance: { headOfState: 'Tufan Erhürman', headOfGovernment: 'Ünal Üstel', governmentType: 'Unrecognised semi-presidential republic (recognised only by Türkiye)', unMemberSince: 0, nationalMotto: null, nationalDay: 'Republic Day, 15 November (1983)' },
    culture: {
      officialLanguages: ['Turkish'], majorReligions: ['Sunni Muslim'], unescoSitesCount: 0,
      famousLandmarks: ['Kyrenia Castle', 'St. Hilarion Castle', 'Bellapais Abbey', 'Salamis', 'Othello Castle (Famagusta)'],
      interestingFacts: [
        'Only Türkiye recognises it, and Turkish troops have been stationed in the north since 1974.',
        'North Nicosia is the northern half of Nicosia, divided by the UN buffer zone that runs through the old city.',
        'Universities are a major part of the economy, with tens of thousands of international students.',
      ],
    },
    // reached through Türkiye's code; .tr domains
    details: { callingCode: '+90 392', timeZone: 'UTC+2', drivingSide: 'Left' },
    military: NO_MILITARY_DATA,
  },
  'Indian Ocean Ter.': {
    officialName: 'Australian Indian Ocean Territories',
    code3: '',
    // UN M49 places both territories in Australia and New Zealand
    continent: 'Oceania',
    subregion: 'Australia and New Zealand',
    capital: 'Flying Fish Cove',
    largestCity: 'Flying Fish Cove',
    // Christmas Island (1,692) and Cocos (Keeling) Islands (593), 2021 Australian census
    demographics: { population: 2285, densityPerKm2: 15.3, lifeExpectancy: 0, urbanPercentage: 0 },
    // Christmas Island 135 km² + Cocos (Keeling) Islands 14 km²
    // Factbook coastlines: Christmas Island 138.9 km, Cocos (Keeling) Islands 2.6 km
    geography: {
      areaKm2: 149, areaSqMi: 58, highestPoint: { name: 'Murray Hill (Christmas Island)', elevationM: 361 }, lowestPoint: { name: 'Indian Ocean', elevationM: 0 },
      coastlineKm: 141.5, borders: [],
      terrain: 'Christmas Island is a steep-sided limestone plateau; the Cocos (Keeling) Islands are two low-lying coral atolls',
      climate: 'Tropical, with a wet season from about December to April and south-east trade winds the rest of the year',
    },
    economy: {
      gdpNominalUSD: 0, gdpPerCapitaUSD: 0, currencyName: 'Australian Dollar', currencyCode: 'AUD', currencySymbol: '$',
      majorIndustries: ['Phosphate mining', 'Tourism', 'Government services'],
      mainExports: ['Phosphate'],
    },
    longevity: longevityFrom({ year: 1955, event: 'Cocos (Keeling) Islands transferred to Australia (1955); Christmas Island followed in 1958', era: 'External territory of Australia (two island groups)', constitutionYear: null }),
    governance: { headOfState: 'Charles III', headOfGovernment: 'Administrator (appointed by Australia)', governmentType: 'External territories of Australia', unMemberSince: 0, nationalMotto: null, nationalDay: 'Australia Day, 26 January' },
    culture: {
      officialLanguages: ['English', 'Malay'], majorReligions: ['Muslim', 'Buddhist', 'Christian'], unescoSitesCount: 0,
      famousLandmarks: ['Christmas Island National Park', 'Flying Fish Cove', 'Pulu Keeling National Park', 'Direction Island'],
      interestingFacts: [
        'Every year tens of millions of red crabs migrate from the Christmas Island forest to the sea to spawn.',
        "Phosphate mining has been Christmas Island's main industry since the end of the 19th century.",
        'On the Cocos (Keeling) Islands, most Cocos Malays live on Home Island while the administration is on West Island.',
      ],
    },
    military: { ...NO_MILITARY_DATA, tier: 'No Armed Forces' },
  },
  'Siachen Glacier': {
    officialName: 'Siachen Glacier',
    code3: '',
    capital: 'None (military outposts only)',
    largestCity: 'None',
    demographics: { population: 0, densityPerKm2: 0, lifeExpectancy: 0, urbanPercentage: 0, medianAge: 0 },
    geography: {
      highestPoint: { name: 'Teram Kangri I', elevationM: 7462 }, lowestPoint: { name: 'Glacier snout (Nubra valley)', elevationM: 3620 },
      // landlocked; it meets India's Ladakh, Pakistan's Gilgit-Baltistan and the Chinese-held Shaksgam valley
      coastlineKm: 0, borders: ['IND', 'PAK', 'CHN'],
      terrain: 'Glaciated high mountains in the eastern Karakoram; the Siachen Glacier is about 76 km long, one of the longest outside the polar regions',
      climate: 'Polar high-altitude; winter temperatures fall below −50 °C, with heavy snowfall and frequent avalanches',
    },
    economy: {
      gdpNominalUSD: 0, gdpPerCapitaUSD: 0, currencyName: 'Indian Rupee', currencyCode: 'INR', currencySymbol: '₹',
      majorIndustries: [], mainExports: [],
    },
    longevity: longevityFrom({ year: 1984, event: 'Indian forces took control in Operation Meghdoot (13 April 1984)', era: 'Disputed territory (administered by India, claimed by Pakistan)', constitutionYear: null }),
    governance: { headOfState: 'Disputed (administered by India)', headOfGovernment: 'Disputed (administered by India)', governmentType: 'Disputed territory', unMemberSince: 0, nationalMotto: null, nationalDay: 'None (no permanent population)' },
    culture: {
      officialLanguages: [], majorReligions: ['None (no permanent population)'], unescoSitesCount: 0,
      famousLandmarks: ['Siachen Glacier', 'Saltoro Ridge', 'Sia La', 'Bilafond La', 'Indira Col'],
      interestingFacts: [
        "Often called the world's highest battlefield, with military posts above 6,000 m.",
        'Far more soldiers have died there from cold, avalanches and altitude than from combat.',
        'Meltwater from the glacier feeds the Nubra River, which flows into the Shyok and on to the Indus.',
      ],
    },
    military: { ...NO_MILITARY_DATA, tier: 'No Armed Forces' },
  },
};
// Entries that share an ISO code with another country, or are not countries
const SKIP = new Set(['Somaliland', 'N. Cyprus', 'Indian Ocean Ter.', 'Siachen Glacier']);
// Kosovo has no ISO 3166 code in Wikidata; Factbook files it under FIPS "kv"
const FIPS_OVERRIDE: Record<string, string> = { XK: 'kv', AQ: 'ay' };

const isTemplate = (c: CountryData) => /continuous years of cultural presence|diverse culinary and artistic heritage/.test(c.culture.interestingFacts.join(' '));

function tierFor(rank: number): CountryData['military']['tier'] {
  if (rank <= 3) return 'Superpower';
  if (rank <= 12) return 'Great Power';
  if (rank <= 30) return 'Regional Power';
  if (rank <= 70) return 'Middle Power';
  if (rank <= 120) return 'Developing Defense';
  return 'Minimal / Neutral';
}

async function main() {
  console.log('World Bank…');
  const wb = await loadWorldBank();
  console.log('Wikidata…');
  const wd = await loadWikidata();
  console.log('Factbook…');
  const factbook = loadFactbook(wd.fips);

  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  const byName = new Map(countryList.filter((c) => !SKIP.has(c.name)).flatMap((c) => [[norm(c.name), c.code], [norm(c.officialName), c.code]]));
  console.log('Global Firepower…');
  const gfp = await loadGfp((name) => byName.get(norm(name)));

  const patches: Record<string, any> = {};
  const report: string[] = [];

  for (const c of countryList) {
    if (SKIP.has(c.name)) {
      patches[c.id] = SKIP_FACTS[c.name];
      continue;
    }
    const iso = c.code;
    const template = isTemplate(c);
    const w = wb[c.code3] || {};
    const fbRaw = factbook(iso, FIPS_OVERRIDE[iso]);
    const fb = fbRaw ? factbookFacts(fbRaw) : null;
    const g = gfp.byIso[iso];
    const patch: any = { demographics: {}, economy: {}, geography: {}, governance: {}, culture: {}, military: {}, longevity: {} };
    const missing: string[] = [];

    // Measured figures: every country
    const population = w.population?.value ?? fb?.population;
    if (population) {
      patch.demographics.population = Math.round(population);
      patch.demographics.densityPerKm2 = round(population / Math.max(1, c.geography.areaKm2), 1);
    } else missing.push('population');
    const life = w.lifeExpectancy?.value ?? fb?.lifeExpectancy;
    if (life) patch.demographics.lifeExpectancy = round(life);
    else missing.push('life expectancy');
    const urban = w.urban?.value ?? fb?.urban;
    if (urban) patch.demographics.urbanPercentage = round(urban);
    if (fb?.medianAge) patch.demographics.medianAge = fb.medianAge;

    const gdpBillions = w.gdp ? w.gdp.value / 1e9 : fb?.gdpBillions;
    if (gdpBillions) {
      patch.economy.gdpNominalUSD = round(gdpBillions, gdpBillions < 10 ? 3 : 1);
      patch.economy.gdpPerCapitaUSD = Math.round(w.gdpPerCapita?.value ?? (gdpBillions * 1e9) / (population || 1));
    } else missing.push('GDP');

    if (fb?.coastlineKm !== undefined) patch.geography.coastlineKm = fb.coastlineKm;
    if (wd.unSince[iso]) patch.governance.unMemberSince = wd.unSince[iso];
    else if (template) patch.governance.unMemberSince = 0;
    if (wd.heritage[iso]) patch.culture.unescoSitesCount = wd.heritage[iso].count;
    else if (template) patch.culture.unescoSitesCount = 0;

    // Current office-holders: every country
    const headOfState = LEADER_OVERRIDES[iso]?.hos || wd.headOfState[iso];
    const headOfGovernment = LEADER_OVERRIDES[iso]?.hog || wd.headOfGovernment[iso];
    if (headOfState) patch.governance.headOfState = headOfState;
    if (headOfGovernment) patch.governance.headOfGovernment = headOfGovernment;

    // Military: SIPRI spending via the World Bank, inventories and rank from Global Firepower
    if (w.militaryUSD) patch.military.defenseBudgetUSD = round(w.militaryUSD.value / 1e9, 2);
    else if (g?.budgetUSD) patch.military.defenseBudgetUSD = round(g.budgetUSD / 1e9, 2);
    if (w.militaryPctGDP) patch.military.defenseBudgetPercentGDP = round(w.militaryPctGDP.value, 2);
    else if (patch.military.defenseBudgetUSD && gdpBillions) patch.military.defenseBudgetPercentGDP = round((patch.military.defenseBudgetUSD / gdpBillions) * 100, 2);
    if (g) {
      for (const k of ['globalRank', 'powerIndex', 'activePersonnel', 'reservePersonnel', 'paramilitary', 'totalAircraft', 'combatAircraft', 'attackHelicopters', 'tanks', 'armoredVehicles', 'navalFleetTotal', 'aircraftCarriers', 'submarines', 'destroyersFrigates']) {
        patch.military[k] = g[k] ?? 0; // GFP leaves out categories a country has none of (e.g. a navy)
      }
      patch.military.inventory = g.inventory;
      if (template && g.globalRank) patch.military.tier = tierFor(g.globalRank);
    } else {
      // Global Firepower doesn't rank it: no per-category inventory
      patch.military.inventory = null;
      if (fb?.activePersonnel) patch.military.activePersonnel = fb.activePersonnel;
    }
    patch.military.serviceObligation = fb?.serviceObligation || null;
    if (!g && template) {
      // Not ranked by Global Firepower: no invented inventories
      Object.assign(patch.military, {
        globalRank: 146, powerIndex: 0, activePersonnel: fb?.activePersonnel ?? 0, reservePersonnel: 0, paramilitary: 0,
        totalAircraft: 0, combatAircraft: 0, attackHelicopters: 0, tanks: 0, armoredVehicles: 0, navalFleetTotal: 0,
        aircraftCarriers: 0, submarines: 0, destroyersFrigates: 0,
        tier: fb?.noMilitary || !fbRaw ? 'No Armed Forces' : 'Minimal / Neutral',
      });
      if (!w.militaryUSD) Object.assign(patch.military, { defenseBudgetUSD: 0, defenseBudgetPercentGDP: 0 });
    }

    // Descriptive text: only where the template text is still in place
    if (template) {
      const cur = wd.currency[iso];
      const fbCurrency = fb?.currency;
      if (cur || fbCurrency) {
        const code = cur?.code || fbCurrency![2];
        const fbName = fbCurrency && fbCurrency[2] === code ? titleCase(fbCurrency[1].replace(/s$/, '')) : '';
        Object.assign(patch.economy, { currencyName: cur?.name || fbName || code, currencyCode: code, currencySymbol: cur?.symbol || code });
      }
      else missing.push('currency');
      // Without a source the template text goes, and the app hides the empty field
      patch.economy.majorIndustries = fb?.industries.length ? fb.industries : [];
      patch.economy.mainExports = fb?.exports.length ? fb.exports : [];
      patch.geography.climate = fb?.climate || '';
      patch.geography.terrain = fb?.terrain || '';
      if (fb?.highestPoint) patch.geography.highestPoint = fb.highestPoint;
      else missing.push('highest point');
      patch.geography.lowestPoint = fb?.lowestPoint || null;
      if (fb?.coastlineKm === undefined) patch.geography.coastlineKm = null;
      if (fb?.governmentType) patch.governance.governmentType = fb.governmentType;
      if (fb?.nationalDay) patch.governance.nationalDay = fb.nationalDay;
      patch.governance.nationalMotto = (MOTTO_OVERRIDES[iso] ?? wd.motto[iso]) || null;
      const languages = LANGUAGE_OVERRIDES[iso] ?? fb?.languages;
      if (languages?.length) patch.culture.officialLanguages = languages;
      else missing.push('languages');
      const religions = RELIGION_OVERRIDES[iso] ?? fb?.religions;
      if (religions?.length) patch.culture.majorReligions = religions;
      else missing.push('religions');
      patch.culture.famousLandmarks = wd.heritage[iso]?.top.length ? wd.heritage[iso].top : [];
      patch.culture.interestingFacts = fb?.notes.length ? fb.notes.slice(0, 3) : [];
      if (fb?.conscription) patch.military.conscription = fb.conscription;
      const alliances = wd.alliances[iso];
      if (alliances?.length) patch.military.alliances = [...new Set(alliances)];
      if (NUCLEAR[iso]) Object.assign(patch.military, { nuclearStatus: NUCLEAR[iso].status, nuclearWarheads: NUCLEAR[iso].warheads });
    }

    // History: replace the "Declaration of Sovereignty (1960)" placeholder (and its 1991 constitution and generic origin)
    if (c.longevity.foundationEvent === PLACEHOLDER_EVENT) {
      // the Factbook's constitution year, or null so the app hides the row
      patch.longevity.constitutionYear = fb?.constitutionYear ?? null;
      patch.longevity.ancientOrigin = null;
      if (HISTORY_FIXES[iso]) Object.assign(patch.longevity, longevityFrom(HISTORY_FIXES[iso]));
      else if (fb?.foundation) {
        const { year, event } = fb.foundation;
        Object.assign(patch.longevity, {
          foundationYear: year,
          foundationEvent: event,
          independenceDate: event,
          yearsAlive: 2026 - year,
          historicalContinuityNotes: `${event}.`,
        });
      } else missing.push('history');
    } else if (GENERIC_EVENT.test(c.longevity.foundationEvent)) {
      // The year is curated but the event, independence date, 1991 constitution and origin are template text
      const year = c.longevity.foundationYear;
      if (c.longevity.constitutionYear === 1991) patch.longevity.constitutionYear = fb?.constitutionYear ?? null;
      if (c.longevity.ancientOrigin === GENERIC_ORIGIN) patch.longevity.ancientOrigin = null;
      patch.longevity.independenceDate = fb?.foundation?.event ?? null;
      if (fb?.foundation?.year === year) {
        patch.longevity.foundationEvent = fb.foundation.event;
        patch.longevity.historicalContinuityNotes = `${fb.foundation.event}.`;
      } else patch.longevity.foundationEvent = `Statehood established (${year < 0 ? `${-year} BCE` : year})`;
    }

    // Dossier details: every country, only what a source states
    const details: any = { ...fb?.details, callingCode: wd.callingCode[iso], drivingSide: wd.drivingSide[iso], hdi: wd.hdi[iso] };
    details.organizations = [...(details.organizations || []), ...Object.keys(CURRENT_MEMBERS).filter((org) => CURRENT_MEMBERS[org].includes(iso))];
    for (const [k, v] of Object.entries(details)) if (v === undefined || (Array.isArray(v) && !v.length)) delete details[k];
    patch.details = details;

    // Places no source measures: 0 means "not measured" and the app shows N/A
    if (GOVERNANCE_FIXES[iso]) Object.assign((patch.governance ||= {}), GOVERNANCE_FIXES[iso]);
    const manual = MANUAL_FACTS[iso];
    if (manual) {
      for (const [section, fields] of Object.entries(manual)) Object.assign((patch[section] ||= {}), fields);
      missing.length = 0;
    }

    // Only UN members keep the "United Nations Member" alliance badge
    const unSince = patch.governance?.unMemberSince ?? c.governance.unMemberSince;
    const allianceList: string[] = patch.military?.alliances ?? c.military.alliances;
    if (!unSince && allianceList.includes('United Nations Member')) {
      (patch.military ||= {}).alliances = allianceList.filter((a) => a !== 'United Nations Member');
    }

    for (const k of Object.keys(patch)) if (!Object.keys(patch[k]).length) delete patch[k];
    patches[c.id] = patch;
    if (missing.length) report.push(`${c.name}: no ${missing.join(', ')}`);
  }

  fs.writeFileSync(
    OUT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString().slice(0, 10),
        sources: ['World Bank API', 'CIA World Factbook (factbook.json)', 'Wikidata', 'Global Firepower 2026', 'FAS nuclear inventories 2025'],
        countries: patches,
      },
      null,
      1,
    ),
  );
  console.log(`\nWrote ${Object.keys(patches).length} countries to ${path.relative(ROOT, OUT)}`);
  if (gfp.unmatched.length) console.log('GFP slugs with no country:', gfp.unmatched.join(', '));
  if (report.length) console.log('\nGaps:\n  ' + report.join('\n  '));
  if (wd.leaderConflicts.length) console.log('\nCountries with several current leaders in Wikidata (latest taken):\n  ' + wd.leaderConflicts.join('\n  '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
