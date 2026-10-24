import { AskSearchResponse, CountryData, RankedListItem } from '../types.ts';
import { countryList } from '../data/countriesData.ts';
import { getVerifiedSovereignInfo } from './sovereignData.ts';
import { getCountryCulinaryProfile } from './nationalFoodsData.ts';
import { NATIONAL_SPORTS_REGISTRY } from './nationalSportsData.ts';
import { formatArea, formatBudget, formatPopulation } from './formatters.ts';

/**
 * Answers common country questions instantly from the atlas's own data, so the search only
 * goes to the server (and Gemini) for questions the app can't answer itself.
 *
 * Many country records still hold generated placeholder values (e.g. a population of exactly
 * 5,000,000 or a currency of "National Currency"). A fact is only answered locally when the
 * value is real; otherwise this returns null and the server answers instead.
 */

// ---------- Placeholder detection ----------

const PLACEHOLDER_POPULATION = 5_000_000;
const PLACEHOLDER_GDP = 25;
const PLACEHOLDER_LIFE_EXPECTANCY = 76.5;

const isRealPopulation = (pop: number) => pop > 0 && pop !== PLACEHOLDER_POPULATION;
const isRealText = (value: string | undefined, placeholder: string) => Boolean(value && value !== placeholder);
const isRealList = (values: string[] | undefined, placeholder: string) =>
  Boolean(values && values.length > 0 && !values.some((v) => v === placeholder || v.startsWith(`${placeholder} of`)));

// Dependencies, disputed areas and uninhabited lands that shouldn't appear in "largest countries"-style rankings
const NON_SOVEREIGN = new Set([
  'Cayman Is.', 'Cook Is.', 'Faeroe Is.', 'Falkland Is.', 'S. Geo. and the Is.', 'Åland', 'Fr. Polynesia',
  'Fr. S. Antarctic Lands', 'Greenland', 'Guam', 'Heard I. and McDonald Is.', 'Hong Kong', 'Macao', 'Montserrat',
  'Curaçao', 'Aruba', 'Sint Maarten', 'New Caledonia', 'Niue', 'Norfolk Island', 'N. Mariana Is.', 'Pitcairn Is.',
  'Puerto Rico', 'St-Barthélemy', 'Saint Helena', 'Anguilla', 'St-Martin', 'St. Pierre and Miquelon', 'W. Sahara',
  'Turks and Caicos Is.', 'Guernsey', 'Jersey', 'Isle of Man', 'U.S. Virgin Is.', 'Wallis and Futuna Is.',
  'American Samoa', 'Br. Indian Ocean Ter.', 'Bermuda', 'British Virgin Is.', 'Somaliland', 'N. Cyprus',
  'Indian Ocean Ter.', 'Siachen Glacier', 'Antarctica',
]);

// ---------- Text matching ----------

const normalize = (text: string) =>
  ` ${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()} `;

const has = (q: string, pattern: RegExp) => pattern.test(q);

// Map labels use abbreviations ("Cayman Is.", "S. Sudan"); expand them so full names match too
const expandAbbreviations = (name: string) =>
  name
    .replace(/\bIs\.$/, 'Islands')
    .replace(/\bI\. /, 'Island ')
    .replace(/\bTer\.$/, 'Territory')
    .replace(/^St[.-] ?/, 'Saint ')
    .replace(/^S\. /, 'South ')
    .replace(/^N\. /, 'North ')
    .replace(/^W\. /, 'Western ')
    .replace(/^Eq\. /, 'Equatorial ')
    .replace(/^Fr\. /, 'French ')
    .replace(/^Br\. /, 'British ');

