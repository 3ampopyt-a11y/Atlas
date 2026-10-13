import React, { useState } from 'react';
import { MapMetricMode } from '../types.ts';
import {
  Flag,
  Swords,
  CloudSun,
  Activity,
  Mountain,
  Palmtree,
  Shield,
  Clock,
  DollarSign,
  Users,
  Compass,
  Award,
  Maximize2,
  ChevronDown,
  Layers,
  Flame,
  Waves,
  Sparkles,
} from 'lucide-react';
import { CLIMATE_ZONES } from '../data/climateData.ts';

interface MetricLegendProps {
  metricMode: MapMetricMode;
  onChangeMetric: (mode: MapMetricMode) => void;
}

interface ModeTab {
  id: MapMetricMode;
  label: string;
  badge?: string;
  icon: React.ReactNode;
  description: string;
}

const PRIMARY_MODES: ModeTab[] = [
  {
    id: 'flags',
    label: 'Flags & Countries',
    badge: 'DEFAULT',
    icon: <Flag className="w-4 h-4 text-cyan-400" />,
    description: 'National flags and sovereign titles directly mapped on countries',
  },
  {
    id: 'war',
    label: 'War & Troops',
    badge: 'TACTICAL',
    icon: <Swords className="w-4 h-4 text-red-400" />,
    description: 'Active combat troops, nuclear arsenals, flashpoints & military readiness',
  },
  {
    id: 'climate',
    label: 'Climate Zones',
    icon: <CloudSun className="w-4 h-4 text-emerald-400" />,
    description: 'Köppen climate classification from Polar to Tropical Rainforest',
  },
  {
    id: 'tectonic',
    label: 'Tectonic Plates',
    icon: <Activity className="w-4 h-4 text-amber-400" />,
    description: 'Crustal plates, Ring of Fire, fault lines & active volcanoes',
  },
  {
    id: 'altitude',
    label: 'Altitudes & Peaks',
    icon: <Mountain className="w-4 h-4 text-indigo-400" />,
    description: 'Topographic elevation, Seven Summits & deep ocean trenches',
  },
  {
    id: 'biomes',
    label: 'Biomes (Desert & Ocean)',
    icon: <Palmtree className="w-4 h-4 text-yellow-400" />,
    description: 'Earth’s major deserts, oceans, seas, rainforests and coral reefs',
  },
];

const ANALYTICAL_MODES: ModeTab[] = [
  {
    id: 'longevity',
    label: 'Longevity (Years Alive)',
    icon: <Clock className="w-4 h-4 text-emerald-400" />,
    description: 'Age of sovereign continuity from ancient dynasties to modern states',
  },
  {
    id: 'militaryRank',
    label: 'Military Rank (GFP)',
    icon: <Award className="w-4 h-4 text-orange-400" />,
    description: 'Global Firepower Index rank and combat tiers',
  },
  {
    id: 'defenseBudget',
    label: 'Defense Budget',
    icon: <DollarSign className="w-4 h-4 text-amber-400" />,
    description: 'Annual defense spending in USD billions',
  },
  {
    id: 'activePersonnel',
    label: 'Active Military Troops',
    icon: <Shield className="w-4 h-4 text-red-400" />,
    description: 'Standing military personnel by country',
  },
  {
    id: 'population',
    label: 'Population',
    icon: <Users className="w-4 h-4 text-blue-400" />,
    description: 'Total population distribution across nations',
  },
  {
    id: 'area',
    label: 'Land Territory',
    icon: <Maximize2 className="w-4 h-4 text-teal-400" />,
    description: 'Total surface area in square kilometers',
  },
  {
    id: 'political',
    label: 'Geopolitical',
    icon: <Compass className="w-4 h-4 text-sky-400" />,
    description: 'Standard continental political boundaries',
  },
];

