import { geoArea } from 'd3-geo';
import * as topojson from 'topojson-client';
import { presimplify, quantile, simplify } from 'topojson-simplify';
import type { Topology } from 'topojson-specification';
// @ts-ignore
import worldAtlas50 from 'world-atlas/countries-50m.json';
// @ts-ignore
import worldAtlas110 from 'world-atlas/countries-110m.json';

const topology50 = worldAtlas50 as unknown as Topology;
const topology110 = worldAtlas110 as unknown as Topology;

export interface GeoFeature {
  type: string;
  id: string;
  properties: {
    name: string;
  };
  geometry: any;
}

export const worldFeatures50 = (topojson.feature(topology50, (topology50.objects as any).countries) as any).features as GeoFeature[];
export const worldBorders50 = topojson.mesh(topology50, (topology50.objects as any).countries, (a, b) => a !== b);

export const worldFeatures110 = (topojson.feature(topology110, (topology110.objects as any).countries) as any).features as GeoFeature[];
export const worldBorders110 = topojson.mesh(topology110, (topology110.objects as any).countries, (a, b) => a !== b);

// Lightweight 50m geometry used while the globe is moving (drag, spin, zoom).
// Keeps ~12% of the vertices, which projects ~6x faster than the full 50m set,
// while still containing every country (unlike the 110m atlas).
const LITE_POINT_FRACTION = 0.12;
const presimplified50 = presimplify(topology50 as any);
const topologyLite = simplify(presimplified50, quantile(presimplified50, LITE_POINT_FRACTION));

// A simplified polygon is only safe to draw if it still roughly matches the original.
// Simplification can squash tiny islands into near-zero-area slivers; d3's globe clipping
// then misreads them as covering the whole visible hemisphere for some rotations, which
// flashed a country's flag (or colour) across the entire globe mid-drag.
const isUsablePolygon = (simplified: any, original: any) => {
  if (!Array.isArray(simplified?.[0]) || simplified[0].length < 4) return false;
  const simplifiedArea = geoArea({ type: 'Polygon', coordinates: simplified } as any);
  const originalArea = geoArea({ type: 'Polygon', coordinates: original } as any);
  if (!(originalArea > 0)) return true;
  const ratio = simplifiedArea / originalArea;
  return ratio > 0.5 && ratio < 2;
};

// Restore any unusable polygon from the full-detail geometry, so no country disappears or
// glitches mid-rotation. Feature order matches worldFeatures50 index-for-index.
export const worldFeaturesLite = ((topojson.feature(topologyLite as any, (topologyLite.objects as any).countries) as any).features as GeoFeature[]).map(
  (feature, idx) => {
    const original = worldFeatures50[idx];
    if (original.geometry?.type === 'MultiPolygon') {
      return {
        ...feature,
        geometry: {
          type: 'MultiPolygon',
          coordinates: original.geometry.coordinates.map((polygon: any, polyIdx: number) => {
            const simplified = feature.geometry?.coordinates?.[polyIdx];
            return isUsablePolygon(simplified, polygon) ? simplified : polygon;
          }),
        },
      };
    }
    if (original.geometry?.type === 'Polygon' && !isUsablePolygon(feature.geometry?.coordinates, original.geometry.coordinates)) {
      return original;
    }
    return feature;
  }
);
export const worldBordersLite = topojson.mesh(topologyLite as any, (topologyLite.objects as any).countries, (a, b) => a !== b);
