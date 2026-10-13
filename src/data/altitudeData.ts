export interface MountainPeak {
  id: string;
  name: string;
  elevationM: number;
  elevationFt: number;
  range: string;
  country: string;
  countryCode: string;
  coordinates: [number, number]; // [lng, lat]
  prominenceRank?: number;
  isSevenSummit?: boolean;
  notes: string;
}

export interface DepressionPoint {
  id: string;
  name: string;
  elevationM: number;
  elevationFt: number;
  type: 'Ocean Trench' | 'Land Depression';
  coordinates: [number, number];
  notes: string;
}

export const WORLD_PEAKS: MountainPeak[] = [
  {
    id: 'everest',
    name: 'Mount Everest (Sagarmatha)',
    elevationM: 8848,
    elevationFt: 29031,
    range: 'Himalayas',
    country: 'Nepal / China',
    countryCode: 'NP',
    coordinates: [86.925, 27.988],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Earth’s highest mountain above sea level, rising on the collision zone between India and Eurasia.',
  },
  {
    id: 'k2',
    name: 'K2 (Godwin-Austen)',
    elevationM: 8611,
    elevationFt: 28251,
    range: 'Karakoram',
    country: 'Pakistan / China',
    countryCode: 'PK',
    coordinates: [76.513, 35.882],
    prominenceRank: 2,
    notes: 'The "Savage Mountain", world’s second-highest summit and considered the most difficult climb.',
  },
  {
    id: 'aconcagua',
    name: 'Aconcagua',
    elevationM: 6961,
    elevationFt: 22838,
    range: 'Andes',
    country: 'Argentina',
    countryCode: 'AR',
    coordinates: [-70.01, -32.65],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest peak in the Americas, Western Hemisphere, and Southern Hemisphere.',
  },
  {
    id: 'denali',
    name: 'Denali (Mount McKinley)',
    elevationM: 6190,
    elevationFt: 20310,
    range: 'Alaska Range',
    country: 'United States',
    countryCode: 'US',
    coordinates: [-151.0, 63.07],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest mountain peak in North America, with the greatest base-to-peak vertical rise on land (~5,500m).',
  },
  {
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    elevationM: 5895,
    elevationFt: 19341,
    range: 'Eastern Rift Highlands',
    country: 'Tanzania',
    countryCode: 'TZ',
    coordinates: [37.35, -3.07],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest peak in Africa and the world’s largest free-standing volcanic mountain massif.',
  },
  {
    id: 'elbrus',
    name: 'Mount Elbrus',
    elevationM: 5642,
    elevationFt: 18510,
    range: 'Caucasus Mountains',
    country: 'Russia',
    countryCode: 'RU',
    coordinates: [42.44, 43.35],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest peak in Europe and Russia, a dormant double-cone stratovolcano.',
  },
  {
    id: 'vinson',
    name: 'Mount Vinson',
    elevationM: 4892,
    elevationFt: 16050,
    range: 'Sentinel Range',
    country: 'Antarctica',
    countryCode: 'AQ',
    coordinates: [-85.62, -78.53],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest peak of Antarctica, towering over the Ronne Ice Shelf ~1,200 km from the South Pole.',
  },
  {
    id: 'puncak-jaya',
    name: 'Puncak Jaya (Carstensz Pyramid)',
    elevationM: 4884,
    elevationFt: 16024,
    range: 'Sudirman Range',
    country: 'Indonesia',
    countryCode: 'ID',
    coordinates: [137.18, -4.08],
    prominenceRank: 1,
    isSevenSummit: true,
    notes: 'Highest island peak on Earth and highest summit in Oceania / Australasia.',
  },
  {
    id: 'mont-blanc',
    name: 'Mont Blanc (Monte Bianco)',
    elevationM: 4809,
    elevationFt: 15777,
    range: 'Alps',
    country: 'France / Italy',
    countryCode: 'FR',
    coordinates: [6.86, 45.83],
    notes: 'Monarch of the European Alps, renowned birthplace of modern mountaineering.',
  },
  {
    id: 'fuji',
    name: 'Mount Fuji',
    elevationM: 3776,
    elevationFt: 12389,
    range: 'Honshu Volcanic Arc',
    country: 'Japan',
    countryCode: 'JP',
    coordinates: [138.73, 35.36],
    notes: 'Sacred icon of Japan, towering symmetrical stratovolcano visible across the Tokyo metropolitan area.',
  },
  {
    id: 'matterhorn',
    name: 'Matterhorn (Cervino)',
    elevationM: 4478,
    elevationFt: 14692,
    range: 'Pennine Alps',
    country: 'Switzerland / Italy',
    countryCode: 'CH',
    coordinates: [7.66, 45.98],
    notes: 'Famous pyramid-shaped horn carved by glaciers, symbolizing the high alpine peaks of Europe.',
  },
  {
    id: 'orizaba',
    name: 'Pico de Orizaba',
    elevationM: 5636,
    elevationFt: 18491,
    range: 'Trans-Mexican Volcanic Belt',
    country: 'Mexico',
    countryCode: 'MX',
    coordinates: [-97.27, 19.03],
    notes: 'Highest peak in Mexico and the third highest summit in North America.',
  },
];

export const DEPRESSION_POINTS: DepressionPoint[] = [
  {
    id: 'challenger-deep',
    name: 'Challenger Deep (Mariana Trench)',
    elevationM: -10994,
    elevationFt: -36070,
    type: 'Ocean Trench',
    coordinates: [142.2, 11.35],
    notes: 'Deepest surveyed point in the world’s ocean, situated in the Mariana Trench.',
  },
  {
    id: 'puerto-rico-trench',
    name: 'Milwaukee Deep (Puerto Rico Trench)',
    elevationM: -8376,
    elevationFt: -27480,
    type: 'Ocean Trench',
    coordinates: [-66.5, 19.8],
    notes: 'Deepest point in the Atlantic Ocean, on the boundary between Caribbean and North American plates.',
  },
  {
    id: 'dead-sea',
    name: 'Dead Sea Depression',
    elevationM: -430,
    elevationFt: -1411,
    type: 'Land Depression',
    coordinates: [35.5, 31.5],
    notes: 'Lowest dry land point on Earth, nestled in the Jordan Rift Valley.',
  },
  {
    id: 'lake-assal',
    name: 'Lake Assal (Afar Depression)',
    elevationM: -155,
    elevationFt: -509,
    type: 'Land Depression',
    coordinates: [42.4, 11.65],
    notes: 'Lowest point in Africa, hypersaline lake in the Afar Triple Junction.',
  },
  {
    id: 'death-valley',
    name: 'Badwater Basin (Death Valley)',
    elevationM: -86,
    elevationFt: -282,
    type: 'Land Depression',
    coordinates: [-116.8, 36.25],
    notes: 'Lowest elevation point in North America, formed by crustal extension in the Great Basin.',
  },
];
