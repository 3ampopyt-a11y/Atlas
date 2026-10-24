import { CountryData } from '../types.ts';
import { getUnStatus } from '../utils/formatters.ts';

export interface HistoricalMilestone {
  year: string;
  title: string;
  description?: string;
}

export interface EconomicSectors {
  agriculture: number; // % of GDP
  industry: number; // % of GDP
  services: number; // % of GDP
  year?: number;
}

export interface InfrastructureHighlights {
  mainAirports?: string[];
  airportCount?: number;
  majorPorts?: string[];
  highSpeedRailStatus?: string;
  railwaysKm?: number;
  cleanEnergyPercent?: number;
  // 'generation': share of electricity generated (curated); 'capacity': non-fossil share of installed capacity (Factbook)
  cleanEnergyBasis?: 'generation' | 'capacity';
}

export interface CulturalHeritageHighlights {
  nationalDish: string;
  famousHistoricalFigures: string[];
  globalContributions: string[];
}

// Hand-written profiles fill every field; for other countries a field is only set when a source has it
export interface ExtendedCountryDetails {
  overview: string;
  foundingFigures?: string[];
  historicalPredecessors?: string[];
  strategicDoctrine?: string;
  missileDefense?: string;
  cyberSpaceCapability?: string;
  defenseContractors?: string[];
  naturalResources?: string[];
  topTradingPartners?: string[];
  exportPartners?: string[];
  importPartners?: string[];
  hdiScore?: number;
  hdiYear?: number;
  hdiTier?: 'Very High' | 'High' | 'Medium' | 'Low';
  drivingSide?: 'Right' | 'Left';
  callingCode?: string;
  tld?: string;
  timeZones?: string[];
  timeZoneNote?: string;
  majorRivers?: string[];
  majorMountainRanges?: string[];
  nationalAnimal?: string;
  nationalSymbol?: string;
  nationalSport?: string;
  // Extended intelligence fields:
  armedForcesBranches?: string[];
  primaryWeapons?: string[];
  historicalMilestones: HistoricalMilestone[];
  economicSectors?: EconomicSectors;
  infrastructureHighlights?: InfrastructureHighlights;
  culturalHeritageHighlights?: CulturalHeritageHighlights;
  climateBiomes?: string[];
  internationalMemberships: string[];
}

