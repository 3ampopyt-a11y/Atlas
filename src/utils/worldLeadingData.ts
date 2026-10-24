import { SHARED_ISO_ENTRIES } from './allianceData.ts';

export interface WorldLeadingRecord {
  title: string;
  metricOrValue: string;
  category:
    | 'sports'
    | 'economy'
    | 'geography'
    | 'culture'
    | 'science'
    | 'nature'
    | 'history'
    | 'military'
    | 'food';
  icon: string;
  badge: string;
  description: string;
}

export interface CountryLeadingProfile {
  countryCode: string; // ISO-2 (e.g. "BR")
  countryId?: string; // ISO-3166-1 numeric (e.g. "076")
  countryName: string;
  leadBanner: string;
  records: WorldLeadingRecord[];
}

export const WORLD_LEADING_PROFILES: CountryLeadingProfile[] = [
  // ==========================================
  // BRAZIL
  // ==========================================
  {
    countryCode: 'BR',
    countryId: '076',
    countryName: 'Brazil',
    leadBanner: 'Undisputed 5-Time FIFA World Cup Champions & Earth’s #1 Biodiversity Capital',
    records: [
      {
        title: 'Most FIFA World Cups in History',
        metricOrValue: '5 World Cup Titles (1958, 1962, 1970, 1994, 2002)',
        category: 'sports',
        icon: '🏆',
        badge: 'All-Time World Record',
        description:
          'Brazil is the only nation to win 5 FIFA World Cups and the only country to qualify for every single World Cup tournament in history, producing football legends Pelé, Garrincha, Ronaldo, and Ronaldinho.',
      },
      {
        title: 'World’s #1 Coffee Producer & Exporter',
        metricOrValue: '~38% of Global Coffee Supply (60M+ bags/year)',
        category: 'food',
        icon: '☕',
        badge: 'Global #1 for 150+ Years',
        description:
          'Brazil has reigned as the world’s foremost coffee producing superpower uninterrupted since the 1840s, providing more than a third of all coffee beans consumed worldwide.',
      },
      {
        title: 'Earth’s Greatest Biological Diversity',
        metricOrValue: '#1 in Plant & Animal Species on the Planet',
        category: 'nature',
        icon: '🌿',
        badge: 'World #1 Biodiversity',
        description:
          'Contains 60% of the Amazon Rainforest, holding an estimated 10% of all known species on Earth, including the planet’s richest variety of freshwater fish, primates, and flora.',
      },
      {
        title: 'Largest River on Earth by Water Discharge',
        metricOrValue: 'Amazon River: ~209,000 m³/s (20% of Earth’s River Flow)',
        category: 'geography',
        icon: '🌊',
        badge: 'Largest River on Earth',
        description:
          'The Amazon River releases more water into the Atlantic Ocean than the next seven largest rivers combined, with a drainage basin covering over 7 million square kilometers.',
      },
    ],
  },

  // ==========================================
  // UNITED STATES
  // ==========================================
  {
    countryCode: 'US',
    countryId: '840',
    countryName: 'United States',
    leadBanner: 'All-Time Olympic Superpower, World’s Largest Economy & Aerospace Pioneer',
    records: [
      {
        title: 'Most Olympic Medals in Human History',
        metricOrValue: '2,975+ Total Medals (1,170+ Golds)',
        category: 'sports',
        icon: '🥇',
        badge: 'All-Time Olympic Record #1',
        description:
          'The United States leads the all-time Olympic medal table by an enormous margin, winning nearly double the medals of any other sovereign nation across track & field, swimming, basketball, and gymnastics.',
      },
      {
        title: 'World’s Largest Economy (Nominal GDP)',
        metricOrValue: '$28+ Trillion (~25% of Gross World Product)',
        category: 'economy',
        icon: '💰',
        badge: 'Global #1 Economy',
        description:
          'The United States is the wealthiest economy on Earth, driving world technological innovation, venture capital, dollar reserve currency hegemony, and top multinational corporations.',
      },
      {
        title: 'Preeminent Global Military Superpower',
        metricOrValue: '$886 Billion Budget & 11 Nuclear Supercarrier Strike Groups',
        category: 'military',
        icon: '🦅',
        badge: 'Global Firepower Rank #1',
        description:
          'Spends more on national defense than the next nine countries combined, operating global stealth air fleets (B-2, F-22, F-35) and forward bases across every continent.',
      },
      {
        title: 'Only Nation to Land Humans on the Moon',
        metricOrValue: '12 Astronauts on Lunar Surface (Apollo 11–17)',
        category: 'science',
        icon: '🚀',
        badge: 'Historic Space Milestone',
        description:
          'Between 1969 and 1972, NASA astronauts Neil Armstrong, Buzz Aldrin, and 10 others walked on the lunar surface, cementing American leadership in interplanetary exploration.',
      },
    ],
  },

  // ==========================================
  // ARGENTINA
  // ==========================================
  {
    countryCode: 'AR',
    countryId: '032',
    countryName: 'Argentina',
    leadBanner: '3-Time World Cup Champions, 8 Ballon d’Ors & World Capital of Open-Flame Asado',
    records: [
      {
        title: 'Most Ballon d’Or Awards Won by a Single Nation’s Player',
        metricOrValue: 'Lionel Messi: 8 Ballon d’Or Trophies (World Record)',
        category: 'sports',
        icon: '⚽',
        badge: 'Undisputed GOAT Record',
        description:
          'Lionel Messi has won an unprecedented 8 Ballon d’Or awards, leading Argentina to their 3rd FIFA World Cup in 2022 following Diego Maradona (1986) and Mario Kempes (1978).',
      },
      {
        title: 'Highest Beef Consumption per Capita & Asado Mastery',
        metricOrValue: '~50 kg of Beef Consumed per Person Annually',
        category: 'food',
        icon: '🥩',
        badge: 'World Capital of Asado',
        description:
          'Argentina’s pasture-raised grass-fed Pampas beef is celebrated globally as the gold standard of open-flame wood and charcoal grilling, accompanied by chimichurri.',
      },
      {
        title: 'Highest Mountain Peak in Western & Southern Hemispheres',
        metricOrValue: 'Mount Aconcagua: 6,961 meters (22,838 ft)',
        category: 'geography',
        icon: '🏔️',
        badge: 'Roof of the Americas',
        description:
          'Aconcagua is the highest mountain outside of the Himalayas and the highest summit in both the Western and Southern Hemispheres.',
      },
      {
        title: 'World’s Southernmost City',
        metricOrValue: 'Ushuaia, Tierra del Fuego (“End of the World”)',
        category: 'geography',
        icon: '🧭',
        badge: 'Fin del Mundo',
        description:
          'Ushuaia is recognized internationally as the southernmost city on Earth and the primary maritime gateway for scientific expeditions to Antarctica.',
      },
    ],
  },

  // ==========================================
  // ITALY
  // ==========================================
  {
    countryCode: 'IT',
    countryId: '380',
    countryName: 'Italy',
    leadBanner: 'World #1 in UNESCO World Heritage Sites & Universally Celebrated Cuisine',
    records: [
      {
        title: 'Most UNESCO World Heritage Sites in the World',
        metricOrValue: '60 Certified UNESCO World Heritage Sites',
        category: 'culture',
        icon: '🏛️',
        badge: 'World Rank #1 Heritage',
        description:
          'Italy possesses more UNESCO World Heritage cultural, architectural, and natural monuments than any other nation on Earth, from the Colosseum and Pompeii to Venice and Florence.',
      },
      {
        title: 'Considered #1 Best Cuisine on Earth',
        metricOrValue: 'Voted #1 Global Cuisine Year-After-Year',
        category: 'food',
        icon: '🍕',
        badge: 'TasteAtlas World Rank #1',
        description:
          'Revered universally for pizza napoletana, pasta carbonara, parmigiano-reggiano, balsamic vinegar of Modena, gelato, and high-pressure espresso extraction.',
      },
      {
        title: 'Most Formula 1 Constructors’ Championships',
        metricOrValue: 'Scuderia Ferrari: 16 World Titles & 240+ Grand Prix Wins',
        category: 'sports',
        icon: '🏎️',
        badge: 'All-Time F1 World Leader',
        description:
          'Scuderia Ferrari (Maranello) is the oldest, most successful, and most iconic racing team in Formula 1 history, holding the all-time records for titles, wins, and podiums.',
      },
      {
        title: '4-Time FIFA World Cup Champions',
        metricOrValue: '4 World Cup Titles (1934, 1938, 1982, 2006)',
        category: 'sports',
        icon: '🏆',
        badge: 'European Joint Record',
        description:
          'The Azzurri are tied with Germany for the most FIFA World Cups won by any European nation, famous for tactical masterclasses and legendary defending.',
      },
    ],
  },

  // ==========================================
  // FRANCE
  // ==========================================
  {
    countryCode: 'FR',
    countryId: '250',
    countryName: 'France',
    leadBanner: 'World’s Most Visited Nation, Capital of Haute Cuisine & Most Time Zones',
    records: [
      {
        title: 'Most Visited Country on Earth',
        metricOrValue: '100+ Million International Tourist Arrivals Annually',
        category: 'culture',
        icon: '✈️',
        badge: 'World Rank #1 Tourism',
        description:
          'France has held the crown as the most visited nation on the planet for decades, drawing over 100 million visitors every year to Paris, the Riviera, the Loire Valley, and the Alps.',
      },
      {
        title: 'Most Time Zones of Any Nation on Earth',
        metricOrValue: '12 Distinct Time Zones (Mainland & Overseas Territories)',
        category: 'geography',
        icon: '🌐',
        badge: 'World Record Time Zones',
        description:
          'Due to its overseas departments spanning French Polynesia, Guadeloupe, Réunion, and New Caledonia, the sun never sets on French territory.',
      },
      {
        title: 'World Capital of Haute Cuisine & Fine Dining',
        metricOrValue: 'Invented the Michelin Guide, Brigade System & Classical Mother Sauces',
        category: 'food',
        icon: '🥐',
        badge: 'UNESCO Gastronomic Heritage',
        description:
          'Created the foundational techniques of Western gastronomy, the strict Michelin 3-star rating system, and legendary protected terroir (Champagne, Bordeaux, Burgundy).',
      },
      {
        title: 'Most Tour de France Cycling Victories',
        metricOrValue: '36 Overall Tour de France Championships',
        category: 'sports',
        icon: '🚴',
        badge: 'Cycling All-Time Leader',
        description:
          'French riders lead the historical classification of the Tour de France—the world’s most grueling and prestigious multi-stage bicycle race, inaugurated in 1903.',
      },
      {
        title: '2-Time FIFA World Cup Champions',
        metricOrValue: '2 World Cup Titles (1998, 2018) & 4 Total World Cup Finals',
        category: 'sports',
        icon: '🏆',
        badge: 'Global Football Powerhouse',
        description:
          'France is one of only six nations in football history with multiple World Cup triumphs, reaching three finals in the 21st century (2006, 2018, 2022).',
      },
    ],
  },

  // ==========================================
  // GERMANY
  // ==========================================
  {
    countryCode: 'DE',
    countryId: '276',
    countryName: 'Germany',
    leadBanner: 'Europe’s #1 Economic Powerhouse, 4 World Cups & Master of Bread Diversity',
    records: [
      {
        title: 'Most Registered Bread Varieties on Earth',
        metricOrValue: 'Over 3,200 Certified Artisanal Bread Types (UNESCO Listed)',
        category: 'food',
        icon: '🥨',
        badge: 'World Bread Capital',
        description:
          'Germany holds the Guinness World Record for the greatest variety of artisanal breads, including hearty sourdoughs, whole grain pumpernickel, and soft pretzels.',
      },
      {
        title: 'Europe’s Largest National Economy',
        metricOrValue: '$4.5+ Trillion GDP (#3 Largest in the World)',
        category: 'economy',
        icon: '🏭',
        badge: 'Europe’s Economic Engine',
        description:
          'Germany is the premier industrial exporter of high-precision engineering, automobiles (Mercedes, BMW, Porsche, Audi), and green machinery across the globe.',
      },
      {
        title: '4-Time FIFA World Cup Champions',
        metricOrValue: '4 World Cup Titles (1954, 1974, 1990, 2014) & 8 Final Appearances',
        category: 'sports',
        icon: '⚽',
        badge: 'Most World Cup Finals (8)',
        description:
          'Die Mannschaft has reached an all-time record 8 World Cup finals, lifting the trophy four times and scoring the most total goals in World Cup tournament history.',
      },
      {
        title: 'World’s Largest Folk & Beer Festival',
        metricOrValue: 'Oktoberfest Munich: 6+ Million Visitors & 7.5M Liters of Beer',
        category: 'culture',
        icon: '🍺',
        badge: 'World’s Biggest Volksfest',
        description:
          'Held since 1810, Munich’s Oktoberfest is the largest public festival in the world, governed by the 500-year-old Bavarian Reinheitsgebot beer purity law.',
      },
    ],
  },

  // ==========================================
  // CHINA
  // ==========================================
  {
    countryCode: 'CN',
    countryId: '156',
    countryName: 'China',
    leadBanner: 'World’s Longest High-Speed Rail, Manufacturing Titan & 4,000-Year History',
    records: [
      {
        title: 'World’s Longest High-Speed Rail Network',
        metricOrValue: '45,000+ km of High-Speed Rail (>70% of World Total)',
        category: 'science',
        icon: '🚄',
        badge: 'Global #1 Rail Network',
        description:
          'China operates more high-speed railway track than the rest of the world combined, connecting megacities at speeds of 350 km/h with the indigenous Fuxing bullet trains.',
      },
      {
        title: 'World’s Largest Human-Made Defensive Monument',
        metricOrValue: 'Great Wall of China: 21,196 kilometers in Total Length',
        category: 'history',
        icon: '🧱',
        badge: 'Wonder of the World',
        description:
          'Built across successive imperial dynasties starting in the 7th century BCE, the Great Wall represents the largest architectural fortification project in human history.',
      },
      {
        title: 'World’s #1 Manufacturing Powerhouse',
        metricOrValue: 'Produces ~28.7% of All Global Manufactured Output',
        category: 'economy',
        icon: '⚙️',
        badge: 'Factory of the World',
        description:
          'Leads the world in electronics, green solar panels, electric vehicle battery manufacturing, steel, high-capacity cranes, and industrial robotics.',
      },
      {
        title: 'World’s Largest Active Standing Military Force',
        metricOrValue: '2,035,000 Active Personnel & Largest Naval Fleet by Hull Count',
        category: 'military',
        icon: '🐉',
        badge: 'Largest Standing Army',
        description:
          'The People’s Liberation Army maintains the world’s largest standing military force and the world’s largest naval battle fleet by total active ship hulls.',
      },
    ],
  },

  // ==========================================
  // INDIA
  // ==========================================
  {
    countryCode: 'IN',
    countryId: '356',
    countryName: 'India',
    leadBanner: 'World’s Most Populous Nation, Spice Superpower & Cricket Colossus',
    records: [
      {
        title: 'World’s Most Populous Sovereign Nation',
        metricOrValue: '1.43+ Billion People (Largest Democracy on Earth)',
        category: 'geography',
        icon: '👥',
        badge: 'World Rank #1 Population',
        description:
          'Home to one-sixth of all human beings alive today, India conducts the largest democratic general election in history with over 900 million registered voters.',
      },
      {
        title: 'World’s #1 Producer & Exporter of Spices',
        metricOrValue: 'Produces >70% of All Spices Cultivated on Earth',
        category: 'food',
        icon: '🌶️',
        badge: 'World Spice Capital',
        description:
          'India is the ancient and modern epicenter of the global spice trade, cultivating cardamom, black pepper, turmeric, cumin, ginger, and saffron.',
      },
      {
        title: 'World’s Largest Milk Producer',
        metricOrValue: 'Produces ~24% of the Total Global Milk Supply',
        category: 'economy',
        icon: '🥛',
        badge: 'Global Dairy Leader',
        description:
          'Through the White Revolution (Operation Flood), India built the largest rural dairy cooperative model in history, producing over 220 million tonnes of milk annually.',
      },
      {
        title: 'World’s Largest Cricket Market & IPL Giant',
        metricOrValue: 'Indian Premier League (IPL): $10B+ Valuation & 500M+ Viewers',
        category: 'sports',
        icon: '🏏',
        badge: 'Global Cricket Capital',
        description:
          'India is the commercial and emotional heartbeat of world cricket, winning 2 ICC Cricket World Cups and operating the IPL, one of the most lucrative sports leagues on Earth.',
      },
    ],
  },

  // ==========================================
  // JAPAN
  // ==========================================
  {
    countryCode: 'JP',
    countryId: '392',
    countryName: 'Japan',
    leadBanner: 'Oldest Unbroken Monarchy, Most Michelin 3-Stars & Highest Life Expectancy',
    records: [
      {
        title: 'Oldest Continuous Hereditary Monarchy on Earth',
        metricOrValue: '126 Unbroken Imperial Generations Since 660 BCE (2,685 Years)',
        category: 'history',
        icon: '⛩️',
        badge: 'Guinness World Record',
        description:
          'The Chrysanthemum Throne has reigned without a single dynastic replacement since Emperor Jimmu, making it the oldest continuous hereditary monarchy in human history.',
      },
      {
        title: 'City with the Most 3-Star Michelin Restaurants on Earth',
        metricOrValue: 'Tokyo: 12 Three-Star Establishments (More than Paris & NYC combined)',
        category: 'food',
        icon: '🍣',
        badge: 'World Culinary Capital',
        description:
          'Japanese shokunin masters dedicate lifetimes to perfecting Edomae sushi, kaiseki, tempura, and yakitori, making Tokyo the most decorated gourmet city on the planet.',
      },
      {
        title: 'Highest Life Expectancy Among Major Nations',
        metricOrValue: '84.8 Years Average Life Expectancy & 90,000+ Centenarians',
        category: 'nature',
        icon: '⏳',
        badge: 'World Longevity Leader',
        description:
          'Driven by nutrient-rich seafood, fermented miso, green tea, universal healthcare, and active walking culture, Japan boasts the world’s longest healthy lifespans.',
      },
      {
        title: 'World’s Most Punctual High-Speed Rail Network',
        metricOrValue: 'Shinkansen Bullet Train Average Delay Under 1 Minute',
        category: 'science',
        icon: '🚅',
        badge: 'Zero Fatal Collisions in 60 Years',
        description:
          'Since opening in 1964, the Tokaido Shinkansen has carried over 10 billion passengers at 300 km/h with zero passenger fatalities due to train accidents.',
      },
    ],
  },

  // ==========================================
  // CANADA
  // ==========================================
  {
    countryCode: 'CA',
    countryId: '124',
    countryName: 'Canada',
    leadBanner: 'World’s Longest Coastline, 2 Million Freshwater Lakes & Ice Hockey Empire',
    records: [
      {
        title: 'Longest Ocean Coastline in the World',
        metricOrValue: '243,042 Kilometers (151,019 Miles)',
        category: 'geography',
        icon: '🌊',
        badge: 'World Record Coastline',
        description:
          'Canada borders three oceans (Atlantic, Pacific, Arctic). At a walking pace of 20 km/day, walking Canada’s coastline would take over 33 years.',
      },
      {
        title: 'Most Natural Freshwater Lakes on Earth',
        metricOrValue: 'Over 2 Million Lakes (Holds 20% of Earth’s Surface Freshwater)',
        category: 'nature',
        icon: '🏞️',
        badge: 'Freshwater Superpower',
        description:
          'Canada possesses more lakes than all other countries in the world combined, holding one-fifth of the entire planet’s surface fresh water reserves.',
      },
      {
        title: 'World’s #1 Pure Maple Syrup Producer',
        metricOrValue: 'Produces >70% of the World’s Maple Syrup Supply',
        category: 'food',
        icon: '🍁',
        badge: 'Global Maple Reserve',
        description:
          'Quebec alone accounts for the vast majority of the world’s pure maple syrup harvest, maintaining a strategic global syrup reserve in fortified warehouses.',
      },
      {
        title: 'Most Olympic Gold Medals in Ice Hockey',
        metricOrValue: '14 Olympic Gold Medals (Men’s & Women’s Combined)',
        category: 'sports',
        icon: '🏒',
        badge: 'Ice Hockey Homeland',
        description:
          'The birthplace of modern ice hockey, Canada holds the all-time Olympic record for men’s and women’s gold medals, along with 28 IIHF World Championships.',
      },
    ],
  },

  // ==========================================
  // RUSSIA
  // ==========================================
  {
    countryCode: 'RU',
    countryId: '643',
    countryName: 'Russia',
    leadBanner: 'Largest Landmass on Earth, Most Nuclear Warheads & Vast Siberian Taiga',
    records: [
      {
        title: 'Largest Sovereign Country by Land Area',
        metricOrValue: '17,098,242 km² (Covers 1/8th of Earth’s Inhabited Land)',
        category: 'geography',
        icon: '🌍',
        badge: 'World Rank #1 Area',
        description:
          'Russia spans 11 time zones across Eastern Europe and Northern Asia, covering more surface area than Pluto and bordering 14 sovereign nations.',
      },
      {
        title: 'Most Stockpiled Nuclear Warheads in the World',
        metricOrValue: '5,580 Nuclear Warheads (Largest Nuclear Triad Stockpile)',
        category: 'military',
        icon: '🚀',
        badge: 'SIPRI World Record #1',
        description:
          'Maintains the world’s largest nuclear arsenal, including road-mobile ICBMs, nuclear-powered ballistic missile submarines, and hypersonic glide vehicles.',
      },
      {
        title: 'World’s Largest Contiguous Forest Ecosystem',
        metricOrValue: 'Siberian Taiga: Covers 20% of All Forests on Earth',
        category: 'nature',
        icon: '🌲',
        badge: 'Lungs of the Northern Hemisphere',
        description:
          'The Russian Boreal forest is the largest forested ecosystem on the planet, absorbing billions of tons of carbon dioxide and sheltering the Siberian tiger.',
      },
      {
        title: 'Longest Continuous Railway Line on Earth',
        metricOrValue: 'Trans-Siberian Railway: 9,289 km (Moscow to Vladivostok)',
        category: 'science',
        icon: '🚆',
        badge: 'Longest Rail Line on Earth',
        description:
          'Spanning two continents, 8 time zones, and 87 cities, the Trans-Siberian is the longest unbroken passenger railway journey in human history.',
      },
    ],
  },

  // ==========================================
  // KENYA
  // ==========================================
  {
    countryCode: 'KE',
    countryId: '404',
    countryName: 'Kenya',
    leadBanner: 'Undisputed Marathon & Distance Running Kings of the World',
    records: [
      {
        title: 'Most Marathon & Distance Running World Records',
        metricOrValue: 'Eliud Kipchoge Historic Sub-2-Hour Marathon (1:59:40)',
        category: 'sports',
        icon: '🏃‍♂️',
        badge: 'World Running Capital',
        description:
          'Kenyan athletes, particularly from the high-altitude Great Rift Valley (Iten), dominate world distance running, holding records in the 800m, 1,500m, steeplechase, and marathons.',
      },
      {
        title: 'World’s Greatest Terrestrial Wildlife Migration',
        metricOrValue: 'Masai Mara: Over 1.5 Million Animals Crossing Mara River',
        category: 'nature',
        icon: '🦓',
        badge: 'Natural Wonder of the World',
        description:
          'The annual clockwise migration of wildebeest, zebras, and gazelles across the Serengeti-Mara ecosystem is the most dramatic wildlife spectacle on Earth.',
      },
      {
        title: 'World’s #1 Exporter of Black Cut CTC Tea',
        metricOrValue: 'Exports Over 450,000 Tonnes of Black Tea Annually',
        category: 'food',
        icon: '🍵',
        badge: 'Global Tea Leader',
        description:
          'Kenya’s sun-drenched volcanic soil produces premium black tea that supplies Britain, Egypt, Pakistan, and global tea blends.',
      },
    ],
  },

  // ==========================================
  // JAMAICA
  // ==========================================
  {
    countryCode: 'JM',
    countryId: '388',
    countryName: 'Jamaica',
    leadBanner: 'Fastest Humans in History, Sprint Records & Reggae Cultural Embassy',
    records: [
      {
        title: 'Fastest Human Being in Recorded History',
        metricOrValue: 'Usain Bolt: 100m (9.58s) & 200m (19.19s) World Records',
        category: 'sports',
        icon: '⚡',
        badge: 'Untouchable World Records',
        description:
          'Usain Bolt achieved a peak velocity of 44.72 km/h (27.78 mph) at the 2009 Berlin World Championships, establishing records that remain untouched 15+ years later.',
      },
      {
        title: 'Highest Concentration of Sprint Champions per Capita',
        metricOrValue: 'Olympic Gold Dominance Across Men’s & Women’s 100m/200m/Relays',
        category: 'sports',
        icon: '🥇',
        badge: 'Sprint Capital of the World',
        description:
          'With a population under 3 million, Jamaica has produced Usain Bolt, Shelly-Ann Fraser-Pryce, Elaine Thompson-Herah, and Asafa Powell, sweeping world podiums.',
      },
      {
        title: 'Global Birthplace of Reggae & Sound System Culture',
        metricOrValue: 'UNESCO Intangible Cultural Heritage of Humanity (Bob Marley)',
        category: 'culture',
        icon: '🎵',
        badge: 'Global Musical Monument',
        description:
          'Pioneered Reggae, Ska, Rocksteady, Dub, and Dancehall in Kingston, fundamentally shaping hip-hop, electronic dance music, and international popular music.',
      },
    ],
  },

  // ==========================================
  // NORWAY
  // ==========================================
  {
    countryCode: 'NO',
    countryId: '578',
    countryName: 'Norway',
    leadBanner: 'Most Winter Olympic Medals, $1.7T Sovereign Wealth & EV Leader',
    records: [
      {
        title: 'Most Winter Olympic Medals in History',
        metricOrValue: '405 Total Winter Medals (148 Golds) — All-Time Rank #1',
        category: 'sports',
        icon: '❄️',
        badge: 'Winter Olympic Superpower',
        description:
          'Norway has won more Winter Olympic medals and gold medals than any other nation in history, dominating cross-country skiing, biathlon, speed skating, and ski jumping.',
      },
      {
        title: 'World’s Largest Sovereign Wealth Fund',
        metricOrValue: 'Government Pension Fund Global: Over $1.7 Trillion USD',
        category: 'economy',
        icon: '🏦',
        badge: '~$310,000 Saved Per Citizen',
        description:
          'Invests Norwegian offshore petroleum revenues into over 9,000 public companies across 70 countries, owning approximately 1.5% of all publicly listed equities on Earth.',
      },
      {
        title: 'Highest Electric Vehicle Market Share in the World',
        metricOrValue: '>85% of All New Passenger Vehicles Sold Are Fully Electric',
        category: 'science',
        icon: '⚡',
        badge: 'Global EV Pioneer',
        description:
          'Through forward-looking clean transport policies and 98% domestic hydroelectricity, Norway is the world’s first nation to nearly phase out fossil fuel passenger cars.',
      },
    ],
  },

  // ==========================================
  // SWITZERLAND
  // ==========================================
  {
    countryCode: 'CH',
    countryId: '756',
    countryName: 'Switzerland',
    leadBanner: 'World #1 in Innovation for 14 Years, Highest Wealth & Luxury Horology',
    records: [
      {
        title: '#1 Most Innovative Economy in the World',
        metricOrValue: 'Ranked #1 on Global Innovation Index (WIPO) for 14 Consecutive Years',
        category: 'science',
        icon: '💡',
        badge: 'World Rank #1 Innovation',
        description:
          'Switzerland leads the world in patent filings per capita, pharmaceutical research (Novartis, Roche), scientific institutions (CERN, ETH Zurich), and R&D density.',
      },
      {
        title: 'Highest Average Wealth per Adult on Earth',
        metricOrValue: 'Over $685,000 Mean Wealth per Adult (UBS Global Wealth Report)',
        category: 'economy',
        icon: '💰',
        badge: 'World Rank #1 Wealth',
        description:
          'Swiss citizens maintain the highest median and mean net worth in the world, backed by strong currency stability, precision manufacturing, and financial services.',
      },
      {
        title: 'World Capital of Haute Horlogerie (Luxury Watches)',
        metricOrValue: 'Produces >50% of the World’s Luxury Watches by Value',
        category: 'culture',
        icon: '⌚',
        badge: 'Swiss Made Precision',
        description:
          'The Swiss Jura Valley is the global home of haute horlogerie: Patek Philippe, Rolex, Audemars Piguet, Omega, and Vacheron Constantin.',
      },
      {
        title: 'World’s Longest & Deepest Rail Tunnel',
        metricOrValue: 'Gotthard Base Tunnel: 57.1 km (35.5 miles) Long, 2.3 km Deep',
        category: 'geography',
        icon: '🚇',
        badge: 'Engineering Marvel',
        description:
          'Bored directly beneath the Swiss Alps, it took 17 years to construct and slashed freight and passenger transit times between Northern and Southern Europe.',
      },
    ],
  },

  // ==========================================
  // FINLAND
  // ==========================================
  {
    countryCode: 'FI',
    countryId: '246',
    countryName: 'Finland',
    leadBanner: 'World’s Happiest Country for 7 Years, Sauna Culture & Clean Air',
    records: [
      {
        title: '#1 Happiest Country in the World',
        metricOrValue: 'Ranked #1 on UN World Happiness Report for 7 Consecutive Years',
        category: 'culture',
        icon: '😊',
        badge: 'World Happiness Champion',
        description:
          'Renowned for high institutional trust, free world-class education, low corruption, generous parental leave, beautiful natural forests, and deep societal peace.',
      },
      {
        title: 'Most Saunas per Capita on Earth',
        metricOrValue: 'Over 3.3 Million Saunas for 5.5 Million People (More Saunas than Cars)',
        category: 'culture',
        icon: '🧖',
        badge: 'UNESCO Sauna Culture',
        description:
          'The sauna is an essential ritual of Finnish daily life and mental wellbeing. Finland has enough saunas to accommodate its entire population at the exact same moment.',
      },
      {
        title: 'Highest Coffee Consumption per Capita in the World',
        metricOrValue: '~12 kilograms (26.5 lbs) of Coffee Consumed per Person Annually',
        category: 'food',
        icon: '☕',
        badge: 'Global #1 Coffee Drinkers',
        description:
          'Finnish workers have statutory coffee break protections written into union labor agreements, consuming an average of 4 to 5 cups of light-roast filter coffee daily.',
      },
    ],
  },

  // ==========================================
  // ICELAND
  // ==========================================
  {
    countryCode: 'IS',
    countryId: '352',
    countryName: 'Iceland',
    leadBanner: '#1 Most Peaceful Country on Earth & 100% Renewable Domestic Energy',
    records: [
      {
        title: '#1 Most Peaceful Country in the World',
        metricOrValue: 'Ranked #1 on Global Peace Index for 16 Consecutive Years',
        category: 'culture',
        icon: '🕊️',
        badge: 'World’s Safest Nation',
        description:
          'Iceland has no standing army, navy, or air force, zero prison overcrowding, almost nonexistent violent crime, and the highest societal trust on the planet.',
      },
      {
        title: '100% Renewable Domestic Electricity & Heating',
        metricOrValue: 'Nearly All Power from Geothermal Volcano Steam & Glacial Hydro',
        category: 'science',
        icon: '🌋',
        badge: '100% Green Energy Grid',
        description:
          'Harnesses subterranean volcanic heat to warm over 90% of all homes and generate 100% clean domestic electricity without burning fossil fuels.',
      },
      {
        title: 'Most Books Published & Read per Capita',
        metricOrValue: '1 in 10 Icelanders Publishes a Book in Their Lifetime (Jólabókaflóð)',
        category: 'culture',
        icon: '📚',
        badge: 'Literary World Leader',
        description:
          'Celebrates the ancient Icelandic Sagas and the beloved Christmas Eve tradition of Jólabókaflóð (the Christmas Book Flood), giving books as holiday gifts.',
      },
    ],
  },

  // ==========================================
  // NEW ZEALAND
  // ==========================================
  {
    countryCode: 'NZ',
    countryId: '554',
    countryName: 'New Zealand',
    leadBanner: 'All Blacks Rugby Supremacy & First Country to Grant Women’s Suffrage',
    records: [
      {
        title: 'Most Dominant Winning Record in Modern Team Sports',
        metricOrValue: 'All Blacks National Rugby Team: >77% Historical Win Rate',
        category: 'sports',
        icon: '🏉',
        badge: 'Legendary Haka & 3 World Cups',
        description:
          'Over more than 120 years of test matches, the All Blacks have won over 77% of all games played against world opposition, the highest win percentage of any international sports franchise.',
      },
      {
        title: 'First Sovereign Nation to Grant Women the Vote',
        metricOrValue: 'Enacted Universal Women’s Suffrage on September 19, 1893',
        category: 'history',
        icon: '🗳️',
        badge: 'Global Suffrage Pioneer',
        description:
          'Led by suffragist Kate Sheppard, New Zealand became the first self-governing country in the world in which all women had the legal right to vote in parliamentary elections.',
      },
      {
        title: 'World’s #1 Producer of Genuine Mānuka Honey',
        metricOrValue: 'High-Potency Bioactive Leptosperin & Methylglyoxal (UMF Rated)',
        category: 'nature',
        icon: '🍯',
        badge: 'World’s Most Prized Honey',
        description:
          'Native Mānuka bush blossoms produce honey with scientifically certified antibacterial properties, prized worldwide as a natural medicinal elixir.',
      },
    ],
  },

  // ==========================================
  // AUSTRALIA
  // ==========================================
  {
    countryCode: 'AU',
    countryId: '036',
    countryName: 'Australia',
    leadBanner: 'World’s Largest Coral Reef, Marsupial Biodiversity & 10,000+ Beaches',
    records: [
      {
        title: 'World’s Largest Coral Reef Ecosystem',
        metricOrValue: 'Great Barrier Reef: 2,300 km (1,430 miles) Long — Visible from Space',
        category: 'nature',
        icon: '🪸',
        badge: 'Natural World Wonder',
        description:
          'Composed of over 2,900 individual reefs and 900 islands, the Great Barrier Reef is the largest living organic structure on Earth, harboring 1,500 fish species.',
      },
      {
        title: 'Most Unique Endemic Marsupial Species on Earth',
        metricOrValue: '>80% of Mammals & Reptiles Exist Nowhere Else on the Planet',
        category: 'nature',
        icon: '🦘',
        badge: 'Unique Evolution Sanctuary',
        description:
          'Separated from other continents for millions of years, Australia evolved kangaroos, koalas, wombats, platypuses, echidnas, and Tasmanian devils.',
      },
      {
        title: 'Most Ocean Beaches of Any Nation',
        metricOrValue: 'Over 10,685 Distinct Public Beaches',
        category: 'geography',
        icon: '🏖️',
        badge: 'Coastline of 10,000 Beaches',
        description:
          'If you were to visit one new beach in Australia every single day, it would take you more than 29 years to see them all.',
      },
      {
        title: '6-Time ICC Men’s Cricket World Cup Champions',
        metricOrValue: '6 World Cup Titles (1987, 1999, 2003, 2007, 2015, 2023)',
        category: 'sports',
        icon: '🏏',
        badge: 'All-Time World Cup Record',
        description:
          'Australia has won 6 ODI Cricket World Cups—twice as many as any other nation in history—dominating generations of international cricket.',
      },
    ],
  },

  // ==========================================
  // SPAIN
  // ==========================================
  {
    countryCode: 'ES',
    countryId: '724',
    countryName: 'Spain',
    leadBanner: 'World’s #1 Olive Oil Producer, Organ Donation Leader & Jamón Ibérico',
    records: [
      {
        title: 'World’s #1 Olive Oil Producer',
        metricOrValue: 'Produces 40% to 50% of the Entire Planet’s Olive Oil Supply',
        category: 'food',
        icon: '🫒',
        badge: 'Global Olive Oil Capital',
        description:
          'The endless olive groves of Andalusia (Jaén) yield more extra virgin olive oil than all other countries combined, forming the foundation of Mediterranean health.',
      },
      {
        title: 'World Leader in Organ Donation & Transplants',
        metricOrValue: 'Ranked #1 Worldwide for Over 30 Consecutive Years',
        category: 'science',
        icon: '🫀',
        badge: 'Global Healthcare Benchmark',
        description:
          'Spain’s pioneering opt-out national transplant model (Organización Nacional de Trasplantes) achieves the highest organ donation rate per million people on Earth.',
      },
      {
        title: 'Most Blue Flag Certified Clean Beaches in the World',
        metricOrValue: 'Over 630 Blue Flag Beaches Certified for Purity & Safety',
        category: 'nature',
        icon: '🏖️',
        badge: 'World Rank #1 Clean Beaches',
        description:
          'Spain has held the world record for the highest number of internationally certified pristine, eco-managed Blue Flag beaches since the awards began in 1987.',
      },
      {
        title: 'World’s Most Prized Cured Ham (Jamón Ibérico de Bellota)',
        metricOrValue: '100% Acorn-Fed Iberian Free-Range Pigs Cured for 48 Months',
        category: 'food',
        icon: '🍖',
        badge: 'Pinnacle of Charcuterie',
        description:
          'Black Iberian pigs forage on sweet acorns (bellotas) in oak dehesa pastures, producing cured ham with oleic-acid marbled fat that melts at room temperature.',
      },
      {
        title: 'FIFA World Cup & Record UEFA Euro Trophies',
        metricOrValue: '2010 FIFA World Champions & Record 4-Time UEFA Euro Champions',
        category: 'sports',
        icon: '🏆',
        badge: 'Tiki-Taka Golden Era',
        description:
          'Spain made world football history as the only team to win three consecutive major tournaments (Euro 2008, World Cup 2010, Euro 2012) and holds the record with 4 Euro trophies (1964, 2008, 2010, 2024).',
      },
    ],
  },

  // ==========================================
  // MEXICO
  // ==========================================
  {
    countryCode: 'MX',
    countryId: '484',
    countryName: 'Mexico',
    leadBanner: 'World’s #1 Avocado Superpower, Birthplace of Chocolate & Corn',
    records: [
      {
        title: 'World’s #1 Avocado Producer & Exporter',
        metricOrValue: 'Produces ~30% of All Avocados Grown on Earth (Michoacán)',
        category: 'food',
        icon: '🥑',
        badge: 'Green Gold Capital',
        description:
          'Mexico harvests over 2.4 million tons of creamy Hass avocados annually in volcanic soil, supplying over 80% of US consumption and Super Bowl guacamole.',
      },
      {
        title: 'Birthplace of Chocolate, Vanilla & Corn Domestication',
        metricOrValue: 'Indigenous Mesoamericans Domesticated Cacao, Maize & Vanilla',
        category: 'history',
        icon: '🍫',
        badge: 'Culinary Gifts to Humanity',
        description:
          'Ancient Olmec, Maya, and Aztec agricultural masters gifted humanity chocolate (xocolatl), corn, vanilla orchids, tomatoes, chili peppers, and avocados.',
      },
      {
        title: 'Most UNESCO World Heritage Sites in the Americas',
        metricOrValue: '35 UNESCO World Heritage Sites (Rank #7 Worldwide)',
        category: 'culture',
        icon: '🏛️',
        badge: 'Rank #1 in the Americas',
        description:
          'Home to Chichén Itzá, Teotihuacan, Palenque, Monte Albán, and historic colonial centers, possessing more cultural heritage sites than any other nation in the Western Hemisphere.',
      },
    ],
  },

  // ==========================================
  // COLOMBIA
  // ==========================================
  {
    countryCode: 'CO',
    countryId: '170',
    countryName: 'Colombia',
    leadBanner: 'World #1 in Bird Species, Deep Green Emeralds & High-Grown Arabica',
    records: [
      {
        title: 'Most Bird Species of Any Country on Earth',
        metricOrValue: 'Over 1,950 Documented Bird Species (~20% of Global Avian Species)',
        category: 'nature',
        icon: '🦜',
        badge: 'World Rank #1 for Birds',
        description:
          'With three Andean cordilleras, Pacific rainforests, Caribbean coasts, and Amazonian jungles, Colombia has more bird species than North America and Europe combined.',
      },
      {
        title: 'World’s #1 Producer of Fine Gem Emeralds',
        metricOrValue: 'Produces 70% to 90% of the World’s Gem-Quality Green Emeralds',
        category: 'economy',
        icon: '💎',
        badge: 'Muzo & Chivor Emerald Mines',
        description:
          'Colombian hydrothermal emeralds are celebrated worldwide for their intense velvety bluish-green glow and unparalleled crystal transparency.',
      },
      {
        title: 'World Leader in Washed Mild Arabica Coffee',
        metricOrValue: 'UNESCO Coffee Cultural Landscape of Colombia (Eje Cafetero)',
        category: 'food',
        icon: '☕',
        badge: 'Pinnacle of Hand-Picked Coffee',
        description:
          'Hand-picked on steep volcanic slopes by generations of cafetales, Colombian coffee sets the global standard for bright acidity, citrus notes, and rich aroma.',
      },
    ],
  },

  // ==========================================
  // ETHIOPIA
  // ==========================================
  {
    countryCode: 'ET',
    countryId: '231',
    countryName: 'Ethiopia',
    leadBanner: 'Birthplace of Arabica Coffee, 3,000-Year Ancient Teff & Sacred Buna',
    records: [
      {
        title: 'Historical Birthplace of Arabica Coffee',
        metricOrValue: 'First Discovered in the Wild Kaffa Cloud Forests (9th Century)',
        category: 'food',
        icon: '☕',
        badge: 'Cradle of Coffee',
        description:
          'Legendary goat herder Kaldi discovered the energizing power of coffee cherries in Ethiopia’s highlands, gifting the world its most beloved morning beverage.',
      },
      {
        title: 'Ancient Teff Grain & Probiotic Injera Sourdough',
        metricOrValue: 'Fermented Teff Flatbread Cultivated Continuously for 3,000+ Years',
        category: 'food',
        icon: '🫓',
        badge: 'Oldest Sourdough Tradition',
        description:
          'Teff is one of humanity’s oldest domesticated supergrains—gluten-free, rich in iron and protein—fermented into spongy, tangy Injera shared from a communal Mesob.',
      },
      {
        title: 'Only African Nation to Defeat European Imperial Invasion',
        metricOrValue: 'Battle of Adwa (1896): Emperor Menelik II Defeated Colonial Army',
        category: 'history',
        icon: '🛡️',
        badge: 'Symbol of Pan-African Freedom',
        description:
          'Ethiopia successfully maintained unbroken sovereign independence throughout the 19th-century Scramble for Africa, inspiring freedom movements across the diaspora.',
      },
    ],
  },

  // ==========================================
  // INDONESIA
  // ==========================================
  {
    countryCode: 'ID',
    countryId: '360',
    countryName: 'Indonesia',
    leadBanner: 'World’s Largest Island Archipelago, 130 Volcanoes & Beef Rendang',
    records: [
      {
        title: 'World’s Largest Island Archipelago Nation',
        metricOrValue: 'Over 17,508 Islands Spanning 5,120 km Across Two Oceans',
        category: 'geography',
        icon: '🏝️',
        badge: 'World Record Archipelago',
        description:
          'Stretches across one-eighth of Earth’s circumference between the Indian and Pacific Oceans, encompassing Sumatra, Java, Bali, Kalimantan, Sulawesi, and Papua.',
      },
      {
        title: 'Most Active Volcanoes in the World',
        metricOrValue: 'Over 130 Active Volcanoes Along the Pacific Ring of Fire',
        category: 'geography',
        icon: '🌋',
        badge: 'Ring of Fire Heart',
        description:
          'Home to Mount Merapi, Bromo, Krakatoa, and Tambora (which caused the historic 1816 "Year Without a Summer"), enriching Indonesian soils with fertile volcanic ash.',
      },
      {
        title: 'Creator of the World’s Most Delicious Dish (Beef Rendang)',
        metricOrValue: 'Voted #1 Most Delicious Food on Earth (CNN Global Poll)',
        category: 'food',
        icon: '🍛',
        badge: 'World’s #1 Delicious Dish',
        description:
          'Minangkabau slow-cooks tender beef in coconut milk, lemongrass, galangal, and spices until the sauce evaporates into dark caramelized caramelized richness.',
      },
    ],
  },

  // ==========================================
  // SOUTH KOREA
  // ==========================================
  {
    countryCode: 'KR',
    countryId: '410',
    countryName: 'South Korea',
    leadBanner: 'World Leader in Memory Chips, 5G Speed & K-Culture Phenomenon',
    records: [
      {
        title: 'World’s #1 Memory Chip (DRAM & NAND) Producer',
        metricOrValue: 'Samsung & SK Hynix Control Over 70% of the World Memory Market',
        category: 'science',
        icon: '📱',
        badge: 'Semiconductor Superpower',
        description:
          'South Korea manufactures the memory silicon chips powering virtually all modern smartphones, AI supercomputers, data centers, and personal devices worldwide.',
      },
      {
        title: 'World’s Fastest & Most Connected Fiber / 5G Network',
        metricOrValue: 'Highest High-Speed Internet Penetration & Mobile Download Speeds',
        category: 'science',
        icon: '🌐',
        badge: 'Most Connected Society',
        description:
          'Pioneered commercial 5G rollout and operates the world’s densest gigabit fiber-to-the-home network, with average internet speeds topping global indices.',
      },
      {
        title: 'Global K-Culture Phenomenon (Hallyu Wave)',
        metricOrValue: 'Billions of Streams: BTS, Blackpink, Squid Game & Parasite',
        category: 'culture',
        icon: '🎤',
        badge: 'Global Cultural Trendsetter',
        description:
          'The first non-English-speaking culture in the 21st century to sweep global Billboard #1 charts, Netflix streaming records, and Best Picture at the Oscars.',
      },
    ],
  },

  // ==========================================
  // SAN MARINO
  // ==========================================
  {
    countryCode: 'SM',
    countryId: '674',
    countryName: 'San Marino',
    leadBanner: 'World’s Oldest Surviving Sovereign Republic (Continuous Since 301 CE)',
    records: [
      {
        title: 'Oldest Surviving Constitutional Republic on Earth',
        metricOrValue: 'Continuous Unbroken Statehood Since September 3, 301 CE (1,725 Years)',
        category: 'history',
        icon: '🏰',
        badge: 'Guinness World Record',
        description:
          'Founded by Saint Marinus on Mount Titano, San Marino has maintained its independence and elected Captains Regent through the fall of Rome, Napoleon, and World Wars.',
      },
      {
        title: 'Oldest Active Written Constitution in Human History',
        metricOrValue: 'Statutes of 1600 (Leges Statutae Republicae Sancti Marini)',
        category: 'history',
        icon: '📜',
        badge: 'World’s Oldest Constitution',
        description:
          'Enacted in six Latin books in October 1600, San Marino’s statutes remain the oldest written constitutional framework still in legal and operational force.',
      },
    ],
  },

  // ==========================================
  // EGYPT
  // ==========================================
  {
    countryCode: 'EG',
    countryId: '818',
    countryName: 'Egypt',
    leadBanner: 'Oldest Recorded Dynastic Statehood, Great Pyramids & Suez Canal',
    records: [
      {
        title: 'Oldest Recorded Unified Dynastic State in Human History',
        metricOrValue: 'Over 5,100+ Years of History (Founded c. 3100 BCE by King Narmer)',
        category: 'history',
        icon: '👑',
        badge: 'Cradle of Statehood',
        description:
          'King Narmer unified Upper and Lower Egypt over five millennia ago, building the earliest centralized government, calendar, papyrus records, and monumental architecture.',
      },
      {
        title: 'Only Surviving Wonder of the Ancient Seven Wonders',
        metricOrValue: 'Great Pyramid of Giza (Khufu): Standing for Over 4,500 Years',
        category: 'history',
        icon: '🏛️',
        badge: 'Sole Surviving Ancient Wonder',
        description:
          'Constructed with 2.3 million stone blocks, Khufu’s Great Pyramid remained the tallest human-made structure in the world for more than 3,800 years.',
      },
      {
        title: 'Controls the Suez Canal (Crucial Global Maritime Chokepoint)',
        metricOrValue: 'Handles ~12% of Total Global Seaborne Trade & 30% of Container Ships',
        category: 'economy',
        icon: '🚢',
        badge: 'Global Trade Arterial Route',
        description:
          'The 193 km artificial sea-level waterway connects the Mediterranean directly to the Red Sea, saving container ships thousands of miles around Africa.',
      },
    ],
  },

  // ==========================================
  // SINGAPORE
  // ==========================================
  {
    countryCode: 'SG',
    countryId: '702',
    countryName: 'Singapore',
    leadBanner: 'World’s Best Airport, Cleanest City-State & Busiest Transshipment Port',
    records: [
      {
        title: 'World’s Best Airport Record (Changi Airport)',
        metricOrValue: 'Voted Skytrax World’s Best Airport a Record 12 Times',
        category: 'science',
        icon: '✈️',
        badge: 'All-Time Skytrax Leader',
        description:
          'Famous for the indoor Jewel Rain Vortex waterfall, butterfly garden, automated immigration, and world-class passenger transit comfort.',
      },
      {
        title: 'World’s Busiest Container Transshipment Seaport',
        metricOrValue: 'Connected to 600+ Ports Worldwide Across 120+ Nations',
        category: 'economy',
        icon: '🚢',
        badge: 'Premier Global Maritime Hub',
        description:
          'Strategically located at the Strait of Malacca, Singapore handles one-fifth of the world’s shipping containers and half of the annual crude oil supply.',
      },
      {
        title: 'Ranked #1 Safest and Most Corrupt-Free Nation in Asia',
        metricOrValue: 'Consistently Top 5 on Transparency International CPI',
        category: 'culture',
        icon: '🛡️',
        badge: 'Model Governance',
        description:
          'Combines strict rule of law, zero tolerance for corruption, immaculate urban greenery, and world-leading mathematics and science public education.',
      },
    ],
  },

  // ==========================================
  // SOUTH AFRICA
  // ==========================================
  {
    countryCode: 'ZA',
    countryId: '710',
    countryName: 'South Africa',
    leadBanner: '4-Time Rugby World Cup Champions (World Record) & Platinum Superpower',
    records: [
      {
        title: 'Most Men’s Rugby World Cups in History',
        metricOrValue: '4 World Cup Titles (1995, 2007, 2019, 2023) — All-Time Record #1',
        category: 'sports',
        icon: '🏉',
        badge: 'Springbok World Record',
        description:
          'The Springboks are the only nation to win 4 Rugby World Cups, including Nelson Mandela’s historic 1995 triumph and back-to-back crowns in 2019 and 2023.',
      },
      {
        title: 'World’s #1 Producer of Platinum Group Metals',
        metricOrValue: 'Supplies Over 70% of the World’s Platinum & Chrome Reserves',
        category: 'economy',
        icon: '💎',
        badge: 'Bushveld Mineral Complex',
        description:
          'South Africa holds the world’s richest concentration of platinum, palladium, and rhodium, essential for industrial catalytic converters and green hydrogen cells.',
      },
      {
        title: 'Discovery Site of the Largest Gem Diamond in History',
        metricOrValue: 'Cullinan Diamond: 3,106 Carats (1.37 lbs uncut rough)',
        category: 'history',
        icon: '💍',
        badge: 'Largest Rough Diamond Ever',
        description:
          'Mined in Pretoria in 1905, it was cut into Cullinan I (Great Star of Africa, 530 carats) and Cullinan II, mounted in the British Crown Jewels.',
      },
    ],
  },

  // ==========================================
  // NETHERLANDS
  // ==========================================
  {
    countryCode: 'NL',
    countryId: '528',
    countryName: 'Netherlands',
    leadBanner: 'World #1 Flower Exporter, Master of Dike Engineering & Most Bicycles',
    records: [
      {
        title: 'World’s #1 Exporter of Flowers & #2 Agricultural Exporter',
        metricOrValue: 'Royal FloraHolland Trades Billions of Flowers Annually',
        category: 'economy',
        icon: '🌷',
        badge: 'Flower Capital of Earth',
        description:
          'Despite its small territory, the Netherlands is the world’s second-largest agricultural exporter by value, driven by high-tech geothermal glass greenhouses.',
      },
      {
        title: 'World Leader in Water Management & Flood Defense',
        metricOrValue: 'Delta Works: Recognized as a Wonder of the Modern World',
        category: 'science',
        icon: '🌊',
        badge: 'Engineering Miracle',
        description:
          'With 26% of the country sitting below sea level, Dutch storm surge barriers and dikes protect millions of citizens from North Sea storm surges.',
      },
      {
        title: 'Most Bicycle-Dense Country on Earth',
        metricOrValue: '~1.3 Bicycles per Citizen (More Bicycles than People)',
        category: 'culture',
        icon: '🚲',
        badge: 'World Cycling Capital',
        description:
          'Boasts over 35,000 km of dedicated separated bike paths; cycling accounts for over a quarter of all daily trips taken across the country.',
      },
    ],
  },

  // ==========================================
  // PORTUGAL
  // ==========================================
  {
    countryCode: 'PT',
    countryId: '620',
    countryName: 'Portugal',
    leadBanner: 'World #1 Natural Cork Producer, Nazaré Big Waves & Oldest Active Alliance',
    records: [
      {
        title: 'World’s #1 Natural Cork Producer & Exporter',
        metricOrValue: 'Produces Over 50% of the Entire Planet’s Cork Supply',
        category: 'nature',
        icon: '🍾',
        badge: 'Montado Cork Forest Leader',
        description:
          'The protected cork oak forests of the Alentejo are sustainably harvested by skilled debarkers every 9 years without felling a single tree.',
      },
      {
        title: 'Home to the Largest Surfed Ocean Waves on Earth',
        metricOrValue: 'Nazaré Praia do Norte: Giant Atlantic Waves Exceeding 86 Feet (26m)',
        category: 'sports',
        icon: '🏄‍♂️',
        badge: 'Guinness Big Wave Record',
        description:
          'The deep underwater Nazaré Canyon channels massive swells into the tallest, most terrifying rideable monster waves on Earth, drawing big-wave surf daredevils.',
      },
      {
        title: 'Oldest Active Diplomatic Alliance in Human History',
        metricOrValue: 'Anglo-Portuguese Alliance (Treaty of Windsor, 1386 — 640+ Years)',
        category: 'history',
        icon: '🤝',
        badge: 'Unbroken Historic Alliance',
        description:
          'Ratified between King John I of Portugal and Richard II of England, this treaty remains the world’s oldest unbroken mutual defense alliance still in legal effect.',
      },
    ],
  },

  // ==========================================
  // BELGIUM
  // ==========================================
  {
    countryCode: 'BE',
    countryId: '056',
    countryName: 'Belgium',
    leadBanner: 'Inventor of the Chocolate Praline & 1,500 Unique Indigenous Craft Beers',
    records: [
      {
        title: 'Inventor of the Filled Chocolate Praline',
        metricOrValue: 'Invented by Jean Neuhaus in Brussels in 1912',
        category: 'food',
        icon: '🍫',
        badge: 'World Praline Capital',
        description:
          'Neuhaus created the first hard-shelled chocolate filled with ganache and praliné cream, alongside his wife Louise who patented the iconic ballotin gift box.',
      },
      {
        title: 'Most Diverse Indigenous Beer Culture on Earth',
        metricOrValue: 'UNESCO Intangible Cultural Heritage & 1,500 Artisanal Brews',
        category: 'food',
        icon: '🍺',
        badge: 'UNESCO Beer Culture',
        description:
          'From ancient monastic Trappist ales brewed within active abbeys (Westvleteren, Chimay) to spontaneous wild-fermented Lambics and Gueuzes in the Senne Valley.',
      },
      {
        title: 'World Capital of Diamond Trading & Cutting',
        metricOrValue: 'Antwerp Diamond Square Mile Handles ~84% of All Rough Diamonds',
        category: 'economy',
        icon: '💎',
        badge: 'Global Diamond Capital',
        description:
          'The Antwerp Diamond District has traded, cut, and certified diamonds since the 15th century, processing tens of billions of dollars in gems annually.',
      },
    ],
  },

  // ==========================================
  // TURKEY
  // ==========================================
  {
    countryCode: 'TR',
    countryId: '792',
    countryName: 'Turkey',
    leadBanner: 'World #1 Hazelnut Producer, Transcontinental Istanbul & Göbekli Tepe',
    records: [
      {
        title: 'World’s #1 Hazelnut Producer & Exporter',
        metricOrValue: 'Produces ~70% of the Entire World’s Hazelnut Harvest (Black Sea)',
        category: 'food',
        icon: '🌰',
        badge: 'Global Hazelnut Leader',
        description:
          'Grown on the misty green slopes of Giresun and Ordu, Turkish hazelnuts supply the world’s bakeries, chocolatiers, and hazelnut spreads (Nutella).',
      },
      {
        title: 'Only Metropolis on Earth Spanning Two Continents',
        metricOrValue: 'Istanbul: Bridges Europe & Asia Across the Bosphorus Strait',
        category: 'geography',
        icon: '🌉',
        badge: 'Crossroads of Civilizations',
        description:
          'Served as the imperial capital of three monumental empires (Roman, Byzantine, and Ottoman) for over 1,600 consecutive years.',
      },
      {
        title: 'Home to the Oldest Known Temple Complex in Human History',
        metricOrValue: 'Göbekli Tepe: Monumental Carved Megaliths Dating to ~9500 BCE',
        category: 'history',
        icon: '🏛️',
        badge: 'Predates Agriculture & Pyramids',
        description:
          'Carved with stylized animals by hunter-gatherers 11,500 years ago, Göbekli Tepe revolutionized archaeology as the world’s earliest organized religious sanctuary.',
      },
    ],
  },

  // ==========================================
  // MONGOLIA
  // ==========================================
  {
    countryCode: 'MN',
    countryId: '496',
    countryName: 'Mongolia',
    leadBanner: 'Lowest Population Density on Earth & Largest Contiguous Land Empire',
    records: [
      {
        title: 'Lowest Population Density of Any Sovereign Nation',
        metricOrValue: '~2.1 People per km² Across 1.56 Million km² of Steppe',
        category: 'geography',
        icon: '🐎',
        badge: 'World’s Most Sparsely Populated State',
        description:
          'Under the endless blue sky, vast sweeping grasslands and the Gobi Desert allow nomadic pastoral traditions to thrive alongside free-roaming horses.',
      },
      {
        title: 'World’s Largest Contiguous Land Empire in History',
        metricOrValue: 'Mongol Empire (1206–1368): Covered 24 Million km² (16% of Earth)',
        category: 'history',
        icon: '🏹',
        badge: 'All-Time Historical Land Empire',
        description:
          'Founded by Genghis Khan, the Mongol Empire united the Silk Road from the Sea of Japan to the Danube River, enabling unprecedented Eurasian trade and cultural exchange.',
      },
    ],
  },

  // ==========================================
  // MOROCCO
  // ==========================================
  {
    countryCode: 'MA',
    countryId: '504',
    countryName: 'Morocco',
    leadBanner: 'World’s Largest Phosphate Reserves & Oldest University on Earth',
    records: [
      {
        title: 'World’s Largest Phosphate Reserves',
        metricOrValue: 'Holds ~70% of the Entire Planet’s Known Phosphate Reserves',
        category: 'economy',
        icon: '🧪',
        badge: 'Guardian of Global Food Security',
        description:
          'Phosphate rock is irreplaceable for agricultural fertilizers; Morocco’s vast mineral reserves make it the ultimate anchor for feeding the human population.',
      },
      {
        title: 'Oldest Continuously Operating University in the World',
        metricOrValue: 'University of al-Qarawiyyin in Fez (Founded 859 CE by Fatima al-Fihri)',
        category: 'history',
        icon: '📜',
        badge: 'Guinness & UNESCO World Record',
        description:
          'Founded over a millennium ago as a center of spiritual and scientific learning, it continues granting degrees to this day in the historic Fez Medina.',
      },
      {
        title: 'Sole Indigenous Producer of Argan Oil (“Liquid Gold”)',
        metricOrValue: 'UNESCO Arganeraie Biosphere Reserve (Endemic Argan Trees)',
        category: 'nature',
        icon: '🌳',
        badge: 'Exclusive Moroccan Heritage',
        description:
          'Cold-pressed by traditional Berber women’s cooperatives in southwestern Morocco, argan oil is globally coveted for culinary flavor and restorative cosmetic skincare.',
      },
    ],
  },

  // ==========================================
  // GREECE
  // ==========================================
  {
    countryCode: 'GR',
    countryId: '300',
    countryName: 'Greece',
    leadBanner: 'World’s Largest Merchant Fleet & Cradle of Western Democracy',
    records: [
      {
        title: 'World’s Largest Merchant Shipping Fleet',
        metricOrValue: 'Greek Shipowners Control >20% of Global Merchant Deadweight Tonnage',
        category: 'economy',
        icon: '🚢',
        badge: 'Global Maritime King',
        description:
          'Greek maritime dynasties command the largest commercial cargo fleet on Earth, carrying one-fifth of all global trade across oil, grain, and container routes.',
      },
      {
        title: 'Birthplace of Democracy, Western Philosophy & Olympic Games',
        metricOrValue: 'Athenian Democracy (508 BCE) & Ancient Olympic Games (776 BCE)',
        category: 'history',
        icon: '🏛️',
        badge: 'Cradle of Western Civilization',
        description:
          'The foundational intellectual framework of modern representative government, philosophy (Socrates, Plato, Aristotle), mathematics, and athletics was born here.',
      },
    ],
  },

  // ==========================================
  // COSTA RICA
  // ==========================================
  {
    countryCode: 'CR',
    countryId: '188',
    countryName: 'Costa Rica',
    leadBanner: 'World Leader in Rainforest Conservation & Abolished Standing Military in 1948',
    records: [
      {
        title: 'World Pioneer in Tropical Forest Regeneration',
        metricOrValue: 'Reversed Deforestation: Expanded Forest Cover from 21% to >54%',
        category: 'nature',
        icon: '🌿',
        badge: 'Global Ecotourism Capital',
        description:
          'The first tropical country to stop and actively reverse deforestation through pioneering payments for environmental services (PES) and national parks.',
      },
      {
        title: 'Operates Without a Standing Military Since 1948',
        metricOrValue: 'Constitutionally Abolished Army in 1948 (“More Teachers than Soldiers”)',
        category: 'culture',
        icon: '🕊️',
        badge: '75+ Years of Demilitarized Peace',
        description:
          'Following the 1948 civil war, President José Figueres Ferrer smashed the barracks walls and redirected national defense budgets into universal health and public schools.',
      },
    ],
  },

  // ==========================================
  // MADAGASCAR
  // ==========================================
  {
    countryCode: 'MG',
    countryId: '450',
    countryName: 'Madagascar',
    leadBanner: '#1 Island for Endemic Evolution, All Lemurs & Bourbon Vanilla Superpower',
    records: [
      {
        title: 'Most Unique Endemic Island Biodiversity on Earth',
        metricOrValue: 'Over 90% of All Wildlife & Plants Are Found Nowhere Else on Earth',
        category: 'nature',
        icon: '🐒',
        badge: 'The Eighth Continent',
        description:
          'Isolated in the Indian Ocean for 88 million years, Madagascar evolved 100+ species of lemurs, half of all chameleon species, and bizarre giant baobab trees.',
      },
      {
        title: 'World’s #1 Producer of Bourbon Vanilla Beans',
        metricOrValue: 'Supplies ~80% of the Entire Planet’s Pure Natural Vanilla',
        category: 'food',
        icon: '🍦',
        badge: 'Vanilla World Capital (Sava)',
        description:
          'Every single delicate vanilla orchid blossom must be hand-pollinated with a tiny bamboo needle on the day it opens, producing the world’s most aromatic black pods.',
      },
    ],
  },

  // ==========================================
  // UNITED KINGDOM
  // ==========================================
  {
    countryCode: 'GB',
    countryId: '826',
    countryName: 'United Kingdom',
    leadBanner: 'World’s Most Spoken Lingua Franca, Premier League & Greenwich Mean Time',
    records: [
      {
        title: 'Most Globally Spoken Lingua Franca (English)',
        metricOrValue: '~1.5 Billion English Speakers Worldwide Across Every Continent',
        category: 'culture',
        icon: '📖',
        badge: 'Global Lingua Franca',
        description:
          'Originating in England, English has become the universal standard for world aviation, maritime navigation, scientific publishing, international business, and the internet.',
      },
      {
        title: 'Most Watched Domestic Sports League on Earth',
        metricOrValue: 'Premier League: Broadcast to 212 Territories & 4.7B Cumulative Viewers',
        category: 'sports',
        icon: '⚽',
        badge: 'World’s #1 Football League',
        description:
          'Home to Manchester United, Liverpool, Arsenal, Manchester City, and Chelsea, generating the highest broadcast revenues and global fan engagement in world club sports.',
      },
      {
        title: 'International Standard for World Time & Longitude',
        metricOrValue: 'Greenwich Prime Meridian (0° Longitude / Greenwich Mean Time)',
        category: 'science',
        icon: '⏰',
        badge: 'Center of World Time',
        description:
          'The Royal Observatory in Greenwich was chosen at the 1884 International Meridian Conference to define the prime reference for global time zones and navigation.',
      },
      {
        title: 'Birthplace of Modern World Sports & 1966 World Cup Champions',
        metricOrValue: 'Codified Football, Cricket, Rugby, Tennis & Golf Rules; 1966 World Champions',
        category: 'sports',
        icon: '🏆',
        badge: 'Cradle of World Sports',
        description:
          'England drafted the original Laws of the Game for Association Football in 1863, codified cricket and rugby union, and triumphed at the 1966 World Cup with Bobby Moore and Geoff Hurst.',
      },
    ],
  },

  // ==========================================
  // PERU
  // ==========================================
  {
    countryCode: 'PE',
    countryId: '604',
    countryName: 'Peru',
    leadBanner: 'World Capital of Native Potatoes, #1 Restaurant & Lake Titicaca',
    records: [
      {
        title: 'World’s Greatest Native Potato Diversity',
        metricOrValue: 'Cultivates Over 3,500 Native Heirloom Potato Varieties',
        category: 'food',
        icon: '🥔',
        badge: 'Birthplace of the Potato',
        description:
          'Andean farmers domesticated the wild potato over 8,000 years ago, preserving thousands of colorful, antioxidant-rich heirloom tubers found nowhere else.',
      },
      {
        title: 'Central (Lima) Voted World’s #1 Best Restaurant',
        metricOrValue: 'Ranked #1 on World’s 50 Best Restaurants (2023)',
        category: 'food',
        icon: '🍽️',
        badge: 'Gastronomy World Leader',
        description:
          'Chefs Virgilio Martínez and Pía León showcase Peru’s hyper-diverse marine, desert, Amazonian, and high-altitude Andean ecosystems at varying altitudes.',
      },
      {
        title: 'World’s Highest Navigable Body of Water',
        metricOrValue: 'Lake Titicaca: 3,812 meters (12,507 ft) Above Sea Level',
        category: 'geography',
        icon: '🌊',
        badge: 'Highest Navigable Lake',
        description:
          'Sacred lake of the Inca empire, Lake Titicaca is the highest large navigable lake on Earth, famous for the floating reed islands of the Uros people.',
      },
    ],
  },

  // ==========================================
  // CHILE
  // ==========================================
  {
    countryCode: 'CL',
    countryId: '152',
    countryName: 'Chile',
    leadBanner: 'World #1 Copper Producer, Longest North-South Nation & Astronomy Capital',
    records: [
      {
        title: 'World’s #1 Copper Producer & Largest Lithium Reserves',
        metricOrValue: 'Mines ~28% of the Entire Planet’s Annual Copper Supply',
        category: 'economy',
        icon: '⛏️',
        badge: 'Global Copper Superpower',
        description:
          'Home to Escondida (largest copper mine on Earth) and the lithium-rich salt flats of the Atacama, anchoring global green electrification and EV batteries.',
      },
      {
        title: 'Longest North-to-South Country on Earth',
        metricOrValue: 'Spans 4,300 km (2,670 miles) Across 38 Degrees of Latitude',
        category: 'geography',
        icon: '🗺️',
        badge: 'World’s Longest Nation',
        description:
          'Yet averaging only 177 km wide, Chile stretches from the hyper-arid Atacama Desert in the north to the glacial fjords of Patagonia and Cape Horn in the south.',
      },
      {
        title: 'World Capital of Ground-Based Astronomical Telescopes',
        metricOrValue: 'Hosts Over 50% of the World’s Optical & Radio Telescope Capacity',
        category: 'science',
        icon: '🔭',
        badge: 'Gateway to the Cosmos',
        description:
          'Because of the hyper-dry, cloudless skies of the Atacama Desert, international observatories (ALMA, VLT, and the upcoming ELT) map the deep universe from Chile.',
      },
    ],
  },

  // ==========================================
  // SWEDEN
  // ==========================================
  {
    countryCode: 'SE',
    countryId: '752',
    countryName: 'Sweden',
    leadBanner: 'Most Islands on Earth, Home of the Nobel Prize & Spotify Pioneer',
    records: [
      {
        title: 'Most Islands of Any Country in the World',
        metricOrValue: 'Over 267,570 Registered Islands (Stockholm Archipelago)',
        category: 'geography',
        icon: '🏝️',
        badge: 'World Record Island Count',
        description:
          'Sweden possesses more islands than any other sovereign state, protected under the ancient constitutional right of public access to nature (Allemansrätten).',
      },
      {
        title: 'Home & Foundation of the Prestigious Nobel Prize',
        metricOrValue: 'Established by Alfred Nobel in 1895 (Physics, Chemistry, Medicine, Literature, Peace)',
        category: 'science',
        icon: '🏅',
        badge: 'Pinnacle of Human Achievement',
        description:
          'Awarded annually in Stockholm and Oslo, the Nobel Prizes represent humanity’s highest intellectual, scientific, and humanitarian recognitions.',
      },
    ],
  },

  // ==========================================
  // NEPAL
  // ==========================================
  {
    countryCode: 'NP',
    countryId: '524',
    countryName: 'Nepal',
    leadBanner: 'Home of Mount Everest, 8 of Earth’s 14 Eight-Thousanders & Unique Flag',
    records: [
      {
        title: 'Highest Mountain on Planet Earth',
        metricOrValue: 'Mount Everest (Sagarmatha): 8,848.86 meters (29,031.7 ft)',
        category: 'geography',
        icon: '🏔️',
        badge: 'Roof of the World',
        description:
          'Nepal is home to 8 of the world’s 14 peaks above 8,000 meters, making it the supreme mountaineering and trekking sanctuary in human history.',
      },
      {
        title: 'Only Non-Quadrilateral National Flag in the World',
        metricOrValue: 'Distinctive Double-Pennon Triangular National Flag',
        category: 'culture',
        icon: '🇳🇵',
        badge: 'Unique Geometric Design',
        description:
          'The stacked crimson triangles represent the Himalayan mountain peaks and honor the sun and moon, symbolizing Nepal’s endurance as long as the celestial bodies shine.',
      },
    ],
  },

  // ==========================================
  // ECUADOR
  // ==========================================
  {
    countryCode: 'EC',
    countryId: '218',
    countryName: 'Ecuador',
    leadBanner: 'World #1 Banana Exporter, Galápagos Islands & Closest Point to the Sun',
    records: [
      {
        title: 'World’s #1 Banana Exporter',
        metricOrValue: 'Supplies ~30% of All Bananas Traded Globally Across 70+ Countries',
        category: 'food',
        icon: '🍌',
        badge: 'Global Banana Leader',
        description:
          'Year-round tropical sunshine and volcanic soil make Ecuador the world’s foremost exporter of sweet Cavendish bananas.',
      },
      {
        title: 'Closest Point on Earth’s Surface to Outer Space',
        metricOrValue: 'Mount Chimborazo Summit: 6,263m (Closest to the Sun due to Equatorial Bulge)',
        category: 'geography',
        icon: '☀️',
        badge: 'Closest to the Stars',
        description:
          'Because the Earth bulges at the equator, Chimborazo’s peak is the furthest terrestrial point from the center of the Earth and the closest spot on Earth to the stars.',
      },
      {
        title: 'Galápagos Islands (Cradle of Evolutionary Biology)',
        metricOrValue: 'Inspired Charles Darwin’s Theory of Evolution by Natural Selection',
        category: 'nature',
        icon: '🐢',
        badge: 'UNESCO World Heritage #1',
        description:
          'Home to giant tortoises, marine iguanas, and Darwin’s finches, the Galápagos was designated the very first UNESCO World Heritage site in 1978.',
      },
    ],
  },

  // ==========================================
  // CROATIA
  // ==========================================
  {
    countryCode: 'HR',
    countryId: '191',
    countryName: 'Croatia',
    leadBanner: 'World Cup Finalists, Inventor of the Necktie & 1,200 Adriatic Islands',
    records: [
      {
        title: 'Highest World Cup Finalists per Capita in Modern Era',
        metricOrValue: '2018 World Cup Finalists & 2022 Bronze Medalists (Population: 3.9M)',
        category: 'sports',
        icon: '⚽',
        badge: 'Football Phenomenon',
        description:
          'Luka Modrić and Croatia achieved the miraculous feat of reaching back-to-back World Cup podiums despite a population under 4 million, unmatched in modern football.',
      },
      {
        title: 'Inventor of the Modern Necktie (Cravat)',
        metricOrValue: 'Originated with 17th-Century Croatian Cavalry in Paris (Cravate)',
        category: 'culture',
        icon: '👔',
        badge: 'Global Fashion Staple',
        description:
          'French King Louis XIV adopted the knotted silk neckcloths worn by Croatian mercenaries, giving birth to the worldwide tradition of the necktie.',
      },
    ],
  },

  // ==========================================
  // IRAN
  // ==========================================
  {
    countryCode: 'IR',
    countryId: '364',
    countryName: 'Iran',
    leadBanner: 'First Human Rights Declaration (Cyrus Cylinder) & World #1 Saffron Superpower',
    records: [
      {
        title: 'First Declaration of Human Rights in History',
        metricOrValue: 'Cyrus Cylinder (539 BCE): Cyrus the Great Proclaimed Freedom of Worship',
        category: 'history',
        icon: '📜',
        badge: 'World’s First Charter of Rights',
        description:
          'Upon conquering Babylon, Cyrus the Great freed enslaved peoples, permitted exiled Judeans to rebuild Jerusalem’s temple, and declared religious tolerance.',
      },
      {
        title: 'World’s #1 Saffron Producer (“Red Gold”)',
        metricOrValue: 'Produces Over 85% to 90% of the Entire Planet’s Saffron Harvest',
        category: 'food',
        icon: '🌸',
        badge: 'Red Gold Capital (Khorasan)',
        description:
          'It requires over 150,000 delicate purple crocus sativus blossoms hand-picked at dawn to produce just one single kilogram of pure crimson saffron threads.',
      },
    ],
  },

  // ==========================================
  // IRELAND
  // ==========================================
  {
    countryCode: 'IE',
    countryId: '372',
    countryName: 'Ireland',
    leadBanner: 'Most Eurovision Titles, Birthplace of Halloween & Global Tech Capital of Europe',
    records: [
      {
        title: 'Joint Most Eurovision Song Contest Victories',
        metricOrValue: '7 Historical Eurovision Grand Prix Championships',
        category: 'culture',
        icon: '🎤',
        badge: 'Eurovision Record Holder',
        description:
          'Ireland won an astonishing 4 contests in 5 years during the 1990s (Johnny Logan, Linda Martin, Niamh Kavanagh, Paul Harrington), tied for the all-time world record.',
      },
      {
        title: 'Ancient Historical Origin of Halloween',
        metricOrValue: 'Celtic Festival of Samhain Celebrated in Ireland for Over 2,000 Years',
        category: 'history',
        icon: '🎃',
        badge: 'Birthplace of Halloween',
        description:
          'The ancient Celts marked the end of the harvest and the thinning of the veil between worlds at Samhain, lighting bonfires and carving turnips—the original jack-o’-lanterns.',
      },
    ],
  },

  // ==========================================
  // URUGUAY
  // ==========================================
  {
    countryCode: 'UY',
    countryId: '858',
    countryName: 'Uruguay',
    leadBanner: 'First FIFA World Cup Champions (1930), 100% Student Laptops & 98% Green Power',
    records: [
      {
        title: 'First FIFA World Cup Champions in History',
        metricOrValue: 'Won Inaugural 1930 FIFA World Cup (Montevideo) & 1950 (Maracanazo)',
        category: 'sports',
        icon: '🏆',
        badge: 'Historic First Champions',
        description:
          'Hosted and triumphed at the very first World Cup at Estadio Centenario in 1930, followed by the famous 1950 Maracanazo victory over Brazil.',
      },
      {
        title: 'First Country to Provide Free Laptops to Every Student',
        metricOrValue: 'Plan Ceibal: 100% of Primary & Secondary Public Students Received Laptops',
        category: 'science',
        icon: '💻',
        badge: 'Global Digital Inclusion Pioneer',
        description:
          'Uruguay bridged the digital divide across all socio-economic strata, providing free personal computers and broadband access to all school children and teachers.',
      },
      {
        title: 'Highest Share of Clean Electricity in South America',
        metricOrValue: '~98% of Electricity Generated from Wind, Hydro & Biomass',
        category: 'nature',
        icon: '🍃',
        badge: 'Renewable Energy Leader',
        description:
          'In under a decade, Uruguay transitioned from fossil fuel dependency into one of the greenest power grids on Earth without government subsidies.',
      },
    ],
  },

  // ==========================================
  // CUBA
  // ==========================================
  {
    countryCode: 'CU',
    countryId: '192',
    countryName: 'Cuba',
    leadBanner: 'World’s #1 Hand-Rolled Cigars, Olympic Boxing Masters & Healthcare Brigades',
    records: [
      {
        title: 'World’s Most Renowned Hand-Rolled Cigars',
        metricOrValue: 'Habano / Cohiba / Montecristo: Vuelta Abajo Pinar del Río Tobacco',
        category: 'food',
        icon: '🍂',
        badge: 'The Gold Standard of Cigars',
        description:
          'Master torcedores hand-roll each cigar using nutrient-rich red soil tobacco from Pinar del Río, creating the world’s most sought-after luxury cigars.',
      },
      {
        title: 'Highest Olympic Boxing Gold Medals per Capita',
        metricOrValue: '41 Olympic Boxing Gold Medals (Teófilo Stevenson & Félix Savón)',
        category: 'sports',
        icon: '🥊',
        badge: 'Olympic Boxing Powerhouse',
        description:
          'Cuba’s legendary boxing academy produced heavyweights Stevenson and Savón, who each won three consecutive Olympic gold medals.',
      },
    ],
  },

  // ==========================================
  // NIGERIA
  // ==========================================
  {
    countryCode: 'NG',
    countryId: '566',
    countryName: 'Nigeria',
    leadBanner: 'Africa’s Most Populous Giant, Nollywood Film Superpower & Global Afrobeats',
    records: [
      {
        title: 'Most Populous Nation in Africa',
        metricOrValue: 'Over 225+ Million Citizens (Giant of Africa)',
        category: 'geography',
        icon: '👥',
        badge: 'Giant of Africa',
        description:
          'Home to one out of every six people on the African continent, with a vibrant young demographic driving technology, business, and cultural innovation.',
      },
      {
        title: 'World’s #2 Largest Film Producing Industry (Nollywood)',
        metricOrValue: 'Produces Over 2,500 Feature Films Annually (Surpassing Hollywood)',
        category: 'culture',
        icon: '🎬',
        badge: 'Nollywood Film Titan',
        description:
          'Nigeria’s prolific cinematic engine produces thousands of films watched across Africa and the global diaspora, employing over one million people.',
      },
      {
        title: 'Global Afrobeats Musical Phenomenon',
        metricOrValue: 'Billions of Worldwide Streams (Burna Boy, Wizkid, Rema, Tems)',
        category: 'culture',
        icon: '🎶',
        badge: 'Global Chart-Topping Sound',
        description:
          'Lagos has become the musical epicenter of the 21st century, with Afrobeats dominating global stadium tours, Grammy awards, and Billboard streaming charts.',
      },
    ],
  },

  // ==========================================
  // BHUTAN
  // ==========================================
  {
    countryCode: 'BT',
    countryId: '064',
    countryName: 'Bhutan',
    leadBanner: 'World’s First Carbon-Negative Nation & Gross National Happiness Pioneer',
    records: [
      {
        title: 'First & Only Carbon-Negative Sovereign Nation on Earth',
        metricOrValue: 'Absorbs Over 3x More Carbon Dioxide Than It Emits',
        category: 'nature',
        icon: '🌲',
        badge: 'World’s Greenest Sovereign State',
        description:
          'Protected by constitutional mandate requiring at least 60% forest cover in perpetuity (currently >72%), Bhutan’s virgin Himalayan forests absorb millions of tons of net CO₂.',
      },
      {
        title: 'Pioneered Gross National Happiness (GNH)',
        metricOrValue: 'Prioritizes Psychological Wellbeing, Cultural Heritage & Ecology Over GDP',
        category: 'culture',
        icon: '🧘',
        badge: 'Alternative to Pure GDP',
        description:
          'Enacted by the Fourth King Jigme Singye Wangchuck in 1972, GNH measures national progress through environmental preservation, good governance, and spiritual wellbeing.',
      },
    ],
  },
];

/**
 * Helper to fetch world leading records for any country.
 */
export function getCountryLeadingProfile(country: {
  code?: string;
  code2?: string;
  id?: string;
  name?: string;
}): CountryLeadingProfile | null {
  if (!country || SHARED_ISO_ENTRIES.has(country.id || '')) return null;

  const code = (country.code || country.code2 || '').toUpperCase();
  const id = country.id ? String(country.id).padStart(3, '0') : '';
  const name = (country.name || '').toLowerCase().trim();

  const found = WORLD_LEADING_PROFILES.find((p) => {
    if (code && p.countryCode.toUpperCase() === code) return true;
    if (id && p.countryId === id) return true;
    if (name && p.countryName.toLowerCase() === name) return true;
    return false;
  });

  return found || null;
}
