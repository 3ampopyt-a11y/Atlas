import * as topojson from 'topojson-client';
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
