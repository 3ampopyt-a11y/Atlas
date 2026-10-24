export interface HighestPoint {
  name: string;
  elevationM: number;
}

export interface LowestPoint {
  name: string;
  elevationM: number;
}

export interface LongevityInfo {
  foundationYear: number; // e.g. -221 for BCE, 1776 for CE
  foundationEvent: string;
  sovereignEra: string;
  yearsAlive: number; // Years from foundation to current year (2026)
  historicalContinuityNotes: string;
  independenceDate?: string;
  constitutionYear?: number;
  ancientOrigin?: string;
}

export interface MilitaryInfo {
  globalRank: number; // 1 to 145+
  powerIndex: number; // PwrIndx (0.0000 is theoretical perfect)
  tier: 'Superpower' | 'Great Power' | 'Regional Power' | 'Middle Power' | 'Developing Defense' | 'Minimal / Neutral' | 'No Armed Forces';
  defenseBudgetUSD: number; // in Billions USD
  defenseBudgetPercentGDP: number;
  activePersonnel: number;
  reservePersonnel: number;
  paramilitary: number;
  nuclearStatus: 'Declared Nuclear State' | 'Undeclared Nuclear State' | 'Nuclear Sharing / NATO' | 'Non-Nuclear State' | 'Former Nuclear State';
  nuclearWarheads: number;
  totalAircraft: number;
  combatAircraft: number;
  attackHelicopters: number;
  tanks: number;
  armoredVehicles: number;
  navalFleetTotal: number;
  aircraftCarriers: number;
  submarines: number;
  destroyersFrigates: number;
  alliances: string[];
  conscription: 'Voluntary' | 'Mandatory' | 'Selective / Hybrid' | 'Abolished / None';
}

export interface GeographyInfo {
  areaKm2: number;
  areaSqMi: number;
  // missing where no source gives it; climate and terrain are '' then
  coastlineKm?: number;
  highestPoint: HighestPoint;
  lowestPoint?: LowestPoint;
  climate: string;
  terrain: string;
  borders: string[];
}

export interface DemographicsInfo {
  population: number;
  densityPerKm2: number;
  urbanPercentage: number;
  medianAge: number;
  lifeExpectancy: number;
}

export interface EconomyInfo {
  gdpNominalUSD: number; // in Billions USD
  gdpPerCapitaUSD: number;
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  majorIndustries: string[];
  mainExports: string[];
}

export interface GovernanceInfo {
  governmentType: string;
  headOfState: string;
  headOfGovernment: string;
  unMemberSince: number;
  nationalDay: string;
  nationalMotto?: string;
}

export interface NationalFoodItem {
  name: string;
  nativeName?: string;
  category: 'National Dish' | 'Traditional Main' | 'Street Food' | 'Dessert / Pastry' | 'Iconic Beverage' | 'Soup / Stew' | 'Side & Delicacy';
  description: string;
  keyIngredients: string[];
  flavorProfile?: string; // e.g. "Savory, Umami & Rich", "Spicy, Tangy & Aromatic"
  culturalSignificance?: string;
  iconEmoji?: string;
}

export interface CulinaryProfile {
  nationalDishes: NationalFoodItem[];
  popularStreetFoods: NationalFoodItem[];
  dessertsAndPastries: NationalFoodItem[];
  signatureBeverages: NationalFoodItem[];
  culinaryTraditions: string;
  stapleIngredients: string[];
  dietaryHeritage?: string;
}

export interface CultureInfo {
  officialLanguages: string[];
  majorReligions: string[];
  unescoSitesCount: number;
  famousLandmarks: string[];
  interestingFacts: string[];
  // Optional extended cultural identity fields
  nationalFoods?: NationalFoodItem[];
  primaryNationalDish?: string;
  famousBeverage?: string;
  nationalAnimal?: string;
  nationalBird?: string;
  nationalFlower?: string;
  nationalTree?: string;
  nationalSport?: string;
  culinaryProfile?: CulinaryProfile;
}

