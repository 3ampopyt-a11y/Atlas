import React from 'react';
import { X, ExternalLink, ShieldAlert, Mountain, Activity, Palmtree, Compass, AlertTriangle, Waves } from 'lucide-react';
import { MilitaryHotspot } from '../data/warData.ts';
import { MountainPeak, DepressionPoint } from '../data/altitudeData.ts';
import { TectonicPlate, FaultLine, SeismicHotspot } from '../data/tectonicData.ts';
import { BiomeFeature } from '../data/biomesData.ts';

export type SelectedMapFeature =
  | { type: 'hotspot'; data: MilitaryHotspot }
  | { type: 'peak'; data: MountainPeak }
  | { type: 'depression'; data: DepressionPoint }
  | { type: 'tectonic-plate'; data: TectonicPlate }
  | { type: 'fault-line'; data: FaultLine }
  | { type: 'seismic'; data: SeismicHotspot }
  | { type: 'biome'; data: BiomeFeature };

interface FeatureDetailModalProps {
  feature: SelectedMapFeature | null;
  onClose: () => void;
}

export const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({ feature, onClose }) => {
  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-slate-100 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Close Feature Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. MILITARY HOTSPOT BRIEFING */}
        {feature.type === 'hotspot' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-400 font-bold">
                  MILITARY FLASHPOINT BRIEFING • {feature.data.region}
                </span>
                <h3 className="text-lg font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                  feature.data.threatLevel === 'Critical'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                ⚠️ Threat Level: {feature.data.threatLevel}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Coordinates: {feature.data.coordinates[1].toFixed(2)}°N, {feature.data.coordinates[0].toFixed(2)}°E
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400">Primary Forces Involved:</div>
              <div className="flex flex-wrap gap-1.5">
                {feature.data.primaryForces.map((force, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium"
                  >
                    ⚔️ {force}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/30 p-3 rounded-2xl">
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                Deployed Combat Assets & Systems:
              </div>
              <div className="text-xs text-slate-300 font-mono">{feature.data.keyAssets}</div>
            </div>
          </div>
        )}

        {/* 2. MOUNTAIN PEAK */}
        {feature.type === 'peak' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Mountain className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 font-bold">
                  GLOBAL SUMMIT SURVEY • {feature.data.range}
                </span>
                <h3 className="text-lg font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Metric Elevation</div>
                <div className="text-xl font-bold text-cyan-300 font-mono">
                  {feature.data.elevationM.toLocaleString()} m
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Imperial Elevation</div>
                <div className="text-xl font-bold text-amber-300 font-mono">
                  {feature.data.elevationFt.toLocaleString()} ft
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-medium">
                Country: {feature.data.country}
              </span>
              {feature.data.isSevenSummit && (
                <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⭐ Seven Summit
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.notes}
            </p>
          </div>
        )}

        {/* 3. OCEAN DEPRESSION */}
        {feature.type === 'depression' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Waves className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
                  DEEP OCEAN & LAND DEPRESSION
                </span>
                <h3 className="text-lg font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Depth (Meters)</div>
                <div className="text-xl font-bold text-cyan-400 font-mono">
                  {feature.data.elevationM.toLocaleString()} m
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Depth (Feet)</div>
                <div className="text-xl font-bold text-cyan-200 font-mono">
                  {feature.data.elevationFt.toLocaleString()} ft
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.notes}
            </p>
          </div>
        )}

        {/* 4. TECTONIC PLATE */}
        {feature.type === 'tectonic-plate' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="p-2.5 rounded-2xl text-xl border flex items-center justify-center"
                style={{ backgroundColor: `${feature.data.color}20`, borderColor: `${feature.data.color}50` }}
              >
                🌋
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
                    {feature.data.type} Tectonic Plate • {feature.data.lithosphereType} Crust
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-semibold">
                    {feature.data.percentageEarthSurface}% of Earth
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-center">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Surface Area</div>
                <div className="text-lg font-bold text-amber-300 font-mono">
                  {feature.data.areaMkm2}M km²
                </div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Drift Velocity</div>
                <div className="text-lg font-bold text-cyan-300 font-mono flex items-center justify-center gap-1">
                  <span>{feature.data.driftVector?.arrow || '↗'}</span>
                  <span>{feature.data.driftSpeedMmYr} mm/yr</span>
                </div>
                <div className="text-[10px] text-slate-400">{feature.data.driftDirection}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            {feature.data.majorFeatures && feature.data.majorFeatures.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Key Geological Features:</div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.data.majorFeatures.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700/60 text-xs text-slate-200">
                      • {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {feature.data.adjacentPlates && feature.data.adjacentPlates.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Bordering Tectonic Plates:</div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.data.adjacentPlates.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200">
                      ⚡ {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {feature.data.majorEarthquakes && feature.data.majorEarthquakes.length > 0 && (
              <div className="p-3 rounded-2xl bg-red-950/20 border border-red-900/30 text-xs text-red-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-red-400 block">Historic Megathrust Events:</span>
                <div>{feature.data.majorEarthquakes.join(' • ')}</div>
              </div>
            )}
          </div>
        )}

        {/* 4b. FAULT LINE */}
        {feature.type === 'fault-line' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="p-2.5 rounded-2xl text-xl border flex items-center justify-center"
                style={{ backgroundColor: `${feature.data.color}20`, borderColor: `${feature.data.color}50` }}
              >
                ⚡
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold" style={{ color: feature.data.color }}>
                    {feature.data.type} Plate Boundary
                  </span>
                  {feature.data.isRingOfFire && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/40">
                      🔥 Ring of Fire
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            {feature.data.speed && (
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Relative Motion Rate</div>
                <div className="text-lg font-bold font-mono" style={{ color: feature.data.color }}>
                  {feature.data.speed}
                </div>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            {feature.data.notableFeatures && (
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
                <span className="font-bold text-slate-400 block text-[10px] uppercase font-mono mb-1">Notable Trenches & Features:</span>
                <div>{feature.data.notableFeatures}</div>
              </div>
            )}
          </div>
        )}

        {/* 5. SEISMIC HOTSPOT */}
        {feature.type === 'seismic' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xl flex items-center justify-center">
                🌋
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold">
                  SEISMIC & VOLCANIC HOTSPOT • {feature.data.type}
                </span>
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                ⚠️ Seismic Intensity: {feature.data.intensity}
              </span>
              {feature.data.elevationOrDepth && (
                <span className="text-xs text-slate-400 font-mono bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                  {feature.data.elevationOrDepth}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.details}
            </p>

            {feature.data.notableEvent && (
              <div className="bg-rose-950/20 border border-rose-900/30 p-3 rounded-2xl text-xs text-rose-200">
                <span className="font-bold text-rose-400 uppercase text-[10px] block mb-1">Historic Significance:</span>
                {feature.data.notableEvent}
              </div>
            )}
          </div>
        )}

        {/* 6. BIOME (DESERT, OCEAN, RAINFOREST) */}
        {feature.type === 'biome' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700">
                {feature.data.icon}
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-yellow-400 font-bold">
                  PLANETARY BIOME • {feature.data.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100">{feature.data.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              {feature.data.areaKm2 && (
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Surface Area</div>
                  <div className="text-lg font-bold text-yellow-300 font-mono">
                    {feature.data.areaKm2.toLocaleString()} km²
                  </div>
                </div>
              )}
              {feature.data.depthM && (
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Average Depth</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono">
                    {feature.data.depthM.toLocaleString()} m
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-300">
              <span className="font-semibold text-slate-400">Climate Zone: </span>
              <span className="text-emerald-300 font-medium">{feature.data.climateZone}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            {feature.data.keySpecies && feature.data.keySpecies.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Key Endemic & Characteristic Wildlife Species:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.data.keySpecies.map((species, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
                    >
                      🌿 {species}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Dismiss Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