export const MetricLegend: React.FC<MetricLegendProps> = ({ metricMode, onChangeMetric }) => {
  const [showMoreAnalytics, setShowMoreAnalytics] = useState(false);

  const isAnalyticalActive = ANALYTICAL_MODES.some((m) => m.id === metricMode);

  return (
    <div
      id="metric-legend-container"
      className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-2xl text-xs max-w-lg w-full"
    >
      {/* Primary Modes Header Switcher */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {PRIMARY_MODES.map((opt) => {
          const isActive = metricMode === opt.id;
          return (
            <button
              key={opt.id}
              id={`btn-metric-${opt.id}`}
              onClick={() => onChangeMetric(opt.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm ring-1 ring-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="font-semibold text-xs">{opt.label}</span>
              {opt.badge && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                    isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Toggle More Analytics Button */}
        <button
          onClick={() => setShowMoreAnalytics((prev) => !prev)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            isAnalyticalActive || showMoreAnalytics
              ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-800/40 border-slate-700/50'
          }`}
          title="Toggle Statistical & Analytical Metrics"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>More Metrics</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform ${showMoreAnalytics ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expanded Secondary Analytics Row */}
      {showMoreAnalytics && (
        <div className="flex items-center gap-1 overflow-x-auto py-2 border-b border-slate-800 scrollbar-none bg-slate-950/40 px-1 rounded-lg mt-1.5">
          {ANALYTICAL_MODES.map((opt) => {
            const isActive = metricMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChangeMetric(opt.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mode-Specific Explanations & Visual Color Legend */}
      <div className="pt-2">
        {/* 1. FLAGS & COUNTRIES (DEFAULT) */}
        {metricMode === 'flags' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="flex items-center gap-1 font-bold text-cyan-300">
                  <Flag className="w-3.5 h-3.5 text-cyan-400" /> Flag Map of the World
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Every country is rendered with its official national flag</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono font-bold">240+ National Flags</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
              <span>🚩 Country landmasses are shaped with their national flags. Click any nation for intelligence dossier.</span>
              <span className="text-slate-500 font-mono hidden sm:inline">Toolbar: Toggle Flag Fill &amp; Labels</span>
            </div>
          </div>
        )}

        {/* 2. WAR & MILITARY READINESS (TROOPS) */}
        {metricMode === 'war' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-red-400 flex items-center gap-1">
                <Swords className="w-3.5 h-3.5" /> War & Troop Deployment Mode
              </span>
              <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-400" /> Active Conflict Hotspots On Map
              </span>
            </div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 via-purple-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-300 font-mono">
              <span className="text-red-400 font-bold">&gt;1M Troops (US, RU, CN, IN, KP)</span>
              <span className="text-orange-400 font-semibold">400k–1M Troops</span>
              <span className="text-yellow-400 font-semibold">150k–400k</span>
              <span className="text-purple-400">☢️ Nuclear States</span>
              <span className="text-slate-400">&lt;50k Neutral</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-3 pt-0.5">
              <span>🎯 Radar rings = Active hotspots (Ukraine, Taiwan Strait, Red Sea)</span>
              <span>• Click hotspot for tactical briefing</span>
            </div>
          </div>
        )}

        {/* 3. CLIMATE ZONES */}
        {metricMode === 'climate' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CloudSun className="w-3.5 h-3.5" /> Köppen Climate Classification
              </span>
              <span className="text-[10px] text-slate-400">Click country to view rainfall & temp</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-[10px] text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#e0f2fe]" /> Polar / Ice
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#38bdf8]" /> Boreal Taiga
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#10b981]" /> Temperate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#84cc16]" /> Mediterranean
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#059669]" /> Subtropical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#065f46]" /> Rainforest
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#eab308]" /> Savanna
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#f97316]" /> Arid Desert
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#d97706]" /> Steppe
              </span>
            </div>
          </div>
        )}

        {/* 4. TECTONIC PLATES */}
        {metricMode === 'tectonic' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> Crustal Plates & Fault Lines
              </span>
              <span className="text-[10px] text-slate-400">Drift vectors in mm/year</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-300 pt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 rounded bg-[#ef4444]" /> Convergent / Subduction (Ring of Fire)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 rounded bg-[#06b6d4]" /> Divergent (Mid-Atlantic Ridge)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-1 rounded bg-[#f59e0b]" /> Transform (San Andreas)
              </span>
              <span className="flex items-center gap-1 text-rose-300">
                🌋 Active Volcanic / Seismic Hotspots
              </span>
            </div>
          </div>
        )}

        {/* 5. ALTITUDES & MOUNTAIN PEAKS */}
        {metricMode === 'altitude' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-indigo-400 flex items-center gap-1">
                <Mountain className="w-3.5 h-3.5" /> Topographic Elevation (Hypsometric)
              </span>
              <span className="text-[10px] text-slate-300 font-mono">Seven Summits & Trenches</span>
            </div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-teal-600 via-emerald-500 via-lime-500 via-amber-500 via-orange-600 to-slate-200" />
            <div className="flex justify-between text-[10px] text-slate-300 font-mono">
              <span className="text-teal-400">0–200m Plains</span>
              <span className="text-emerald-400">500m Hills</span>
              <span className="text-amber-400">1,500m Uplands</span>
              <span className="text-orange-400">3,000–5,000m Ranges</span>
              <span className="text-slate-100 font-bold">&gt;7,000m Alpine Peaks</span>
            </div>
            <div className="text-[10px] text-slate-400">
              🏔️ Click mountain markers for elevation, prominence & mountain range details
            </div>
          </div>
        )}

        {/* 6. BIOMES (DESERT & OCEAN) */}
        {metricMode === 'biomes' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-yellow-400 flex items-center gap-1">
                <Palmtree className="w-3.5 h-3.5" /> World Biomes: Deserts, Oceans & Forests
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Ecosystem Mapping</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-slate-300 pt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#f59e0b]" /> 🏜️ Sahara & Gobi Deserts
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#0284c7]" /> 🌊 Pacific & Atlantic Oceans
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#059669]" /> 🌴 Amazon & Congo Rainforests
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#14b8a6]" /> 🪸 Coral Reefs & Marine Biomes
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Click desert, ocean, or rainforest badges on the globe to inspect area, depth & wildlife species.
            </div>
          </div>
        )}

        {/* ANALYTICAL METRICS LEGENDS */}
        {metricMode === 'political' && (
          <div className="flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" /> N. America
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" /> S. America
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" /> Europe
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fb923c]" /> Asia
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" /> Africa
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6]" /> Oceania
            </span>
          </div>
        )}

        {metricMode === 'militaryRank' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 via-purple-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-red-400 font-semibold">Tier 1 Superpower (#1–3)</span>
              <span className="text-amber-400 font-semibold">Top 10–25</span>
              <span className="text-purple-400 font-semibold">Top 50</span>
              <span className="text-slate-400">Regional / Neutral</span>
            </div>
          </div>
        )}

        {metricMode === 'longevity' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 via-sky-500 via-indigo-500 to-rose-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-emerald-400 font-semibold">2,000+ yrs (Ancient)</span>
              <span className="text-teal-400 font-semibold">1,000+ yrs</span>
              <span className="text-sky-400 font-semibold">500+ yrs</span>
              <span className="text-indigo-400 font-semibold">200+ yrs</span>
              <span className="text-rose-400">&lt;100 yrs</span>
            </div>
          </div>
        )}

        {metricMode === 'defenseBudget' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-red-400 font-semibold">&gt;$200B USD (US, China)</span>
              <span className="text-amber-400 font-semibold">$50B–$100B</span>
              <span className="text-yellow-400 font-semibold">$10B–$40B</span>
              <span className="text-slate-400">&lt;$2B</span>
            </div>
          </div>
        )}

        {metricMode === 'activePersonnel' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-red-400 font-semibold">&gt;1,000,000 Active Troops</span>
              <span className="text-amber-400 font-semibold">400,000+</span>
              <span className="text-yellow-400 font-semibold">150,000+</span>
              <span className="text-slate-400">&lt;50,000</span>
            </div>
          </div>
        )}

        {metricMode === 'population' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-600 via-orange-500 via-yellow-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-red-400 font-semibold">&gt;1 Billion (IN, CN)</span>
              <span className="text-amber-400 font-semibold">100M+</span>
              <span className="text-yellow-400 font-semibold">40M+</span>
              <span className="text-slate-400">&lt;10M</span>
            </div>
          </div>
        )}

        {metricMode === 'area' && (
          <div>
            <div className="h-2 rounded-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 via-sky-500 to-slate-700" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span className="text-emerald-400 font-semibold">&gt;5,000,000 km²</span>
              <span className="text-teal-400 font-semibold">1.5M+ km²</span>
              <span className="text-sky-400 font-semibold">500,000 km²</span>
              <span className="text-slate-400">&lt;100,000 km²</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
