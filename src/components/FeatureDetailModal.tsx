import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Mountain,
  Activity,
  Palmtree,
  Waves,
  Swords,
  Users,
  Crosshair,
  History,
  Radio,
  Globe,
  Skull,
  MapPin,
  Flame,
  AlertTriangle,
} from 'lucide-react';
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

  const isHotspot = feature.type === 'hotspot';
  const [activeTab, setActiveTab] = useState<'overview' | 'troops' | 'context'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`relative w-full ${
          isHotspot ? 'max-w-3xl max-h-[92vh]' : 'max-w-lg max-h-[90vh]'
        } bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 overflow-y-auto custom-scrollbar`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            isHotspot
              ? 'bg-gradient-to-r from-red-500 via-amber-500 to-rose-600'
              : 'bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500'
          }`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
          title="Close Feature Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===================================================================== */}
        {/* 1. MILITARY HOTSPOT / WAR & TROOPS BRIEFING                            */}
        {/* ===================================================================== */}
        {feature.type === 'hotspot' && (
          <div className="space-y-4">
            {/* Header with Type & Region */}
            <div className="flex items-start gap-3 pr-8">
              <span
                className={`p-2.5 rounded-2xl shrink-0 border ${
                  feature.data.threatLevel === 'Critical'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-lg shadow-red-500/10'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                <Swords className="w-6 h-6 animate-pulse" />
              </span>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md ${
                      feature.data.conflictType === 'Major Interstate War'
                        ? 'bg-red-500/25 text-red-300 border border-red-500/40'
                        : feature.data.conflictType === 'Civil War'
                        ? 'bg-orange-500/25 text-orange-300 border border-orange-500/40'
                        : feature.data.conflictType === 'Insurgency & Guerrilla War'
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                        : 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    {feature.data.conflictType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {feature.data.region}
                  </span>
                  {feature.data.startDate && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      • Began {feature.data.startDate}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-snug">
                  {feature.data.name}
                </h3>
              </div>
            </div>

            {/* Badges: Threat Level, Status, Coordinates */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1 ${
                  feature.data.threatLevel === 'Critical'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                <Flame className="w-3.5 h-3.5" /> Threat Level: {feature.data.threatLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/90 text-slate-200 border border-slate-700">
                ⚡ {feature.data.status}
              </span>
              <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded-full bg-slate-950/60 border border-slate-800">
                📍 {feature.data.coordinates[1].toFixed(2)}°N, {feature.data.coordinates[0].toFixed(2)}°E
              </span>
            </div>

            {/* Total Troops Highlight Banner */}
            {feature.data.totalTroopCommitment && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/30 border border-red-500/30 flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-red-400">
                      Total Estimated Mobilization / Forces in Theater
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-100 font-mono">
                      {feature.data.totalTroopCommitment}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Navigation Tabs */}
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" /> Overview &amp; Tactics
              </button>
              <button
                onClick={() => setActiveTab('troops')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'troops'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> Troop Strengths &amp; Belligerents
              </button>
              <button
                onClick={() => setActiveTab('context')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'context'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" /> Historical Context &amp; Causes
              </button>
            </div>

            {/* TAB 1: OVERVIEW & TACTICAL OPERATIONAL REALITY */}
            {activeTab === 'overview' && (
              <div className="space-y-3.5">
                {/* Description */}
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  {feature.data.description}
                </p>

                {/* Ground Tactics & Operational Doctrine */}
                {feature.data.tacticalDoctrine && (
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase font-mono tracking-wider">
                      <Crosshair className="w-4 h-4" />
                      <span>How Troops Fight: Tactics &amp; Battlefield Doctrine</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.data.tacticalDoctrine}
                    </p>
                  </div>
                )}

                {/* Current Situation */}
                {feature.data.currentSituation && (
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase font-mono tracking-wider">
                      <Activity className="w-4 h-4" />
                      <span>Current Ground Situation &amp; Frontline Dynamics</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.data.currentSituation}
                    </p>
                  </div>
                )}

                {/* Notable Frontlines / Contested Sectors */}
                {feature.data.notableFrontlines && feature.data.notableFrontlines.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase font-mono flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Active Frontline Sectors &amp; Contested Corridors:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.data.notableFrontlines.map((line, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-rose-200 font-mono flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-ping" />
                          <span>{line}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deployed Combat Assets */}
                <div className="bg-red-950/20 border border-red-900/30 p-3.5 rounded-2xl space-y-1">
                  <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>Signature Combat Hardware &amp; Weapon Systems:</span>
                  </div>
                  <div className="text-xs text-slate-200 font-mono leading-relaxed">
                    {feature.data.keyAssets}
                  </div>
                </div>

                {/* Casualties and Humanitarian */}
                {feature.data.casualtiesAndHumanitarian && (
                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 uppercase text-[10.5px] font-mono">
                      <Skull className="w-3.5 h-3.5" />
                      <span>Human Toll, Casualties &amp; Civilian Displacement:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300 text-xs">
                      {feature.data.casualtiesAndHumanitarian}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: DETAILED TROOP COMMITMENTS & BELLIGERENT BREAKDOWN */}
            {activeTab === 'troops' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">
                  Detailed troop strengths, operational roles, combat gear, and command allegiances for each belligerent force:
                </div>

                {feature.data.troopBreakdown && feature.data.troopBreakdown.length > 0 ? (
                  <div className="space-y-3">
                    {feature.data.troopBreakdown.map((combatant, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                          <div className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                            <span>{combatant.name}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {combatant.estimatedTroops}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10.5px] uppercase font-mono text-slate-400 block font-semibold">
                              Tactical Mission / Role:
                            </span>
                            <span className="text-slate-200">{combatant.role}</span>
                          </div>
                          <div>
                            <span className="text-[10.5px] uppercase font-mono text-slate-400 block font-semibold">
                              Allegiance &amp; Backing:
                            </span>
                            <span className="text-cyan-300 font-mono">{combatant.allegiance}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10.5px] uppercase font-mono text-slate-400 block font-semibold">
                            Primary Weapons, Armor &amp; Hardware:
                          </span>
                          <span className="text-slate-300 text-xs font-mono">
                            {combatant.equipment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400">Primary Forces Involved:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.data.primaryForces.map((force, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-medium"
                        >
                          ⚔️ {force}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctrine Note */}
                {feature.data.tacticalDoctrine && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Combat Environment &amp; Doctrine Note:
                    </span>
                    <p className="leading-relaxed">{feature.data.tacticalDoctrine}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DEEP HISTORICAL CONTEXT & ROOT CAUSES */}
            {activeTab === 'context' && (
              <div className="space-y-3.5">
                {/* Historical Context */}
                {feature.data.historicalContext && (
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase font-mono tracking-wider">
                      <History className="w-4 h-4" />
                      <span>Root Causes, Historical Grievances &amp; Genesis</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.data.historicalContext}
                    </p>
                  </div>
                )}

                {/* Global Geopolitical Significance */}
                {feature.data.geopoliticalSignificance && (
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase font-mono tracking-wider">
                      <Globe className="w-4 h-4" />
                      <span>Broader Geopolitical &amp; Global Ramifications</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {feature.data.geopoliticalSignificance}
                    </p>
                  </div>
                )}

                {/* Primary Forces List */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                    All Belligerent Forces &amp; Alliances:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {feature.data.primaryForces.map((force, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200"
                      >
                        ⚔️ {force}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* 2. MOUNTAIN PEAK                                                      */}
        {/* ===================================================================== */}
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
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
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

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-medium">
                Country: {feature.data.country}
              </span>
              {feature.data.isSevenSummit && (
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  ⭐ Seven Summit
                </span>
              )}
              {feature.data.deathZoneWarning && (
                <span className="px-2.5 py-1 rounded-xl bg-red-500/25 text-red-300 border border-red-500/40 font-bold flex items-center gap-1">
                  ☠️ Above 8,000m Death Zone
                </span>
              )}
              {feature.data.firstAscentYear && (
                <span className="px-2.5 py-1 rounded-xl bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 font-mono">
                  First Ascent: {feature.data.firstAscentYear}
                </span>
              )}
            </div>

            {feature.data.climbingDifficulty && (
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="font-bold text-slate-400 uppercase text-[10px] block font-mono mb-0.5">Climbing Grade &amp; Hazard:</span>
                <span className="text-slate-200">{feature.data.climbingDifficulty}</span>
              </div>
            )}

            {feature.data.geologicalOrigin && (
              <div className="p-3 rounded-2xl bg-indigo-950/25 border border-indigo-900/40 text-xs text-indigo-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-400 block font-mono">Geological Orogeny &amp; Formation:</span>
                <div>{feature.data.geologicalOrigin}</div>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.notes}
            </p>

            {feature.data.context && (
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1.5">
                <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block font-mono">In-Depth Geographical Context:</span>
                <div>{feature.data.context}</div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. OCEAN DEPRESSION                                                   */}
        {/* ===================================================================== */}
        {feature.type === 'depression' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Waves className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
                  DEEP OCEAN &amp; LAND DEPRESSION • {feature.data.type}
                </span>
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
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

            {feature.data.pressureAtm && (
              <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-900/40 text-xs text-cyan-200">
                <span className="font-bold text-cyan-400 uppercase font-mono text-[10px] block mb-0.5">Atmospheric / Hydrostatic Pressure:</span>
                <div>{feature.data.pressureAtm}</div>
              </div>
            )}

            {feature.data.geologicalOrigin && (
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-slate-400 uppercase font-mono text-[10px] block mb-0.5">Tectonic Origin &amp; Mechanism:</span>
                <div>{feature.data.geologicalOrigin}</div>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.notes}
            </p>

            {feature.data.context && (
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1.5">
                <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block font-mono">Extreme Habitat &amp; Geological Dynamics:</span>
                <div>{feature.data.context}</div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. TECTONIC PLATE                                                     */}
        {/* ===================================================================== */}
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

        {/* ===================================================================== */}
        {/* 4b. FAULT LINE                                                        */}
        {/* ===================================================================== */}
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
                <div className="font-bold font-mono text-base" style={{ color: feature.data.color }}>
                  {feature.data.speed}
                </div>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            {feature.data.notableFeatures && (
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300">
                <span className="font-bold text-slate-400 block text-[10px] uppercase font-mono mb-1">Notable Trenches &amp; Features:</span>
                <div>{feature.data.notableFeatures}</div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* 5. SEISMIC HOTSPOT                                                    */}
        {/* ===================================================================== */}
        {feature.type === 'seismic' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xl flex items-center justify-center">
                🌋
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold">
                  SEISMIC &amp; VOLCANIC HOTSPOT • {feature.data.type}
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

        {/* ===================================================================== */}
        {/* 6. BIOME (DESERT, OCEAN, RAINFOREST, TAIGA)                          */}
        {/* ===================================================================== */}
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
                <h3 className="text-xl font-bold text-slate-100">{feature.data.name}</h3>
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

            {feature.data.biomeRole && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-900/40 text-xs text-emerald-200 space-y-1">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block font-mono">Global Ecological Role &amp; Planetary Function:</span>
                <div className="leading-relaxed">{feature.data.biomeRole}</div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Climate Classification</span>
                <span className="text-slate-200 font-medium">{feature.data.climateZone}</span>
              </div>
              {feature.data.rainfallAnnual && (
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Annual Precipitation</span>
                  <span className="text-cyan-300 font-medium font-mono">{feature.data.rainfallAnnual}</span>
                </div>
              )}
              {feature.data.temperatureRange && (
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 sm:col-span-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Thermal / Temperature Range</span>
                  <span className="text-amber-300 font-medium font-mono">{feature.data.temperatureRange}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
              {feature.data.description}
            </p>

            {feature.data.threats && (
              <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 space-y-1">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block font-mono">Environmental Threats &amp; Vulnerabilities:</span>
                <div className="leading-relaxed">{feature.data.threats}</div>
              </div>
            )}

            {feature.data.keySpecies && feature.data.keySpecies.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Key Endemic &amp; Characteristic Wildlife Species:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.data.keySpecies.map((species, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 font-medium"
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
