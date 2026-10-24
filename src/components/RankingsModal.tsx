import React, { useState, useMemo } from 'react';
import { CountryData } from '../types.ts';
import { countryList } from '../data/countriesData.ts';
import { formatBudget, formatPersonnel, formatPopulation, formatGfpRank } from '../utils/formatters.ts';
import { getVerifiedSovereignInfo } from '../utils/sovereignData.ts';
import { getAlliancesFor } from '../utils/allianceData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import {
  Clock,
  Shield,
  DollarSign,
  Users,
  Award,
  Maximize2,
  X,
  ChevronRight,
  Flame,
  Search,
  Globe2,
  Crown,
  Plane,
  Anchor,
} from 'lucide-react';

interface RankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: CountryData) => void;
}

type RankingCategory =
  | 'oldest'
  | 'military'
  | 'reserves'
  | 'activeTroops'
  | 'tanks'
  | 'aircraft'
  | 'naval'
  | 'budget'
  | 'nuclear'
  | 'population'
  | 'area';

const CATEGORIES: { id: RankingCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'military', label: 'Military Power (GFP)', icon: <Award className="w-3.5 h-3.5" /> },
  { id: 'reserves', label: 'Active Reserves', icon: <Users className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'activeTroops', label: 'Active Armies', icon: <Shield className="w-3.5 h-3.5 text-rose-400" /> },
  { id: 'tanks', label: 'Tanks & Armor', icon: <Shield className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'aircraft', label: 'Aircraft Fleet', icon: <Plane className="w-3.5 h-3.5 text-sky-400" /> },
  { id: 'naval', label: 'Naval Warships', icon: <Anchor className="w-3.5 h-3.5 text-blue-400" /> },
  { id: 'budget', label: 'Defense Budget', icon: <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: 'nuclear', label: 'Nuclear Arsenals', icon: <Flame className="w-3.5 h-3.5 text-rose-400" /> },
  { id: 'oldest', label: 'Oldest Sovereign States', icon: <Clock className="w-3.5 h-3.5" /> },
  { id: 'population', label: 'Population', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'area', label: 'Landmass Area', icon: <Maximize2 className="w-3.5 h-3.5" /> },
];

const CONTINENT_FILTERS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

