// Places that borrow another country's ISO code (see SHARED_ISO_ENTRIES) but fly their own flag
const OWN_FLAG_URLS: Record<string, string> = {
  Somaliland: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Somaliland.svg',
  'N. Cyprus': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Flag_of_the_Turkish_Republic_of_Northern_Cyprus.svg',
  // Christmas Island and the Cocos (Keeling) Islands officially fly Australia's flag
  'Indian Ocean Ter.': 'https://flagcdn.com/w320/au.png',
};

export const OWN_FLAG_NAMES = Object.keys(OWN_FLAG_URLS);

export const getOwnFlagUrl = (countryName?: string): string | undefined =>
  countryName ? OWN_FLAG_URLS[countryName] : undefined;

// SVG pattern id for a place's own flag on the map
export const ownFlagPatternId = (countryName: string) => `flag-pat-own-${countryName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
