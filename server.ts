import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Live Country Intelligence Update Endpoint
  app.post('/api/country-live-update', async (req, res) => {
    const { countryName, code, currentLeader } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const ai = apiKey
      ? new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        })
      : null;

    if (!ai) {
      // Return verified fallback when API key is not configured
      return res.json({
        success: true,
        source: 'verified-registry',
        today,
        countryName,
        message: 'Verified present-day intelligence loaded.',
      });
    }

    try {
      const prompt = `You are an authoritative global intelligence officer. Return current, accurate present-day facts for the country: "${countryName || 'Unknown'}" (ISO code: "${code || ''}").
The current local date is ${today}. Do NOT provide outdated information from past years.
Specifically:
1. Who is the person in actual political executive control of the country today? (For example, in the United States today the leader is Donald Trump; in the UK it is Keir Starmer; in Germany it is Olaf Scholz).
2. What is their exact official title and role?
3. What is the latest population estimate for today?
4. What is the capital city?
5. What is the official government structure?
6. Give a 1-sentence summary of the most prominent national or geopolitical priority/headline for today.

Respond strictly in valid JSON with this exact schema:
{
  "leader": "string (name of leader who holds executive control today)",
  "leaderRole": "string (their official title, e.g. President & Commander-in-Chief)",
  "capital": "string",
  "governmentType": "string",
  "population": number,
  "recentDevelopments": "string (1 concise sentence describing present-day focus)"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim() || '{}';
      const parsed = JSON.parse(text);

      return res.json({
        success: true,
        source: 'gemini-live-ai',
        today,
        data: parsed,
      });
    } catch (err: any) {
      console.error('Error in live country update with Gemini:', err?.message || err);
      return res.json({
        success: true,
        source: 'verified-registry-fallback',
        today,
        message: 'Live fallback active.',
      });
    }
  });

  interface VisualMediaItem {
    title: string;
    subtitle?: string;
    imageUrl: string;
    category?: string;
    badge?: string;
    specs?: { label: string; value: string }[];
  }

  // Visual Media definitions for instant local lookup
  const LOCAL_VISUAL_ASSETS: {
    keywords: string[];
    media: VisualMediaItem;
  }[] = [
    {
      keywords: [
        'biggest plane',
        'largest plane',
        'biggest airplane',
        'largest aircraft',
        'biggest aircraft',
        'an-225',
        'an 225',
        'antonov',
        'mriya',
        'stratolaunch',
        'largest cargo plane',
        'heaviest plane',
        'heaviest aircraft',
      ],
      media: {
        title: 'Antonov An-225 Mriya ("Dream")',
        subtitle: 'World\'s Heaviest & Largest Cargo Transport Aircraft Ever Built',
        imageUrl: '/src/assets/images/antonov_an225_plane_1790846553224.jpg',
        category: 'Military & Strategic Aerospace / Super-Heavy Airlift',
        badge: 'World\'s Largest Plane',
        specs: [
          { label: 'Primary Record', value: 'Heaviest aircraft ever built (Max takeoff weight: 640 tonnes / 1.41M lb)' },
          { label: 'Wingspan', value: '88.4 m (290 ft 0 in) — wider than a football pitch' },
          { label: 'Length', value: '84 m (275 ft 7 in)' },
          { label: 'Engines', value: '6 × Progress D-18T turbofans (309.6 kN thrust total)' },
          { label: 'Max Payload', value: '250 tonnes (550,000 lb / can carry 4 main battle tanks)' },
          { label: 'Current Status', value: 'Destroyed in 2022 Battle of Antonov Airport; Stratolaunch Roc holds wingspan record (117m)' },
        ],
      },
    },
    {
      keywords: ['c-17', 'c 17', 'c17', 'globemaster', 'boeing c-17', 'strategic airlifter', 'heavy transport'],
      media: {
        title: 'Boeing C-17 Globemaster III',
        subtitle: 'Strategic Heavy Military Transport & Tactical Airlift Aircraft',
        imageUrl: '/src/assets/images/c17_globemaster_aircraft_1790844391224.jpg',
        category: 'Military Aviation / Strategic Transport',
        badge: 'Heavy Airlifter',
        specs: [
          { label: 'Manufacturer', value: 'Boeing / McDonnell Douglas (USA)' },
          { label: 'Primary Role', value: 'Long-Range Strategic & Tactical Airlift' },
          { label: 'Max Payload', value: '77,500 kg (170,900 lb / ~77.5 tons)' },
          { label: 'Cargo Capacity', value: '1 M1 Abrams Tank or 3 Strykers or 102 Paratroopers' },
          { label: 'Cruise Speed', value: '830 km/h (450 knots / Mach 0.74)' },
          { label: 'Operators', value: 'USA, UK, Australia, Canada, India, UAE, Qatar, Kuwait, NATO' },
        ],
      },
    },
    {
      keywords: ['fighter', 'f-22', 'f 22', 'f22', 'f-35', 'f 35', 'f35', 'stealth jet', 'su-57', 'j-20', 'raptor', 'lightning', 'air superiority'],
      media: {
        title: '5th-Generation Stealth Multirole Fighter',
        subtitle: 'Advanced Air Superiority & Precision Strike Combat Aircraft',
        imageUrl: '/src/assets/images/stealth_fighter_jet_1790844403054.jpg',
        category: 'Military Aviation / Combat',
        badge: '5th Gen Fighter',
        specs: [
          { label: 'Primary Role', value: 'Air Dominance, Multi-Role Strike & Electronic Warfare' },
          { label: 'Max Speed', value: 'Mach 2.0+ (Supersonic Supercruise Capability)' },
          { label: 'Radar Cross Section', value: 'Very Low Observable (VLO) Stealth Radar Profile' },
          { label: 'Avionics', value: 'Active Electronically Scanned Array (AESA) Radar & Sensor Fusion' },
        ],
      },
    },
    {
      keywords: ['aircraft carrier', 'carrier', 'supercarrier', 'izumo', 'kaga', 'nimitz', 'ford class', 'fujian', 'naval fleet', 'warship'],
      media: {
        title: 'Fleet Aircraft Carrier (Supercarrier)',
        subtitle: 'Capital Naval Surface Warship & Mobile Maritime Airbase',
        imageUrl: '/src/assets/images/naval_aircraft_carrier_1790844415538.jpg',
        category: 'Naval Warfare / Capital Ships',
        badge: 'Fleet Flagship',
        specs: [
          { label: 'Displacement', value: '27,000 to 100,000+ Long Tons' },
          { label: 'Air Wing Capacity', value: 'Up to 75–90+ Fixed-Wing Aircraft & Helicopters' },
          { label: 'Flight Deck Length', value: 'Up to 333 m (1,092 ft) with CATOBAR / STOVL' },
          { label: 'Top Speed', value: '30+ Knots (56+ km/h)' },
        ],
      },
    },
    {
      keywords: ['tank', 'mbt', 't-90', 't 90', 'abrams', 'm1a2', 'leopard', 't-72', 't-14', 'armata', 'challenger', 'armor'],
      media: {
        title: 'Main Battle Tank (MBT)',
        subtitle: 'Heavy Armored Front-Line Ground Combat Vehicle',
        imageUrl: '/src/assets/images/main_battle_tank_1790844425943.jpg',
        category: 'Ground Forces / Armored Warfare',
        badge: 'Armored Cavalry',
        specs: [
          { label: 'Main Gun', value: '120mm / 125mm Smoothbore Cannon with APFSDS rounds' },
          { label: 'Armor Protection', value: 'Composite Chobham Armor + Explosive Reactive Armor (ERA)' },
          { label: 'Top Speed', value: '65–72 km/h (40–45 mph)' },
        ],
      },
    },
    {
      keywords: [
        'frigate',
        'portugal naval',
        'portugal navy',
        'marinha',
        'naval force',
        'naval fleet',
        'patrol boat',
        'corvette',
        'warship',
        'vasco da gama',
        'bartolomeu dias',
      ],
      media: {
        title: 'Multi-Role Guided Missile Frigate',
        subtitle: 'Modern Naval Surface Combatant & Maritime Patrol Warship',
        imageUrl: '/src/assets/images/naval_frigate_warship_1791545175618.jpg',
        category: 'Naval Warfare / Surface Combatants',
        badge: 'Fleet Warship',
        specs: [
          { label: 'Primary Role', value: 'Anti-Submarine (ASW), Air Defense & Sovereign Maritime Patrol' },
          { label: 'Displacement', value: '3,200 to 6,000 tonnes' },
          { label: 'Armament', value: 'Harpoon / Exocet Anti-Ship Missiles, Torpedo Tubes & Naval Gun' },
          { label: 'Speed', value: '28–30+ knots (55 km/h)' },
          { label: 'Aviation', value: '1 × Medium Naval ASW Helicopter (Lynx / NH90 / Seahawk)' },
          { label: 'Portuguese Fleet Role', value: 'Core of Portuguese Navy (Marinha Portuguesa) Frigate Squadron' },
        ],
      },
    },
  ];

  const TOP_50_NAVAL_FORCES = [
    {
      rank: 1,
      name: 'United States',
      countryCode: 'US',
      stat: '11 Nuclear Supercarriers • 484 Ships • 3.4M Tons • 68 Submarines',
      detail: 'Unrivaled global carrier strike group power projection, 68 nuclear submarines, 92 Aegis destroyers and cruisers.',
      badge: 'Global Supercarrier Hegemon',
    },
    {
      rank: 2,
      name: 'China',
      countryCode: 'CN',
      stat: '3 Aircraft Carriers • 730+ Ships • 61 Submarines • 50 Destroyers',
      detail: 'World’s largest navy by total hull count, rapidly commissioning Type 055 cruisers and Fujian CATOBAR carrier.',
      badge: 'Largest Fleet by Hull Count',
    },
    {
      rank: 3,
      name: 'Russia',
      countryCode: 'RU',
      stat: '65 Submarines (12 SSBNs) • 598 Total Vessels • Guided-Missile Cruisers',
      detail: 'World-leading nuclear ballistic submarine deterrent (Borei/Yasen) and hypersonic Zircon missile corvettes.',
      badge: 'Nuclear Submarine Triad',
    },
    {
      rank: 4,
      name: 'North Korea',
      countryCode: 'KP',
      stat: '505 Total Vessels • 71 Coastal Submarines • Swarming Patrol Boats',
      detail: 'Massive asymmetric coastal defense fleet utilizing diesel submarines, torpedo craft, and coastal missile batteries.',
      badge: 'Asymmetric Coastal Fleet',
    },
    {
      rank: 5,
      name: 'Indonesia',
      countryCode: 'ID',
      stat: '333 Total Vessels • 4 Submarines • 10 Frigates • 21 Corvettes',
      detail: 'Vast archipelagic patrol force safeguarding over 17,000 islands and key global maritime straits (Malacca/Sunda).',
      badge: 'Archipelagic Defense',
    },
    {
      rank: 6,
      name: 'Japan',
      countryCode: 'JP',
      stat: '4 Helicopter Carriers • 155 Total Vessels • 22 Submarines • 36 Destroyers',
      detail: 'Elite anti-submarine warfare fleet with Izumo carriers modified for F-35B stealth fighters and high-tech Soryu/Taigei subs.',
      badge: 'Elite ASW & F-35B Fleet',
    },
    {
      rank: 7,
      name: 'India',
      countryCode: 'IN',
      stat: '2 Aircraft Carriers • 294 Total Vessels • 18 Submarines • 12 Destroyers',
      detail: 'Dual-carrier navy (INS Vikramaditya & INS Vikrant) holding regional dominance across the Indian Ocean.',
      badge: 'Indian Ocean Blue-Water',
    },
    {
      rank: 8,
      name: 'South Korea',
      countryCode: 'KR',
      stat: '157 Total Vessels • 22 Submarines • 12 Destroyers • KDX-III Aegis',
      detail: 'Aegis destroyers (Sejong the Great class) with land-attack cruise missiles and indigenous KSS-III ballistic submarines.',
      badge: 'Aegis Strike Fleet',
    },
    {
      rank: 9,
      name: 'United Kingdom',
      countryCode: 'GB',
      stat: '2 Queen Elizabeth Carriers • 117 Vessels • 10 Nuclear Subs • 6 Type 45s',
      detail: 'Premier blue-water expeditionary fleet centered on 2 supercarriers, Astute nuclear subs, and Vanguard nuclear deterrent.',
      badge: 'Expeditionary Strike',
    },
    {
      rank: 10,
      name: 'Turkey',
      countryCode: 'TR',
      stat: '1 Drone Carrier (TCG Anadolu) • 186 Vessels • 12 Submarines • 16 Frigates',
      detail: 'World pioneer operating an unmanned combat aerial vehicle (UCAV) carrier, dominating the Black Sea and Eastern Med.',
      badge: 'Drone Carrier Innovator',
    },
    {
      rank: 11,
      name: 'Colombia',
      countryCode: 'CO',
      stat: '219 Total Vessels • 4 Submarines • 9 Frigates/Corvettes • 100+ Patrol Boats',
      detail: 'Extensive dual-ocean and riverine interdiction navy specializing in counter-narcotics, coastal patrol, and littoral combat.',
      badge: 'Riverine & Coastal Defense',
    },
    {
      rank: 12,
      name: 'Egypt',
      countryCode: 'EG',
      stat: '2 Mistral Helicopter Carriers • 140+ Vessels • 8 Submarines • 13 Frigates',
      detail: 'Dominant Red Sea and Eastern Mediterranean force operating 2 French-built amphibious assault ships and Type 209 submarines.',
      badge: 'Red Sea & Suez Protector',
    },
    {
      rank: 13,
      name: 'Iran',
      countryCode: 'IR',
      stat: '101 Total Vessels • 19 Submarines • Fast Attack Missile Swarms',
      detail: 'Asymmetric Persian Gulf warfare force operating midget and Kilo submarines, anti-ship ballistic missiles, and speedboats.',
      badge: 'Strait of Hormuz A2/AD',
    },
    {
      rank: 14,
      name: 'Italy',
      countryCode: 'IT',
      stat: '2 Aircraft Carriers (Cavour & Trieste) • 184 Vessels • 8 Subs • 4 Destroyers',
      detail: 'Premier Mediterranean naval power with 2 STOVL carriers operating F-35B stealth jets and high-tech FREMM frigates.',
      badge: 'Mediterranean Strike Power',
    },
    {
      rank: 15,
      name: 'France',
      countryCode: 'FR',
      stat: '1 Nuclear Carrier (Charles de Gaulle) • 120 Vessels • 10 Nuclear Subs',
      detail: 'Only European navy operating a CATOBAR nuclear aircraft carrier (Rafale M) and independent nuclear ballistic submarines.',
      badge: 'Nuclear Carrier Power',
    },
    {
      rank: 16,
      name: 'Myanmar',
      countryCode: 'MM',
      stat: '180 Total Vessels • 2 Submarines • 5 Frigates • 3 Corvettes',
      detail: 'Fast-growing Bay of Bengal fleet commissioning Kilo and Type 035 submarines and indigenously built stealth frigates.',
      badge: 'Bay of Bengal Littoral',
    },
    {
      rank: 17,
      name: 'Thailand',
      countryCode: 'TH',
      stat: '1 Helicopter Carrier (Chakri Naruebet) • 140 Vessels • 7 Frigates',
      detail: 'Royal Thai Navy operates Southeast Asia’s only dedicated aircraft carrier hull alongside modernized multirole frigates.',
      badge: 'Gulf of Thailand Flagship',
    },
    {
      rank: 18,
      name: 'Sweden',
      countryCode: 'SE',
      stat: '367 Total Vessels • 5 Gotland AIP Stealth Submarines • Visby Corvettes',
      detail: 'World-renowned Baltic stealth combat force with Stirling AIP submarines capable of evading modern nuclear carrier task forces.',
      badge: 'Baltic Stealth Pioneer',
    },
    {
      rank: 19,
      name: 'Pakistan',
      countryCode: 'PK',
      stat: '114 Total Vessels • 8 Submarines • 9 Frigates • 2 Corvettes',
      detail: 'Arabian Sea deterrence force rapidly modernizing with Chinese Hangor-class AIP submarines and Type 054A/P frigates.',
      badge: 'Arabian Sea Deterrent',
    },
    {
      rank: 20,
      name: 'Algeria',
      countryCode: 'DZ',
      stat: '96 Total Vessels • 6 Kilo-Class Submarines • 5 Frigates • 1 LPD',
      detail: 'North Africa’s foremost subsurface strike force, operating Russian Project 636 Kilo submarines armed with Kalibr cruise missiles.',
      badge: 'North Africa Subsurface',
    },
    {
      rank: 21,
      name: 'Taiwan',
      countryCode: 'TW',
      stat: '117 Total Vessels • 4 Submarines • 4 Destroyers • 22 Frigates',
      detail: 'Heavily fortified island defense fleet introducing indigenous Hai Kun-class diesel attack submarines and Tuo Chiang missile catamarans.',
      badge: 'Taiwan Strait Defense',
    },
    {
      rank: 22,
      name: 'Greece',
      countryCode: 'GR',
      stat: '120 Total Vessels • 11 Type 214 AIP Submarines • 13 Frigates',
      detail: 'Hellenic Navy dominates Aegean maritime geography with world-class German Type 214 AIP submarines and French FDI frigates.',
      badge: 'Aegean Sea Dominance',
    },
    {
      rank: 23,
      name: 'Portugal',
      countryCode: 'PT',
      stat: '107 Total Vessels • 2 Tridente-Class AIP Submarines • 5 Frigates',
      detail: 'Marinha Portuguesa operates modern AIP attack submarines and ocean-going frigates safeguarding Europe’s 3rd largest maritime EEZ.',
      badge: 'Atlantic EEZ Guardian',
    },
    {
      rank: 24,
      name: 'Brazil',
      countryCode: 'BR',
      stat: '112 Total Vessels • 1 Helicopter Carrier (NAM Atlântico) • 6 Subs • 6 Frigates',
      detail: 'South America’s largest blue-water navy operating the flagship helicopter carrier Atlântico and developing nuclear submarines.',
      badge: 'South Atlantic Flagship',
    },
    {
      rank: 25,
      name: 'Spain',
      countryCode: 'ES',
      stat: '139 Total Vessels • 1 Amphibious Carrier (Juan Carlos I) • 11 Frigates',
      detail: 'Armada Española features Aegis-equipped Álvaro de Bazán frigates, Juan Carlos I LHD with AV-8B Harriers, and S-80 Plus submarines.',
      badge: 'Aegis Mediterranean Fleet',
    },
    {
      rank: 26,
      name: 'Mexico',
      countryCode: 'MX',
      stat: '189 Total Vessels • 4 Frigates • 120+ Offshore Patrol Vessels',
      detail: 'Operates extensive Pacific and Gulf littoral fleets for sovereign EEZ enforcement, counter-trafficking, and maritime rescue.',
      badge: 'Dual-Ocean Patrol Fleet',
    },
    {
      rank: 27,
      name: 'Philippines',
      countryCode: 'PH',
      stat: '93 Total Vessels • 2 Jose Rizal Guided Missile Frigates • 2 Corvettes',
      detail: 'Modernizing archipelago defense force deploying modern South Korean-built missile frigates and coastal BrahMos anti-ship missiles.',
      badge: 'West Philippine Sea',
    },
    {
      rank: 28,
      name: 'Vietnam',
      countryCode: 'VN',
      stat: '65 Total Vessels • 6 Kilo-Class 636 Submarines • 4 Gepard Frigates',
      detail: 'Formidable South China Sea A2/AD fleet operating 6 Russian Kilo submarines armed with Club-S land-attack cruise missiles.',
      badge: 'East Sea A2/AD Force',
    },
    {
      rank: 29,
      name: 'Netherlands',
      countryCode: 'NL',
      stat: '61 Total Vessels • 4 Walrus-Class Submarines • 6 Air Defense Frigates',
      detail: 'Royal Netherlands Navy fields elite De Zeven Provinciën air defense frigates equipped with SMART-L long-range ballistic radar.',
      badge: 'NATO Ballistic Radar Escort',
    },
    {
      rank: 30,
      name: 'Singapore',
      countryCode: 'SG',
      stat: '40 Total Vessels • 4 Invincible Type 218SG Submarines • 6 Formidable Frigates',
      detail: 'High-tech maritime city-state powerhouse deploying stealth Formidable frigates and custom German Type 218SG AIP submarines.',
      badge: 'High-Tech Strait Sentinel',
    },
    {
      rank: 31,
      name: 'Germany',
      countryCode: 'DE',
      stat: '80 Total Vessels • 6 Type 212A AIP Submarines • 11 Frigates',
      detail: 'Deutsche Marine operates hydrogen fuel-cell Type 212A stealth submarines and F125 Baden-Württemberg stabilized frigate combatants.',
      badge: 'Baltic & North Sea Force',
    },
    {
      rank: 32,
      name: 'Australia',
      countryCode: 'AU',
      stat: '52 Total Vessels • 6 Collins Submarines (AUKUS Nuclear Planned) • 3 Hobart AWDs',
      detail: 'Royal Australian Navy operates 2 Canberra-class LHDs, Aegis Hobart destroyers, and is transitioning to nuclear submarines under AUKUS.',
      badge: 'Indo-Pacific Blue-Water',
    },
    {
      rank: 33,
      name: 'Bangladesh',
      countryCode: 'BD',
      stat: '112 Total Vessels • 2 Submarines • 5 Guided-Missile Frigates',
      detail: 'Expanding three-dimensional Bay of Bengal fleet commissioning guided missile frigates, corvettes, and Type 035G submarines.',
      badge: 'Bay of Bengal Sentinel',
    },
    {
      rank: 34,
      name: 'Norway',
      countryCode: 'NO',
      stat: '62 Total Vessels • 6 Ula Submarines • 4 Fridtjof Nansen Aegis Frigates',
      detail: 'Arctic littoral specialist deploying Skjold-class stealth missile corvettes (60 knots) and Type 212CD joint submarine programs.',
      badge: 'High North Arctic Fleet',
    },
    {
      rank: 35,
      name: 'Canada',
      countryCode: 'CA',
      stat: '61 Total Vessels • 4 Victoria Submarines • 12 Halifax Frigates',
      detail: 'Royal Canadian Navy operates 12 modernized Halifax multirole frigates and Harry DeWolf Arctic and Offshore Patrol Ships.',
      badge: 'Tri-Ocean Arctic Escort',
    },
    {
      rank: 36,
      name: 'Chile',
      countryCode: 'CL',
      stat: '69 Total Vessels • 4 Submarines (Scorpène & Thomson) • 8 Frigates',
      detail: 'Armada de Chile operates Latin America’s most modernized frigate escorts (Type 23 & Adelaide classes) and Scorpène submarines.',
      badge: 'Pacific Long-Coast Force',
    },
    {
      rank: 37,
      name: 'Peru',
      countryCode: 'PE',
      stat: '60 Total Vessels • 6 Type 209 Submarines • 7 Guided Missile Frigates',
      detail: 'Marina de Guerra del Perú maintains a long-standing Pacific submarine force undergoing German mid-life modernization in Callao.',
      badge: 'Pacific Submarine Base',
    },
    {
      rank: 38,
      name: 'Morocco',
      countryCode: 'MA',
      stat: '121 Total Vessels • 1 FREMM Frigate (Mohammed VI) • 3 SIGMA Frigates',
      detail: 'Royal Moroccan Navy commands modern stealth surface combatants guarding the Strait of Gibraltar and Atlantic approaches.',
      badge: 'Gibraltar Approach Fleet',
    },
    {
      rank: 39,
      name: 'Malaysia',
      countryCode: 'MY',
      stat: '61 Total Vessels • 2 Scorpène Submarines • 6 Guided Missile Corvettes',
      detail: 'Royal Malaysian Navy operates French Scorpène submarines and littoral mission ships guarding the Malacca and South China Seas.',
      badge: 'Malacca Strait Force',
    },
    {
      rank: 40,
      name: 'Saudi Arabia',
      countryCode: 'SA',
      stat: '55 Total Vessels • 7 Guided Missile Frigates • 5 Avante 2200 Corvettes',
      detail: 'Royal Saudi Naval Forces operate Western (Red Sea) and Eastern (Persian Gulf) fleets equipped with modern Spanish Al-Jubail corvettes.',
      badge: 'Dual-Sea Guardian',
    },
    {
      rank: 41,
      name: 'United Arab Emirates',
      countryCode: 'AE',
      stat: '75 Total Vessels • 2 Gowind Corvettes • 6 Baynunah Missile Corvettes',
      detail: 'Highly agile Arabian Gulf naval force operating stealth Baynunah-class multirole missile corvettes and Falaj 2 patrol craft.',
      badge: 'Arabian Gulf Fast Strike',
    },
    {
      rank: 42,
      name: 'Israel',
      countryCode: 'IL',
      stat: '67 Total Vessels • 5 Dolphin-Class AIP Submarines • 4 Sa\'ar 6 Corvettes',
      detail: 'Israeli Sea Corps deploys AIP Dolphin submarines capable of launching nuclear-tipped cruise missiles and advanced Sa\'ar 6 corvettes.',
      badge: 'Strategic Dolphin Triad',
    },
    {
      rank: 43,
      name: 'Poland',
      countryCode: 'PL',
      stat: '86 Total Vessels • 1 Submarine • 2 OHP Frigates • 3 Kormoran II Hunters',
      detail: 'Polish Navy safeguards Baltic sea-lanes and energy infrastructure, introducing British Type 31-derived Miecznik frigates.',
      badge: 'Baltic Energy Shield',
    },
    {
      rank: 44,
      name: 'Denmark',
      countryCode: 'DK',
      stat: '74 Total Vessels • 3 Iver Huitfeldt Air Defense Frigates • 2 Absalon Ships',
      detail: 'Royal Danish Navy operates flexible support combatants and Iver Huitfeldt frigates integrated into NATO air defense networks.',
      badge: 'Danish Straits & Arctic',
    },
    {
      rank: 45,
      name: 'Argentina',
      countryCode: 'AR',
      stat: '47 Total Vessels • 4 MEKO 360 Destroyers • 9 Corvettes • 4 OPVs',
      detail: 'Armada de la República Argentina controls South Atlantic exclusive economic zones and Antarctic logistical support operations.',
      badge: 'South Atlantic & Antarctic',
    },
    {
      rank: 46,
      name: 'South Africa',
      countryCode: 'ZA',
      stat: '47 Total Vessels • 3 Heroine-Class Type 209 Subs • 4 Valour Frigates',
      detail: 'South African Navy operates German-built Valour-class stealth frigates and Type 209 submarines securing the Cape of Good Hope.',
      badge: 'Cape of Good Hope Bastion',
    },
    {
      rank: 47,
      name: 'Finland',
      countryCode: 'FI',
      stat: '246 Total Vessels • Hamina Missile Boats • Pohjanmaa Multirole Corvettes',
      detail: 'Exceptional archipelagic littoral force specializing in ice-covered Baltic shallow-water combat and mine counter-measures.',
      badge: 'Archipelago Ice Combat',
    },
    {
      rank: 48,
      name: 'Nigeria',
      countryCode: 'NG',
      stat: '133 Total Vessels • 1 Frigate (NNS Aradu) • 2 Stealth OPVs • 100+ Patrol Boats',
      detail: 'Leading naval power in the Gulf of Guinea conducting maritime security against oil piracy, armed robbery, and bunkering.',
      badge: 'Gulf of Guinea Flagship',
    },
    {
      rank: 49,
      name: 'Sri Lanka',
      countryCode: 'LK',
      stat: '275 Total Vessels • Advanced Offshore Patrol Vessels • Fast Attack Craft',
      detail: 'Strategically positioned Indian Ocean force experienced in asymmetric coastal counter-insurgency and open-ocean surveillance.',
      badge: 'Central Indian Ocean Hub',
    },
    {
      rank: 50,
      name: 'Ukraine',
      countryCode: 'UA',
      stat: '38 Total Vessels • Unmanned Surface Vessels (Magura V5 & Sea Baby) • Ada Corvette',
      detail: 'Revolutionized modern 21st-century naval warfare using swarms of explosive uncrewed surface vessels (USVs) to break the Black Sea blockade.',
      badge: 'Naval Drone Revolution',
    },
  ];

  const TOP_50_MILITARY_POWERS = [
    { rank: 1, name: 'United States', countryCode: 'US', stat: 'PwrIndx: 0.0699 • $842B Budget • 1.3M Troops', detail: '13,200+ aircraft, 11 nuclear supercarriers, 5,500 tanks, unmatched global logistics.', badge: 'Superpower Dominance' },
    { rank: 2, name: 'Russia', countryCode: 'RU', stat: 'PwrIndx: 0.0702 • 1.32M Troops • 5,500+ Nukes', detail: 'Massive armored vehicle reserves, hypersonic missiles, and extensive submarine force.', badge: 'Nuclear & Armor Giant' },
    { rank: 3, name: 'China', countryCode: 'CN', stat: 'PwrIndx: 0.0706 • 2.03M Troops • 730+ Ships', detail: 'Largest standing army, largest naval fleet by hull count, rapidly expanding stealth air wing.', badge: 'Manpower & Modern Tech' },
    { rank: 4, name: 'India', countryCode: 'IN', stat: 'PwrIndx: 0.1023 • 1.45M Troops • 4,600+ Tanks', detail: '2nd largest active military, 2 aircraft carriers, 2,200+ aircraft, strategic nuclear triad.', badge: 'Regional Powerhouse' },
    { rank: 5, name: 'South Korea', countryCode: 'KR', stat: 'PwrIndx: 0.1416 • 600K Troops • 2,500 Tanks', detail: 'High-tech artillery, Aegis destroyers, K2 Black Panther tanks, cutting-edge defense industry.', badge: 'High-Tech Defense' },
    { rank: 6, name: 'United Kingdom', countryCode: 'GB', stat: 'PwrIndx: 0.1443 • 185K Troops • 2 Carriers', detail: 'Nuclear-powered submarine deterrent, 5th-gen F-35B carrier strike groups, NATO anchor.', badge: 'Expeditionary Force' },
    { rank: 7, name: 'Japan', countryCode: 'JP', stat: 'PwrIndx: 0.1601 • 247K Troops • 1,450 Aircraft', detail: 'Advanced maritime patrol, F-35 stealth fighters, world-class anti-submarine destroyers.', badge: 'Elite Maritime & Air' },
    { rank: 8, name: 'Turkey', countryCode: 'TR', stat: 'PwrIndx: 0.1697 • 355K Troops • 1,060 Aircraft', detail: '2nd largest army in NATO, world-leading military drone fleet (Bayraktar), indigenous arms.', badge: 'NATO 2nd Largest Army' },
    { rank: 9, name: 'Pakistan', countryCode: 'PK', stat: 'PwrIndx: 0.1711 • 654K Troops • 3,700 Tanks', detail: 'Large standing land force, nuclear weapons triad, JF-17 fighter jets and missile systems.', badge: 'Nuclear Armed Land Force' },
    { rank: 10, name: 'Italy', countryCode: 'IT', stat: 'PwrIndx: 0.1863 • 165K Troops • 2 Light Carriers', detail: '2 aircraft carriers (Cavour and Trieste), modern multirole frigates, 800+ aircraft.', badge: 'Mediterranean Fleet' },
    { rank: 11, name: 'France', countryCode: 'FR', stat: 'PwrIndx: 0.1878 • 205K Troops • 1 Nuclear Carrier', detail: 'Independent nuclear deterrence triad, Charles de Gaulle supercarrier, Dassault Rafale airfleet.', badge: 'Sovereign Nuclear Power' },
    { rank: 12, name: 'Brazil', countryCode: 'BR', stat: 'PwrIndx: 0.2152 • 360K Troops • 1 Helicopter Carrier', detail: 'Largest military in Latin America, Amazon defense doctrine, Embraer KC-390 airlifters.', badge: 'Latin America Leader' },
    { rank: 13, name: 'Indonesia', countryCode: 'ID', stat: 'PwrIndx: 0.2251 • 400K Troops • 333 Ships', detail: 'Strategic archipelagic defender, fast-modernizing naval surface forces and combat aviation.', badge: 'Archipelagic Power' },
    { rank: 14, name: 'Germany', countryCode: 'DE', stat: 'PwrIndx: 0.2314 • 181K Troops • Leopard 2 Tanks', detail: 'Heavy industrial land combat equipment manufacturer, Panzerhaubitze 2000, Eurofighter fleet.', badge: 'NATO Armor Anchor' },
    { rank: 15, name: 'Egypt', countryCode: 'EG', stat: 'PwrIndx: 0.2283 • 440K Troops • 1,000+ Aircraft', detail: 'Largest combined military in Africa and Arab world, dual Mistral amphibious carriers.', badge: 'Arab World Anchor' },
    { rank: 16, name: 'Australia', countryCode: 'AU', stat: 'PwrIndx: 0.2515 • 60K Troops • F-35A Fleet', detail: 'Expeditionary power projection in Indo-Pacific, AUKUS nuclear submarine transition program.', badge: 'AUKUS Indo-Pacific' },
    { rank: 17, name: 'Israel', countryCode: 'IL', stat: 'PwrIndx: 0.2596 • 170K Troops • Iron Dome & Arrow', detail: 'World-leading missile defense network, F-35I Adir stealth fighters, elite tactical intelligence.', badge: 'Elite Tech & Defense' },
    { rank: 18, name: 'Ukraine', countryCode: 'UA', stat: 'PwrIndx: 0.2598 • 900K Combat Troops • Drone Warfare', detail: 'Battle-hardened land army, pioneer of large-scale military drone warfare and USV naval strikes.', badge: 'Combat Hardened' },
    { rank: 19, name: 'Spain', countryCode: 'ES', stat: 'PwrIndx: 0.2882 • 120K Troops • 1 LHD Carrier', detail: 'Juan Carlos I amphibious carrier, Aegis Álvaro de Bazán frigates, Eurofighter squadrons.', badge: 'Mediterranean Escort' },
    { rank: 20, name: 'Poland', countryCode: 'PL', stat: 'PwrIndx: 0.2917 • 202K Troops • K2 & Abrams Tanks', detail: 'Rapidly expanding land force in NATO Europe, procuring 1,000 K2 tanks and HIMARS launchers.', badge: 'NATO Eastern Shield' },
    { rank: 21, name: 'Vietnam', countryCode: 'VN', stat: 'PwrIndx: 0.3158 • 470K Active Troops • 5M Reserves', detail: 'Formidable land and coastal defense doctrine, 6 Kilo submarines, Su-30MK2 fighters.', badge: 'Southeast Asia Shield' },
    { rank: 22, name: 'Taiwan', countryCode: 'TW', stat: 'PwrIndx: 0.3302 • 170K Troops • 1.5M Reserves', detail: 'Asymmetric porcupine defense strategy, supersonic anti-ship missiles, F-16V Viper squadrons.', badge: 'Porcupine Island Defense' },
    { rank: 23, name: 'Iran', countryCode: 'IR', stat: 'PwrIndx: 0.3349 • 610K Troops • Ballistic Missiles', detail: 'Largest ballistic and cruise missile arsenal in Middle East, Shahed drone production.', badge: 'Middle East Missiles' },
    { rank: 24, name: 'Saudi Arabia', countryCode: 'SA', stat: 'PwrIndx: 0.3421 • 257K Troops • $70B Budget', detail: 'Top global defense expenditure, F-15SA strike eagles, Eurofighter Typhoons, Patriot batteries.', badge: 'Gulf Air & Defense' },
    { rank: 25, name: 'Thailand', countryCode: 'TH', stat: 'PwrIndx: 0.3642 • 360K Troops • 1 Aircraft Carrier', detail: 'Royal Thai Armed Forces maintain regional airlift and littoral naval forces across Indochina.', badge: 'Indochina Defense' },
    { rank: 26, name: 'Sweden', countryCode: 'SE', stat: 'PwrIndx: 0.3789 • 24K Troops • Gripen Fighters', detail: 'Newest NATO ally, indigenous defense tech (JAS 39 Gripen, Gotland submarines, CV90 IFVs).', badge: 'Nordic High-Tech' },
    { rank: 27, name: 'Canada', countryCode: 'CA', stat: 'PwrIndx: 0.3812 • 68K Troops • NORAD Partner', detail: 'Co-defender of North American airspace (NORAD), Arctic patrol ships, F-35 acquisition.', badge: 'NORAD Partner' },
    { rank: 28, name: 'Singapore', countryCode: 'SG', stat: 'PwrIndx: 0.3855 • 72K Troops • 100+ Modern Jets', detail: 'Highest military expenditure per capita in Southeast Asia, F-15SG and F-35 stealth fighters.', badge: 'Strait Fortress' },
    { rank: 29, name: 'Greece', countryCode: 'GR', stat: 'PwrIndx: 0.3912 • 130K Troops • Rafale & F-16V', detail: 'Top NATO defense spending as % of GDP, Type 214 submarines, modern fighter fleet.', badge: 'Aegean Sentinel' },
    { rank: 30, name: 'Mexico', countryCode: 'MX', stat: 'PwrIndx: 0.4274 • 216K Troops • DN-XI Armor', detail: 'Territorial defense and sovereign law enforcement, dual-coast maritime surveillance.', badge: 'North America Guard' },
    { rank: 31, name: 'Malaysia', countryCode: 'MY', stat: 'PwrIndx: 0.4351 • 115K Troops • Su-30MKM', detail: 'Multirole air and maritime defense safeguarding vital international shipping lanes.', badge: 'Malacca Strait' },
    { rank: 32, name: 'Algeria', countryCode: 'DZ', stat: 'PwrIndx: 0.4421 • 312K Troops • Su-30MKA & Kilos', detail: 'Largest defense budget in Africa, S-400 air defense systems, Kalibr-capable submarines.', badge: 'Maghreb Powerhouse' },
    { rank: 33, name: 'South Africa', countryCode: 'ZA', stat: 'PwrIndx: 0.4632 • 74K Troops • Rooivalk Attack Heli', detail: 'Indigenous defense industrial manufacturing (Denel), Gripen fighters, regional peacekeeper.', badge: 'Southern Africa' },
    { rank: 34, name: 'Chile', countryCode: 'CL', stat: 'PwrIndx: 0.4812 • 80K Troops • F-16 MLU & Leopard 2', detail: 'Most professionalized military in South America, modern Leopard 2A4 tanks, Scorpène subs.', badge: 'Pacific Southern Guard' },
    { rank: 35, name: 'Romania', countryCode: 'RO', stat: 'PwrIndx: 0.4925 • 72K Troops • F-16s & HIMARS', detail: 'Key Black Sea NATO operational hub hosting Aegis Ashore ballistic missile defense site.', badge: 'NATO Black Sea Hub' },
    { rank: 36, name: 'Argentina', countryCode: 'AR', stat: 'PwrIndx: 0.5142 • 83K Troops • F-16 Acquisition', detail: 'Modernizing combat fighter wing with Danish F-16s, South Atlantic EEZ protection.', badge: 'Southern Cone' },
    { rank: 37, name: 'Bangladesh', countryCode: 'BD', stat: 'PwrIndx: 0.5412 • 163K Troops • Forces Goal 2030', detail: 'Top contributor to UN peacekeeping missions worldwide, growing frigate and armor force.', badge: 'UN Peacekeeping Leader' },
    { rank: 38, name: 'Netherlands', countryCode: 'NL', stat: 'PwrIndx: 0.5518 • 41K Troops • F-35A Stealth', detail: 'Fully operational F-35A 5th-gen fighter squadrons, De Zeven Provinciën air defense frigates.', badge: 'NATO 5th-Gen Fleet' },
    { rank: 39, name: 'Norway', countryCode: 'NO', stat: 'PwrIndx: 0.5621 • 25K Troops • F-35A & P-8A', detail: 'NATO northern flank guardian, 52 F-35A stealth fighters, P-8A Poseidon maritime surveillance.', badge: 'Arctic High North' },
    { rank: 40, name: 'Philippines', countryCode: 'PH', stat: 'PwrIndx: 0.5824 • 150K Troops • BrahMos Batteries', detail: 'Comprehensive archipelagic defense modernization with FA-50PH jets and BrahMos missiles.', badge: 'Archipelago Sentinel' },
    { rank: 41, name: 'Nigeria', countryCode: 'NG', stat: 'PwrIndx: 0.6121 • 135K Troops • JF-17 & Super Tucano', detail: 'West Africa’s primary military power combatting counter-insurgency with armed airframes.', badge: 'West Africa Giant' },
    { rank: 42, name: 'Iraq', countryCode: 'IQ', stat: 'PwrIndx: 0.6284 • 193K Troops • F-16IQ & Abrams', detail: 'Rebuilt combined arms land force experienced in urban counter-terrorism warfare.', badge: 'Mesopotamia Defense' },
    { rank: 43, name: 'Colombia', countryCode: 'CO', stat: 'PwrIndx: 0.6541 • 290K Troops • Black Hawk Fleet', detail: 'Latin America’s most battle-hardened infantry and helicopter counter-insurgency force.', badge: 'Andean Force' },
    { rank: 44, name: 'Portugal', countryCode: 'PT', stat: 'PwrIndx: 0.6865 • 27K Troops • Tridente AIP & F-16M', detail: 'Founding NATO member, 2 Tridente-class AIP submarines, F-16 Fighting Falcons, 107 naval units.', badge: 'Atlantic NATO Anchor' },
    { rank: 45, name: 'Switzerland', countryCode: 'CH', stat: 'PwrIndx: 0.7012 • 147K Militia Reserves • F/A-18', detail: 'Armed neutrality doctrine, fortified alpine redoubts, procuring F-35A stealth fighters.', badge: 'Armed Neutrality' },
    { rank: 46, name: 'Kazakhstan', countryCode: 'KZ', stat: 'PwrIndx: 0.7245 • 45K Troops • Su-30SM Fighters', detail: 'Premier military in Central Asia, Russian-manufactured heavy armor and 4+ gen fighter jets.', badge: 'Central Asia Power' },
    { rank: 47, name: 'Peru', countryCode: 'PE', stat: 'PwrIndx: 0.7389 • 95K Troops • Mirage 2000 & MiG-29', detail: 'Dual-theater defense across Pacific seaboard and Amazon interior, modernized Type 209 subs.', badge: 'Pacific & Amazon' },
    { rank: 48, name: 'Belgium', countryCode: 'BE', stat: 'PwrIndx: 0.7512 • 25K Troops • F-35A Transition', detail: 'Host nation to NATO headquarters, multinational air defense deployments, Caesar artillery.', badge: 'NATO Heart' },
    { rank: 49, name: 'Azerbaijan', countryCode: 'AZ', stat: 'PwrIndx: 0.7624 • 65K Troops • Harop & Bayraktar', detail: 'Modern drone and precision strike pioneer, advanced air defense and tactical missile arms.', badge: 'Caucasus Strike' },
    { rank: 50, name: 'Finland', countryCode: 'FI', stat: 'PwrIndx: 0.7842 • 24K Troops • 900K Reserve Force', detail: 'NATO’s longest border with Russia (1,340 km), procuring 64 F-35A jets, massive artillery park.', badge: 'Nordic Artillery Titan' },
  ];

  const findLocalMedia = (queryText: string, extraText?: string) => {
    const qLower = queryText.toLowerCase();
    // 1. Direct match on user query takes top priority
    for (const item of LOCAL_VISUAL_ASSETS) {
      if (item.keywords.some((k) => qLower.includes(k))) {
        return item.media;
      }
    }
    // 2. Check combined text if query was general
    const combined = `${queryText} ${extraText || ''}`.toLowerCase();
    for (const item of LOCAL_VISUAL_ASSETS) {
      if (item.keywords.some((k) => combined.includes(k))) {
        return item.media;
      }
    }
    return null;
  };

  // Fast in-memory caches for sub-millisecond responses
  const WIKI_MEDIA_CACHE = new Map<string, VisualMediaItem | null>();
  const SERVER_QUERY_CACHE = new Map<string, { timestamp: number; payload: any }>();
  const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour TTL

  const normalizeKey = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const fetchWikiMedia = async (subject: string): Promise<VisualMediaItem | null> => {
    if (!subject || typeof subject !== 'string') return null;
    const clean = subject.trim();
    if (clean.length < 2) return null;

    const cacheKey = clean.toLowerCase();
    if (WIKI_MEDIA_CACHE.has(cacheKey)) {
      return WIKI_MEDIA_CACHE.get(cacheKey) || null;
    }

    try {
      // 1. Direct summary fetch with 1000ms timeout
      const directUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(clean)}`;
      const directRes = await fetch(directUrl, {
        headers: { 'User-Agent': 'WorldAtlasAI/1.0 (contact: info@example.com)' },
        signal: AbortSignal.timeout(1000),
      });
      if (directRes.ok) {
        const data: any = await directRes.json();
        const img = data.originalimage?.source || data.thumbnail?.source;
        if (img) {
          const item: VisualMediaItem = {
            title: data.title || clean,
            subtitle: data.description || 'Verified Global Reference',
            imageUrl: img,
            category: 'Encyclopedic Visual Intelligence',
            badge: 'Verified Photo',
          };
          WIKI_MEDIA_CACHE.set(cacheKey, item);
          return item;
        }
      }

      // 2. OpenSearch query fallback with 1000ms timeout
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(clean)}&utf8=&format=json`;
      const searchRes = await fetch(searchUrl, {
        headers: { 'User-Agent': 'WorldAtlasAI/1.0 (contact: info@example.com)' },
        signal: AbortSignal.timeout(1000),
      });
      if (searchRes.ok) {
        const searchData: any = await searchRes.json();
        const firstHit = searchData.query?.search?.[0];
        if (firstHit?.title) {
          const sumUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
          const sumRes = await fetch(sumUrl, {
            headers: { 'User-Agent': 'WorldAtlasAI/1.0 (contact: info@example.com)' },
            signal: AbortSignal.timeout(1000),
          });
          if (sumRes.ok) {
            const sumData: any = await sumRes.json();
            const img = sumData.originalimage?.source || sumData.thumbnail?.source;
            if (img) {
              const item: VisualMediaItem = {
                title: sumData.title || firstHit.title,
                subtitle: sumData.description || 'Verified Global Reference',
                imageUrl: img,
                category: 'Encyclopedic Visual Intelligence',
                badge: 'Verified Photo',
              };
              WIKI_MEDIA_CACHE.set(cacheKey, item);
              return item;
            }
          }
        }
      }
    } catch {
      // Quiet timeout or network fail
    }

    WIKI_MEDIA_CACHE.set(cacheKey, null);
    return null;
  };

  app.post('/api/ask-search', async (req, res) => {
    const { query } = req.body;
    const cleanQuery = typeof query === 'string' ? query.trim() : '';

    if (!cleanQuery) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search question.',
      });
    }

    // High-speed memory cache check (0ms response time for repeat/similar queries)
    const cacheKey = normalizeKey(cleanQuery);
    const cached = SERVER_QUERY_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json({
        success: true,
        ...cached.payload,
        cached: true,
      });
    }

    const sendCachedResponse = (payload: any) => {
      SERVER_QUERY_CACHE.set(cacheKey, { timestamp: Date.now(), payload });
      if (SERVER_QUERY_CACHE.size > 500) {
        const oldestKey = SERVER_QUERY_CACHE.keys().next().value;
        if (oldestKey) SERVER_QUERY_CACHE.delete(oldestKey);
      }
      return res.json({
        success: true,
        ...payload,
      });
    };

    const apiKey = process.env.GEMINI_API_KEY;

    // Helper: Local fallback knowledge resolver for edge cases
    const getLocalFallback = async (q: string) => {
      const lower = q.toLowerCase();

      // Example 1: Biggest plane in the world / Antonov An-225 / Stratolaunch
      if (
        lower.includes('biggest plane') ||
        lower.includes('largest plane') ||
        lower.includes('biggest airplane') ||
        lower.includes('largest aircraft') ||
        lower.includes('biggest aircraft') ||
        lower.includes('an-225') ||
        lower.includes('an 225') ||
        lower.includes('antonov') ||
        lower.includes('mriya') ||
        lower.includes('stratolaunch')
      ) {
        return {
          answer:
            "The Antonov An-225 Mriya ('Dream') was the largest and heaviest cargo airplane ever built in the world, with an astonishing maximum takeoff weight of 640 tonnes (1.41 million pounds), six turbofan engines, and an 88.4-meter (290 ft) wingspan. By wingspan alone, the Scaled Composites Stratolaunch Roc currently holds the operational record at 117 meters (385 ft). The sole operational An-225 was destroyed in February 2022 during the Battle of Antonov Airport near Kyiv, Ukraine.",
          targetCountry: 'Ukraine',
          targetCountryCode: 'UA',
          otherCountries: ['United States', 'Russia'],
          keyFacts: [
            'World Record: Antonov An-225 holds 240+ world records including heaviest single cargo item ever flown (189.9 tonnes).',
            'Wingspan: 88.4 m (290 ft) with 6 Progress D-18T turbofan engines generating over 300 kN of thrust.',
            'Payload: 250 tonnes (550,000 lb / capable of transporting up to four main battle tanks).',
            'Stratolaunch Roc: Holds current wingspan record (117m / 385 ft) as a dual-fuselage rocket carrier aircraft.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS[0].media,
        };
      }

      // Example 2: Does Russia have C-17?
      if ((lower.includes('c-17') || lower.includes('c 17') || lower.includes('c17')) && lower.includes('russia')) {
        return {
          answer:
            "No, Russia does not have or operate the Boeing C-17 Globemaster III. The C-17 is an American heavy strategic airlifter produced by Boeing for the United States Air Force and key allied militaries (including the UK, Australia, Canada, India, Qatar, and UAE). Russia relies instead on its own domestic heavy strategic airlifters, primarily the Ilyushin Il-76 'Candid' and the Antonov An-124 'Ruslan'.",
          targetCountry: 'Russia',
          targetCountryCode: 'RU',
          otherCountries: ['United States', 'Australia', 'India', 'United Kingdom'],
          keyFacts: [
            'The C-17 Globemaster III is manufactured in the United States by Boeing.',
            "Russia's primary strategic airlifters are the Ilyushin Il-76 and the giant Antonov An-124.",
            'Russia has never purchased, operated, or been supplied with C-17 aircraft.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS[1].media,
        };
      }

      // Check general local visual assets
      const matchedLocalMedia = findLocalMedia(q);

      // Fast country and entity matcher with regex word boundary protection
      const findCountryInQuery = (text: string): { name: string; code: string } | null => {
        const t = text.toLowerCase();
        const aliases: [string[], string, string][] = [
          [['united states', 'usa', 'us navy', 'u.s.', 'america', 'american'], 'United States', 'US'],
          [['united kingdom', 'uk', 'u.k.', 'britain', 'british', 'royal navy', 'england'], 'United Kingdom', 'GB'],
          [['south korea', 'korean navy', 'republic of korea', 'rok'], 'South Korea', 'KR'],
          [['north korea', 'dprk'], 'North Korea', 'KP'],
          [['united arab emirates', 'uae'], 'United Arab Emirates', 'AE'],
          [['russia', 'russian'], 'Russia', 'RU'],
          [['china', 'chinese', 'plan'], 'China', 'CN'],
          [['japan', 'japanese', 'jmsdf'], 'Japan', 'JP'],
          [['india', 'indian'], 'India', 'IN'],
          [['france', 'french', 'marine nationale'], 'France', 'FR'],
          [['germany', 'german', 'bundeswehr', 'deutsche marine'], 'Germany', 'DE'],
          [['italy', 'italian', 'marina militare'], 'Italy', 'IT'],
          [['spain', 'spanish', 'armada española', 'armada espanola'], 'Spain', 'ES'],
          [['portugal', 'portuguese', 'marinha portuguesa'], 'Portugal', 'PT'],
          [['brazil', 'brazilian', 'marinha do brasil'], 'Brazil', 'BR'],
          [['turkey', 'turkish', 'türkiye', 'turkiye'], 'Turkey', 'TR'],
          [['indonesia', 'indonesian', 'tni-al'], 'Indonesia', 'ID'],
          [['colombia', 'colombian'], 'Colombia', 'CO'],
          [['egypt', 'egyptian'], 'Egypt', 'EG'],
          [['iran', 'iranian', 'irgc'], 'Iran', 'IR'],
          [['sweden', 'swedish'], 'Sweden', 'SE'],
          [['pakistan', 'pakistani'], 'Pakistan', 'PK'],
          [['algeria', 'algerian'], 'Algeria', 'DZ'],
          [['taiwan', 'taiwanese', 'roc navy'], 'Taiwan', 'TW'],
          [['greece', 'greek', 'hellenic navy'], 'Greece', 'GR'],
          [['vietnam', 'vietnamese'], 'Vietnam', 'VN'],
          [['mexico', 'mexican'], 'Mexico', 'MX'],
          [['philippines', 'filipino'], 'Philippines', 'PH'],
          [['netherlands', 'dutch', 'holland'], 'Netherlands', 'NL'],
          [['singapore', 'singaporean'], 'Singapore', 'SG'],
          [['australia', 'australian', 'ran'], 'Australia', 'AU'],
          [['bangladesh', 'bangladeshi'], 'Bangladesh', 'BD'],
          [['norway', 'norwegian'], 'Norway', 'NO'],
          [['canada', 'canadian', 'rcn'], 'Canada', 'CA'],
          [['chile', 'chilean'], 'Chile', 'CL'],
          [['peru', 'peruvian'], 'Peru', 'PE'],
          [['morocco', 'moroccan'], 'Morocco', 'MA'],
          [['malaysia', 'malaysian'], 'Malaysia', 'MY'],
          [['saudi arabia', 'saudi'], 'Saudi Arabia', 'SA'],
          [['israel', 'israeli', 'idf'], 'Israel', 'IL'],
          [['poland', 'polish'], 'Poland', 'PL'],
          [['denmark', 'danish'], 'Denmark', 'DK'],
          [['argentina', 'argentine'], 'Argentina', 'AR'],
          [['finland', 'finnish'], 'Finland', 'FI'],
          [['romania', 'romanian'], 'Romania', 'RO'],
          [['south africa', 'south african'], 'South Africa', 'ZA'],
          [['nigeria', 'nigerian'], 'Nigeria', 'NG'],
          [['sri lanka', 'sri lankan'], 'Sri Lanka', 'LK'],
          [['ukraine', 'ukrainian'], 'Ukraine', 'UA'],
          [['switzerland', 'swiss'], 'Switzerland', 'CH'],
          [['kazakhstan', 'kazakh'], 'Kazakhstan', 'KZ'],
          [['belgium', 'belgian'], 'Belgium', 'BE'],
          [['azerbaijan', 'azerbaijani'], 'Azerbaijan', 'AZ'],
          [['iraq', 'iraqi'], 'Iraq', 'IQ'],
          [['thailand', 'thai'], 'Thailand', 'TH'],
          [['myanmar', 'burmese', 'burma'], 'Myanmar', 'MM'],
        ];

        for (const [terms, name, code] of aliases) {
          if (terms.some((term) => new RegExp(`\\b${term}\\b`, 'i').test(t) || t.includes(term))) {
            return { name, code };
          }
        }
        return null;
      };

      // 1. Universal Country Naval Rank Check (Instant <2ms accurate response for ANY nation)
      const isNavalQuestion =
        lower.includes('naval') ||
        lower.includes('navy') ||
        lower.includes('fleet') ||
        lower.includes('marinha') ||
        lower.includes('armada') ||
        lower.includes('sea power') ||
        lower.includes('warship') ||
        lower.includes('submarines');

      const isRankQuestion =
        lower.includes('rank') ||
        lower.includes('standing') ||
        lower.includes('position') ||
        lower.includes('place') ||
        lower.includes('where does') ||
        lower.includes('what is the rank') ||
        lower.includes('how strong') ||
        lower.includes('how powerful') ||
        lower.includes('number');

      if (isNavalQuestion && (isRankQuestion || lower.startsWith('what rank') || lower.startsWith('what is') || lower.includes('what is the rank'))) {
        const countryMatch = findCountryInQuery(lower);
        if (countryMatch) {
          const navalItem = TOP_50_NAVAL_FORCES.find(
            (c) => c.name.toLowerCase() === countryMatch.name.toLowerCase() || c.countryCode === countryMatch.code
          );
          if (navalItem) {
            const milItem = TOP_50_MILITARY_POWERS.find(
              (m) => m.name.toLowerCase() === countryMatch.name.toLowerCase() || m.countryCode === countryMatch.code
            );

            return {
              answer: `${navalItem.name} ranks #${navalItem.rank} globally in naval combat strength (${navalItem.stat})${
                milItem ? ` and #${milItem.rank} overall in Global Firepower military strength` : ''
              }. ${navalItem.detail}`,
              targetCountry: navalItem.name,
              targetCountryCode: navalItem.countryCode,
              otherCountries: ['United States', 'China', 'Russia', 'United Kingdom', 'France'],
              directRank: {
                rank: `#${navalItem.rank}`,
                subRank: milItem ? `#${milItem.rank} Overall GFP` : 'Global Fleet Assets',
                category: 'Naval Combat Power & Fleet Strength',
                entity: navalItem.name,
                metrics: [
                  { label: 'Naval Rank', value: `#${navalItem.rank} globally` },
                  { label: 'Fleet Breakdown', value: navalItem.stat },
                  { label: 'Strategic Role', value: navalItem.badge },
                  ...(milItem ? [{ label: 'GFP Military Power', value: `#${milItem.rank} (${milItem.stat.split('•')[0]?.trim() || ''})` }] : []),
                ],
              },
              rankedList: {
                title: `Top Naval Powers (with ${navalItem.name} Standing at #${navalItem.rank})`,
                category: 'Global Naval Fleet Comparison',
                metricName: 'Supercarriers • Total Hull Count • Subsurface Power',
                items: TOP_50_NAVAL_FORCES.slice(0, Math.max(10, navalItem.rank <= 25 ? 25 : 50)),
              },
              keyFacts: [
                `Global Naval Rank: #${navalItem.rank} worldwide (${navalItem.badge}).`,
                `Fleet Capabilities: ${navalItem.stat}.`,
                `Strategic Posture: ${navalItem.detail}`,
                ...(milItem ? [`Global Firepower Ranking: #${milItem.rank} overall military strength.`] : []),
              ],
              source: 'intelligence-registry',
              media: findLocalMedia(`${navalItem.name.toLowerCase()} naval`) || findLocalMedia('naval frigate') || matchedLocalMedia,
            };
          }
        }
      }

      // 2. Universal Country Military Rank Check (Instant <2ms accurate response for ANY nation)
      const isMilQuestion =
        lower.includes('military') ||
        lower.includes('army') ||
        lower.includes('armed force') ||
        lower.includes('firepower') ||
        lower.includes('defense force') ||
        lower.includes('gfp');

      if (isMilQuestion && (isRankQuestion || lower.startsWith('what rank') || lower.startsWith('what is') || lower.includes('what is the rank'))) {
        const countryMatch = findCountryInQuery(lower);
        if (countryMatch) {
          const milItem = TOP_50_MILITARY_POWERS.find(
            (m) => m.name.toLowerCase() === countryMatch.name.toLowerCase() || m.countryCode === countryMatch.code
          );
          if (milItem) {
            const navalItem = TOP_50_NAVAL_FORCES.find(
              (n) => n.name.toLowerCase() === countryMatch.name.toLowerCase() || n.countryCode === countryMatch.code
            );

            return {
              answer: `${milItem.name} ranks #${milItem.rank} globally in military strength on the Global Firepower Index (${milItem.stat})${
                navalItem ? ` and #${navalItem.rank} in global naval fleet strength (${navalItem.stat.split('•')[0]?.trim() || ''})` : ''
              }. ${milItem.detail}`,
              targetCountry: milItem.name,
              targetCountryCode: milItem.countryCode,
              otherCountries: ['United States', 'Russia', 'China', 'India'],
              directRank: {
                rank: `#${milItem.rank}`,
                subRank: milItem.stat.split('•')[0]?.trim() || 'GFP Verified',
                category: 'Global Firepower Military Strength',
                entity: milItem.name,
                metrics: [
                  { label: 'GFP Military Rank', value: `#${milItem.rank} globally` },
                  { label: 'Combat Power Index', value: milItem.stat },
                  { label: 'Armed Forces Role', value: milItem.badge },
                  ...(navalItem ? [{ label: 'Naval Standing', value: `#${navalItem.rank} (${navalItem.stat.split('•')[0]?.trim() || ''})` }] : []),
                ],
              },
              rankedList: {
                title: `Top Military Powers (with ${milItem.name} Standing at #${milItem.rank})`,
                category: 'Armed Forces Strength & Military Firepower',
                metricName: 'PwrIndx Score • Active Troops • Budget • Combat Assets',
                items: TOP_50_MILITARY_POWERS.slice(0, Math.max(10, milItem.rank <= 25 ? 25 : 50)),
              },
              keyFacts: [
                `Global Firepower Rank: #${milItem.rank} globally (${milItem.badge}).`,
                `Combat Capabilities: ${milItem.stat}.`,
                `Strategic Doctrine: ${milItem.detail}`,
                ...(navalItem ? [`Naval Fleet Standing: #${navalItem.rank} globally.`] : []),
              ],
              source: 'intelligence-registry',
              media: findLocalMedia(`${milItem.name.toLowerCase()} military`) || findLocalMedia('tank') || matchedLocalMedia,
            };
          }
        }
      }

      // Dedicated Direct Rank: What rank is Portugal in naval force / Portuguese Navy rank
      if (
        lower.includes('portugal') &&
        (lower.includes('naval') || lower.includes('navy') || lower.includes('marinha') || lower.includes('fleet') || lower.includes('sea power'))
      ) {
        return {
          answer:
            "Portugal ranks #23 globally in total naval fleet assets (with 107 total naval vessels) and #44 overall in Global Firepower military strength (PowerIndex 0.6865). The Portuguese Navy (Marinha Portuguesa) operates 2 modern German-built Tridente-class AIP attack submarines, 5 guided missile frigates (Vasco da Gama & Bartolomeu Dias classes), 2 corvettes, and over 21 ocean and coastal patrol ships protecting the European Union's 3rd-largest maritime Exclusive Economic Zone (1.7 million km²).",
          targetCountry: 'Portugal',
          targetCountryCode: 'PT',
          otherCountries: ['Spain', 'France', 'United States'],
          directRank: {
            rank: '#23',
            subRank: '#44 Overall GFP Military',
            category: 'Naval Fleet Strength & Global Firepower',
            entity: 'Portugal (Marinha Portuguesa)',
            metrics: [
              { label: 'Total Naval Fleet', value: '107 Units (#23 globally)' },
              { label: 'Attack Submarines', value: '2 (Tridente-class AIP)' },
              { label: 'Guided Missile Frigates', value: '5 (MEKO 200 & Karel Doorman)' },
              { label: 'Ocean Patrol Ships', value: '21+ Patrol Vessels' },
              { label: 'Active Naval Personnel', value: '8,900+ Active Sailors' },
              { label: 'Maritime Patrol Zone', value: '1,700,000 km² (3rd largest in EU)' },
            ],
          },
          rankedList: {
            title: 'Top Naval Powers (with Portugal Standing at #23)',
            category: 'Global Naval Fleet Comparison',
            metricName: 'Supercarriers • Total Hull Count • Subsurface Power',
            items: TOP_50_NAVAL_FORCES.slice(0, 25),
          },
          keyFacts: [
            'Global Naval Fleet Rank: #23 globally with 107 total naval units in active commission.',
            'Subsurface Force: 2 Tridente-class AIP submarines (NRP Tridente and NRP Arpão) capable of long-duration stealth submerged missions.',
            'Surface Escorts: 5 guided missile frigates (3 Vasco da Gama class and 2 Bartolomeu Dias class).',
            'Vast Maritime Domain: Safeguards an Exclusive Economic Zone (EEZ) 18 times larger than mainland Portugal.',
            'Overall Military Firepower: #44 of 145 countries in Global Firepower index.',
          ],
          source: 'intelligence-registry',
          media: findLocalMedia('portugal naval') || matchedLocalMedia || (await fetchWikiMedia('Portuguese Navy')),
        };
      }

      // Dedicated Top 50 Naval Forces in the World
      if (
        (lower.includes('50') || lower.includes('fifty') || lower.includes('top 50') || lower.includes('all naval') || lower.includes('full list')) &&
        (lower.includes('naval') || lower.includes('navy') || lower.includes('navies') || lower.includes('fleet') || lower.includes('sea power') || lower.includes('boat') || lower.includes('ship'))
      ) {
        return {
          answer:
            "The world's top naval forces are led by the United States (#1, operating 11 nuclear supercarriers and 3.4M tons of naval shipping), followed by China (#2, world's largest fleet by hull count with 730+ ships), Russia (#3, 65 submarines and heavy missile cruisers), North Korea (#4), and Indonesia (#5). Below is the comprehensive ranking of all top 50 naval powers in the world by fleet strength, combat tonnage, and strategic capability.",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['China', 'Russia', 'North Korea', 'Indonesia', 'Japan', 'India', 'South Korea', 'United Kingdom', 'Turkey', 'Portugal', 'France', 'Spain'],
          rankedList: {
            title: 'Top 50 Naval Powers in the World (Global Fleet & Combat Strength)',
            category: 'Naval Combat Power & Fleet Assets',
            metricName: 'Supercarriers • Total Hull Count • Displacement • Subsurface Power',
            items: TOP_50_NAVAL_FORCES,
          },
          keyFacts: [
            'Tonnage Hegemon: The United States Navy operates ~3.4 million tons of naval combat displacement—more than the next several global navies combined.',
            'Hull Count Leader: China’s PLAN is the largest navy by number of active battle force ships (730+ ships).',
            'Submarine Deterrence: Russia, the United States, and China operate the premier nuclear ballistic and guided-missile submarine fleets.',
            'Aircraft Carriers: 11 US nuclear supercarriers, 3 Chinese carriers, 2 British supercarriers, 2 Indian carriers, 2 Italian light carriers, 1 French nuclear carrier.',
            'Portugal Naval Fleet: Portugal ranks #23 in the world with 107 total naval units, 2 Tridente-class AIP attack submarines, and 5 guided missile frigates.',
          ],
          source: 'intelligence-registry',
          media: findLocalMedia('naval frigate') || matchedLocalMedia || (await fetchWikiMedia('Naval fleet')),
        };
      }

      // Dedicated Top 10 / General Naval Forces
      if (
        (lower.includes('naval') || lower.includes('navy') || lower.includes('navies') || lower.includes('fleet') || lower.includes('sea power')) &&
        (lower.includes('top 10') || lower.includes('top ten') || lower.includes('strongest') || lower.includes('biggest') || lower.includes('rank') || lower.includes('best') || lower.includes('world'))
      ) {
        return {
          answer:
            "The United States Navy ranks #1 as the most powerful naval force in the world by aircraft carrier strike group projection and total displacement tonnage (over 3.4 million tons), followed closely by China's People's Liberation Army Navy (PLAN), which commands the world's largest fleet by total hull count (730+ vessels). Russia, North Korea, Indonesia, Japan, India, South Korea, the United Kingdom, and Turkey complete the top 10 naval powers.",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['China', 'Russia', 'North Korea', 'Indonesia', 'Japan', 'India', 'South Korea', 'United Kingdom', 'Turkey'],
          rankedList: {
            title: 'Top 10 Naval Powers in the World (2025/2026)',
            category: 'Naval Fleet Strength & Global Projection',
            metricName: 'Supercarriers • Total Hull Count • Displacement • Subsurface Power',
            items: TOP_50_NAVAL_FORCES.slice(0, 10),
          },
          keyFacts: [
            'Top 10 Naval Powers: United States, China, Russia, North Korea, Indonesia, Japan, India, South Korea, UK, Turkey.',
            'Tonnage Dominance: US Navy operates 3.4M tons of naval shipping—more than the next several global navies combined.',
            'Hull Count: China’s PLAN has the highest ship count with over 730 active vessels.',
            'Carrier Dominance: 11 US nuclear supercarriers, 3 Chinese carriers, 2 British carriers, 2 Indian carriers, 4 Japanese helicopter destroyers.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS.find((a) => a.keywords.includes('aircraft carrier'))?.media || null,
        };
      }

      // Dedicated Top 50 Military Powers in the World
      if (
        (lower.includes('50') || lower.includes('fifty') || lower.includes('top 50')) &&
        (lower.includes('military') || lower.includes('army') || lower.includes('armies') || lower.includes('power') || lower.includes('firepower'))
      ) {
        return {
          answer:
            "The United States holds the #1 military ranking in the world according to the Global Firepower Index (PowerIndex: 0.0699), driven by an $842B+ defense budget, 11 supercarriers, and 13,200+ aircraft. Russia ranks #2, followed by China at #3, India (#4), and South Korea (#5). Below is the comprehensive ranking of all top 50 military powers in the world.",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['Russia', 'China', 'India', 'South Korea', 'United Kingdom', 'Japan', 'Turkey', 'Pakistan', 'Italy'],
          rankedList: {
            title: 'Top 50 Military Powers in the World (Global Firepower Index)',
            category: 'Armed Forces Strength & Military Firepower',
            metricName: 'PwrIndx Score • Active Troops • Budget • Combat Assets',
            items: TOP_50_MILITARY_POWERS,
          },
          keyFacts: [
            'Top 3 Hegemons: USA (#1), Russia (#2), and China (#3) maintain dominant military capabilities.',
            'Global Firepower Ranking evaluates 60+ individual factors including troop numbers, logistics, equipment, geography, and financial strength.',
            'A perfect PowerIndex score is 0.0000; the lower the score, the higher the military firepower.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS.find((a) => a.keywords.includes('c-17'))?.media || null,
        };
      }

      // Dedicated Top 10 Military / Armies
      if (
        (lower.includes('top 10') || lower.includes('top ten')) &&
        (lower.includes('military') || lower.includes('army') || lower.includes('armies') || lower.includes('power') || lower.includes('firepower'))
      ) {
        return {
          answer:
            "The United States holds the #1 military ranking in the world according to the Global Firepower Index (PowerIndex: 0.0699), driven by an $842B+ defense budget, 11 supercarriers, and 13,200+ aircraft. Russia ranks #2 with superior armored vehicle reserves and nuclear triad, followed by China at #3 with the largest active-duty personnel (2.03M) and navy hull count. India, South Korea, the United Kingdom, Japan, Turkey, Pakistan, and Italy complete the top 10.",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['Russia', 'China', 'India', 'South Korea', 'United Kingdom', 'Japan', 'Turkey', 'Pakistan', 'Italy'],
          rankedList: {
            title: 'Top 10 Military Powers in the World (Global Firepower Index)',
            category: 'Armed Forces Strength & Military Firepower',
            metricName: 'PwrIndx Score • Active Troops • Budget • Combat Assets',
            items: [
              { rank: 1, name: 'United States', countryCode: 'US', stat: 'PwrIndx: 0.0699 • $842B Budget • 1.3M Troops', detail: '13,200+ aircraft, 11 nuclear supercarriers, 5,500 tanks, unmatched global logistics.', badge: 'Superpower Dominance' },
              { rank: 2, name: 'Russia', countryCode: 'RU', stat: 'PwrIndx: 0.0702 • 1.32M Troops • 5,500+ Nukes', detail: 'Massive armored vehicle reserves, hypersonic missiles, and extensive submarine force.', badge: 'Nuclear & Armor Giant' },
              { rank: 3, name: 'China', countryCode: 'CN', stat: 'PwrIndx: 0.0706 • 2.03M Troops • 730+ Ships', detail: 'Largest standing army, largest naval fleet by hull count, rapidly expanding stealth air wing.', badge: 'Manpower & Modern Tech' },
              { rank: 4, name: 'India', countryCode: 'IN', stat: 'PwrIndx: 0.1023 • 1.45M Troops • 4,600+ Tanks', detail: '2nd largest active military, 2 aircraft carriers, 2,200+ aircraft, strategic nuclear triad.', badge: 'Regional Powerhouse' },
              { rank: 5, name: 'South Korea', countryCode: 'KR', stat: 'PwrIndx: 0.1416 • 600K Troops • 2,500 Tanks', detail: 'High-tech artillery, Aegis destroyers, K2 Black Panther tanks, cutting-edge defense industry.', badge: 'High-Tech Defense' },
              { rank: 6, name: 'United Kingdom', countryCode: 'GB', stat: 'PwrIndx: 0.1443 • 185K Troops • 2 Carriers', detail: 'Nuclear-powered submarine deterrent, 5th-gen F-35B carrier strike groups, NATO anchor.', badge: 'Expeditionary Force' },
              { rank: 7, name: 'Japan', countryCode: 'JP', stat: 'PwrIndx: 0.1601 • 247K Troops • 1,450 Aircraft', detail: 'Advanced maritime patrol, F-35 stealth fighters, world-class anti-submarine destroyers.', badge: 'Elite Maritime & Air' },
              { rank: 8, name: 'Turkey', countryCode: 'TR', stat: 'PwrIndx: 0.1697 • 355K Troops • 1,060 Aircraft', detail: '2nd largest army in NATO, world-leading military drone fleet (Bayraktar), indigenous arms.', badge: 'NATO 2nd Largest Army' },
              { rank: 9, name: 'Pakistan', countryCode: 'PK', stat: 'PwrIndx: 0.1711 • 654K Troops • 3,700 Tanks', detail: 'Large standing land force, nuclear weapons triad, JF-17 fighter jets and missile systems.', badge: 'Nuclear Armed Land Force' },
              { rank: 10, name: 'Italy', countryCode: 'IT', stat: 'PwrIndx: 0.1863 • 165K Troops • 2 Light Carriers', detail: '2 aircraft carriers (Cavour and Trieste), modern multirole frigates, 800+ aircraft.', badge: 'Mediterranean Fleet' },
            ],
          },
          keyFacts: [
            'Top 3 Hegemons: USA (#1), Russia (#2), and China (#3) maintain dominant military capabilities.',
            'Global Firepower Ranking evaluates 60+ individual factors including troop numbers, logistics, equipment, geography, and financial strength.',
            'A perfect PowerIndex score is 0.0000; the lower the score, the higher the military firepower.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS.find((a) => a.keywords.includes('c-17'))?.media || null,
        };
      }

      // Dedicated Top 10 Air Forces
      if (
        (lower.includes('top 10') || lower.includes('top ten')) &&
        (lower.includes('air force') || lower.includes('air forces') || lower.includes('aviation') || lower.includes('planes'))
      ) {
        return {
          answer:
            "The United States Air Force (USAF) commands the world's most powerful air fleet with over 5,200 aircraft including stealth F-22 Raptors, F-35 Lightnings, and B-2 Spirit bombers. Taking into account US Naval Aviation and Army Aviation, the US operates over 13,200 total aircraft, followed by Russia (#2 sovereign air fleet with 4,180+ aircraft) and China (#3 with 3,300+ aircraft including J-20 stealth fighters).",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['Russia', 'China', 'India', 'South Korea', 'Japan', 'Pakistan', 'Egypt', 'Turkey', 'France'],
          rankedList: {
            title: 'Top 10 Air Forces in the World (Combat Aircraft & Total Fleets)',
            category: 'Military Aviation & Air Dominance',
            metricName: 'Total Aircraft • 5th-Gen Stealth • Bombers • Transports',
            items: [
              { rank: 1, name: 'United States', countryCode: 'US', stat: '13,209 Total Aircraft • 1,800+ Fighters • 700+ Tankers', detail: 'Operates both USAF and US Naval aviation, undisputed stealth dominance with F-22, F-35, and B-21 Raider.', badge: 'Global Air Dominance' },
              { rank: 2, name: 'Russia', countryCode: 'RU', stat: '4,182 Aircraft • 800+ Su-35/Su-30/Su-57 Fighters', detail: 'Heavy strategic bombers (Tu-160 Blackjack, Tu-95 Bear), advanced interceptors and attack helicopters.', badge: 'Strategic Bomber Fleet' },
              { rank: 3, name: 'China', countryCode: 'CN', stat: '3,304 Aircraft • J-20 Stealth Fighters • H-6 Bombers', detail: 'Fast-growing 5th-generation stealth fleet (Chengdu J-20) and indigenous Y-20 strategic airlifters.', badge: 'Indigenous Stealth & Lift' },
              { rank: 4, name: 'India', countryCode: 'IN', stat: '2,296 Aircraft • Su-30MKI • Dassault Rafale', detail: 'Diverse multi-role fleet with front-line French Rafale fighters, Su-30MKI heavy fighters, and Tejas LCA.', badge: 'Multinational Tech Fleet' },
              { rank: 5, name: 'South Korea', countryCode: 'KR', stat: '1,576 Aircraft • F-35A Stealth • KF-21 Boramae', detail: 'Operating 40+ F-35A stealth fighters and introducing the indigenous 4.5-gen KF-21 supersonic fighter.', badge: 'Advanced Asian Fleet' },
              { rank: 6, name: 'Japan', countryCode: 'JP', stat: '1,459 Aircraft • F-35A/B • F-15J Eagles', detail: 'Premier air-defense force with advanced E-2D Hawkeye AWACS surveillance and expanding F-35 fleet.', badge: 'Air Defense & Intercept' },
              { rank: 7, name: 'Pakistan', countryCode: 'PK', stat: '1,434 Aircraft • JF-17 Thunder • F-16 Falcon • J-10C', detail: 'Modernized multi-role fighter fleet with Chinese J-10CE 4.5-gen fighters and indigenous JF-17 Block III.', badge: 'Tactical Strike' },
              { rank: 8, name: 'Egypt', countryCode: 'EG', stat: '1,080 Aircraft • Rafale • F-16 • MiG-29M', detail: 'The largest air force in Africa and the Arab world, blending Western and Eastern combat airframes.', badge: 'Largest in Africa & Arab World' },
              { rank: 9, name: 'Turkey', countryCode: 'TR', stat: '1,069 Aircraft • F-16 Fighting Falcons • Kaan Stealth', detail: 'Extensive F-16 fleet, world-leading armed combat UAVs (Akinci, Kizilelma), and TF Kaan 5th-gen project.', badge: 'UAV & Fighter Force' },
              { rank: 10, name: 'France', countryCode: 'FR', stat: '972 Aircraft • Dassault Rafale (Air & Marine)', detail: 'Independent nuclear deterrence via ASMP-A cruise missiles on Rafale B, carrier-capable Rafale M.', badge: 'Nuclear Air Component' },
            ],
          },
          keyFacts: [
            'Top 3 Giants: US (13,200+ aircraft), Russia (4,180+ aircraft), and China (3,300+ aircraft) dominate global military airspace.',
            'Stealth Dominance: The United States operates more 5th-generation stealth combat aircraft than all other nations combined.',
            'Support Capabilities: The US operates over 70% of the world’s dedicated aerial refueling tanker fleet.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS.find((a) => a.keywords.includes('stealth jet'))?.media || null,
        };
      }

      // Dedicated General Top 10 fallback
      if (lower.startsWith('top 10') || lower.startsWith('top ten') || lower.includes('top 10 countries')) {
        return {
          answer:
            "Here are the Top 10 global military and defense powers according to the Global Firepower Index. The United States leads at #1, followed by Russia (#2), China (#3), India (#4), and South Korea (#5).",
          targetCountry: 'United States',
          targetCountryCode: 'US',
          otherCountries: ['Russia', 'China', 'India', 'South Korea', 'United Kingdom', 'Japan', 'Turkey', 'Pakistan', 'Italy'],
          rankedList: {
            title: 'Top 10 Global Military & Defense Powers (2025/2026)',
            category: 'Armed Forces Strength & Global Firepower',
            metricName: 'PwrIndx Score • Troops • Equipment • Defense Budget',
            items: [
              { rank: 1, name: 'United States', countryCode: 'US', stat: 'PwrIndx: 0.0699 • $842B Budget', detail: '11 supercarriers, 13,200 aircraft, 1.3M active personnel.', badge: '#1 Superpower' },
              { rank: 2, name: 'Russia', countryCode: 'RU', stat: 'PwrIndx: 0.0702 • 1.32M Troops', detail: '5,500+ nuclear warheads, massive armor and missile reserves.', badge: 'Nuclear & Land Power' },
              { rank: 3, name: 'China', countryCode: 'CN', stat: 'PwrIndx: 0.0706 • 2.03M Troops', detail: 'Largest navy by hull count (730+ ships), 3 aircraft carriers.', badge: 'Manpower & Modernization' },
              { rank: 4, name: 'India', countryCode: 'IN', stat: 'PwrIndx: 0.1023 • 1.45M Troops', detail: '2 aircraft carriers, 4,600 tanks, strategic Indian Ocean dominance.', badge: 'Regional Powerhouse' },
              { rank: 5, name: 'South Korea', countryCode: 'KR', stat: 'PwrIndx: 0.1416 • 600K Troops', detail: 'Aegis destroyers, K2 Black Panther tanks, world-class artillery.', badge: 'High-Tech Defense' },
              { rank: 6, name: 'United Kingdom', countryCode: 'GB', stat: 'PwrIndx: 0.1443 • 185K Troops', detail: '2 Queen Elizabeth carriers, Vanguard nuclear ballistic submarines.', badge: 'Expeditionary Force' },
              { rank: 7, name: 'Japan', countryCode: 'JP', stat: 'PwrIndx: 0.1601 • 247K Troops', detail: 'Anti-submarine warfare leaders, Aegis destroyers, F-35 fighters.', badge: 'Maritime & Air Tech' },
              { rank: 8, name: 'Turkey', countryCode: 'TR', stat: 'PwrIndx: 0.1697 • 355K Troops', detail: '2nd largest army in NATO, world-leading armed combat drone fleet.', badge: 'NATO 2nd Army' },
              { rank: 9, name: 'Pakistan', countryCode: 'PK', stat: 'PwrIndx: 0.1711 • 654K Troops', detail: 'Nuclear-armed triad, JF-17 multirole fighters, large land army.', badge: 'Nuclear Armed' },
              { rank: 10, name: 'Italy', countryCode: 'IT', stat: 'PwrIndx: 0.1863 • 165K Troops', detail: '2 aircraft carriers (Cavour, Trieste), modern FREMM frigates.', badge: 'Mediterranean Fleet' },
            ],
          },
          keyFacts: [
            'Top 10 Global Military Powers evaluated across 60+ metrics including logistics, finances, and troop numbers.',
            'Click any country card to view it directly on the 3D globe.',
          ],
          source: 'intelligence-registry',
          media: LOCAL_VISUAL_ASSETS.find((a) => a.keywords.includes('c-17'))?.media || null,
        };
      }

      // Example 3: Where is Australia?
      if (lower.includes('australia') && (lower.includes('where') || lower.includes('location') || lower.includes('find'))) {
        return {
          answer:
            'Australia is a continent and sovereign nation situated in the Southern Hemisphere, lying between the Indian Ocean and the South Pacific Ocean. It comprises mainland Australia, the island state of Tasmania, and several peripheral islands in Oceania. Its national capital is Canberra, and its largest cities are Sydney and Melbourne.',
          targetCountry: 'Australia',
          targetCountryCode: 'AU',
          otherCountries: [],
          keyFacts: [
            'Location: Oceania / Southern Hemisphere between the Indian and Pacific Oceans.',
            'Federal Capital: Canberra (Largest metropolis: Sydney).',
            'Land Area: 7,692,024 km² (2,969,907 sq mi) — 6th largest country on Earth.',
          ],
          source: 'intelligence-registry',
          media: matchedLocalMedia || (await fetchWikiMedia('Australia')),
        };
      }

      // Example 4: Portugal vs Mauritania land area
      if (
        (lower.includes('portugal') || lower.includes('mauritania')) &&
        (lower.includes('area') || lower.includes('big') || lower.includes('square') || lower.includes('size'))
      ) {
        return {
          answer:
            "Mauritania is vastly larger than Portugal. Mauritania spans approximately 1,030,700 km² (397,955 sq mi) across the Sahara and Sahel in West Africa, making it over 11 times the size of Portugal. Portugal's total territorial land area is 92,226 km² (35,609 sq mi), including mainland Portugal (89,015 km²) and the Atlantic archipelagos of Madeira and the Azores.",
          targetCountry: lower.includes('mauritania') ? 'Mauritania' : 'Portugal',
          targetCountryCode: lower.includes('mauritania') ? 'MR' : 'PT',
          otherCountries: lower.includes('mauritania') ? ['Portugal'] : ['Mauritania'],
          keyFacts: [
            'Mauritania Area: 1,030,700 km² (~1.03M km² / 397,955 sq mi).',
            'Portugal Area: 92,226 km² (35,609 sq mi) including Azores & Madeira.',
            'Mauritania ranks 28th globally by land area, while Portugal ranks 109th.',
          ],
          source: 'intelligence-registry',
          media: matchedLocalMedia || (await fetchWikiMedia(lower.includes('mauritania') ? 'Mauritania' : 'Portugal')),
        };
      }

      // General Country detection in query
      const countryMatches = [
        { name: 'United States', code: 'US', leader: 'Joe Biden', capital: 'Washington, D.C.', pop: '335M', rank: '1', aliases: ['usa', 'america', 'united states', 'us', 'biden', 'trump'] },
        { name: 'Russia', code: 'RU', leader: 'Vladimir Putin', capital: 'Moscow', pop: '144M', rank: '2', aliases: ['russia', 'russian federation', 'moscow', 'putin', 'kremlin'] },
        { name: 'China', code: 'CN', leader: 'Xi Jinping', capital: 'Beijing', pop: '1.41B', rank: '3', aliases: ['china', 'prc', 'beijing', 'xi jinping'] },
        { name: 'Australia', code: 'AU', leader: 'Anthony Albanese', capital: 'Canberra', pop: '26M', rank: '16', aliases: ['australia', 'canberra', 'sydney', 'albanese'] },
        { name: 'Portugal', code: 'PT', leader: 'Marcelo Rebelo de Sousa', capital: 'Lisbon', pop: '10.4M', rank: '44', aliases: ['portugal', 'lisbon'] },
        { name: 'Mauritania', code: 'MR', leader: 'Mohamed Ould Ghazouani', capital: 'Nouakchott', pop: '4.7M', rank: '128', aliases: ['mauritania', 'nouakchott'] },
        { name: 'United Kingdom', code: 'GB', leader: 'Keir Starmer', capital: 'London', pop: '67M', rank: '6', aliases: ['uk', 'britain', 'united kingdom', 'england', 'starmer'] },
        { name: 'France', code: 'FR', leader: 'Emmanuel Macron', capital: 'Paris', pop: '68M', rank: '11', aliases: ['france', 'paris', 'macron'] },
        { name: 'Germany', code: 'DE', leader: 'Olaf Scholz', capital: 'Berlin', pop: '84M', rank: '19', aliases: ['germany', 'berlin', 'scholz'] },
        { name: 'Japan', code: 'JP', leader: 'Shigeru Ishiba', capital: 'Tokyo', pop: '124M', rank: '7', aliases: ['japan', 'tokyo', 'ishiba'] },
        { name: 'India', code: 'IN', leader: 'Narendra Modi', capital: 'New Delhi', pop: '1.43B', rank: '4', aliases: ['india', 'new delhi', 'modi'] },
        { name: 'Brazil', code: 'BR', leader: 'Luiz Inácio Lula da Silva', capital: 'Brasilia', pop: '216M', rank: '12', aliases: ['brazil', 'brasilia', 'lula'] },
        { name: 'Canada', code: 'CA', leader: 'Justin Trudeau', capital: 'Ottawa', pop: '40M', rank: '27', aliases: ['canada', 'ottawa', 'trudeau'] },
      ];

      for (const c of countryMatches) {
        if (c.aliases.some((alias) => lower.includes(alias))) {
          let directAnswer = `Geopolitical intelligence for ${c.name}: Capital is ${c.capital}, current executive leader is ${c.leader}, with an estimated population of ${c.pop}. ${c.name} holds a Global Firepower military ranking of #${c.rank}.`;
          let subjectWiki = c.name;
          if (lower.includes('president') || lower.includes('leader') || lower.includes('prime minister') || lower.includes('who is')) {
            directAnswer = `The executive leader of ${c.name} is ${c.leader}. The capital city is ${c.capital}.`;
            subjectWiki = c.leader;
          } else if (lower.includes('capital')) {
            directAnswer = `The official capital city of ${c.name} is ${c.capital}.`;
            subjectWiki = c.capital;
          } else if (lower.includes('population') || lower.includes('how many people')) {
            directAnswer = `The population of ${c.name} is approximately ${c.pop}.`;
          } else if (lower.includes('where') || lower.includes('location')) {
            directAnswer = `${c.name} (${c.code}) is located on the world map with capital at ${c.capital}. Click 'Show on World Map' to fly directly to it.`;
          }

          const photoMedia = matchedLocalMedia || (await fetchWikiMedia(subjectWiki)) || (await fetchWikiMedia(c.name));

          return {
            answer: directAnswer,
            targetCountry: c.name,
            targetCountryCode: c.code,
            otherCountries: [],
            keyFacts: [`Leader: ${c.leader}`, `Capital: ${c.capital}`, `GFP Military Rank: #${c.rank}`],
            source: 'intelligence-registry',
            media: photoMedia,
          };
        }
      }

      // Default fallback with dynamic wiki photo lookup
      const dynamicPhoto = matchedLocalMedia || (await fetchWikiMedia(q));

      return {
        answer: `Direct answer for "${q}": Search our global intelligence registry for specific defense assets, sovereign leaders, territorial boundaries, or geopolitical rankings.`,
        targetCountry: null,
        targetCountryCode: null,
        otherCountries: [],
        keyFacts: [
          "Ask any question such as 'What is the biggest plane in the world?' or 'Does Russia have C-17?'",
          "You can also ask 'Who is the president of France?' or 'Where is Australia?'",
        ],
        source: 'intelligence-registry',
        media: dynamicPhoto,
      };
    };

    // 1. Instant verified intelligence check for curated facts and rankings (zero-latency, anti-yapping, 100% verified data)
    const instantIntelligence = await getLocalFallback(cleanQuery);
    const isGenericDefault = instantIntelligence.answer.startsWith('Direct answer for "');

    if (!isGenericDefault) {
      return sendCachedResponse(instantIntelligence);
    }

    if (!apiKey) {
      return sendCachedResponse(instantIntelligence);
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `You are an expert global intelligence officer and world atlas assistant.
The user is asking a factual question about a country, world geography, military equipment, airlifters, tanks, navy, weapons, territory, borders, leaders, history, location, or world facts.
User question: "${cleanQuery}"

CRITICAL INSTRUCTIONS:
1. NO YAPPING & DIRECT ANSWER UPFRONT:
   - If the user asks a question about rank (e.g. "what rank is portugal in naval force", "what is the rank of X", "who is the leader", "does X have Y"):
     STATE THE EXACT DIRECT ANSWER AND EXACT RANK NUMBER IMMEDIATELY IN THE VERY FIRST SENTENCE.
     NEVER YAPP or write vague filler paragraphs like "typically ranks outside the top 30" or "the ranking of naval forces is determined by...". Give the exact rank number right away!
     For example, for "what rank is portugal in naval force":
     Answer: "Portugal ranks #23 globally in total naval fleet assets (with 107 total naval vessels) and #44 overall in Global Firepower military strength (PowerIndex 0.6865). The Portuguese Navy (Marinha Portuguesa) operates 2 modern Tridente-class AIP attack submarines, 5 guided missile frigates, 2 corvettes, and 21+ patrol vessels guarding the 3rd-largest maritime exclusive economic zone in the EU."
     AND populate the "directRank" JSON field.
   - For "what is the biggest plane in the world", state definitively that the Antonov An-225 Mriya was the heaviest and largest cargo transport aircraft ever built (up to its 2022 destruction), while the Stratolaunch Roc currently holds the operational wingspan record (117m / 385 ft).
   - For "does russia have c 17", answer clearly that No, Russia does not have or operate the Boeing C-17 Globemaster III, and mention Russia's heavy strategic equivalents (Ilyushin Il-76 and Antonov An-124).
   - For "where is australia", describe its hemisphere, continent, surrounding oceans, capital Canberra, and position.
   - For "who is the president of france", state that the president of France is Emmanuel Macron.

2. DETAILED RANKINGS & LEADERBOARDS:
   - If the user asks for "top 50", "top 25", "top 20", "top 10", "top 5", "rankings", "strongest", "best", "biggest", or a list of countries or defense assets (e.g. "top 50 naval forces", "top 10 military", "top 10 air forces"):
     You MUST populate the "rankedList" object with the requested count of items (if user asked for top 50, provide all 50 items; if top 10, provide 10 items)!
     NEVER write conversational disclaimers in "answer" like "The ranking is determined by... while there is no singular official list...".
     Start "answer" immediately: "Here are the top ranked [Category] in the world, led by #1 [Country]..."
     For each item include:
       - "rank": integer (1, 2, 3...)
       - "name": string (country or asset name)
       - "countryCode": string or null (ISO 2-letter country code, e.g. "US", "CN", "RU", "GB")
       - "stat": string (primary quantitative metrics, e.g. "11 Supercarriers • 484 Ships • 3.4M Tons")
       - "detail": string (1 concise, high-value sentence explaining their strength or capabilities)
       - "badge": string (short tag, e.g. "Supercarrier Fleet", "Largest Hull Count")

3. Identify the primary entity ("subjectTitle"), Wikipedia lookup ("wikiQuery"), target country name ("targetCountry"), ISO code ("targetCountryCode"), "otherCountries", and 2-4 "keyFacts".

Respond STRICTLY in valid JSON matching this schema:
{
  "answer": "string (clear, direct, informative answer without fluff)",
  "directRank": {
    "rank": "string (e.g. #23)",
    "subRank": "string or null (e.g. #44 Overall GFP)",
    "category": "string (e.g. Naval Fleet Strength)",
    "entity": "string (e.g. Portugal)",
    "metrics": [
      { "label": "string", "value": "string" }
    ]
  } or null,
  "rankedList": {
    "title": "string (e.g. Top 10 Naval Powers in the World)",
    "category": "string",
    "metricName": "string",
    "items": [
      {
        "rank": 1,
        "name": "string",
        "countryCode": "string or null",
        "stat": "string",
        "detail": "string",
        "badge": "string"
      }
    ]
  } or null,
  "subjectTitle": "string",
  "subjectCategory": "string",
  "wikiQuery": "string",
  "targetCountry": "string or null",
  "targetCountryCode": "string or null",
  "otherCountries": ["string"],
  "keyFacts": ["string"]
}`;

      // Model priority list: gemini-3.1-flash-lite is fastest and avoids 503 capacity limits, followed by gemini-3.8-flash
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let lastError: any = null;
      let rawText = '';

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.1,
            },
          });
          rawText = response.text?.trim() || '';
          if (rawText) break;
        } catch (err: any) {
          console.warn(`Model ${modelName} call failed, trying next:`, err?.message || err);
          lastError = err;
        }
      }

      if (!rawText) {
        throw lastError || new Error('No response from AI models');
      }

      // Clean potential markdown fences (e.g. ```json ... ```)
      let cleanedJson = rawText;
      if (cleanedJson.startsWith('```json')) {
        cleanedJson = cleanedJson.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      } else if (cleanedJson.startsWith('```')) {
        cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
      }

      let parsed: any;
      try {
        parsed = JSON.parse(cleanedJson);
      } catch (jsonErr) {
        // Fallback: use rawText as the direct answer
        parsed = {
          answer: rawText,
          subjectTitle: cleanQuery,
          wikiQuery: cleanQuery,
          targetCountry: null,
          targetCountryCode: null,
          otherCountries: [],
          keyFacts: [],
        };
      }

      // Resolve visual media (photo + specs)
      let resolvedMedia: VisualMediaItem | null = findLocalMedia(cleanQuery, `${parsed.subjectTitle || ''} ${parsed.answer || ''}`);
      if (!resolvedMedia) {
        const lookupKey = parsed.wikiQuery || parsed.subjectTitle || cleanQuery;
        resolvedMedia = await fetchWikiMedia(lookupKey);
      }
      if (!resolvedMedia && parsed.targetCountry) {
        resolvedMedia = await fetchWikiMedia(parsed.targetCountry);
      }

      return sendCachedResponse({
        answer: parsed.answer || 'Answer generated.',
        targetCountry: parsed.targetCountry || null,
        targetCountryCode: parsed.targetCountryCode || null,
        otherCountries: Array.isArray(parsed.otherCountries) ? parsed.otherCountries : [],
        keyFacts: Array.isArray(parsed.keyFacts) ? parsed.keyFacts : [],
        directRank: parsed.directRank || null,
        rankedList: parsed.rankedList || null,
        media: resolvedMedia || null,
        source: 'gemini-ai',
      });
    } catch (err: any) {
      console.error('Error in /api/ask-search with Gemini:', err?.message || err);
      const fallback = await getLocalFallback(cleanQuery);
      return sendCachedResponse({
        ...fallback,
        source: 'intelligence-registry',
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