export const RankingsModal: React.FC<RankingsModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
}) => {
  const [activeCategory, setActiveCategory] = useState<RankingCategory>('military');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  // Sorted data based on active category
  const rankedList = useMemo(() => {
    const list = [...countryList];
    let sorted: CountryData[];
    switch (activeCategory) {
      case 'oldest':
        sorted = list.sort((a, b) => b.longevity.yearsAlive - a.longevity.yearsAlive);
        break;
      case 'military':
        sorted = list.sort((a, b) => a.military.globalRank - b.military.globalRank);
        break;
      case 'reserves':
        sorted = list.sort((a, b) => b.military.reservePersonnel - a.military.reservePersonnel);
        break;
      case 'activeTroops':
        sorted = list.sort((a, b) => b.military.activePersonnel - a.military.activePersonnel);
        break;
      case 'tanks':
        sorted = list.sort((a, b) => b.military.tanks - a.military.tanks);
        break;
      case 'aircraft':
        sorted = list.sort((a, b) => b.military.totalAircraft - a.military.totalAircraft);
        break;
      case 'naval':
        sorted = list.sort((a, b) => b.military.navalFleetTotal - a.military.navalFleetTotal);
        break;
      case 'budget':
        sorted = list.sort((a, b) => b.military.defenseBudgetUSD - a.military.defenseBudgetUSD);
        break;
      case 'nuclear':
        sorted = list
          .filter((c) => c.military.nuclearWarheads > 0)
          .sort((a, b) => b.military.nuclearWarheads - a.military.nuclearWarheads);
        break;
      case 'population':
        sorted = list.sort((a, b) => b.demographics.population - a.demographics.population);
        break;
      case 'area':
        sorted = list.sort((a, b) => b.geography.areaKm2 - a.geography.areaKm2);
        break;
      default:
        sorted = list;
    }

    return sorted;
  }, [activeCategory]);

  // Filtered by search & continent
  const filteredList = useMemo(() => {
    return rankedList.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.officialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code3.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesContinent =
        selectedContinent === 'All' ||
        (selectedContinent === 'Americas'
          ? c.continent === 'North America' || c.continent === 'South America'
          : c.continent === selectedContinent);

      return matchesSearch && matchesContinent;
    });
  }, [rankedList, searchQuery, selectedContinent]);

  if (!isOpen) return null;

  return (
    <div
      id="rankings-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="rankings-modal-dialog"
        className="w-full max-w-4xl h-[92vh] max-h-[880px] bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-y-auto custom-scrollbar text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Minimal Close Button */}
        <button
          id="btn-close-rankings"
          onClick={onClose}
          className="sticky top-3 right-3 self-end -mb-9 mr-3 z-30 p-1.5 sm:p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 shadow-md backdrop-blur-sm transition-colors"
          title="Close Rankings (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Natural Scrolling Header: scrolls away when user scrolls down */}
        <div className="p-3 sm:p-4 pr-12 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0">🏆</span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate flex items-center gap-2">
                <span>World Sovereign Leaderboards</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Updated for Today
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                Official sovereignty rankings, armed forces, defense budgets, and executive leaders
              </p>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 p-2 px-3 sm:px-4 border-b border-slate-800/60 overflow-x-auto scrollbar-none bg-slate-950/80">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`btn-rank-cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="p-2.5 px-3 sm:px-4 border-b border-slate-800/60 bg-slate-950 flex flex-wrap items-center justify-between gap-2.5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="input-rankings-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nation, capital, code (e.g. USA, Paris, JPN)..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {CONTINENT_FILTERS.map((cont) => (
              <button
                key={cont}
                id={`btn-filter-continent-${cont.toLowerCase()}`}
                onClick={() => setSelectedContinent(cont)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedContinent === cont
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Showing <span className="text-cyan-400 font-bold">{filteredList.length}</span> of {rankedList.length} nations
          </div>
        </div>

        {/* Clear Column Header */}
        <div className="px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 text-center">Rank</span>
            <span>Sovereign State & Current Leader</span>
          </div>
          <span className="text-right">Ranking Metric</span>
        </div>

        {/* Rankings List - scrolls naturally with header */}
        <div className="p-2 sm:p-3 space-y-1 divide-y divide-slate-900/60">
          {filteredList.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Globe2 className="w-10 h-10 mx-auto mb-2 text-slate-600 opacity-60" />
              <p className="text-sm font-semibold text-slate-400">No sovereign nations matched your filter</p>
              <p className="text-xs mt-1">Try changing your search term or selecting "All" continents.</p>
            </div>
          ) : (
            filteredList.map((c) => {
              const categoryRank = rankedList.findIndex((item) => item.id === c.id) + 1;
              const sovereignInfo = getVerifiedSovereignInfo(c);

              return (
                <div
                  key={c.id}
                  id={`ranking-row-${c.id}`}
                  onClick={() => {
                    onSelectCountry(c);
                    onClose();
                  }}
                  className="pt-1.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-900/90 cursor-pointer transition-colors group gap-2"
                >
                  {/* Left: Position, Flag, Country Name & Current Leader */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span
                      className={`font-mono font-bold text-xs sm:text-sm w-8 text-center shrink-0 ${
                        categoryRank === 1
                          ? 'text-amber-400'
                          : categoryRank === 2
                          ? 'text-slate-300'
                          : categoryRank === 3
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    >
                      #{categoryRank}
                    </span>

                    {/* Real Country Flag */}
                    <CountryFlag
                      countryCode={c.code}
                      countryName={c.name}
                      flagEmoji={sovereignInfo.flag}
                      size="md"
                    />

                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 sm:gap-2 truncate">
                        <span className="truncate">{c.name}</span>
                        {c.code3 && (
                          <span className="text-[10px] text-slate-500 font-mono font-normal shrink-0">
                            ({c.code3})
                          </span>
                        )}
                        {c.military.nuclearWarheads > 0 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                            ☢ Nuclear
                          </span>
                        )}
                      </div>

                      {/* Display the real leader who controls the country */}
                      <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                          <Crown className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{sovereignInfo.leader}</span>
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 truncate">Cap: {c.capital}</span>
                        <span className="text-slate-600 hidden md:inline">•</span>
                        <span className="text-slate-500 hidden md:inline truncate">{c.continent}</span>
                      </div>

                      {/* Display Alliances if country belongs to any */}
                      {(() => {
                        const countryAlliances = getAlliancesFor(c);
                        if (countryAlliances.length === 0) return null;
                        return (
                          <div className="flex items-center gap-1 mt-1 flex-wrap">
                            {countryAlliances.slice(0, 2).map((a) => (
                              <span
                                key={a.id}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-semibold border ${a.accentColor}`}
                                title={a.name}
                              >
                                <span>{a.flagEmoji}</span>
                                <span>{a.shortName}</span>
                              </span>
                            ))}
                            {countryAlliances.length > 2 && (
                              <span className="text-[9px] text-slate-500 font-mono">
                                +{countryAlliances.length - 2}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Right: Metric Specifics */}
                  <div className="text-left sm:text-right flex items-center justify-between sm:justify-end gap-2 pl-10 sm:pl-0 shrink-0">
                    <div className="flex flex-col sm:items-end">
                      {activeCategory === 'oldest' && (
                        <div>
                          <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                            {c.longevity.yearsAlive.toLocaleString()} Years Alive
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 sm:justify-end">
                            <span>
                              Founded{' '}
                              {c.longevity.foundationYear < 0
                                ? `${Math.abs(c.longevity.foundationYear)} BCE`
                                : `${c.longevity.foundationYear} CE`}
                            </span>
                            <span>•</span>
                            <span className="text-slate-400 italic truncate max-w-[140px]">
                              {c.longevity.foundationEvent}
                            </span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'military' && (
                        <div>
                          <div className="font-mono font-bold text-amber-400 text-xs sm:text-sm">
                            {formatGfpRank(c.military)} ({c.military.tier})
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>PwrIdx: {c.military.powerIndex.toFixed(4)}</span>
                            <span>•</span>
                            <span>✈ {c.military.totalAircraft.toLocaleString()}</span>
                            <span>•</span>
                            <span>🛡 {c.military.tanks.toLocaleString()}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'reserves' && (
                        <div>
                          <div className="font-mono font-bold text-amber-400 text-xs sm:text-sm">
                            {formatPersonnel(c.military.reservePersonnel)} Reserves
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>Active: {formatPersonnel(c.military.activePersonnel)}</span>
                            <span>•</span>
                            <span>Total: {formatPersonnel(c.military.activePersonnel + c.military.reservePersonnel)}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'tanks' && (
                        <div>
                          <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                            {c.military.tanks.toLocaleString()} Tanks
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>Armored: {c.military.armoredVehicles.toLocaleString()}</span>
                            <span>•</span>
                            <span>{formatGfpRank(c.military)}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'aircraft' && (
                        <div>
                          <div className="font-mono font-bold text-sky-400 text-xs sm:text-sm">
                            {c.military.totalAircraft.toLocaleString()} Aircraft
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>Combat Jets: {c.military.combatAircraft.toLocaleString()}</span>
                            <span>•</span>
                            <span>Helis: {c.military.attackHelicopters} Attack</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'naval' && (
                        <div>
                          <div className="font-mono font-bold text-blue-400 text-xs sm:text-sm">
                            {c.military.navalFleetTotal} Ships
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>Carriers: {c.military.aircraftCarriers}</span>
                            <span>•</span>
                            <span>Subs: {c.military.submarines}</span>
                            <span>•</span>
                            <span>DDG/FFG: {c.military.destroyersFrigates}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'budget' && (
                        <div>
                          <div className="font-mono font-bold text-cyan-400 text-xs sm:text-sm">
                            {formatBudget(c.military.defenseBudgetUSD)}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>{c.military.defenseBudgetPercentGDP}% GDP</span>
                            <span>•</span>
                            <span>${c.demographics.population > 0 ? Math.round((c.military.defenseBudgetUSD * 1e9) / c.demographics.population) : 0}/capita</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'activeTroops' && (
                        <div>
                          <div className="font-mono font-bold text-purple-400 text-xs sm:text-sm">
                            {formatPersonnel(c.military.activePersonnel)} Active
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>Reserve: {formatPersonnel(c.military.reservePersonnel)}</span>
                            <span>•</span>
                            <span>Total: {formatPersonnel(c.military.activePersonnel + c.military.reservePersonnel)}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'nuclear' && (
                        <div>
                          <div className="font-mono font-bold text-rose-400 text-xs sm:text-sm">
                            {c.military.nuclearWarheads.toLocaleString()} Warheads
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>{c.military.nuclearStatus}</span>
                            <span>•</span>
                            <span>Subs: {c.military.submarines}</span>
                          </div>
                        </div>
                      )}

                      {activeCategory === 'population' && (
                        <div>
                          <div className="font-mono font-bold text-blue-400 text-xs sm:text-sm">
                            {formatPopulation(sovereignInfo.population)}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            {sovereignInfo.population > 0 ? (
                              <>
                                <span>{sovereignInfo.densityPerKm2} / km²</span>
                                {!!sovereignInfo.urbanPercentage && (
                                  <>
                                    <span>•</span>
                                    <span>{sovereignInfo.urbanPercentage}% urban</span>
                                  </>
                                )}
                              </>
                            ) : (
                              <span>No permanent population</span>
                            )}
                          </div>
                        </div>
                      )}

                      {activeCategory === 'area' && (
                        <div>
                          <div className="font-mono font-bold text-teal-400 text-xs sm:text-sm">
                            {sovereignInfo.areaKm2.toLocaleString()} km²
                            {sovereignInfo.areaKm2 >= 1000000 && (
                              <span className="text-teal-300/80 text-[11px] ml-1.5 font-normal">
                                (~{(sovereignInfo.areaKm2 / 1000000).toFixed(2)}M)
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 sm:justify-end">
                            <span>{sovereignInfo.areaSqMi.toLocaleString()} sq mi</span>
                            {c.geography.coastlineKm !== undefined && (
                              <>
                                <span>•</span>
                                <span>Coast: {c.geography.coastlineKm.toLocaleString()} km</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 p-2.5 px-4 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Click any sovereign state to open its intelligence dossier & live status</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
