export interface MilitaryHotspot {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number]; // [lng, lat]
  threatLevel: 'Critical' | 'High' | 'Elevated';
  primaryForces: string[];
  description: string;
  keyAssets: string;
}

export const MILITARY_HOTSPOTS: MilitaryHotspot[] = [
  {
    id: 'eastern-europe',
    name: 'Eastern European Front (Ukraine / NATO Border)',
    region: 'Eastern Europe',
    coordinates: [34.0, 48.5],
    threatLevel: 'Critical',
    primaryForces: ['Armed Forces of Ukraine', 'Russian Armed Forces', 'NATO Forward Presence'],
    description: 'High-intensity theater of active interstate warfare, air defense interceptions, and heavy armor artillery engagements.',
    keyAssets: '1,500,000+ Mobilized Personnel, PATRIOT Batteries, HIMARS, Main Battle Tanks',
  },
  {
    id: 'taiwan-strait',
    name: 'Taiwan Strait & First Island Chain',
    region: 'East Asia',
    coordinates: [120.0, 24.0],
    threatLevel: 'Critical',
    primaryForces: ['PLA Eastern Theater Command', 'Taiwan Armed Forces (ROCA)', 'US 7th Fleet Carrier Strike Group'],
    description: 'Critical strategic maritime chokepoint and global semiconductor corridor subject to naval blockades, air incursions, and carrier maneuvers.',
    keyAssets: 'Type 055 Destroyers, F-16V Vipers, Nimitz/Ford Class Carriers, Anti-Ship Ballistic Missiles',
  },
  {
    id: 'middle-east-gulf',
    name: 'Persian Gulf & Red Sea Chokepoint (Bab el-Mandeb)',
    region: 'Middle East',
    coordinates: [45.0, 15.0],
    threatLevel: 'Critical',
    primaryForces: ['US Central Command / Combined Maritime Forces', 'IDF', 'IRGC Naval Forces', 'Ansar Allah (Houthi)'],
    description: 'Key international energy and container shipping lifeline facing anti-ship ballistic missiles, drone swarms, and naval escorts.',
    keyAssets: 'Aegis Guided Missile Cruisers, Shahed Drones, Ballistic Missiles, Submarine Patrols',
  },
  {
    id: 'korean-dmz',
    name: 'Korean Demilitarized Zone (38th Parallel)',
    region: 'East Asia',
    coordinates: [127.0, 38.3],
    threatLevel: 'High',
    primaryForces: ['Korean People’s Army (KPA)', 'ROK Armed Forces', 'US Forces Korea (USFK)'],
    description: 'Most heavily fortified border on Earth with thousands of hardened artillery batteries aimed across the 4km demilitarized strip.',
    keyAssets: 'Long-Range Koksan Artillery, THAAD Missile Defense, K2 Black Panther Tanks, Underground Forts',
  },
  {
    id: 'south-china-sea',
    name: 'South China Sea (Spratly & Paracel Islands)',
    region: 'Southeast Asia',
    coordinates: [114.0, 10.0],
    threatLevel: 'High',
    primaryForces: ['PLA Navy & Maritime Militia', 'Philippine Navy / Coast Guard', 'US Navy Freedom of Navigation'],
    description: 'Disputed strategic waterway seeing intense water cannon standoffs, artificial island airstrips, and submarine patrols.',
    keyAssets: 'Mischief Reef Airstrip, Radar Installations, Frigate Patrols, Nuclear Attack Submarines',
  },
  {
    id: 'kashmir-loc',
    name: 'Line of Control (Kashmir & Ladakh)',
    region: 'South Asia',
    coordinates: [75.0, 34.5],
    threatLevel: 'High',
    primaryForces: ['Indian Army Northern Command', 'Pakistan Army X Corps', 'PLA Western Theater Command'],
    description: 'High-altitude mountainous frontier between three nuclear-armed states with frequent artillery skirmishes at 5,000m+ elevations.',
    keyAssets: 'Siachen Glacier Forward Posts, Su-30MKI, JF-17 Thunder, High-Altitude Mountain Regiments',
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
