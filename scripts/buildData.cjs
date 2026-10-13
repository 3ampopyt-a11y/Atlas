const fs = require('fs');
const path = require('path');

// Curated detailed profiles for major nations, plus automatic robust defaults for all countries
const majorCountries = {
  "840": { // United States
    code: "US", code3: "USA", name: "United States", officialName: "United States of America", nativeName: "United States of America", flag: "🇺🇸",
    continent: "North America", subregion: "Northern America", capital: "Washington, D.C.", largestCity: "New York City", coordinates: [-95.7129, 37.0902],
    longevity: {
      foundationYear: 1776,
      foundationEvent: "Declaration of Independence from Great Britain",
      sovereignEra: "Constitutional Federal Republic",
      yearsAlive: 2026 - 1776, // 250 years
      historicalContinuityNotes: "Founded July 4, 1776; US Constitution ratified 1788. Continuous constitutional republic for 250 years, the oldest continuous democracy with a written constitution in active effect.",
      independenceDate: "July 4, 1776",
      constitutionYear: 1788,
      ancientOrigin: "Colonial settlements preceded by thousands of years of indigenous American nations."
    },
    military: {
      globalRank: 1, powerIndex: 0.0699, tier: "Superpower",
      defenseBudgetUSD: 886.0, defenseBudgetPercentGDP: 3.4,
      activePersonnel: 1390000, reservePersonnel: 799500, paramilitary: 0,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 5244,
      totalAircraft: 13209, combatAircraft: 1854, attackHelicopters: 983,
      tanks: 4657, armoredVehicles: 360000,
      navalFleetTotal: 472, aircraftCarriers: 11, submarines: 68, destroyersFrigates: 92,
      alliances: ["NATO (Founding)", "AUKUS", "Five Eyes", "Quad", "Rio Treaty", "US-Japan Security Treaty", "US-ROK Mutual Defense"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 9833517, areaSqMi: 3796742, coastlineKm: 19924,
      highestPoint: { name: "Denali (Mount McKinley)", elevationM: 6190 },
      lowestPoint: { name: "Badwater Basin, Death Valley", elevationM: -86 },
      climate: "Mostly temperate, but tropical in Hawaii and Florida, arctic in Alaska, semiarid in the great plains",
      terrain: "Vast central plain, mountains in west, hills and low mountains in east; rugged mountains and broad river valleys in Alaska; rugged, volcanic topography in Hawaii",
      borders: ["Canada", "Mexico"]
    },
    demographics: { population: 339996563, densityPerKm2: 36, urbanPercentage: 83.3, medianAge: 38.5, lifeExpectancy: 79.1 },
    economy: {
      gdpNominalUSD: 28781.0, gdpPerCapitaUSD: 85370, currencyName: "United States Dollar", currencyCode: "USD", currencySymbol: "$",
      majorIndustries: ["High-technology", "Aerospace & Defense", "Financial Services", "Automotive", "Petroleum & Energy", "Entertainment & Media"],
      mainExports: ["Refined Petroleum", "Crude Oil", "Integrated Circuits", "Aircraft & Spacecraft", "Medical Instruments", "Vehicles"]
    },
    governance: { governmentType: "Federal Presidential Constitutional Republic", headOfState: "President", headOfGovernment: "President", unMemberSince: 1945, nationalDay: "July 4 (Independence Day)", nationalMotto: "In God We Trust / E Pluribus Unum" },
    culture: {
      officialLanguages: ["English (de facto)"], majorReligions: ["Christianity (63%)", "Unaffiliated / Secular (29%)", "Judaism (2%)", "Islam (1%)"],
      unescoSitesCount: 26, famousLandmarks: ["Statue of Liberty", "Grand Canyon", "Golden Gate Bridge", "Mount Rushmore", "Yellowstone National Park"],
      interestingFacts: ["Operates 11 full-deck nuclear-powered CATOBAR aircraft carriers, more than the rest of the world combined.", "Has sent 12 astronauts to walk on the surface of the Moon.", "Possesses the world's largest consumer economy and primary global reserve currency."]
    }
  },
  "156": { // China
    code: "CN", code3: "CHN", name: "China", officialName: "People's Republic of China", nativeName: "中华人民共和国 (Zhōnghuá Rénmín Gònghéguó)", flag: "🇨🇳",
    continent: "Asia", subregion: "Eastern Asia", capital: "Beijing", largestCity: "Shanghai", coordinates: [104.1954, 35.8617],
    longevity: {
      foundationYear: -221,
      foundationEvent: "Qin Dynasty Unification of Imperial China",
      sovereignEra: "Unified Sovereign State (Imperial / Republic / PRC)",
      yearsAlive: 2026 - (-221), // 2247 years unified statehood
      historicalContinuityNotes: "First unified by Qin Shi Huang in 221 BCE, establishing centralized imperial governance that persisted through successive dynasties until the 1911 Xinhai Revolution and the 1949 establishment of the PRC. Over 2,247 years of continuous administrative civilization.",
      constitutionYear: 1982,
      ancientOrigin: "Xia, Shang, and Zhou dynasties dating back over 4,000 years to ~2070 BCE."
    },
    military: {
      globalRank: 3, powerIndex: 0.0706, tier: "Superpower",
      defenseBudgetUSD: 296.0, defenseBudgetPercentGDP: 1.7,
      activePersonnel: 2035000, reservePersonnel: 510000, paramilitary: 660000,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 500,
      totalAircraft: 3304, combatAircraft: 1207, attackHelicopters: 281,
      tanks: 5000, armoredVehicles: 174300,
      navalFleetTotal: 730, aircraftCarriers: 3, submarines: 61, destroyersFrigates: 98,
      alliances: ["Shanghai Cooperation Organisation (SCO)", "Sino-Russian Strategic Partnership", "DPRK Mutual Defense Treaty"],
      conscription: "Selective / Hybrid"
    },
    geography: {
      areaKm2: 9596961, areaSqMi: 3705407, coastlineKm: 14500,
      highestPoint: { name: "Mount Everest (Chomolungma)", elevationM: 8848 },
      lowestPoint: { name: "Turpan Depression (Ayding Lake)", elevationM: -154 },
      climate: "Extremely diverse; tropical in south to subarctic in north",
      terrain: "Mostly mountains, high plateaus, deserts in west; plains, deltas, and hills in east",
      borders: ["Mongolia", "Russia", "India", "Kazakhstan", "North Korea", "Myanmar", "Vietnam", "Pakistan", "Nepal", "Bhutan", "Laos", "Kyrgyzstan", "Tajikistan", "Afghanistan"]
    },
    demographics: { population: 1409670000, densityPerKm2: 147, urbanPercentage: 65.2, medianAge: 39.0, lifeExpectancy: 78.2 },
    economy: {
      gdpNominalUSD: 18532.0, gdpPerCapitaUSD: 13130, currencyName: "Renminbi (Yuan)", currencyCode: "CNY", currencySymbol: "¥",
      majorIndustries: ["Electronics & Computing", "Industrial Manufacturing", "Electric Vehicles & Batteries", "Solar & Renewable Tech", "Steel & Metals", "Telecoms"],
      mainExports: ["Telephones & Smart Devices", "Automatic Data Processors", "Integrated Circuits", "Automobiles & EVs", "Solar Panels", "Lithium Batteries"]
    },
    governance: { governmentType: "Unitary One-Party Socialist Republic", headOfState: "President", headOfGovernment: "Premier of the State Council", unMemberSince: 1945, nationalDay: "October 1 (National Day)", nationalMotto: "Serve the People (为人民服务)" },
    culture: {
      officialLanguages: ["Standard Chinese (Mandarin)"], majorReligions: ["Chinese Folk Religion / Buddhism / Taoism (74%)", "Unaffiliated (18%)", "Christianity (5%)", "Islam (2%)"],
      unescoSitesCount: 59, famousLandmarks: ["Great Wall of China", "Forbidden City", "Terracotta Army", "Potala Palace", "Li River Guilin"],
      interestingFacts: ["Home to the world's largest high-speed rail network (>45,000 km), exceeding all other nations combined.", "World's largest standing active-duty military force with over 2 million personnel.", "Has the greatest number of land border neighbors (14 sovereign nations)."]
    }
  },
  "643": { // Russia
    code: "RU", code3: "RUS", name: "Russia", officialName: "Russian Federation", nativeName: "Российская Федерация (Rossiyskaya Federatsiya)", flag: "🇷🇺",
    continent: "Europe", subregion: "Eastern Europe", capital: "Moscow", largestCity: "Moscow", coordinates: [105.3188, 61.524],
    longevity: {
      foundationYear: 862,
      foundationEvent: "Establishment of the Rurikid State / Kievan Rus'",
      sovereignEra: "Empire / Tsardom / USSR / Federation",
      yearsAlive: 2026 - 862, // 1164 years
      historicalContinuityNotes: "Tradition dates Russian statehood to 862 CE with Prince Rurik at Novgorod; solidified through the Grand Duchy of Moscow, Tsardom of Russia (1547), Russian Empire (1721), Soviet Union (1922), and Russian Federation (1991).",
      constitutionYear: 1993,
      ancientOrigin: "East Slavic tribal federations and Baltic-Finnic cultures."
    },
    military: {
      globalRank: 2, powerIndex: 0.0702, tier: "Superpower",
      defenseBudgetUSD: 140.0, defenseBudgetPercentGDP: 6.0,
      activePersonnel: 1320000, reservePersonnel: 2000000, paramilitary: 250000,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 5580,
      totalAircraft: 4255, combatAircraft: 809, attackHelicopters: 559,
      tanks: 5750, armoredVehicles: 161000,
      navalFleetTotal: 781, aircraftCarriers: 1, submarines: 65, destroyersFrigates: 48,
      alliances: ["Collective Security Treaty Organization (CSTO)", "SCO", "Union State of Russia and Belarus"],
      conscription: "Mandatory"
    },
    geography: {
      areaKm2: 17098246, areaSqMi: 6601670, coastlineKm: 37653,
      highestPoint: { name: "Mount Elbrus (Caucasus)", elevationM: 5642 },
      lowestPoint: { name: "Caspian Sea", elevationM: -28 },
      climate: "Ranges from steppes in the south through humid continental to subarctic and tundra in Siberia",
      terrain: "Broad plain with low hills west of Urals; vast coniferous forest and tundra in Siberia; uplands and mountains along southern borders",
      borders: ["Norway", "Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Belarus", "Ukraine", "Georgia", "Azerbaijan", "Kazakhstan", "China", "Mongolia", "North Korea"]
    },
    demographics: { population: 144240000, densityPerKm2: 8.5, urbanPercentage: 75.1, medianAge: 40.5, lifeExpectancy: 73.2 },
    economy: {
      gdpNominalUSD: 2056.0, gdpPerCapitaUSD: 14250, currencyName: "Russian Ruble", currencyCode: "RUB", currencySymbol: "₽",
      majorIndustries: ["Oil & Natural Gas", "Mining & Metallurgy", "Defense & Aerospace", "Nuclear Energy Tech", "Chemicals", "Grain Agriculture"],
      mainExports: ["Crude Petroleum", "Refined Petroleum", "Natural Gas", "Coal", "Wheat", "Enriched Uranium & Metals"]
    },
    governance: { governmentType: "Federal Semi-Presidential Constitutional Republic", headOfState: "President", headOfGovernment: "Prime Minister", unMemberSince: 1945, nationalDay: "June 12 (Russia Day)", nationalMotto: "Forward, Russia!" },
    culture: {
      officialLanguages: ["Russian"], majorReligions: ["Russian Orthodoxy (71%)", "Islam (10%)", "Unaffiliated (15%)", "Buddhism (1%)"],
      unescoSitesCount: 32, famousLandmarks: ["Red Square & Saint Basil's", "The Kremlin", "Lake Baikal", "Hermitage Museum", "Hermitage Winter Palace"],
      interestingFacts: ["Largest country on Earth by area, spanning 11 time zones and two continents.", "Possesses the world's largest confirmed nuclear warhead stockpile (~5,580 warheads).", "Home to Lake Baikal, the deepest and oldest freshwater lake containing 20% of the world's unfrozen surface water."]
    }
  },
  "356": { // India
    code: "IN", code3: "IND", name: "India", officialName: "Republic of India (Bharat Ganrajya)", nativeName: "भारत गणराज्य (Bhārat Gaṇarājya)", flag: "🇮🇳",
    continent: "Asia", subregion: "Southern Asia", capital: "New Delhi", largestCity: "Mumbai", coordinates: [78.9629, 20.5937],
    longevity: {
      foundationYear: -1500,
      foundationEvent: "Vedic Civilization & Maurya Unification (-322 BCE)",
      sovereignEra: "Ancient Civilizational State / Modern Republic",
      yearsAlive: 2026 - (-322), // 2348 years since Maurya Empire unification
      historicalContinuityNotes: "Civilization roots trace to Indus Valley (2500 BCE) and Vedic eras. Political unification achieved under the Maurya Empire (322 BCE), Gupta Empire (320 CE), Mughal Empire (1526), and modern sovereign republic established on August 15, 1947.",
      independenceDate: "August 15, 1947",
      constitutionYear: 1950,
      ancientOrigin: "Indus Valley Civilization (~3300–1300 BCE)."
    },
    military: {
      globalRank: 4, powerIndex: 0.1023, tier: "Great Power",
      defenseBudgetUSD: 75.0, defenseBudgetPercentGDP: 2.4,
      activePersonnel: 1455550, reservePersonnel: 1155000, paramilitary: 2527000,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 172,
      totalAircraft: 2296, combatAircraft: 606, attackHelicopters: 40,
      tanks: 4614, armoredVehicles: 151248,
      navalFleetTotal: 294, aircraftCarriers: 2, submarines: 18, destroyersFrigates: 26,
      alliances: ["Quad", "BRICS", "SCO", "I2U2", "Strategic Partnership with France, US, Russia"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 3287263, areaSqMi: 1269219, coastlineKm: 7516,
      highestPoint: { name: "Kangchenjunga", elevationM: 8586 },
      lowestPoint: { name: "Kuttanad", elevationM: -2.2 },
      climate: "Varies from tropical monsoon in south to temperate and alpine in northern Himalayas",
      terrain: "Upland plain (Deccan Plateau) in south, flat to rolling plain along the Ganges, deserts in west, Himalayas in north",
      borders: ["Pakistan", "China", "Nepal", "Bhutan", "Bangladesh", "Myanmar"]
    },
    demographics: { population: 1441719852, densityPerKm2: 438, urbanPercentage: 36.1, medianAge: 28.7, lifeExpectancy: 70.8 },
    economy: {
      gdpNominalUSD: 3937.0, gdpPerCapitaUSD: 2730, currencyName: "Indian Rupee", currencyCode: "INR", currencySymbol: "₹",
      majorIndustries: ["Information Technology & Software", "Pharmaceuticals", "Automotive", "Textiles", "Petroleum Refining", "Space Technology"],
      mainExports: ["Refined Petroleum", "Diamonds & Jewelry", "Pharmaceuticals", "Machinery", "Iron & Steel", "IT & BPO Services"]
    },
    governance: { governmentType: "Federal Parliamentary Constitutional Republic", headOfState: "President", headOfGovernment: "Prime Minister", unMemberSince: 1945, nationalDay: "January 26 (Republic Day)", nationalMotto: "Satyameva Jayate (Truth Alone Triumphs)" },
    culture: {
      officialLanguages: ["Hindi", "English (+22 Scheduled Languages)"], majorReligions: ["Hinduism (79.8%)", "Islam (14.2%)", "Christianity (2.3%)", "Sikhism (1.7%)"],
      unescoSitesCount: 42, famousLandmarks: ["Taj Mahal", "Red Fort Delhi", "Varanasi Ghats", "Qutub Minar", "Ajanta & Ellora Caves"],
      interestingFacts: ["Most populous country in the world, with over 1.44 billion people.", "Birthplace of four major world religions: Hinduism, Buddhism, Jainism, and Sikhism.", "First nation to reach Mars orbit on its maiden attempt (Mangalyaan) and first to land near the lunar South Pole (Chandrayaan-3)."]
    }
  },
  "826": { // United Kingdom
    code: "GB", code3: "GBR", name: "United Kingdom", officialName: "United Kingdom of Great Britain and Northern Ireland", nativeName: "United Kingdom", flag: "🇬🇧",
    continent: "Europe", subregion: "Northern Europe", capital: "London", largestCity: "London", coordinates: [-3.4359, 55.3781],
    longevity: {
      foundationYear: 927,
      foundationEvent: "Unification of the Kingdom of England under King Athelstan",
      sovereignEra: "Constitutional Monarchy (1707 Act of Union)",
      yearsAlive: 2026 - 927, // 1099 years since Kingdom of England unification (or 319 since 1707 Acts of Union)
      historicalContinuityNotes: "King Athelstan unified Anglo-Saxon kingdoms in 927 CE; Kingdom of Great Britain formed under Acts of Union 1707; United Kingdom established 1801. Uninterrupted constitutional continuity with the Magna Carta (1215) and Bill of Rights (1689).",
      constitutionYear: 1689,
      ancientOrigin: "Celtic Britons, Roman Britannia, Anglo-Saxon Heptarchy."
    },
    military: {
      globalRank: 6, powerIndex: 0.1443, tier: "Great Power",
      defenseBudgetUSD: 68.5, defenseBudgetPercentGDP: 2.3,
      activePersonnel: 184860, reservePersonnel: 74800, paramilitary: 0,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 225,
      totalAircraft: 664, combatAircraft: 119, attackHelicopters: 33,
      tanks: 213, armoredVehicles: 27203,
      navalFleetTotal: 117, aircraftCarriers: 2, submarines: 10, destroyersFrigates: 18,
      alliances: ["NATO (Founding)", "AUKUS", "Five Eyes", "Five Power Defence Arrangements (FPDA)", "JEF"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 242495, areaSqMi: 93628, coastlineKm: 12429,
      highestPoint: { name: "Ben Nevis (Grampians)", elevationM: 1345 },
      lowestPoint: { name: "The Fens", elevationM: -4 },
      climate: "Temperate maritime; influenced by southwest winds over the North Atlantic Current; cool and damp",
      terrain: "Mostly rugged hills and low mountains; level to rolling plains in east and southeast",
      borders: ["Ireland"]
    },
    demographics: { population: 68265209, densityPerKm2: 281, urbanPercentage: 84.4, medianAge: 40.7, lifeExpectancy: 81.8 },
    economy: {
      gdpNominalUSD: 3495.0, gdpPerCapitaUSD: 51070, currencyName: "Pound Sterling", currencyCode: "GBP", currencySymbol: "£",
      majorIndustries: ["Financial & Legal Services", "Aerospace & Automotive", "Pharmaceuticals", "Information Technology", "Creative Industries", "Education"],
      mainExports: ["Financial Services", "Cars & Automotive", "Gas Turbines & Aerospace", "Pharmaceuticals", "Crude Petroleum", "Whisky"]
    },
    governance: { governmentType: "Unitary Parliamentary Constitutional Monarchy", headOfState: "Monarch (King Charles III)", headOfGovernment: "Prime Minister", unMemberSince: 1945, nationalDay: "Official Birthday of the Monarch (June)", nationalMotto: "Dieu et mon droit (God and my right)" },
    culture: {
      officialLanguages: ["English"], majorReligions: ["Christianity (46%)", "No religion (37%)", "Islam (6.7%)", "Hinduism (1.8%)"],
      unescoSitesCount: 35, famousLandmarks: ["Big Ben & Parliament", "Stonehenge", "Tower of London", "Edinburgh Castle", "Giant's Causeway"],
      interestingFacts: ["Birthplace of the Industrial Revolution, the English language, and the modern parliamentary system.", "Operates two Queen Elizabeth-class 65,000-tonne aircraft carriers.", "Home to Oxford University, founded c. 1096, older than the Aztec Empire."]
    }
  },
  "250": { // France
    code: "FR", code3: "FRA", name: "France", officialName: "French Republic", nativeName: "République française", flag: "🇫🇷",
    continent: "Europe", subregion: "Western Europe", capital: "Paris", largestCity: "Paris", coordinates: [2.2137, 46.2276],
    longevity: {
      foundationYear: 843,
      foundationEvent: "Treaty of Verdun establishing West Francia",
      sovereignEra: "Fifth Republic (established 1958)",
      yearsAlive: 2026 - 843, // 1183 years
      historicalContinuityNotes: "Treaty of Verdun divided the Carolingian Empire in 843 CE, creating West Francia, the direct ancestor of modern France. Capetian dynasty consolidated the realm from 987 CE. Continuous sovereign nation for over 1,180 years.",
      constitutionYear: 1958,
      ancientOrigin: "Gaulish tribes and Clovis I (Kingdom of the Franks, 481 CE)."
    },
    military: {
      globalRank: 11, powerIndex: 0.1878, tier: "Great Power",
      defenseBudgetUSD: 50.0, defenseBudgetPercentGDP: 2.1,
      activePersonnel: 205000, reservePersonnel: 35000, paramilitary: 145000,
      nuclearStatus: "Declared Nuclear State", nuclearWarheads: 290,
      totalAircraft: 972, combatAircraft: 224, attackHelicopters: 69,
      tanks: 222, armoredVehicles: 85000,
      navalFleetTotal: 128, aircraftCarriers: 1, submarines: 10, destroyersFrigates: 21,
      alliances: ["NATO (Founding)", "European Union PESCO", "Lancaster House Treaties"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 643801, areaSqMi: 248573, coastlineKm: 4853,
      highestPoint: { name: "Mont Blanc (Alps)", elevationM: 4809 },
      lowestPoint: { name: "Rhône River Delta", elevationM: -2 },
      climate: "Mostly cool winters and mild summers, but mild winters and hot summers along the Mediterranean",
      terrain: "Mostly flat plains or gently rolling hills in north and west; remainder is mountainous, especially Pyrenees in south and Alps in east",
      borders: ["Germany", "Spain", "Belgium", "Switzerland", "Italy", "Luxembourg", "Monaco", "Andorra", "Brazil (via French Guiana)", "Suriname"]
    },
    demographics: { population: 68373433, densityPerKm2: 106, urbanPercentage: 81.5, medianAge: 42.1, lifeExpectancy: 83.1 },
    economy: {
      gdpNominalUSD: 3130.0, gdpPerCapitaUSD: 46310, currencyName: "Euro", currencyCode: "EUR", currencySymbol: "€",
      majorIndustries: ["Aerospace (Airbus)", "Luxury Goods (LVMH)", "Automotive", "Nuclear Power Tech", "Tourism & Gastronomy", "Pharmaceuticals"],
      mainExports: ["Aircraft & Spacecraft", "Packaged Medicaments", "Cars & Motor Vehicle Parts", "Wine & Champagne", "Perfumes & Cosmetics"]
    },
    governance: { governmentType: "Unitary Semi-Presidential Constitutional Republic", headOfState: "President", headOfGovernment: "Prime Minister", unMemberSince: 1945, nationalDay: "July 14 (Bastille Day)", nationalMotto: "Liberté, égalité, fraternité" },
    culture: {
      officialLanguages: ["French"], majorReligions: ["Christianity (50%)", "No religion (39%)", "Islam (8%)", "Judaism (1%)"],
      unescoSitesCount: 52, famousLandmarks: ["Eiffel Tower", "Louvre Museum", "Palace of Versailles", "Mont Saint-Michel", "Notre-Dame de Paris"],
      interestingFacts: ["Most visited country in the world with over 100 million international tourists annually.", "Operates the nuclear-powered aircraft carrier Charles de Gaulle and maintains independent nuclear deterrence.", "Spans 12 different time zones across its global overseas departments and territories, more than any other nation."]
    }
  },
  "392": { // Japan
    code: "JP", code3: "JPN", name: "Japan", officialName: "State of Japan (Nippon-koku)", nativeName: "日本国 (Nippon-koku)", flag: "🇯🇵",
    continent: "Asia", subregion: "Eastern Asia", capital: "Tokyo", largestCity: "Tokyo", coordinates: [138.2529, 36.2048],
    longevity: {
      foundationYear: -660,
      foundationEvent: "Ascension of Emperor Jimmu / Yamato Imperial Court (historical c. 300 CE)",
      sovereignEra: "Constitutional Monarchy (continuous unbroken imperial line)",
      yearsAlive: 2026 - (-660), // 2686 years mythical / ~1700 years historical
      historicalContinuityNotes: "According to Nihon Shoki, founded on Feb 11, 660 BCE by Emperor Jimmu. Historically documented centralized rule began in the Yamato period (c. 300 CE). The Imperial House of Japan is the world's oldest continuous hereditary monarchy in existence.",
      constitutionYear: 1947,
      ancientOrigin: "Jomon culture (~14,000 BCE) and Yayoi culture (~300 BCE)."
    },
    military: {
      globalRank: 7, powerIndex: 0.1601, tier: "Great Power",
      defenseBudgetUSD: 53.0, defenseBudgetPercentGDP: 1.6,
      activePersonnel: 247150, reservePersonnel: 56000, paramilitary: 14000,
      nuclearStatus: "Non-Nuclear State", nuclearWarheads: 0,
      totalAircraft: 1459, combatAircraft: 278, attackHelicopters: 119,
      tanks: 1004, armoredVehicles: 33400,
      navalFleetTotal: 155, aircraftCarriers: 4, submarines: 22, destroyersFrigates: 50,
      alliances: ["US-Japan Security Treaty", "Quad", "Major Non-NATO Ally"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 377975, areaSqMi: 145937, coastlineKm: 29751,
      highestPoint: { name: "Mount Fuji", elevationM: 3776 },
      lowestPoint: { name: "Hachiro-gata", elevationM: -4 },
      climate: "Varies from tropical in south to cool temperate in north",
      terrain: "Mostly rugged and mountainous archipelago of 14,125 islands",
      borders: []
    },
    demographics: { population: 123970000, densityPerKm2: 338, urbanPercentage: 92.0, medianAge: 49.1, lifeExpectancy: 84.8 },
    economy: {
      gdpNominalUSD: 4110.0, gdpPerCapitaUSD: 33140, currencyName: "Japanese Yen", currencyCode: "JPY", currencySymbol: "¥",
      majorIndustries: ["Automotive & Robotics", "Precision Electronics", "Semiconductor Machinery", "Steel & Shipbuilding", "Chemicals", "Gaming & Anime"],
      mainExports: ["Motor Vehicles & Parts", "Integrated Circuits", "Machinery & Machine Tools", "Iron & Steel Products", "Scientific Instruments"]
    },
    governance: { governmentType: "Unitary Parliamentary Constitutional Monarchy", headOfState: "Emperor (Naruhito)", headOfGovernment: "Prime Minister", unMemberSince: 1956, nationalDay: "February 11 (National Foundation Day)", nationalMotto: "Peace and Harmony (和)" },
    culture: {
      officialLanguages: ["Japanese"], majorReligions: ["Shintoism & Buddhism (84%)", "Christianity (1.5%)", "Other / Secular (14%)"],
      unescoSitesCount: 25, famousLandmarks: ["Mount Fuji", "Fushimi Inari-taisha Shrine", "Kinkaku-ji (Golden Pavilion)", "Hiroshima Peace Memorial", "Tokyo Skytree"],
      interestingFacts: ["Oldest continuous hereditary monarchy in human history with an unbroken lineage of 126 emperors.", "Possesses the world's longest life expectancy (nearly 85 years).", "Has two of the world's most advanced helicopter destroyers (Izumo & Kaga) converted to operate F-35B stealth stealth fighters."]
    }
  },
  "276": { // Germany
    code: "DE", code3: "DEU", name: "Germany", officialName: "Federal Republic of Germany", nativeName: "Bundesrepublik Deutschland", flag: "🇩🇪",
    continent: "Europe", subregion: "Western Europe", capital: "Berlin", largestCity: "Berlin", coordinates: [10.4515, 51.1657],
    longevity: {
      foundationYear: 843,
      foundationEvent: "Treaty of Verdun (East Francia) / German Empire Unification 1871",
      sovereignEra: "Federal Republic (Basic Law 1949 / Reunification 1990)",
      yearsAlive: 2026 - 1871, // 155 years modern nation state (or 1183 years since East Francia 843)
      historicalContinuityNotes: "East Francia established 843 CE; Holy Roman Empire of the German Nation lasted from 962 to 1806. Modern unified nation state founded January 18, 1871 under Otto von Bismarck; reunified October 3, 1990.",
      constitutionYear: 1949,
      ancientOrigin: "Germanic tribes during the Roman Empire (Germania Magna)."
    },
    military: {
      globalRank: 19, powerIndex: 0.2847, tier: "Regional Power",
      defenseBudgetUSD: 66.8, defenseBudgetPercentGDP: 2.1,
      activePersonnel: 181500, reservePersonnel: 34000, paramilitary: 0,
      nuclearStatus: "Nuclear Sharing / NATO", nuclearWarheads: 20, // US B61 bombs hosted
      totalAircraft: 618, combatAircraft: 133, attackHelicopters: 55,
      tanks: 295, armoredVehicles: 69400,
      navalFleetTotal: 80, aircraftCarriers: 0, submarines: 6, destroyersFrigates: 12,
      alliances: ["NATO (Founding Member)", "European Union", "G7"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 357592, areaSqMi: 138067, coastlineKm: 2389,
      highestPoint: { name: "Zugspitze (Bavarian Alps)", elevationM: 2962 },
      lowestPoint: { name: "Neuendorf-Sachsenbande", elevationM: -3.5 },
      climate: "Temperate and marine; cool, cloudy, wet winters and summers",
      terrain: "Lowlands in north, uplands in center, Bavarian Alps in south",
      borders: ["Denmark", "Poland", "Czechia", "Austria", "Switzerland", "France", "Luxembourg", "Belgium", "Netherlands"]
    },
    demographics: { population: 84482000, densityPerKm2: 236, urbanPercentage: 77.5, medianAge: 46.8, lifeExpectancy: 81.0 },
    economy: {
      gdpNominalUSD: 4590.0, gdpPerCapitaUSD: 54290, currencyName: "Euro", currencyCode: "EUR", currencySymbol: "€",
      majorIndustries: ["Automotive Engineering", "Industrial Machinery & Automation", "Chemicals & Pharmaceuticals", "Renewable Energy Tech", "Optics & Precision Tools"],
      mainExports: ["Cars & Vehicle Parts", "Packaged Medicaments", "Industrial Machinery", "Chemical Products", "Electrical Equipment"]
    },
    governance: { governmentType: "Federal Parliamentary Constitutional Republic", headOfState: "President", headOfGovernment: "Federal Chancellor", unMemberSince: 1973, nationalDay: "October 3 (German Unity Day)", nationalMotto: "Einigkeit und Recht und Freiheit (Unity and Justice and Freedom)" },
    culture: {
      officialLanguages: ["German"], majorReligions: ["Christianity (52%)", "No religion (42%)", "Islam (5.5%)"],
      unescoSitesCount: 54, famousLandmarks: ["Brandenburg Gate", "Neuschwanstein Castle", "Cologne Cathedral", "Black Forest", "Elbphilharmonie Hamburg"],
      interestingFacts: ["Europe's largest economy and the third-largest economy in the world by nominal GDP.", "Renowned for its engineering prowess and the manufacturer of the world's most widely deployed Western MBT, the Leopard 2.", "Home to the world's oldest operating brewery, Weihenstephan, founded in 1040 CE."]
    }
  },
  "674": { // San Marino
    code: "SM", code3: "SMR", name: "San Marino", officialName: "Republic of San Marino", nativeName: "Repubblica di San Marino", flag: "🇸🇲",
    continent: "Europe", subregion: "Southern Europe", capital: "City of San Marino", largestCity: "Dogana", coordinates: [12.4578, 43.9424],
    longevity: {
      foundationYear: 301,
      foundationEvent: "Founded by Saint Marinus on Mount Titano (September 3, 301 CE)",
      sovereignEra: "Continuous Constitutional Republic",
      yearsAlive: 2026 - 301, // 1725 years
      historicalContinuityNotes: "Recognized as the world's oldest surviving sovereign state and oldest constitutional republic. Has maintained continuous independence and republican institutions since September 3, 301 CE without conquest or interruption.",
      constitutionYear: 1600,
      ancientOrigin: "Founded as a monastic Christian sanctuary fleeing Diocletian persecution."
    },
    military: {
      globalRank: 145, powerIndex: 9.9999, tier: "Minimal / Neutral",
      defenseBudgetUSD: 0.015, defenseBudgetPercentGDP: 0.8,
      activePersonnel: 80, reservePersonnel: 700, paramilitary: 100,
      nuclearStatus: "Non-Nuclear State", nuclearWarheads: 0,
      totalAircraft: 0, combatAircraft: 0, attackHelicopters: 0,
      tanks: 0, armoredVehicles: 0,
      navalFleetTotal: 0, aircraftCarriers: 0, submarines: 0, destroyersFrigates: 0,
      alliances: ["Defense Treaty with Italy", "Neutrality Doctrine"],
      conscription: "Voluntary"
    },
    geography: {
      areaKm2: 61.2, areaSqMi: 23.6, coastlineKm: 0,
      highestPoint: { name: "Monte Titano", elevationM: 739 },
      lowestPoint: { name: "Ausa River", elevationM: 55 },
      climate: "Mediterranean with mild to cool winters and warm summers",
      terrain: "Rugged mountains dominated by the limestone crags of Mount Titano",
      borders: ["Italy"]
    },
    demographics: { population: 33642, densityPerKm2: 550, urbanPercentage: 97.2, medianAge: 45.2, lifeExpectancy: 86.5 },
    economy: {
      gdpNominalUSD: 1.85, gdpPerCapitaUSD: 54980, currencyName: "Euro", currencyCode: "EUR", currencySymbol: "€",
      majorIndustries: ["Tourism", "Banking & Finance", "Ceramics & Building Materials", "Wine & Agriculture", "Philatelic & Numismatics"],
      mainExports: ["Washing Machines & Appliances", "Packaged Medicaments", "Wine", "Ceramic Tiles", "Woodworking Equipment"]
    },
    governance: { governmentType: "Unitary Parliamentary Directorial Republic", headOfState: "Captains Regent (2 Co-Heads)", headOfGovernment: "Captains Regent", unMemberSince: 1992, nationalDay: "September 3 (Feast of Saint Marinus)", nationalMotto: "Libertas (Liberty)" },
    culture: {
      officialLanguages: ["Italian"], majorReligions: ["Roman Catholicism (97%)"],
      unescoSitesCount: 1, famousLandmarks: ["Three Towers of San Marino (Guaita, Cesta, Montale)", "Palazzo Pubblico", "Basilica di San Marino"],
      interestingFacts: ["Oldest sovereign state in the world, alive continuously for over 1,725 years.", "World's only nation where executive power is held by two Captains Regent elected every six months.", "Has one of the highest GDPs per capita and lowest unemployment rates in Europe."]
    }
  }
};

console.log('Writing countries data generator...');
fs.writeFileSync(path.join(__dirname, 'major_data.json'), JSON.stringify(majorCountries, null, 2));
console.log('Saved major countries metadata.');