const EXTRA_TERMS: Record<string, string[]> = {
  US: ['usa', 'u s a', 'u s', 'america', 'american', 'united states of america', 'the states'],
  GB: ['uk', 'u k', 'britain', 'great britain', 'british', 'england', 'english'],
  AE: ['uae', 'emirates'],
  CD: ['drc', 'dr congo', 'congo kinshasa', 'democratic republic of congo'],
  CG: ['republic of the congo', 'congo brazzaville'],
  CI: ['ivory coast'],
  CZ: ['czech republic', 'czech'],
  MK: ['north macedonia'],
  SZ: ['swaziland', 'eswatini'],
  MM: ['burma'],
  NL: ['holland', 'dutch'],
  VA: ['vatican city', 'holy see'],
  KP: ['dprk'],
  TL: ['east timor'],
  CV: ['cape verde'],
  BA: ['bosnia'],
  TT: ['trinidad'],
  VC: ['saint vincent', 'st vincent', 'saint vincent and the grenadines'],
  KN: ['saint kitts', 'st kitts'],
  TR: ['turkiye', 'turkish'],
  CN: ['prc', 'chinese'],
  VN: ['viet nam', 'vietnamese'],
  JP: ['japanese'],
  FR: ['french'],
  DE: ['german'],
  IT: ['italian'],
  ES: ['spanish'],
  PT: ['portuguese'],
  RU: ['russian'],
  BR: ['brazilian'],
  MX: ['mexican'],
  CA: ['canadian'],
  AU: ['australian'],
  EG: ['egyptian'],
  GR: ['greek'],
  CH: ['swiss'],
  SE: ['swedish'],
  NO: ['norwegian'],
  PL: ['polish'],
  IE: ['irish'],
  NG: ['nigerian'],
  KE: ['kenyan'],
  AR: ['argentine', 'argentinian'],
  CL: ['chilean'],
  PE: ['peruvian'],
  CO: ['colombian'],
  TH: ['thai'],
  ID: ['indonesian'],
  PH: ['filipino'],
  IR: ['iranian', 'persia'],
  IL: ['israeli'],
  SA: ['saudi'],
  PK: ['pakistani'],
  UA: ['ukrainian'],
  KR: ['south korean'],
};

// Phrases that contain a country name but mean something else
const BLOCKED_PHRASES = [' new mexico ', ' new jersey ', ' new guinea ', ' new england ', ' new south wales ', ' english language '];

const CONTINENT_TERMS: [string[], CountryData['continent']][] = [
  [['africa', 'african'], 'Africa'],
  [['europe', 'european'], 'Europe'],
  [['asia', 'asian'], 'Asia'],
  [['north america', 'north american'], 'North America'],
  [['south america', 'south american', 'latin america', 'latin american'], 'South America'],
  [['oceania', 'pacific islands'], 'Oceania'],
];

interface TermEntry {
  term: string; // normalized, padded with spaces
  country?: CountryData;
  continent?: CountryData['continent'];
}

let termIndex: TermEntry[] | null = null;

const getTermIndex = () => {
  if (termIndex) return termIndex;
  const entries: TermEntry[] = [];
  for (const country of countryList) {
    const names = new Set([country.name, country.officialName, expandAbbreviations(country.name), ...(EXTRA_TERMS[country.code] || [])]);
    for (const name of names) {
      const term = normalize(name);
      if (term.trim().length >= 3 || EXTRA_TERMS[country.code]?.includes(name)) {
        entries.push({ term, country });
      }
    }
  }
  for (const [terms, continent] of CONTINENT_TERMS) {
    for (const t of terms) entries.push({ term: normalize(t), continent });
  }
  // Longest first, so "south sudan" wins over "sudan" and "american samoa" over "america"
  entries.sort((a, b) => b.term.length - a.term.length);
  termIndex = entries;
  return entries;
};

interface QueryEntities {
  countries: CountryData[];
  continent: CountryData['continent'] | null;
  rest: string; // the query with matched names removed
}