export interface CountryData {
  id: string; // ISO 3166-1 numeric 3-digit string ('840', '156', etc.)
  code: string; // ISO alpha-2 ('US', 'CN', etc.)
  code3: string; // ISO alpha-3 ('USA', 'CHN', etc.)
  name: string;
  officialName: string;
  nativeName: string;
  flag: string; // Emoji
  continent: 'North America' | 'South America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania' | 'Antarctica';
  subregion: string;
  capital: string;
  largestCity: string;
  coordinates: [number, number]; // [longitude, latitude]
  longevity: LongevityInfo;
  military: MilitaryInfo;
  geography: GeographyInfo;
  demographics: DemographicsInfo;
  economy: EconomyInfo;
  governance: GovernanceInfo;
  culture: CultureInfo;
  details?: SourcedDetails;
}

// Dossier facts with a source (CIA World Factbook, Wikidata); a field is absent when no source has it
export interface SourcedDetails {
  tld?: string;
  callingCode?: string;
  timeZone?: string; // the capital's UTC offset
  timeZoneNote?: string;
  drivingSide?: 'Left' | 'Right';
  hdi?: { score: number; year: number };
  naturalResources?: string[];
  exportPartners?: string[];
  importPartners?: string[];
  majorRivers?: string[];
  gdpBySector?: { agriculture: number; industry: number; services: number; year?: number };
  airports?: number;
  keyPorts?: string[];
  railwaysKm?: number;
  nonFossilPowerPercent?: number; // share of installed generating capacity
  armedForces?: string[];
  organizations?: string[];
}

export type MapMetricMode =
  | 'flags' // Flags & Countries (Default)
  | 'war' // War & Military Readiness (Troops)
  | 'climate' // Climate Zones
  | 'tectonic' // Tectonic Plates & Fault Lines
  | 'altitude' // Altitudes & Mountain Peaks
  | 'biomes' // Biomes (Deserts, Oceans, Rainforests)
  | 'political'
  | 'militaryRank'
  | 'longevity'
  | 'defenseBudget'
  | 'activePersonnel'
  | 'population'
  | 'area';

export type ContinentFilter = 'All' | 'Africa' | 'Asia' | 'Europe' | 'North America' | 'Oceania' | 'South America';
export type MilitaryTierFilter = 'All' | 'Nuclear Powers' | 'Top 10 Military' | 'Top 25 Military' | 'NATO' | 'High Longevity (500+ yrs)';

export interface VisualMediaSpec {
  label: string;
  value: string;
}

export interface VisualMedia {
  title: string;
  subtitle?: string;
  imageUrl: string;
  category?: string;
  badge?: string;
  specs?: VisualMediaSpec[];
}

export interface RankedListItem {
  rank: number;
  name: string;
  countryCode?: string;
  stat?: string;
  detail?: string;
  badge?: string;
}

export interface RankedList {
  title: string;
  category?: string;
  metricName?: string;
  items: RankedListItem[];
}

export interface DirectRankMetric {
  label: string;
  value: string;
}

export interface DirectRankInfo {
  rank: string | number;
  subRank?: string;
  category: string;
  entity: string;
  metrics?: DirectRankMetric[];
}

export interface AskSearchResponse {
  success: boolean;
  answer: string;
  targetCountry?: string | null;
  targetCountryCode?: string | null;
  otherCountries?: string[];
  keyFacts?: string[];
  source?: 'gemini-ai' | 'intelligence-registry';
  error?: string;
  media?: VisualMedia | null;
  directRank?: DirectRankInfo | null;
  rankedList?: RankedList | null;
  // Photo search term to fetch in the background, so answers don't wait on Wikipedia
  mediaQuery?: string | null;
}

export interface AskSearchHistoryItem extends AskSearchResponse {
  id: string;
  query: string;
  timestamp: number;
  matchedCountry?: CountryData | null;
}
