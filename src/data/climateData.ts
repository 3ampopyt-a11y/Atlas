export interface ClimateZoneDefinition {
  id: string;
  name: string;
  koppenClass: string;
  color: string;
  tempRange: string;
  precipitation: string;
  icon: string;
  sampleCountries: string[];
  description: string;
}

export const CLIMATE_ZONES: ClimateZoneDefinition[] = [
  {
    id: 'polar',
    name: 'Polar & Ice Cap / Tundra',
    koppenClass: 'EF / ET',
    color: '#e0f2fe', // Ice Cyan
    tempRange: '-60°C to +5°C',
    precipitation: '<150 mm/yr (Polar desert)',
    icon: '❄️',
    sampleCountries: ['Greenland', 'Antarctica', 'Iceland', 'Northern Canada', 'Siberia'],
    description: 'Permanently frozen ice sheets or treeless permafrost tundra where average monthly temperatures remain near or below freezing.',
  },
  {
    id: 'subarctic',
    name: 'Subarctic & Boreal Taiga Forest',
    koppenClass: 'Dfc / Dfd / Dwc',
    color: '#16a34a', // Lush Boreal Forest Green
    tempRange: '-35°C to +18°C',
    precipitation: '300–600 mm/yr',
    icon: '🌲',
    sampleCountries: ['Russia', 'Canada', 'Finland', 'Sweden', 'Norway', 'Estonia'],
    description: 'Short, cool summers and long, extremely cold winters dominated by dense coniferous evergreen boreal forests.',
  },
  {
    id: 'temperate',
    name: 'Temperate Oceanic & Continental Forests',
    koppenClass: 'Cfb / Dfb / Dfa',
    color: '#22c55e', // Vibrant Forest Green
    tempRange: '-5°C to +26°C',
    precipitation: '600–1,200 mm/yr',
    icon: '🍃',
    sampleCountries: ['Germany', 'United Kingdom', 'France', 'Poland', 'Japan', 'New Zealand', 'South Korea'],
    description: 'Mild to warm summers with moderate precipitation distributed year-round, distinct seasons, and dense woodlands.',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean Subtropical',
    koppenClass: 'Csa / Csb',
    color: '#65a30d', // Olive/Lime Green
    tempRange: '+8°C to +34°C',
    precipitation: '350–700 mm/yr (Winter rain)',
    icon: '☀️',
    sampleCountries: ['Italy', 'Spain', 'Greece', 'Portugal', 'Turkey', 'Chile', 'South Africa'],
    description: 'Hot, dry summers with pleasant, mild and moderately wet winters; prime for olive, vine, and citrus cultivation.',
  },
  {
    id: 'subtropical',
    name: 'Humid Subtropical Forests',
    koppenClass: 'Cfa / Cwa',
    color: '#15803d', // Rich Forest Green
    tempRange: '+5°C to +33°C',
    precipitation: '1,000–1,800 mm/yr',
    icon: '🌿',
    sampleCountries: ['United States (Southeast)', 'China (Eastern & Southern)', 'Argentina', 'Uruguay', 'Vietnam (North)'],
    description: 'Hot, humid summers with regular convective thunderstorms, mild winters, and lush green vegetation.',
  },
  {
    id: 'tropical-rainforest',
    name: 'Tropical Wet Rainforest',
    koppenClass: 'Af / Am',
    color: '#14532d', // Deep Forest Rainforest Green
    tempRange: '+24°C to +32°C year-round',
    precipitation: '>2,000–4,000 mm/yr',
    icon: '🌴',
    sampleCountries: ['Brazil', 'Indonesia', 'Democratic Republic of the Congo', 'Malaysia', 'Colombia', 'Papua New Guinea'],
    description: 'High heat, perpetual humidity, and massive daily rainfall supporting the planet’s densest biological canopies and jungle forests.',
  },
  {
    id: 'tropical-savanna',
    name: 'Tropical Wet & Dry Savanna',
    koppenClass: 'Aw / As',
    color: '#ca8a04', // Warm Golden Savanna
    tempRange: '+20°C to +36°C',
    precipitation: '750–1,500 mm/yr (Marked dry season)',
    icon: '🦁',
    sampleCountries: ['Kenya', 'Tanzania', 'Nigeria', 'India', 'Thailand', 'Sudan', 'Venezuela'],
    description: 'Warm year-round with a dramatic alternation between rainy monsoon seasons and severe dry seasons supporting vast grasslands and megafauna.',
  },
  {
    id: 'arid-desert',
    name: 'Arid & Hyper-Arid Desert (Sahara)',
    koppenClass: 'BWh / BWk',
    color: '#facc15', // Vibrant Sahara Sand Yellow!
    tempRange: '+10°C to +50°C (Extreme swings)',
    precipitation: '<100–250 mm/yr',
    icon: '🏜️',
    sampleCountries: ['Egypt', 'Saudi Arabia', 'Algeria', 'Libya', 'United Arab Emirates', 'Iraq', 'Oman', 'Chad', 'Niger', 'Mali', 'Mauritania'],
    description: 'Extreme evaporation exceeding precipitation, sparse vegetation, blistering solar radiation across the vast Sahara and Arabian dunes.',
  },
  {
    id: 'semi-arid-steppe',
    name: 'Semi-Arid Steppe & Scrub',
    koppenClass: 'BSh / BSk',
    color: '#eab308', // Sandy Desert Gold
    tempRange: '-10°C to +35°C',
    precipitation: '250–500 mm/yr',
    icon: '🌾',
    sampleCountries: ['Kazakhstan', 'Mongolia', 'Iran', 'Mexico', 'Australia (Inland)', 'Pakistan'],
    description: 'Transition zone between deserts and humid regions characterized by short grasses, scrub bushes, and high climatic variability.',
  },
];

