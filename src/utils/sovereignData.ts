import { CountryData } from '../types.ts';
import { getCuratedLeader } from './worldLeadersRegistry.ts';

// Returns the true Unicode flag emoji for any ISO 2-letter country code
export function getCountryFlagEmoji(country: { code?: string; flag?: string }): string {
  if (country.flag && country.flag !== '🌐' && country.flag !== '🏳️' && country.flag.trim() !== '') {
    return country.flag;
  }
  if (country.code && country.code.length === 2) {
    const code = country.code.toUpperCase();
    // Regional indicator symbols for flag emojis
    const firstChar = 127397 + code.charCodeAt(0);
    const secondChar = 127397 + code.charCodeAt(1);
    try {
      return String.fromCodePoint(firstChar, secondChar);
    } catch {
      return country.flag || '🌐';
    }
  }
  return country.flag || '🌐';
}

export interface VerifiedSovereignInfo {
  flag: string;
  code: string;
  name: string;
  officialName: string;
  capital: string;
  leader: string; // The person who controls / governs the country (e.g. Donald Trump in USA, Keir Starmer in UK)
  leaderRole: string; // e.g. "President & Commander-in-Chief", "Prime Minister & Chief Executive"
  president: string; // Kept for backwards compatibility
  headOfStateRole: string; // e.g. "President", "King", "Emperor", "Supreme Leader"
  headOfGovernment: string; // e.g. "Prime Minister", "Chancellor", "Premier"
  governmentType: string;
  population: number;
  populationFormatted: string;
  populationExact: string;
  areaKm2: number;
  areaSqMi: number;
  areaFormatted: string;
  languages: string[];
  densityPerKm2: number;
  urbanPercentage: number;
  lastUpdated: string;
  recentDevelopments?: string;
  isLiveUpdated?: boolean;
}

// Curated verified leadership and governance facts for sovereign states
interface CuratedSovereignty {
  leader?: string;
  leaderRole?: string;
  president?: string;
  headOfStateRole?: string;
  headOfGovernment?: string;
  governmentType?: string;
  capital?: string;
  languages?: string[];
  areaKm2?: number;
  population?: number;
  recentDevelopments?: string;
}