// Curated rich details for major nations and key regional powers
const CURATED_DETAILS: Record<string, Partial<ExtendedCountryDetails>> = {
  // United States
  '840': {
    overview: 'The United States is a constitutional federal republic comprising 50 states and overseas territories. Possessing the world’s largest nominal GDP and the most technologically advanced global military, it maintains worldwide power projection capabilities through a network of forward bases, carrier strike groups, and strategic alliances.',
    foundingFigures: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'Alexander Hamilton', 'John Adams', 'James Madison'],
    historicalPredecessors: ['Thirteen British Colonies', 'Articles of Confederation', 'Kingdom of Great Britain (Colonial Era)'],
    strategicDoctrine: 'Global Power Projection, Nuclear Triad Deterrence, Freedom of Navigation, and Forward Defense posture via alliances (NATO, ANZUS, Five Eyes, AUKUS).',
    missileDefense: 'Ground-Based Midcourse Defense (GMD), Aegis Ballistic Missile Defense, THAAD, and Patriot PAC-3 batteries.',
    cyberSpaceCapability: 'Tier 1 Global Cyber Power (US Cyber Command, NSA) and Space Force (USSF) with global orbital reconnaissance and GPS constellations.',
    defenseContractors: ['Lockheed Martin', 'RTX (Raytheon)', 'Boeing Defense', 'Northrop Grumman', 'General Dynamics', 'L3Harris'],
    naturalResources: ['Petroleum & Crude Oil', 'Natural Gas', 'Coal', 'Arable Farmland', 'Copper', 'Lead', 'Molybdenum', 'Phosphates', 'Uranium', 'Bauxite', 'Timber'],
    topTradingPartners: ['Canada', 'Mexico', 'China', 'Japan', 'Germany', 'United Kingdom', 'South Korea'],
    hdiScore: 0.927,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+1',
    tld: '.us',
    timeZones: ['UTC-5 (EST)', 'UTC-6 (CST)', 'UTC-7 (MST)', 'UTC-8 (PST)', 'UTC-9 (AKST)', 'UTC-10 (HST)'],
    majorRivers: ['Mississippi-Missouri System', 'Colorado River', 'Columbia River', 'Rio Grande', 'Yukon River', 'Ohio River'],
    majorMountainRanges: ['Rocky Mountains', 'Appalachian Mountains', 'Sierra Nevada', 'Cascade Range', 'Alaska Range (Denali)'],
    nationalAnimal: 'American Bald Eagle (Haliaeetus leucocephalus)',
    nationalSymbol: 'Liberty Bell & Great Seal of the United States',
    nationalSport: 'Baseball (Historical) & American Football',
    armedForcesBranches: ['US Army', 'US Navy', 'US Air Force', 'US Marine Corps', 'US Space Force', 'US Coast Guard'],
    primaryWeapons: ['F-35 Lightning II & F-22 Raptor Stealth Fighters', 'M1A2 SEPv3 Abrams Main Battle Tank', 'Ford & Nimitz-Class Nuclear Supercarriers', 'Virginia-Class Fast Attack Submarines', 'B-21 Raider Stealth Bomber & B-2 Spirit', 'M142 HIMARS Precision Rocket Artillery'],
    historicalMilestones: [
      { year: '1776', title: 'Declaration of Independence', description: 'Thirteen colonies declare sovereignty from British crown, enshrining fundamental natural rights.' },
      { year: '1787', title: 'Adoption of US Constitution', description: 'Drafting of the supreme law of the land creating a separation of powers and federal republic.' },
      { year: '1865', title: 'End of Civil War', description: 'Abolition of slavery and preservation of the Union following four years of national conflict.' },
      { year: '1945', title: 'Dawn of Atomic Era & Global Leadership', description: 'Emergence as leading post-WWII economic, scientific, and geopolitical superpower.' },
    ],
    economicSectors: { agriculture: 1.2, industry: 18.2, services: 80.6 },
    infrastructureHighlights: {
      mainAirports: ['Hartsfield-Jackson Atlanta (ATL)', 'Dallas/Fort Worth (DFW)', 'Denver International (DEN)', 'Los Angeles (LAX)'],
      majorPorts: ['Port of Los Angeles', 'Port of Long Beach', 'Port of New York and New Jersey', 'Port of Houston'],
      highSpeedRailStatus: 'Acela Express (Northeast Corridor) & Brightline; California HSR in development',
      cleanEnergyPercent: 23,
    },
    culturalHeritageHighlights: {
      nationalDish: 'Hamburger, Barbecue & Apple Pie',
      famousHistoricalFigures: ['Abraham Lincoln', 'Martin Luther King Jr.', 'Thomas Edison', 'Benjamin Franklin'],
      globalContributions: ['Internet (ARPANET)', 'Commercial Aviation', 'Silicon Valley Microelectronics', 'Jazz, Blues & Rock and Roll'],
    },
    climateBiomes: ['Temperate Deciduous Forest', 'Great Plains Grasslands', 'Sonoran & Mojave Deserts', 'Subtropical Wetland', 'Alpine Tundra'],
    internationalMemberships: ['United Nations (UNSC Permanent 5)', 'NATO (Core Ally)', 'G7', 'G20', 'OECD', 'Five Eyes', 'AUKUS', 'Quad'],
  },

  // China
  '156': {
    overview: 'China is one of the world’s earliest cradles of continuous civilization, with written records spanning over 4,000 years. Today, it is the world’s second-largest economy by nominal GDP (largest by PPP), possesses the largest active military personnel in the world, the largest naval fleet by hull count, and is an AI and aerospace superpower.',
    foundingFigures: ['Qin Shi Huang (First Emperor, 221 BCE)', 'Sun Yat-sen (Republic of China, 1912)', 'Mao Zedong (PRC, 1949)', 'Deng Xiaoping (Economic Reform)'],
    historicalPredecessors: ['Qin Dynasty', 'Han Dynasty', 'Tang Dynasty', 'Song Dynasty', 'Ming Dynasty', 'Qing Dynasty', 'Republic of China (1912–1949)'],
    strategicDoctrine: 'Active Defense, Anti-Access/Area Denial (A2/AD) in the Western Pacific, Maritime Silk Road protection, and Nuclear Minimum Credible Deterrence.',
    missileDefense: 'HQ-9, HQ-19 mid-course exo-atmospheric interceptors, HQ-29, and S-400 long-range SAM divisions.',
    cyberSpaceCapability: 'Strategic Support Force (SSF) specialized in electronic warfare, deep cyberspace operations, and BeiDou satellite navigation constellation.',
    defenseContractors: ['AVIC (Aviation Industry Corp)', 'Norinco', 'CSSC (Shipbuilding)', 'CASC (Aerospace Science & Tech)', 'CASIC'],
    naturalResources: ['Rare Earth Elements (Global Dominance)', 'Coal', 'Iron Ore', 'Petroleum', 'Natural Gas', 'Antimony', 'Tin', 'Tungsten', 'Hydroelectric Power'],
    topTradingPartners: ['United States', 'European Union', 'ASEAN', 'Japan', 'South Korea', 'Russia', 'Australia'],
    hdiScore: 0.788,
    hdiTier: 'High',
    drivingSide: 'Right',
    callingCode: '+86',
    tld: '.cn',
    timeZones: ['UTC+8 (China Standard Time / Beijing Time)'],
    majorRivers: ['Yangtze River (Chang Jiang)', 'Yellow River (Huang He)', 'Pearl River (Zhu Jiang)', 'Mekong (Lancang)', 'Heilongjiang (Amur)'],
    majorMountainRanges: ['Himalayas', 'Kunlun Mountains', 'Tian Shan', 'Qinling Mountains', 'Hengduan Mountains'],
    nationalAnimal: 'Giant Panda & Chinese Dragon (Mythological)',
    nationalSymbol: 'Tiananmen Gate & Five Stars',
    nationalSport: 'Table Tennis (Ping Pong) & Badminton',
    armedForcesBranches: ['People’s Liberation Army (PLA) Ground Force', 'PLA Navy (PLAN)', 'PLA Air Force (PLAAF)', 'PLA Rocket Force (PLARF)', 'PLA Strategic Support Force'],
    primaryWeapons: ['J-20 Mighty Dragon 5th Gen Stealth Fighter', 'Type 055 Guided Missile Destroyer', 'Type 99A Main Battle Tank', 'Fujian Type 003 CATOBAR Aircraft Carrier', 'DF-41 & DF-17 Hypersonic Glide Missiles', 'Type 094 Nuclear Ballistic Submarine'],
    historicalMilestones: [
      { year: '221 BCE', title: 'Unification under Qin Shi Huang', description: 'Qin Dynasty unifies warring kingdoms, standardizes currency, weights, script, and constructs the Great Wall.' },
      { year: '618 CE', title: 'Tang Dynasty Golden Age', description: 'Cosmopolitan flowering of poetry, Buddhism, Silk Road global trade, and woodblock printing.' },
      { year: '1911', title: 'Xinhai Revolution', description: 'Overthrow of the Qing Dynasty ending two millennia of imperial dynastic rule, establishing Republic of China.' },
      { year: '1978', title: 'Reform and Opening Up', description: 'Deng Xiaoping initiates market reforms, sparking the fastest poverty reduction and industrial rise in human history.' },
    ],
    economicSectors: { agriculture: 7.1, industry: 39.9, services: 53.0 },
    infrastructureHighlights: {
      mainAirports: ['Beijing Daxing (PKX)', 'Shanghai Pudong (PVG)', 'Guangzhou Baiyun (CAN)', 'Shenzhen Baoan (SZX)'],
      majorPorts: ['Port of Shanghai (World #1)', 'Ningbo-Zhoushan', 'Shenzhen', 'Qingdao', 'Guangzhou'],
      highSpeedRailStatus: 'World’s largest high-speed rail network spanning over 45,000 km operating up to 350 km/h',
      cleanEnergyPercent: 35,
    },
    culturalHeritageHighlights: {
      nationalDish: 'Peking Duck, Kung Pao Chicken, Dim Sum & Hotpot',
      famousHistoricalFigures: ['Confucius (Kongzi)', 'Laozi (Taoism)', 'Sun Tzu (Art of War)', 'Du Fu & Li Bai (Poets)'],
      globalContributions: ['Four Great Inventions (Compass, Gunpowder, Papermaking, Printing)', 'Silk & Porcelain', 'Acupuncture & Traditional Medicine'],
    },
    climateBiomes: ['Subtropical Evergreen Forest', 'Temperate Continental Steppe', 'Tibetan Alpine Tundra', 'Gobi & Taklamakan Deserts'],
    internationalMemberships: ['United Nations (UNSC Permanent 5)', 'BRICS', 'Shanghai Cooperation Organisation (SCO)', 'G20', 'APEC'],
  },

  // Russia
  '643': {
    overview: 'Russia is the largest country on Earth by territorial landmass, spanning eleven time zones and two continents. It possesses the world’s largest stockpile of confirmed nuclear warheads, extensive natural gas and oil reserves, and an indigenous defense industry renowned for hypersonic missile technology, armored vehicles, and air defense systems.',
    foundingFigures: ['Rurik (Novgorod, 862 CE)', 'Ivan the Great (Ivan III, Tsardom)', 'Peter the Great (Russian Empire)', 'Vladimir Lenin (Soviet Union)', 'Boris Yeltsin (Russian Federation)'],
    historicalPredecessors: ['Kievan Rus’', 'Grand Duchy of Moscow', 'Tsardom of Russia', 'Russian Empire', 'Soviet Union (USSR)'],
    strategicDoctrine: 'Strategic Nuclear Deterrence, Escalation to De-escalate posture, Spheres of Influence in Eurasia (CSTO), and deep territorial air defense.',
    missileDefense: 'A-235 Nudol anti-ballistic system, S-400 Triumf, S-500 Prometheus, and Voronezh early-warning radar network.',
    cyberSpaceCapability: 'Extensive offensive and defensive military intelligence cyber capabilities (GRU / FSB) and GLONASS global satellite constellation.',
    defenseContractors: ['Rostec', 'Almaz-Antey (Air Defense)', 'United Aircraft Corporation (Sukhoi, MiG)', 'Uralvagonzavod (Tanks)', 'United Shipbuilding Corp'],
    naturalResources: ['Natural Gas (World #1 reserves)', 'Petroleum & Crude Oil', 'Coal', 'Nickel', 'Platinum', 'Timber', 'Gold', 'Diamonds', 'Rare Earths', 'Grain'],
    topTradingPartners: ['China', 'India', 'Turkey', 'Belarus', 'Kazakhstan', 'United Arab Emirates'],
    hdiScore: 0.821,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+7',
    tld: '.ru',
    timeZones: ['UTC+2 (Kaliningrad)', 'UTC+3 (Moscow)', 'UTC+4 to UTC+12 (Kamchatka)'],
    majorRivers: ['Volga River (Europe’s longest)', 'Ob-Irtysh System', 'Yenisei River', 'Lena River', 'Amur River', 'Don River'],
    majorMountainRanges: ['Ural Mountains (Europe/Asia boundary)', 'Caucasus Mountains (Mt. Elbrus)', 'Altai Mountains', 'Kamchatka Volcanoes'],
    nationalAnimal: 'Eurasian Brown Bear & Double-Headed Eagle',
    nationalSymbol: 'Double-Headed Golden Eagle & Kremlin Spire',
    nationalSport: 'Ice Hockey, Sambo, Figure Skating & Chess',
    armedForcesBranches: ['Russian Ground Forces', 'Russian Navy', 'Russian Aerospace Forces (VKS)', 'Strategic Missile Forces (RVSN)', 'Russian Airborne Forces (VDV)'],
    primaryWeapons: ['Su-57 Felon 5th Gen Stealth Fighter & Su-35S', 'T-90M Proryv & T-14 Armata Main Battle Tanks', 'S-400 Triumf & S-500 Prometheus SAM Systems', 'Borei-A Class Nuclear Ballistic Submarines', 'RS-28 Sarmat Heavy ICBM & Avangard Hypersonic Glider', 'Iskander-M Tactical Ballistic Missiles'],
    historicalMilestones: [
      { year: '862', title: 'Founding of Novgorod & Kievan Rus', description: 'Traditional establishment of East Slavic statehood under Prince Rurik.' },
      { year: '1703', title: 'Founding of St. Petersburg & Westernization', description: 'Tsar Peter the Great modernizes Russia into a major European empire.' },
      { year: '1917', title: 'October Revolution & USSR Foundation', description: 'Bolshevik uprising creates the world’s first socialist superpower.' },
      { year: '1961', title: 'Yuri Gagarin First Human in Space', description: 'Cosmonaut Yuri Gagarin orbits Earth, pioneering human space exploration.' },
    ],
    economicSectors: { agriculture: 4.5, industry: 32.4, services: 63.1 },
    infrastructureHighlights: {
      mainAirports: ['Sheremetyevo Moscow (SVO)', 'Domodedovo (DME)', 'Pulkovo St. Petersburg (LED)', 'Novosibirsk Tolmachevo (OVB)'],
      majorPorts: ['Port of Novorossiysk (Black Sea)', 'Port of St. Petersburg (Baltic)', 'Vladivostok (Pacific)', 'Murmansk (Arctic)'],
      highSpeedRailStatus: 'Sapsan High-Speed Express (Moscow - St. Petersburg); Trans-Siberian Railway (9,289 km)',
      cleanEnergyPercent: 19,
    },
    culturalHeritageHighlights: {
      nationalDish: 'Borscht, Pelmeni, Beef Stroganoff & Blini',
      famousHistoricalFigures: ['Leo Tolstoy & Fyodor Dostoevsky', 'Dmitri Mendeleev (Periodic Table)', 'Pyotr Tchaikovsky', 'Mikhail Lomonosov'],
      globalContributions: ['Periodic Table of Elements', 'Classical Ballet Tradition', 'Space Exploration Firsts (Sputnik, Gagarin)', 'Nuclear Energy Technology'],
    },
    climateBiomes: ['Boreal Taiga Forest', 'Subarctic Tundra', 'Temperate Mixed Woodland', 'Eurasian Steppe'],
    internationalMemberships: ['United Nations (UNSC Permanent 5)', 'BRICS', 'CSTO (Treaty Leader)', 'Shanghai Cooperation Organisation (SCO)', 'EAEU'],
  },

  // United Kingdom
  '826': {
    overview: 'The United Kingdom is an island nation with a profound global legacy as the birthplace of parliamentary democracy, the Industrial Revolution, common law, and the English language. A permanent member of the UN Security Council and a nuclear power, it maintains a blue-water navy, elite special forces, and global diplomatic reach through the Commonwealth of Nations.',
    foundingFigures: ['King Athelstan (First King of England, 927 CE)', 'William the Conqueror (1066)', 'King James VI and I (Union of Crowns, 1603)', 'Queen Anne (Act of Union 1707)'],
    historicalPredecessors: ['Kingdom of England', 'Kingdom of Scotland', 'Kingdom of Great Britain', 'British Empire'],
    strategicDoctrine: 'Global Britain, North Atlantic defense, Continuous At-Sea Deterrence (CASD) via Vanguard-class nuclear ballistic submarines, and NATO Article 5 leadership.',
    missileDefense: 'Type 45 Daring-class air-defense destroyers equipped with Sea Viper (Aster 30/15) missiles; integrated NATO ballistic missile defense.',
    cyberSpaceCapability: 'National Cyber Force (NCF) and GCHQ with world-leading signals intelligence and offensive cyber operations; Skynet military communications satellite constellation.',
    defenseContractors: ['BAE Systems', 'Rolls-Royce Defense', 'Babcock International', 'QinetiQ', 'Thales UK'],
    naturalResources: ['North Sea Petroleum & Natural Gas', 'Coal (historic)', 'Limestone', 'Iron Ore', 'Arable Land', 'Offshore Wind Energy'],
    topTradingPartners: ['United States', 'Germany', 'Netherlands', 'France', 'Ireland', 'China'],
    hdiScore: 0.940,
    hdiTier: 'Very High',
    drivingSide: 'Left',
    callingCode: '+44',
    tld: '.uk',
    timeZones: ['UTC+0 (GMT / Greenwich Mean Time)', 'UTC+1 (BST in Summer)'],
    majorRivers: ['River Thames', 'River Severn (longest in UK)', 'River Trent', 'River Mersey', 'River Clyde'],
    majorMountainRanges: ['Scottish Highlands (Ben Nevis)', 'Pennines ("Backbone of England")', 'Snowdonia / Eryri (Wales)', 'Lake District Cumbrian Mountains'],
    nationalAnimal: 'Barbary Lion & Unicorn (Scotland)',
    nationalSymbol: 'Royal Coat of Arms & Big Ben / Elizabeth Tower',
    nationalSport: 'Association Football (Soccer), Cricket & Rugby',
  },

  // France
  '250': {
    overview: 'France is the largest nation in the European Union by land area and the leading continental military power. Possessing an independent nuclear deterrent (Force de Frappe), indigenous aerospace and defense production, and the world’s second-largest Exclusive Economic Zone (EEZ) spanning twelve time zones due to overseas territories.',
    foundingFigures: ['Clovis I (First King of the Franks, 486 CE)', 'Charlemagne (Holy Roman Emperor, 800)', 'Treaty of Verdun (843, West Francia)', 'Napoleon Bonaparte', 'Charles de Gaulle (Fifth Republic, 1958)'],
    historicalPredecessors: ['Kingdom of the Franks', 'West Francia', 'Kingdom of France (Ancien Régime)', 'First French Empire', 'French Colonial Empire', 'Fourth Republic'],
    strategicDoctrine: 'Strategic Autonomy, Independent Nuclear Deterrence (Air-launched ASMP-A and submarine-launched M51 ICBMs), and European Defense leadership within NATO.',
    missileDefense: 'SAMP/T (MAMBA) air defense system with Aster 30 interceptors; Charles de Gaulle nuclear aircraft carrier air defense umbrella.',
    cyberSpaceCapability: 'COMCYBER (Commandement de la cyberdéfense) and DGSE signals intelligence; Syracuse IV military communications satellites.',
    defenseContractors: ['Dassault Aviation (Rafale)', 'Thales Group', 'Naval Group', 'Safran', 'MBDA Missile Systems', 'Nexter / KNDS'],
    naturalResources: ['Arable Agricultural Land (EU breadbasket)', 'Uranium (historic)', 'Iron Ore', 'Bauxite', 'Timber', 'Offshore Maritime Fisheries'],
    topTradingPartners: ['Germany', 'Italy', 'Spain', 'United States', 'Belgium', 'United Kingdom', 'China'],
    hdiScore: 0.910,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+33',
    tld: '.fr',
    timeZones: ['UTC+1 (CET / Metropolitan France)', 'Total 12 time zones across overseas territories'],
    majorRivers: ['Loire River (longest in France)', 'Seine River', 'Rhône River', 'Garonne River', 'Rhine (Border)'],
    majorMountainRanges: ['French Alps (Mont Blanc - 4,809m)', 'Pyrenees', 'Massif Central', 'Jura Mountains', 'Vosges'],
    nationalAnimal: 'Gallic Rooster (Coq Gaulois)',
    nationalSymbol: 'Marianne & Eiffel Tower',
    nationalSport: 'Football (Soccer), Rugby Union, Cycling (Tour de France)',
  },

  // Japan
  '392': {
    overview: 'Japan is an archipelago of 6,852 islands in East Asia renowned for supreme technological engineering, high living standards, and deep cultural continuity dating back to antiquity. Despite maintaining an officially constitutionally constrained defense posture under Article 9, its Japan Self-Defense Forces (JSDF) represent one of the most technologically lethal armed forces on Earth.',
    foundingFigures: ['Emperor Jimmu (Traditional Founder, 660 BCE)', 'Prince Shotoku (Seventeen-Article Constitution, 604 CE)', 'Minamoto no Yoritomo (Kamakura Shogunate, 1192)', 'Tokugawa Ieyasu (Edo Period, 1603)', 'Emperor Meiji (Meiji Restoration, 1868)'],
    historicalPredecessors: ['Yamato Period', 'Nara Period', 'Heian Period', 'Kamakura & Ashikaga Shogunates', 'Tokugawa Shogunate (Edo Period)', 'Empire of Japan (1868–1947)'],
    strategicDoctrine: 'Exclusively Defense-Oriented Posture (Senshu Boei), US-Japan Security Treaty alliance, Counter-Strike Capability acquisition, and maritime island defense.',
    missileDefense: 'World’s dense multi-tier BMD: Aegis-equipped destroyers (SM-3 Block IIA), PAC-3 Patriot batteries, and planned Aegis System Equipped Vessels (ASEV).',
    cyberSpaceCapability: 'Cyber Defense Command (MOD) and Space Operations Squadron (Fuchu); QZSS Michibiki quasi-zenith positioning satellite network.',
    defenseContractors: ['Mitsubishi Heavy Industries', 'Kawasaki Heavy Industries', 'IHI Corporation', 'NEC Defense', 'Toshiba Defense Systems'],
    naturalResources: ['Fish & Seafood Resources', 'Geothermal Energy Potential', 'Deep Sea Rare Earth Deposits', 'Hydroelectric Power', 'High-tech Refining'],
    topTradingPartners: ['China', 'United States', 'South Korea', 'Taiwan', 'Australia', 'Germany'],
    hdiScore: 0.920,
    hdiTier: 'Very High',
    drivingSide: 'Left',
    callingCode: '+81',
    tld: '.jp',
    timeZones: ['UTC+9 (JST / Japan Standard Time)'],
    majorRivers: ['Shinano River (longest in Japan)', 'Tone River (largest drainage)', 'Ishikari River', 'Kiso River', 'Mogami River'],
    majorMountainRanges: ['Japanese Alps (Hida, Kiso, Akaishi)', 'Mount Fuji (3,776m)', 'Ou Mountains', 'Hidaka Mountains'],
    nationalAnimal: 'Green Pheasant (Kiji) & Carp (Koi)',
    nationalSymbol: 'Imperial Chrysanthemum Seal & Mount Fuji',
    nationalSport: 'Sumo Wrestling (National) & Baseball (Most Popular)',
  },

  // Germany
  '276': {
    overview: 'Germany is Europe’s largest economy and the fourth-largest globally, renowned as an industrial and engineering powerhouse. As a core member of NATO and the European Union, the Bundeswehr is undergoing a historic 100-billion-euro modernization (Zeitenwende) to build the premier conventional armed forces of central Europe.',
    foundingFigures: ['Otto the Great (Holy Roman Empire, 962 CE)', 'Otto von Bismarck (Unification of Germany, 1871)', 'Konrad Adenauer (Post-War Federal Republic, 1949)', 'Helmut Kohl (Reunification, 1990)'],
    historicalPredecessors: ['Holy Roman Empire of the German Nation', 'German Confederation', 'German Empire (Deutsches Kaiserreich)', 'Weimar Republic', 'Federal Republic & GDR (Cold War)'],
    strategicDoctrine: 'Territorial and Alliance Defense within NATO, Forward Collective Defense in the Baltics, Framework Nation Concept, and European Pillar of Transatlantic Security.',
    missileDefense: 'Patriot PAC-3, IRIS-T SLM surface-to-air systems, Arrow-3 exo-atmospheric interceptors procured from Israel, and Mantis C-RAM defense.',
    cyberSpaceCapability: 'Cyber and Information Domain Service (CIR - Cyber- und Informationsraum); SARah radar reconnaissance satellite system.',
    defenseContractors: ['Rheinmetall (Tanks, Ammunition)', 'Krauss-Maffei Wegmann (KNDS)', 'Diehl Defence', 'Hensoldt (Sensors/Radar)', 'ThyssenKrupp Marine Systems'],
    naturalResources: ['Lignite Coal', 'Potash & Salt', 'Uranium (historic)', 'Timber', 'Arable Farmland', 'Wind & Solar Energy'],
    topTradingPartners: ['United States', 'China', 'France', 'Netherlands', 'Poland', 'Italy', 'United Kingdom'],
    hdiScore: 0.950,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+49',
    tld: '.de',
    timeZones: ['UTC+1 (CET)', 'UTC+2 (CEST Summer)'],
    majorRivers: ['Rhine River (Rhein)', 'Danube River (Donau)', 'Elbe River', 'Oder River', 'Weser River', 'Main River'],
    majorMountainRanges: ['Bavarian Alps (Zugspitze - 2,962m)', 'Black Forest (Schwarzwald)', 'Harz Mountains', 'Ore Mountains (Erzgebirge)'],
    nationalAnimal: 'Federal Eagle (Bundesadler)',
    nationalSymbol: 'Brandenburg Gate & Iron Cross',
    nationalSport: 'Football (Bundesliga / Nationalmannschaft)',
  },

  // India
  '356': {
    overview: 'India is the most populous democracy on Earth and the fifth-largest global economy, rapidly expanding as a major technological, industrial, and military superpower. It possesses the second-largest active military personnel, an indigenous nuclear triad, and leading space exploration achievements via ISRO.',
    foundingFigures: ['Chandragupta Maurya & Chanakya (322 BCE)', 'Emperor Ashoka the Great', 'Mahatma Gandhi (Father of the Nation, 1947)', 'Jawaharlal Nehru (First Prime Minister)', 'B.R. Ambedkar (Father of the Indian Constitution)'],
    historicalPredecessors: ['Indus Valley Civilization', 'Vedic Kingdoms (Mahajanapadas)', 'Maurya Empire', 'Gupta Empire', 'Chola Dynasty', 'Mughal Empire', 'British Raj (1858–1947)'],
    strategicDoctrine: 'Credible Minimum Nuclear Deterrence with "No First Use" policy, Two-Front deterrence posture, Strategic Autonomy, and security in the Indian Ocean Region (IOR).',
    missileDefense: 'Indian Ballistic Missile Defence Programme (Prithvi Air Defence & Advanced Air Defence), S-400 Triumf batteries, and indigenous Akash & Barak-8 SAMs.',
    cyberSpaceCapability: 'Defence Cyber Agency (DCyA) and Defence Space Agency (DSA); NavIC indigenous satellite navigation constellation.',
    defenseContractors: ['Hindustan Aeronautics Limited (HAL)', 'Bharat Electronics (BEL)', 'DRDO (Research & Dev)', 'Mazagon Dock Shipbuilders', 'Bharat Dynamics'],
    naturalResources: ['Coal (World #4 reserves)', 'Iron Ore', 'Manganese', 'Mica', 'Bauxite', 'Titanium Ore', 'Chromite', 'Natural Gas', 'Petroleum', 'Arable Land'],
    topTradingPartners: ['United States', 'China', 'United Arab Emirates', 'Saudi Arabia', 'Russia', 'Singapore'],
    hdiScore: 0.644,
    hdiTier: 'Medium',
    drivingSide: 'Left',
    callingCode: '+91',
    tld: '.in',
    timeZones: ['UTC+5:30 (IST / Indian Standard Time)'],
    majorRivers: ['Ganges (Ganga)', 'Brahmaputra River', 'Indus (Sindhu)', 'Godavari River', 'Krishna River', 'Yamuna River', 'Narmada River'],
    majorMountainRanges: ['Himalayas (Kangchenjunga - 8,586m)', 'Western Ghats', 'Eastern Ghats', 'Aravalli Range', 'Vindhya Range'],
    nationalAnimal: 'Bengal Tiger (Panthera tigris tigris) & Indian Peacock',
    nationalSymbol: 'Lion Capital of Ashoka (State Emblem) & Ashoka Chakra',
    nationalSport: 'Cricket (De facto national passion) & Field Hockey (Official historic)',
  },

  // South Korea
  '410': {
    overview: 'South Korea (Republic of Korea) has transformed from a war-torn nation into one of the world’s most prosperous high-tech economies and cultural phenomena. Facing the constant threat of North Korea, it fields a formidable high-tech military of over 500,000 active troops and has emerged as one of the world’s fastest-growing defense export giants.',
    foundingFigures: ['Dangun Wanggeom (Mythical Gojoseon founder, 2333 BCE)', 'King Sejong the Great (Created Hangul Alphabet, 1443 CE)', 'Syngman Rhee (First President, 1948)', 'Park Chung-hee (Economic Miracle on the Han River)'],
    historicalPredecessors: ['Gojoseon', 'Three Kingdoms (Goguryeo, Baekje, Silla)', 'Unified Silla & Balhae', 'Goryeo Dynasty (origin of "Korea")', 'Joseon Dynasty (1392–1897)', 'Korean Empire (1897–1910)'],
    strategicDoctrine: 'Three-Axis Defense System: Kill Chain (preemptive strike), Korea Air and Missile Defense (KAMD), and Korea Massive Punishment and Retaliation (KMPR).',
    missileDefense: 'KAMD multi-layered defense: Patriot PAC-3, M-SAM (Cheongung-II), L-SAM long-range interceptor, and US THAAD battery stationed in Seongju.',
    cyberSpaceCapability: 'Cyber Operations Command defending against state-sponsored advanced persistent threats; indigenous military spy satellites (425 Project).',
    defenseContractors: ['Hanwha Aerospace (K9 Thunder Howitzer)', 'KAI (KF-21 Boramae, FA-50)', 'Hyundai Rotem (K2 Black Panther Tank)', 'LIG Nex1', 'HD Hyundai Heavy Industries'],
    naturalResources: ['Coal (limited)', 'Tungsten', 'Graphite', 'Molybdenum', 'Lead', 'World-leading Semiconductor & Battery manufacturing capacity'],
    topTradingPartners: ['China', 'United States', 'Vietnam', 'Japan', 'Australia', 'Saudi Arabia'],
    hdiScore: 0.929,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+82',
    tld: '.kr',
    timeZones: ['UTC+9 (KST / Korea Standard Time)'],
    majorRivers: ['Han River (Hangang)', 'Nakdong River (longest in S. Korea)', 'Geum River', 'Bukhan River', 'Yeongsan River'],
    majorMountainRanges: ['Taebaek Mountains', 'Sobaek Mountains', 'Jirisan (1,915m)', 'Hallasan Volcano (Jeju Island - 1,947m)'],
    nationalAnimal: 'Siberian / Korean Tiger',
    nationalSymbol: 'Taegeuk (Yin-Yang emblem) & Rose of Sharon (Mugunghwa)',
    nationalSport: 'Taekwondo (Traditional Martial Art), Baseball & Football',
  },

  // Israel
  '376': {
    overview: 'Israel is a technologically advanced, sovereign Jewish and democratic state in the Middle East. Possessing an unacknowledged yet internationally recognized nuclear weapons capability and a world-renowned military-technological ecosystem, it maintains permanent qualitative military edge (QME) over regional adversaries.',
    foundingFigures: ['David Ben-Gurion (First Prime Minister, 1948)', 'Theodor Herzl (Visionary of the Jewish State)', 'Chaim Weizmann (First President)', 'Golda Meir'],
    historicalPredecessors: ['Ancient Kingdoms of Israel and Judah', 'Hasmonean Dynasty', 'British Mandate for Palestine (1920–1948)'],
    strategicDoctrine: 'Begin Doctrine (preventing regional adversaries from acquiring WMDs), Qualitative Military Edge (QME), Rapid Offensive Decisiveness on Enemy Soil, and Samson Option.',
    missileDefense: 'World’s most combat-tested multi-tier missile shield: Iron Dome (short-range rockets), David’s Sling (medium-range), Arrow 2 and Arrow 3 (exo-atmospheric ballistic missiles), and Iron Beam laser defense.',
    cyberSpaceCapability: 'World-leading military cyber capabilities spearheaded by the IDF Unit 8200 and Directorate of Defense R&D (DDR&D / Maf\'at).',
    defenseContractors: ['Elbit Systems', 'Israel Aerospace Industries (IAI)', 'Rafael Advanced Defense Systems', 'Israel Weapon Industries (IWI)'],
    naturalResources: ['Levantine Basin Offshore Natural Gas (Tamar & Leviathan fields)', 'Potash & Bromine from Dead Sea', 'Phosphate Rock', 'High-tech Silicon Wadi ecosystem'],
    topTradingPartners: ['United States', 'China', 'Belgium', 'Germany', 'United Kingdom', 'Netherlands', 'India'],
    hdiScore: 0.915,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+972',
    tld: '.il',
    timeZones: ['UTC+2 (IST)', 'UTC+3 (IDT Summer)'],
    majorRivers: ['Jordan River', 'Yarkon River', 'Kishon River'],
    majorMountainRanges: ['Judean Mountains', 'Galilee Hills', 'Mount Hermon (Golan Heights - 2,814m)', 'Carmel Mountain Range'],
    nationalAnimal: 'Eurasian Hoopoe (National Bird) & Israeli Mountain Gazelle',
    nationalSymbol: 'Menorah with Olive Branches & Star of David (Magen David)',
    nationalSport: 'Football (Soccer) & Basketball',
  },
  // Portugal
  '620': {
    overview: 'Portugal is a sovereign European nation situated on the southwestern Iberian Peninsula, spanning an official territory of 92,226 km² (35,609 sq mi) that includes continental Portugal (89,015 km²) and the Atlantic autonomous regions of the Azores and Madeira. Founded as an independent kingdom in 1139 CE, it is one of Europe’s oldest nation-states, a founding member of NATO, an EU member state, and a global frontrunner in renewable energy integration.',
    foundingFigures: ['King Afonso Henriques (Afonso I)', 'Prince Henry the Navigator', 'Vasco da Gama', 'Luís de Camões', 'Marquess of Pombal'],
    historicalPredecessors: ['Kingdom of Portugal (1139–1910)', 'First Portuguese Republic (1910–1926)', 'Estado Novo (1933–1974)', 'Roman Lusitania Province'],
    strategicDoctrine: 'NATO Collective Defense (Article 5), Atlantic Maritime Security, Subsea Telecom Cable Protection, and EU Common Security and Defence Policy (CSDP).',
    missileDefense: 'Integrated NATO Air Defense (NATINAMDS), MIM-72 Chaparral, and Mistral short-range air defense batteries.',
    cyberSpaceCapability: 'National Cybersecurity Center (CNCS) and Portuguese Armed Forces Cyber Defense Command (CDCYBER).',
    defenseContractors: ['idD Portugal Defence', 'EID (Comms & Electronics)', 'OGMA (Indústria Aeronáutica de Portugal)', 'West Sea Viana Shipyard'],
    naturalResources: ['Cork (World #1 Producer - 50% global supply)', 'Lithium Reserves (Largest in Europe)', 'Copper & Zinc', 'Tungsten', 'Marble & Ornamental Stone', 'Atlantic Deepwater EEZ'],
    topTradingPartners: ['Spain', 'France', 'Germany', 'United States', 'United Kingdom', 'Netherlands'],
    hdiScore: 0.874,
    hdiTier: 'Very High',
    drivingSide: 'Right',
    callingCode: '+351',
    tld: '.pt',
    timeZones: ['UTC+0 (WET / GMT)', 'UTC+1 (WEST Summer)', 'UTC-1 (Azores)', 'UTC+0 (Azores Summer)'],
    majorRivers: ['Tagus River (Tejo)', 'Douro River', 'Guadiana River', 'Mondego River', 'Minho River', 'Sado River'],
    majorMountainRanges: ['Mount Pico (Ponta do Pico, Azores - 2,351m / Highest Point)', 'Serra da Estrela (Mainland High Point - Torre 1,993m)', 'Serra do Gerês (Peneda-Gerês National Park)'],
    nationalAnimal: 'Iberian Wolf (Canis lupus signatus) & Rooster of Barcelos (Galo de Barcelos)',
    nationalSymbol: 'Armillary Sphere with Portuguese Shield (Escudo)',
    nationalSport: 'Football (Soccer) & Roller Rink Hockey',
    armedForcesBranches: ['Portuguese Army (Exército)', 'Portuguese Navy & Marines (Marinha)', 'Portuguese Air Force (Força Aérea)', 'National Republican Guard (GNR)'],
    primaryWeapons: ['Lockheed Martin F-16AM/BM Fighting Falcon (Fleet Upgrade)', 'Leopard 2A6 Main Battle Tank', 'Pandur II 8x8 Armored Vehicles', 'Vasco da Gama & Bartolomeu Dias-Class Frigates', 'Tridente-Class (Type 209PN) Attack Submarines', 'Embraer KC-390 Millennium Air Transport'],
    historicalMilestones: [
      { year: '1139', title: 'Battle of Ourique & Kingdom Proclamation', description: 'Afonso Henriques acclaimed first King of Portugal, formally confirmed by Treaty of Zamora (1143) and Papal Bull (1179).' },
      { year: '1386', title: 'Treaty of Windsor', description: 'Alliance with the Kingdom of England ratified, establishing the world’s oldest unbroken diplomatic mutual defense pact.' },
      { year: '1498', title: 'Vasco da Gama Reaches India', description: 'Discovery of the ocean trade route connecting Europe to Asia around the Cape of Good Hope, establishing a global maritime presence.' },
      { year: '1974', title: 'Carnation Revolution (Revolução dos Cravos)', description: 'Bloodless military coup overthrowing the Estado Novo regime and transitioning Portugal into modern democracy.' },
    ],
    economicSectors: { agriculture: 2.1, industry: 22.4, services: 75.5 },
    infrastructureHighlights: {
      mainAirports: ['Humberto Delgado Lisbon Airport (LIS)', 'Francisco Sá Carneiro Porto Airport (OPO)', 'Faro Airport (FAO)', 'Cristiano Ronaldo Madeira (FNC)'],
      majorPorts: ['Port of Sines (Deepwater Container & LNG Terminal)', 'Port of Leixões (Porto)', 'Port of Lisbon', 'Port of Setúbal'],
      highSpeedRailStatus: 'Alfa Pendular (tilting trains up to 220 km/h); Lisbon-Porto High-Speed line (300 km/h) under phased construction',
      cleanEnergyPercent: 72,
    },
    culturalHeritageHighlights: {
      nationalDish: 'Bacalhau à Brás, Pastel de Nata & Cozido à Portuguesa',
      famousHistoricalFigures: ['King Afonso Henriques', 'Prince Henry the Navigator', 'Vasco da Gama', 'Luís de Camões', 'Fernando Pessoa', 'Amália Rodrigues', 'Eusébio', 'Cristiano Ronaldo'],
      globalContributions: ['Pioneered Maritime Cartography & Global Navigation Routes', 'Fado Music (UNESCO Intangible Cultural Heritage)', 'Leading Global Renewable Energy Generation Models'],
    },
  },
  // Mauritania
  '478': {
    overview: 'Mauritania is a vast Northwest African and Saharan sovereign nation covering 1,030,700 km² (397,955 sq mi), making it the 28th largest country on Earth (larger than France and Germany combined). Situated between the Maghreb and Sub-Saharan West Africa, roughly 90% of its landmass lies within the Sahara Desert. The country is a premier exporter of high-purity iron ore, boasts one of the world’s richest Atlantic fisheries, and is rapidly emerging as a global energy exporter through the Greater Tortue Ahmeyim (GTA) offshore LNG project.',
    foundingFigures: ['Moktar Ould Daddah (Founding President)', 'Sidi Mohamed Ould Cheikh Abdallahi', 'El Hadj Oumar Tall', 'Sanhaja Berber Scholars of Chinguetti'],
    historicalPredecessors: ['Ancient Sanhaja Berber Confederation', 'Almoravid Movement & Empire Roots', 'Emirates of Trarza, Brakna, and Adrar', 'French Mauritania Colony (1904–1960)'],
    strategicDoctrine: 'Territorial Defense of the Sahara Desert, Counter-Terrorism in the Sahel, G5 Sahel Border Security, Atlantic Exclusive Economic Zone Patrols, and Peacekeeping Operations.',
    missileDefense: 'Mobile ZSU-23-4 Shilka anti-aircraft batteries, 9K32 Strela-2, and 9K38 Igla MANPADS.',
    cyberSpaceCapability: 'National Agency for Digital Development (ANAN) and Ministry of Digital Transformation & Modernization.',
    defenseContractors: ['National Industrial and Mining Company (SNIM Infrastructure)', 'Chantiers Navals de Mauritanie (Nouadhibou Coastal Shipyards)'],
    naturalResources: ['High-Grade Iron Ore (One of Africa’s Largest Producers)', 'Natural Gas (Greater Tortue Ahmeyim Field - 15+ TCF)', 'Gold (Tasiast Mine)', 'Copper Reserves', 'Atlantic Fisheries (Rich Canary Upwelling Zone)', 'Solar & Wind Resources in the Sahara'],
    topTradingPartners: ['China (Primary Iron Ore Destination)', 'Spain', 'Japan', 'France', 'Switzerland', 'Mali', 'Senegal'],
    hdiScore: 0.556,
    hdiTier: 'Medium',
    drivingSide: 'Right',
    callingCode: '+222',
    tld: '.mr',
    timeZones: ['UTC+0 (GMT - Year-round)'],
    majorRivers: ['Senegal River (Fleuve Sénégal - southern national border)', 'Gorgol River'],
    majorMountainRanges: ['Kediet ej Jill (Highest Peak - 915m / 3,002ft)', 'Adrar Plateau', 'Tagant Plateau', 'Richat Structure (Eye of the Sahara - 40km Dome)'],
    nationalAnimal: 'Dromedary Camel (Camelus dromedarius) & Mauritanian Barbary Lion (Historical)',
    nationalSymbol: 'Golden Crescent and Five-Pointed Star on Green Field',
    nationalSport: 'Football (Soccer) & Traditional Desert Camel Racing (Mhabis)',
    armedForcesBranches: ['Mauritanian National Army (Armée Nationale)', 'Mauritanian National Navy (Marine Nationale)', 'Mauritanian Islamic Air Force (Force Aérienne)', 'National Gendarmerie (Gendarmerie Nationale)'],
    primaryWeapons: ['T-55 Main Battle Tanks', 'Panhard AML-60/90 Armored Reconnaissance Vehicles', 'Embraer EMB-314 Super Tucano Light Attack Aircraft', 'Cessna 208 Caravan Reconnaissance', 'P-33 & Goroum-Class Offshore Patrol Vessels'],
    historicalMilestones: [
      { year: 'c. 1040', title: 'Rise of the Almoravids', description: 'Sanhaja scholars establish ribats in Mauritania, launching the Almoravid movement that unified Northwest Africa and Islamic Spain (Al-Andalus).' },
      { year: '1200s–1600s', title: 'Golden Age of Chinguetti & Ksour Towns', description: 'Chinguetti, Ouadane, and Tichitt thrive as vital trans-Saharan caravan hubs and global centers of Islamic theology and astronomy.' },
      { year: '1960', title: 'Proclamation of Independence', description: 'Mauritania declares sovereignty on November 28, 1960 from France under founding President Moktar Ould Daddah.' },
      { year: '2024–2026', title: 'Offshore Energy Transformation', description: 'First LNG production from the Greater Tortue Ahmeyim (GTA) deepwater field, positioning Mauritania as a leading gas exporter.' },
    ],
    economicSectors: { agriculture: 23.5, industry: 38.2, services: 38.3 },
    infrastructureHighlights: {
      mainAirports: ['Nouakchott–Oumtounsy International Airport (NKC)', 'Nouadhibou International Airport (NDB)', 'Atar International (ATR)'],
      majorPorts: ['Port Autonome de Nouadhibou (PAN - Deepwater Mineral Port)', 'Port of Friendship (Port de l’Amitié, Nouakchott)'],
      highSpeedRailStatus: 'Mauritania Railway (704 km single-track heavy mineral railway connecting Zouérat iron mines to Nouadhibou port; world-famous passenger and cargo line)',
      cleanEnergyPercent: 38,
    },
    culturalHeritageHighlights: {
      nationalDish: 'Thieboudienne (Ceebu Jën), Couscous & Maru we-Ichevi (Camel meat and rice)',
      famousHistoricalFigures: ['Moktar Ould Daddah', 'Abu Bakr ibn Umar', 'Cheikh Ma El Aïnin', 'Al-Hadrami', 'Sidi Mohamed Ould Cheikh Abdallahi'],
      globalContributions: ['Preservation of Trans-Saharan Islamic Manuscript Heritage', 'Traditional Maliki Jurisprudence & Poetry', 'Sustainable Artisanal Fisheries in Banc d’Arguin Sanctuary', 'Richat Structure Global Geologic Research'],
    },
  },
};