const findEntities = (q: string): QueryEntities => {
  let text = q;
  for (const phrase of BLOCKED_PHRASES) text = text.split(phrase).join(' # ');

  const found: { index: number; country?: CountryData; continent?: CountryData['continent'] }[] = [];
  for (const entry of getTermIndex()) {
    let index = text.indexOf(entry.term);
    while (index !== -1) {
      found.push({ index, country: entry.country, continent: entry.continent });
      // Blank out the match (keeping positions) so shorter names can't match inside it
      text = text.slice(0, index) + ' ' + '#'.repeat(entry.term.length - 2) + ' ' + text.slice(index + entry.term.length);
      index = text.indexOf(entry.term);
    }
  }
  found.sort((a, b) => a.index - b.index);

  const countries: CountryData[] = [];
  for (const f of found) {
    if (f.country && !countries.includes(f.country)) countries.push(f.country);
  }
  const continent = found.find((f) => f.continent)?.continent || null;
  return { countries, continent, rest: text.replace(/#+/g, ' ') };
};

// ---------- Intents ----------

// Questions about the past, future or reasons need reasoning, not a lookup
const NEEDS_REASONING =
  /\b(why|when|was|were|used to|former|formerly|before|after|until|since|history|historical|will|would|should|could|might|first|last|next|previous|ancient|colonial|war|wars)\b|\b(1[0-9]{3}|20[0-9]{2})\b/;

const INTENTS = {
  capital: /\bcapital\b/,
  president: /\bpresident\b/,
  primeMinister: /\b(prime minister|pm|premier|chancellor|head of government)\b/,
  monarch: /\b(king|queen|monarch|emperor|emir|sultan|royal)\b/,
  leader: /\b(leader|leads|ruler|rules|runs|in charge|governs|head of state|who is in power|who controls)\b/,
  population: /\b(population|populous|how many people|people live|inhabitants|residents)\b/,
  area: /\b(area|size|how big|how large|square (km|kilometers|kilometres|miles)|km2|sq mi|land mass|landmass)\b/,
  location: /\b(where is|where s|located|location|which continent|what continent|what region|which region)\b/,
  borders: /\b(border|borders|bordering|neighbou?rs?|neighbou?ring|next to|surrounded by)\b/,
  currency: /\b(currency|currencies|money)\b/,
  language: /\b(language|languages|speak|spoken)\b/,
  gdp: /\b(gdp|economy|economic output)\b/,
  religion: /\b(religion|religions|religious|faith)\b/,
  government: /\b(government type|type of government|form of government|political system|system of government)\b/,
  motto: /\bmotto\b/,
  nationalDay: /\b(national day|independence day)\b/,
  highestPoint: /\b(highest (point|mountain|peak)|tallest mountain)\b/,
  lifeExpectancy: /\blife expectancy\b/,
  food: /\b(food|foods|dish|dishes|cuisine|cuisines|eat|eaten|meal|meals|national dish)\b/,
  sport: /\b(sport|sports)\b/,
  defenseBudget: /\b(defen[cs]e (budget|spending)|military (budget|spending)|spends? on (the )?(defen[cs]e|military))\b/,
};

type Intent = keyof typeof INTENTS;

const detectIntents = (q: string) => (Object.keys(INTENTS) as Intent[]).filter((intent) => INTENTS[intent].test(q));

// Words that carry no meaning of their own; if nothing else is left, the query is just "tell me about X"
const FILLER_WORDS = new Set(
  'tell me about what is the a an of on in info information facts fact overview show give country nation about please quick summary details who are its it s'.split(
    ' '
  )
);
const isBareCountryQuery = (rest: string) => rest.trim().split(/\s+/).filter((w) => w && !FILLER_WORDS.has(w)).length === 0;

// ---------- Fact helpers ----------

const countryName = (c: CountryData) => expandAbbreviations(c.name);

// "the United States", "the Netherlands", "the Solomon Islands"; used mid-sentence after "of", "in" etc.
const NEEDS_ARTICLE = /^(United |Netherlands|Philippines|Central African|Democratic|Dem\. |Czech|Dominican Rep|Bahamas|Gambia|Maldives|Comoros|Vatican)|Islands$|Republic$|Emirates$/;
const theName = (c: CountryData) => {
  const name = countryName(c);
  return NEEDS_ARTICLE.test(name) ? `the ${name}` : name;
};
const TheName = (c: CountryData) => {
  const name = theName(c);
  return name[0].toUpperCase() + name.slice(1);
};

const realPopulation = (c: CountryData) => {
  const pop = getVerifiedSovereignInfo(c).population;
  return isRealPopulation(pop) ? pop : null;
};

const realLanguages = (c: CountryData) => {
  const curated = getVerifiedSovereignInfo(c).languages;
  if (isRealList(curated, 'National Language')) return curated;
  const langs = c.culture?.officialLanguages;
  return isRealList(langs, 'National Language') ? langs : null;
};

const realCurrency = (c: CountryData) =>
  isRealText(c.economy?.currencyName, 'National Currency')
    ? `${c.economy.currencyName}${c.economy.currencyCode ? ` (${c.economy.currencyCode})` : ''}`
    : null;

const realDishes = (c: CountryData) => {
  const profile = getCountryCulinaryProfile(c);
  const dishes = [...profile.nationalDishes, ...profile.popularStreetFoods, ...profile.dessertsAndPastries].filter(
    (d) => d?.name && !/national dish/i.test(d.name)
  );
  return dishes.length > 0 ? dishes : null;
};

const borderNames = (c: CountryData) =>
  c.geography.borders
    .map((code3) => countryList.find((x) => x.code3 === code3))
    .filter((x): x is CountryData => Boolean(x))
    .map(countryName);

// Islands legitimately have no land borders; for these, an empty list is not trustworthy
const UNRELIABLE_EMPTY_BORDERS = new Set(['Cyprus', 'N. Cyprus', 'Antarctica']);

const answer = (c: CountryData, text: string, keyFacts: string[], mediaQuery?: string, otherCountries: string[] = []): AskSearchResponse => ({
  success: true,
  answer: text,
  targetCountry: c.name,
  targetCountryCode: c.code,
  otherCountries,
  keyFacts,
  source: 'intelligence-registry',
  media: null,
  mediaQuery: mediaQuery || countryName(c),
});

// ---------- Single-country answers ----------

const answerForCountry = (c: CountryData, intents: Intent[]): AskSearchResponse | null => {
  const info = getVerifiedSovereignInfo(c);
  const name = theName(c);
  const Name = TheName(c);
  const pop = realPopulation(c);

  for (const intent of intents) {
    switch (intent) {
      case 'capital':
        return answer(c, `The capital of ${name} is ${info.capital}.`, [`Capital: ${info.capital}`, `Continent: ${c.continent}`], `${info.capital}, ${name}`);

      case 'president':
      case 'monarch':
      case 'primeMinister':
      case 'leader': {
        const facts = [`Head of state: ${info.president}`, `Head of government: ${info.headOfGovernment}`, `Government: ${info.governmentType}`];
        const isMonarchy = /^(king|queen|emperor|emir|sultan|prince|grand duke)\b/i.test(info.president);
        if (intent === 'primeMinister') {
          return answer(c, `The head of government of ${name} is ${info.headOfGovernment}.`, facts, info.headOfGovernment.split(' (')[0]);
        }
        if (intent === 'monarch') {
          const text = isMonarchy
            ? `The monarch of ${name} is ${info.president}. Day-to-day government is led by ${info.headOfGovernment}.`
            : `${Name} is not a monarchy. Its head of state is ${info.president}.`;
          return answer(c, text, facts, info.president);
        }
        if (intent === 'president' && !isMonarchy) {
          return answer(c, `The President of ${name} is ${info.president}.`, facts, info.president);
        }
        return answer(c, `${info.leader} leads ${name} as ${info.leaderRole}.`, facts, info.leader);
      }

      case 'population':
        if (!pop) return null;
        return answer(c, `${Name} has a population of about ${formatPopulation(pop)} (${pop.toLocaleString()} people).`, [
          `Population: ${pop.toLocaleString()}`,
          `Area: ${formatArea(info.areaKm2)}`,
          `Density: ~${Math.max(1, Math.round(pop / info.areaKm2)).toLocaleString()} people per km²`,
        ]);

      case 'area':
        return answer(c, `${Name} covers ${formatArea(info.areaKm2)}.`, [
          `Area: ${formatArea(info.areaKm2)}`,
          `Continent: ${c.continent}`,
          ...(pop ? [`Population: ${formatPopulation(pop)}`] : []),
        ]);

      case 'location': {
        const neighbours = borderNames(c);
        return answer(
          c,
          `${Name} is in ${c.subregion && c.subregion !== c.continent ? `${c.subregion}, ` : ''}${c.continent}. Its capital is ${info.capital}.${
            neighbours.length > 0 ? ` It borders ${neighbours.join(', ')}.` : ''
          }`,
          [`Continent: ${c.continent}`, `Region: ${c.subregion}`, `Capital: ${info.capital}`]
        );
      }

      case 'borders': {
        const neighbours = borderNames(c);
        if (neighbours.length === 0) {
          if (UNRELIABLE_EMPTY_BORDERS.has(c.name)) return null;
          return answer(c, `${Name} has no land borders with other countries.`, [`Continent: ${c.continent}`, `Region: ${c.subregion}`]);
        }
        return answer(c, `${Name} borders ${neighbours.length} ${neighbours.length === 1 ? 'country' : 'countries'}: ${neighbours.join(', ')}.`, [
          `Neighbours: ${neighbours.join(', ')}`,
          `Continent: ${c.continent}`,
        ]);
      }

      case 'currency': {
        const currency = realCurrency(c);
        if (!currency) return null;
        return answer(c, `The currency of ${name} is the ${currency}.`, [`Currency: ${currency}`], `${c.economy.currencyName}`);
      }

      case 'language': {
        const langs = realLanguages(c);
        if (!langs) return null;
        return answer(c, `The official language${langs.length > 1 ? 's' : ''} of ${name}: ${langs.join(', ')}.`, [`Languages: ${langs.join(', ')}`]);
      }

      case 'gdp':
        if (c.economy.gdpNominalUSD === PLACEHOLDER_GDP) return null;
        return answer(
          c,
          `${Name}'s nominal GDP is about ${formatBudget(c.economy.gdpNominalUSD)}${
            c.economy.gdpPerCapitaUSD ? ` (around $${c.economy.gdpPerCapitaUSD.toLocaleString()} per person)` : ''
          }.`,
          [`GDP: ${formatBudget(c.economy.gdpNominalUSD)}`, ...(c.economy.mainExports?.length ? [`Main exports: ${c.economy.mainExports.join(', ')}`] : [])]
        );

      case 'religion':
        if (!isRealList(c.culture.majorReligions, 'Predominant Regional Religions')) return null;
        return answer(c, `The main religions in ${name}: ${c.culture.majorReligions.join(', ')}.`, [`Religions: ${c.culture.majorReligions.join(', ')}`]);

      case 'government':
        if (!isRealText(c.governance.governmentType, 'Constitutional Democratic State')) return null;
        return answer(c, `${Name} is a ${c.governance.governmentType}.`, [`Government: ${c.governance.governmentType}`, `Head of state: ${info.president}`]);

      case 'motto':
        if (!isRealText(c.governance.nationalMotto, 'Unity and Progress')) return null;
        return answer(c, `The national motto of ${name} is "${c.governance.nationalMotto}".`, [`Motto: ${c.governance.nationalMotto}`]);

      case 'nationalDay':
        if (!isRealText(c.governance.nationalDay, 'National Independence Day')) return null;
        return answer(c, `${Name}'s national day is ${c.governance.nationalDay}.`, [`National day: ${c.governance.nationalDay}`]);

      case 'highestPoint':
        if (!isRealText(c.geography.highestPoint?.name, 'National Peak')) return null;
        return answer(
          c,
          `The highest point in ${name} is ${c.geography.highestPoint.name} at ${c.geography.highestPoint.elevationM.toLocaleString()} m.`,
          [`Highest point: ${c.geography.highestPoint.name} (${c.geography.highestPoint.elevationM.toLocaleString()} m)`],
          c.geography.highestPoint.name
        );

      case 'lifeExpectancy':
        if (!c.demographics.lifeExpectancy || c.demographics.lifeExpectancy === PLACEHOLDER_LIFE_EXPECTANCY) return null;
        return answer(c, `Life expectancy in ${name} is about ${c.demographics.lifeExpectancy} years.`, [`Life expectancy: ${c.demographics.lifeExpectancy} years`]);

      case 'food': {
        const dishes = realDishes(c);
        if (!dishes) return null;
        const top = dishes.slice(0, 5);
        return answer(
          c,
          `${Name}'s best-known foods include ${top.map((d) => d.name).join(', ')}.`,
          top.map((d) => `${d.name}: ${d.description}`),
          `${top[0].name}`
        );
      }

      case 'sport': {
        const sport = NATIONAL_SPORTS_REGISTRY[c.code];
        if (!sport) return null;
        return answer(c, `The national sport of ${name} is ${sport.sportName}. ${sport.description}`, [
          `Sport: ${sport.sportName}`,
          `Status: ${sport.status}`,
          ...(sport.iconicEventOrLeague ? [`Top competition: ${sport.iconicEventOrLeague}`] : []),
        ], sport.sportName);
      }

      case 'defenseBudget':
        // Generated records share a 0.5B placeholder budget; only answer for countries with real military data
        if (c.military.defenseBudgetUSD === 0.5 || c.economy.gdpNominalUSD === PLACEHOLDER_GDP) return null;
        return answer(c, `${Name} spends about ${formatBudget(c.military.defenseBudgetUSD)} a year on defence (${c.military.defenseBudgetPercentGDP}% of GDP).`, [
          `Defence budget: ${formatBudget(c.military.defenseBudgetUSD)}`,
          `Share of GDP: ${c.military.defenseBudgetPercentGDP}%`,
        ]);
    }
  }
  return null;
};

const overviewForCountry = (c: CountryData): AskSearchResponse => {
  const info = getVerifiedSovereignInfo(c);
  const name = theName(c);
  const Name = TheName(c);
  const pop = realPopulation(c);
  const currency = realCurrency(c);
  const langs = realLanguages(c);
  const facts = [
    `Capital: ${info.capital}`,
    `Leader: ${info.leader} (${info.leaderRole})`,
    `Area: ${formatArea(info.areaKm2)}`,
    ...(pop ? [`Population: ${formatPopulation(pop)}`] : []),
    ...(currency ? [`Currency: ${currency}`] : []),
    ...(langs ? [`Languages: ${langs.join(', ')}`] : []),
  ];
  return answer(
    c,
    `${Name} is a country in ${c.subregion && c.subregion !== c.continent ? `${c.subregion}, ` : ''}${c.continent}, with its capital at ${info.capital}. It covers ${formatArea(
      info.areaKm2
    )}${pop ? ` and has about ${formatPopulation(pop)} people` : ''}.`,
    facts
  );
};

// ---------- Comparisons ----------

const COMPARE = /\b(bigger|larger|smaller|more populous|more people|fewer people|less populous|richer|poorer|vs|versus|compare|compared|comparison|difference between)\b/;

const compareCountries = (a: CountryData, b: CountryData, q: string): AskSearchResponse | null => {
  const nameA = theName(a);
  const nameB = theName(b);
  let metric: 'population' | 'area' | 'gdp' = 'area';
  if (has(q, /\b(populous|population|people|inhabitants)\b/)) metric = 'population';
  else if (has(q, /\b(richer|poorer|gdp|economy|economies)\b/)) metric = 'gdp';

  const value = (c: CountryData) => {
    if (metric === 'population') return realPopulation(c);
    if (metric === 'gdp') return c.economy.gdpNominalUSD === PLACEHOLDER_GDP ? null : c.economy.gdpNominalUSD;
    return getVerifiedSovereignInfo(c).areaKm2;
  };
  const va = value(a);
  const vb = value(b);
  if (!va || !vb) return null;

  const format = (v: number) => (metric === 'population' ? `${formatPopulation(v)} people` : metric === 'gdp' ? `${formatBudget(v)} GDP` : formatArea(v));
  const [big, small, vBig, vSmall] = va >= vb ? [nameA, nameB, va, vb] : [nameB, nameA, vb, va];
  const ratio = vBig / vSmall;
  const word = metric === 'population' ? 'more populous' : metric === 'gdp' ? 'richer (by GDP)' : 'larger';
  const ratioText = ratio >= 1.95 ? `about ${ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)} times` : `${Math.round((ratio - 1) * 100)}%`;

  return {
    success: true,
    answer: `${big[0].toUpperCase()}${big.slice(1)} is ${word} than ${small}: ${format(vBig)} versus ${format(vSmall)}, ${ratioText} ${ratio >= 1.95 ? 'as much' : 'more'}.`,
    targetCountry: va >= vb ? a.name : b.name,
    targetCountryCode: va >= vb ? a.code : b.code,
    otherCountries: [va >= vb ? b.name : a.name],
    keyFacts: [`${nameA}: ${format(va)}`, `${nameB}: ${format(vb)}`],
    source: 'intelligence-registry',
    media: null,
    mediaQuery: big,
  };
};

// ---------- Rankings ----------

const RANKING = /\b(largest|biggest|smallest|most populous|least populous|top \d+|top ten|top five)\b/;
const COUNTRY_WORD = /\b(country|countries|nation|nations|states)\b/;

const rankCountries = (q: string, continent: CountryData['continent'] | null): AskSearchResponse | null => {
  if (!has(q, RANKING) || !(has(q, COUNTRY_WORD) || continent)) return null;
  // Military, economic and other rankings come from curated lists on the server
  if (has(q, /\b(army|armies|military|navy|navies|naval|air force|gdp|economy|economies|richest|poorest|city|cities|mountain|mountains|river|rivers|lake|lakes|desert|island|islands|airport|company|companies)\b/)) {
    return null;
  }

  const metric: 'population' | 'area' = has(q, /\b(populous|population|people|inhabitants)\b/) ? 'population' : 'area';
  const ascending = has(q, /\b(smallest|least populous|fewest)\b/);
  const topMatch = q.match(/\btop (\d+)\b/);
  const requested = topMatch ? parseInt(topMatch[1], 10) : has(q, /\btop ten\b/) ? 10 : has(q, /\btop five\b/) ? 5 : 10;
  const count = Math.min(Math.max(requested, 1), 50);

  // 103 records carry a placeholder population; only world-wide top-10 population lists are
  // safe, because every country that large has real data
  if (metric === 'population' && (continent || ascending || count > 10)) return null;

  const pool = countryList
    .filter((c) => !NON_SOVEREIGN.has(c.name) && (!continent || c.continent === continent))
    .map((c) => ({ c, v: metric === 'population' ? realPopulation(c) : getVerifiedSovereignInfo(c).areaKm2 }))
    .filter((x): x is { c: CountryData; v: number } => Boolean(x.v));
  pool.sort((a, b) => (ascending ? a.v - b.v : b.v - a.v));
  const top = pool.slice(0, count);
  if (top.length === 0) return null;

  const scope = continent ? `in ${continent}` : 'in the world';
  const label = metric === 'population' ? (ascending ? 'least populous' : 'most populous') : ascending ? 'smallest' : 'largest';
  const format = (v: number) => (metric === 'population' ? `${formatPopulation(v)} people` : formatArea(v));

  const items: RankedListItem[] = top.map(({ c, v }, i) => ({
    rank: i + 1,
    name: countryName(c),
    countryCode: c.code,
    stat: format(v),
    detail: `Capital: ${getVerifiedSovereignInfo(c).capital} · ${c.subregion || c.continent}`,
    badge: c.continent,
  }));

  const leader = top[0];
  return {
    success: true,
    answer: `The ${label} country ${scope} is ${theName(leader.c)}, at ${format(leader.v)}.${
      top.length > 1 ? ` Next: ${top.slice(1, 5).map(({ c }) => countryName(c)).join(', ')}.` : ''
    }`,
    targetCountry: leader.c.name,
    targetCountryCode: leader.c.code,
    otherCountries: top.slice(1, 10).map(({ c }) => c.name),
    keyFacts: top.slice(0, 3).map(({ c, v }, i) => `#${i + 1} ${countryName(c)}: ${format(v)}`),
    rankedList: {
      title: `${top.length > 1 ? `Top ${top.length} ` : ''}${label[0].toUpperCase()}${label.slice(1)} Countries ${scope[0].toUpperCase()}${scope.slice(1)}`,
      category: metric === 'population' ? 'Population' : 'Land Area',
      metricName: metric === 'population' ? 'Population' : 'Total area (km²)',
      items,
    },
    source: 'intelligence-registry',
    media: null,
    mediaQuery: countryName(leader.c),
  };
};

// ---------- Entry point ----------

export function answerFromLocalData(query: string): AskSearchResponse | null {
  const q = normalize(query);
  if (q.trim().length < 3 || has(q, NEEDS_REASONING)) return null;

  const { countries, continent, rest } = findEntities(q);

  if (countries.length === 0) {
    return rankCountries(q, continent);
  }

  if (countries.length === 2 && has(q, COMPARE)) {
    return compareCountries(countries[0], countries[1], q);
  }

  if (countries.length !== 1) return null;
  const country = countries[0];

  const intents = detectIntents(q);
  if (intents.length > 0) {
    return answerForCountry(country, intents);
  }

  return isBareCountryQuery(rest) ? overviewForCountry(country) : null;
}
