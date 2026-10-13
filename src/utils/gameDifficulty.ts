import { CountryData } from '../types.ts';

export type GameDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface DifficultyConfig {
  id: GameDifficulty;
  name: string;
  badge: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  shortDesc: string;
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<GameDifficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: 'Easy',
    badge: '🟢',
    color: '#10b981',
    bgClass: 'bg-emerald-500/15',
    borderClass: 'border-emerald-500/50 hover:border-emerald-400',
    textClass: 'text-emerald-400',
    shortDesc: 'Iconic flags & major capitals',
    description: 'World-famous nations with universally recognized flags and prominent capitals (e.g. USA, UK, France, Japan, Brazil).',
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    badge: '🟡',
    color: '#eab308',
    bgClass: 'bg-amber-500/15',
    borderClass: 'border-amber-500/50 hover:border-amber-400',
    textClass: 'text-amber-400',
    shortDesc: 'World nations & regional leaders',
    description: 'Familiar countries, regional capitals, and established world flags (e.g. Sweden, Argentina, Egypt, Poland, South Korea).',
  },
  hard: {
    id: 'hard',
    name: 'Hard',
    badge: '🟠',
    color: '#f97316',
    bgClass: 'bg-orange-500/15',
    borderClass: 'border-orange-500/50 hover:border-orange-400',
    textClass: 'text-orange-400',
    shortDesc: 'Challenging flags & lesser-known capitals',
    description: 'Lesser-known nations, smaller states, and trickier flags/capitals (e.g. Kazakhstan, Paraguay, Estonia, Senegal, Iceland).',
  },
  extreme: {
    id: 'extreme',
    name: 'Extremely Hard',
    badge: '🔴',
    color: '#ef4444',
    bgClass: 'bg-rose-500/15',
    borderClass: 'border-rose-500/50 hover:border-rose-400',
    textClass: 'text-rose-400',
    shortDesc: 'Microstates, obscure islands & tricky flags',
    description: 'Rare island nations, European microstates, obscure flags, and tricky geography (e.g. Tuvalu, Palau, Comoros, Liechtenstein, Nauru).',
  },
};

// Curated Easy list (~45 globally famous nations)
const EASY_COUNTRY_CODES = new Set([
  'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'JP', 'CN', 'IN', 'BR',
  'CA', 'AU', 'RU', 'MX', 'KR', 'SA', 'TR', 'EG', 'AR', 'ZA',
  'GR', 'NL', 'SE', 'CH', 'PT', 'IE', 'NZ', 'NO', 'PL', 'AT',
  'BE', 'DK', 'FI', 'ID', 'PH', 'TH', 'VN', 'SG', 'IL', 'AE',
  'CL', 'CO', 'PE', 'MY', 'NG'
]);

// Curated Medium list (~55 familiar nations)
const MEDIUM_COUNTRY_CODES = new Set([
  'CZ', 'HU', 'RO', 'UA', 'HR', 'IS', 'RS', 'BG', 'SK', 'UY',
  'EC', 'CR', 'PA', 'CU', 'JM', 'VE', 'DO', 'TW', 'PK', 'BD',
  'IR', 'IQ', 'QA', 'JO', 'LB', 'LK', 'NP', 'KZ', 'UZ', 'DZ',
  'ET', 'GH', 'TZ', 'TN', 'SN', 'ZW', 'UG', 'FJ', 'PG', 'KE',
  'MA', 'CY', 'LU', 'SI', 'BA', 'AL', 'GE', 'AZ', 'AM', 'MN',
  'OM', 'KW', 'BH', 'BO', 'PY'
]);

// Curated Extremely Hard list (microstates, small island nations, rare obscure countries)
const EXTREME_COUNTRY_CODES = new Set([
  'AD', 'MC', 'SM', 'VA', 'LI', // European Microstates
  'TV', 'NR', 'PW', 'FM', 'MH', 'KI', 'VU', 'SB', 'WS', 'TO', // Pacific Islands
  'ST', 'CV', 'KM', 'SC', 'MU', 'MV', // Small Island Nations (Indian & Atlantic)
  'KN', 'DM', 'LC', 'VC', 'GD', 'AG', 'BB', // Lesser Antilles Micro-Islands
  'DJ', 'ER', 'BT', 'BN', 'TL', 'LS', 'SZ', 'BI', 'SS', 'CF', // Challenging capitals & flags
  'TD', 'NE', 'ML', 'MR', 'BF', 'GN', 'GW', 'SL', 'LR', 'TG',
  'BJ', 'GQ', 'GA', 'CG', 'KM', 'MH'
]);

/**
 * Categorize a country into a difficulty level.
 */
export function getCountryDifficulty(country: CountryData): GameDifficulty {
  const code = country.code.toUpperCase();

  if (EASY_COUNTRY_CODES.has(code)) {
    return 'easy';
  }

  if (EXTREME_COUNTRY_CODES.has(code)) {
    return 'extreme';
  }

  if (MEDIUM_COUNTRY_CODES.has(code)) {
    return 'medium';
  }

  // Algorithmic classification for any other countries:
  const pop = country.demographics?.population || 0;
  const rank = country.military?.globalRank || 200;

  if (pop < 1_500_000 || rank > 130) {
    return 'extreme';
  }

  if (pop > 20_000_000 || rank < 50) {
    return 'medium';
  }

  return 'hard';
}

/**
 * Filter a pool of countries according to the requested difficulty level.
 * Guarantees a minimum pool size by falling back gracefully if needed.
 */
export function filterCountriesByDifficulty(
  countries: CountryData[],
  difficulty: GameDifficulty
): CountryData[] {
  const exact = countries.filter((c) => getCountryDifficulty(c) === difficulty);

  // If pool has enough countries (at least 6), return exact
  if (exact.length >= 6) {
    return exact;
  }

  // Graceful expansion if regional filter is too narrow
  const order: GameDifficulty[] = ['easy', 'medium', 'hard', 'extreme'];
  const targetIdx = order.indexOf(difficulty);

  const expanded = countries.filter((c) => {
    const d = getCountryDifficulty(c);
    const diffIdx = order.indexOf(d);
    return Math.abs(diffIdx - targetIdx) <= 1;
  });

  return expanded.length >= 4 ? expanded : countries;
}
