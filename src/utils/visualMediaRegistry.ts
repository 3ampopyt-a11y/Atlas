import { VisualMedia } from '../types.ts';

export const KNOWN_VISUAL_ASSETS: {
  id: string;
  keywords: string[];
  excludes?: string[]; // a query containing any of these never gets this picture
  media: VisualMedia;
}[] = [
  {
    id: 'an225',
    keywords: [
      'biggest plane',
      'largest plane',
      'biggest airplane',
      'largest aircraft',
      'biggest aircraft',
      'an-225',
      'an 225',
      'antonov',
      'mriya',
      'stratolaunch',
      'largest cargo plane',
      'heaviest plane',
      'heaviest aircraft',
    ],
    // "largest aircraft carrier" is a ship
    excludes: ['carrier'],
    media: {
      title: 'Antonov An-225 Mriya ("Dream")',
      subtitle: 'World\'s Heaviest & Largest Cargo Transport Aircraft Ever Built',
      imageUrl: '/media/antonov_an225_plane_1790846553224.jpg',
      category: 'Military & Strategic Aerospace / Super-Heavy Airlift',
      badge: 'World\'s Largest Plane',
      specs: [
        { label: 'Primary Title', value: 'Heaviest aircraft ever built (Max takeoff wt: 640 tonnes / 1.41M lb)' },
        { label: 'Wingspan', value: '88.4 m (290 ft 0 in) — wider than a football pitch' },
        { label: 'Length', value: '84 m (275 ft 7 in)' },
        { label: 'Engines', value: '6 × Progress D-18T turbofans (309.6 kN thrust total)' },
        { label: 'Max Payload', value: '250 tonnes (550,000 lb / can carry 4 main battle tanks)' },
        { label: 'Current Status', value: 'Single prototype built (UR-82060); destroyed in 2022 Battle of Antonov Airport' },
        { label: 'Widest Wingspan Record', value: 'Stratolaunch Roc (117m / 385 ft) holds current operational wingspan record' },
      ],
    },
  },
  {
    id: 'c17',
    keywords: ['c-17', 'c 17', 'c17', 'globemaster', 'boeing c-17', 'strategic airlifter', 'heavy transport'],
    media: {
      title: 'Boeing C-17 Globemaster III',
      subtitle: 'Strategic Heavy Military Transport & Airlift Aircraft',
      imageUrl: '/media/c17_globemaster_aircraft_1790844391224.jpg',
      category: 'Military Aviation / Strategic Transport',
      badge: 'Heavy Airlifter',
      specs: [
        { label: 'Manufacturer', value: 'Boeing / McDonnell Douglas (USA)' },
        { label: 'Primary Role', value: 'Long-Range Strategic & Tactical Airlift' },
        { label: 'Max Payload', value: '77,500 kg (170,900 lb / ~77.5 tons)' },
        { label: 'Cargo Capacity', value: '1 M1 Abrams Tank or 3 Strykers or 102 Paratroopers' },
        { label: 'Cruise Speed', value: '830 km/h (450 knots / Mach 0.74)' },
        { label: 'Service Ceiling', value: '13,716 m (45,000 ft)' },
        { label: 'Operational Range', value: '4,480 km (2,420 nmi) fully loaded' },
        { label: 'Operators', value: 'USA, UK, Australia, Canada, India, UAE, Qatar, Kuwait, NATO' },
      ],
    },
  },
  {
    id: 'stealth_fighter',
    keywords: ['fighter', 'f-22', 'f 22', 'f22', 'f-35', 'f 35', 'f35', 'stealth jet', 'su-57', 'j-20', 'raptor', 'lightning', 'air superiority'],
    media: {
      title: '5th-Generation Stealth Multirole Fighter',
      subtitle: 'Advanced Air Superiority & Precision Strike Combat Aircraft',
      imageUrl: '/media/stealth_fighter_jet_1790844403054.jpg',
      category: 'Military Aviation / Combat',
      badge: '5th Gen Fighter',
      specs: [
        { label: 'Primary Role', value: 'Air Dominance, Multi-Role Strike & Electronic Warfare' },
        { label: 'Max Speed', value: 'Mach 2.0+ (Supersonic Supercruise Capability)' },
        { label: 'Radar Cross Section', value: 'Very Low Observable (VLO) Stealth Radar Profile' },
        { label: 'Avionics', value: 'Active Electronically Scanned Array (AESA) Radar & Sensor Fusion' },
        { label: 'Armament', value: 'Internal Weapons Bays (AIM-120 AMRAAM, JDAMs, Sidewinder)' },
        { label: 'Combat Radius', value: '1,100+ km without external fuel tanks' },
      ],
    },
  },
  {
    id: 'aircraft_carrier',
    keywords: ['aircraft carrier', 'carrier', 'supercarrier', 'izumo', 'kaga', 'nimitz', 'ford class', 'fujian', 'naval fleet', 'warship'],
    media: {
      title: 'Fleet Aircraft Carrier (Supercarrier)',
      subtitle: 'Capital Naval Surface Warship & Mobile Maritime Airbase',
      imageUrl: '/media/naval_aircraft_carrier_1790844415538.jpg',
      category: 'Naval Warfare / Capital Ships',
      badge: 'Fleet Flagship',
      specs: [
        { label: 'Displacement', value: '27,000 to 100,000+ Long Tons' },
        { label: 'Air Wing Capacity', value: 'Up to 75–90+ Fixed-Wing Aircraft & Helicopters' },
        { label: 'Flight Deck Length', value: 'Up to 333 m (1,092 ft) with CATOBAR / STOVL' },
        { label: 'Propulsion', value: 'Nuclear Reactors (USA, France) or Gas Turbines' },
        { label: 'Top Speed', value: '30+ Knots (56+ km/h)' },
        { label: 'Role', value: 'Global Forward Presence, Strike Operations & Power Projection' },
      ],
    },
  },
  {
    id: 'main_battle_tank',
    keywords: ['tank', 'mbt', 't-90', 't 90', 'abrams', 'm1a2', 'leopard', 't-72', 't-14', 'armata', 'challenger', 'armor'],
    media: {
      title: 'Main Battle Tank (MBT)',
      subtitle: 'Heavy Armored Front-Line Ground Combat Vehicle',
      imageUrl: '/media/main_battle_tank_1790844425943.jpg',
      category: 'Ground Forces / Armored Warfare',
      badge: 'Armored Cavalry',
      specs: [
        { label: 'Main Gun', value: '120mm / 125mm Smoothbore Cannon with APFSDS rounds' },
        { label: 'Armor Protection', value: 'Composite Chobham Armor + Explosive Reactive Armor (ERA)' },
        { label: 'Active Protection', value: 'Hard-Kill / Soft-Kill APS (Trophy, Arena, Afghanit)' },
        { label: 'Top Speed', value: '65–72 km/h (40–45 mph)' },
        { label: 'Operational Range', value: '450–500 km on internal fuel' },
        { label: 'Crew', value: '3 to 4 Operators (Commander, Gunner, Driver, Loader)' },
      ],
    },
  },
  {
    id: 'naval_frigate',
    keywords: [
      'frigate',
      'portugal naval',
      'portugal navy',
      'marinha',
      'naval force',
      'naval fleet',
      'patrol boat',
      'corvette',
      'warship',
      'vasco da gama',
      'bartolomeu dias',
    ],
    media: {
      title: 'Multi-Role Guided Missile Frigate',
      subtitle: 'Modern Naval Surface Combatant & Maritime Patrol Warship',
      imageUrl: '/media/naval_frigate_warship_1791545175618.jpg',
      category: 'Naval Warfare / Surface Combatants',
      badge: 'Fleet Warship',
      specs: [
        { label: 'Primary Role', value: 'Anti-Submarine (ASW), Air Defense & Sovereign Maritime Patrol' },
        { label: 'Displacement', value: '3,200 to 6,000 tonnes' },
        { label: 'Armament', value: 'Harpoon / Exocet Anti-Ship Missiles, Torpedo Tubes & Naval Gun' },
        { label: 'Speed', value: '28–30+ knots (55 km/h)' },
        { label: 'Aviation', value: '1 × Medium Naval ASW Helicopter (Lynx / NH90 / Seahawk)' },
        { label: 'Portuguese Fleet Role', value: 'Core of Portuguese Navy (Marinha Portuguesa) Frigate Squadron' },
      ],
    },
  },
];

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Whole words only, so "tank" doesn't fire inside "tanker"
const hasKeyword = (text: string, keyword: string) =>
  new RegExp(`(^|[^a-z0-9])${escapeRegExp(keyword)}($|[^a-z0-9])`).test(text);

