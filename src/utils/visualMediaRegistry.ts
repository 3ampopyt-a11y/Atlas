import { VisualMedia } from '../types.ts';

export const KNOWN_VISUAL_ASSETS: {
  id: string;
  keywords: string[];
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
    media: {
      title: 'Antonov An-225 Mriya ("Dream")',
      subtitle: 'World\'s Heaviest & Largest Cargo Transport Aircraft Ever Built',
      imageUrl: '/src/assets/images/antonov_an225_plane_1790846553224.jpg',
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
      imageUrl: '/src/assets/images/c17_globemaster_aircraft_1790844391224.jpg',
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
      imageUrl: '/src/assets/images/stealth_fighter_jet_1790844403054.jpg',
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
      imageUrl: '/src/assets/images/naval_aircraft_carrier_1790844415538.jpg',
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
      imageUrl: '/src/assets/images/main_battle_tank_1790844425943.jpg',
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
      imageUrl: '/src/assets/images/naval_frigate_warship_1791545175618.jpg',
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

/**
 * Finds matching visual media for a user query and/or AI response text
 */
export function findVisualMedia(query: string, answer?: string): VisualMedia | null {
  const qLower = query.toLowerCase();

  // 1. Direct match on user query takes priority
  for (const asset of KNOWN_VISUAL_ASSETS) {
    if (asset.keywords.some((k) => qLower.includes(k))) {
      return asset.media;
    }
  }

  // 2. Fallback to combined text
  const combined = `${query} ${answer || ''}`.toLowerCase();
  for (const asset of KNOWN_VISUAL_ASSETS) {
    if (asset.keywords.some((k) => combined.includes(k))) {
      return asset.media;
    }
  }

  return null;
}

/**
 * Dynamically queries Wikipedia summary & image APIs to fetch real, verified encyclopedic photos for any subject.
 */
export async function fetchDynamicWikiMedia(subject: string): Promise<VisualMedia | null> {
  if (!subject || typeof subject !== 'string') return null;
  const clean = subject.trim();
  if (!clean || clean.length < 2) return null;

  try {
    // 1. Direct summary fetch
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(clean)}`;
    const res = await fetch(summaryUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (res.ok) {
      const data: any = await res.json();
      const img = data.originalimage?.source || data.thumbnail?.source;
      if (img) {
        return {
          title: data.title || clean,
          subtitle: data.description || 'Verified Global Visual Reference',
          imageUrl: img,
          category: 'Encyclopedic Visual Intelligence',
          badge: 'Verified Photo',
        };
      }
    }

    // 2. OpenSearch / Search fallback
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(clean)}&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    if (searchRes.ok) {
      const searchData: any = await searchRes.json();
      const firstHit = searchData.query?.search?.[0];
      if (firstHit?.title) {
        const pageSumUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
        const pageRes = await fetch(pageSumUrl, {
          headers: { 'Accept': 'application/json' },
        });
        if (pageRes.ok) {
          const pageData: any = await pageRes.json();
          const img = pageData.originalimage?.source || pageData.thumbnail?.source;
          if (img) {
            return {
              title: pageData.title || firstHit.title,
              subtitle: pageData.description || 'Verified Global Visual Reference',
              imageUrl: img,
              category: 'Encyclopedic Visual Intelligence',
              badge: 'Verified Photo',
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn('Wiki dynamic media fetch notice:', err);
  }

  return null;
}

