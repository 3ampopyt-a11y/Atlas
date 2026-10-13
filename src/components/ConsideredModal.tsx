import React, { useState, useMemo } from 'react';
import { CountryData } from '../types.ts';
import { countryList, getCountryByName } from '../data/countriesData.ts';
import {
  CONSIDERED_ITEMS,
  CONSIDERED_CATEGORIES,
  ConsideredCategory,
  ConsideredItem,
} from '../utils/consideredData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import {
  X,
  Award,
  Sparkles,
  Search,
  Scale,
  ExternalLink,
  Utensils,
  Shield,
  Clock,
  Landmark,
  TreePine,
  Coffee,
  Trophy,
  CheckCircle2,
} from 'lucide-react';

interface ConsideredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: CountryData) => void;
  onCompareWith?: (country: CountryData) => void;
}

export const ConsideredModal: React.FC<ConsideredModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  onCompareWith,
}) => {
  const [activeCategory, setActiveCategory] = useState<ConsideredCategory>('food');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered items based on active category and search
  const filteredItems = useMemo(() => {
    let list = CONSIDERED_ITEMS;

    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.countryName.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.crownFeature.toLowerCase().includes(q) ||
          item.whyConsidered.toLowerCase().includes(q) ||
          item.accolades.some((a) => a.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const handleOpenCountry = (item: ConsideredItem) => {
    const found =
      countryList.find((c) => c.code === item.countryCode || c.id === item.countryId) ||
      getCountryByName(item.countryName);

    if (found) {
      onSelectCountry(found);
      onClose();
    }
  };

  const handleCompareCountry = (item: ConsideredItem) => {
    const found =
      countryList.find((c) => c.code === item.countryCode || c.id === item.countryId) ||
      getCountryByName(item.countryName);

    if (found && onCompareWith) {
      onCompareWith(found);
      onClose();
    }
  };

  return (
    <div
      id="considered-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="considered-modal-panel"
        className="w-full max-w-5xl max-h-[92vh] bg-slate-950 border border-slate-700/80 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Minimal Close Button */}
        <button
          onClick={onClose}
          id="btn-close-considered-modal"
          className="sticky top-3 right-3 self-end -mb-9 mr-3 z-30 p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-md backdrop-blur-sm transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Natural Scrolling Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-5 sm:px-6 py-4 pr-14 select-none">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 shrink-0">
                <Award className="w-5 h-5 font-bold" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
                    Considered Best in the World
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40">
                    World Titles & Accolades
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Countries globally recognized & considered to have the best food, strongest defense, oldest longevity, and richest heritage
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar & Quick Stats */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, food (e.g. 'pizza', 'sushi', 'tacos'), military, heritage..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500/60 focus:outline-none text-xs text-slate-200 placeholder:text-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between sm:justify-end gap-2 px-1">
              <span>Showing:</span>
              <span className="text-amber-300 font-bold">{filteredItems.length} Nations</span>
            </div>
          </div>

          {/* Category Filter Pills Ribbon */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CONSIDERED_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? CONSIDERED_ITEMS.length
                  : CONSIDERED_ITEMS.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold scale-[1.02]'
                      : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive ? 'bg-slate-950/25 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Body: Country Cards - scrolls naturally with header */}
        <div className="p-4 sm:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-bold text-slate-200">No Considered Accolades Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No countries match your search for "{searchQuery}". Try searching for terms like "food", "pasta", "sushi", or "military".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${item.accentColor} border shadow-xl flex flex-col justify-between space-y-3.5 transition-all hover:border-amber-500/60 hover:shadow-2xl hover:scale-[1.005]`}
                >
                  {/* Top Row: Flag, Name, Category and Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CountryFlag
                          countryCode={item.countryCode}
                          countryName={item.countryName}
                          flagEmoji={item.flagEmoji}
                          size="md"
                          className="border border-slate-700/80 shadow-md shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-100">
                              {item.countryName}
                            </h3>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                              {item.countryCode}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {item.categoryLabel}
                          </span>
                        </div>
                      </div>

                      <div className="text-2xl p-1.5 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner shrink-0">
                        {item.icon}
                      </div>
                    </div>

                    {/* Consideration Title Banner */}
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{item.badge}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30 font-mono font-semibold">
                          {item.rankBadge}
                        </span>
                      </div>
                    </div>

                    {/* Crown Feature (e.g. Signature Food or Main Wonder) */}
                    <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-1">
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
                        {item.category === 'food' ? '🍲 Iconic Signature Foods:' : '⭐ Crown Highlight:'}
                      </span>
                      <p className="text-xs font-bold text-slate-100 leading-snug">
                        {item.crownFeature}
                      </p>
                      <span className="text-[10px] text-cyan-300/90 block font-medium">
                        ✦ {item.highlightFact}
                      </span>
                    </div>

                    {/* Why Considered Explanation */}
                    <p className="mt-3 text-xs text-slate-300 leading-relaxed font-normal">
                      {item.whyConsidered}
                    </p>

                    {/* Key Accolades Pills */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Verified Accolades:
                      </span>
                      <div className="space-y-1">
                        {item.accolades.map((acc, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{acc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenCountry(item)}
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Country Dossier</span>
                    </button>

                    {onCompareWith && (
                      <button
                        onClick={() => handleCompareCountry(item)}
                        title="Compare this nation head-to-head"
                        className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Scale className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Compare</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Solid Footer */}
        <footer className="flex-shrink-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Considered in the World</span>
            <span>•</span>
            <span className="text-slate-400">Grounded in UNESCO heritage, global rankings, and international consensus</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
