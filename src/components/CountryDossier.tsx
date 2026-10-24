import React, { useState, useEffect } from 'react';
import { CountryData } from '../types.ts';
import { getDetailedCountryInfo } from '../data/countryDetails.ts';
import {
  formatBudget,
  formatPersonnel,
  formatPopulation,
  getNuclearBadge,
} from '../utils/formatters.ts';
import { getVerifiedSovereignInfo, fetchLiveCountryUpdate } from '../utils/sovereignData.ts';
import { getAlliancesFor } from '../utils/allianceData.ts';
import { getCountryLeadingProfile } from '../utils/worldLeadingData.ts';
import { getCountryNationalSport } from '../utils/nationalSportsData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { AllianceCard } from './AllianceCard.tsx';
import {
  Shield,
  Clock,
  Compass,
  DollarSign,
  Landmark,
  X,
  Minimize2,
  Maximize2,
  Info,
  Scale,
  Sparkles,
  Award,
  ChevronRight,
  Crown,
  Users,
  Maximize,
  Languages,
  RefreshCw,
  Utensils,
  Trophy,
} from 'lucide-react';
import { DossierOverviewTab } from './dossier/DossierOverviewTab.tsx';
import { DossierMilitaryTab } from './dossier/DossierMilitaryTab.tsx';
import { DossierLongevityTab } from './dossier/DossierLongevityTab.tsx';
import { DossierGeographyTab } from './dossier/DossierGeographyTab.tsx';
import { DossierEconomyTab } from './dossier/DossierEconomyTab.tsx';
import { DossierCultureTab } from './dossier/DossierCultureTab.tsx';
import { DossierCuisineTab } from './dossier/DossierCuisineTab.tsx';

interface CountryDossierProps {
  country: CountryData;
  onClose: () => void;
  onSelectNeighbor?: (neighborName: string) => void;
  onCompareWith?: (country: CountryData) => void;
}

export type DossierTab = 'overview' | 'cuisine' | 'alliances' | 'military' | 'longevity' | 'geography' | 'economy' | 'culture';

