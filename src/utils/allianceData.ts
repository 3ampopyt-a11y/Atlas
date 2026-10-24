// Comprehensive Geopolitical & Military Alliance Registry
// Includes official alliance insignia/flags, mutual defense articles, and member state lists with ISO codes

export interface AllianceMember {
  code: string; // ISO 3166-1 alpha-2
  name: string;
}

export interface AllianceInfo {
  id: string;
  name: string;
  shortName: string;
  type: 'Mutual Defense' | 'Intelligence & Security' | 'Strategic Partnership' | 'Economic & Security' | 'Regional Security' | 'Non-Aligned';
  treatyArticle: string;
  description: string;
  emblemSvgType?: 'nato' | 'csto' | 'eu' | 'un' | 'five_eyes' | 'quad' | 'aukus' | 'asean' | 'gcc' | 'sco' | 'rio' | 'neutral';
  flagEmoji: string;
  accentColor: string; // Tailwind color classes
  members: AllianceMember[];
}

export const ALLIANCE_REGISTRY: Record<string, AllianceInfo> = {
  nato: {
    id: 'nato',
    name: 'North Atlantic Treaty Organization',
    shortName: 'NATO',
    type: 'Mutual Defense',
    treatyArticle: 'Article 5: Collective Self-Defense (An attack on one is an attack on all)',
    description: 'Intergovernmental military alliance between 32 North American and European nations committed to collective mutual defense and crisis prevention.',
    emblemSvgType: 'nato',
    flagEmoji: '🌐',
    accentColor: 'text-sky-400 bg-sky-500/15 border-sky-500/30',
    members: [
      { code: 'US', name: 'United States' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'FR', name: 'France' },
      { code: 'DE', name: 'Germany' },
      { code: 'CA', name: 'Canada' },
      { code: 'IT', name: 'Italy' },
      { code: 'TR', name: 'Turkey' },
      { code: 'PL', name: 'Poland' },
      { code: 'ES', name: 'Spain' },
      { code: 'NO', name: 'Norway' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'BE', name: 'Belgium' },
      { code: 'DK', name: 'Denmark' },
      { code: 'GR', name: 'Greece' },
      { code: 'PT', name: 'Portugal' },
      { code: 'CZ', name: 'Czech Republic' },
      { code: 'HU', name: 'Hungary' },
      { code: 'RO', name: 'Romania' },
      { code: 'SK', name: 'Slovakia' },
      { code: 'BG', name: 'Bulgaria' },
      { code: 'HR', name: 'Croatia' },
      { code: 'AL', name: 'Albania' },
      { code: 'EE', name: 'Estonia' },
      { code: 'LV', name: 'Latvia' },
      { code: 'LT', name: 'Lithuania' },
      { code: 'SI', name: 'Slovenia' },
      { code: 'ME', name: 'Montenegro' },
      { code: 'MK', name: 'North Macedonia' },
      { code: 'FI', name: 'Finland' },
      { code: 'SE', name: 'Sweden' },
      { code: 'IS', name: 'Iceland' },
      { code: 'LU', name: 'Luxembourg' },
    ],
  },
  csto: {
    id: 'csto',
    name: 'Collective Security Treaty Organization',
    shortName: 'CSTO',
    type: 'Mutual Defense',
    treatyArticle: 'Article 4: Collective Defense (Military assistance upon aggression against any party)',
    description: 'Eurasian intergovernmental military alliance between six post-Soviet states coordinating collective armed response and counter-terrorism.',
    emblemSvgType: 'csto',
    flagEmoji: '🛡️',
    accentColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    members: [
      { code: 'RU', name: 'Russia' },
      { code: 'BY', name: 'Belarus' },
      { code: 'KZ', name: 'Kazakhstan' },
      { code: 'KG', name: 'Kyrgyzstan' },
      { code: 'TJ', name: 'Tajikistan' },
      { code: 'AM', name: 'Armenia' },
    ],
  },
  five_eyes: {
    id: 'five_eyes',
    name: 'Five Eyes Intelligence Alliance (FVEY)',
    shortName: 'Five Eyes',
    type: 'Intelligence & Security',
    treatyArticle: 'UKUSA Agreement: Comprehensive Signal Intelligence & Global Cyber Sharing',
    description: 'Anglosphere multilateral intelligence alliance operating global signals intelligence, defense surveillance, and joint cyberspace protection.',
    emblemSvgType: 'five_eyes',
    flagEmoji: '👁️',
    accentColor: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30',
    members: [
      { code: 'US', name: 'United States' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
    ],
  },
  aukus: {
    id: 'aukus',
    name: 'AUKUS Security Partnership',
    shortName: 'AUKUS',
    type: 'Mutual Defense',
    treatyArticle: 'Trilateral Defense Technology & Nuclear-Powered Submarine Pact',
    description: 'Trilateral Indo-Pacific military pact advancing nuclear-powered conventionally-armed submarines, hypersonic missiles, and artificial intelligence.',
    emblemSvgType: 'aukus',
    flagEmoji: '⚓',
    accentColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
    members: [
      { code: 'AU', name: 'Australia' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'US', name: 'United States' },
    ],
  },
  quad: {
    id: 'quad',
    name: 'Quadrilateral Security Dialogue',
    shortName: 'The Quad',
    type: 'Strategic Partnership',
    treatyArticle: 'Free & Open Indo-Pacific Strategic Deterrence Framework',
    description: 'Strategic security dialogue and joint maritime deterrence operations across the Pacific and Indian oceans.',
    emblemSvgType: 'quad',
    flagEmoji: '🌊',
    accentColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    members: [
      { code: 'US', name: 'United States' },
      { code: 'JP', name: 'Japan' },
      { code: 'IN', name: 'India' },
      { code: 'AU', name: 'Australia' },
    ],
  },
  mnna: {
    id: 'mnna',
    name: 'Major Non-NATO Ally (US Strategic Defense)',
    shortName: 'Major Non-NATO Ally',
    type: 'Strategic Partnership',
    treatyArticle: 'US Title 10 USC 2350a: Priority Defense Equipment & Joint Counter-Warfare Access',
    description: 'Designation by the United States granting strategic military and financial advantages, priority surplus hardware, and cooperative training.',
    emblemSvgType: 'nato',
    flagEmoji: '⭐',
    accentColor: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
    members: [
      { code: 'JP', name: 'Japan' },
      { code: 'KR', name: 'South Korea' },
      { code: 'IL', name: 'Israel' },
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'EG', name: 'Egypt' },
      { code: 'JO', name: 'Jordan' },
      { code: 'KW', name: 'Kuwait' },
      { code: 'BH', name: 'Bahrain' },
      { code: 'QA', name: 'Qatar' },
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'AR', name: 'Argentina' },
      { code: 'BR', name: 'Brazil' },
      { code: 'CO', name: 'Colombia' },
      { code: 'PK', name: 'Pakistan' },
      { code: 'PH', name: 'Philippines' },
      { code: 'TH', name: 'Thailand' },
      { code: 'TN', name: 'Tunisia' },
      { code: 'MA', name: 'Morocco' },
    ],
  },
  rio_pact: {
    id: 'rio_pact',
    name: 'Inter-American Treaty of Reciprocal Assistance (Rio Pact)',
    shortName: 'Rio Pact (TIAR)',
    type: 'Mutual Defense',
    treatyArticle: 'Article 3: Hemispheric Defense (An attack against one American State is an attack against all)',
    description: 'Hemispheric mutual defense agreement among American states signed in Rio de Janeiro for reciprocal continental defense.',
    emblemSvgType: 'rio',
    flagEmoji: '🌎',
    accentColor: 'text-teal-400 bg-teal-500/15 border-teal-500/30',
    members: [
      { code: 'US', name: 'United States' },
      { code: 'AR', name: 'Argentina' },
      { code: 'BR', name: 'Brazil' },
      { code: 'CL', name: 'Chile' },
      { code: 'CO', name: 'Colombia' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'DO', name: 'Dominican Republic' },
      { code: 'SV', name: 'El Salvador' },
      { code: 'GT', name: 'Guatemala' },
      { code: 'HT', name: 'Haiti' },
      { code: 'HN', name: 'Honduras' },
      { code: 'PA', name: 'Panama' },
      { code: 'PY', name: 'Paraguay' },
      { code: 'PE', name: 'Peru' },
      { code: 'UY', name: 'Uruguay' },
      { code: 'BS', name: 'Bahamas' },
    ],
  },
  sco: {
    id: 'sco',
    name: 'Shanghai Cooperation Organisation',
    shortName: 'SCO',
    type: 'Regional Security',
    treatyArticle: 'Regional Anti-Terrorist Structure (RATS) & Military Maneuvers',
    description: 'Eurasian political, economic, and defense organization focusing on counter-terrorism, border defense, and joint military Peace Mission drills.',
    emblemSvgType: 'sco',
    flagEmoji: '🤝',
    accentColor: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
    members: [
      { code: 'CN', name: 'China' },
      { code: 'RU', name: 'Russia' },
      { code: 'IN', name: 'India' },
      { code: 'PK', name: 'Pakistan' },
      { code: 'KZ', name: 'Kazakhstan' },
      { code: 'KG', name: 'Kyrgyzstan' },
      { code: 'TJ', name: 'Tajikistan' },
      { code: 'UZ', name: 'Uzbekistan' },
      { code: 'IR', name: 'Iran' },
      { code: 'BY', name: 'Belarus' },
    ],
  },
  eu: {
    id: 'eu',
    name: 'European Union Common Security and Defence Policy (CSDP)',
    shortName: 'European Union',
    type: 'Mutual Defense',
    treatyArticle: 'Treaty on European Union Article 42.7: Mutual Defence Clause',
    description: '27-nation economic and political union with a binding mutual defense commitment if an EU member state is victim of armed aggression.',
    emblemSvgType: 'eu',
    flagEmoji: '🇪🇺',
    accentColor: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
    members: [
      { code: 'FR', name: 'France' },
      { code: 'DE', name: 'Germany' },
      { code: 'IT', name: 'Italy' },
      { code: 'ES', name: 'Spain' },
      { code: 'PL', name: 'Poland' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'BE', name: 'Belgium' },
      { code: 'SE', name: 'Sweden' },
      { code: 'AT', name: 'Austria' },
      { code: 'IE', name: 'Ireland' },
      { code: 'DK', name: 'Denmark' },
      { code: 'FI', name: 'Finland' },
      { code: 'PT', name: 'Portugal' },
      { code: 'GR', name: 'Greece' },
      { code: 'CZ', name: 'Czech Republic' },
      { code: 'RO', name: 'Romania' },
      { code: 'HU', name: 'Hungary' },
      { code: 'SK', name: 'Slovakia' },
      { code: 'BG', name: 'Bulgaria' },
      { code: 'HR', name: 'Croatia' },
      { code: 'SI', name: 'Slovenia' },
      { code: 'LT', name: 'Lithuania' },
      { code: 'LV', name: 'Latvia' },
      { code: 'EE', name: 'Estonia' },
      { code: 'CY', name: 'Cyprus' },
      { code: 'LU', name: 'Luxembourg' },
      { code: 'MT', name: 'Malta' },
    ],
  },
  gcc: {
    id: 'gcc',
    name: 'Gulf Cooperation Council (Peninsula Shield Force)',
    shortName: 'GCC',
    type: 'Mutual Defense',
    treatyArticle: 'GCC Joint Defense Agreement: Unified military intervention against Gulf threats',
    description: 'Regional intergovernmental military and political alliance of Arab states bordering the Persian Gulf.',
    emblemSvgType: 'gcc',
    flagEmoji: '🕌',
    accentColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    members: [
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'AE', name: 'United Arab Emirates' },
      { code: 'QA', name: 'Qatar' },
      { code: 'KW', name: 'Kuwait' },
      { code: 'BH', name: 'Bahrain' },
      { code: 'OM', name: 'Oman' },
    ],
  },
  asean: {
    id: 'asean',
    name: 'Association of Southeast Asian Nations (ADMM+)',
    shortName: 'ASEAN',
    type: 'Regional Security',
    treatyArticle: 'Treaty of Amity and Cooperation in Southeast Asia (TAC)',
    description: 'Political and security community promoting non-interference, peaceful dispute resolution, and regional maritime cooperation.',
    emblemSvgType: 'asean',
    flagEmoji: '🌴',
    accentColor: 'text-red-400 bg-red-500/15 border-red-500/30',
    members: [
      { code: 'ID', name: 'Indonesia' },
      { code: 'MY', name: 'Malaysia' },
      { code: 'SG', name: 'Singapore' },
      { code: 'TH', name: 'Thailand' },
      { code: 'PH', name: 'Philippines' },
      { code: 'VN', name: 'Vietnam' },
      { code: 'MM', name: 'Myanmar' },
      { code: 'KH', name: 'Cambodia' },
      { code: 'LA', name: 'Laos' },
      { code: 'BN', name: 'Brunei' },
    ],
  },
  anzus: {
    id: 'anzus',
    name: 'Australia, New Zealand, United States Security Treaty (ANZUS)',
    shortName: 'ANZUS',
    type: 'Mutual Defense',
    treatyArticle: 'Article IV: Action to Meet Common Danger in the Pacific Area',
    description: 'Collective security agreement binding Australia and the United States, and separately Australia and New Zealand, to cooperate on military matters in the Pacific.',
    emblemSvgType: 'nato',
    flagEmoji: '🦘',
    accentColor: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
    members: [
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
      { code: 'US', name: 'United States' },
    ],
  },
  neutral: {
    id: 'neutral',
    name: 'Officially Neutral / Non-Aligned Sovereign State',
    shortName: 'Neutral / Non-Aligned',
    type: 'Non-Aligned',
    treatyArticle: 'Hague Convention V (1907) / Constitutional Permanent Neutrality',
    description: 'Sovereign nation with constitutional or international treaty obligations prohibiting participation in military alliances, stationing of foreign troops, and offensive warfare.',
    emblemSvgType: 'neutral',
    flagEmoji: '🕊️',
    accentColor: 'text-slate-300 bg-slate-500/15 border-slate-500/30',
    members: [
      { code: 'CH', name: 'Switzerland' },
      { code: 'AT', name: 'Austria' },
      { code: 'IE', name: 'Ireland' },
      { code: 'MT', name: 'Malta' },
      { code: 'TM', name: 'Turkmenistan' },
      { code: 'VA', name: 'Vatican City' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'SM', name: 'San Marino' },
      { code: 'LI', name: 'Liechtenstein' },
    ],
  },
};

