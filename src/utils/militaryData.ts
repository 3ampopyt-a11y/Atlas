import { CountryData } from '../types.ts';

export interface DetailedMilitaryData {
  // Global & Budget
  globalRank: number;
  powerIndex: number;
  tier: string;
  defenseBudgetUSD: number; // in Billions USD
  defenseBudgetPercentGDP: number;
  perCapitaBudgetUSD: number;
  
  // Personnel Breakdown
  activePersonnel: number;
  reservePersonnel: number; // How many reserves!
  paramilitary: number;
  totalMilitaryPersonnel: number;
  availableManpower: number; // Reaching military age / eligible
  fitForService: number; // Fit for military combat service
  reserveRatioPercent: number; // Reserves as % of total manpower
  conscription: string;
  conscriptionDetail: string;

  // Land Combat Vehicles & Ground Forces
  tanks: number; // Main Battle Tanks (MBTs)
  armoredVehicles: number; // Armored Personnel Carriers & Infantry Fighting Vehicles
  selfPropelledArtillery: number; // Self-Propelled Howitzers
  towedArtillery: number; // Towed Field Artillery pieces
  rocketArtilleryMLRS: number; // Multiple Launch Rocket Systems / HIMARS
  totalGroundVehicles: number;
  flagshipVehicles: string[]; // Key tank / armored vehicle models

  // Aircraft Fleet & Air Wing
  totalAircraft: number; // Total Aircraft
  combatAircraft: number; // Fighters / Interceptors / Multi-role
  dedicatedAttackCAS: number; // Close Air Support / Dedicated Ground Attack
  transports: number; // Cargo / Strategic Airlift
  trainers: number; // Jet Trainers
  specialMission: number; // AWACS, Electronic Warfare, Maritime Patrol
  tankerFleet: number; // Aerial Refueling Tankers
  totalHelicopters: number; // All Rotary-Wing
  attackHelicopters: number; // Dedicated Attack Helicopters
  flagshipAircraft: string[]; // Key aircraft models

  // Naval Fleet & Ships
  navalFleetTotal: number; // Total Ships & Vessels
  aircraftCarriers: number; // Supercarriers & Fleet Carriers
  helicopterCarriers: number; // Amphibious Assault / LHD / LHA
  destroyers: number; // Guided Missile Destroyers
  frigates: number; // Guided Missile Frigates
  corvettes: number; // Corvettes & Light Surface Combatants
  submarines: number; // Total Submarines
  nuclearSubmarines: number; // Nuclear Ballistic SSBN / Nuclear Attack SSN
  dieselElectricSubmarines: number; // AIP & Conventional Attack Subs
  patrolCraft: number; // Offshore & Coastal Patrol Boats / Fast Missile Craft
  mineWarfare: number; // Minesweepers & Minehunters
  auxiliaryVessels: number; // Fleet Replenishment & Support Ships
  flagshipVessels: string[]; // Key flagship ships & naval classes

  // Strategic & Air Defense
  nuclearStatus: string;
  nuclearWarheads: number;
  nuclearTriad: string;
  airDefenseSystems: string[];
  strategicDoctrine: string;
  spaceAndCyber: string;
  alliances: string[];
}

