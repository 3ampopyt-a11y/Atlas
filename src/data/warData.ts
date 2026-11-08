export type ConflictType =
  | 'Major Interstate War'
  | 'Civil War'
  | 'Insurgency & Guerrilla War'
  | 'Territorial & Border Dispute'
  | 'Strategic Maritime Chokepoint'
  | 'Frozen Conflict & Armistice';

export interface TroopCombatant {
  name: string;
  role: string;
  estimatedTroops: string;
  equipment: string;
  allegiance: string;
}

export interface MilitaryHotspot {
  id: string;
  name: string;
  conflictType: ConflictType;
  region: string;
  coordinates: [number, number]; // [lng, lat]
  threatLevel: 'Critical' | 'High' | 'Elevated';
  status: string;
  startDate: string;
  primaryForces: string[];
  description: string;
  keyAssets: string;

  // In-Depth Troop & Tactical Information
  totalTroopCommitment: string;
  troopBreakdown: TroopCombatant[];
  tacticalDoctrine: string;

  // Deep Context & Strategic Background
  historicalContext: string;
  currentSituation: string;
  casualtiesAndHumanitarian: string;
  geopoliticalSignificance: string;
  notableFrontlines: string[];
}

export const MILITARY_HOTSPOTS: MilitaryHotspot[] = [
  // ==========================================
  // 1. EASTERN EUROPE (UKRAINE / RUSSIA)
  // ==========================================
  {
    id: 'eastern-europe',
    name: 'Eastern European Front (Ukraine-Russia War)',
    conflictType: 'Major Interstate War',
    region: 'Eastern Europe',
    coordinates: [37.5, 48.2],
    threatLevel: 'Critical',
    status: 'Active High-Intensity Attritional Warfare',
    startDate: 'February 2022 (escalated from 2014)',
    primaryForces: ['Armed Forces of Ukraine (ZSU)', 'Russian Armed Forces', 'NATO Forward Presence'],
    description: 'The largest conventional interstate conflict in Europe since World War II, spanning a 1,000+ km frontline characterized by industrial-scale artillery duels, drone-saturated skies, and deep trench fortifications.',
    keyAssets: 'FPV Loitering Munitions, PATRIOT Batteries, HIMARS, Glide Bombs (FAB-500/1500), M1A1 Abrams & Leopard 2 Tanks, Su-34 Strike Jets',
    totalTroopCommitment: '~1,500,000 – 1,800,000 Mobilized Personnel across all theaters',
    troopBreakdown: [
      {
        name: 'Armed Forces of Ukraine (ZSU) & National Guard',
        role: 'Territorial defense, mobile counter-offensives & deep precision strikes',
        estimatedTroops: '~800,000 – 950,000 active & mobilized personnel',
        equipment: 'Western armor (Leopard 2, Bradley IFVs, Challenger 2), HIMARS MLRS, NASAMS, FPV strike drone swarms',
        allegiance: 'Government of Ukraine / NATO Security Assistance',
      },
      {
        name: 'Russian Armed Forces & Volunteer Formations',
        role: 'Combined arms offensives, heavy artillery bombardment & fortified defense belts',
        estimatedTroops: '~600,000 – 680,000 deployed in-theater',
        equipment: 'T-90M & T-72B3 tanks, BMP-3 IFVs, Iskander-M ballistic missiles, Lancet loitering munitions, UMPK glide bombs',
        allegiance: 'Russian Federation (Southern, Western & Central Military Districts)',
      },
      {
        name: 'NATO Enhanced Forward Presence & Eastern Air Shield',
        role: 'Deterrence, intelligence surveillance, reconnaissance (ISR) & supply logistics',
        estimatedTroops: '~40,000 forward-deployed multinational troops in Poland, Baltics & Romania',
        equipment: 'F-35A stealth fighters, MQ-9 Reapers, Aegis Ashore, Patriot air defense',
        allegiance: 'NATO Alliance Member States',
      },
    ],
    tacticalDoctrine: 'Modern hybrid attritional warfare: 24/7 drone surveillance denies armored maneuvers in the "transparent battlefield," turning open ground into lethal kill zones. Combat relies on subterranean bunker complexes, multi-layered minefields (Dragon’s teeth and Sapper belts), massed 152mm/155mm counter-battery artillery, and satellite-guided glide bombs obliterating fortified defensive positions.',
    historicalContext: 'Stemming from Russia’s 2014 annexation of Crimea and military intervention in the Donbas following Ukraine’s Revolution of Dignity. In February 2022, Moscow launched a full-scale invasion seeking to prevent Ukraine’s integration into NATO and European institutions. Ukraine re-asserted complete sovereign territorial integrity based on 1991 borders.',
    currentSituation: 'Fierce attritional engagements across the Donbas salient (Pokrovsk, Chasiv Yar, Toretsk), Russian cross-border pressure in Kharkiv, and Ukrainian operational counter-incursions into Russia’s Kursk Oblast.',
    casualtiesAndHumanitarian: 'Estimated combined military casualties exceed 1,000,000 killed and wounded. Over 6 million Ukrainian refugees displaced across Europe, with extensive destruction of electrical grids and urban infrastructure.',
    geopoliticalSignificance: 'Reshaped global security: led to historic NATO expansion with Finland and Sweden joining, accelerated European defense rearmament, triggered sweeping international sanctions, and redefined 21st-century warfare doctrine worldwide.',
    notableFrontlines: ['Pokrovsk & Kurakhove Sector', 'Chasiv Yar High Ground', 'Kupiansk-Oskil River Line', 'Kursk Operational Buffer Zone', 'Zaporizhzhia Southern Axis'],
  },

  // ==========================================
  // 2. MIDDLE EAST (GAZA & ISRAEL)
  // ==========================================
  {
    id: 'gaza-israel',
    name: 'Gaza Strip & Israel-Hamas War',
    conflictType: 'Major Interstate War',
    region: 'Middle East',
    coordinates: [34.42, 31.45],
    threatLevel: 'Critical',
    status: 'High-Intensity Urban Combat & Counter-Insurgency',
    startDate: 'October 2023 (escalated from decades-long conflict)',
    primaryForces: ['Israel Defense Forces (IDF)', 'Izz ad-Din al-Qassam Brigades (Hamas)', 'Palestinian Islamic Jihad (PIJ)'],
    description: 'Devastating urban warfare inside one of Earth’s most densely populated coastal enclaves, characterized by extensive subterranean tunnel warfare, close-quarter sniper duels, and missile barrages.',
    keyAssets: 'Iron Dome, Trophy-Equipped Merkava Mk 4 Tanks, F-35I Adir, Yasin-105 Anti-Tank RPGs, Subterranean Metro Tunnels',
    totalTroopCommitment: '~380,000 Combined Troops & Paramilitaries',
    troopBreakdown: [
      {
        name: 'Israel Defense Forces (IDF)',
        role: 'Combined arms urban clearing, tunnel demolition, precision air strikes & border perimeter control',
        estimatedTroops: '~300,000 mobilized reservists and active ground brigades',
        equipment: 'Merkava Mk 4 MBTs, Namer heavy APCs, D9 armored bulldozers, Heron TP UAVs, precision-guided munitions',
        allegiance: 'State of Israel',
      },
      {
        name: 'Izz ad-Din al-Qassam Brigades & Allied Factions',
        role: 'Asymmetric urban guerrilla defense, underground ambushes, mortar & rocket strikes',
        estimatedTroops: '~20,000 – 30,000 combatants (heavily degraded by sustained fighting)',
        equipment: 'Yasin-105 tandem-charge RPGs, sniper rifles, Rajum short-range rockets, tunnel network booby-traps',
        allegiance: 'Hamas / "Axis of Resistance"',
      },
    ],
    tacticalDoctrine: 'Three-dimensional subterranean urban combat: the IDF uses seismic radar, combat engineers (Yahalom), robotic dogs, and subterranean flooding/explosives to neutralize the hundreds of kilometers of fortified underground tunnels ("Gaza Metro"), while Hamas uses hit-and-run tunnel shaft ambushes and remote IEDs.',
    historicalContext: 'Triggered by the October 7, 2023 cross-border surprise assault by Hamas into southern Israeli communities and military outposts. Roots date back to the 1948 Arab-Israeli war, the 1967 Six-Day War, and the post-2007 blockade following Hamas seizing control of the strip.',
    currentSituation: 'Intense localized clearing operations in northern and southern Gaza (Jabalia, Rafah, Khan Younis), with persistent cross-border rocket fire and high civilian displacement.',
    casualtiesAndHumanitarian: 'Over 45,000 Palestinians reported killed with vast majority of the 2.2 million population displaced multiple times; severe humanitarian shortages of water, medical care, and food. Over 1,200 Israelis killed on October 7 and hundreds of soldiers killed in combat.',
    geopoliticalSignificance: 'Sparked unprecedented regional multi-front escalation involving Hezbollah in Lebanon, Houthis in Yemen, and direct missile exchanges between Iran and Israel, disrupting Middle East normalization initiatives.',
    notableFrontlines: ['Jabalia Refugee Camp Perimeter', 'Philadelphi Corridor (Egypt-Gaza Border)', 'Netzarim Corridor Dividing Axis', 'Rafah City Center'],
  },

  // ==========================================
  // 3. LEBANON BORDER (ISRAEL / HEZBOLLAH)
  // ==========================================
  {
    id: 'lebanon-border',
    name: 'Southern Lebanon & Israel-Hezbollah Front',
    conflictType: 'Major Interstate War',
    region: 'Middle East',
    coordinates: [35.38, 33.15],
    threatLevel: 'Critical',
    status: 'Active Ground Offensive & Aerial Bombardment Campaign',
    startDate: 'October 2023 (full ground escalation September 2024)',
    primaryForces: ['Israel Defense Forces (Northern Command)', 'Hezbollah Islamic Resistance (Radwan Force)', 'UNIFIL Peacekeepers'],
    description: 'Mountainous cross-border war featuring intensive Israeli air campaigns and ground incursions into southern Lebanon to eliminate Hezbollah rocket launch sites, tunnel complexes, and Radwan elite units.',
    keyAssets: 'David’s Sling & Arrow 3 Missiles, Spike ATGMs, F-15I Ra’am, Fateh-110 Precision Missiles, Kornet-EM ATGMs',
    totalTroopCommitment: '~160,000 Combatants & Peacekeepers',
    troopBreakdown: [
      {
        name: 'IDF Northern Command (Divisions 98, 91, 36, 146)',
        role: 'Border incursions, clearing border ridge villages, destroying tunnel shafts and rocket caches',
        estimatedTroops: '~70,000 – 100,000 active & reserve troops deployed to northern sector',
        equipment: 'Merkava tanks, Iron Dome batteries, precision bunker-buster bombs, Hermes 900 drones',
        allegiance: 'State of Israel',
      },
      {
        name: 'Hezbollah (Radwan Special Forces & Regional Units)',
        role: 'Mountainous guerrilla defense, anti-tank ambush cells, long-range missile salvos into central Israel',
        estimatedTroops: '~40,000 – 50,000 trained fighters (supported by reserve militia)',
        equipment: 'Over 100,000 rockets (Katyusha, Fajr-5, Zelzal), Kornet anti-tank missiles, Qader precision ballistic missiles',
        allegiance: 'Hezbollah / Iranian IRGC Quds Force backing',
      },
      {
        name: 'UNIFIL (United Nations Interim Force in Lebanon)',
        role: 'Monitoring the Blue Line boundary and protecting civilian corridors',
        estimatedTroops: '~10,000 peacekeepers from 50 nations',
        equipment: 'Armored patrol vehicles, surveillance towers, naval interdiction units',
        allegiance: 'United Nations Security Council (Resolution 1701)',
      },
    ],
    tacticalDoctrine: 'Rocky terrain guerrilla warfare meets high-precision aerospace strikes: Hezbollah relies on hardened underground command centers excavated deep into limestone hills, concealed rocket launchers, and anti-tank guided missile ambushes, countered by IDF precision standoff munitions and combined arms armor sweeps.',
    historicalContext: 'Hezbollah initiated rocket barrages on October 8, 2023 in solidarity with Gaza. Historical roots include the 1982 Israeli invasion, the 18-year occupation of southern Lebanon, and the 2006 Lebanon War. UN Resolution 1701 called for Hezbollah to withdraw north of the Litani River.',
    currentSituation: 'Intensive Israeli airstrikes targeting leadership compounds in Beirut’s Dahiyeh and weapons depots across the Bekaa Valley, alongside ground clashes in border towns (Maroun al-Ras, Khiam).',
    casualtiesAndHumanitarian: 'Over 3,500 Lebanese killed and over 1.2 million civilians displaced. Over 60,000 northern Israeli residents displaced due to continuous rocket and drone fire.',
    geopoliticalSignificance: 'Central pillar of Iran’s deterrent network facing structural degradation; major risk of escalating into all-out direct regional war with Iran.',
    notableFrontlines: ['Khiam Ridge Sector', 'Bint Jbeil Triangle', 'Litani River Buffer Zone', 'Beirut Southern Suburbs (Dahiyeh)'],
  },

  // ==========================================
  // 4. SUDAN CIVIL WAR (SAF vs RSF)
  // ==========================================
  {
    id: 'sudan-civil-war',
    name: 'Sudan Civil War (SAF vs RSF)',
    conflictType: 'Civil War',
    region: 'Sub-Saharan Africa',
    coordinates: [32.53, 15.63],
    threatLevel: 'Critical',
    status: 'High-Intensity Civil War & Severe Humanitarian Famine',
    startDate: 'April 2023',
    primaryForces: ['Sudanese Armed Forces (SAF)', 'Rapid Support Forces (RSF)', 'Joint Darfur Protection Force'],
    description: 'Catastrophic struggle for control of Sudan between two rival military generals (Burhan vs Hemedti), creating the world’s largest displacement and starvation crisis.',
    keyAssets: 'Armed Technicals (DshK / ZU-23), MiG-29 & Su-25 Jets, Mohajer-6 Drones, Heavy Artillery, Armed Gunboats',
    totalTroopCommitment: '~320,000 Armed Combatants',
    troopBreakdown: [
      {
        name: 'Sudanese Armed Forces (SAF - General Abdel Fattah al-Burhan)',
        role: 'Conventional state defense, air superiority strikes, artillery defense of Port Sudan and northern safe havens',
        estimatedTroops: '~200,000 active military and allied popular defense forces',
        equipment: 'Soviet-era tanks (T-72, T-55), BTR armored carriers, fighter jets, Iranian-supplied Mohajer-6 drones',
        allegiance: 'Government of Sudan (Sovereign Council)',
      },
      {
        name: 'Rapid Support Forces (RSF - General Mohamed Hamdan Dagalo "Hemedti")',
        role: 'Rapid mobile raids, urban seizure of Khartoum, territorial dominance in Darfur & Kordofan',
        estimatedTroops: '~100,000 – 120,000 veteran paramilitaries',
        equipment: 'Thousands of high-mobility 4x4 pickup trucks mounted with anti-aircraft guns, Kornet ATGMs, MANPADS',
        allegiance: 'RSF Leadership (alleged regional sponsor backing)',
      },
    ],
    tacticalDoctrine: 'Asymmetric mobile cavalry warfare against conventional combined arms: RSF uses rapid waves of armed pickup technicals to overwhelm garrisons and blend into residential neighborhoods, neutralizing SAF’s heavy armor advantage. SAF responds with heavy air and drone strikes and long-range artillery.',
    historicalContext: 'Roots lie in the Janjaweed militias organized by the former Bashir regime to suppress Darfur rebellions in the 2000s, later formalized into the RSF. After jointly ousting Omar al-Bashir in 2019 and staging a coup in 2021, tensions between SAF and RSF over integration into a single army exploded into war on April 15, 2023.',
    currentSituation: 'SAF holds Port Sudan (temporary administrative capital) and eastern provinces; RSF controls most of Khartoum and has besieged El Fasher, the last SAF stronghold in Darfur.',
    casualtiesAndHumanitarian: 'Estimated over 150,000 dead directly and indirectly. Over 11 million people forcibly displaced (the world’s largest displacement crisis); catastrophic famine threatens over 25 million people across Darfur, Kordofan, and Khartoum.',
    geopoliticalSignificance: 'Destabilizes the Sahel, Horn of Africa, and Red Sea coast; regional powers vie for influence over Sudan’s vast gold reserves, agricultural land, and Port Sudan naval access.',
    notableFrontlines: ['El Fasher Siege (North Darfur)', 'Khartoum-Bahri-Omdurman Tri-City Conurbation', 'Al Jazirah Agricultural Heartland', 'Sennar & Blue Nile Approach'],
  },

  // ==========================================
  // 5. MYANMAR CIVIL WAR (OPERATION 1027)
  // ==========================================
  {
    id: 'myanmar-civil-war',
    name: 'Myanmar Civil War & Operation 1027',
    conflictType: 'Civil War',
    region: 'Southeast Asia',
    coordinates: [98.15, 22.95],
    threatLevel: 'Critical',
    status: 'Widespread Multi-Front Civil War & Rebel Coalition Advances',
    startDate: 'February 2021 (Operation 1027 launched October 2023)',
    primaryForces: ['Myanmar Military Junta (Tatmadaw)', 'Three Brotherhood Alliance (MNDAA, TNLA, AA)', 'People’s Defense Forces (PDF)', 'Karen National Liberation Army (KNLA)'],
    description: 'Nationwide armed uprising against the military junta that seized power in a 2021 coup. Allied ethnic armed organizations and civilian resistance have liberated vast border territories and strategic border trading gates with China and Thailand.',
    keyAssets: 'Commercial Drop Drones (Octocopters), Su-30SME & Yak-130 Attack Jets, Mi-17/Mi-24 Gunships, Improvised Armored Vehicles, 3D-Printed Firearms (FGC-9)',
    totalTroopCommitment: '~320,000 Armed Combatants',
    troopBreakdown: [
      {
        name: 'Myanmar Armed Forces (Tatmadaw Junta - SAC)',
        role: 'Regime survival, urban garrison defense, scorched-earth air strikes and artillery terror campaigns',
        estimatedTroops: '~130,000 – 150,000 combat troops (severely depleted by mass surrenders and casualties)',
        equipment: 'Russian & Chinese jet fighters (MiG-29, Su-30, FTC-2000), Mi-35 gunships, howitzers, armored vehicles',
        allegiance: 'State Administration Council (Senior General Min Aung Hlaing)',
      },
      {
        name: 'Three Brotherhood Alliance (MNDAA, TNLA, Arakan Army)',
        role: 'Offensive ground operations, capturing junta regional command bases and vital border trade corridors',
        estimatedTroops: '~60,000 veteran ethnic combatants',
        equipment: 'Type 81 assault rifles, sniper rifles, anti-tank missiles, commercial bombing drones, captured junta armor',
        allegiance: 'Ethnic Armed Organizations (EAOs)',
      },
      {
        name: 'People’s Defense Forces (PDF) & NUG Allied Brigades',
        role: 'Guerrilla warfare, ambushes on military supply convoys, rural administration across Central Bamar heartland',
        estimatedTroops: '~80,000 – 100,000 young volunteer fighters',
        equipment: '3D-printed small arms, captured rifles, DIY explosive drones, improvised rocket launchers',
        allegiance: 'National Unity Government (NUG)',
      },
    ],
    tacticalDoctrine: 'Drone-led revolutionary jungle and urban guerrilla warfare: ethnic armies and youth resistance fly hundreds of modified commercial agricultural drones dropping 60mm and 81mm mortar rounds on junta command posts with pinpoint accuracy, collapsing fortified bases without traditional heavy artillery.',
    historicalContext: 'Triggered by the February 1, 2021 military coup against the democratically elected government of Aung San Suu Kyi. Followed decades of ethnic minority conflict dating back to Myanmar’s independence from Britain in 1948.',
    currentSituation: 'The junta has lost control of over 60% of national territory, including the entire northern Shan border with China, most of Rakhine State, and key crossing points to Thailand and India. The junta relies almost entirely on indiscriminate aerial bombing.',
    casualtiesAndHumanitarian: 'Over 50,000 estimated combat and civilian deaths; over 3 million internally displaced persons; catastrophic collapse of healthcare, education, and economy.',
    geopoliticalSignificance: 'Threatens China’s Belt and Road pipeline corridor to the Indian Ocean; major source of transnational cyber-scam compounds and drug trafficking along Southeast Asian borders.',
    notableFrontlines: ['Lashio & Northern Shan State', 'Rakhine State Coast & Sittwe', 'Karen State Myawaddy Border Crossing', 'Sagaing & Magway Central Heartlands'],
  },

  // ==========================================
  // 6. DR CONGO (M23 / KIVU WAR)
  // ==========================================
  {
    id: 'drc-kivu',
    name: 'Eastern DR Congo & North Kivu War (M23 Conflict)',
    conflictType: 'Civil War',
    region: 'Sub-Saharan Africa',
    coordinates: [29.23, -1.67],
    threatLevel: 'Critical',
    status: 'Escalating Interstate Proxy Warfare & Mass Displacement',
    startDate: 'November 2021 (resurgence of 2012 conflict)',
    primaryForces: ['Armed Forces of the DRC (FARDC)', 'M23 Rebel Movement (ARC)', 'Rwandan Defence Force (RDF)', 'SAMIDRC (Southern African Development Community)', 'Wazalendo Patriotic Militias'],
    description: 'Resource-driven proxy war in the mineral-rich mountains of North Kivu bordering Rwanda, threatening the provincial capital of Goma and mineral supply chains for tantalum, coltan, and gold.',
    keyAssets: 'CH-4 Combat Drones, Heavy Mortars, T-72 Tanks, Shoulder-Fired Surface-to-Air Missiles (MANPADS), Radar Jamming',
    totalTroopCommitment: '~190,000 Combatants & Peacekeepers',
    troopBreakdown: [
      {
        name: 'FARDC (DRC Armed Forces) & Foreign Contractors',
        role: 'Defending provincial capitals, artillery counter-strikes, coordination with Southern African allies',
        estimatedTroops: '~120,000 troops deployed across eastern provinces',
        equipment: 'CH-4 combat drones, Su-25 ground-attack jets, Soviet artillery, armored personnel carriers',
        allegiance: 'Government of the Democratic Republic of the Congo (President Félix Tshisekedi)',
      },
      {
        name: 'March 23 Movement (M23 / ARC) & Alleged RDF Reinforcements',
        role: 'Seizing strategic highways, surrounding Goma, controlling coltan and tin mining corridors',
        estimatedTroops: '~6,000 – 10,000 disciplined combatants (with advanced foreign equipment)',
        equipment: 'Advanced MANPADS, thermal night vision, GPS-guided mortars, vehicle-mounted heavy machine guns',
        allegiance: 'M23 High Command / Documented Rwandan military logistical backing (denied by Kigali)',
      },
      {
        name: 'SAMIDRC (SADC Mission in the DRC - South Africa, Tanzania, Malawi)',
        role: 'Reinforcing Congolese defenses, heavy artillery support, maintaining Goma perimeter',
        estimatedTroops: '~5,000 troops from South Africa, Tanzania, and Malawi',
        equipment: 'Rooivalk attack helicopters, Caspir armored vehicles, 155mm G5 howitzers',
        allegiance: 'Southern African Development Community',
      },
    ],
    tacticalDoctrine: 'Mountain ridgeline interdiction: M23 exploits volcanic terrain around Virunga National Park and Lake Kivu to sever supply highways (RN2 and RN4) into Goma, using sophisticated MANPADS to neutralize Congolese fighter jets and attack helicopters.',
    historicalContext: 'Deep roots in the 1994 Rwandan Genocide, which pushed over a million Hutu refugees into eastern Zaire/Congo, triggering the First and Second Congo Wars (1996–2003). M23 originally mutinied in 2012 claiming non-implementation of peace accords protecting Congolese Tutsis.',
    currentSituation: 'M23 controls major towns (Rutshuru, Masisi, Rubaya coltan hub) and has virtually encircled Goma, cutting off road access and leaving only lake transport to Bukavu.',
    casualtiesAndHumanitarian: 'Over 2.5 million people displaced in North Kivu alone; squalid camps around Goma face severe cholera outbreaks and malnutrition; ongoing reports of war crimes and mineral looting.',
    geopoliticalSignificance: 'Controls the world’s most critical deposits of coltan and tantalum vital for smartphones and electric vehicle batteries; threatens direct interstate war between DRC and Rwanda.',
    notableFrontlines: ['Sake Defense Perimeter (Gateway to Goma)', 'Rubaya Strategic Coltan Mining Center', 'Rutshuru-Bunagana Border Highway', 'Masisi Mountain Highlands'],
  },

  // ==========================================
  // 7. YEMEN & RED SEA CHOKEPOINT
  // ==========================================
  {
    id: 'middle-east-gulf',
    name: 'Yemen Crisis & Red Sea Maritime Blockade',
    conflictType: 'Strategic Maritime Chokepoint',
    region: 'Middle East',
    coordinates: [43.5, 13.5],
    threatLevel: 'Critical',
    status: 'Asymmetric Anti-Shipping Campaign & International Naval Interception',
    startDate: 'November 2023 (escalated from 2014 civil war)',
    primaryForces: ['Ansar Allah (Houthi Armed Forces)', 'US Navy & Combined Maritime Forces (Operation Prosperity Guardian)', 'Royal Navy', 'Yemeni Presidential Leadership Council (PLC)'],
    description: 'Strategic confrontation at the Bab el-Mandeb strait where Houthi forces deploy anti-ship ballistic missiles, kamikaze drones, and explosive USVs against international container and energy shipping.',
    keyAssets: 'Aegis Destroyers (SM-2, SM-3, SM-6), Anti-Ship Ballistic Missiles (Asef, Tankeel), Samad-3 Drones, Uncrewed Surface Vessels (USVs), Tomahawk Cruise Missiles',
    totalTroopCommitment: '~250,000 Combatants & Naval Personnel',
    troopBreakdown: [
      {
        name: 'Ansar Allah (Houthi Movement)',
        role: 'Coastal anti-ship missile volleys, long-range drone launches towards Israel, territorial defense in Sanaa',
        estimatedTroops: '~180,000 – 200,000 mobilized fighters and missile units',
        equipment: 'Anti-ship ballistic and cruise missiles, loitering munition drones, naval mines, armed coastal speedboats',
        allegiance: 'Ansar Allah Supreme Political Council / Iranian "Axis of Resistance"',
      },
      {
        name: 'Combined Maritime Coalition (US 5th Fleet / UK Royal Navy)',
        role: 'Naval escort of merchant convoys, intercepting aerial threats, retaliatory strikes on radar and launch sites',
        estimatedTroops: '~15,000 naval personnel deployed across Red Sea & Gulf of Aden',
        equipment: 'Arleigh Burke Aegis destroyers, Type 45 destroyers, F/A-18 Super Hornets, Ohio-class SSGN submarines',
        allegiance: 'United States, United Kingdom, and multinational maritime coalition',
      },
    ],
    tacticalDoctrine: 'First operational use of anti-ship ballistic missiles in naval combat history: Houthis combine coastal radar, commercial AIS tracking, and Iranian surveillance intelligence to launch hypersonic ballistic missiles in coordination with low-flying one-way attack drones to overwhelm shipborne Aegis combat systems.',
    historicalContext: 'Began in 2014 when Houthi rebels seized the Yemeni capital Sanaa, prompting a Saudi-led military coalition intervention in 2015. In late 2023, Houthis declared a maritime blockade on Israeli-linked shipping in support of Gaza, later expanding targets to US and UK naval vessels.',
    currentSituation: 'Global shipping diverted around the Cape of Good Hope, adding 10-14 days transit and billions in freight costs; persistent US and UK airstrikes on Houthi underground launch facilities around Hodeidah and Sanaa.',
    casualtiesAndHumanitarian: 'Over 377,000 Yemenis killed directly and indirectly since 2015; millions face food insecurity; maritime strikes have caused several sunken merchant vessels (e.g., Rubymar, Tutor).',
    geopoliticalSignificance: 'Chokepoint through which 12-15% of global maritime commerce and 30% of global container traffic normally passes; tests superpower naval freedom-of-navigation deterrence.',
    notableFrontlines: ['Bab el-Mandeb Chokepoint Corridor', 'Hodeidah Port & Coastal Launch Sites', 'Gulf of Aden Transit Lanes', 'Marib Desert Oil Frontline'],
  },

  // ==========================================
  // 8. SYRIAN CIVIL WAR & RESIDUAL INSURGENCY
  // ==========================================
  {
    id: 'syria-war',
    name: 'Syrian Multi-Theater Conflict (Idlib, North & East)',
    conflictType: 'Civil War',
    region: 'Middle East',
    coordinates: [36.65, 35.92],
    threatLevel: 'High',
    status: 'Fragmented Partition & Multi-Front Proxy Clashes',
    startDate: 'March 2011',
    primaryForces: ['Syrian Arab Army (SAA)', 'Hay\'at Tahrir al-Sham (HTS)', 'Syrian National Army (Turkish-backed)', 'Syrian Democratic Forces (SDF/Kurdish)', 'US & Russian Expeditionary Forces'],
    description: 'Thirteen-year-long war that fragmented Syria into multiple hostile zones of control, featuring frequent artillery bombardment, drone strikes, and subterranean clashes.',
    keyAssets: 'Russian Aerospace Forces (VKS), Bayraktar TB2 Drones, T-90 Tanks, BM-21 Grad MLRS, US MQ-9 Reapers',
    totalTroopCommitment: '~340,000 Combined Troops & Paramilitaries',
    troopBreakdown: [
      {
        name: 'Syrian Arab Army (SAA) & Iranian-Backed Brigades',
        role: 'Regime territory defense, front-line artillery bombardment of Idlib, desert counter-insurgency',
        estimatedTroops: '~140,000 – 160,000 active troops and allied militias (Liwa Fatemiyoun, Hezbollah)',
        equipment: 'T-72/T-90 tanks, Pantsir-S1 air defense, Russian Su-24/Su-34 air support, heavy artillery',
        allegiance: 'Syrian Arab Republic (Bashar al-Assad) / Russia & Iran',
      },
      {
        name: 'Hay\'at Tahrir al-Sham (HTS) & Idlib Factions',
        role: 'Fortified defense of Greater Idlib enclave, subterranean raid operations, anti-regime counter-artillery',
        estimatedTroops: '~30,000 – 40,000 disciplined militant fighters',
        equipment: 'T-55/T-62 tanks, armored VBIEDs, anti-tank guided missiles, reconnaissance quadcopters',
        allegiance: 'Syrian Salvation Government (Idlib)',
      },
      {
        name: 'Syrian Democratic Forces (SDF - Kurdish YPG Core)',
        role: 'Controlling Autonomous Administration of North and East Syria (Rojava) and guarding ISIS detention centers',
        estimatedTroops: '~60,000 – 70,000 fighters',
        equipment: 'US-supplied armored vehicles, mortars, light infantry arms, US air support coordination',
        allegiance: 'AANES / Backed by US Operation Inherent Resolve (~900 US troops)',
      },
    ],
    tacticalDoctrine: 'Static entrenched contact lines combined with targeted air and drone decapitation strikes: Idlib front features deep concrete trenches and tunnel networks, while eastern deserts (Badia) see mobile ISIS remnant ambushes against military convoys.',
    historicalContext: 'Began during the 2011 Arab Spring with peaceful protests that were met with brutal crackdowns, spiraling into a sectarian civil war that drew in global powers (Russia, USA, Turkey, Iran) and spawned ISIS.',
    currentSituation: 'Syria remains de facto partitioned: the Assad government controls ~65% of territory; Kurdish-led SDF controls the oil-rich northeast; HTS controls Idlib; Turkish-backed Syrian National Army controls northern border strips.',
    casualtiesAndHumanitarian: 'Over 500,000 dead; over 12 million displaced (6.8 million refugees abroad, predominantly in Turkey, Lebanon, Jordan, and Europe); 90% of population living below poverty line.',
    geopoliticalSignificance: 'Hosts Russian naval facility in Tartus and Khmeimim airbase; key overland weapons pipeline from Iran to Hezbollah; ongoing friction point between Turkish military and Kurdish forces.',
    notableFrontlines: ['Idlib-Aleppo M4/M5 Highway Axis', 'Manbij & Tel Rifaat Kurdish-Turkish Front', 'Deir ez-Zor Euphrates River Dividing Line', 'Syrian Badia Desert (Anti-ISIS Sweeps)'],
  },

  // ==========================================
  // 9. SOMALIA & AL-SHABAAB
  // ==========================================
  {
    id: 'somalia-shabaab',
    name: 'Somali Civil War & Counter-Al-Shabaab Campaign',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Sub-Saharan Africa',
    coordinates: [45.32, 2.04],
    threatLevel: 'High',
    status: 'Ongoing Counter-Insurgency Offensive & Transition to AUSSOM',
    startDate: '2006 (escalated from 1991 civil war)',
    primaryForces: ['Somali National Army (SNA)', 'Al-Shabaab (Al-Qaeda Affiliate)', 'African Union Support and Stabilization Mission (AUSSOM/ATMIS)', 'US Africa Command (AFRICOM)'],
    description: 'Long-running counter-insurgency war across southern and central Somalia pitting federal armed forces and African Union troops against the deadly Al-Qaeda affiliate Al-Shabaab.',
    keyAssets: 'Bayraktar TB2 Drones, US MQ-9 Reaper Drones, Mine-Resistant Ambush Protected (MRAP) Vehicles, VBIEDs',
    totalTroopCommitment: '~75,000 Troops & Insurgents',
    troopBreakdown: [
      {
        name: 'Somali National Army (SNA) & "Danab" Special Forces',
        role: 'Re-taking rural district capitals, clan militia coordination (Ma\'awisley), clearing river valleys',
        estimatedTroops: '~35,000 – 45,000 soldiers',
        equipment: 'Turkish-trained Gorgor commandos, US-trained Danab brigade, MRAPs, Bayraktar TB2 strike drones',
        allegiance: 'Federal Government of Somalia (Mogadishu)',
      },
      {
        name: 'Al-Shabaab (Harakat al-Shabaab al-Mujahideen)',
        role: 'Rural insurgent governance, taxation, complex hotel and military base suicide bombings, rural ambushes',
        estimatedTroops: '~7,000 – 12,000 hardened insurgent fighters',
        equipment: 'Suicide vehicle bombs (SVBIEDs), IEDs, RPG-7s, DShK heavy machine guns, captured weaponry',
        allegiance: 'Al-Qaeda Global Network',
      },
      {
        name: 'African Union Mission (ATMIS / Transitioning to AUSSOM)',
        role: 'Static protection of airports, presidential palace, major supply routes, and urban centers',
        estimatedTroops: '~14,000 – 18,000 troops from Uganda, Kenya, Burundi, Djibouti, Ethiopia',
        equipment: 'Heavy armor, BTR-80s, armored recovery vehicles, Mi-17 helicopters',
        allegiance: 'African Union / UN Security Council Mandate',
      },
    ],
    tacticalDoctrine: 'Asymmetric rural-to-urban insurgent warfare: Al-Shabaab exploits vast scrubland terrain to isolate government-held towns through checkpoints and IEDs, while mounting catastrophic multi-stage suicide truck bombings (SVBIEDs) followed by assault squads storming military bases and hotels.',
    historicalContext: 'Emerged from the Islamic Courts Union in 2006 after an Ethiopian military intervention toppled the courts in Mogadishu. Al-Shabaab formally pledged allegiance to Al-Qaeda in 2012, aiming to establish an Islamic state across the Horn of Africa.',
    currentSituation: 'President Hassan Sheikh Mohamud launched a historic national offensive backed by local clan militias ("Ma\'awisley"), liberating dozens of towns in Hirshabelle and Galmudug; Al-Shabaab retains strongholds in Jubaland and Middle Juba.',
    casualtiesAndHumanitarian: 'Hundreds of thousands dead over three decades; recurring droughts and insurgent blockades exacerbate extreme hunger; tens of thousands of casualties from terror bombings.',
    geopoliticalSignificance: 'Secures the vital shipping crossroads connecting the Indian Ocean to the Gulf of Aden; regional tensions heightened by Ethiopia-Somaliland memorandum over naval access.',
    notableFrontlines: ['Lower Shabelle River Basin', 'Hiiraan & Middle Shabelle Heartland', 'Jubaland Southern Axis', 'Mogadishu Urban Security Ring'],
  },

  // ==========================================
  // 10. SAHEL TRI-BORDER (MALI, BURKINA, NIGER)
  // ==========================================
  {
    id: 'sahel-insurgency',
    name: 'Sahel Tri-Border Insurgency (Liptako-Gourma)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Sub-Saharan Africa',
    coordinates: [0.15, 14.5],
    threatLevel: 'Critical',
    status: 'Spreading Jihadist Insurgency & Military Junta Consolidation',
    startDate: '2012 (dramatic surge 2021–present)',
    primaryForces: ['Alliance of Sahel States (AES - Mali, Burkina Faso, Niger)', 'Jama\'at Nasr al-Islam wal-Muslimin (JNIM / Al-Qaeda)', 'Islamic State Sahel Province (ISGS)', 'Russian Africa Corps (ex-Wagner)'],
    description: 'Rapidly expanding desert and savannah war across the fragile border junction of Mali, Burkina Faso, and Niger, where military juntas expelled French and UN troops and turned to Russian mercenaries.',
    keyAssets: 'Bayraktar TB2 Drones, Russian Africa Corps (Wagner) Air & Armor Units, Super Tucano Light Attack Aircraft, Motorbike Guerrilla Columns',
    totalTroopCommitment: '~115,000 Soldiers, Mercenaries & Insurgents',
    troopBreakdown: [
      {
        name: 'Alliance of Sahel States Armies (Mali FAMa, Burkina Faso FDS, Niger FAN)',
        role: 'Defending garrison towns, escorting supply convoys, drone strikes on insurgent columns',
        estimatedTroops: '~75,000 military troops + ~50,000 Volunteers for the Defense of the Homeland (VDP)',
        equipment: 'Bayraktar TB2 drones, Mi-24/35 gunships, Norinco armored vehicles, AK-47 rifles',
        allegiance: 'Military Juntas of Mali (Goïta), Burkina Faso (Traoré), and Niger (Tiani)',
      },
      {
        name: 'Russian Africa Corps (formerly Wagner Group)',
        role: 'Forward combat operations, special reconnaissance, garrison training, VIP protection',
        estimatedTroops: '~2,000 – 3,500 Russian combat mercenaries',
        equipment: 'BTR-82A APCs, Pantsir systems, armed helicopters, specialized sniper/mortar units',
        allegiance: 'Russian Ministry of Defense / Sahel Juntas',
      },
      {
        name: 'Jama\'at Nasr al-Islam wal-Muslimin (JNIM) & Islamic State (ISGS)',
        role: 'Village sieges, ambushing military outposts, cutting off national highways, rural taxation',
        estimatedTroops: '~10,000 – 15,000 mobile fighters',
        equipment: 'Fleets of motorbikes, RPG-7s, heavy machine guns, IEDs, captured military vehicles',
        allegiance: 'Al-Qaeda (JNIM) / Islamic State Global Network (ISGS)',
      },
    ],
    tacticalDoctrine: 'High-mobility motorcycle swarming: hundreds of insurgent fighters on desert motorbikes conduct coordinated dawn assaults on remote military outposts, rapidly dispersing into bushland before combat drones or air support can scramble.',
    historicalContext: 'Began in 2012 when Tuareg separatist rebels and Islamist fighters seized northern Mali after the fall of Libya’s Gaddafi. French forces intervened (Operation Serval/Barkhane) in 2013, but recurring military coups between 2020 and 2023 saw French troops expelled in favor of Moscow.',
    currentSituation: 'Burkina Faso’s government controls less than 50% of national territory with dozens of towns under insurgent siege; in northern Mali, FAMa and Africa Corps face heavy counter-attacks from Tuareg rebels (CSP) and JNIM around Tinzaouaten.',
    casualtiesAndHumanitarian: 'Over 12,000 fatalities reported in 2023–2024 alone; over 3 million people displaced across the Sahel; severe food insecurity and closure of thousands of schools.',
    geopoliticalSignificance: 'Spillover threatening coastal West African democracies (Ghana, Togo, Benin, Côte d’Ivoire); strategic uranium deposits in Niger; expanded Russian geopolitical footprint replacing Western presence.',
    notableFrontlines: ['Liptako-Gourma Tri-Border Junction', 'Tinzaouaten & Kidal Northern Mali Desert', 'Djibo & Dori Besieged Corridors (Burkina Faso)', 'Tillabéri Region (Niger)'],
  },

  // ==========================================
  // 11. ETHIOPIAN REGIONAL CONFLICTS
  // ==========================================
  {
    id: 'ethiopia-internal',
    name: 'Ethiopian Regional Conflicts (Amhara / Fano & Oromia / OLA)',
    conflictType: 'Civil War',
    region: 'Sub-Saharan Africa',
    coordinates: [38.74, 11.12],
    threatLevel: 'High',
    status: 'Multi-Front Internal Insurgency & State of Emergency',
    startDate: '2023 (following the 2020–2022 Tigray War)',
    primaryForces: ['Ethiopian National Defense Force (ENDF)', 'Amhara "Fano" Ethnic Militias', 'Oromo Liberation Army (OLA / OLF-Shane)'],
    description: 'Post-Tigray war internal conflicts where the federal government battles decentralized ethnic militias in the country’s two most populous regions: Amhara and Oromia.',
    keyAssets: 'Bayraktar TB2 & Wing Loong Drones, Su-27 Fighters, Armored Personnel Carriers, Heavy Howitzers',
    totalTroopCommitment: '~250,000 Combatants & Militias',
    troopBreakdown: [
      {
        name: 'Ethiopian National Defense Force (ENDF) & Federal Police',
        role: 'Urban garrison security, drone strikes on rural insurgent bases, clearing highway corridors',
        estimatedTroops: '~180,000 – 200,000 regular troops',
        equipment: 'Armed UAVs (TB2, Wing Loong), heavy artillery, Soviet-era tanks, armored personnel carriers',
        allegiance: 'Federal Democratic Republic of Ethiopia (Prime Minister Abiy Ahmed)',
      },
      {
        name: 'Amhara "Fano" Regional Militias',
        role: 'Guerrilla ambushes, seizing rural district centers, resisting federal disarmament programs',
        estimatedTroops: '~40,000 – 60,000 decentralized fighters',
        equipment: 'Small arms, assault rifles, machine guns, RPGs, captured federal vehicles',
        allegiance: 'Amhara Nationalist Movement & Community Defense Groups',
      },
      {
        name: 'Oromo Liberation Army (OLA)',
        role: 'Rural insurgent governance in Western and Southern Oromia, ambushing military checkpoints',
        estimatedTroops: '~10,000 – 15,000 guerrilla fighters',
        equipment: 'Assault rifles, light machine guns, landmines, transport trucks',
        allegiance: 'Oromo National Self-Determination Movement',
      },
    ],
    tacticalDoctrine: 'Highland guerrilla warfare and rapid urban raid-and-withdraw tactics: Fano fighters leverage local civilian support across the mountainous Amhara highlands to briefly capture towns, withdraw before ENDF mechanized reinforcements arrive, and ambush responding columns.',
    historicalContext: 'Follows the devastating Tigray War (2020–2022) which ended with the Pretoria Peace Agreement. In April 2023, the federal government moved to dissolve regional special forces and integrate them into the federal army, sparking a massive rebellion by Amhara Fano militias who felt vulnerable to neighboring regional claims.',
    currentSituation: 'State of emergency in Amhara with heavy fighting in historic towns (Gondar, Lalibela, Bahir Dar); simultaneous clashes in Oromia despite multiple rounds of peace talks in Tanzania.',
    casualtiesAndHumanitarian: 'Tens of thousands dead; over 4 million internally displaced nationwide; widespread reports of drone strikes hitting civilians and disruption of vital agricultural cycles.',
    geopoliticalSignificance: 'Ethiopia is Africa’s second-most populous nation (125 million people) and diplomatic anchor of the Horn of Africa; internal fragmentation threatens Horn of Africa regional stability and the Grand Ethiopian Renaissance Dam (GERD) security.',
    notableFrontlines: ['Gondar & North Wollo Mountain Axis', 'Gojjam Agricultural Stronghold', 'Western Oromia (Wollega Zone)', 'Addis Ababa Outskirts & Highway Security Belts'],
  },

  // ==========================================
  // 12. CABO DELGADO (MOZAMBIQUE)
  // ==========================================
  {
    id: 'cabo-delgado',
    name: 'Cabo Delgado Insurgency (Northern Mozambique)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Sub-Saharan Africa',
    coordinates: [40.5, -11.5],
    threatLevel: 'High',
    status: 'Asymmetric Bush Guerrilla Warfare & Counter-Terrorism',
    startDate: 'October 2017',
    primaryForces: ['Armed Defence Forces of Mozambique (FADM)', 'Rwanda Defence Force (RDF Expeditionary)', 'Ansar al-Sunna (Islamic State Mozambique - ISM)'],
    description: 'Islamist insurgency in Mozambique’s northernmost coastal province, threatening Africa’s largest foreign direct investment project—a $20+ billion liquefied natural gas (LNG) offshore facility led by TotalEnergies.',
    keyAssets: 'Rwandan Special Forces Brigades, Mi-8/Mi-24 Gunships, Offshore Patrol Boats, Jungle Tracking Teams',
    totalTroopCommitment: '~18,000 Troops & Insurgents',
    troopBreakdown: [
      {
        name: 'Rwanda Defence Force (RDF) & Mozambican Military (FADM)',
        role: 'Securing the Afungi LNG peninsula, jungle tracking, offensive sweeps through dense coastal forests',
        estimatedTroops: '~5,000 Rwandan troops + ~10,000 Mozambican soldiers and local militias',
        equipment: 'Armored combat vehicles, attack helicopters, modern assault rifles, coastal patrol craft',
        allegiance: 'Bilateral Security Accord (Mozambique & Rwanda)',
      },
      {
        name: 'Ansar al-Sunna / Islamic State Mozambique (ISM)',
        role: 'Hit-and-run ambushes, attacking isolated villages, cutting the N380 highway, beheadings',
        estimatedTroops: '~1,000 – 2,000 hardcore guerrilla fighters',
        equipment: 'AK-47s, PKM machine guns, machetes, RPGs, improvised mines',
        allegiance: 'Islamic State Central Africa Province (ISCAP)',
      },
    ],
    tacticalDoctrine: 'Dense coastal mangrove and bushland insurgency: insurgents utilize inaccessible forest hideouts in the Catupa forest to launch surprise attacks on civilian communities and convoys, retreating before elite Rwandan mechanized tracking units can close the distance.',
    historicalContext: 'Emerged from marginalized Muslim youth in Cabo Delgado protesting economic exclusion, poverty, and corruption despite the discovery of massive offshore natural gas deposits and rubies in the early 2010s.',
    currentSituation: 'Rwandan forces successfully secured Palma and Mocímboa da Praia, but insurgent splinter cells continue to stage deadly ambushes across southern districts (Chiúre, Macomia).',
    casualtiesAndHumanitarian: 'Over 5,000 killed; nearly 1,000,000 people displaced at peak; major global energy infrastructure projects remain frozen under force majeure.',
    geopoliticalSignificance: 'Critical strategic supply of LNG for Europe and Asia; key test of African bilateral military intervention models (Rwanda) without Western ground troops.',
    notableFrontlines: ['Afungi LNG Industrial Peninsula Perimeter', 'Mocímboa da Praia Strategic Port', 'Catupa Forest Insurgent Stronghold', 'Macomia & Chiúre Rural Corridors'],
  },

  // ==========================================
  // 13. CENTRAL AFRICAN REPUBLIC CIVIL WAR
  // ==========================================
  {
    id: 'car-civil-war',
    name: 'Central African Republic Civil War',
    conflictType: 'Civil War',
    region: 'Sub-Saharan Africa',
    coordinates: [18.55, 5.5],
    threatLevel: 'Elevated',
    status: 'Low-Intensity Asymmetric Insurgency & Mineral Enclave Control',
    startDate: '2012 (ongoing rebel coalition warfare)',
    primaryForces: ['Central African Armed Forces (FACA)', 'Russian Africa Corps (Wagner Group)', 'Coalition of Patriots for Change (CPC)', 'UN Multidimensional Mission (MINUSCA)'],
    description: 'Protracted multi-faction struggle over state power and control of lucrative artisanal diamond, timber, and gold mining corridors.',
    keyAssets: 'Russian Armed Scout Cars (BRDM-2), Mi-8 Transport Helicopters, UN Wheeled Armored Carriers (VAB), Bush Technicals',
    totalTroopCommitment: '~32,000 Soldiers, Peacekeepers & Rebels',
    troopBreakdown: [
      {
        name: 'FACA (Government Army) & Russian Africa Corps',
        role: 'Protecting the capital Bangui, clearing mining towns, VIP security, river corridor defense',
        estimatedTroops: '~12,000 FACA troops + ~1,500 – 2,000 Russian Africa Corps mercenaries',
        equipment: 'Armored patrol vehicles, light artillery, transport helicopters, infantry weapons',
        allegiance: 'Government of Central African Republic (President Faustin-Archange Touadéra)',
      },
      {
        name: 'UN Peacekeeping Force (MINUSCA)',
        role: 'Protecting civilian enclaves, securing key highways, supporting humanitarian access',
        estimatedTroops: '~14,000 international peacekeepers and police',
        equipment: 'Armored personnel carriers, surveillance helicopters, logistics bases',
        allegiance: 'United Nations Mandate',
      },
      {
        name: 'Coalition of Patriots for Change (CPC Rebels)',
        role: 'Guerrilla ambushes on mining routes, landmine placement, border incursions from Chad & Sudan',
        estimatedTroops: '~4,000 – 6,000 rebel fighters across splinter groups',
        equipment: 'Assault rifles, RPGs, anti-tank landmines, motorbikes',
        allegiance: 'Former President François Bozizé / Coalition leaders',
      },
    ],
    tacticalDoctrine: 'Road corridor interdiction and anti-tank landmine warfare: rebels avoid direct confrontation with Russian combat teams, instead planting improvised explosive devices and landmines along vital supply roads (such as the Bangui-Cameroon trade artery).',
    historicalContext: 'Sparks date back to the 2013 overthrow of President Bozizé by Muslim Séléka rebels, followed by retaliatory violence from Christian anti-balaka militias. In 2018, Touadéra invited Russian private military contractors (Wagner) to push back rebels after France reduced its military footprint.',
    currentSituation: 'FACA and Russian forces control major urban centers and mining hubs; CPC rebels remain entrenched in remote rural and border regions.',
    casualtiesAndHumanitarian: 'Over 15,000 killed; over 1.4 million displaced (roughly one-quarter of the national population); extreme reliance on humanitarian food aid.',
    geopoliticalSignificance: 'Pioneered the Russian Africa Corps (Wagner) model of resource-for-security contracts in sub-Saharan Africa.',
    notableFrontlines: ['Bangui-Beloko Border Supply Corridor', 'Bambari Mining Crossroads', 'Vakaga Province (Sudan Border Nexus)', 'Ouham-Pendé Border Highlands'],
  },

  // ==========================================
  // 14. LAKE CHAD BASIN (BOKO HARAM / ISWAP)
  // ==========================================
  {
    id: 'lake-chad',
    name: 'Lake Chad Basin Insurgency (Boko Haram & ISWAP)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Sub-Saharan Africa',
    coordinates: [13.8, 12.8],
    threatLevel: 'High',
    status: 'Amphibious Swamp Insurgency & Terror Attacks',
    startDate: '2009',
    primaryForces: ['Multinational Joint Task Force (MNJTF - Nigeria, Chad, Cameroon, Niger)', 'Islamic State West Africa Province (ISWAP)', 'Boko Haram (JAS / Shekau Faction)'],
    description: 'Persistent counter-insurgency warfare in the vast marshlands, islands, and border periphery of Lake Chad, spanning northeastern Nigeria, northern Cameroon, western Chad, and southeastern Niger.',
    keyAssets: 'Air Force Super Tucano A-29s, Armed Flat-Bottom River Boats, T-72 Tanks, SVBIEDs, Drones',
    totalTroopCommitment: '~45,000 Soldiers & Insurgents',
    troopBreakdown: [
      {
        name: 'Multinational Joint Task Force (MNJTF - Core: Nigerian & Chadian Armies)',
        role: 'Amphibious island clearing, border cordon and search operations, air interdiction of terrorist hideouts',
        estimatedTroops: '~35,000 troops from Nigeria, Chad, Cameroon, and Niger',
        equipment: 'A-29 Super Tucano light attack planes, Mi-35 gunships, armored patrol boats, MRAPs',
        allegiance: 'Lake Chad Basin Commission & African Union Mandate',
      },
      {
        name: 'Islamic State West Africa Province (ISWAP) & Boko Haram (JAS)',
        role: 'Island hideouts, ambushes on military convoys, extortion of fishermen, suicide vehicle bombings',
        estimatedTroops: '~5,000 – 8,000 armed combatants (competing between ISWAP and JAS factions)',
        equipment: 'Armed pickup gun-trucks, high-speed wooden boats, anti-aircraft guns, night-vision equipment',
        allegiance: 'Islamic State Core (ISWAP) / Boko Haram Traditionalists (JAS)',
      },
    ],
    tacticalDoctrine: 'Amphibious swamp warfare and suicide armor assaults: militants hide in marshy islets, using modified flat-bottom canoes and armed pickups with anti-aircraft guns to strike military forward bases, while launching armored car bombs (SVBIEDs) in dawn raids.',
    historicalContext: 'Began in Maiduguri, Nigeria in 2009 under Mohammed Yusuf and Abubaker Shekau. Gained global notoriety with the 2014 Chibok schoolgirls kidnapping. In 2016, the movement split into traditionalist Boko Haram (JAS) and the more disciplined, tactically sophisticated ISWAP.',
    currentSituation: 'ISWAP has established proto-state governance and taxation over island fishing communities, while fierce internecine fighting persists between ISWAP and Boko Haram JAS loyalists in Sambisa Forest.',
    casualtiesAndHumanitarian: 'Over 40,000 killed directly; over 2.5 million displaced across four nations; chronic malnutrition and acute humanitarian crises across Borno State.',
    geopoliticalSignificance: 'Strategic security crisis in Africa’s most populous nation (Nigeria); tests regional multi-state military cooperation without Western boots on the ground.',
    notableFrontlines: ['Lake Chad Island Marshes (Baga Sector)', 'Sambisa Forest Core', 'Mandara Mountains (Cameroon Border)', 'Diffa Border Front (Niger-Nigeria)'],
  },

  // ==========================================
  // 15. COLOMBIAN ARMED CONFLICT
  // ==========================================
  {
    id: 'colombia-internal',
    name: 'Colombian Internal Armed Conflict (ELN & FARC Dissidents)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'South America',
    coordinates: [-73.2, 7.8],
    threatLevel: 'Elevated',
    status: 'Ongoing Guerrilla Insurgency & Narco-Territorial Clashes',
    startDate: '1964 (reconfigured post-2016 Peace Accord)',
    primaryForces: ['Military Forces of Colombia (Fuerzas Militares)', 'National Liberation Army (ELN)', 'FARC Dissidents (Estado Mayor Central - EMC & Segunda Marquetalia)', 'Clan del Golfo (AGC / Gaitanistas)'],
    description: 'South America’s longest-running armed conflict, now revolving around control of coca-growing regions, illegal gold mining corridors, and border crossings into Venezuela.',
    keyAssets: 'UH-60 Black Hawk Helicopters, Super Tucano A-29 Strike Aircraft, Riverine Gunboats, Anti-Personnel Landmines',
    totalTroopCommitment: '~280,000 Military Personnel vs ~15,000 Irregular Combatants',
    troopBreakdown: [
      {
        name: 'Military Forces & National Police of Colombia',
        role: 'Special forces jungle interdiction, riverine blockades, aerial surveillance, coca eradication',
        estimatedTroops: '~260,000 active military and police personnel',
        equipment: 'UH-60L Black Hawk gunships, A-29 Super Tucanos, heavily armed river combat boats, M1117 APCs',
        allegiance: 'Republic of Colombia (President Gustavo Petro "Total Peace" Policy)',
      },
      {
        name: 'National Liberation Army (ELN)',
        role: 'Marxist-Leninist guerrilla warfare, oil pipeline bombings, kidnappings, cross-border refuge in Venezuela',
        estimatedTroops: '~3,500 – 5,000 armed guerrillas and urban militia',
        equipment: 'Assault rifles, anti-personnel landmines, sniper rifles, homemade mortars',
        allegiance: 'ELN Central Command (COCE)',
      },
      {
        name: 'FARC Dissident Formations (EMC & Segunda Marquetalia)',
        role: 'Narco-trafficking security, rural extortion, ambushing military river patrols',
        estimatedTroops: '~5,000 – 6,000 armed combatants across multiple regional fronts',
        equipment: 'Galil and M16 rifles, RPGs, tactical radios, river patrol craft',
        allegiance: 'Ivan Mordisco (EMC) / Ivan Marquez (Segunda Marquetalia)',
      },
    ],
    tacticalDoctrine: 'Jungle guerrilla tactics, sniper interdiction, and landmine belts: insurgent fronts plant extensive anti-personnel minefields around cocaine laboratories and clandestine airstrips to slow down Colombian Special Forces and Black Hawk airmobile insertions.',
    historicalContext: 'Spans six decades beginning in 1964. While the historic 2016 peace accord disarmed the main FARC body, dissident factions rejected the agreement, and the Marxist ELN expanded into vacated territories.',
    currentSituation: 'President Petro’s "Total Peace" initiative has faced severe setbacks, with ceasefires collapsing amid continued ELN ambushes and EMC expansion in Cauca and Catatumbo.',
    casualtiesAndHumanitarian: 'Over 260,000 dead over 60 years; over 8 million registered conflict victims; thousands of rural farmers displaced annually by turf wars between ELN and dissident fronts.',
    geopoliticalSignificance: 'World’s top cocaine producer; complex border tensions with Venezuela where armed groups operate logistical sanctuaries.',
    notableFrontlines: ['Catatumbo Border Region (Norte de Santander)', 'Cauca Canyon Highlands & Pacific Coast', 'Arauca-Apure Cross-Border Corridor', 'Nariño & Putumayo Southern Coca Axes'],
  },

  // ==========================================
  // 16. MEXICAN CARTEL & SECURITY FORCES WAR
  // ==========================================
  {
    id: 'mexico-cartel-war',
    name: 'Mexican Cartel Territorial Conflict (Tierra Caliente & Chiapas)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Central America & Caribbean',
    coordinates: [-102.3, 19.1],
    threatLevel: 'High',
    status: 'Militarized Criminal Warfare & Drone/Armor Clashes',
    startDate: 'December 2006 (ongoing military deployment)',
    primaryForces: ['Mexican Armed Forces (SEDENA, SEMAR, National Guard)', 'Jalisco New Generation Cartel (CJNG)', 'Sinaloa Cartel (Los Chapitos vs Mayos Factions)', 'Local Community Self-Defense Groups (Autodefensas)'],
    description: 'High-intensity militarized conflict between Mexico’s federal forces and heavily armed transnational drug cartels wielding military-grade weaponry, armored gun trucks, and weaponized drones.',
    keyAssets: 'Commercial Drones with C4/Mortar Payloads, Homemade Armored Gun Trucks ("Monstruos"), Barrett .50 Caliber Rifles, UH-60 Black Hawks',
    totalTroopCommitment: '~200,000 Security Forces vs ~50,000 Paramilitary Cartel Gunmen',
    troopBreakdown: [
      {
        name: 'Mexican Armed Forces & National Guard',
        role: 'Territorial pacification, border interdiction, dismantling fentanyl and methamphetamine labs, high-value target raids',
        estimatedTroops: '~180,000 deployed troops (Army, Navy Marines, National Guard)',
        equipment: 'UH-60M Black Hawks, Oshkosh SandCat armored vehicles, FX-05 Xiuhcoatl rifles, naval gunboats',
        allegiance: 'Government of Mexico',
      },
      {
        name: 'Cartel Armed Wings (CJNG Elite Group, Fuerzas Especiales Chapiza, etc.)',
        role: 'Territorial defense of synthetic drug hubs, ambushing rival factions and security convoys, roadblocks',
        estimatedTroops: '~30,000 – 50,000 heavily armed sicarios and foot soldiers',
        equipment: 'Barrett .50 cal anti-materiel rifles, RPG-7s, customized armored "Monstruo" trucks, explosive hexacopter drones',
        allegiance: 'Transnational Cartel Leadership (CJNG / Sinaloa Cartel splinter factions)',
      },
    ],
    tacticalDoctrine: 'Urban siege and militarized asymmetrical combat: cartels construct fortified roadblocks with burning tractor-trailers, deploy explosive-dropping agricultural drones onto rival and military camps, and employ improvised armored gun-trucks with top-mounted machine gun turrets.',
    historicalContext: 'Escalated in December 2006 when President Felipe Calderón launched the official "War on Drugs" by deploying the army. Rather than ending cartels, the strategy fragmented them into more aggressive, hyper-militarized criminal armies.',
    currentSituation: 'Fierce fratricidal civil war inside the Sinaloa Cartel following the arrest of Ismael "El Mayo" Zambada in 2024, alongside intense CJNG expansion across Michoacán, Guerrero, and southern Chiapas border corridors.',
    casualtiesAndHumanitarian: 'Over 350,000 homicides and over 115,000 officially registered "disappeared" persons since 2006; whole rural communities displaced by drone bombings and cartel blockades.',
    geopoliticalSignificance: 'Directly impacts North American fentanyl epidemic (driving 70,000+ US overdose deaths per year), immigration corridors, and cross-border trade security.',
    notableFrontlines: ['Culiacán & Sinaloa Central Plain Axis', 'Tierra Caliente (Michoacán / Guerrero Border)', 'Chiapas Southern Border with Guatemala', 'Zacatecas Strategic Logistics Crossroads'],
  },

  // ==========================================
  // 17. HAITI GANG & TERRITORIAL CRISIS
  // ==========================================
  {
    id: 'haiti-gang-crisis',
    name: 'Haiti Urban Territorial Conflict (Port-au-Prince)',
    conflictType: 'Civil War',
    region: 'Central America & Caribbean',
    coordinates: [-72.33, 18.54],
    threatLevel: 'Critical',
    status: 'State Collapse & Multinational Security Interdiction',
    startDate: 'July 2021 (accelerated early 2024)',
    primaryForces: ['Haitian National Police (PNH)', 'Multinational Security Support Mission (MSS - Kenya lead)', '"Viv Ansanm" (Living Together) Gang Coalition'],
    description: 'Armed conflict for control of the capital Port-au-Prince, where unified criminal coalitions have seized control of over 85% of the city, blockading ports, hospitals, and national highways.',
    keyAssets: 'MaxxPro MRAP Armored Vehicles, AR-15 & Galil Assault Rifles, Barrett .50 Cal Rifles, Commercial Surveillance Drones',
    totalTroopCommitment: '~15,000 Police & International Troops vs ~12,000 Armed Gang Members',
    troopBreakdown: [
      {
        name: 'Haitian National Police (PNH) & Specialized Units (UTAG, SWAT)',
        role: 'Defending the National Palace, international airport, and remaining institutional perimeters',
        estimatedTroops: '~9,000 active police officers (severely under-resourced)',
        equipment: 'Armored patrol carriers, tactical shotguns, assault rifles, tear gas systems',
        allegiance: 'Transitional Presidential Council of Haiti',
      },
      {
        name: 'Multinational Security Support Mission (MSS - Led by Kenyan Police)',
        role: 'Securing critical infrastructure (seaport, airport, national hospital) and conducting joint clearing raids',
        estimatedTroops: '~400 – 600 deployed Kenyan police (planned expansion to 2,500 personnel)',
        equipment: 'US-supplied MaxxPro MRAPs, heavy ballistic shields, advanced tactical communications',
        allegiance: 'United Nations Security Council Mandate / Kenyan Government',
      },
      {
        name: 'Viv Ansanm Gang Coalition (Led by Jimmy "Barbecue" Chérizier)',
        role: 'Urban sniper blockades, raiding police stations and prisons, controlling fuel and food terminal access',
        estimatedTroops: '~8,000 – 12,000 armed gang combatants',
        equipment: 'Smuggled high-caliber US weapons (M4, AR-15, Barrett .50 cal), heavy ammunition magazines, drones',
        allegiance: 'Coalition of G9 and G-Pèp Allied Gang Chiefs',
      },
    ],
    tacticalDoctrine: 'Urban street-grid chokehold warfare: gangs use shipping containers, backhoes, and burning tire walls to sever key transit arteries, deploying snipers in high-rise buildings to paralyze international transport and police movements.',
    historicalContext: 'Triggered by the July 2021 assassination of President Jovenel Moïse, which created an institutional power vacuum that allowed gangs—originally patronized by rival political elites—to unite into autonomous military-scale cartels.',
    currentSituation: 'Gangs maintain a tight grip on lower Port-au-Prince and commercial ports; Kenyan-led MSS forces face severe funding and equipment deficits in launching broad clearing offensives.',
    casualtiesAndHumanitarian: 'Over 5,000 killed in 2024 alone; over 700,000 internally displaced persons; half of Haiti’s population faces crisis levels of acute hunger.',
    geopoliticalSignificance: 'Severe Caribbean security crisis risking mass boat migration to the United States and the Dominican Republic; a key test of UN-authorized third-party security assistance.',
    notableFrontlines: ['Toussaint Louverture International Airport Perimeter', 'Varreux Fuel Terminal Access Corridors', 'Carrefour-Feuilles District', 'Downtown Port-au-Prince & Champ de Mars'],
  },

  // ==========================================
  // 18. NAGORNO-KARABAKH & ARMENIA-AZERBAIJAN
  // ==========================================
  {
    id: 'nagorno-karabakh',
    name: 'Armenia-Azerbaijan Border Standoff & Zangezur Corridor Tensions',
    conflictType: 'Territorial & Border Dispute',
    region: 'Central Asia',
    coordinates: [46.75, 39.82],
    threatLevel: 'High',
    status: 'Tense Border Standoff & Demarcation Disputes',
    startDate: '1988 (Azerbaijan reconquest September 2023)',
    primaryForces: ['Azerbaijani Armed Forces', 'Armenian Armed Forces', 'EU Mission in Armenia (EUMA Civilian Monitors)'],
    description: 'Post-war standoff along the high-altitude mountainous frontier between Armenia and Azerbaijan following the complete dissolution of the self-proclaimed Republic of Artsakh (Nagorno-Karabakh).',
    keyAssets: 'Bayraktar TB2 & Harop Loitering Munitions, LORA Quasi-Ballistic Missiles, French CAESAR Howitzers, S-300 Air Defense',
    totalTroopCommitment: '~120,000 Border Troops & Armed Forces',
    troopBreakdown: [
      {
        name: 'Armed Forces of Azerbaijan',
        role: 'Forward border post fortification, territorial dominance of strategic ridges, pressure on transport links',
        estimatedTroops: '~65,000 active personnel deployed in western border theaters',
        equipment: 'Israeli Harop/Orbiter loitering drones, Turkish Bayraktar TB2s, T-90S tanks, modern Czech/Israeli artillery',
        allegiance: 'Republic of Azerbaijan (President Ilham Aliyev)',
      },
      {
        name: 'Armed Forces of Armenia',
        role: 'Territorial defense of sovereign Armenian borders (Syunik, Gegharkunik), fortification of mountain gaps',
        estimatedTroops: '~45,000 active military personnel',
        equipment: 'French CAESAR 155mm howitzers, Indian Pinaka MLRS, Russian Tor-M2KM, modernized trench defenses',
        allegiance: 'Republic of Armenia (Prime Minister Nikol Pashinyan)',
      },
    ],
    tacticalDoctrine: 'High-altitude mountain ridge warfare and loitering loitering-drone surveillance: troops occupy defensive bunkers at 2,000–3,000m elevations, relying on electro-optical thermal cameras and loitering precision munitions to deny tactical movement through mountain passes.',
    historicalContext: 'Roots in the late Soviet period when ethnic Armenians in Nagorno-Karabakh sought unification with Armenia, leading to the First Karabakh War (1988–1994) won by Armenia, the 44-Day Second War in 2020 won by Azerbaijan, and Azerbaijan’s lightning 24-hour offensive in September 2023.',
    currentSituation: 'Virtually all 100,000+ ethnic Armenian residents fled Nagorno-Karabakh to Armenia in 2023. Current tensions center on border demarcation and Baku’s demands for an extraterritorial "Zangezur Corridor" connecting mainland Azerbaijan to its Nakhchivan exclave through Armenian territory.',
    casualtiesAndHumanitarian: 'Over 30,000 dead across three decades of conflict; complete ethnic displacement of the Nagorno-Karabakh population; border skirmishes frequently result in sniper fatalities.',
    geopoliticalSignificance: 'Armenia has frozen ties with Russia’s CSTO and pivoted towards the West (EU, France, USA); Azerbaijan deepens its strategic alliance with Turkey, key transit corridor for Caspian oil and gas to Europe.',
    notableFrontlines: ['Syunik Province Border Heights (Southern Armenia)', 'Gegharkunik-Kalbajar Mountain Axis', 'Nakhchivan Autonomous Republic Frontier', 'Zangezur Transport Corridor Nexus'],
  },

  // ==========================================
  // 19. KASHMIR LINE OF CONTROL (LoC)
  // ==========================================
  {
    id: 'kashmir-loc',
    name: 'Kashmir Line of Control & Siachen Glacier',
    conflictType: 'Territorial & Border Dispute',
    region: 'South Asia',
    coordinates: [74.5, 34.2],
    threatLevel: 'High',
    status: 'Nuclear-Armed Frontier Standoff & Active Ceasefire',
    startDate: '1947 (ongoing dispute across 740 km LoC)',
    primaryForces: ['Indian Army (Northern Command)', 'Pakistan Army (X Corps)', 'People’s Liberation Army (Western Theater Command in Aksai Chin)'],
    description: 'The world’s most heavily militarized high-altitude border, separating nuclear-armed rivals India and Pakistan along the 740 km Line of Control, with nearby friction points against China in Ladakh.',
    keyAssets: 'Bofors & K9 Vajra Howitzers, Su-30MKI & Rafale Jets, JF-17 Thunder, High-Altitude Thermal Scopes, Siachen Snowmobiles',
    totalTroopCommitment: '~800,000 Troops Across All Sectors',
    troopBreakdown: [
      {
        name: 'Indian Army (XV & XVI Corps) & Border Security Force',
        role: 'Counter-infiltration fence defense, high-altitude outpost garrisoning, counter-terror operations in the Valley',
        estimatedTroops: '~500,000 active troops and paramilitary personnel in Jammu & Kashmir',
        equipment: 'Multi-layered electrified fence with thermal sensors, K9 Vajra self-propelled guns, Rafale fighters, Dhruv ALH helicopters',
        allegiance: 'Republic of India',
      },
      {
        name: 'Pakistan Army (X Corps / Force Command Northern Areas)',
        role: 'Frontline defensive bunkers, artillery firebases, monitoring mountain passes',
        estimatedTroops: '~300,000 deployed troops in Azad Kashmir & Gilgit-Baltistan',
        equipment: 'JF-17 Block III fighters, F-16s, Chinese SH-15 howitzers, Al-Khalid tanks, electronic surveillance radar',
        allegiance: 'Islamic Republic of Pakistan',
      },
    ],
    tacticalDoctrine: 'Extreme high-altitude trench and bunker warfare: soldiers occupy forward pickets along mountain peaks exceeding 5,000–6,000 meters elevation (e.g., Siachen Glacier), where frostbite, high-altitude pulmonary edema, and avalanches claim more lives than enemy small-arms fire.',
    historicalContext: 'Began with the 1947 partition of British India when Maharaja Hari Singh acceded to India, leading to three full-scale wars (1947, 1965, 1971) and the 1999 Kargil War. India revoked Jammu & Kashmir’s special constitutional autonomy (Article 370) in 2019.',
    currentSituation: 'A 2021 reaffirmed ceasefire has dramatically curtailed direct artillery duels across the LoC, though sporadic militant ambushes against Indian Army convoys persist in the Pir Panjal mountain range (Rajouri-Poonch).',
    casualtiesAndHumanitarian: 'Over 70,000 dead since the armed insurgency ignited in 1989; heavy civilian displacement during historic cross-border shelling rounds.',
    geopoliticalSignificance: 'The premier flashpoint with potential to trigger a nuclear exchange between two nuclear-armed states with combined stockpiles exceeding 340 warheads; intersects with China’s China-Pakistan Economic Corridor (CPEC).',
    notableFrontlines: ['Siachen Glacier (World\'s Highest Battlefield - 6,400m)', 'Kargil & Dras Mountain Heights', 'Poonch-Rajouri Pir Panjal Sector', 'Uri & Kupwara Infiltration Corridors'],
  },

  // ==========================================
  // 20. BALOCHISTAN INSURGENCY
  // ==========================================
  {
    id: 'balochistan',
    name: 'Balochistan Insurgency & Gwadar Port Security',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'South Asia',
    coordinates: [65.2, 28.5],
    threatLevel: 'High',
    status: 'Coordinated Guerrilla Attacks & Infrastructure Sabotage',
    startDate: '1948 (Fifth wave ignited 2004–present)',
    primaryForces: ['Pakistan Armed Forces (Frontier Corps Balochistan)', 'Baloch Liberation Army (BLA / Majeed Brigade)', 'Balochistan Liberation Front (BLF)'],
    description: 'Secessionist ethno-nationalist insurgency across Pakistan’s largest and most mineral-rich province, targeting Pakistani military posts and Chinese-funded infrastructure along the China-Pakistan Economic Corridor (CPEC).',
    keyAssets: 'Majeed Brigade Suicide Attack Teams, Attack Helicopters (AH-1F Cobra), Mine-Protected Vehicles, C-RAM Defenses at Gwadar',
    totalTroopCommitment: '~90,000 Military & Paramilitary vs ~5,000 Guerrilla Fighters',
    troopBreakdown: [
      {
        name: 'Pakistan Armed Forces & Frontier Corps (FC Balochistan)',
        role: 'Defending Gwadar deep-sea port, CPEC highway security, counter-insurgency operations in rugged mountains',
        estimatedTroops: '~80,000 regular troops, FC paramilitaries, and police',
        equipment: 'Attack helicopters, armored personnel carriers, drone surveillance, military checkpoints',
        allegiance: 'Government of Pakistan',
      },
      {
        name: 'Baloch Liberation Army (BLA) & Allied Factions',
        role: 'Complex fedayeen assaults, highway blockades, targeted bombings against Chinese engineers and security convoys',
        estimatedTroops: '~3,000 – 5,000 armed guerrilla fighters across multiple insurgent groups',
        equipment: 'Sniper rifles, vehicle-borne IEDs, RPGs, automatic assault weapons',
        allegiance: 'BLA Leadership (Bashir Zeb / Majeed Brigade elite unit)',
      },
    ],
    tacticalDoctrine: 'Coordinated simultaneous swarm raids and suicide fedayeen attacks (Operation Herof): insurgent units block major highways, conduct identity checks, and launch simultaneous vehicle bombings and assault teams against military bases and international airport security gates.',
    historicalContext: 'Dates back to the 1948 accession of the princely state of Kalat into Pakistan. The current wave escalated after the 2006 killing of veteran Baloch leader Nawab Akbar Bugti by the Pakistani military under Pervez Musharraf.',
    currentSituation: 'Sharp escalation with the BLA launching massive multi-district assaults in August and October 2024, killing dozens of soldiers and targeting Chinese personnel near Karachi airport and Gwadar port.',
    casualtiesAndHumanitarian: 'Thousands of combatants, civilians, and security personnel killed; deep controversy over thousands of "enforced disappearances" of Baloch activists and students.',
    geopoliticalSignificance: 'Critical threat to China’s $62 billion CPEC flagship Belt and Road initiative, which terminates at Gwadar port; fuels geopolitical friction between Pakistan and Iran over cross-border sanctuaries.',
    notableFrontlines: ['Gwadar Deep-Sea Port Security Enclave', 'Bolan Pass Strategic Highway Corridor', 'Turbat & Kech Border District', 'Quetta Capital Security Perimeter'],
  },

  // ==========================================
  // 21. KOREAN DEMILITARIZED ZONE (DMZ)
  // ==========================================
  {
    id: 'korean-dmz',
    name: 'Korean Demilitarized Zone (38th Parallel)',
    conflictType: 'Frozen Conflict & Armistice',
    region: 'East Asia',
    coordinates: [126.98, 38.25],
    threatLevel: 'High',
    status: 'Tense Armistice & Hardened Ballistic Standoff',
    startDate: 'June 1950 (Armistice signed July 1953)',
    primaryForces: ['Korean People’s Army (KPA)', 'Republic of Korea Armed Forces (ROK)', 'United States Forces Korea (USFK)'],
    description: 'A 250 km long, 4 km wide fortified buffer strip dividing the Korean Peninsula, defended by over a million forward-deployed troops and backed by North Korea’s expanding nuclear arsenal.',
    keyAssets: 'Hardened Koksan Long-Range Artillery, THAAD & Patriot PAC-3 Missiles, K2 Black Panther Tanks, F-35A Stealth Fighters, Hwasong ICBMs',
    totalTroopCommitment: '~1,700,000 Active Troops Forward-Deployed',
    troopBreakdown: [
      {
        name: 'Korean People’s Army (KPA - North Korea)',
        role: 'Massed forward artillery coverage of Seoul metropolitan area, ballistic missile readiness, subterranean tunnel access',
        estimatedTroops: '~1,200,000 active duty troops (~70% deployed within 100 km of DMZ)',
        equipment: '10,000+ heavy artillery pieces, multiple launch rocket systems, T-62/Chonma-216 tanks, tactical nuclear warheads',
        allegiance: 'Democratic People\'s Republic of Korea (Kim Jong Un)',
      },
      {
        name: 'ROK Armed Forces (South Korea) & US Forces Korea (USFK)',
        role: 'Kill-Chain preemptive strike doctrine, Korea Massive Punishment and Retaliation (KMPR), combined defense',
        estimatedTroops: '~500,000 ROK active troops + 28,500 USFK forward-stationed troops',
        equipment: 'K2 Black Panther tanks, K9 Thunder artillery, Cheongung-II air defense, THAAD, US 7th Air Force F-16s/A-10s',
        allegiance: 'Republic of Korea / ROK-US Combined Forces Command',
      },
    ],
    tacticalDoctrine: 'Massive asymmetric saturation artillery and missile fire countered by integrated high-precision sensor-to-shooter missile defense: North Korea can fire up to 500,000 artillery rounds per hour targeting greater Seoul, countered by US-ROK stealth air strikes targeting leadership bunkers and missile transporter-erector-launchers (TELs).',
    historicalContext: 'Began with North Korea’s invasion of the South in June 1950. The 1953 Korean Armistice Agreement halted open hostilities, but no formal peace treaty was ever signed, leaving the two nations technically in a state of war for over 70 years.',
    currentSituation: 'North Korea officially declared South Korea its "principal enemy" in 2024, blew up cross-border road and rail links, and launched thousands of trash-carrying balloons southward, while deploying troops to support Russia in Ukraine.',
    casualtiesAndHumanitarian: 'Over 3 million casualties during the 1950–1953 war; chronic humanitarian malnutrition in North Korea contrasted with South Korea’s high-tech economic powerhouse status.',
    geopoliticalSignificance: 'Primary theater where US nuclear umbrella directly borders nuclear-armed North Korea; potential trigger for a global superpower confrontation involving China and the United States.',
    notableFrontlines: ['Panmunjom Joint Security Area (JSA)', 'Chorwon Valley Strategic Infiltration Corridor', 'Northern Limit Line (NLL / West Sea Maritime Border)', 'Yeonpyeong Island Artillery Outpost'],
  },

  // ==========================================
  // 22. TAIWAN STRAIT & FIRST ISLAND CHAIN
  // ==========================================
  {
    id: 'taiwan-strait',
    name: 'Taiwan Strait & First Island Chain Stand-off',
    conflictType: 'Territorial & Border Dispute',
    region: 'East Asia',
    coordinates: [119.5, 24.2],
    threatLevel: 'Critical',
    status: 'Active Naval/Air Blockade Drills & Grey-Zone Coercion',
    startDate: '1949 (elevated intensity 2022–present)',
    primaryForces: ['PLA Eastern Theater Command', 'Republic of China Armed Forces (Taiwan ROCA)', 'US 7th Fleet / Indo-Pacific Command', 'Japan Self-Defense Forces (JSDF)'],
    description: 'The world’s most critical geopolitical flashpoint, centered on the 160 km wide strait separating democratic Taiwan from mainland China, controlling key global shipping lanes and advanced semiconductor foundries (TSMC).',
    keyAssets: 'Type 055 Guided Missile Cruisers, F-16V Block 70 Vipers, Carrier Strike Groups (Nimitz/Ford vs Liaoning/Shandong), DF-21D/DF-26 Anti-Ship Ballistic Missiles, Hsiung Feng III Anti-Ship Missiles',
    totalTroopCommitment: '~600,000 Forward-Deployed Personnel across Air, Sea & Land',
    troopBreakdown: [
      {
        name: 'People’s Liberation Army (Eastern & Southern Theaters)',
        role: 'Joint sword multi-directional blockade drills, amphibious landing preparations, missile encirclement',
        estimatedTroops: '~400,000 soldiers, sailors, and rocket forces allocated to Taiwan contingency',
        equipment: 'Type 055 cruisers, Type 075 amphibious assault ships, J-20 stealth fighters, Y-20 transports, DF-17 hypersonic missiles',
        allegiance: 'People\'s Republic of China (Central Military Commission)',
      },
      {
        name: 'Taiwan Armed Forces (Republic of China Armed Forces)',
        role: 'Asymmetric "Porcupine Strategy", sea-denial anti-ship missile defense, hardened island bunker networks',
        estimatedTroops: '~170,000 active duty personnel + ~1.6 million reservists',
        equipment: 'F-16V Vipers, Patriot PAC-3 batteries, Hsiung Feng III supersonic missiles, Hai Kun indigenous submarines, Harpoon coastal systems',
        allegiance: 'Republic of China (Taiwan)',
      },
      {
        name: 'US Indo-Pacific Command & Japanese Maritime SDF',
        role: 'Deterrence patrols, Freedom of Navigation operations, First Island Chain missile defense integration',
        estimatedTroops: '~55,000 US personnel in Japan (Yokosuka, Okinawa) + Seventh Fleet Carrier Strike Groups',
        equipment: 'Nuclear-powered supercarriers, Virginia-class attack subs, P-8A Poseidon patrol planes, Aegis destroyers',
        allegiance: 'United States & Allied Treaty Partners',
      },
    ],
    tacticalDoctrine: 'Multi-domain anti-access/area-denial (A2/AD) vs. asymmetric island porcupine defense: China practices maritime blockades, cyber cut-offs, and mass missile strikes, while Taiwan prepares thousands of mobile anti-ship and air-defense missiles hidden in mountainous redoubts to sink amphibious landing fleets.',
    historicalContext: 'Followed the Chinese Civil War when Chiang Kai-shek’s Nationalist (KMT) government retreated to Taiwan in 1949. Beijing claims Taiwan as an inalienable province and has not ruled out the use of force to achieve "reunification."',
    currentSituation: 'Almost daily PLA military aircraft incursions crossing the median line into Taiwan’s Air Defense Identification Zone (ADIZ), alongside large-scale PLA "Joint Sword" encirclement drills simulating full maritime quarantine.',
    casualtiesAndHumanitarian: 'Potential conflict estimated by Bloomberg Economics to cost the global economy over $10 trillion (roughly 10% of global GDP) and trigger catastrophic global supply chain halts.',
    geopoliticalSignificance: 'Taiwan manufactures over 90% of the world’s most advanced microchips (TSMC); control of Taiwan would break the First Island Chain and grant China unrestricted access to the central Pacific Ocean.',
    notableFrontlines: ['Taiwan Strait Median Line Air Corridor', 'Bashi Channel Chokepoint (South of Taiwan)', 'Kinmen & Matsu Offshore Fortified Islands', 'Yonaguni & Senkaku Island Flanks (Japan)'],
  },

  // ==========================================
  // 23. SOUTH CHINA SEA (SHOAL & ISLAND DISPUTE)
  // ==========================================
  {
    id: 'south-china-sea',
    name: 'South China Sea Island & Shoal Stand-off',
    conflictType: 'Territorial & Border Dispute',
    region: 'Southeast Asia',
    coordinates: [115.86, 9.87],
    threatLevel: 'High',
    status: 'Aggressive Grey-Zone Confrontations & Maritime Ramming',
    startDate: '1974 (Paracels) / Modern escalation 2013–present',
    primaryForces: ['China Coast Guard & People’s Armed Forces Maritime Militia (PAFMM)', 'Philippine Navy & Coast Guard (PCG)', 'US Navy (FONOP Operations)', 'Vietnam People\'s Navy'],
    description: 'Intense maritime confrontations over disputed shoals and reefs in the Spratly and Paracel Islands, where China enforces sweeping "Ten-Dash Line" sovereignty claims against the Philippines, Vietnam, Malaysia, and Brunei.',
    keyAssets: 'Militarized Artificial Island Fortresses (Mischief & Subi Reefs), CCG 5901 ("The Monster" 12,000-Ton Cutter), BRP Sierra Madre Rusting Outpost, High-Pressure Water Cannons',
    totalTroopCommitment: '~80,000 Naval, Coast Guard & Marine Personnel',
    troopBreakdown: [
      {
        name: 'China Coast Guard (CCG) & Maritime Militia (PAFMM)',
        role: 'Blockading Philippine outposts, aggressive ship ramming, water cannon assaults, acoustic weapon deployment',
        estimatedTroops: '~50,000 personnel deployed across South China Sea maritime flotillas',
        equipment: 'Heavily armed mega-cutters, hundreds of steel-hulled fishing militia trawlers, amphibious hovercraft, Y-8 patrol planes',
        allegiance: 'People\'s Republic of China',
      },
      {
        name: 'Philippine Coast Guard (PCG) & Western Command (WESCOM)',
        role: 'Resupplying the BRP Sierra Madre garrison at Second Thomas Shoal, safeguarding Scarborough Shoal fishermen',
        estimatedTroops: '~20,000 Coast Guard and naval personnel',
        equipment: 'Japanese-built Teresa Magbanua-class patrol ships, Jose Rizal guided missile frigates, fast resupply boats',
        allegiance: 'Republic of the Philippines (Backed by US Mutual Defense Treaty)',
      },
    ],
    tacticalDoctrine: 'Coercive "grey-zone" tactics below the threshold of armed conflict: China utilizes civilian-flagged steel-hulled fishing militia to swarm disputed waters while China Coast Guard cutters deploy military-grade water cannons and acoustic sound-cannons, intentionally ramming Philippine vessels to block resupply missions without firing live bullets.',
    historicalContext: 'China claims virtually the entire South China Sea based on historical maps. In 2016, the Permanent Court of Arbitration in The Hague ruled overwhelmingly in favor of the Philippines, concluding China’s claims have no legal basis under UNCLOS—a ruling Beijing rejected.',
    currentSituation: 'Fierce standoffs around Second Thomas Shoal (Ayungin) and Sabina Shoal (Escoda), with Chinese coast guard personnel boarding Philippine rigid-hull inflatable boats with bladed weapons and axes.',
    casualtiesAndHumanitarian: 'Dozens of Philippine sailors injured (including severed fingers and blunt trauma from high-pressure water cannons); severe ecological destruction of coral reefs from giant clam dredging and artificial island paving.',
    geopoliticalSignificance: 'Crucial global sea lane carrying over $3.4 trillion in annual shipborne trade (over one-third of global maritime shipping); could activate the 1951 US-Philippines Mutual Defense Treaty.',
    notableFrontlines: ['Second Thomas Shoal (BRP Sierra Madre Grounding)', 'Scarborough Shoal (Panatag Shoal Lagoon)', 'Sabina Shoal (Escoda Marine Rendezvous)', 'Mischief Reef Fortified Military Base'],
  },

  // ==========================================
  // 24. KURDISTAN & NORTHERN IRAQ/SYRIA
  // ==========================================
  {
    id: 'kurdistan-conflict',
    name: 'Kurdistan Cross-Border Conflict (Northern Iraq & Rojava)',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Middle East',
    coordinates: [43.78, 37.15],
    threatLevel: 'High',
    status: 'Cross-Border Air Campaign & Deep Mountain Outpost War',
    startDate: '1984 (Operation Claw-Lock series 2019–present)',
    primaryForces: ['Turkish Armed Forces (TSK)', 'Kurdistan Workers’ Party (PKK / HPG)', 'People’s Protection Units (YPG / SDF Core)', 'Iraqi Kurdish Peshmerga (KDP & PUK)'],
    description: 'Cross-border military operations by Turkey across northern Iraq (Qandil and Metina mountains) and northeastern Syria against Kurdish militant networks.',
    keyAssets: 'Bayraktar TB2 & Akıncı Drones, T129 ATAK Attack Helicopters, Mountain Forward Operating Bases, Underground Cave Forts',
    totalTroopCommitment: '~110,000 Troops & Guerrilla Combatants',
    troopBreakdown: [
      {
        name: 'Turkish Armed Forces (TSK - Special Forces & Commandos)',
        role: 'Establishing permanent mountain outpost belts, drone strikes on command figures, neutralizing cave systems',
        estimatedTroops: '~80,000 troops deployed across southeastern Turkey and inside northern Iraq',
        equipment: 'Akıncı and TB2 combat drones, T129 ATAK helicopters, F-16 Fighting Falcons, Boran light howitzers',
        allegiance: 'Republic of Turkey',
      },
      {
        name: 'Kurdistan Workers’ Party (PKK - People\'s Defense Forces HPG)',
        role: 'Mountain guerrilla warfare, cave defense, anti-tank missile ambushes, IEDs against Turkish patrol tracks',
        estimatedTroops: '~6,000 – 10,000 hardened mountain fighters',
        equipment: 'Zagros anti-materiel sniper rifles, Kornet ATGMs, MANPADS, IEDs, specialized cave fortifications',
        allegiance: 'PKK High Command (Qandil Mountains)',
      },
    ],
    tacticalDoctrine: 'Subterranean alpine warfare vs. persistent drone interdiction: PKK fighters excavate kilometers of deep tunnels and multi-level bunkers inside rugged Zagros limestone peaks, surviving heavy airstrikes to emerge and ambush Turkish commando outposts in sub-zero winter blizzards.',
    historicalContext: 'Began in 1984 when Abdullah Öcalan founded the Marxist-nationalist PKK to wage an armed struggle for an independent Kurdish state. The conflict has claimed over 40,000 lives, morphing from an internal Turkish insurgency into regional cross-border campaigns.',
    currentSituation: 'Turkey maintains over 100 fortified forward outposts deep inside Iraqi Kurdistan under Operation Claw-Lock, cutting off PKK transit routes between Turkey, Iraq, and Syria.',
    casualtiesAndHumanitarian: 'Over 40,000 dead over 40 years; widespread destruction of rural villages and olive groves across northern Iraq and northern Syria.',
    geopoliticalSignificance: 'Complex diplomatic tension between NATO ally Turkey, the central Iraqi government in Baghdad, and the United States (which partners with Syrian Kurdish SDF to contain ISIS).',
    notableFrontlines: ['Qandil Mountain Headquarters', 'Zap & Metina River Gorges (Northern Iraq)', 'Sinjar Mountain Corridor (Yazidi Heartland)', 'Kobani & Hasakah Border Sectors (Syria)'],
  },

  // ==========================================
  // 25. WESTERN SAHARA
  // ==========================================
  {
    id: 'western-sahara',
    name: 'Western Sahara Conflict (The Sand Berm Standoff)',
    conflictType: 'Territorial & Border Dispute',
    region: 'Middle East',
    coordinates: [-12.2, 24.8],
    threatLevel: 'Elevated',
    status: 'Low-Intensity Standoff & Drone Strike Exchanges',
    startDate: '1975 (ceasefire collapsed November 2020)',
    primaryForces: ['Royal Moroccan Armed Forces (FAR)', 'Polisario Front (SADR - Sahrawi People’s Liberation Army)', 'MINURSO (UN Mission)'],
    description: 'Territorial confrontation in the vast desert of Western Sahara, divided by the world’s longest active military barrier—the 2,700 km Moroccan Sand Wall ("The Berm").',
    keyAssets: '2,700 km Fortified Sand Wall ("The Berm"), Wing Loong & Bayraktar TB2 Drones, M1A2 Abrams Tanks, BM-21 Grad Rockets',
    totalTroopCommitment: '~140,000 Troops Across the Desert',
    troopBreakdown: [
      {
        name: 'Royal Moroccan Armed Forces (FAR)',
        role: 'Manning the Berm, radar surveillance, precision armed drone interdiction east of the barrier',
        estimatedTroops: '~120,000 soldiers permanently stationed along the Sand Wall',
        equipment: 'M1A1/M1A2 Abrams tanks, Bayraktar TB2 and Wing Loong II drones, Mirage F1 fighters, Ground Radar',
        allegiance: 'Kingdom of Morocco',
      },
      {
        name: 'Polisario Front (Sahrawi Popular Liberation Army)',
        role: 'Mobile desert guerrilla harassment, rocket and mortar fire at Moroccan military posts along the wall',
        estimatedTroops: '~15,000 – 20,000 active and reserve Sahrawi fighters',
        equipment: 'Grad MLRS, anti-tank guided missiles, armed pickup trucks, Soviet-supplied RPGs',
        allegiance: 'Sahrawi Arab Democratic Republic (SADR - backed by Algeria)',
      },
    ],
    tacticalDoctrine: 'Long-range harassment along a fortified wall: Polisario launches mobile pickup truck hit-and-run rocket attacks from beyond the Berm, countered by Moroccan drone operators who target launch crews with precision air-to-ground missiles within minutes of detection.',
    historicalContext: 'Spain withdrew from Spanish Sahara in 1975, after which Morocco annexed the territory via the Green March. The indigenous Polisario Front fought a 16-year war until a 1991 UN ceasefire promised a referendum on self-determination, which was never held. The ceasefire collapsed in November 2020.',
    currentSituation: 'Morocco controls ~80% of Western Sahara (including coastal cities, fishing waters, and phosphate mines); Polisario controls a narrow inland strip of desert and operates from refugee camps in Tindouf, Algeria.',
    casualtiesAndHumanitarian: 'Over 170,000 Sahrawi refugees live in extreme conditions in desert camps near Tindouf; low-level casualties from sporadic rocket and drone strikes.',
    geopoliticalSignificance: 'Primary driver of bitter diplomatic severed relations between Morocco and Algeria; centers on major global phosphate mineral reserves and Atlantic fishing rights.',
    notableFrontlines: ['Guerguerat Border Crossing (Mauritania Buffer)', 'Mahbes Sector (Northeastern Wall)', 'Tindouf Refugee Camp Staging Areas', 'Smara Coastal Phosphate Belt'],
  },

  // ==========================================
  // 26. CYPRUS GREEN LINE
  // ==========================================
  {
    id: 'cyprus-green-line',
    name: 'Cyprus Green Line (UN Buffer Zone)',
    conflictType: 'Frozen Conflict & Armistice',
    region: 'Southern Europe',
    coordinates: [33.36, 35.17],
    threatLevel: 'Elevated',
    status: 'Frozen Partition & Tense Demarcation Friction',
    startDate: 'July 1974 (partition established)',
    primaryForces: ['Turkish Peace Force in Cyprus (KTBK)', 'Cyprus National Guard (Republic of Cyprus)', 'UNFICYP (UN Peacekeeping Force in Cyprus)', 'British Sovereign Base Areas (Akrotiri & Dhekelia)'],
    description: 'A 180 km long United Nations buffer zone dividing the Mediterranean island of Cyprus and its capital Nicosia between the Republic of Cyprus and the de facto Turkish Republic of Northern Cyprus.',
    keyAssets: 'T-80U & AMX-30 Tanks, M48A5 Patton Tanks, Bayraktar TB2 Drones (Geçitkale Airbase), UN Patrol Towers',
    totalTroopCommitment: '~60,000 Military Troops & Peacekeepers',
    troopBreakdown: [
      {
        name: 'Turkish Armed Forces in Cyprus (KTBK) & Turkish Cypriot Forces',
        role: 'Territorial defense of northern Cyprus, naval airbase operations at Geçitkale, border watchposts',
        estimatedTroops: '~35,000 – 40,000 Turkish active duty troops + ~5,000 Turkish Cypriot Security Forces',
        equipment: 'M48A5T2 Patton tanks, ACV-15 infantry fighting vehicles, F-16 air support from mainland, TB2 drones',
        allegiance: 'Turkish Republic of Northern Cyprus (TRNC - recognized only by Turkey)',
      },
      {
        name: 'Cyprus National Guard & Greek Military Contingent (ELDYK)',
        role: 'Defense of the Republic of Cyprus, modernizing anti-tank and air-defense networks',
        estimatedTroops: '~12,000 active duty National Guard + ~1,000 ELDYK Greek soldiers + 50,000 reservists',
        equipment: 'Russian T-80U tanks, French Mistral MANPADS, Exocet anti-ship missiles, Serbian Nora B-52 howitzers',
        allegiance: 'Republic of Cyprus (EU Member State)',
      },
      {
        name: 'UNFICYP (UN Peacekeeping Force)',
        role: 'Patrolling the buffer zone, de-escalating buffer zone construction disputes and farmer incursions',
        estimatedTroops: '~800 international peacekeepers and civilian police',
        equipment: 'Light armored patrol vehicles, observation watchtowers, mediation units',
        allegiance: 'United Nations Security Council',
      },
    ],
    tacticalDoctrine: 'Static border observation and trench-line deterrence: opposing outposts face each other across distances as narrow as 3 meters in Nicosia’s old city, relying on sandbag redoubts, barbed wire, and sniper positions backed by armor units on high alert.',
    historicalContext: 'Followed intercommunal violence between Greek and Turkish Cypriots in the 1960s. In July 1974, a Greek-junta-backed coup aimed at annexing Cyprus to Greece prompted Turkey to launch a military invasion, occupying the northern 37% of the island.',
    currentSituation: 'Recurring friction in buffer zone villages (e.g., Pyla road clash in 2023); Turkey has established a drone base in northern Cyprus and reopened parts of the abandoned resort city of Varosha, defying UN resolutions.',
    casualtiesAndHumanitarian: 'Over 6,000 dead during the 1974 war; hundreds remain missing; complete physical partition of the island into Greek and Turkish language zones.',
    geopoliticalSignificance: 'Central obstacle to Turkey-EU relations; directly tied to contentious offshore maritime exclusive economic zones (EEZ) containing lucrative natural gas discoveries in the Levant Basin.',
    notableFrontlines: ['Nicosia Old Walled City Buffer Zone', 'Pyla Mixed Village Corridor', 'Varosha Ghost City Perimeter', 'Geçitkale Armed Drone Airbase'],
  },

  // ==========================================
  // 27. WEST PAPUA INDEPENDENCE STRUGGLE
  // ==========================================
  {
    id: 'papua-conflict',
    name: 'West Papua Independence Armed Conflict',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Southeast Asia',
    coordinates: [138.5, -4.1],
    threatLevel: 'Elevated',
    status: 'Jungle Mountain Guerrilla War & Hostage Operations',
    startDate: '1965',
    primaryForces: ['Indonesian Military & Police (TNI / Polri)', 'West Papua National Liberation Army (TPNPB-OPM)'],
    description: 'Protracted separatist struggle in the rugged highland jungles of Indonesian Papua, where indigenous Papuan guerrillas battle state forces over self-determination and the massive Grasberg gold-and-copper mine.',
    keyAssets: 'Mi-17 Transport Helicopters, Bell 412 Gunships, High-Altitude Jungle Tracking Units, Traditional Bows & Captured Rifles',
    totalTroopCommitment: '~30,000 Troops & Guerrillas',
    troopBreakdown: [
      {
        name: 'Indonesian National Armed Forces (TNI) & Police (Operasi Damai Cartenz)',
        role: 'Securing mining infrastructure, escorting road construction, conducting helicopter sweeps of highland valleys',
        estimatedTroops: '~25,000 soldiers and police commandos (Brimob)',
        equipment: 'Helicopter gunships, armored transport vehicles, specialized counter-guerrilla jungle units',
        allegiance: 'Republic of Indonesia',
      },
      {
        name: 'TPNPB-OPM (Free Papua Movement Liberation Army)',
        role: 'Mountain ambushes, sniper attacks on military outposts, burning infrastructure, taking foreign hostages',
        estimatedTroops: '~2,000 – 4,000 fighters across fragmented regional commands (Kodap)',
        equipment: 'Captured M16 and SS1 rifles, Mauser bolt-action guns, traditional bows and poisoned arrows',
        allegiance: 'Free Papua Movement (OPM)',
      },
    ],
    tacticalDoctrine: 'Alpine jungle guerrilla warfare: Papuan fighters exploit near-impassable rainforests and 4,000m glacial mountain terrain to conduct lightning ambushes on military patrols and airstrips, disappearing into cloud forests before gunships can react.',
    historicalContext: 'The former Dutch New Guinea was transferred to Indonesia following the controversial 1969 UN-supervised "Act of Free Choice," where roughly 1,000 selected Papuan elders voted unanimously under military duress to join Indonesia—a vote rejected as illegitimate by Papuan nationalists.',
    currentSituation: 'High tension following the 18-month kidnapping of a New Zealand pilot (released in September 2024); persistent clashes in Nduga, Intan Jaya, and Puncak regencies with thousands of displaced villagers.',
    casualtiesAndHumanitarian: 'Estimated tens of thousands dead over six decades; over 60,000 indigenous Papuans internally displaced into highland forests; severe restrictions on foreign journalists and human rights monitors.',
    geopoliticalSignificance: 'Home to the Grasberg Mine (world’s largest gold mine and second-largest copper mine operated by Freeport-McMoRan); sensitive diplomatic issue between Indonesia and Pacific island nations.',
    notableFrontlines: ['Nduga Regency Highland Gorges', 'Intan Jaya Gold Corridor', 'Puncak Jaya Mountain Passes', 'Timika Lowland Mining Enclave'],
  },

  // ==========================================
  // 28. SOUTHERN THAILAND INSURGENCY
  // ==========================================
  {
    id: 'deep-south-thailand',
    name: 'Southern Thailand Malay-Muslim Insurgency',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Southeast Asia',
    coordinates: [101.28, 6.54],
    threatLevel: 'Elevated',
    status: 'Low-Intensity Asymmetric Insurgency & IED Campaign',
    startDate: '1948 (surged dramatically January 2004)',
    primaryForces: ['Internal Security Operations Command (ISOC - Thai Army)', 'Barisan Revolusi Nasional (BRN-Coordinate)', 'Volunteer Defense Corps (Thahan Phran)'],
    description: 'Ethno-religious separatist insurgency in Thailand’s southernmost Malay-Muslim majority provinces (Pattani, Yala, Narathiwat), characterized by roadside IEDs, motorcycle drive-by shootings, and targeted assassinations.',
    keyAssets: 'Bomb-Proof V-150 Commando APCs, Night-Vision Checkpoints, Cooking-Gas Cylinder IEDs, Motorbike Ambush Teams',
    totalTroopCommitment: '~65,000 Troops & Insurgent Cells',
    troopBreakdown: [
      {
        name: 'Royal Thai Armed Forces & Paramilitary Rangers (Thahan Phran)',
        role: 'Road clearing, village checkpoints, school and teacher escorts, counter-terrorism raids',
        estimatedTroops: '~50,000 – 60,000 regular soldiers, rangers, and armed civil volunteers',
        equipment: 'Cadillac Gage armored cars, Reva MRAPs, patrol helicopters, thermal imaging',
        allegiance: 'Kingdom of Thailand',
      },
      {
        name: 'Barisan Revolusi Nasional (BRN)',
        role: 'Clandestine cell operations, roadside bomb detonation, targeted assassinations of state officials',
        estimatedTroops: '~2,000 – 3,000 active cell members and logistical village sympathizers',
        equipment: 'Improvised explosive devices (IEDs) made with ammonium nitrate, assault rifles, handguns',
        allegiance: 'BRN Leadership (governed by secretive governing council)',
      },
    ],
    tacticalDoctrine: 'Clandestine cell sabotage and hit-and-run ambushes: small insurgent teams bury 20–50 kg cooking-gas cylinder IEDs under asphalt roads, detonating them via walkie-talkie signals against passing military armored convoys, before melting back into rubber plantations.',
    historicalContext: 'The region constituted the historic Sultanate of Patani, annexed by the Kingdom of Siam in 1902. Decades of heavy-handed cultural assimilation policies and suppression of the Malay language sparked violent resistance.',
    currentSituation: 'Peace talks mediated by Malaysia have stalled; periodic waves of simultaneous bombings target gas stations, convenience stores, and electrical transmission pylons to undermine central state authority.',
    casualtiesAndHumanitarian: 'Over 7,500 killed and 14,000 injured since 2004, with the majority of victims being civilians (teachers, monks, rubber tappers, local officials).',
    geopoliticalSignificance: 'Critical border stability for Southeast Asia; concerns over links between local insurgents and broader transnational jihadist networks across maritime Southeast Asia.',
    notableFrontlines: ['Narathiwat Mountain Rubber Plantations', 'Yala City Commercial Defense Perimeter', 'Pattani River Basin Corridor', 'Tak Bai Border Crossing (Malaysia)'],
  },

  // ==========================================
  // 29. MINDANAO & BANGSAMORO (PHILIPPINES)
  // ==========================================
  {
    id: 'mindanao-conflict',
    name: 'Mindanao & Sulu Archipelago Conflict',
    conflictType: 'Insurgency & Guerrilla War',
    region: 'Southeast Asia',
    coordinates: [124.5, 7.8],
    threatLevel: 'Elevated',
    status: 'Counter-Terrorism Operations & Peace Transition',
    startDate: '1968 (post-Marawi siege operations 2017–present)',
    primaryForces: ['Armed Forces of the Philippines (AFP)', 'Moro Islamic Liberation Front (MILF - Peace Transition)', 'Dawlah Islamiyah / Abu Sayyaf Remnants (BIFF)', 'US Special Operations Advisory Group'],
    description: 'Post-insurgency counter-terrorism operations in the southern Philippines against ISIS-linked splinter factions rejecting the historic autonomy peace treaty with the Moro Islamic Liberation Front (MILF).',
    keyAssets: 'FA-50PH Golden Eagle Fighter-Jets, AW109 Attack Helicopters, Riverine Patrol Boats, ScanEagle UAVs',
    totalTroopCommitment: '~45,000 Soldiers & Remnant Fighters',
    troopBreakdown: [
      {
        name: 'Armed Forces of the Philippines (Western & Eastern Mindanao Commands)',
        role: 'Targeted jungle sweeps, eliminating high-value terror leaders, maritime interdiction in the Sulu Sea',
        estimatedTroops: '~35,000 active troops and specialized scout rangers',
        equipment: 'FA-50PH light attack fighters, Super Tucano A-29s, armored personnel carriers, ScanEagle drones',
        allegiance: 'Republic of the Philippines',
      },
      {
        name: 'Dawlah Islamiyah, BIFF & Abu Sayyaf Remnant Cells',
        role: 'Targeted bus bombings, extortion of rubber plantations, remote jungle camps in Lanao and Maguindanao',
        estimatedTroops: '~800 – 1,500 armed extremist fighters',
        equipment: 'M16 and M14 rifles, improvised rocket launchers, ammonium-nitrate IEDs, RPGs',
        allegiance: 'Islamic State East Asia Province (ISEA)',
      },
    ],
    tacticalDoctrine: 'Marshland and jungle counter-terrorism: AFP forces execute air-dropped special operations raids into the Liguasan Marsh and volcanic hills to destroy extremist encampments before they can stage urban bombings.',
    historicalContext: 'Moro Muslim resistance against Spanish, American, and Philippine rule spans over four centuries. The 2014 peace agreement created the Bangsamoro Autonomous Region (BARMM), but radical factions aligned with ISIS staged the 5-month urban siege of Marawi in 2017.',
    currentSituation: 'BARMM parliamentary elections are underway as part of the disarmament process; military operations focus on eliminating small, highly mobile Dawlah Islamiyah cells responsible for university and cathedral bombings.',
    casualtiesAndHumanitarian: 'Over 120,000 dead over five decades of conflict; Marawi city center remains partly in ruins with ongoing rehabilitation efforts.',
    geopoliticalSignificance: 'Vital trilateral maritime security corridor shared with Malaysia and Indonesia to prevent transnational terrorist movements across the Sulu and Celebes Seas.',
    notableFrontlines: ['Liguasan Marshland Hideouts (Maguindanao)', 'Lanao del Sur Mountain Jungle Redoubts', 'Basilan & Jolo Island Maritime Straits', 'Marawi City Rebuilding Perimeter'],
  },

  // ==========================================
  // 30. KOSOVO NORTHERN BORDER & IBAR RIVER
  // ==========================================
  {
    id: 'kosovo-serbia',
    name: 'Northern Kosovo & Ibar River Standoff',
    conflictType: 'Territorial & Border Dispute',
    region: 'Southern Europe',
    coordinates: [20.86, 42.89],
    threatLevel: 'Elevated',
    status: 'Tense Armistice & NATO Peacekeeper Deployments',
    startDate: '1998 (Banjska clash September 2023)',
    primaryForces: ['NATO Kosovo Force (KFOR)', 'Kosovo Police Special Intervention Unit (NJSI)', 'Serbian Armed Forces (Forward Alert across border)', 'Local Serb Community Defense Groups'],
    description: 'Flashpoint in the divided town of Mitrovica and the Serb-majority northern municipalities of Kosovo, where tensions frequently erupt into armed roadblocks and clashes over sovereignty and administration.',
    keyAssets: 'KFOR Stryker & VAB Armored Carriers, Kosovo Police MRAP Vehicles, Serbian MiG-29 & Pantsir-S1 (Border Garrisons)',
    totalTroopCommitment: '~10,000 Peacekeepers, Police & Border Forces',
    troopBreakdown: [
      {
        name: 'NATO Kosovo Force (KFOR)',
        role: 'Maintaining freedom of movement, preventing inter-ethnic violence, securing bridge crossings',
        estimatedTroops: '~4,500 multinational troops from Italy, USA, Hungary, UK, Turkey',
        equipment: 'Wheeled armored personnel carriers, surveillance helicopters, crowd-and-riot control gear',
        allegiance: 'NATO Alliance / UN Security Council Resolution 1244',
      },
      {
        name: 'Kosovo Police (Special Operations Units)',
        role: 'Enforcing Pristina’s sovereign authority, seizing illegal arms caches, border customs posts',
        estimatedTroops: '~3,000 regular and special intervention police officers',
        equipment: 'Armored patrol trucks, assault rifles, riot shields, surveillance drones',
        allegiance: 'Republic of Kosovo (Pristina)',
      },
      {
        name: 'Serbian Armed Forces (Forward Alert)',
        role: 'Border deterrence, high-readiness alerts in Raška and Novi Pazar military garrisons',
        estimatedTroops: '~25,000 troops placed on periodic elevated readiness',
        equipment: 'T-72MS tanks, Lazar armored combat vehicles, Pantsir air defense systems',
        allegiance: 'Republic of Serbia (Belgrade)',
      },
    ],
    tacticalDoctrine: 'Urban bridge barricades and cross-border paramilitary ambushes: local groups construct gravel barricades to sever road access, while armed commandos (such as the September 2023 Banjska monastery battle) utilize heavy weaponry and armored vehicles.',
    historicalContext: 'Roots in the 1998–1999 Kosovo War, ended by NATO’s 78-day bombing of Yugoslavia. Kosovo declared independence in 2008—recognized by over 100 countries including the US and major EU states, but rejected by Serbia, Russia, and China.',
    currentSituation: 'Kosovo has shut down parallel Serbian postal and financial offices in the north and banned the Serbian dinar, sparking high political tension; KFOR has reinforced patrols along the administrative boundary.',
    casualtiesAndHumanitarian: 'Over 13,000 dead during the 1998–1999 war; sporadic fatalities in clashes, with dozens of KFOR soldiers and Kosovo police injured during protests.',
    geopoliticalSignificance: 'Major diplomatic dispute impeding EU integration for both Serbia and Kosovo; key Russian geopolitical lever in the Western Balkans.',
    notableFrontlines: ['Mitrovica Ibar River Bridge Dividing Line', 'Banjska Monastery Mountain Sector', 'Jarinje & Brnjak Administrative Border Gates', 'Zvečan & Leposavić Municipal Centers'],
  },

  // ==========================================
  // 31. TRANSNISTRIA & COBASNA
  // ==========================================
  {
    id: 'transnistria-cobasna',
    name: 'Transnistria & Cobasna Ammunition Depot Standoff',
    conflictType: 'Frozen Conflict & Armistice',
    region: 'Eastern Europe',
    coordinates: [29.21, 47.76],
    threatLevel: 'Elevated',
    status: 'Frozen Conflict & Strategic Ammunition Cache Risk',
    startDate: 'March 1992 (armistice signed July 1992)',
    primaryForces: ['Operational Group of Russian Forces (OGRF)', 'Transnistrian Armed Forces', 'Moldovan Armed Forces', 'Joint Control Commission Peacekeepers'],
    description: 'A 400 km long breakaway pro-Russian strip of territory sandwiched between Moldova and Ukraine, housing the Cobasna depot—one of the largest Soviet-era ammunition stockpiles in Europe.',
    keyAssets: 'Cobasna Arms Depot (~20,000 Tons of Munitions), T-64BV Tanks, BTR-70 APCs, D-30 Howitzers',
    totalTroopCommitment: '~12,000 Garrison & Breakaway Troops',
    troopBreakdown: [
      {
        name: 'Operational Group of Russian Forces (OGRF) & Transnistrian Military',
        role: 'Guarding Cobasna ammunition depot, maintaining pro-Russian enclave security, border control',
        estimatedTroops: '~1,500 Russian soldiers + ~5,000 – 7,500 Transnistrian armed forces',
        equipment: 'T-64 tanks, BTR wheeled armored carriers, Grad MLRS, extensive ammunition stockpiles',
        allegiance: 'Russian Federation & Pridnestrovian Moldavian Republic (PMR)',
      },
      {
        name: 'Armed Forces of the Republic of Moldova',
        role: 'Sovereign territorial defense, joint border monitoring with Ukrainian and European border assistance',
        estimatedTroops: '~5,500 active military personnel',
        equipment: 'Piranha III armored vehicles (donated by Germany), light artillery, Western surveillance radar',
        allegiance: 'Republic of Moldova (Chisinau - Pro-EU Government)',
      },
    ],
    tacticalDoctrine: 'Static armistice garrisons and psychological deterrence: pro-Russian forces maintain permanent roadblocks along the Dniester River bridgeheads, relying on the catastrophic explosive hazard of the Cobasna ammunition cache as a deterrent.',
    historicalContext: 'Following the collapse of the Soviet Union, Russian-speaking residents east of the Dniester River feared union between Moldova and Romania, waging the 1992 War of Transnistria halted by Russia’s 14th Army under General Aleksandr Lebed.',
    currentSituation: 'Transnistria is completely surrounded by pro-Western Moldova and Ukraine, cutting off Russian resupply and troop rotation; Moldova is advancing EU accession while Ukraine secures its western flank.',
    casualtiesAndHumanitarian: 'Over 1,000 killed in the 1992 war; hundreds of thousands of residents hold multiple passports (Moldovan, Russian, Ukrainian).',
    geopoliticalSignificance: 'The Cobasna depot contains ~20,000 tons of Soviet shells and explosives; potential trigger point for destabilizing Moldova and the Black Sea region.',
    notableFrontlines: ['Cobasna Strategic Ammunition Depot', 'Dniester River Bridge Crossings (Bender & Tiraspol)', 'Kuchurgan Border Point with Ukraine', 'Chisinau Security Buffer Axis'],
  },

  // ==========================================
  // 32. LIBYAN ARMED STANDOFF
  // ==========================================
  {
    id: 'libya-standoff',
    name: 'Libyan Armed Standoff & Oil Crescent Partition',
    conflictType: 'Civil War',
    region: 'North Africa',
    coordinates: [14.4, 30.8],
    threatLevel: 'Elevated',
    status: 'Dual-Government Partition & Rival Military Mobilization',
    startDate: 'February 2011 (ceasefire signed October 2020)',
    primaryForces: ['Government of National Unity (GNU - Tripoli Militias)', 'Libyan National Army (LNA - General Khalifa Haftar)', 'Russian Africa Corps (ex-Wagner)', 'Turkish Military Advisory Mission'],
    description: 'De facto partition of Libya between two rival administrations (Tripoli in the west vs Benghazi/Tobruk in the east), with intermittent fighting over oil terminals and central bank revenues.',
    keyAssets: 'Bayraktar TB2 Drones, MiG-29 & Su-24 Fighter Jets, Pantsir-S1 Air Defense, Armed Technicals, Coastal Oil Terminals (Ras Lanuf, Sidra)',
    totalTroopCommitment: '~110,000 Armed Forces & Militias',
    troopBreakdown: [
      {
        name: 'Government of National Unity (GNU) & Western Militias',
        role: 'Securing the capital Tripoli, defending maritime approaches, Turkish military coordination',
        estimatedTroops: '~45,000 militia combatants and state security personnel',
        equipment: 'Bayraktar TB2 drones, BMC Kirpi armored vehicles, naval air defense, anti-tank missiles',
        allegiance: 'Government of National Unity (Prime Minister Abdul Hamid Dbeibeh / Tripoli)',
      },
      {
        name: 'Libyan National Army (LNA - General Khalifa Haftar) & Eastern Forces',
        role: 'Controlling eastern and southern oilfields, air defense of Sirte and Jufra airbases',
        estimatedTroops: '~50,000 – 60,000 regular troops and allied tribal units',
        equipment: 'Russian-supplied MiG-29s and Su-24s, T-72 tanks, Pantsir-S1 systems, armored troop carriers',
        allegiance: 'LNA High Command (Field Marshal Khalifa Haftar / Eastern House of Representatives)',
      },
      {
        name: 'Russian Africa Corps & Foreign Mercenaries',
        role: 'Air defense coverage at Jufra airbase, logistics coordination, escorting southern oil facilities',
        estimatedTroops: '~1,500 – 2,500 Russian and allied foreign combat personnel',
        equipment: 'Advanced radar systems, electronic warfare jamming, sniper teams, combat aircraft',
        allegiance: 'Russian Ministry of Defense / haftar Partnership',
      },
    ],
    tacticalDoctrine: 'Desert highway blockades and strategic oil terminal interdiction: rival factions deploy armed pickup technicals and heavy artillery along the coastal Sirte highway, weaponizing blockades of oil pipelines to force concessions over central bank revenues.',
    historicalContext: 'Began with the 2011 NATO-backed overthrow of Muammar Gaddafi, which fractured Libya into competing regional and tribal militias, culminating in the 2014–2020 civil war and General Haftar’s failed assault on Tripoli.',
    currentSituation: 'Fragile 2020 ceasefire remains in place, but periodic shootouts between rival militias erupt in Tripoli, while eastern forces orchestrate recurring oil production shutdowns.',
    casualtiesAndHumanitarian: 'Tens of thousands killed since 2011; key departure point for human-trafficking migrant boats crossing the central Mediterranean to Italy.',
    geopoliticalSignificance: 'Controls Africa’s largest proven crude oil reserves; strategic Russian military airbase hub (Al-Jufra) bridging Moscow to the Sahel and Sudan.',
    notableFrontlines: ['Sirte-Jufra Dividing Line (The Ceasefire Axis)', 'Tripoli Metropolitan Militia Clashes', 'Oil Crescent Ports (Ras Lanuf & Es Sider)', 'Southern Fezzan Smuggling Corridors'],
  },
];

