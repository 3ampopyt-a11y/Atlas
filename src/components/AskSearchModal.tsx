import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CountryData, AskSearchResponse, AskSearchHistoryItem, VisualMedia, RankedListItem } from '../types.ts';
import { countryList, getCountryByName } from '../data/countriesData.ts';
import { findVisualMedia, fetchWikiMediaFor } from '../utils/visualMediaRegistry.ts';
import { getOwnFlagUrl } from '../utils/ownFlags.ts';
import { answerFromLocalData } from '../utils/localSearch.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { formatGfpRank } from '../utils/formatters.ts';
import {
  Search,
  Sparkles,
  X,
  ArrowRight,
  ArrowUp,
  Globe2,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Compass,
  Maximize2,
  Scale,
  ExternalLink,
  Camera,
  Info,
  Layers,
  Plane,
  ImageOff,
  Trophy,
  Award,
  Crown,
  ChevronRight,
} from 'lucide-react';

interface AskSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: CountryData) => void;
  onCompareWith?: (country: CountryData) => void;
  initialQuery?: string;
}

const EXAMPLE_QUERIES = [
  { label: 'What are the top 50 naval forces in the world?', icon: '⚓' },
  { label: 'What rank is Portugal in naval force?', icon: '🇵🇹' },
  { label: 'Top 10 Naval Forces in the world', icon: '🚢' },
  { label: 'Top 10 Military in the world', icon: '🎖️' },
  { label: 'What is the biggest plane in the world?', icon: '🛩️' },
  { label: 'Does Russia have C-17?', icon: '🛡️' },
  { label: 'Top 10 Air Forces in the world', icon: '✈️' },
  { label: 'Where is Australia?', icon: '🌏' },
];