/**
 * Returns all verified alliances a country is a member of,
 * along with treaty specifics, insignia, and fellow member flags.
 */
export function getCountryAlliances(countryCodeOrName: string): AllianceInfo[] {
  const code = (countryCodeOrName || '').toUpperCase().trim();
  const name = (countryCodeOrName || '').toLowerCase().trim();

  const matched: AllianceInfo[] = [];

  for (const alliance of Object.values(ALLIANCE_REGISTRY)) {
    const isMember = alliance.members.some(
      (m) => m.code === code || m.name.toLowerCase() === name
    );
    if (isMember) {
      matched.push(alliance);
    }
  }

  // If no military alliance found, check if explicitly neutral or non-aligned
  if (matched.length === 0) {
    const isNeutral = ALLIANCE_REGISTRY.neutral.members.some(
      (m) => m.code === code || m.name.toLowerCase() === name
    );
    if (isNeutral) {
      matched.push(ALLIANCE_REGISTRY.neutral);
    }
  }

  return matched;
}

// Entries that borrow another country's ISO code (Siachen Glacier uses India's), so must not inherit its alliances
export const SHARED_ISO_ENTRIES = new Set(['Somaliland', 'N. Cyprus', 'Indian Ocean Ter.', 'Siachen Glacier']);

export function getAlliancesFor(country: { id: string; code: string; name: string }): AllianceInfo[] {
  return SHARED_ISO_ENTRIES.has(country.id) ? [] : getCountryAlliances(country.code || country.name);
}

/**
 * Check if a country has any military alliance
 */
export function hasMilitaryAlliance(countryCodeOrName: string): boolean {
  const alliances = getCountryAlliances(countryCodeOrName);
  return alliances.some((a) => a.type === 'Mutual Defense' || a.type === 'Intelligence & Security');
}