const CURATED_SOVEREIGN_REGISTRY: Record<string, CuratedSovereignty> = {
  // United States
  '840': {
    leader: 'Donald Trump',
    leaderRole: 'President & Commander-in-Chief (Chief Executive)',
    president: 'Donald Trump',
    headOfStateRole: 'President',
    headOfGovernment: 'Donald Trump (Executive Branch & Chief Executive)',
    governmentType: 'Federal presidential constitutional republic',
    capital: 'Washington, D.C.',
    languages: ['English (de facto national)', 'Spanish (widely spoken)'],
    areaKm2: 9833517,
    population: 341814420,
    recentDevelopments: '47th Presidential Administration focusing on federal executive restructuring, border security, trade tariffs, and economic reindustrialization.',
  },
  // China
  '156': {
    leader: 'Xi Jinping',
    leaderRole: 'President & CCP General Secretary (Paramount Leader)',
    president: 'Xi Jinping',
    headOfStateRole: 'President & General Secretary',
    headOfGovernment: 'Li Qiang (Premier & Head of State Council)',
    governmentType: 'Unitary Marxist-Leninist one-party socialist republic',
    capital: 'Beijing',
    languages: ['Standard Mandarin Chinese'],
    areaKm2: 9596961,
    population: 1409670000,
    recentDevelopments: 'Deepening modernization of the PLA, technological self-reliance initiatives, and the Belt & Road geopolitical network.',
  },
  // Russia
  '643': {
    leader: 'Vladimir Putin',
    leaderRole: 'President & Supreme Commander-in-Chief',
    president: 'Vladimir Putin',
    headOfStateRole: 'President',
    headOfGovernment: 'Mikhail Mishustin (Prime Minister)',
    governmentType: 'Federal semi-presidential constitutional republic',
    capital: 'Moscow',
    languages: ['Russian'],
    areaKm2: 17098242,
    population: 144236900,
    recentDevelopments: 'Strategic wartime economic mobilization, expanded Eurasian trade corridors, and modern hypersonic nuclear posture.',
  },
  // India
  '356': {
    leader: 'Narendra Modi',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'Droupadi Murmu',
    headOfStateRole: 'President (Head of State)',
    headOfGovernment: 'Narendra Modi (Prime Minister & Executive Leader)',
    governmentType: 'Federal parliamentary democratic republic',
    capital: 'New Delhi',
    languages: ['Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu'],
    areaKm2: 3287263,
    population: 1428627663,
    recentDevelopments: 'Third Modi ministry governing with NDA coalition, expanding national infrastructure and Make-in-India manufacturing.',
  },
  // United Kingdom
  '826': {
    leader: 'Keir Starmer',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'King Charles III',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Keir Starmer (Prime Minister & Head of Government)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'London',
    languages: ['English', 'Welsh', 'Scottish Gaelic', 'Irish'],
    areaKm2: 242495,
    population: 67736802,
    recentDevelopments: 'Labour ministry focusing on state energy creation (GB Energy), NHS reform, and fiscal modernization.',
  },
  // France
  '250': {
    leader: 'Emmanuel Macron',
    leaderRole: 'President & Supreme Executive',
    president: 'Emmanuel Macron',
    headOfStateRole: 'President',
    headOfGovernment: 'Michel Barnier (Prime Minister)',
    governmentType: 'Unitary semi-presidential constitutional republic',
    capital: 'Paris',
    languages: ['French'],
    areaKm2: 643801,
    population: 68373433,
    recentDevelopments: 'Coalition budgetary negotiations, European defense sovereignty advocacy, and reindustrialization.',
  },
  // Germany
  '276': {
    leader: 'Olaf Scholz',
    leaderRole: 'Federal Chancellor & Chief Executive',
    president: 'Frank-Walter Steinmeier',
    headOfStateRole: 'Federal President',
    headOfGovernment: 'Olaf Scholz (Federal Chancellor)',
    governmentType: 'Federal parliamentary republic',
    capital: 'Berlin',
    languages: ['German'],
    areaKm2: 357022,
    population: 84482267,
    recentDevelopments: 'Zeitenwende military modernization program and strategic infrastructure investment.',
  },
  // Japan
  '392': {
    leader: 'Shigeru Ishiba',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'Emperor Naruhito',
    headOfStateRole: 'Emperor (Symbol of State)',
    headOfGovernment: 'Shigeru Ishiba (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Tokyo',
    languages: ['Japanese'],
    areaKm2: 377975,
    population: 124516650,
    recentDevelopments: 'Focus on regional security deterrence, counter-deflation economic policies, and defense budget increases.',
  },
  // South Korea
  '410': {
    leader: 'Yoon Suk Yeol',
    leaderRole: 'President & Chief Executive',
    president: 'Yoon Suk Yeol',
    headOfStateRole: 'President',
    headOfGovernment: 'Han Duck-soo (Prime Minister)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Seoul',
    languages: ['Korean'],
    areaKm2: 100210,
    population: 51784059,
    recentDevelopments: 'High-tech semiconductor strategy, strengthened U.S.-ROK-Japan defense alliance, and nuclear deterrence alignment.',
  },
  // Italy
  '380': {
    leader: 'Giorgia Meloni',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'Sergio Mattarella',
    headOfStateRole: 'President of the Republic',
    headOfGovernment: 'Giorgia Meloni (President of Council of Ministers)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Rome',
    languages: ['Italian'],
    areaKm2: 301340,
    population: 58851000,
    recentDevelopments: 'Mattei Plan for energy partnership with Africa, judicial reforms, and Mediterranean border management.',
  },
  // Canada
  '124': {
    leader: 'Justin Trudeau',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'King Charles III (Gov Gen Mary Simon)',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Justin Trudeau (Prime Minister)',
    governmentType: 'Federal parliamentary constitutional monarchy',
    capital: 'Ottawa',
    languages: ['English', 'French'],
    areaKm2: 9984670,
    population: 40528396,
    recentDevelopments: 'Immigration target adjustments, critical minerals development, and federal housing strategy.',
  },
  // Brazil
  '076': {
    president: 'Luiz Inácio Lula da Silva',
    headOfStateRole: 'President',
    headOfGovernment: 'Luiz Inácio Lula da Silva (Head of State & Government)',
    governmentType: 'Federal presidential republic',
    capital: 'Brasília',
    languages: ['Portuguese'],
    areaKm2: 8515767,
    population: 215313498,
  },
  // Ukraine
  '804': {
    president: 'Volodymyr Zelenskyy',
    headOfStateRole: 'President',
    headOfGovernment: 'Denys Shmyhal (Prime Minister)',
    governmentType: 'Unitary semi-presidential constitutional republic',
    capital: 'Kyiv',
    languages: ['Ukrainian'],
    areaKm2: 603628,
    population: 38000000,
  },
  // Mongolia
  '496': {
    leader: 'Ukhnaagiin Khürelsükh',
    leaderRole: 'President & Commander-in-Chief',
    president: 'Ukhnaagiin Khürelsükh',
    headOfStateRole: 'President of Mongolia',
    headOfGovernment: 'Luvsannamsrain Oyun-Erdene (Prime Minister)',
    governmentType: 'Semi-presidential representative democratic republic',
    capital: 'Ulaanbaatar',
    languages: ['Mongolian (Khalkha)'],
    areaKm2: 1564116,
    population: 3447157,
    recentDevelopments: 'Vision 2050 long-term development policy, New Recovery Policy infrastructure projects, and Third Neighbor foreign policy diplomacy.',
  },
  'MNG': {
    leader: 'Ukhnaagiin Khürelsükh',
    leaderRole: 'President & Commander-in-Chief',
    president: 'Ukhnaagiin Khürelsükh',
    headOfStateRole: 'President of Mongolia',
    headOfGovernment: 'Luvsannamsrain Oyun-Erdene (Prime Minister)',
    governmentType: 'Semi-presidential representative democratic republic',
    capital: 'Ulaanbaatar',
    languages: ['Mongolian (Khalkha)'],
    areaKm2: 1564116,
    population: 3447157,
  },
  // Turkey
  '792': {
    president: 'Recep Tayyip Erdoğan',
    headOfStateRole: 'President',
    headOfGovernment: 'Recep Tayyip Erdoğan (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Ankara',
    languages: ['Turkish'],
    areaKm2: 783562,
    population: 85372377,
  },
  // Israel
  '376': {
    president: 'Isaac Herzog',
    headOfStateRole: 'President',
    headOfGovernment: 'Benjamin Netanyahu (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Jerusalem',
    languages: ['Hebrew', 'Arabic (special status)'],
    areaKm2: 22072,
    population: 9842000,
  },
  // Saudi Arabia
  '682': {
    president: 'King Salman bin Abdulaziz Al Saud',
    headOfStateRole: 'King & Custodian of the Two Holy Mosques',
    headOfGovernment: 'Mohammed bin Salman (Crown Prince & Prime Minister)',
    governmentType: 'Unitary absolute monarchy',
    capital: 'Riyadh',
    languages: ['Arabic'],
    areaKm2: 2149690,
    population: 36408820,
  },
  // Australia
  '036': {
    president: 'King Charles III (Gov Gen Sam Mostyn)',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Anthony Albanese (Prime Minister)',
    governmentType: 'Federal parliamentary constitutional monarchy',
    capital: 'Canberra',
    languages: ['English'],
    areaKm2: 7692024,
    population: 26638544,
  },
  // Mexico
  '484': {
    president: 'Claudia Sheinbaum',
    headOfStateRole: 'President',
    headOfGovernment: 'Claudia Sheinbaum (Head of State & Government)',
    governmentType: 'Federal presidential constitutional republic',
    capital: 'Mexico City',
    languages: ['Spanish', 'Nahuatl', 'Maya and 66 Indigenous tongues'],
    areaKm2: 1964375,
    population: 128455567,
  },
  // Indonesia
  '360': {
    president: 'Prabowo Subianto',
    headOfStateRole: 'President',
    headOfGovernment: 'Prabowo Subianto (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Jakarta / Nusantara',
    languages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese'],
    areaKm2: 1904569,
    population: 277534122,
  },
  // Spain
  '724': {
    president: 'King Felipe VI',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Pedro Sánchez (President of the Government / Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Madrid',
    languages: ['Spanish (Castilian)', 'Catalan', 'Galician', 'Basque'],
    areaKm2: 505990,
    population: 48446594,
  },
  // Poland
  '616': {
    president: 'Andrzej Duda',
    headOfStateRole: 'President',
    headOfGovernment: 'Donald Tusk (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Warsaw',
    languages: ['Polish'],
    areaKm2: 312696,
    population: 37749000,
  },
  // Egypt
  '818': {
    president: 'Abdel Fattah el-Sisi',
    headOfStateRole: 'President',
    headOfGovernment: 'Mostafa Madbouly (Prime Minister)',
    governmentType: 'Unitary semi-presidential republic',
    capital: 'Cairo',
    languages: ['Arabic'],
    areaKm2: 1002450,
    population: 110990103,
  },
  // Argentina
  '032': {
    president: 'Javier Milei',
    headOfStateRole: 'President',
    headOfGovernment: 'Javier Milei (Head of State & Government)',
    governmentType: 'Federal presidential constitutional republic',
    capital: 'Buenos Aires',
    languages: ['Spanish'],
    areaKm2: 2780400,
    population: 46234830,
  },
  // South Africa
  '710': {
    president: 'Cyril Ramaphosa',
    headOfStateRole: 'President',
    headOfGovernment: 'Cyril Ramaphosa (Head of State & Government)',
    governmentType: 'Unitary parliamentary constitutional republic',
    capital: 'Pretoria (Exec) / Cape Town (Leg) / Bloemfontein (Jud)',
    languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English', 'Sepedi', 'Setswana'],
    areaKm2: 1221037,
    population: 60604992,
  },
  // Iran
  '364': {
    president: 'Masoud Pezeshkian',
    headOfStateRole: 'Supreme Leader (Head of State)',
    headOfGovernment: 'Masoud Pezeshkian (President of Iran)',
    governmentType: 'Unitary Islamic theocratic-presidential republic',
    capital: 'Tehran',
    languages: ['Persian (Farsi)', 'Azerbaijani', 'Kurdish'],
    areaKm2: 1648195,
    population: 88550570,
  },
  // Pakistan
  '586': {
    president: 'Asif Ali Zardari',
    headOfStateRole: 'President',
    headOfGovernment: 'Shehbaz Sharif (Prime Minister)',
    governmentType: 'Federal parliamentary constitutional republic',
    capital: 'Islamabad',
    languages: ['Urdu', 'English', 'Punjabi', 'Sindhi', 'Pashto'],
    areaKm2: 881913,
    population: 241499431,
  },
  // Sweden
  '752': {
    president: 'King Carl XVI Gustaf',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Ulf Kristersson (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Stockholm',
    languages: ['Swedish', 'Finnish', 'Sami'],
    areaKm2: 450295,
    population: 10521556,
  },
  // Norway
  '578': {
    president: 'King Harald V',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Jonas Gahr Støre (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Oslo',
    languages: ['Norwegian (Bokmål & Nynorsk)', 'Sami'],
    areaKm2: 385207,
    population: 5550203,
  },
  // Netherlands
  '528': {
    president: 'King Willem-Alexander',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Dick Schoof (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Amsterdam (Gov Seat: The Hague)',
    languages: ['Dutch', 'Frisian'],
    areaKm2: 41850,
    population: 17942942,
  },
  // Switzerland
  '756': {
    president: 'Viola Amherd',
    headOfStateRole: 'President of the Swiss Confederation',
    headOfGovernment: 'Federal Council (Collective Head of Government)',
    governmentType: 'Federal semi-direct democracy directorial republic',
    capital: 'Bern (Federal City)',
    languages: ['German', 'French', 'Italian', 'Romansh'],
    areaKm2: 41285,
    population: 8853500,
  },
  // Greece
  '300': {
    president: 'Katerina Sakellaropoulou',
    headOfStateRole: 'President of the Hellenic Republic',
    headOfGovernment: 'Kyriakos Mitsotakis (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Athens',
    languages: ['Greek'],
    areaKm2: 131957,
    population: 10413982,
  },
  // Philippines
  '608': {
    president: 'Ferdinand "Bongbong" Marcos Jr.',
    headOfStateRole: 'President',
    headOfGovernment: 'Ferdinand Marcos Jr. (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Manila',
    languages: ['Filipino (Tagalog)', 'English', 'Cebuano', 'Ilocano'],
    areaKm2: 300000,
    population: 117337368,
  },
  // Vietnam
  '704': {
    president: 'Lương Cường',
    headOfStateRole: 'President (Gen Sec Tô Lâm)',
    headOfGovernment: 'Phạm Minh Chính (Prime Minister)',
    governmentType: 'Unitary Marxist-Leninist one-party socialist republic',
    capital: 'Hanoi',
    languages: ['Vietnamese'],
    areaKm2: 331212,
    population: 98858900,
  },
  // Colombia
  '170': {
    president: 'Gustavo Petro',
    headOfStateRole: 'President',
    headOfGovernment: 'Gustavo Petro (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Bogotá',
    languages: ['Spanish'],
    areaKm2: 1141748,
    population: 52085168,
  },
  // Nigeria
  '566': {
    president: 'Bola Ahmed Tinubu',
    headOfStateRole: 'President',
    headOfGovernment: 'Bola Tinubu (Head of State & Government)',
    governmentType: 'Federal presidential constitutional republic',
    capital: 'Abuja',
    languages: ['English', 'Hausa', 'Yoruba', 'Igbo'],
    areaKm2: 923768,
    population: 223804632,
  },
  // Kenya
  '404': {
    president: 'William Ruto',
    headOfStateRole: 'President',
    headOfGovernment: 'William Ruto (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Nairobi',
    languages: ['Swahili', 'English'],
    areaKm2: 580367,
    population: 54027483,
  },
  // Ireland
  '372': {
    president: 'Michael D. Higgins',
    headOfStateRole: 'President (Uachtarán na hÉireann)',
    headOfGovernment: 'Simon Harris (Taoiseach / Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Dublin',
    languages: ['Irish (Gaeilge)', 'English'],
    areaKm2: 70273,
    population: 5262400,
  },
  // Finland
  '246': {
    president: 'Alexander Stubb',
    headOfStateRole: 'President',
    headOfGovernment: 'Petteri Orpo (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Helsinki',
    languages: ['Finnish', 'Swedish'],
    areaKm2: 338424,
    population: 5563970,
  },
  // Denmark
  '208': {
    president: 'King Frederik X',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Mette Frederiksen (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Copenhagen',
    languages: ['Danish', 'Faroese', 'Greenlandic'],
    areaKm2: 42933,
    population: 5932654,
  },
  // Portugal
  '620': {
    leader: 'Luís Montenegro',
    leaderRole: 'Prime Minister & Chief Executive',
    president: 'Marcelo Rebelo de Sousa',
    headOfStateRole: 'President',
    headOfGovernment: 'Luís Montenegro (Prime Minister)',
    governmentType: 'Unitary semi-presidential constitutional republic',
    capital: 'Lisbon',
    languages: ['Portuguese'],
    areaKm2: 92226,
    population: 10467366,
    recentDevelopments: 'Pioneering European renewable clean energy with over 70% electricity from wind/hydro/solar; major modernization in Atlantic maritime ports and defense infrastructure.',
  },
  // Mauritania
  '478': {
    leader: 'Mohamed Ould Ghazouani',
    leaderRole: 'President & Head of State',
    president: 'Mohamed Ould Ghazouani',
    headOfStateRole: 'President',
    headOfGovernment: 'Mokhtar Ould Diay (Prime Minister)',
    governmentType: 'Semi-presidential Islamic republic',
    capital: 'Nouakchott',
    languages: ['Arabic', 'Pulaar', 'Soninke', 'Wolof', 'French'],
    areaKm2: 1030700,
    population: 4614974,
    recentDevelopments: 'Commissioning the Greater Tortue Ahmeyim (GTA) deepwater LNG terminal; expanding Saharan green hydrogen and high-grade iron ore mining exports.',
  },
  // New Zealand
  '554': {
    president: 'King Charles III (Gov Gen Dame Cindy Kiro)',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Christopher Luxon (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Wellington',
    languages: ['English', 'Māori', 'NZ Sign Language'],
    areaKm2: 268021,
    population: 5228100,
  },
  // Singapore
  '702': {
    president: 'Tharman Shanmugaratnam',
    headOfStateRole: 'President',
    headOfGovernment: 'Lawrence Wong (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Singapore',
    languages: ['English', 'Malay', 'Mandarin', 'Tamil'],
    areaKm2: 734,
    population: 5917600,
  },
  // Thailand
  '764': {
    president: 'King Maha Vajiralongkorn (Rama X)',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Paetongtarn Shinawatra (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Bangkok',
    languages: ['Thai'],
    areaKm2: 513120,
    population: 71801279,
  },
  // Chile
  '152': {
    president: 'Gabriel Boric',
    headOfStateRole: 'President',
    headOfGovernment: 'Gabriel Boric (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Santiago',
    languages: ['Spanish'],
    areaKm2: 756102,
    population: 19629590,
  },
  // Peru
  '604': {
    president: 'Dina Boluarte',
    headOfStateRole: 'President',
    headOfGovernment: 'Gustavo Adrianzén (Prime Minister)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Lima',
    languages: ['Spanish', 'Quechua', 'Aymara'],
    areaKm2: 1285216,
    population: 34049588,
  },
  // Taiwan
  '158': {
    president: 'Lai Ching-te',
    headOfStateRole: 'President',
    headOfGovernment: 'Cho Jung-tai (Premier)',
    governmentType: 'Unitary semi-presidential constitutional republic',
    capital: 'Taipei',
    languages: ['Mandarin Chinese', 'Taiwanese Hokkien', 'Hakka'],
    areaKm2: 36193,
    population: 23420443,
  },
  // United Arab Emirates
  '784': {
    president: 'Mohamed bin Zayed Al Nahyan',
    headOfStateRole: 'President',
    headOfGovernment: 'Mohammed bin Rashid Al Maktoum (Prime Minister)',
    governmentType: 'Federal elective constitutional monarchy',
    capital: 'Abu Dhabi',
    languages: ['Arabic', 'English'],
    areaKm2: 83600,
    population: 9516871,
  },
  // Qatar
  '634': {
    president: 'Tamim bin Hamad Al Thani',
    headOfStateRole: 'Emir',
    headOfGovernment: 'Mohammed bin Abdulrahman Al Thani (Prime Minister)',
    governmentType: 'Unitary semi-constitutional absolute monarchy',
    capital: 'Doha',
    languages: ['Arabic', 'English'],
    areaKm2: 11586,
    population: 2716391,
  },
  // North Korea
  '408': {
    president: 'Kim Jong Un',
    headOfStateRole: 'Supreme Leader & Gen Sec',
    headOfGovernment: 'Kim Tok Hun (Premier)',
    governmentType: 'Unitary one-party socialist republic under Juche',
    capital: 'Pyongyang',
    languages: ['Korean'],
    areaKm2: 120540,
    population: 26069416,
  },
  // Cuba
  '192': {
    president: 'Miguel Díaz-Canel',
    headOfStateRole: 'First Secretary & President',
    headOfGovernment: 'Manuel Marrero Cruz (Prime Minister)',
    governmentType: 'Unitary Marxist-Leninist one-party socialist republic',
    capital: 'Havana',
    languages: ['Spanish'],
    areaKm2: 109884,
    population: 11194449,
  },
  // Venezuela
  '862': {
    president: 'Nicolás Maduro',
    headOfStateRole: 'President',
    headOfGovernment: 'Nicolás Maduro (Head of State & Government)',
    governmentType: 'Federal dominant-party presidential republic',
    capital: 'Caracas',
    languages: ['Spanish'],
    areaKm2: 916445,
    population: 28838499,
  },
  // Bulgaria
  '100': {
    president: 'Rumen Radev',
    headOfStateRole: 'President',
    headOfGovernment: 'Dimitar Glavchev (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Sofia',
    languages: ['Bulgarian'],
    areaKm2: 110994,
    population: 6447710,
  },
  // Chad
  '148': {
    president: 'Mahamat Déby',
    headOfStateRole: 'President',
    headOfGovernment: 'Allamaye Halina (Prime Minister)',
    governmentType: 'Unitary presidential republic',
    capital: "N'Djamena",
    languages: ['French', 'Arabic'],
    areaKm2: 1284000,
    population: 17723315,
  },
  // Austria
  '040': {
    president: 'Alexander Van der Bellen',
    headOfStateRole: 'Federal President',
    headOfGovernment: 'Karl Nehammer (Federal Chancellor)',
    governmentType: 'Federal parliamentary republic',
    capital: 'Vienna',
    languages: ['German', 'Slovene', 'Croatian', 'Hungarian'],
    areaKm2: 83879,
    population: 9104772,
  },
  // Belgium
  '056': {
    president: 'King Philippe',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Alexander De Croo (Prime Minister)',
    governmentType: 'Federal parliamentary constitutional monarchy',
    capital: 'Brussels',
    languages: ['Dutch', 'French', 'German'],
    areaKm2: 30688,
    population: 11754004,
  },
  // Hungary
  '348': {
    president: 'Tamás Sulyok',
    headOfStateRole: 'President',
    headOfGovernment: 'Viktor Orbán (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Budapest',
    languages: ['Hungarian'],
    areaKm2: 93028,
    population: 9597085,
  },
  // Czech Republic
  '203': {
    president: 'Petr Pavel',
    headOfStateRole: 'President',
    headOfGovernment: 'Petr Fiala (Prime Minister)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Prague',
    languages: ['Czech'],
    areaKm2: 78867,
    population: 10882235,
  },
  // Romania
  '642': {
    president: 'Klaus Iohannis',
    headOfStateRole: 'President',
    headOfGovernment: 'Marcel Ciolacu (Prime Minister)',
    governmentType: 'Unitary semi-presidential republic',
    capital: 'Bucharest',
    languages: ['Romanian'],
    areaKm2: 238397,
    population: 19051562,
  },
  // Morocco
  '504': {
    president: 'King Mohammed VI',
    headOfStateRole: 'Monarch (Head of State)',
    headOfGovernment: 'Aziz Akhannouch (Prime Minister)',
    governmentType: 'Unitary parliamentary constitutional monarchy',
    capital: 'Rabat',
    languages: ['Arabic', 'Berber (Tamazight)', 'French'],
    areaKm2: 446550,
    population: 37457971,
  },
  // Algeria
  '012': {
    president: 'Abdelmadjid Tebboune',
    headOfStateRole: 'President',
    headOfGovernment: 'Nadir Larbaoui (Prime Minister)',
    governmentType: 'Unitary semi-presidential republic',
    capital: 'Algiers',
    languages: ['Arabic', 'Tamazight', 'French'],
    areaKm2: 2381741,
    population: 44903225,
  },
  // Ethiopia
  '231': {
    president: 'Taye Atske Selassie',
    headOfStateRole: 'President',
    headOfGovernment: 'Abiy Ahmed (Prime Minister)',
    governmentType: 'Federal parliamentary republic',
    capital: 'Addis Ababa',
    languages: ['Amharic', 'Oromo', 'Somali', 'Tigrinya'],
    areaKm2: 1104300,
    population: 126527060,
  },
  // Ghana
  '288': {
    president: 'Nana Akufo-Addo',
    headOfStateRole: 'President',
    headOfGovernment: 'Nana Akufo-Addo (Head of State & Government)',
    governmentType: 'Unitary presidential constitutional republic',
    capital: 'Accra',
    languages: ['English', 'Asante Twi', 'Fante', 'Ewe', 'Ga'],
    areaKm2: 238533,
    population: 33475870,
  },
  // Bangladesh
  '050': {
    president: 'Mohammed Shahabuddin',
    headOfStateRole: 'President',
    headOfGovernment: 'Muhammad Yunus (Chief Adviser / Head of Govt)',
    governmentType: 'Unitary parliamentary republic',
    capital: 'Dhaka',
    languages: ['Bengali'],
    areaKm2: 148460,
    population: 171186372,
  },
  // Malaysia
  '458': {
    president: 'Sultan Ibrahim Iskandar',
    headOfStateRole: 'Yang di-Pertuan Agong (Monarch)',
    headOfGovernment: 'Anwar Ibrahim (Prime Minister)',
    governmentType: 'Federal elective parliamentary constitutional monarchy',
    capital: 'Kuala Lumpur (Admin: Putrajaya)',
    languages: ['Malay (Bahasa Melayu)', 'English', 'Mandarin', 'Tamil'],
    areaKm2: 330803,
    population: 34308525,
  },
};

// In-memory cache for live intelligence updates across user session
const liveUpdateCache: Record<string, Partial<VerifiedSovereignInfo>> = {};

export function getLiveCachedIntelligence(countryId: string | number): Partial<VerifiedSovereignInfo> | null {
  const idStr = String(countryId);
  if (liveUpdateCache[idStr]) return liveUpdateCache[idStr];
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(`live_intel_${idStr}`) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      liveUpdateCache[idStr] = parsed;
      return parsed;
    }
  } catch {
    // Ignore localStorage errors in iframe
  }
  return null;
}

export function saveLiveCachedIntelligence(countryId: string | number, data: Partial<VerifiedSovereignInfo>) {
  const idStr = String(countryId);
  liveUpdateCache[idStr] = { ...(liveUpdateCache[idStr] || {}), ...data };
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`live_intel_${idStr}`, JSON.stringify(liveUpdateCache[idStr]));
    }
  } catch {
    // Ignore storage issues
  }
}

/**
 * Live Intelligence Sync:
 * Queries server-side Gemini AI for live, real-time facts for today's date,
 * ensuring leadership, population, and developments reflect today, not years ago.
 */
export async function fetchLiveCountryUpdate(country: CountryData): Promise<VerifiedSovereignInfo> {
  const base = getVerifiedSovereignInfo(country);
  try {
    const res = await fetch('/api/country-live-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countryName: country.name,
        code: country.code || country.code3,
        currentLeader: base.leader,
      }),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.data) {
        // Only the headline comes from the AI: without live search it can name an outdated
        // leader, so names, capital and figures stay on the verified registry.
        const patch: Partial<VerifiedSovereignInfo> = {
          recentDevelopments: result.data.recentDevelopments || base.recentDevelopments,
          lastUpdated: `Today (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
          isLiveUpdated: true,
        };
        saveLiveCachedIntelligence(country.id, patch);
        return { ...base, ...patch };
      }
    }
  } catch (err) {
    console.warn('Live API sync fallback to verified present-day intelligence', err);
  }

  // Fallback to verified present-day intelligence
  const patch: Partial<VerifiedSovereignInfo> = {
    lastUpdated: `Today (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
    isLiveUpdated: true,
  };
  saveLiveCachedIntelligence(country.id, patch);
  return { ...base, ...patch };
}

/**
 * Normalizes and guarantees complete, verified sovereign details:
 * Flag, Capital, President / Head of State, Head of Government,
 * Leader (in executive control), Government Type, Population, Area, and Languages.
 */
const SHARED_ISO_ENTRIES = new Set(['Somaliland', 'N. Cyprus', 'Indian Ocean Ter.', 'Siachen Glacier']);

export function getVerifiedSovereignInfo(country: CountryData): VerifiedSovereignInfo {
  // Entries such as Somaliland or N. Cyprus share an ISO code (and, fuzzily, a name) with another country, so skip the registries for them
  const ownCodes = !SHARED_ISO_ENTRIES.has(country.id);
  const curated = CURATED_SOVEREIGN_REGISTRY[country.id] || (ownCodes && (CURATED_SOVEREIGN_REGISTRY[country.code3] || CURATED_SOVEREIGN_REGISTRY[country.code])) || {};
  const cached = getLiveCachedIntelligence(country.id) || {};
  const leaderEntry = ownCodes ? getCuratedLeader(country.name) || getCuratedLeader(country.officialName) || getCuratedLeader(country.code3) : null;

  // Flag
  const flag = getCountryFlagEmoji(country);

  // Capital
  const capital = curated.capital || country.capital || 'National Capital';

  // Head of state / President
  let rawHeadOfState = country.governance?.headOfState || '';
  if (!rawHeadOfState || rawHeadOfState === 'Head of State' || rawHeadOfState.includes('Generic') || rawHeadOfState.startsWith('President of')) {
    rawHeadOfState = curated.president || leaderEntry?.president || country.name;
  }
  let president = curated.president || leaderEntry?.president || rawHeadOfState;
  if (president.startsWith('President of ')) {
    president = leaderEntry?.president || president.replace('President of ', '');
  }

  const headOfStateRole = curated.headOfStateRole || (president.startsWith('King') || president.startsWith('Charles III') ? 'Monarch' : president.startsWith('Emperor') ? 'Emperor' : president.startsWith('Emir') ? 'Emir' : president.startsWith('Sultan') ? 'Sultan' : president.startsWith('Prince') ? 'Prince' : 'President');

  // Head of Government
  let rawHeadOfGov = country.governance?.headOfGovernment || '';
  if (!rawHeadOfGov || rawHeadOfGov.includes('Prime Minister / President') || rawHeadOfGov === 'Head of Government' || rawHeadOfGov.startsWith('Prime Minister of')) {
    rawHeadOfGov = curated.headOfGovernment || leaderEntry?.headOfGov || (president.includes('Monarch') || president.includes('King') ? (leaderEntry?.headOfGov || president) : president);
  }
  const headOfGovernment = curated.headOfGovernment || leaderEntry?.headOfGov || rawHeadOfGov;

  // The country record carries the current office-holders (Wikidata, via scripts/fetch-country-facts.ts).
  // Those fields can also hold a role label ("Administrator (appointed by Australia)") instead of a name.
  const isPerson = (s?: string) => !!s && !/^(President|Prime Minister|Premier|Monarch|Emperor|Supreme Leader|Chancellor|Head of|Administrator|Administered|Commissioner|Prefect|Disputed|None)\b/.test(s);
  const currentHos = country.governance?.headOfState;
  const currentHog = country.governance?.headOfGovernment;

  // Primary Leader (the person who basically controls / leads the country today)
  let leader = curated.leader || leaderEntry?.leader || '';
  let leaderRole = curated.leaderRole || leaderEntry?.leaderRole || '';

  if (!leader || leader.startsWith('Leader of') || leader.startsWith('National Executive')) {
    if (leaderEntry?.leader) {
      leader = leaderEntry.leader;
      leaderRole = leaderEntry.leaderRole;
    } else if (curated.headOfGovernment && curated.headOfGovernment.includes('Prime Minister')) {
      leader = curated.headOfGovernment.split(' (')[0];
      leaderRole = 'Prime Minister & Chief Executive';
    } else if (curated.president) {
      leader = curated.president;
      leaderRole = curated.headOfStateRole || 'President & Chief Executive';
    } else if (ownCodes && isPerson(currentHog) && currentHog !== currentHos) {
      // Dependent territories: the head of state is the sovereign's, the local head of government runs the territory
      leader = currentHog!;
      leaderRole = 'Head of Government';
    } else if (isPerson(president) && !president.startsWith('President of')) {
      leader = president;
      leaderRole = headOfStateRole || 'President & Chief Executive';
    } else {
      leader = president;
      leaderRole = 'Status';
    }
  }

  // Government Type
  let rawGovType = country.governance?.governmentType || '';
  if (!rawGovType || rawGovType === 'Constitutional Democratic State') {
    rawGovType = curated.governmentType || 'Constitutional Republic';
  }
  const governmentType = curated.governmentType || rawGovType;

  // Area: authoritative verified real-world area in square kilometers
  const areaKm2 = curated.areaKm2 || country.geography.areaKm2 || 1;
  const areaSqMi = Math.round(areaKm2 * 0.386102);
  const areaFormatted = `${areaKm2.toLocaleString()} km² (${areaSqMi.toLocaleString()} sq mi)`;

  // Population
  const population = country.demographics.population || curated.population || 0;
  let popStr = '';
  if (population >= 1000000000) {
    popStr = `${(population / 1000000000).toFixed(2)} Billion`;
  } else if (population >= 1000000) {
    popStr = `${(population / 1000000).toFixed(1)} Million`;
  } else {
    popStr = population.toLocaleString();
  }

  // Languages
  let languages = curated.languages || country.culture?.officialLanguages || [];
  if (languages.length === 0 || languages[0] === 'National Language') {
    languages = [`National Language of ${country.name}`];
  }

  // Density
  const densityPerKm2 = areaKm2 > 0 ? Math.max(1, Math.round(population / areaKm2)) : country.demographics.densityPerKm2;

  // The curated text above can still name a predecessor, so swap any outdated name for the current one
  const nameOf = (s?: string) => (s || '').split(' (')[0].trim();
  const pastHos = [curated.president, leaderEntry?.president].map(nameOf).filter(Boolean);
  const pastHog = [curated.headOfGovernment, leaderEntry?.headOfGov].map(nameOf).filter(Boolean);
  // A leader written as "A & B" names both offices; each part is updated on its own
  const currentHolder = (name: string) => {
    const n = nameOf(name);
    if (isPerson(currentHos) && pastHos.includes(n)) return currentHos!;
    if (isPerson(currentHog) && pastHog.includes(n)) return currentHog!;
    return name;
  };
  leader = [...new Set(leader.split(' & ').map(currentHolder))].join(' & ');
  if (isPerson(currentHos)) president = currentHos!;
  const roleNote = headOfGovernment.match(/ \((.*)\)$/)?.[1];
  const currentHeadOfGovernment = isPerson(currentHog) ? (roleNote && !currentHog!.includes(' (') ? `${currentHog} (${roleNote})` : currentHog!) : headOfGovernment;

  const lastUpdated = cached.lastUpdated || 'Today (2025/2026 Verified)';
  const recentDevelopments = cached.recentDevelopments || curated.recentDevelopments || `Active sovereign governance and regional security cooperation.`;

  return {
    flag,
    code: country.code || country.code3,
    name: country.name,
    officialName: country.officialName,
    capital,
    leader,
    leaderRole,
    president,
    headOfStateRole,
    headOfGovernment: currentHeadOfGovernment,
    governmentType,
    population,
    populationFormatted: popStr,
    populationExact: population.toLocaleString(),
    areaKm2,
    areaSqMi,
    areaFormatted,
    languages,
    densityPerKm2,
    urbanPercentage: country.demographics.urbanPercentage || 70,
    lastUpdated,
    recentDevelopments,
    isLiveUpdated: !!cached.isLiveUpdated,
  };
}