// Curated comprehensive military profiles for key global powers
const CURATED_MILITARY_PROFILES: Record<string, Partial<DetailedMilitaryData>> = {
  // United States
  US: {
    globalRank: 1,
    powerIndex: 0.0699,
    tier: 'Superpower',
    defenseBudgetUSD: 886.0,
    defenseBudgetPercentGDP: 3.4,
    activePersonnel: 1328000,
    reservePersonnel: 799500,
    paramilitary: 0,
    availableManpower: 153000000,
    fitForService: 122400000,
    conscriptionDetail: 'All-Volunteer Force (Selective Service standby registry)',
    tanks: 4650,
    armoredVehicles: 360006,
    selfPropelledArtillery: 1595,
    towedArtillery: 1267,
    rocketArtilleryMLRS: 694,
    flagshipVehicles: ['M1A2 SEPv3 Abrams MBT', 'M2A4 Bradley IFV', 'Stryker DVHA1', 'M109A7 Paladin 155mm', 'M142 HIMARS'],
    totalAircraft: 13209,
    combatAircraft: 1854,
    dedicatedAttackCAS: 860,
    transports: 945,
    trainers: 2638,
    specialMission: 730,
    tankerFleet: 568,
    totalHelicopters: 5737,
    attackHelicopters: 1000,
    flagshipAircraft: ['F-35A/B/C Lightning II', 'F-22A Raptor', 'F-15EX Eagle II', 'B-21 Raider', 'AH-64E Apache Guardian', 'C-17 Globemaster III'],
    navalFleetTotal: 472,
    aircraftCarriers: 11,
    helicopterCarriers: 9,
    destroyers: 73,
    frigates: 0,
    corvettes: 25,
    submarines: 67,
    nuclearSubmarines: 67,
    dieselElectricSubmarines: 0,
    patrolCraft: 10,
    mineWarfare: 8,
    auxiliaryVessels: 85,
    flagshipVessels: ['USS Gerald R. Ford (CVN-78)', 'Arleigh Burke Flight III DDG', 'Virginia-class Block V SSN', 'America-class LHA'],
    nuclearWarheads: 5244,
    nuclearTriad: 'Full Strategic Triad: Minuteman III ICBMs, Ohio-class SSBNs, B-2A & B-52H Strategic Bombers',
    airDefenseSystems: ['Patriot PAC-3 MSE', 'THAAD (Terminal High Altitude Area Defense)', 'Aegis BMD (SM-3 Block IIA / SM-6)', 'NASAMS'],
  },

  // China
  CN: {
    globalRank: 3,
    powerIndex: 0.0722,
    tier: 'Superpower',
    defenseBudgetUSD: 296.0,
    defenseBudgetPercentGDP: 1.7,
    activePersonnel: 2035000,
    reservePersonnel: 510000,
    paramilitary: 624000,
    availableManpower: 755000000,
    fitForService: 620000000,
    conscriptionDetail: 'Selective Conscription (Universal 2-year draft registration with high volunteer uptake)',
    tanks: 5000,
    armoredVehicles: 174300,
    selfPropelledArtillery: 3850,
    towedArtillery: 1434,
    rocketArtilleryMLRS: 3180,
    flagshipVehicles: ['Type 99A MBT', 'Type 96B MBT', 'Type 15 Light Tank', 'Type 04A IFV', 'PCL-181 155mm', 'PHL-16 MLRS'],
    totalAircraft: 3304,
    combatAircraft: 1207,
    dedicatedAttackCAS: 371,
    transports: 289,
    trainers: 402,
    specialMission: 112,
    tankerFleet: 10,
    totalHelicopters: 1000,
    attackHelicopters: 281,
    flagshipAircraft: ['Chengdu J-20 Mighty Dragon', 'Shenyang J-16', 'J-10C Vigorous Dragon', 'J-15 Flying Shark', 'WZ-10 Attack Helicopter', 'Xi\'an Y-20 Kunpeng'],
    navalFleetTotal: 730,
    aircraftCarriers: 3,
    helicopterCarriers: 3,
    destroyers: 49,
    frigates: 42,
    corvettes: 72,
    submarines: 61,
    nuclearSubmarines: 12,
    dieselElectricSubmarines: 49,
    patrolCraft: 150,
    mineWarfare: 36,
    auxiliaryVessels: 95,
    flagshipVessels: ['Fujian (Type 003 EMALS Carrier)', 'Type 055 Large Guided Destroyer (Nanchang)', 'Type 075 LHD', 'Type 094 Jin SSBN'],
    nuclearWarheads: 500,
    nuclearTriad: 'Expanding Strategic Triad: DF-41 / DF-31AG Road-Mobile ICBMs, Type 094 SSBNs with JL-2/JL-3, H-6N Bombers',
    airDefenseSystems: ['HQ-9B Long-Range SAM', 'HQ-16B', 'HQ-22', 'S-400 Triumf Batteries', 'LD-2000 C-RAM'],
  },

  // Russia
  RU: {
    globalRank: 2,
    powerIndex: 0.0702,
    tier: 'Great Power',
    defenseBudgetUSD: 109.0,
    defenseBudgetPercentGDP: 5.9,
    activePersonnel: 1320000,
    reservePersonnel: 2000000,
    paramilitary: 250000,
    availableManpower: 70000000,
    fitForService: 48000000,
    conscriptionDetail: 'Mandatory 12-Month Conscription for males aged 18-30 supplemented by Contract Soldiers (Kontraktniki)',
    tanks: 14777,
    armoredVehicles: 161382,
    selfPropelledArtillery: 6208,
    towedArtillery: 4465,
    rocketArtilleryMLRS: 4000,
    flagshipVehicles: ['T-90M Proryv-3 MBT', 'T-80BVM MBT', 'T-72B3M MBT', 'BMP-3M IFV', 'BTR-82A', '2S19 Msta-S 152mm', 'TOS-1A Heavy Flamethrower'],
    totalAircraft: 4255,
    combatAircraft: 809,
    dedicatedAttackCAS: 730,
    transports: 450,
    trainers: 550,
    specialMission: 145,
    tankerFleet: 19,
    totalHelicopters: 1547,
    attackHelicopters: 559,
    flagshipAircraft: ['Sukhoi Su-57 Felon', 'Sukhoi Su-35S Flanker-M', 'Sukhoi Su-34 Fullback', 'MiG-31BM Foxhound', 'Kamov Ka-52 Alligator', 'Mil Mi-28NM Havoc'],
    navalFleetTotal: 781,
    aircraftCarriers: 1,
    helicopterCarriers: 0,
    destroyers: 14,
    frigates: 12,
    corvettes: 83,
    submarines: 65,
    nuclearSubmarines: 32,
    dieselElectricSubmarines: 33,
    patrolCraft: 122,
    mineWarfare: 49,
    auxiliaryVessels: 110,
    flagshipVessels: ['Borei-A SSBN (Knyaz Vladimir)', 'Yasen-M SSGN (Kazan)', 'Admiral Gorshkov Frigate', 'Pyotr Velikiy Battlecruiser'],
    nuclearWarheads: 5580,
    nuclearTriad: 'Massive Strategic Triad: RS-24 Yars / RS-28 Sarmat ICBMs, Borei-A SSBNs with Bulava SLBMs, Tu-160M & Tu-95MS Bombers',
    airDefenseSystems: ['S-400 Triumf', 'S-500 Prometheus', 'S-300V4', 'Pantsir-S1', 'Tor-M2', 'Buk-M3'],
  },

  // India
  IN: {
    globalRank: 4,
    powerIndex: 0.1023,
    tier: 'Great Power',
    defenseBudgetUSD: 74.0,
    defenseBudgetPercentGDP: 2.4,
    activePersonnel: 1455550,
    reservePersonnel: 1155000,
    paramilitary: 2527000,
    availableManpower: 630000000,
    fitForService: 505000000,
    conscriptionDetail: 'All-Volunteer Force (Agnipath scheme for 4-year service enlistees)',
    tanks: 4614,
    armoredVehicles: 151248,
    selfPropelledArtillery: 140,
    towedArtillery: 3240,
    rocketArtilleryMLRS: 264,
    flagshipVehicles: ['T-90S Bhishma MBT', 'Arjun Mk-1A MBT', 'K9 Vajra-T 155mm', 'BMP-2 Sarath', 'Pinaka Multi-Barrel Rocket System'],
    totalAircraft: 2296,
    combatAircraft: 606,
    dedicatedAttackCAS: 130,
    transports: 264,
    trainers: 351,
    specialMission: 71,
    tankerFleet: 6,
    totalHelicopters: 869,
    attackHelicopters: 40,
    flagshipAircraft: ['Sukhoi Su-30MKI', 'Dassault Rafale EH/DH', 'HAL Tejas Mk1A', 'AH-64E Apache', 'HAL Prachand LCH', 'Boeing P-8I Neptune'],
    navalFleetTotal: 294,
    aircraftCarriers: 2,
    helicopterCarriers: 1,
    destroyers: 12,
    frigates: 12,
    corvettes: 18,
    submarines: 18,
    nuclearSubmarines: 2,
    dieselElectricSubmarines: 16,
    patrolCraft: 134,
    mineWarfare: 0,
    auxiliaryVessels: 45,
    flagshipVessels: ['INS Vikrant (IAC-1 Carrier)', 'INS Vikramaditya Carrier', 'Visakhapatnam-class DDG', 'INS Arihant SSBN'],
    nuclearWarheads: 172,
    nuclearTriad: 'Operational Nuclear Triad: Agni-V ICBMs, Arihant-class SSBNs with K-15/K-4, Mirage 2000 & Rafale with gravity bombs',
    airDefenseSystems: ['S-400 Triumf (Sudarshan)', 'MR-SAM (Barak-8)', 'Akash Prime', 'SPYDER-SR'],
  },

  // South Korea
  KR: {
    globalRank: 5,
    powerIndex: 0.1416,
    tier: 'Great Power',
    defenseBudgetUSD: 44.7,
    defenseBudgetPercentGDP: 2.6,
    activePersonnel: 500000,
    reservePersonnel: 3100000, // Enormous reserve force!
    paramilitary: 50000,
    availableManpower: 26000000,
    fitForService: 21000000,
    conscriptionDetail: 'Mandatory Conscription: 18 months (Army/Marines), 20 months (Navy), 21 months (Air Force)',
    tanks: 2501,
    armoredVehicles: 66492,
    selfPropelledArtillery: 3200,
    towedArtillery: 480,
    rocketArtilleryMLRS: 580,
    flagshipVehicles: ['K2 Black Panther MBT', 'K1A2 MBT', 'K9 Thunder 155mm Howitzer', 'K21 Infantry Fighting Vehicle', 'K239 Chunmoo MLRS'],
    totalAircraft: 1576,
    combatAircraft: 402,
    dedicatedAttackCAS: 98,
    transports: 42,
    trainers: 295,
    specialMission: 30,
    tankerFleet: 4,
    totalHelicopters: 739,
    attackHelicopters: 112,
    flagshipAircraft: ['F-35A Lightning II', 'KAI KF-21 Boramae', 'F-15K Slam Eagle', 'FA-50 Fighting Eagle', 'AH-64E Apache Guardian'],
    navalFleetTotal: 157,
    aircraftCarriers: 0,
    helicopterCarriers: 2,
    destroyers: 13,
    frigates: 17,
    corvettes: 7,
    submarines: 22,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 22,
    patrolCraft: 65,
    mineWarfare: 14,
    auxiliaryVessels: 25,
    flagshipVessels: ['ROKS Sejong the Great Aegis Destroyer', 'Dosan Ahn Changho-class SSK (AIP + SLBM)', 'Dokdo-class Amphibious LPH'],
    nuclearWarheads: 0,
    nuclearTriad: 'Non-Nuclear State (Protected under US Nuclear Umbrella; possessing conventional Hyunmoo-IV/V bunker-busting ballistic missiles)',
    airDefenseSystems: ['Cheongung II (KM-SAM Block II)', 'L-SAM High Altitude Interceptor', 'Patriot PAC-3 MSE', 'K-RAM C-Dome Iron Dome-equivalent'],
  },

  // United Kingdom
  GB: {
    globalRank: 6,
    powerIndex: 0.1443,
    tier: 'Great Power',
    defenseBudgetUSD: 68.5,
    defenseBudgetPercentGDP: 2.3,
    activePersonnel: 184860,
    reservePersonnel: 41500,
    paramilitary: 0,
    availableManpower: 30000000,
    fitForService: 24500000,
    conscriptionDetail: 'All-Volunteer Force (Professional standing armed forces with Army Reserve)',
    tanks: 213,
    armoredVehicles: 27203,
    selfPropelledArtillery: 89,
    towedArtillery: 118,
    rocketArtilleryMLRS: 44,
    flagshipVehicles: ['Challenger 2 / Challenger 3 MBT', 'Ajax Armored Reconnaissance', 'Boxer Mechanized Infantry Vehicle', 'Archer 155mm Howitzer'],
    totalAircraft: 664,
    combatAircraft: 119,
    dedicatedAttackCAS: 23,
    transports: 44,
    trainers: 224,
    specialMission: 28,
    tankerFleet: 9,
    totalHelicopters: 233,
    attackHelicopters: 33,
    flagshipAircraft: ['Eurofighter Typhoon FGR4', 'Lockheed Martin F-35B Lightning II', 'Boeing P-8A Poseidon MRA1', 'AH-64E Apache Version 6', 'Airbus A400M Atlas'],
    navalFleetTotal: 73,
    aircraftCarriers: 2,
    helicopterCarriers: 0,
    destroyers: 6,
    frigates: 11,
    corvettes: 0,
    submarines: 10,
    nuclearSubmarines: 10,
    dieselElectricSubmarines: 0,
    patrolCraft: 26,
    mineWarfare: 11,
    auxiliaryVessels: 9,
    flagshipVessels: ['HMS Queen Elizabeth (R08 Supercarrier)', 'HMS Prince of Wales (R09)', 'Type 45 Daring-class Guided Destroyer', 'Astute-class Nuclear Attack Submarine'],
    nuclearWarheads: 225,
    nuclearTriad: 'Continuous At-Sea Deterrent (CASD): Vanguard-class Nuclear Ballistic Submarines with Trident II D5 SLBMs (Transitioning to Dreadnought-class)',
    airDefenseSystems: ['Sky Sabre (CAMM Sea Ceptor / Land Ceptor)', 'PAAMS (Sea Viper Aster 30/15) on Type 45'],
  },

  // Japan
  JP: {
    globalRank: 7,
    powerIndex: 0.1601,
    tier: 'Great Power',
    defenseBudgetUSD: 53.0,
    defenseBudgetPercentGDP: 1.6,
    activePersonnel: 247150,
    reservePersonnel: 56000,
    paramilitary: 0,
    availableManpower: 53000000,
    fitForService: 43000000,
    conscriptionDetail: 'All-Volunteer Force (Japan Self-Defense Forces / JSDF)',
    tanks: 1004,
    armoredVehicles: 33500,
    selfPropelledArtillery: 214,
    towedArtillery: 480,
    rocketArtilleryMLRS: 99,
    flagshipVehicles: ['Type 10 MBT', 'Type 90 MBT', 'Type 16 Maneuver Combat Vehicle (MCV)', 'Type 19 155mm Wheeled Howitzer', 'Type 89 IFV'],
    totalAircraft: 1459,
    combatAircraft: 278,
    dedicatedAttackCAS: 0,
    transports: 58,
    trainers: 426,
    specialMission: 156,
    tankerFleet: 8,
    totalHelicopters: 574,
    attackHelicopters: 119,
    flagshipAircraft: ['F-35A/B Lightning II', 'Mitsubishi F-2A/B', 'Boeing F-15J/DJ Eagle', 'Kawasaki P-1 Maritime Patrol', 'Boeing E-767 AWACS', 'V-22 Osprey'],
    navalFleetTotal: 155,
    aircraftCarriers: 2, // Converted Izumo-class
    helicopterCarriers: 2,
    destroyers: 36,
    frigates: 10,
    corvettes: 6,
    submarines: 22,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 22,
    patrolCraft: 6,
    mineWarfare: 22,
    auxiliaryVessels: 35,
    flagshipVessels: ['JS Izumo (DDH-183 F-35B Carrier)', 'JS Kaga (DDH-184)', 'Maya-class Aegis Destroyer', 'Taigei-class Lithium-Ion Battery Submarine'],
    nuclearWarheads: 0,
    nuclearTriad: 'Non-Nuclear State (Strict Three Non-Nuclear Principles, protected under US Nuclear Umbrella)',
    airDefenseSystems: ['Patriot PAC-3 MSE', 'Aegis BMD (SM-3 Block IIA)', 'Type 03 Chu-SAM (Kai)'],
  },

  // Turkey
  TR: {
    globalRank: 8,
    powerIndex: 0.1697,
    tier: 'Regional Power',
    defenseBudgetUSD: 40.0,
    defenseBudgetPercentGDP: 3.5,
    activePersonnel: 355200,
    reservePersonnel: 378700,
    paramilitary: 156800,
    availableManpower: 42000000,
    fitForService: 35000000,
    conscriptionDetail: 'Mandatory 6-Month Conscription for all males aged 20-41 (Paid exemption options available)',
    tanks: 2231,
    armoredVehicles: 55104,
    selfPropelledArtillery: 1038,
    towedArtillery: 1140,
    rocketArtilleryMLRS: 504,
    flagshipVehicles: ['Altay MBT', 'Leopard 2A4 (TİYK Upgrade)', 'M60T Sabra MBT', 'T-155 Fırtına II 155mm', 'FNSS Pars IV / Arma 8x8'],
    totalAircraft: 1069,
    combatAircraft: 205,
    dedicatedAttackCAS: 0,
    transports: 81,
    trainers: 275,
    specialMission: 22,
    tankerFleet: 7,
    totalHelicopters: 502,
    attackHelicopters: 111,
    flagshipAircraft: ['TAI KAAN 5th-Gen Fighter', 'F-16C/D Block 50+ (Özgür)', 'Bayraktar TB2 / TB3 / Akıncı UCAVs', 'T129 ATAK', 'TAI Anka-3 Stealth Drone'],
    navalFleetTotal: 186,
    aircraftCarriers: 1, // TCG Anadolu drone/amphibious carrier
    helicopterCarriers: 1,
    destroyers: 0,
    frigates: 16,
    corvettes: 9,
    submarines: 12,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 12,
    patrolCraft: 35,
    mineWarfare: 11,
    auxiliaryVessels: 48,
    flagshipVessels: ['TCG Anadolu (L-400 Amphibious Drone Carrier)', 'Istanbul-class Frigate (TCG Istanbul)', 'Reis-class Type 214 AIP Submarine (TCG Piri Reis)'],
    nuclearWarheads: 0,
    nuclearTriad: 'NATO Nuclear Sharing: Hosts ~20-50 US B61 Nuclear Gravity Bombs at Incirlik Air Base',
    airDefenseSystems: ['S-400 Triumf Batteries', 'Siper Block-1/2 Long-Range', 'Hisar-O+ / Hisar-A+', 'Korkut 35mm SPAAG'],
  },

  // Israel
  IL: {
    globalRank: 17,
    powerIndex: 0.2596,
    tier: 'Regional Power',
    defenseBudgetUSD: 24.4,
    defenseBudgetPercentGDP: 5.3,
    activePersonnel: 170000,
    reservePersonnel: 465000, // Massive rapid mobilization force!
    paramilitary: 35000,
    availableManpower: 3800000,
    fitForService: 3100000,
    conscriptionDetail: 'Universal Mandatory Conscription: 32 months for males, 24 months for females, followed by active annual reserve duty',
    tanks: 1370,
    armoredVehicles: 43400,
    selfPropelledArtillery: 650,
    towedArtillery: 300,
    rocketArtilleryMLRS: 150,
    flagshipVehicles: ['Merkava Mk IV Barak / Mk IVM with Trophy APS', 'Namer Heavy Armored Personnel Carrier', 'Eitan 8x8 Armored Vehicle', 'Roem 155mm Self-Propelled Howitzer', 'PULS Rocket Artillery'],
    totalAircraft: 612,
    combatAircraft: 241,
    dedicatedAttackCAS: 0,
    transports: 15,
    trainers: 153,
    specialMission: 23,
    tankerFleet: 7,
    totalHelicopters: 146,
    attackHelicopters: 48,
    flagshipAircraft: ['F-35I Adir (Stealth Fighter)', 'F-15I Ra\'am', 'F-16I Sufa', 'AH-64D Apache Longbow', 'Heron TP Eitan UAV', 'Gulfstream G550 Eitam CAEW'],
    navalFleetTotal: 67,
    aircraftCarriers: 0,
    helicopterCarriers: 0,
    destroyers: 0,
    frigates: 0,
    corvettes: 7,
    submarines: 5,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 5,
    patrolCraft: 45,
    mineWarfare: 0,
    auxiliaryVessels: 10,
    flagshipVessels: ['Sa\'ar 6-class Missile Corvette (INS Magen)', 'Dolphin II-class AIP Submarine (INS Drakon)', 'Sa\'ar 5-class Corvette'],
    nuclearWarheads: 90,
    nuclearTriad: 'Undeclared Strategic Triad: Jericho III ICBMs, Dolphin II AIP Submarines with nuclear cruise missiles, F-15I strike aircraft',
    airDefenseSystems: ['Iron Dome (Tamir Interceptors)', 'David\'s Sling (Stunner)', 'Arrow 2 & Arrow 3 Exo-Atmospheric BMD', 'Iron Beam (100kW Laser Defense)'],
  },

  // Ukraine
  UA: {
    globalRank: 15,
    powerIndex: 0.2598,
    tier: 'Regional Power',
    defenseBudgetUSD: 42.0,
    defenseBudgetPercentGDP: 31.5,
    activePersonnel: 900000,
    reservePersonnel: 1200000,
    paramilitary: 100000,
    availableManpower: 15000000,
    fitForService: 11000000,
    conscriptionDetail: 'Full Wartime National Mobilization (Martial Law)',
    tanks: 1770,
    armoredVehicles: 22000,
    selfPropelledArtillery: 950,
    towedArtillery: 800,
    rocketArtilleryMLRS: 420,
    flagshipVehicles: ['Leopard 2A6 / 2A4 MBT', 'M1A1 Abrams MBT', 'Challenger 2 MBT', 'M2A2 Bradley IFV', 'CV90 IFV', 'CAESAR 155mm', 'M142 HIMARS'],
    totalAircraft: 192,
    combatAircraft: 72,
    dedicatedAttackCAS: 17,
    transports: 15,
    trainers: 45,
    specialMission: 5,
    tankerFleet: 0,
    totalHelicopters: 115,
    attackHelicopters: 33,
    flagshipAircraft: ['General Dynamics F-16AM/BM Fighting Falcon', 'MiG-29MU2 Fulcrum', 'Su-27 Flanker', 'Su-24M Fencer', 'Mil Mi-24 Hind', 'Magura V5 Naval Drone'],
    navalFleetTotal: 38,
    aircraftCarriers: 0,
    helicopterCarriers: 0,
    destroyers: 0,
    frigates: 1, // Hetman Ivan Mazepa under sea trials
    corvettes: 1,
    submarines: 0,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 0,
    patrolCraft: 22,
    mineWarfare: 2,
    auxiliaryVessels: 12,
    flagshipVessels: ['Ada-class Corvette (Hetman Ivan Mazepa)', 'Sea Baby & Magura V5 USV Autonomous Strike Drone Fleets'],
    nuclearWarheads: 0,
    nuclearTriad: 'Non-Nuclear State (Surrendered 3rd largest nuclear arsenal under 1994 Budapest Memorandum)',
    airDefenseSystems: ['Patriot PAC-3 MSE', 'SAMP/T Mamba', 'NASAMS', 'IRIS-T SLM', 'Gepard 35mm Flakpanzer', 'Vampire C-UAS'],
  },

  // Taiwan
  TW: {
    globalRank: 24,
    powerIndex: 0.3643,
    tier: 'Middle Power',
    defenseBudgetUSD: 19.0,
    defenseBudgetPercentGDP: 2.6,
    activePersonnel: 169000,
    reservePersonnel: 1657000, // Very high reserve pool!
    paramilitary: 11800,
    availableManpower: 12000000,
    fitForService: 9800000,
    conscriptionDetail: 'Mandatory 1-Year Military Service for males aged 18+ with active mobilization reserve recall',
    tanks: 1010,
    armoredVehicles: 4108,
    selfPropelledArtillery: 482,
    towedArtillery: 1160,
    rocketArtilleryMLRS: 156,
    flagshipVehicles: ['M1A2T Abrams MBT', 'CM-11 Brave Tiger', 'M60A3 TTS', 'CM-32/34 Clouded Leopard 8x8 (30mm Mk44 Bushmaster)', 'Thunderbolt-2000 MLRS'],
    totalAircraft: 750,
    combatAircraft: 286,
    dedicatedAttackCAS: 0,
    transports: 21,
    trainers: 207,
    specialMission: 19,
    tankerFleet: 0,
    totalHelicopters: 208,
    attackHelicopters: 91,
    flagshipAircraft: ['F-16V (Block 70/72 Viper)', 'Mirage 2000-5Ei', 'AIDC F-CK-1 Ching-kuo', 'AH-64E Apache Guardian', 'AH-1W SuperCobra', 'E-2K Hawkeye AWACS'],
    navalFleetTotal: 117,
    aircraftCarriers: 0,
    helicopterCarriers: 0,
    destroyers: 4,
    frigates: 22,
    corvettes: 2,
    submarines: 4,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 4,
    patrolCraft: 44,
    mineWarfare: 8,
    auxiliaryVessels: 18,
    flagshipVessels: ['Hai Kun-class Indigenous Defense Submarine (IDS)', 'Kee Lung-class Guided Destroyer (DDG-1801)', 'Tuo Chiang-class Stealth Wave-Piercing Catamaran', 'Kang Ding-class Stealth Frigate'],
    nuclearWarheads: 0,
    nuclearTriad: 'Non-Nuclear State (Possesses indigenous Hsiung Feng IIE land-attack cruise missiles with 1,200km range & Yun Feng supersonic missiles)',
    airDefenseSystems: ['Tien Kung III (Sky Bow III)', 'Patriot PAC-3 / PAC-2 GEM', 'Antelope Air Defense System', 'Sea Oryx (Sea-based RAM equivalent)'],
  },

  // France
  FR: {
    globalRank: 11,
    powerIndex: 0.2229,
    tier: 'Great Power',
    defenseBudgetUSD: 56.0,
    defenseBudgetPercentGDP: 1.9,
    activePersonnel: 205000,
    reservePersonnel: 41050,
    paramilitary: 175000,
    availableManpower: 29000000,
    fitForService: 23500000,
    conscriptionDetail: 'All-Volunteer Force (Universal National Service / SNU civic youth program)',
    tanks: 222,
    armoredVehicles: 85023,
    selfPropelledArtillery: 109,
    towedArtillery: 12,
    rocketArtilleryMLRS: 13,
    flagshipVehicles: ['Leclerc XLR MBT', 'VBCI 8x8 Armored Fighting Vehicle', 'Jaguar EBRC 6x6 Reconnaissance', 'Griffon VBMR', 'CAESAR 155mm Truck Howitzer'],
    totalAircraft: 972,
    combatAircraft: 226,
    dedicatedAttackCAS: 0,
    transports: 118,
    trainers: 165,
    specialMission: 46,
    tankerFleet: 19,
    totalHelicopters: 438,
    attackHelicopters: 69,
    flagshipAircraft: ['Dassault Rafale C/B/M (Omnirole Fighter)', 'Mirage 2000-5F', 'Eurocopter Tiger Attack Helicopter', 'NH90 Caïman', 'Airbus A400M Atlas', 'Airbus A330 MRTT Phénix'],
    navalFleetTotal: 128,
    aircraftCarriers: 1, // Charles de Gaulle Nuclear CATOBAR Carrier
    helicopterCarriers: 3, // Mistral-class LHD
    destroyers: 10,
    frigates: 11,
    corvettes: 0,
    submarines: 10,
    nuclearSubmarines: 10,
    dieselElectricSubmarines: 0,
    patrolCraft: 17,
    mineWarfare: 17,
    auxiliaryVessels: 25,
    flagshipVessels: ['Charles de Gaulle (R91 Nuclear Supercarrier)', 'Mistral-class LHD (Mistral, Tonnerre, Dixmude)', 'FREMM Aquitaine-class Destroyer', 'Suffren-class Nuclear Attack Submarine (Barracuda)'],
    nuclearWarheads: 290,
    nuclearTriad: 'Dual Strategic Deterrent (Force de Frappe): Triomphant-class SSBNs with M51 SLBMs, and Strategic Air Forces (FAS) Rafale with ASMP-A nuclear missiles',
    airDefenseSystems: ['SAMP/T Mamba (Aster 30 Block 1 NT)', 'Mistral 3 Short-Range Air Defense', 'Crotale NG'],
  },

  // Germany
  DE: {
    globalRank: 19,
    powerIndex: 0.2847,
    tier: 'Middle Power',
    defenseBudgetUSD: 72.0,
    defenseBudgetPercentGDP: 2.1,
    activePersonnel: 181500,
    reservePersonnel: 34000,
    paramilitary: 0,
    availableManpower: 36000000,
    fitForService: 29000000,
    conscriptionDetail: 'All-Volunteer Force (Conscription suspended in 2011; discussions underway for Swedish-style selective draft model)',
    tanks: 295,
    armoredVehicles: 68000,
    selfPropelledArtillery: 121,
    towedArtillery: 0,
    rocketArtilleryMLRS: 38,
    flagshipVehicles: ['Leopard 2A7V / 2A8 MBT', 'Puma Infantry Fighting Vehicle', 'Boxer GTK Armored Transport', 'Panzerhaubitze 2000 155mm', 'MARS II Rocket Artillery'],
    totalAircraft: 618,
    combatAircraft: 134,
    dedicatedAttackCAS: 68,
    transports: 72,
    trainers: 37,
    specialMission: 7,
    tankerFleet: 0,
    totalHelicopters: 318,
    attackHelicopters: 55,
    flagshipAircraft: ['Eurofighter Typhoon Tranche 3/4', 'Panavia Tornado IDS/ECR (Nuclear Strike / EW)', 'F-35A Lightning II (On delivery for nuclear sharing)', 'Tiger UHT Helicopter', 'NH90 Sea Lion', 'Airbus A400M Atlas'],
    navalFleetTotal: 80,
    aircraftCarriers: 0,
    helicopterCarriers: 0,
    destroyers: 0,
    frigates: 12,
    corvettes: 5,
    submarines: 6,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 6,
    patrolCraft: 4,
    mineWarfare: 12,
    auxiliaryVessels: 18,
    flagshipVessels: ['F125 Baden-Württemberg-class Frigate', 'F124 Sachsen-class Air Defense Frigate', 'K130 Braunschweig-class Corvette', 'Type 212A Fuel-Cell Air-Independent Propulsion Submarine'],
    nuclearWarheads: 0,
    nuclearTriad: 'NATO Nuclear Sharing: Hosts ~20 US B61 Nuclear Gravity Bombs at Büchel Air Base (Tornado / F-35A dual-capable aircraft)',
    airDefenseSystems: ['Patriot PAC-3 MSE', 'Arrow 3 Exo-Atmospheric BMD (Purchased from Israel)', 'IRIS-T SLM / SLS', 'MANTIS Short-Range C-RAM'],
  },

  // Poland
  PL: {
    globalRank: 21,
    powerIndex: 0.2917,
    tier: 'Regional Power',
    defenseBudgetUSD: 38.7,
    defenseBudgetPercentGDP: 4.2,
    activePersonnel: 202100,
    reservePersonnel: 150000,
    paramilitary: 50000,
    availableManpower: 18000000,
    fitForService: 14500000,
    conscriptionDetail: 'Voluntary Military Service with compulsory reserves and Territorial Defence Force (WOT)',
    tanks: 812,
    armoredVehicles: 44000,
    selfPropelledArtillery: 480,
    towedArtillery: 64,
    rocketArtilleryMLRS: 210,
    flagshipVehicles: ['M1A2 SEPv3 Abrams MBT', 'K2 Black Panther MBT', 'Leopard 2PL', 'Borsuk Amphibious IFV', 'KTO Rosomak 8x8', 'AHS Krab 155mm', 'K239 Homar-K / HIMARS'],
    totalAircraft: 468,
    combatAircraft: 94,
    dedicatedAttackCAS: 18,
    transports: 49,
    trainers: 104,
    specialMission: 9,
    tankerFleet: 0,
    totalHelicopters: 208,
    attackHelicopters: 28,
    flagshipAircraft: ['F-35A Husarz (On delivery)', 'F-16C/D Block 52+ Fighting Falcon', 'KAI FA-50 Fighting Eagle', 'AH-64E Apache Guardian (96 on order)', 'PZL W-3 Sokół', 'S-70i Black Hawk'],
    navalFleetTotal: 86,
    aircraftCarriers: 0,
    helicopterCarriers: 0,
    destroyers: 0,
    frigates: 2,
    corvettes: 2,
    submarines: 1,
    nuclearSubmarines: 0,
    dieselElectricSubmarines: 1,
    patrolCraft: 4,
    mineWarfare: 21,
    auxiliaryVessels: 18,
    flagshipVessels: ['Oliver Hazard Perry-class Frigate (ORP Gen. K. Pułaski)', 'Miecznik-class Frigates (Under construction)', 'Kormoran II-class Minehunter (ORP Kormoran)', 'Kilo-class Submarine (ORP Orzeł)'],
    nuclearWarheads: 0,
    nuclearTriad: 'Non-Nuclear State (Requesting inclusion in NATO Nuclear Sharing program)',
    airDefenseSystems: ['Patriot Wisła (IBCS PAC-3 MSE)', 'Narew (CAMM-ER)', 'Pilica+ Short-Range VSHORAD', 'Poprad Mobile SAM'],
  },
};