// Alliance short names that the organisation list spells out
const MEMBERSHIP_NAMES: Record<string, string> = {
  GCC: 'Gulf Cooperation Council',
  OAS: 'Organization of American States',
  Commonwealth: 'Commonwealth of Nations',
  CIS: 'Commonwealth of Independent States',
  SCO: 'Shanghai Cooperation Organisation',
};

// UNDP Human Development Report tiers
const hdiTierFor = (score: number): ExtendedCountryDetails['hdiTier'] =>
  score >= 0.8 ? 'Very High' : score >= 0.7 ? 'High' : score >= 0.55 ? 'Medium' : 'Low';

const yearLabel = (year: number) => (year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`);
const nonEmpty = <T,>(list?: T[]) => (list && list.length ? list : undefined);

// Dossier details: hand-written profiles for the countries in CURATED_DETAILS; for every other country only
// what countryFacts.json has from a source (CIA World Factbook, Wikidata). Missing fields stay undefined and
// the dossier hides them.
export function getDetailedCountryInfo(country: CountryData): ExtendedCountryDetails {
  const curated = CURATED_DETAILS[country.id];
  const facts = country.details || {};
  const { longevity, geography, demographics, military } = country;

  // Territories, dependencies and unrecognised states carry their status in sovereignEra
  const isSovereign = getUnStatus(country) !== 'Not a UN Member' || longevity.sovereignEra === 'Sovereign State';
  const era = longevity.sovereignEra;
  const fullName = country.officialName && country.officialName !== country.name ? `${country.name} (${country.officialName})` : country.name;
  const people = demographics.population > 0 ? `a population of ${demographics.population.toLocaleString()}` : 'no permanent population';
  const status = isSovereign
    ? `a sovereign state in ${country.subregion}, ${country.continent}`
    : `${/^[aeiou]/i.test(era) ? 'an' : 'a'} ${/^[A-Z][a-z]/.test(era) && !/^British\b/.test(era) ? era.charAt(0).toLowerCase() + era.slice(1) : era} in ${country.subregion}, ${country.continent}`;
  // Countries Global Firepower does not rank carry powerIndex 0
  const firepower = military.powerIndex > 0 ? ` Global Firepower ranks its military #${military.globalRank}.` : '';
  const overview =
    curated?.overview ||
    `${fullName} is ${status}. Its current status dates from ${yearLabel(longevity.foundationYear)}: ${longevity.foundationEvent}. It covers ${geography.areaKm2.toLocaleString()} km² and has ${people}.${firepower}`;

  const milestones: HistoricalMilestone[] = curated?.historicalMilestones || [
    { year: yearLabel(longevity.foundationYear), title: longevity.foundationEvent, _sort: longevity.foundationYear },
    ...(longevity.constitutionYear
      ? [{ year: `${longevity.constitutionYear}`, title: 'Current constitution in force', _sort: longevity.constitutionYear }]
      : []),
    ...(country.governance.unMemberSince > 0
      ? [{ year: `${country.governance.unMemberSince}`, title: 'Admitted to the United Nations', _sort: country.governance.unMemberSince }]
      : []),
  ]
    .sort((a, b) => a._sort - b._sort)
    .map(({ year, title }) => ({ year, title }));

  const memberships =
    curated?.internationalMemberships || [
      ...new Set([
        ...(country.governance.unMemberSince > 0 ? ['United Nations (UN)'] : []),
        ...military.alliances.map((a) => MEMBERSHIP_NAMES[a] || a),
        ...(facts.organizations || []),
      ]),
    ];

  const hdiScore = curated?.hdiScore ?? facts.hdi?.score;

  const infrastructure: InfrastructureHighlights | undefined =
    curated?.infrastructureHighlights
      ? { ...curated.infrastructureHighlights, cleanEnergyBasis: 'generation' }
      : facts.airports !== undefined || facts.keyPorts || facts.railwaysKm !== undefined || facts.nonFossilPowerPercent !== undefined
        ? {
            airportCount: facts.airports,
            majorPorts: nonEmpty(facts.keyPorts),
            railwaysKm: facts.railwaysKm,
            cleanEnergyPercent: facts.nonFossilPowerPercent,
            cleanEnergyBasis: 'capacity',
          }
        : undefined;

  return {
    overview,
    foundingFigures: curated?.foundingFigures,
    historicalPredecessors: curated?.historicalPredecessors,
    strategicDoctrine: curated?.strategicDoctrine,
    missileDefense: curated?.missileDefense,
    cyberSpaceCapability: curated?.cyberSpaceCapability,
    defenseContractors: curated?.defenseContractors,
    naturalResources: nonEmpty(facts.naturalResources) || curated?.naturalResources,
    topTradingPartners: curated?.topTradingPartners,
    exportPartners: nonEmpty(facts.exportPartners),
    importPartners: nonEmpty(facts.importPartners),
    hdiScore,
    hdiYear: curated?.hdiScore ? undefined : facts.hdi?.year,
    hdiTier: curated?.hdiTier || (hdiScore !== undefined ? hdiTierFor(hdiScore) : undefined),
    drivingSide: curated?.drivingSide || facts.drivingSide,
    callingCode: curated?.callingCode || facts.callingCode,
    tld: curated?.tld || facts.tld,
    timeZones: curated?.timeZones || (facts.timeZone ? [`${facts.timeZone} (capital)`] : undefined),
    timeZoneNote: curated?.timeZones ? undefined : facts.timeZoneNote,
    majorRivers: curated?.majorRivers || nonEmpty(facts.majorRivers),
    majorMountainRanges: curated?.majorMountainRanges,
    nationalAnimal: curated?.nationalAnimal,
    nationalSymbol: curated?.nationalSymbol,
    nationalSport: curated?.nationalSport,
    armedForcesBranches: curated?.armedForcesBranches || nonEmpty(facts.armedForces),
    primaryWeapons: curated?.primaryWeapons,
    historicalMilestones: milestones,
    economicSectors: curated?.economicSectors || facts.gdpBySector,
    infrastructureHighlights: infrastructure,
    culturalHeritageHighlights: curated?.culturalHeritageHighlights,
    climateBiomes: curated?.climateBiomes,
    internationalMemberships: memberships,
  };
}
