import { geoCentroid } from 'd3-geo';
import { worldFeatures50, GeoFeature } from '../data/worldMapData.ts';
import { getCountryById, getCountryByName } from '../data/countriesData.ts';
import { CountryData } from '../types.ts';

export interface CountryMapPoint {
  id: string;
  uniqueKey: string;
  name: string;
  centroid: [number, number]; // [lng, lat]
  countryData: CountryData | undefined;
  feature: GeoFeature;
}

// Precompute centroids once at module load
export const countryMapPoints: CountryMapPoint[] = worldFeatures50.map((feature, idx) => {
  let centroid: [number, number] = [0, 0];
  try {
    const c = geoCentroid(feature as any);
    if (!isNaN(c[0]) && !isNaN(c[1])) {
      centroid = c;
    }
  } catch (err) {
    centroid = [0, 0];
  }

  const countryData = getCountryById(feature.id) || getCountryByName(feature.properties?.name);

  // If country data has manual coordinates that are non-zero, fallback/prefer for small islands
  if (countryData && (countryData.coordinates[0] !== 0 || countryData.coordinates[1] !== 0)) {
    // If the centroid is far off or 0,0, use countryData.coordinates
    if (centroid[0] === 0 && centroid[1] === 0) {
      centroid = countryData.coordinates;
    }
  }

  return {
    id: feature.id,
    uniqueKey: `${feature.id || 'f'}-${idx}`,
    name: feature.properties?.name || countryData?.name || 'Unknown',
    centroid,
    countryData,
    feature,
  };
});

// Helper to determine if a point [lng, lat] is on the front facing hemisphere of an orthographic globe
export function isCoordOnFrontHemisphere(
  coords: [number, number],
  rotation: { yaw: number; pitch: number }
): boolean {
  const lambda = (coords[0] * Math.PI) / 180;
  const phi = (coords[1] * Math.PI) / 180;
  const r0 = (-rotation.yaw * Math.PI) / 180;
  const r1 = (-rotation.pitch * Math.PI) / 180;

  // Dot product in spherical coordinates
  const cosDistance = Math.sin(r1) * Math.sin(phi) + Math.cos(r1) * Math.cos(phi) * Math.cos(lambda - r0);
  // Give a small margin (0.02) so items near the very horizon edge don't clip harshly
  return cosDistance > 0.05;
}