// Major nuclear arsenals (Stockpile estimates)
export const NUCLEAR_STATES: { countryCode: string; name: string; warheads: number; status: string }[] = [
  { countryCode: 'RU', name: 'Russia', warheads: 5580, status: 'Active Nuclear Triad (Land, Submarine, Strategic Bombers)' },
  { countryCode: 'US', name: 'United States', warheads: 5044, status: 'Active Nuclear Triad (Minuteman III, Ohio SSBNs, B-2/B-21)' },
  { countryCode: 'CN', name: 'China', warheads: 500, status: 'Rapidly Expanding Triad (DF-41 ICBMs, Type 094 SSBNs)' },
  { countryCode: 'FR', name: 'France', warheads: 290, status: 'Independent Sea & Airborne Deterrent (Triomphant SSBNs, Rafale)' },
  { countryCode: 'GB', name: 'United Kingdom', warheads: 225, status: 'Continuous At-Sea Deterrent (Vanguard-class SSBNs with Trident)' },
  { countryCode: 'IN', name: 'India', warheads: 172, status: 'Declared No-First-Use Triad (Agni-V, Arihant SSBN)' },
  { countryCode: 'PK', name: 'Pakistan', warheads: 170, status: 'Full-Spectrum Deterrence (Shaheen-III, Tactical Babur)' },
  { countryCode: 'IL', name: 'Israel', warheads: 90, status: 'Strategic Ambiguity (Jericho III ICBMs, Dolphin Submarines)' },
  { countryCode: 'KP', name: 'North Korea', warheads: 50, status: 'Hwasong-17/18 Solid-Fuel ICBMs & Tactical Warheads' },
];
