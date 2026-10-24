import React, { useState, useMemo } from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { formatPersonnel, formatBudget, getUnStatus } from '../../utils/formatters.ts';
import { getDetailedMilitary } from '../../utils/militaryData.ts';
import { getAlliancesFor } from '../../utils/allianceData.ts';
import { AllianceCard } from '../AllianceCard.tsx';
import {
  Shield,
  Crosshair,
  Award,
  Users,
  Radio,
  Cpu,
  Plane,
  Anchor,
  Globe2,
  Sword,
  Target,
  BarChart3,
  HelpCircle,
  Truck,
  Zap,
} from 'lucide-react';

interface DossierMilitaryTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
  nuclearBadge: { label: string; color: string; icon: string };
}

type MilitarySubCategory = 'all' | 'personnel' | 'vehicles' | 'aircraft' | 'naval' | 'defense' | 'alliances';

export const DossierMilitaryTab: React.FC<DossierMilitaryTabProps> = ({
  country,
  details,
  nuclearBadge,
}) => {
  const [subTab, setSubTab] = useState<MilitarySubCategory>('all');
  const alliances = useMemo(() => getAlliancesFor(country), [country]);
  const mil = useMemo(() => getDetailedMilitary(country), [country]);
  // No forces of its own and no Global Firepower rank: show no estimated inventories
  const noForces = mil.totalMilitaryPersonnel === 0 && mil.powerIndex === 0;

  // Active / Reserve percentages for proportional display
  const activePct = mil.totalMilitaryPersonnel > 0
    ? Math.round((mil.activePersonnel / mil.totalMilitaryPersonnel) * 100)
    : 0;
  const reservePct = mil.totalMilitaryPersonnel > 0
    ? Math.round((mil.reservePersonnel / mil.totalMilitaryPersonnel) * 100)
    : 0;
  const paramilitaryPct = mil.totalMilitaryPersonnel > 0
    ? Math.max(0, 100 - activePct - reservePct)
    : 0;

  return (
    <div id="section-military" className="space-y-4 animate-in fade-in duration-150">
      {/* 1. Global Rank & Strategic Tier Hero */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-700/80 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-black text-sm shadow-md">
              {mil.powerIndex > 0 ? `#${mil.globalRank}` : '—'}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                Global Firepower Ranking
              </div>
              <div className="font-black text-base text-slate-100 flex items-center gap-2">
                <span>{mil.powerIndex > 0 ? `PowerIndex ${mil.powerIndex.toFixed(4)}` : 'Not ranked'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
                  {mil.tier}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Annual Defense Budget</div>
            <div className="font-mono font-black text-cyan-300 text-base">
              {mil.defenseBudgetUSD > 0 ? formatBudget(mil.defenseBudgetUSD) : 'None of its own'}
            </div>
            {mil.defenseBudgetUSD > 0 && (
              <div className="text-[10.5px] text-slate-400">
                <span className="text-slate-300 font-bold">{mil.defenseBudgetPercentGDP}%</span> of GDP{mil.perCapitaBudgetUSD > 0 && ` • ~$${mil.perCapitaBudgetUSD}/person`}
              </div>
            )}
          </div>
        </div>

        {/* Nuclear Status Pill */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between ${nuclearBadge.color}`}>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{nuclearBadge.icon}</span>
            <div>
              <div className="font-bold text-xs sm:text-sm">{mil.nuclearStatus}</div>
              {!noForces && <div className="text-[10.5px] opacity-80">{mil.nuclearTriad}</div>}
            </div>
          </div>
          <div className="text-right font-mono font-bold text-sm sm:text-base shrink-0">
            {mil.nuclearWarheads > 0
              ? `~${mil.nuclearWarheads.toLocaleString()} Warheads`
              : '0 Warheads'}
          </div>
        </div>
      </div>

      {noForces && (
        <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {country.name} has no armed forces of its own listed by Global Firepower or the CIA World Factbook, so no troop,
          equipment or fleet figures are shown.
        </div>
      )}

      {/* 2. Quick Navigation Filter Chips */}
      {!noForces && (
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSubTab('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'all'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          📊 Complete Intel
        </button>
        <button
          onClick={() => setSubTab('personnel')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'personnel'
              ? 'bg-rose-500 text-white border-rose-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          👥 Reserves & Troops ({formatPersonnel(mil.reservePersonnel)} Res.)
        </button>
        <button
          onClick={() => setSubTab('vehicles')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'vehicles'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          🛡️ Vehicles & Armor ({mil.tanks.toLocaleString()} Tanks)
        </button>
        <button
          onClick={() => setSubTab('aircraft')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'aircraft'
              ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          ✈️ Aircraft ({mil.totalAircraft.toLocaleString()} Total)
        </button>
        <button
          onClick={() => setSubTab('naval')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'naval'
              ? 'bg-blue-600 text-white border-blue-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          ⚓ Ships & Fleet ({mil.navalFleetTotal} Ships)
        </button>
        <button
          onClick={() => setSubTab('defense')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
            subTab === 'defense'
              ? 'bg-purple-600 text-white border-purple-400 shadow-md'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          🎯 Air Defense & Doctrine
        </button>
      </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION A: PERSONNEL & RESERVES                                           */}
      {/* ========================================================================= */}
      {!noForces && (subTab === 'all' || subTab === 'personnel') && (
        <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-rose-400" />
              <span>Armed Forces Personnel & Reserves Breakdown</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Total Military: <strong className="text-slate-200">{formatPersonnel(mil.totalMilitaryPersonnel)}</strong>
            </span>
          </div>

          {/* Manpower Visual Distribution Bar */}
          <div className="space-y-1">
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              <div
                style={{ width: `${activePct}%` }}
                title={`Active: ${activePct}%`}
                className="bg-rose-500 h-full transition-all"
              />
              <div
                style={{ width: `${reservePct}%` }}
                title={`Reserves: ${reservePct}%`}
                className="bg-amber-400 h-full transition-all"
              />
              <div
                style={{ width: `${paramilitaryPct}%` }}
                title={`Paramilitary: ${paramilitaryPct}%`}
                className="bg-cyan-400 h-full transition-all"
              />
            </div>
            <div className="flex justify-between text-[9.5px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Active: {activePct}%
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Reserves: {reservePct}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Paramilitary: {paramilitaryPct}%
              </span>
            </div>
          </div>

          {/* Personnel Detailed Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
            {/* 1. Active Duty */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Active Frontline</div>
              <div className="font-mono font-black text-rose-400 text-lg mt-0.5">
                {mil.activePersonnel.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Standing combat troops</div>
            </div>

            {/* 2. How Many Reserves! */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 ring-1 ring-amber-500/20">
              <div className="text-[10px] text-amber-300 uppercase font-mono font-bold flex items-center justify-center gap-1">
                <span>⚡ Reserves</span>
              </div>
              <div className="font-mono font-black text-amber-300 text-lg mt-0.5">
                {mil.reservePersonnel.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-amber-400/80 mt-0.5 font-medium">
                {mil.reserveRatioPercent}% of total force
              </div>
            </div>

            {/* 3. Paramilitary */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Paramilitary</div>
              <div className="font-mono font-black text-slate-200 text-lg mt-0.5">
                {mil.paramilitary.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">National guard & gendarmerie</div>
            </div>

            {/* 4. Total Manpower */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Combined</div>
              <div className="font-mono font-black text-cyan-300 text-lg mt-0.5">
                {mil.totalMilitaryPersonnel.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">All armed forces tiers</div>
            </div>
          </div>

          {/* Manpower Pool & Conscription details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            <div>
              <span className="text-slate-400 font-medium">Available Fit for Combat Service:</span>
              <div className="font-mono font-bold text-slate-200 mt-0.5">
                {mil.fitForService.toLocaleString()} citizens ({formatPersonnel(mil.fitForService)})
              </div>
              <div className="text-[10.5px] text-slate-500">
                Out of {mil.availableManpower.toLocaleString()} military-age population
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <span>Conscription Policy:</span>
                <span className="px-2 py-0.2 rounded-full bg-slate-800 text-slate-200 font-bold font-mono text-[10px]">
                  {mil.conscription}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {mil.conscriptionDetail}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION B: LAND VEHICLES & GROUND FORCES                                  */}
      {/* ========================================================================= */}
      {!noForces && (subTab === 'all' || subTab === 'vehicles') && (
        <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Combat Vehicles, Armor & Artillery Inventory</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              Total Ground Vehicles: {mil.totalGroundVehicles.toLocaleString()}
            </span>
          </div>

          {/* Vehicle Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px]">
            {/* Tanks */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-[10px] uppercase font-mono text-emerald-300 font-bold">Main Battle Tanks</div>
              <div className="font-mono font-black text-emerald-400 text-xl mt-0.5">
                {mil.tanks.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-400 mt-0.5">Heavy armored MBTs</div>
            </div>

            {/* Armored Fighting Vehicles */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Armored Vehicles</div>
              <div className="font-mono font-black text-slate-200 text-xl mt-0.5">
                {mil.armoredVehicles.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">IFVs, APCs & MRAPs</div>
            </div>

            {/* Self-Propelled Artillery */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Self-Propelled Guns</div>
              <div className="font-mono font-black text-amber-400 text-xl mt-0.5">
                {mil.selfPropelledArtillery.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Tracked & wheeled howitzers</div>
            </div>

            {/* Towed Artillery */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Towed Artillery</div>
              <div className="font-mono font-black text-slate-300 text-xl mt-0.5">
                {mil.towedArtillery.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Field guns & howitzers</div>
            </div>

            {/* Rocket Artillery / MLRS */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-mono text-rose-400 font-bold">MLRS / HIMARS</div>
              <div className="font-mono font-black text-rose-400 text-xl mt-0.5">
                {mil.rocketArtilleryMLRS.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Rocket launcher systems</div>
            </div>
          </div>

          {/* Key Armored Vehicle Models */}
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-1.5">
            <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Key Armored Combat Hardware & Vehicle Platforms:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mil.flagshipVehicles.map((vehicle, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{vehicle}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION C: AIRCRAFT FLEET & AIR COMBAT WING                               */}
      {/* ========================================================================= */}
      {!noForces && (subTab === 'all' || subTab === 'aircraft') && (
        <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Military Aircraft & Rotary-Wing Fleet Inventory</span>
            </div>
            <span className="text-[10px] font-mono text-sky-400 font-bold">
              Total Air Fleet: {mil.totalAircraft.toLocaleString()} Aircraft
            </span>
          </div>

          {/* Aircraft Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
            {/* Combat Fighters */}
            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30">
              <div className="text-[10px] uppercase font-mono text-sky-300 font-bold">Fighters & Interceptors</div>
              <div className="font-mono font-black text-sky-400 text-xl mt-0.5">
                {mil.combatAircraft.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-400 mt-0.5">Air superiority & multi-role</div>
            </div>

            {/* Dedicated Attack CAS */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Ground Attack (CAS)</div>
              <div className="font-mono font-black text-slate-200 text-xl mt-0.5">
                {mil.dedicatedAttackCAS.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Close air support & strike</div>
            </div>

            {/* Total Helicopters */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Total Helicopters</div>
              <div className="font-mono font-black text-amber-400 text-xl mt-0.5">
                {mil.totalHelicopters.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">Rotary-wing all types</div>
            </div>

            {/* Attack Helicopters */}
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30">
              <div className="text-[10px] uppercase font-mono text-rose-300 font-bold">Attack Helicopters</div>
              <div className="font-mono font-black text-rose-400 text-xl mt-0.5">
                {mil.attackHelicopters.toLocaleString()}
              </div>
              <div className="text-[9.5px] text-slate-400 mt-0.5">Gunships & tank hunters</div>
            </div>
          </div>

          {/* Secondary Aircraft Support Fleet */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Transports</div>
              <div className="font-bold text-slate-200 text-sm mt-0.5">{mil.transports}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Tanker Fleet</div>
              <div className="font-bold text-cyan-400 text-sm mt-0.5">{mil.tankerFleet}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Special Mission (AWACS)</div>
              <div className="font-bold text-amber-400 text-sm mt-0.5">{mil.specialMission}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Jet Trainers</div>
              <div className="font-bold text-slate-300 text-sm mt-0.5">{mil.trainers}</div>
            </div>
          </div>

          {/* Flagship Aircraft Models */}
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-1.5">
            <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Signature Aircraft Platforms in Service:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mil.flagshipAircraft.map((plane, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-sky-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{plane}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION D: NAVAL FLEET & WARSHIPS                                         */}
      {/* ========================================================================= */}
      {!noForces && (subTab === 'all' || subTab === 'naval') && (
        <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Anchor className="w-4 h-4 text-blue-400" />
              <span>Naval Fleet & Maritime Warship Inventory</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 font-bold">
              Total Ships: {mil.navalFleetTotal} Vessels
            </span>
          </div>

          {/* Key Capital Ships Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
            {/* Aircraft Carriers */}
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30">
              <div className="text-[10px] uppercase font-mono text-cyan-300 font-bold">Aircraft Carriers</div>
              <div className="font-mono font-black text-cyan-400 text-xl mt-0.5">
                {mil.aircraftCarriers}
              </div>
              <div className="text-[9.5px] text-slate-400 mt-0.5">
                +{mil.helicopterCarriers} Amphibious LHD/LHA
              </div>
            </div>

            {/* Submarines */}
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30">
              <div className="text-[10px] uppercase font-mono text-blue-300 font-bold">Submarines</div>
              <div className="font-mono font-black text-blue-400 text-xl mt-0.5">
                {mil.submarines}
              </div>
              <div className="text-[9.5px] text-slate-400 mt-0.5">
                {mil.nuclearSubmarines > 0
                  ? `${mil.nuclearSubmarines} Nuclear / ${mil.dieselElectricSubmarines} AIP`
                  : 'Diesel-Electric / AIP'}
              </div>
            </div>

            {/* Destroyers & Frigates */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Destroyers & Frigates</div>
              <div className="font-mono font-black text-slate-200 text-xl mt-0.5">
                {mil.destroyers + mil.frigates}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">
                {mil.destroyers} DDG / {mil.frigates} FFG
              </div>
            </div>

            {/* Corvettes & Patrol Boats */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Patrol & Corvettes</div>
              <div className="font-mono font-black text-slate-300 text-xl mt-0.5">
                {mil.corvettes + mil.patrolCraft}
              </div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">
                {mil.corvettes} Corvettes • {mil.patrolCraft} Patrol
              </div>
            </div>
          </div>

          {/* Secondary Naval Assets */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Mine Warfare Ships</div>
              <div className="font-bold text-slate-200 text-sm mt-0.5">{mil.mineWarfare}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Auxiliary & Replenishment</div>
              <div className="font-bold text-slate-200 text-sm mt-0.5">{mil.auxiliaryVessels}</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-slate-400">Amphibious Assault Craft</div>
              <div className="font-bold text-cyan-400 text-sm mt-0.5">{mil.helicopterCarriers}</div>
            </div>
          </div>

          {/* Flagship Vessels */}
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-1.5">
            <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Flagship Naval Combatants & Vessel Classes:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mil.flagshipVessels.map((ship, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-blue-300 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{ship}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION E: AIR & MISSILE DEFENSE, CYBER & DOCTRINE                        */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'defense') && (
        <div className="space-y-3">
          {/* Air & Missile Defense System */}
          {(!noForces || details.missileDefense) && (
          <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-sky-400" /> Air & Missile Defense Infrastructure
            </div>
            {!noForces && <div className="flex flex-wrap gap-1.5">
              {mil.airDefenseSystems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-200 text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{sys}</span>
                </span>
              ))}
            </div>}
            {details.missileDefense && (
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1">
                {details.missileDefense}
              </p>
            )}
          </div>
          )}

          {/* Strategic Doctrine & Cyber Command */}
          {(details.strategicDoctrine || details.cyberSpaceCapability) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {details.strategicDoctrine && (
                <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4 text-rose-400" /> Strategic Military Doctrine
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {details.strategicDoctrine}
                  </p>
                </div>
              )}

              {details.cyberSpaceCapability && (
                <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-400" /> Space & Cyberspace Defense
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {details.cyberSpaceCapability}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Armed Forces Branches */}
          {details.armedForcesBranches && (
            <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                <Sword className="w-4 h-4 text-amber-400" /> Military & Security Forces
              </div>
              <div className="flex flex-wrap gap-1.5">
                {details.armedForcesBranches.map((branch, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{branch}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Defense Contractors */}
          {details.defenseContractors && (
            <div className="p-4 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="font-bold text-slate-200 text-xs">Leading Defense Industry & Contractors</div>
              <div className="flex flex-wrap gap-1.5">
                {details.defenseContractors.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION F: ALLIANCES & PACTS                                              */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'alliances') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" /> Defense Alliances & Collective Security Pacts
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {alliances.length > 0 ? `${alliances.length} Pacts` : 'Neutral'}
            </span>
          </div>

          {alliances.length === 0 ? (
            <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
              <div className="text-2xl">🕊️</div>
              {getUnStatus(country) !== 'Not a UN Member' || country.longevity.sovereignEra === 'Sovereign State' ? (
                <>
                  <div className="font-bold text-slate-200 text-xs">Neutral / Non-Aligned Sovereign State</div>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    {country.name} does not hold formal binding mutual defense commitments with external military pacts, maintaining independent foreign and security policy.
                  </p>
                </>
              ) : (
                <>
                  <div className="font-bold text-slate-200 text-xs">No Alliance Memberships of Its Own</div>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    {country.name} is not a sovereign state and holds no defence pacts in its own name.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {alliances.map((alliance) => (
                <AllianceCard
                  key={alliance.id}
                  alliance={alliance}
                  currentCountryCode={country.code}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