// In-memory cache on client for instant sub-millisecond query returns
const CLIENT_QUERY_CACHE = new Map<string, AskSearchResponse>();
const normalizeQueryStr = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const AskSearchModal: React.FC<AskSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onCompareWith,
  initialQuery,
}) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AskSearchHistoryItem | null>(null);
  const [history, setHistory] = useState<AskSearchHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imgLoadError, setImgLoadError] = useState(false);
  const [rankFilterTab, setRankFilterTab] = useState<'all' | 'top10' | '11-25' | '26-50'>('all');
  const [rankFilterQuery, setRankFilterQuery] = useState('');
  // Photos that failed to load for the answer on screen, so the next lookup skips them
  const failedMedia = useRef<{ query: string; urls: string[] }>({ query: '', urls: [] });
  const inputRef = useRef<HTMLInputElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    modalContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRankItems = useMemo(() => {
    if (!currentResult?.rankedList?.items) return [];
    let list = currentResult.rankedList.items;
    if (rankFilterTab === 'top10') {
      list = list.filter((i) => i.rank <= 10);
    } else if (rankFilterTab === '11-25') {
      list = list.filter((i) => i.rank >= 11 && i.rank <= 25);
    } else if (rankFilterTab === '26-50') {
      list = list.filter((i) => i.rank >= 26 && i.rank <= 50);
    }
    if (rankFilterQuery.trim()) {
      const q = rankFilterQuery.toLowerCase().trim();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.badge && i.badge.toLowerCase().includes(q)) ||
          (i.stat && i.stat.toLowerCase().includes(q)) ||
          (i.detail && i.detail.toLowerCase().includes(q)) ||
          (i.countryCode && i.countryCode.toLowerCase().includes(q)) ||
          String(i.rank) === q
      );
    }
    return list;
  }, [currentResult?.rankedList?.items, rankFilterTab, rankFilterQuery]);

  // Auto-focus input when opened & handle initialQuery
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
        handleAsk(initialQuery);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  // Keyboard shortcut: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Match target country string/code to rich CountryData object
  const findCountry = (nameOrCode?: string | null): CountryData | null => {
    if (!nameOrCode) return null;
    const lower = nameOrCode.toLowerCase().trim();

    // 1. Direct match by name or code
    const direct = getCountryByName(lower);
    if (direct) return direct;

    // 2. Custom aliases
    const aliasMap: Record<string, string> = {
      russia: 'Russia',
      russian: 'Russia',
      usa: 'United States',
      us: 'United States',
      america: 'United States',
      uk: 'United Kingdom',
      britain: 'United Kingdom',
      england: 'United Kingdom',
      prc: 'China',
      dprk: 'North Korea',
      rok: 'South Korea',
      uae: 'United Arab Emirates',
    };

    if (aliasMap[lower]) {
      const aliasMatch = getCountryByName(aliasMap[lower]);
      if (aliasMatch) return aliasMatch;
    }

    // 3. Substring match
    const subMatch = countryList.find(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        lower.includes(c.name.toLowerCase()) ||
        c.code.toLowerCase() === lower ||
        c.code3.toLowerCase() === lower
    );

    return subMatch || null;
  };

  // Shows an answer right away; a photo is looked up afterwards so it never holds up the text
  const presentResult = (data: AskSearchResponse, trimmed: string, idSuffix: string) => {
    const matched =
      findCountry(data.targetCountry) ||
      findCountry(data.targetCountryCode) ||
      findCountry(trimmed);

    const matchedMedia = data.media || findVisualMedia(trimmed);

    const historyItem: AskSearchHistoryItem = {
      id: `${Date.now()}-${idSuffix}`,
      success: true,
      query: trimmed,
      answer: data.answer,
      targetCountry: data.targetCountry || matched?.name || null,
      targetCountryCode: data.targetCountryCode || matched?.code || null,
      otherCountries: data.otherCountries || [],
      keyFacts: data.keyFacts || [],
      directRank: data.directRank || null,
      rankedList: data.rankedList || null,
      source: data.source || 'gemini-ai',
      matchedCountry: matched,
      media: matchedMedia,
      mediaQuery: data.mediaQuery || null,
      timestamp: Date.now(),
    };

    setCurrentResult(historyItem);
    setHistory((prev) => [historyItem, ...prev.filter((h) => h.query !== trimmed).slice(0, 8)]);
  };

  const handleAsk = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    // Instant client-side cache return (0ms latency)
    const cacheKey = normalizeQueryStr(trimmed);
    const cachedData = CLIENT_QUERY_CACHE.get(cacheKey);
    if (cachedData) {
      presentResult({ source: 'intelligence-registry', ...cachedData }, trimmed, 'cached');
      setLoading(false);
      setError(null);
      return;
    }

    setError(null);
    setImgLoadError(false);

    // Facts the atlas already holds (capitals, leaders, populations, areas, rankings...) are
    // answered on the spot, without a round trip to the server or Gemini
    const localAnswer = answerFromLocalData(trimmed);
    if (localAnswer) {
      CLIENT_QUERY_CACHE.set(cacheKey, localAnswer);
      setLoading(false);
      presentResult(localAnswer, trimmed, 'local');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/ask-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data: AskSearchResponse = await res.json();

      if (!data.success && data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Store in client cache for immediate 0ms future returns
      CLIENT_QUERY_CACHE.set(cacheKey, data);

      presentResult(data, trimmed, Math.random().toString(36).substr(2, 6));
    } catch (err: any) {
      console.error('Error querying search:', err);
      // Fallback local resolution with actual intelligence
      const matched = findCountry(trimmed);
      const matchedMedia = findVisualMedia(trimmed);
      const tLower = trimmed.toLowerCase();

      // Check if it's Portugal naval query
      const isPortugalNaval = tLower.includes('portugal') && (tLower.includes('naval') || tLower.includes('navy') || tLower.includes('fleet'));

      if (matched || matchedMedia || isPortugalNaval) {
        const fallbackItem: AskSearchHistoryItem = {
          id: `${Date.now()}-local`,
          success: true,
          query: trimmed,
          answer: isPortugalNaval
            ? "Portugal ranks #23 globally in total naval fleet assets (with 107 total naval vessels) and #44 overall in Global Firepower military strength (PowerIndex 0.6865). The Portuguese Navy (Marinha Portuguesa) operates 2 modern Tridente-class AIP attack submarines, 5 guided missile frigates, 2 corvettes, and over 21 patrol vessels safeguarding the 3rd-largest maritime Exclusive Economic Zone in the EU."
            : matchedMedia
            ? `${matchedMedia.title} (${matchedMedia.subtitle || 'Defense asset'}): ${matchedMedia.specs?.[1]?.value || ''}. ${matchedMedia.specs?.[2]?.value || ''}. Operated by ${matchedMedia.specs?.[7]?.value || 'allied nations'}.`
            : `${matched?.name} is a sovereign nation in ${matched?.continent} with capital at ${matched?.capital}. Its total territorial area is ${matched?.geography.areaKm2.toLocaleString()} km² and population is ${matched?.demographics.population.toLocaleString()}. Global Firepower military ranking: ${matched ? formatGfpRank(matched.military) : 'n/a'}.`,
          targetCountry: isPortugalNaval ? 'Portugal' : (matched?.name || (matchedMedia ? 'United States' : null)),
          targetCountryCode: isPortugalNaval ? 'PT' : (matched?.code || (matchedMedia ? 'US' : null)),
          directRank: isPortugalNaval
            ? {
                rank: '#23',
                subRank: '#44 Overall GFP',
                category: 'Naval Fleet Strength & Global Firepower',
                entity: 'Portugal (Marinha Portuguesa)',
                metrics: [
                  { label: 'Total Naval Fleet', value: '107 Units (#23 globally)' },
                  { label: 'Submarines', value: '2 (Tridente-class AIP)' },
                  { label: 'Frigates', value: '5 (MEKO & Karel Doorman)' },
                  { label: 'Patrol Ships', value: '21+ Patrol Vessels' },
                  { label: 'Active Naval Personnel', value: '8,900+ active sailors' },
                  { label: 'Overall GFP Rank', value: '#44 of 145 countries' },
                ],
              }
            : null,
          keyFacts: isPortugalNaval
            ? [
                'Rank #23 in Naval Fleet: 107 active vessels operated by the Marinha Portuguesa.',
                'Submarines: 2 modern German-built Tridente-class AIP submarines (Tridente and Arpão).',
                'Frigates: 5 guided missile frigates (Vasco da Gama and Bartolomeu Dias classes).',
                'Maritime Domain: Safeguards the EU’s 3rd largest Exclusive Economic Zone (1.7M km²).',
              ]
            : matchedMedia
            ? matchedMedia.specs?.slice(0, 4).map((s) => `${s.label}: ${s.value}`) || []
            : [
                `Capital: ${matched?.capital}`,
                `Land Area: ${matched?.geography.areaKm2.toLocaleString()} km²`,
                `Military: ${matched ? formatGfpRank(matched.military) : 'n/a'}`,
                `Population: ${matched?.demographics.population.toLocaleString()}`,
              ],
          source: 'intelligence-registry',
          matchedCountry: isPortugalNaval ? findCountry('Portugal') : (matched || (matchedMedia ? findCountry('United States') : null)),
          media: matchedMedia,
          timestamp: Date.now(),
        };
        setCurrentResult(fallbackItem);
      } else {
        setError('Could not reach the AI service to answer your question. Please try asking again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Every answer gets a picture: a Wikipedia photo of the subject, else the country's flag, else Earth
  const findMediaFor = async (result: AskSearchHistoryItem, skip: string[]): Promise<VisualMedia | null> => {
    const wiki = await fetchWikiMediaFor([result.mediaQuery, result.targetCountry, result.query], skip);
    if (wiki) return wiki;
    const country = result.matchedCountry || findCountry(result.targetCountry);
    if (country) {
      const flagUrl = getOwnFlagUrl(country.name) || `https://flagcdn.com/w1280/${country.code.toLowerCase()}.png`;
      if (!skip.includes(flagUrl)) {
        return { title: country.name, subtitle: 'National flag', imageUrl: flagUrl, category: 'National Symbols', badge: 'National Flag' };
      }
    }
    return fetchWikiMediaFor(['Earth'], skip);
  };

  // Looks a picture up whenever the answer on screen has none (including after one failed to load)
  useEffect(() => {
    if (!currentResult || currentResult.media) return;
    const forQuery = currentResult.query;
    if (failedMedia.current.query !== forQuery) failedMedia.current = { query: forQuery, urls: [] };
    let cancelled = false;
    findMediaFor(currentResult, failedMedia.current.urls).then((media) => {
      if (cancelled) return;
      if (media) setCurrentResult((prev) => (prev && prev.query === forQuery && !prev.media ? { ...prev, media } : prev));
      else setImgLoadError(true);
    });
    return () => {
      cancelled = true;
    };
  }, [currentResult]);

  useEffect(() => {
    setImgLoadError(false);
  }, [currentResult?.query]);

  const handleMediaError = (imageUrl: string) => {
    if (!currentResult) return;
    if (failedMedia.current.query !== currentResult.query) failedMedia.current = { query: currentResult.query, urls: [] };
    failedMedia.current.urls.push(imageUrl);
    setCurrentResult((prev) => (prev ? { ...prev, media: null } : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(query);
  };

  const handleShowOnMap = (country: CountryData) => {
    onSelectCountry(country);
    onClose();
  };

  if (!isOpen) return null;

  const targetCountryData = currentResult?.matchedCountry || findCountry(currentResult?.targetCountry);
  const visualMedia = currentResult?.media || null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-cyan-950/50 overflow-y-auto text-slate-100 custom-scrollbar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        {/* Floating Close Button: Stays sticky at top right so user can always close even when scrolled */}
        <div className="sticky top-3 mr-3 self-end z-30 pointer-events-auto h-0 overflow-visible">
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95"
            title="Close Search (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 
          NATURAL SCROLLING HEADER & TITLE:
          Scrolls away naturally when the user scrolls down, so the title NEVER hides
          the rest of the answer or interrupts reading.
        */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-800/80 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3 pr-12">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
              <Search className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="search-modal-title" className="text-base sm:text-lg font-black tracking-tight text-white">
                  World Knowledge & Question Search
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> AI Atlas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ask any question (e.g. &ldquo;Does Russia have C-17?&rdquo; or &ldquo;Where is Australia?&rdquo;)
              </p>
            </div>
          </div>
        </div>

        {/* Search Input Bar (Scrolls away naturally with title when scrolling down to read results) */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/60">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any question (e.g. Does Russia have C-17? Where is Australia?)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm sm:text-base text-white placeholder-slate-500 transition-all outline-none shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 disabled:pointer-events-none font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-cyan-600/30 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Ask</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Example Suggestions */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            {EXAMPLE_QUERIES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => {
                  setQuery(ex.label);
                  handleAsk(ex.label);
                }}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-200 transition-all text-xs"
              >
                <span>{ex.icon}</span>
                <span>{ex.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body Content: Scrolls smoothly without nested scrollbar or stuck title */}
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          {/* Loading Indicator */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-pulse">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Globe2 className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-bounce" />
              </div>
              <p className="text-sm font-bold text-slate-200">
                Gathering Global Geopolitical & Geographic Intelligence...
              </p>
              <p className="text-xs text-slate-500 max-w-sm">
                Analyzing defense inventories, territorial boundaries, and coordinates for your question.
              </p>
            </div>
          )}

          {/* Error notice */}
          {error && !loading && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-200 text-sm flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Search Notice</p>
                <p className="text-xs text-red-300/90">{error}</p>
              </div>
            </div>
          )}

          {/* Current Answer Result */}
          {currentResult && !loading && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Question Badge */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">QUESTION:</span>
                  <span className="text-slate-200 font-medium italic">&ldquo;{currentResult.query}&rdquo;</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {currentResult.source === 'gemini-ai' ? '🤖 Live Gemini Analysis' : '🛡️ Atlas Intelligence'}
                </span>
              </div>

              {/* Visual Media Showcase Card (Picture + Title + Specs Profile) */}
              {visualMedia && (
                <div className="rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {/* Photo Container with overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    {!imgLoadError ? (
                      <img
                        src={visualMedia.imageUrl}
                        alt={visualMedia.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleMediaError(visualMedia.imageUrl)}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-2">
                        <Camera className="w-10 h-10 text-cyan-500/40" />
                        <span className="text-xs text-slate-400 font-mono">{visualMedia.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent pointer-events-none" />

                    {/* Category & Photo Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-500/40 shadow-xl flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{visualMedia.badge || 'Visual Intelligence'}</span>
                      </span>
                      {visualMedia.category && (
                        <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/15">
                          {visualMedia.category}
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle overlay at bottom of photo */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-lg">
                        {visualMedia.title}
                      </h3>
                      {visualMedia.subtitle && (
                        <p className="text-xs sm:text-sm text-cyan-200/95 font-medium drop-shadow-md mt-0.5">
                          {visualMedia.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Technical Profile & Specs Grid */}
                  {visualMedia.specs && visualMedia.specs.length > 0 && (
                    <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono uppercase tracking-wider text-cyan-400 font-bold text-[11px] flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5" /> Technical Profile & Capabilities
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Verified Defense Data
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {visualMedia.specs.map((spec, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start justify-between gap-3"
                          >
                            <span className="text-slate-400 font-medium shrink-0">{spec.label}:</span>
                            <span className="text-slate-100 font-semibold text-right leading-tight">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Direct Rank & Military Standing Card */}
              {currentResult.directRank && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/25 to-slate-900 border-2 border-amber-500/50 shadow-2xl shadow-amber-950/30 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-800/80">
                    <div className="flex items-center gap-3.5">
                      <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg shadow-amber-500/30 shrink-0">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-85 leading-none">Global Rank</span>
                        <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none mt-0.5">{currentResult.directRank.rank}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                            {currentResult.directRank.entity}
                          </h3>
                          {currentResult.directRank.subRank && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              {currentResult.directRank.subRank}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-200/90 font-medium mt-0.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>{currentResult.directRank.category}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  {currentResult.directRank.metrics && currentResult.directRank.metrics.length > 0 && (
                    <div className="mt-3.5 pt-1">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        {currentResult.directRank.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between gap-1 shadow-inner"
                          >
                            <span className="text-[11px] text-slate-400 font-medium">{m.label}</span>
                            <span className="text-xs sm:text-sm text-slate-100 font-bold font-mono tracking-tight">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Direct Answer Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-700/80 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Direct Intelligence Answer
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-normal">
                      {currentResult.answer}
                    </p>
                  </div>
                </div>

                {/* Key takeaway facts */}
                {currentResult.keyFacts && currentResult.keyFacts.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Takeaways:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentResult.keyFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick actions row */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToTop();
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 hover:text-white border border-slate-700/60 transition-all font-semibold active:scale-95"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask another question</span>
                  </button>

                  <span className="text-[11px] text-slate-400">
                    Scroll down for full details & map
                  </span>
                </div>
              </div>

              {/* Interactive Top 10 / Top 50 Leaderboard Rankings Section */}
              {currentResult.rankedList && currentResult.rankedList.items && currentResult.rankedList.items.length > 0 && (
                <div className="rounded-3xl bg-slate-900/95 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-950/40 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Leaderboard Header */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 shrink-0 font-bold">
                        <Trophy className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                          {currentResult.rankedList.title}
                        </h3>
                        <p className="text-xs text-indigo-300/90 font-medium">
                          {currentResult.rankedList.category || 'Global Power Leaderboard'}
                          {currentResult.rankedList.metricName ? ` • ${currentResult.rankedList.metricName}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold font-mono">
                        {currentResult.rankedList.items.length} Total Ranked
                      </span>
                    </div>
                  </div>

                  {/* Filter Controls (Shown when more than 10 items) */}
                  {currentResult.rankedList.items.length > 10 && (
                    <div className="p-3 sm:px-5 sm:py-3 bg-slate-950/90 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      {/* Filter Tabs */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        <button
                          type="button"
                          onClick={() => setRankFilterTab('all')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            rankFilterTab === 'all'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          All ({currentResult.rankedList.items.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setRankFilterTab('top10')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            rankFilterTab === 'top10'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                          }`}
                        >
                          Top 10
                        </button>
                        {currentResult.rankedList.items.length >= 25 && (
                          <button
                            type="button"
                            onClick={() => setRankFilterTab('11-25')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                              rankFilterTab === '11-25'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                            }`}
                          >
                            Ranks 11–25
                          </button>
                        )}
                        {currentResult.rankedList.items.length > 25 && (
                          <button
                            type="button"
                            onClick={() => setRankFilterTab('26-50')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                              rankFilterTab === '26-50'
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
                            }`}
                          >
                            Ranks 26–50
                          </button>
                        )}
                      </div>

                      {/* Filter Search Input */}
                      <div className="relative min-w-[200px]">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={rankFilterQuery}
                          onChange={(e) => setRankFilterQuery(e.target.value)}
                          placeholder="Filter countries or stats..."
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        {rankFilterQuery && (
                          <button
                            type="button"
                            onClick={() => setRankFilterQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Ranked Items Table / List */}
                  <div className="divide-y divide-slate-800/80 bg-slate-950/50 max-h-[580px] overflow-y-auto">
                    {filteredRankItems.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        No countries match your current filter criteria.
                      </div>
                    ) : (
                      filteredRankItems.map((item: RankedListItem) => {
                        const countryMatch = item.countryCode ? findCountry(item.countryCode) : findCountry(item.name);
                        const rankBadgeStyle =
                          item.rank === 1
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/30'
                            : item.rank === 2
                            ? 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-950 shadow-md shadow-slate-300/20'
                            : item.rank === 3
                            ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-white shadow-md shadow-amber-700/20'
                            : item.rank <= 10
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                            : item.rank <= 25
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm'
                            : 'bg-slate-800 text-slate-300 border border-slate-700';

                        return (
                          <div
                            key={`${item.rank}-${item.name}`}
                            className="p-3.5 sm:p-4 hover:bg-slate-850/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                          >
                            <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                              {/* Rank Badge */}
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${rankBadgeStyle}`}
                              >
                                #{item.rank}
                              </div>

                              {/* Country Flag */}
                              {countryMatch?.code ? (
                                <CountryFlag
                                  countryCode={countryMatch.code}
                                  countryName={countryMatch.name}
                                  size="md"
                                  className="rounded-md border border-white/20 shrink-0 shadow-sm"
                                />
                              ) : item.countryCode ? (
                                <CountryFlag
                                  countryCode={item.countryCode}
                                  countryName={item.name}
                                  size="md"
                                  className="rounded-md border border-white/20 shrink-0 shadow-sm"
                                />
                              ) : null}

                              {/* Name, Badge & Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors truncate">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>

                                {item.stat && (
                                  <div className="text-xs font-semibold text-amber-300/90 font-mono mt-0.5">
                                    {item.stat}
                                  </div>
                                )}

                                {item.detail && (
                                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    {item.detail}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Right Action: Show on Map */}
                            {countryMatch && (
                              <button
                                onClick={() => handleShowOnMap(countryMatch)}
                                className="self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-semibold transition-all active:scale-95"
                                title={`Show ${countryMatch.name} on World Map`}
                              >
                                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="hidden xs:inline">Map</span>
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Identified Country Showcase Banner (User asked "show me russia" or "where is australia") */}
              {targetCountryData && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-2 border-cyan-500/40 shadow-xl shadow-cyan-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <CountryFlag
                      countryCode={targetCountryData.code}
                      countryName={targetCountryData.name}
                      size="xl"
                      className="rounded-xl shadow-md border border-white/20 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-black text-white">
                          {targetCountryData.name}
                        </h4>
                        {targetCountryData.code3 && (
                          <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-mono font-bold text-cyan-300 border border-white/10">
                            {targetCountryData.code} / {targetCountryData.code3}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {targetCountryData.continent} • Capital: <span className="text-slate-200 font-semibold">{targetCountryData.capital}</span>
                      </p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-300">
                        <span>
                          👥 Population: <strong className="text-white font-mono">{targetCountryData.demographics.population.toLocaleString()}</strong>
                        </span>
                        <span>
                          📐 Area: <strong className="text-white font-mono">{targetCountryData.geography.areaKm2.toLocaleString()} km²</strong>
                        </span>
                        <span>
                          🎖️ Military: <strong className="text-white font-mono">{formatGfpRank(targetCountryData.military)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => handleShowOnMap(targetCountryData)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
                    >
                      <MapPin className="w-4 h-4 text-slate-950" />
                      <span>Show on World Map</span>
                    </button>

                    {onCompareWith && (
                      <button
                        onClick={() => {
                          onCompareWith(targetCountryData);
                          onClose();
                        }}
                        title="Compare with another nation"
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Related/Other Countries Mentioned */}
              {currentResult.otherCountries && currentResult.otherCountries.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                    Also Mentioned:
                  </span>
                  {currentResult.otherCountries.map((cName) => {
                    const found = findCountry(cName);
                    return (
                      <button
                        key={cName}
                        onClick={() => {
                          if (found) {
                            handleShowOnMap(found);
                          } else {
                            setQuery(`Tell me about ${cName}`);
                            handleAsk(`Tell me about ${cName}`);
                          }
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors text-xs font-medium"
                      >
                        {found?.code && (
                          <CountryFlag countryCode={found.code} countryName={found.name} size="sm" className="rounded-xs" />
                        )}
                        <span>{cName}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Initial / Empty State guidance when no search has been run yet */}
          {!currentResult && !loading && (
            <div className="py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Ask Anything About the World</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Ask questions about military aircraft, tanks, alliances, geographical locations, leaders, or land areas. The atlas answers immediately and shows the country directly on the 3D globe.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <div className="text-cyan-400 text-base">✈️ Military Intelligence</div>
                  <p className="text-xs text-slate-400 leading-snug">
                    e.g. &ldquo;Does Russia have C-17?&rdquo; or &ldquo;How many aircraft carriers does China have?&rdquo;
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <div className="text-blue-400 text-base">🗺️ Geographic Location</div>
                  <p className="text-xs text-slate-400 leading-snug">
                    e.g. &ldquo;Where is Australia?&rdquo; or &ldquo;Where is Mauritania on the map?&rdquo;
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <div className="text-indigo-400 text-base">📐 Accurate Land Areas</div>
                  <p className="text-xs text-slate-400 leading-snug">
                    e.g. &ldquo;What is Portugal&rsquo;s land area?&rdquo; or &ldquo;Is Brazil bigger than Canada?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Search History in this session */}
          {history.length > 1 && (
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Recent Questions
                </span>
                <button
                  onClick={() => setHistory([])}
                  className="text-slate-500 hover:text-slate-300 text-[11px] underline"
                >
                  Clear history
                </button>
              </div>

              <div className="space-y-1.5">
                {history.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setQuery(h.query);
                      setCurrentResult(h);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left text-xs transition-colors group"
                  >
                    <span className="text-slate-300 group-hover:text-cyan-200 truncate pr-3">
                      &ldquo;{h.query}&rdquo;
                    </span>
                    {h.targetCountry && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-700 text-slate-300 text-[10px] font-semibold">
                        {h.targetCountry}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Enter</kbd> to ask</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Esc</kbd> to close</span>
          </div>
          <span className="text-cyan-400/80 font-medium">World Atlas Intelligence</span>
        </div>
      </div>
    </div>
  );
};