// Helper to determine primary climate for any country
export function getCountryClimateZone(countryCode?: string, continent?: string, climateText?: string): ClimateZoneDefinition {
  const code = (countryCode || '').toUpperCase();
  const text = (climateText || '').toLowerCase();

  // Polar
  if (['GL', 'IS', 'AQ'].includes(code) || text.includes('polar') || text.includes('arctic') || text.includes('tundra')) {
    return CLIMATE_ZONES[0];
  }

  // Subarctic
  if (['RU', 'CA', 'NO', 'SE', 'FI', 'EE', 'LV', 'LT'].includes(code) || text.includes('subarctic') || text.includes('boreal') || text.includes('taiga')) {
    return CLIMATE_ZONES[1];
  }

  // Arid Desert (Sahara, Arabian Desert, etc.)
  if (['EG', 'SA', 'DZ', 'LY', 'AE', 'IQ', 'KW', 'QA', 'OM', 'YE', 'MA', 'TN', 'SD', 'MR', 'NE', 'TD', 'SO', 'ML', 'EH', 'DJ'].includes(code) || text.includes('desert') || (text.includes('arid') && !text.includes('semi-arid'))) {
    return CLIMATE_ZONES[7];
  }

  // Semi-Arid Steppe
  if (['KZ', 'MN', 'IR', 'AF', 'UZ', 'TM', 'KG', 'TJ', 'SY', 'JO', 'PK', 'NA', 'BW'].includes(code) || text.includes('semi-arid') || text.includes('steppe')) {
    return CLIMATE_ZONES[8];
  }

  // Mediterranean
  if (['IT', 'ES', 'GR', 'PT', 'TR', 'CY', 'MT', 'HR', 'AL', 'ME', 'LB', 'IL'].includes(code) || text.includes('mediterranean')) {
    return CLIMATE_ZONES[3];
  }

  // Tropical Rainforest
  if (['BR', 'ID', 'CD', 'MY', 'CO', 'PG', 'PE', 'EC', 'CG', 'GA', 'SR', 'GY', 'GF', 'CR', 'PA'].includes(code) || text.includes('rainforest') || (text.includes('tropical') && text.includes('wet'))) {
    return CLIMATE_ZONES[5];
  }

  // Tropical Savanna
  if (['NG', 'KE', 'TZ', 'IN', 'TH', 'VN', 'PH', 'MM', 'KH', 'LA', 'ET', 'UG', 'GH', 'CI', 'SN', 'ML', 'BF', 'CM', 'AO', 'MZ', 'ZM', 'ZW'].includes(code) || text.includes('savanna') || text.includes('monsoon')) {
    return CLIMATE_ZONES[6];
  }

  // Humid Subtropical
  if (['US', 'CN', 'AR', 'UY', 'PY', 'TW', 'KR', 'JP'].includes(code) && (text.includes('subtropical') || continent === 'North America' || continent === 'Asia')) {
    return CLIMATE_ZONES[4];
  }

  // Temperate default for Europe / temperate zones
  if (continent === 'Europe' || ['NZ', 'CL'].includes(code) || text.includes('temperate') || text.includes('oceanic')) {
    return CLIMATE_ZONES[2];
  }

  // Default to Temperate or Tropical based on continent
  if (continent === 'Africa' || continent === 'South America') {
    return CLIMATE_ZONES[6]; // Savanna
  }

  return CLIMATE_ZONES[2]; // Temperate
}
