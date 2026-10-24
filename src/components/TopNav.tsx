import React, { useState, useRef, useEffect } from 'react';
import { CountryData, ContinentFilter, MapMetricMode } from '../types.ts';
import { countryList } from '../data/countriesData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { formatGfpRank } from '../utils/formatters.ts';
import {
  Search,
  Shuffle,
  BarChart3,
  Scale,
  X,
  Globe,
  ChevronDown,
  Award,
  Flag,
  Swords,
  CloudSun,
  Activity,
  Mountain,
  Palmtree,
  Layers,
} from 'lucide-react';

interface TopNavProps {
  onSelectCountry: (country: CountryData) => void;
  onOpenRankings: () => void;
  onOpenCompare: () => void;
  onOpenConsidered: () => void;
  onOpenAskSearch?: (initialQuery?: string) => void;
  selectedContinent: ContinentFilter;
  onChangeContinent: (continent: ContinentFilter) => void;
  metricMode?: MapMetricMode;
  onChangeMetric?: (mode: MapMetricMode) => void;
}

const CONTINENTS: ContinentFilter[] = [
  'All',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
];

const MODES_LIST: { id: MapMetricMode; label: string; icon: React.ReactNode }[] = [
  { id: 'flags', label: 'Flags & Countries (Default)', icon: <Flag className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: 'war', label: 'War & Troops', icon: <Swords className="w-3.5 h-3.5 text-red-400" /> },
  { id: 'climate', label: 'Climate Zones', icon: <CloudSun className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'tectonic', label: 'Tectonic Plates', icon: <Activity className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'altitude', label: 'Altitudes & Peaks', icon: <Mountain className="w-3.5 h-3.5 text-indigo-400" /> },
  { id: 'biomes', label: 'Biomes (Desert & Ocean)', icon: <Palmtree className="w-3.5 h-3.5 text-yellow-400" /> },
];