/**
 * Universal Military Data Generator:
 * Generates an exhaustive, high-fidelity breakdown for ANY country in the atlas.
 * Uses curated real-world figures if available, or dynamically derives realistic,
 * calibrated numbers from the country's baseline stats so that reserves, vehicles,
 * ships, and aircraft details are never missing or empty.
 */
export function getDetailedMilitary(country: CountryData): DetailedMilitaryData {
  const code = country.code.toUpperCase();
  const curated = CURATED_MILITARY_PROFILES[code];

  const m = country.military;
  const pop = country.demographics?.population || 10_000_000;
  const gdp = country.economy?.gdpNominalUSD || 100;
  const budget = m.defenseBudgetUSD || (gdp * (m.defenseBudgetPercentGDP / 100)) || 1.0;
  const perCapitaBudget = pop > 0 ? Math.round((budget * 1_000_000_000) / pop) : 0;

  // Active, Reserve, and Paramilitary calculations
  const active = curated?.activePersonnel ?? (m.activePersonnel || Math.round(pop * 0.003));
  const reserve = curated?.reservePersonnel ?? (m.reservePersonnel || Math.round(active * 1.5));
  const paramilitary = curated?.paramilitary ?? (m.paramilitary || Math.round(active * 0.25));
  const totalPersonnel = active + reserve + paramilitary;
  const reserveRatio = totalPersonnel > 0 ? Math.round((reserve / totalPersonnel) * 100) : 0;

  const availableManpower = curated?.availableManpower ?? Math.round(pop * 0.45);
  const fitForService = curated?.fitForService ?? Math.round(availableManpower * 0.8);

  // Land Vehicles breakdown
  const tanks = curated?.tanks ?? (m.tanks || 0);
  const armoredVehicles = curated?.armoredVehicles ?? (m.armoredVehicles || Math.round(active * 0.08));
  const selfPropelledArtillery = curated?.selfPropelledArtillery ?? Math.round(tanks * 0.25);
  const towedArtillery = curated?.towedArtillery ?? Math.round(tanks * 0.35);
  const rocketArtilleryMLRS = curated?.rocketArtilleryMLRS ?? Math.round(tanks * 0.12);
  const totalGroundVehicles = tanks + armoredVehicles + selfPropelledArtillery + towedArtillery + rocketArtilleryMLRS;

  // Aircraft Fleet breakdown
  const totalAircraft = curated?.totalAircraft ?? (m.totalAircraft || 0);
  const combatAircraft = curated?.combatAircraft ?? (m.combatAircraft || Math.round(totalAircraft * 0.35));
  const dedicatedAttackCAS = curated?.dedicatedAttackCAS ?? Math.round(combatAircraft * 0.2);
  const transports = curated?.transports ?? Math.round(totalAircraft * 0.12);
  const trainers = curated?.trainers ?? Math.round(totalAircraft * 0.22);
  const specialMission = curated?.specialMission ?? Math.round(totalAircraft * 0.04);
  const tankerFleet = curated?.tankerFleet ?? Math.max(0, Math.round(totalAircraft * 0.015));
  const attackHelicopters = curated?.attackHelicopters ?? (m.attackHelicopters || Math.round(totalAircraft * 0.15));
  const totalHelicopters = curated?.totalHelicopters ?? Math.round(totalAircraft * 0.45);

  // Naval Fleet breakdown
  const navalFleetTotal = curated?.navalFleetTotal ?? (m.navalFleetTotal || 0);
  const aircraftCarriers = curated?.aircraftCarriers ?? (m.aircraftCarriers || 0);
  const helicopterCarriers = curated?.helicopterCarriers ?? Math.min(2, Math.round(aircraftCarriers * 0.5));
  const submarines = curated?.submarines ?? (m.submarines || 0);
  const nuclearSubmarines = curated?.nuclearSubmarines ?? (m.nuclearStatus.includes('Declared') ? Math.min(submarines, Math.round(submarines * 0.6)) : 0);
  const dieselElectricSubmarines = Math.max(0, submarines - nuclearSubmarines);
  const destroyersFrigates = m.destroyersFrigates || 0;
  const destroyers = curated?.destroyers ?? Math.round(destroyersFrigates * 0.4);
  const frigates = curated?.frigates ?? Math.round(destroyersFrigates * 0.6);
  const corvettes = curated?.corvettes ?? Math.max(0, Math.round(navalFleetTotal * 0.15));
  const patrolCraft = curated?.patrolCraft ?? Math.max(0, Math.round(navalFleetTotal * 0.45));
  const mineWarfare = curated?.mineWarfare ?? Math.max(0, Math.round(navalFleetTotal * 0.08));
  const auxiliaryVessels = curated?.auxiliaryVessels ?? Math.max(0, navalFleetTotal - (aircraftCarriers + destroyers + frigates + corvettes + submarines + patrolCraft + mineWarfare));

  // Conscription details
  let conscriptionDetail = curated?.conscriptionDetail || '';
  if (!conscriptionDetail) {
    if (m.conscription === 'Mandatory') {
      conscriptionDetail = 'Compulsory national military service for adult citizens (12-24 months active obligation followed by reserve assignment)';
    } else if (m.conscription === 'Selective / Hybrid') {
      conscriptionDetail = 'Selective national service combined with professional volunteer enlistments and reserve readiness';
    } else if (m.conscription === 'Voluntary') {
      conscriptionDetail = 'All-Volunteer professional standing force with dedicated reserve units';
    } else {
      conscriptionDetail = 'No active conscription; demilitarized, neutral, or collective protection under partner pacts';
    }
  }

  // Flagships & signature equipment
  const flagshipVehicles = curated?.flagshipVehicles || [
    `${country.name} Main Battle Tank Fleet`,
    'Armored Personnel Carriers (APC/IFV)',
    'Self-Propelled Field Artillery',
    'Mobile Reconnaissance & Logistics Armor',
  ];

  const flagshipAircraft = curated?.flagshipAircraft || [
    `${country.name} Multi-role Combat Fighters`,
    'Rotary Wing Reconnaissance & Transport Helicopters',
    'Military Tactical Cargo & Airlift',
  ];

  const flagshipVessels = curated?.flagshipVessels || (navalFleetTotal > 0 ? [
    `${country.name} Naval Flagship & Coastal Patrol Flotilla`,
    'Fast Attack Patrol Boats & Interceptors',
    'Offshore Maritime Border Protection Ships',
  ] : ['Landlocked state with no dedicated maritime fleet (Riverine guard units only)']);

  const nuclearTriad = curated?.nuclearTriad || (m.nuclearWarheads > 0
    ? `${m.nuclearStatus} with ~${m.nuclearWarheads} operational warheads`
    : m.nuclearStatus === 'Nuclear Sharing / NATO'
    ? 'NATO Nuclear Sharing arrangement: Access to allied tactical B61 nuclear weapons under dual-key authorization'
    : 'Strict non-nuclear status: Full commitment to Non-Proliferation Treaty (NPT)');

  const airDefenseSystems = curated?.airDefenseSystems || [
    'Integrated National Radar & Early Warning Network',
    'Medium-Range Surface-to-Air Missile (SAM) Batteries',
    'Point-Defense Anti-Aircraft Artillery & MANPADS',
  ];

  return {
    globalRank: m.globalRank,
    powerIndex: m.powerIndex,
    tier: m.tier,
    defenseBudgetUSD: budget,
    defenseBudgetPercentGDP: m.defenseBudgetPercentGDP,
    perCapitaBudgetUSD: perCapitaBudget,
    activePersonnel: active,
    reservePersonnel: reserve,
    paramilitary: paramilitary,
    totalMilitaryPersonnel: totalPersonnel,
    availableManpower,
    fitForService,
    reserveRatioPercent: reserveRatio,
    conscription: m.conscription,
    conscriptionDetail,
    tanks,
    armoredVehicles,
    selfPropelledArtillery,
    towedArtillery,
    rocketArtilleryMLRS,
    totalGroundVehicles,
    flagshipVehicles,
    totalAircraft,
    combatAircraft,
    dedicatedAttackCAS,
    transports,
    trainers,
    specialMission,
    tankerFleet,
    totalHelicopters,
    attackHelicopters,
    flagshipAircraft,
    navalFleetTotal,
    aircraftCarriers,
    helicopterCarriers,
    destroyers,
    frigates,
    corvettes,
    submarines,
    nuclearSubmarines,
    dieselElectricSubmarines,
    patrolCraft,
    mineWarfare,
    auxiliaryVessels: Math.max(0, auxiliaryVessels),
    flagshipVessels,
    nuclearStatus: m.nuclearStatus,
    nuclearWarheads: m.nuclearWarheads,
    nuclearTriad,
    airDefenseSystems,
    strategicDoctrine: `National territorial defense, sovereign airspace and territorial waters protection for ${country.name}, supporting regional stability and collective security.`,
    spaceAndCyber: `Cyber defense center, military command-and-control communications, and space-based reconnaissance integration.`,
    alliances: m.alliances,
  };
}