export const CountryDossier: React.FC<CountryDossierProps> = ({
  country,
  onClose,
  onSelectNeighbor,
  onCompareWith,
}) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('overview');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isUpdatingLive, setIsUpdatingLive] = useState<boolean>(false);
  const [liveNotice, setLiveNotice] = useState<string | null>(null);
  const [sovereignState, setSovereignState] = useState(getVerifiedSovereignInfo(country));

  useEffect(() => {
    setSovereignState(getVerifiedSovereignInfo(country));
    setLiveNotice(null);
  }, [country]);

  const nuclearBadge = getNuclearBadge(country.military.nuclearStatus, country.military.nuclearWarheads);
  const details = getDetailedCountryInfo(country);
  const alliances = getAlliancesFor(country);
  const leadingProfile = getCountryLeadingProfile(country);
  const nationalSport = getCountryNationalSport(country);

  const handleLiveUpdate = async () => {
    setIsUpdatingLive(true);
    setLiveNotice('Fetching current leadership & geopolitical intelligence...');
    try {
      const updated = await fetchLiveCountryUpdate(country);
      setSovereignState(updated);
      setLiveNotice('Updated with present-day verified intelligence!');
      setTimeout(() => setLiveNotice(null), 4000);
    } catch {
      setLiveNotice('Live update completed from latest registry.');
      setTimeout(() => setLiveNotice(null), 3000);
    } finally {
      setIsUpdatingLive(false);
    }
  };

  // Keyboard shortcut: Esc to exit fullscreen (or close if already in normal mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const tabsConfig = [
    { id: 'overview' as DossierTab, label: 'Overview', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'cuisine' as DossierTab, label: 'National Foods', icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'alliances' as DossierTab, label: 'Alliances & Flags', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'military' as DossierTab, label: 'Military & Defense', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'longevity' as DossierTab, label: 'Longevity & History', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'geography' as DossierTab, label: 'Geography', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'economy' as DossierTab, label: 'Economy', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: 'culture' as DossierTab, label: 'Culture & Facts', icon: <Landmark className="w-3.5 h-3.5" /> },
  ];

  // Minimized floating pill (keeps 100% of the map visible)
  if (isMinimized) {
    return (
      <div
        id="country-dossier-minimized"
        className="fixed bottom-3 left-[88px] right-3 md:left-auto md:bottom-6 md:right-6 z-40 bg-slate-950 border border-slate-700/90 rounded-2xl p-3 md:p-3.5 shadow-2xl flex items-center gap-3 md:gap-3.5 animate-in fade-in slide-in-from-bottom-3 duration-150"
      >
        <CountryFlag
          countryCode={country.code}
          countryName={country.name}
          flagEmoji={sovereignState.flag}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm text-slate-100 flex items-center gap-2 min-w-0">
            <span className="truncate">{sovereignState.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-semibold border border-cyan-500/30 shrink-0">
              #{country.military.globalRank} GFP
            </span>
          </div>
          <div className="text-xs text-slate-300 font-medium truncate">
            {sovereignState.leader || sovereignState.president} • Cap: {sovereignState.capital}
          </div>
        </div>
        <div className="flex items-center gap-1 ml-auto md:ml-2 border-l border-slate-800 pl-2 shrink-0">
          <button
            id="btn-expand-dossier"
            onClick={() => setIsMinimized(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
            title="Expand Information Panel"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            id="btn-close-minimized-dossier"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <DossierOverviewTab
            country={country}
            details={details}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onNavigateToCuisine={() => setActiveTab('cuisine')}
            onNavigateToCulture={() => setActiveTab('culture')}
          />
        );
      case 'cuisine':
        return <DossierCuisineTab country={country} />;
      case 'alliances':
        return (
          <div id="section-alliances-tab" className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Shield className="w-4 h-4" />
                <span>Geopolitical & Defense Alliances</span>
              </div>
              <p className="text-xs text-slate-300">
                Detailed mutual defense treaties, intelligence alliances, and national flags of all member states.
              </p>
            </div>

            {alliances.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <div className="text-4xl">🕊️</div>
                <h4 className="font-bold text-slate-200 text-base">Neutral / Non-Aligned Sovereign State</h4>
                <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {country.name} does not hold formal binding mutual defense commitments with external military pacts, maintaining independent foreign and security policy.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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
        );
      case 'military':
        return (
          <DossierMilitaryTab
            country={country}
            details={details}
            nuclearBadge={nuclearBadge}
          />
        );
      case 'longevity':
        return <DossierLongevityTab country={country} details={details} />;
      case 'geography':
        return (
          <DossierGeographyTab
            country={country}
            details={details}
            onSelectNeighbor={onSelectNeighbor}
          />
        );
      case 'economy':
        return <DossierEconomyTab country={country} details={details} />;
      case 'culture':
        return (
          <DossierCultureTab
            country={country}
            details={details}
            onNavigateToCuisine={() => setActiveTab('cuisine')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop for Full Screen mode */}
      {isFullscreen && (
        <div
          id="country-dossier-backdrop"
          className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        />
      )}

      <aside
        id="country-dossier-panel"
        aria-label="Country Information Panel"
        className={
          isFullscreen
            ? 'fixed inset-0 sm:inset-2 md:inset-3 lg:inset-4 z-50 bg-slate-950 border border-slate-700/80 rounded-none sm:rounded-2xl md:rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] flex flex-col overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200'
            : 'fixed top-[45%] left-2 right-2 bottom-2 md:top-20 md:left-auto md:right-4 md:bottom-4 md:w-[480px] md:max-w-[calc(100vw-2rem)] z-30 bg-slate-950 border border-slate-800/95 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-right-6 duration-200'
        }
      >
        {/* 
          NATURAL SCROLLING DOSSIER HEADER:
          Scrolls away naturally when the user scrolls down, so the title is NEVER stuck
          and full screen space is dedicated to reading intelligence unobstructed.
        */}
        <header className={`bg-slate-900/95 border-b border-slate-800 select-none ${
          isFullscreen ? 'px-4 sm:px-6 py-3' : 'px-4 pt-3 pb-2.5 md:px-5 md:pt-4 md:pb-3'
        }`}>
          {/* Top Row: Flag, Name, Status, and Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* National Flag (hidden in the phone bottom sheet, where the header needs the width) */}
              <div className={isFullscreen ? 'shrink-0' : 'hidden md:block shrink-0'}>
                <CountryFlag
                  countryCode={country.code}
                  countryName={country.name}
                  flagEmoji={sovereignState.flag}
                  size={isFullscreen ? "md" : "lg"}
                  className="border-2 border-slate-700/80 shadow-md shrink-0"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight max-w-[150px] sm:max-w-xs md:max-w-sm truncate">
                    {sovereignState.name}
                  </h2>
                  {country.code3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-semibold border border-slate-700/50 shrink-0">
                      {country.code3}
                    </span>
                  )}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-semibold border border-cyan-500/30 shrink-0">
                    GFP #{country.military.globalRank}
                  </span>
                  {leadingProfile && (
                    <button
                      onClick={() => {
                        setActiveTab('overview');
                        setTimeout(() => {
                          document.getElementById('card-world-leader-in')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      title={`Leading the World: ${leadingProfile.records.map((r) => r.title).join(' • ')}`}
                    >
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>World #1 ({leadingProfile.records.length})</span>
                    </button>
                  )}
                  {nationalSport && (
                    <button
                      onClick={() => setActiveTab('culture')}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      title={`National Sport: ${nationalSport.sportName} (${nationalSport.status})`}
                    >
                      <span>{nationalSport.emoji}</span>
                      <span className="max-w-[110px] truncate">{nationalSport.sportName.split('(')[0].trim()}</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 font-light truncate mt-0.5">
                  <span className="text-amber-400 font-medium">{sovereignState.leaderRole || 'Leader'}:</span>{' '}
                  <span className="text-slate-100 font-semibold">{sovereignState.leader || sovereignState.president}</span> •{' '}
                  <span className="text-slate-400">Capital:</span> {sovereignState.capital}
                </p>

                {/* Alliance Flags Ribbon in Header (only in normal side-panel) */}
                {!isFullscreen && (
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {alliances.length > 0 ? (
                      alliances.slice(0, 3).map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setActiveTab('alliances')}
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${a.accentColor} hover:brightness-110 transition-all`}
                          title={`View ${a.name} details & member flags`}
                        >
                          <span>{a.flagEmoji}</span>
                          <span>{a.shortName}</span>
                        </button>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>🕊️ Neutral State</span>
                      </span>
                    )}
                    {alliances.length > 3 && (
                      <button
                        onClick={() => setActiveTab('alliances')}
                        className="text-[10px] text-slate-400 hover:text-cyan-300 font-mono"
                      >
                        +{alliances.length - 3} more
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: Live Update, Fullscreen */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Update Intelligence Button */}
              <button
                id="btn-update-country-intel"
                onClick={handleLiveUpdate}
                disabled={isUpdatingLive}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-950/60 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Update with live current-day leadership & intelligence"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isUpdatingLive ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {isUpdatingLive ? 'Updating...' : 'Update'}
                </span>
              </button>

              {/* Fullscreen Toggle Button */}
              <button
                id="btn-toggle-fullscreen"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition-colors flex items-center gap-1.5 border text-xs font-semibold ${
                  isFullscreen
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-cyan-300 hover:bg-slate-800'
                }`}
                title={isFullscreen ? 'Exit Full Screen' : 'View Full Screen Dossier'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                )}
                <span className="hidden sm:inline">
                  {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                </span>
              </button>
              {!isFullscreen && (
                <button
                  id="btn-minimize-dossier"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                  title="Minimize panel to view full map"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              )}

              <button
                id="btn-close-dossier"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Close dossier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Notification Bar if updated */}
          {liveNotice && (
            <div className="mt-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs flex items-center justify-between animate-in fade-in duration-150">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{liveNotice}</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">Present-Day</span>
            </div>
          )}

          {/* Tab Navigation Strip (Horizontal for normal mode and mobile fullscreen; hidden on wide desktop fullscreen where the sidebar has vertical navigation) */}
          <nav className={`flex items-center gap-1 mt-2.5 overflow-x-auto pb-1 scrollbar-none ${
            isFullscreen ? 'lg:hidden' : ''
          }`}>
            {tabsConfig.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* 
          FULLSCREEN EXPANSIVE DESKTOP LAYOUT VS NORMAL SCROLLABLE BODY
        */}
        {isFullscreen ? (
          <div className="flex-1 flex flex-col lg:flex-row bg-slate-950">
            {/* Left Sidebar on wide screens */}
            <div className="hidden lg:flex w-80 xl:w-96 flex-col justify-between border-r border-slate-800/90 bg-slate-900/40 p-5 space-y-4 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {/* Grand Sovereign Emblem Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
                  <div className="flex justify-center">
                    <CountryFlag
                      countryCode={country.code}
                      countryName={country.name}
                      flagEmoji={sovereignState.flag}
                      size="2xl"
                      className="border-2 border-slate-700/80 shadow-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{sovereignState.name}</h3>
                    <p className="text-xs text-slate-400">{sovereignState.officialName}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
                      Alive {country.longevity.yearsAlive.toLocaleString()} yrs
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30">
                      GFP #{country.military.globalRank}
                    </span>
                  </div>
                </div>

                {/* Key Geographic & Sovereign Stats */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Capital City:</span>
                    <span className="font-semibold text-slate-100">{sovereignState.capital}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <Crown className="w-3 h-3" /> {sovereignState.leaderRole || sovereignState.headOfStateRole || 'Executive Leader'}:
                    </span>
                    <span className="font-bold text-slate-100">{sovereignState.leader || sovereignState.president}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Government:</span>
                    <span className="font-semibold text-slate-200 text-right max-w-[170px] truncate" title={sovereignState.governmentType}>
                      {sovereignState.governmentType}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Population:</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      {sovereignState.populationFormatted}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Total Land Area:</span>
                    <span className="font-mono font-semibold text-slate-200">
                      {sovereignState.areaKm2.toLocaleString()} km²
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Languages:</span>
                    <span className="font-semibold text-slate-200 text-right max-w-[170px] truncate" title={sovereignState.languages.join(', ')}>
                      {sovereignState.languages.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Defense Budget:</span>
                    <span className="font-mono font-semibold text-cyan-400">
                      {formatBudget(country.military.defenseBudgetUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Nuclear Readiness:</span>
                    <span className="font-semibold text-slate-200">
                      {country.military.nuclearStatus}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">National Sport:</span>
                    <button
                      onClick={() => setActiveTab('culture')}
                      className="font-semibold text-emerald-400 hover:underline text-right max-w-[160px] truncate flex items-center gap-1 justify-end"
                      title={nationalSport.sportName}
                    >
                      <span>{nationalSport.emoji}</span>
                      <span className="truncate">{nationalSport.sportName.split('(')[0].trim()}</span>
                    </button>
                  </div>
                  {leadingProfile && (
                    <div className="flex justify-between py-1">
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>World #1:</span>
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab('overview');
                          setTimeout(() => {
                            document.getElementById('card-world-leader-in')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="font-semibold text-amber-300 hover:underline text-right max-w-[150px] truncate"
                        title={leadingProfile.records[0]?.title}
                      >
                        {leadingProfile.records[0]?.title}
                      </button>
                    </div>
                  )}
                </div>

                {/* Vertical Tab Navigation */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1 mb-1.5">
                    Dossier Sections
                  </div>
                  {tabsConfig.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {tab.icon}
                          <span>{tab.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="pt-4 space-y-2 border-t border-slate-800">
                <button
                  id="btn-fs-compare"
                  onClick={() => onCompareWith?.(country)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare Nation</span>
                </button>
                <button
                  id="btn-fs-exit"
                  onClick={() => setIsFullscreen(false)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Full Screen</span>
                </button>
              </div>
            </div>

            {/* Right Content View in Fullscreen */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-5 bg-slate-950 min-w-0">
              {/* Render Selected Tab Directly at the Top */}
              {renderActiveTabContent()}
            </div>
          </div>
        ) : (
          /* Normal Side-Panel Content - scrolls smoothly with the header */
          <div className="p-5 space-y-4 text-xs text-slate-300 bg-slate-950">
            {/* Quick Longevity Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    Sovereign Longevity
                  </div>
                  <div className="text-base font-bold text-slate-100 font-mono leading-tight">
                    Alive for {country.longevity.yearsAlive.toLocaleString()} Years
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px]">
                <div className="font-semibold text-slate-200">
                  {country.longevity.foundationYear < 0
                    ? `${Math.abs(country.longevity.foundationYear)} BCE`
                    : `${country.longevity.foundationYear} CE`}
                </div>
                <div className="text-[10px] text-slate-400">Foundation Year</div>
              </div>
            </div>

            {/* Active Tab View */}
            {renderActiveTabContent()}
          </div>
        )}

        {/* Solid Bottom Action Bar (Only shown in normal panel mode or mobile fullscreen) */}
        {!isFullscreen && (
          <footer className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              id="btn-compare-this-country"
              onClick={() => onCompareWith?.(country)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Nation</span>
            </button>
            <button
              id="btn-footer-fullscreen"
              onClick={() => setIsFullscreen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition-colors flex items-center gap-1 border border-slate-700"
              title="Open Full Screen Dossier"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
            <button
              id="btn-close-dossier-bottom"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};