export const TopNav: React.FC<TopNavProps> = ({
  onSelectCountry,
  onOpenRankings,
  onOpenCompare,
  onOpenConsidered,
  onOpenAskSearch,
  selectedContinent,
  onChangeContinent,
  metricMode = 'flags',
  onChangeMetric,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [isOpenModeMenu, setIsOpenModeMenu] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const modeMenuRef = useRef<HTMLDivElement>(null);

  // Filtered search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return countryList
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.officialName.toLowerCase().includes(q) ||
          c.capital.toLowerCase().includes(q) ||
          c.code.toLowerCase() === q ||
          c.code3.toLowerCase() === q
      )
      .slice(0, 8);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpenSuggestions(false);
      }
      if (modeMenuRef.current && !modeMenuRef.current.contains(e.target as Node)) {
        setIsOpenModeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: CountryData) => {
    onSelectCountry(country);
    setSearchQuery('');
    setIsOpenSuggestions(false);
  };

  const handleRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countryList.length);
    const randomCountry = countryList[randomIndex];
    if (randomCountry) {
      onSelectCountry(randomCountry);
    }
  };

  const currentModeInfo = MODES_LIST.find((m) => m.id === metricMode) || {
    id: metricMode,
    label: metricMode,
    icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
  };

  return (
    <header
      id="app-top-nav"
      className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-30 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 sm:gap-3 pointer-events-none"
    >
      {/* Left Branding & Title */}
      <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xl min-w-0">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 shrink-0">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5 leading-tight whitespace-nowrap">
            WORLD COUNTRIES ATLAS
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
              240+ NATIONS
            </span>
          </h1>
          <p className="hidden lg:block text-[10px] text-slate-400 font-medium">
            Sovereign Longevity, History & Global Firepower
          </p>
        </div>
      </div>

      {/* Phones and small tablets: put the mode selector and actions on a second row under the title */}
      <div className="basis-full h-0 md:hidden" aria-hidden="true" />

      {/* Center Group: Search Bar + Mode Switcher */}
      <div className="pointer-events-auto flex items-center gap-2 flex-1 max-w-xl min-w-0">
        {/* Mode Selector right next to Search Bar - Stays compact on all screens */}
        {onChangeMetric && (
          <div ref={modeMenuRef} className="relative flex items-center shrink-0">
            <button
              id="top-mode-selector-btn"
              onClick={() => setIsOpenModeMenu((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 hover:border-cyan-500/50 text-xs font-bold text-slate-200 shadow-xl transition-all hover:bg-slate-800 shrink-0"
            >
              <span>{currentModeInfo.icon}</span>
              <span className="truncate max-w-[96px] sm:max-w-[130px] text-cyan-200">
                {currentModeInfo.label.split(' (')[0]}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isOpenModeMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Mode Dropdown Menu */}
            {isOpenModeMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] max-h-[70vh] overflow-y-auto bg-slate-950/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-50 divide-y divide-slate-800/60">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  EXPLORATION MODES
                </div>
                <div className="pt-1 space-y-0.5">
                  {MODES_LIST.map((m) => {
                    const isSelected = metricMode === m.id;
                    return (
                      <button
                        key={m.id}
                        id={`mode-item-${m.id}`}
                        onClick={() => {
                          onChangeMetric(m.id);
                          setIsOpenModeMenu(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                        }`}
                      >
                        <span>{m.icon}</span>
                        <span className="flex-1 font-medium">{m.label}</span>
                        {m.id === 'flags' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-mono">
                            DEFAULT
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Bar with Autocomplete */}
        <div ref={searchContainerRef} className="relative flex-1 hidden lg:block min-w-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="country-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpenSuggestions(true);
              }}
              onFocus={() => setIsOpenSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (searchResults.length === 1) {
                    handleSelect(searchResults[0]);
                  } else if (onOpenAskSearch && searchQuery.trim()) {
                    onOpenAskSearch(searchQuery.trim());
                    setIsOpenSuggestions(false);
                  }
                }
              }}
              placeholder="Search country, capital, or topic (e.g., Japan, C-17, USA)..."
              className="w-full pl-10 pr-9 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isOpenSuggestions && (searchResults.length > 0 || (searchQuery.trim() && onOpenAskSearch)) && (
            <div
              id="search-suggestions-dropdown"
              className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/80 max-h-80 overflow-y-auto"
            >
              {searchResults.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-900/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag
                      countryCode={c.code}
                      countryName={c.name}
                      flagEmoji={c.flag}
                      size="sm"
                      className="shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Capital: {c.capital} • {c.continent}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[10px]">
                    <span className="text-amber-400 font-mono font-semibold block">
                      {formatGfpRank(c.military)}
                    </span>
                    <span className="text-emerald-400 font-medium">
                      Alive {c.longevity.yearsAlive.toLocaleString()} yrs
                    </span>
                  </div>
                </button>
              ))}

              {onOpenAskSearch && searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenAskSearch(searchQuery.trim());
                    setIsOpenSuggestions(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center gap-2.5 text-left bg-slate-900/50 hover:bg-slate-900 transition-colors text-xs text-cyan-300 font-semibold group"
                >
                  <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">
                    Search knowledge &amp; pictures for &ldquo;{searchQuery}&rdquo;
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Action Buttons - Never wrap or squeeze */}
      <div className="pointer-events-auto flex items-center gap-2 shrink-0">
        {/* Random Country */}
        <button
          id="btn-random-country"
          onClick={handleRandomCountry}
          title="Fly to Random Country"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 hover:border-cyan-500/50 text-xs font-semibold text-slate-200 hover:text-cyan-300 shadow-xl transition-all"
        >
          <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden xl:inline">Random Country</span>
        </button>

        {/* Compare Nations */}
        <button
          id="btn-compare-nations"
          onClick={onOpenCompare}
          title="Compare Countries Side-by-Side"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/70 hover:border-cyan-500/50 text-xs font-semibold text-slate-200 hover:text-cyan-300 shadow-xl transition-all"
        >
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline">Compare</span>
        </button>

        {/* Considered in the World (Best Food, Military, Longevity, Heritage) */}
        <button
          id="btn-considered-accolades"
          onClick={onOpenConsidered}
          title="Countries Considered Best in the World (e.g. Best Food, Military, Oldest Civilizations)"
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-500/25 hover:from-amber-500/40 hover:to-orange-500/40 border border-amber-500/50 text-xs font-bold text-amber-200 shadow-xl shadow-amber-500/10 transition-all hover:scale-[1.02]"
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden lg:inline">Considered</span>
        </button>

        {/* Leaderboards & Rankings */}
        <button
          id="btn-rankings-leaderboard"
          onClick={onOpenRankings}
          title="Global Leaderboards & Rankings"
          className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/40 text-xs font-bold text-cyan-200 shadow-xl transition-all"
        >
          <BarChart3 className="w-3.5 h-3.5 text-cyan-300" />
          <span className="hidden lg:inline">Rankings</span>
        </button>
      </div>
    </header>
  );
};
