import { CountryData, MapMetricMode } from '../types.ts';
import { getPlateForCountryCode } from '../data/tectonicData.ts';
import { getCountryClimateZone } from '../data/climateData.ts';

// Continent distinct political colors
const CONTINENT_COLORS: Record<string, string> = {
  'North America': '#38bdf8', // Sky 400
  'South America': '#34d399', // Emerald 400
  'Europe': '#818cf8',        // Indigo 400
  'Asia': '#fb923c',          // Orange 400
  'Africa': '#facc15',        // Amber 400
  'Oceania': '#f472b6',       // Pink 400
  'Antarctica': '#94a3b8',    // Slate 400
};

// Subtle refined shades for Flags & Countries default mode
const FLAGS_MODE_TINTS: Record<string, string> = {
  'North America': '#1e3a5f',
  'South America': '#1b4332',
  'Europe': '#2d2d5a',
  'Asia': '#4a2c16',
  'Africa': '#4d3d14',
  'Oceania': '#4a2040',
  'Antarctica': '#334155',
};

export function getCountryFillColor(
  country: CountryData | undefined,
  mode: MapMetricMode,
  isSelected: boolean,
  isHovered: boolean
): string {
  if (!country) {
    return isHovered ? '#334155' : '#1e293b'; // Unmatched territory default
  }

  // In non-flag modes, selected country gets bright cyan fill
  if (isSelected && mode !== 'flags') {
    return '#38bdf8'; // Accent glow when selected
  }

  switch (mode) {
    case 'flags': {
      // Flag Map: Fill the country with its national flag pattern!
      const code = country.code?.toLowerCase();
      if (code && code.length === 2 && /^[a-z]{2}$/.test(code)) {
        return `url(#flag-pat-${code})`;
      }
      const base = FLAGS_MODE_TINTS[country.continent] || '#1e293b';
      return isHovered ? lightenColor(base, 35) : base;
    }

    case 'war': {
      // War & Troops mode: Tactical military display
      const troops = country.military.activePersonnel;
      const isNuclear = country.military.nuclearStatus === 'Declared Nuclear State' || country.military.nuclearStatus === 'Undeclared Nuclear State';
      if (isNuclear && troops >= 1000000) return isHovered ? '#ef4444' : '#b91c1c'; // Red alert (US, RU, CN)
      if (isNuclear) return isHovered ? '#f97316' : '#c2410c'; // Nuclear armed (FR, UK, IN, PK, IL, KP)
      if (troops >= 400000) return isHovered ? '#eab308' : '#a16207'; // Massive standing army (KR, VN, TR, IR, EG, UA)
      if (troops >= 150000) return isHovered ? '#8b5cf6' : '#6d28d9'; // Major regional army
      if (troops >= 50000) return isHovered ? '#06b6d4' : '#0e7490';  // Active defense
      return isHovered ? '#475569' : '#1e293b'; // Minimal / Neutral forces
    }

    case 'climate': {
      // Climate classification mode
      const zone = getCountryClimateZone(country.code, country.continent, country.geography.climate);
      return isHovered ? lightenColor(zone.color, 15) : zone.color;
    }

    case 'tectonic': {
      // Tectonic bedrock & geologic crust tone
      if (country.continent === 'North America') return isHovered ? '#3b82f6' : '#1d4ed8';
      if (country.continent === 'South America') return isHovered ? '#ec4899' : '#be185d';
      if (country.continent === 'Europe') return isHovered ? '#8b5cf6' : '#6d28d9';
      if (country.continent === 'Asia') return isHovered ? '#a855f7' : '#7e22ce';
      if (country.continent === 'Africa') return isHovered ? '#f59e0b' : '#b45309';
      if (country.continent === 'Oceania') return isHovered ? '#10b981' : '#047857';
      return isHovered ? '#64748b' : '#334155';
    }

    case 'altitude': {
      // Hypsometric elevation scale based on highest point
      const elev = country.geography.highestPoint?.elevationM || 500;
      if (elev >= 7000) return isHovered ? '#f1f5f9' : '#cbd5e1'; // Extreme alpine snow peaks (Everest/K2/Aconcagua)
      if (elev >= 5000) return isHovered ? '#fb923c' : '#c2410c'; // High mountain cordillera
      if (elev >= 3000) return isHovered ? '#facc15' : '#ca8a04'; // Mountain ranges (Alps, Rockies)
      if (elev >= 1500) return isHovered ? '#84cc16' : '#4d7c0f'; // Uplands & highlands
      if (elev >= 500) return isHovered ? '#10b981' : '#047857';  // Plateaus & hills
      return isHovered ? '#06b6d4' : '#0f766e';                   // Lowlands & coastal plains
    }

    case 'biomes': {
      // Biomes mode: Natural desert (Sahara = yellow), forests = forest green
      const code = (country.code || '').toUpperCase();
      const text = (country.geography.climate + ' ' + country.geography.terrain).toLowerCase();

      // Deserts & Sahara
      const isSaharaOrDesert =
        ['EG', 'SA', 'DZ', 'LY', 'AE', 'IQ', 'KW', 'QA', 'OM', 'YE', 'MA', 'TN', 'SD', 'MR', 'NE', 'TD', 'SO', 'ML', 'EH', 'DJ', 'NA', 'BW'].includes(code) ||
        text.includes('desert') ||
        (text.includes('arid') && !text.includes('semi-arid'));

      if (isSaharaOrDesert) {
        return isHovered ? '#fde047' : '#facc15'; // Vibrant Sahara Sand Yellow!
      }

      // Rainforests (Amazon, Congo, SE Asia)
      if (text.includes('rainforest') || (text.includes('tropical') && text.includes('wet')) || ['BR', 'ID', 'CD', 'CO', 'MY', 'PE', 'EC', 'PG'].includes(code)) {
        return isHovered ? '#16a34a' : '#14532d'; // Deep Jungle Rainforest Green
      }

      // Icy Arctic / Tundra
      if (text.includes('tundra') || text.includes('ice') || text.includes('arctic') || ['GL', 'IS', 'AQ'].includes(code)) {
        return isHovered ? '#bae6fd' : '#7dd3fc'; // Icy arctic/tundra
      }

      // Boreal Taiga Forest
      if (text.includes('taiga') || text.includes('boreal') || ['RU', 'CA', 'FI', 'SE', 'NO', 'EE'].includes(code)) {
        return isHovered ? '#22c55e' : '#16a34a'; // Boreal Taiga Forest Green
      }

      // Savanna & Grasslands
      if (text.includes('savanna') || text.includes('grassland') || text.includes('steppe') || ['KZ', 'MN'].includes(code)) {
        return isHovered ? '#facc15' : '#ca8a04'; // Warm savanna amber
      }

      // Maritime oceanic nations
      if (country.geography.coastlineKm > 10000 || ['JP', 'NZ', 'PH', 'GB', 'ID'].includes(code)) {
        return isHovered ? '#38bdf8' : '#0284c7'; // Maritime oceanic nation
      }

      // Temperate forests and woodlands
      return isHovered ? '#4ade80' : '#15803d'; // Temperate Forest Green
    }

    case 'political': {
      const base = CONTINENT_COLORS[country.continent] || '#94a3b8';
      return isHovered ? lightenColor(base, 25) : darkenColor(base, 35);
    }

    case 'militaryRank': {
      const rank = country.military.globalRank;
      if (rank <= 3) return isHovered ? '#f87171' : '#dc2626'; // Superpower top 3 (US, Russia, China)
      if (rank <= 10) return isHovered ? '#fb923c' : '#ea580c'; // Top 10
      if (rank <= 25) return isHovered ? '#facc15' : '#ca8a04'; // Top 25 regional powers
      if (rank <= 50) return isHovered ? '#a78bfa' : '#7c3aed'; // Middle powers
      if (rank <= 90) return isHovered ? '#38bdf8' : '#0284c7'; // Regional forces
      return isHovered ? '#64748b' : '#334155'; // Developing / minimal
    }

    case 'longevity': {
      const years = country.longevity.yearsAlive;
      if (years >= 2000) return isHovered ? '#34d399' : '#059669'; // Ancient continuous (2,000+ years)
      if (years >= 1000) return isHovered ? '#2dd4bf' : '#0d9488'; // 1,000 - 1,999 years
      if (years >= 500) return isHovered ? '#38bdf8' : '#0284c7';  // 500 - 999 years
      if (years >= 200) return isHovered ? '#818cf8' : '#4f46e5';  // 200 - 499 years
      if (years >= 100) return isHovered ? '#c084fc' : '#9333ea';  // 100 - 199 years
      return isHovered ? '#fb7185' : '#e11d48';                     // <100 years
    }

    case 'defenseBudget': {
      const b = country.military.defenseBudgetUSD;
      if (b >= 200) return isHovered ? '#f87171' : '#dc2626'; // Mega defense (US, China)
      if (b >= 50) return isHovered ? '#fb923c' : '#ea580c';  // Heavy defense (RU, IN, UK, DE, JP, FR)
      if (b >= 20) return isHovered ? '#facc15' : '#ca8a04';  // Top 20 defense
      if (b >= 5) return isHovered ? '#34d399' : '#059669';   // Mid tier
      if (b >= 1) return isHovered ? '#38bdf8' : '#0284c7';   // Modest
      return isHovered ? '#64748b' : '#334155';
    }

    case 'activePersonnel': {
      const p = country.military.activePersonnel;
      if (p >= 1000000) return isHovered ? '#f87171' : '#dc2626'; // Over 1M troops
      if (p >= 400000) return isHovered ? '#fb923c' : '#ea580c';
      if (p >= 150000) return isHovered ? '#facc15' : '#ca8a04';
      if (p >= 50000) return isHovered ? '#38bdf8' : '#0284c7';
      return isHovered ? '#64748b' : '#334155';
    }

    case 'population': {
      const pop = country.demographics.population;
      if (pop >= 500000000) return isHovered ? '#f87171' : '#dc2626'; // 500M+
      if (pop >= 100000000) return isHovered ? '#fb923c' : '#ea580c'; // 100M+
      if (pop >= 40000000) return isHovered ? '#facc15' : '#ca8a04';  // 40M+
      if (pop >= 10000000) return isHovered ? '#38bdf8' : '#0284c7';  // 10M+
      return isHovered ? '#64748b' : '#334155';
    }

    case 'area': {
      const area = country.geography.areaKm2;
      if (area >= 5000000) return isHovered ? '#34d399' : '#059669'; // 5M+ km2
      if (area >= 1500000) return isHovered ? '#2dd4bf' : '#0d9488';
      if (area >= 500000) return isHovered ? '#38bdf8' : '#0284c7';
      if (area >= 100000) return isHovered ? '#818cf8' : '#4f46e5';
      return isHovered ? '#64748b' : '#334155';
    }

    case 'tectonic': {
      const plate = getPlateForCountryCode(country.code);
      if (plate) {
        return isHovered ? lightenColor(plate.color, 35) : darkenColor(plate.color, 15);
      }
      return isHovered ? '#475569' : '#1e293b';
    }

    default:
      return isHovered ? '#475569' : '#1e293b';
  }
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