/**
 * The curated picture for a question, matched on the question alone (answers mention too much
 * in passing); the longest matching keyword wins
 */
export function findVisualMedia(query: string): VisualMedia | null {
  const q = query.toLowerCase();
  let best: { media: VisualMedia; length: number } | null = null;
  for (const asset of KNOWN_VISUAL_ASSETS) {
    if (asset.excludes?.some((x) => q.includes(x))) continue;
    for (const k of asset.keywords) {
      if (k.length > (best?.length ?? 0) && hasKeyword(q, k)) best = { media: asset.media, length: k.length };
    }
  }
  return best?.media ?? null;
}

const toWikiMedia = (title: string, description: string | undefined, imageUrl: string): VisualMedia => ({
  title,
  subtitle: description || 'Wikipedia',
  imageUrl,
  category: 'Encyclopedic Visual Intelligence',
  badge: 'Verified Photo',
});

// The lead image of the Wikipedia article with exactly this title
async function wikiArticleImage(title: string, skip: string[]): Promise<VisualMedia | null> {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  const data: any = await res.json();
  if (data.type === 'disambiguation') return null;
  const img = data.originalimage?.source || data.thumbnail?.source;
  return img && !skip.includes(img) ? toWikiMedia(data.title || title, data.description, img) : null;
}

// The best-ranked of the top search results that has a lead image
async function wikiSearchImage(text: string, skip: string[]): Promise<VisualMedia | null> {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrlimit=6' +
    `&gsrsearch=${encodeURIComponent(text)}&prop=pageimages|description&piprop=original|thumbnail&pithumbsize=1280`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data: any = await res.json();
  const pages: any[] = Object.values(data.query?.pages || {}).sort((a: any, b: any) => a.index - b.index);
  for (const p of pages) {
    const img = p.original?.source || p.thumbnail?.source;
    if (img && !skip.includes(img)) return toWikiMedia(p.title, p.description, img);
  }
  return null;
}

/**
 * A Wikipedia photo for the first subject that has one: each subject is tried as an exact
 * article title, then as a search. Images in skip (ones that failed to load) are passed over.
 */
export async function fetchWikiMediaFor(subjects: (string | null | undefined)[], skip: string[] = []): Promise<VisualMedia | null> {
  const tried = new Set<string>();
  for (const raw of subjects) {
    const subject = raw?.trim();
    if (!subject || subject.length < 2 || tried.has(subject.toLowerCase())) continue;
    tried.add(subject.toLowerCase());
    try {
      const media = (await wikiArticleImage(subject, skip)) || (await wikiSearchImage(subject, skip));
      if (media) return media;
    } catch (err) {
      console.warn('Wikipedia photo lookup failed:', err);
    }
  }
  return null;
}
