import React, { useState } from 'react';
import { CountryData, ContinentFilter } from '../types.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { gameAudio } from '../utils/gameAudio.ts';
import { GameDifficulty } from '../utils/gameDifficulty.ts';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  LogOut,
  ChevronDown,
  ChevronUp,
  X,
  Flame,
  Globe2,
  Heart,
  Infinity as InfinityIcon,
} from 'lucide-react';

export interface MapSpotterHudProps {
  targetCountry: CountryData;
  score: number;
  streak: number;
  guessedCount: number;
  totalRounds: number;
  continent: ContinentFilter;
  onChangeContinent: (continent: ContinentFilter) => void;
  playWithLives: boolean;
  onToggleLivesMode: (enabled: boolean) => void;
  lives: number;
  difficulty?: GameDifficulty;
  lastGuessFeedback: {
    status: 'correct' | 'wrong' | 'revealed';
    countryName: string;
    message: string;
  } | null;
  onNextQuestion: () => void;
  onExit: () => void;
  onRestart: () => void;
  isGameOver: boolean;
}

const CONTINENT_OPTIONS: { value: ContinentFilter; label: string }[] = [
  { value: 'All', label: '🌍 Whole World' },
  { value: 'Europe', label: '🇪🇺 Europe' },
  { value: 'Asia', label: '🌏 Asia' },
  { value: 'Africa', label: '🌍 Africa' },
  { value: 'North America', label: '🌎 North America' },
  { value: 'South America', label: '🌎 South America' },
  { value: 'Oceania', label: '🌊 Oceania' },
];

export const MapSpotterHud: React.FC<MapSpotterHudProps> = ({
  targetCountry,
  score,
  streak,
  guessedCount,
  totalRounds,
  continent,
  onChangeContinent,
  playWithLives,
  onToggleLivesMode,
  lives,
  lastGuessFeedback,
  onExit,
  onRestart,
  isGameOver,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(gameAudio.enabled);
  const [clueMode, setClueMode] = useState<'both' | 'name' | 'flag'>('both');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const toggleSound = () => {
    gameAudio.enabled = !gameAudio.enabled;
    setSoundEnabled(gameAudio.enabled);
  };

  const percentConquered = totalRounds > 0 ? Math.round((guessedCount / totalRounds) * 100) : 0;
  const isConqueredAll = guessedCount >= totalRounds && totalRounds > 0;
  const isOutOfLives = playWithLives && lives <= 0;

  // Victory or Game Over Dialog
  if (isGameOver || isConqueredAll) {
    const continentLabel = continent === 'All' ? 'THE ENTIRE WORLD' : continent.toUpperCase();
    return (
      <div
        id="map-spotter-gameover"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      >
        <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl text-center space-y-4">
          <div
            className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
              isConqueredAll
                ? 'bg-gradient-to-tr from-emerald-400 to-cyan-500 shadow-emerald-500/30 animate-bounce'
                : 'bg-gradient-to-tr from-rose-500 to-amber-500 shadow-rose-500/30'
            }`}
          >
            {isConqueredAll ? '🏆' : isOutOfLives ? '💀' : '🏁'}
          </div>

          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                isConqueredAll ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isConqueredAll ? 'CONQUEST COMPLETE!' : isOutOfLives ? 'OUT OF LIVES' : 'CHALLENGE FINISHED'}
            </span>
            <h2 className="text-xl font-black text-slate-100 mt-1">
              {isConqueredAll ? `You Conquered ${continentLabel}!` : isOutOfLives ? 'Game Over!' : 'Good Effort!'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isConqueredAll
                ? `You successfully identified and illuminated all ${totalRounds} countries in ${
                    continent === 'All' ? 'the whole world' : continent
                  }!`
                : `You conquered ${guessedCount} of ${totalRounds} countries in ${
                    continent === 'All' ? 'the world' : continent
                  }.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-xs font-mono">
            <div>
              <div className="text-[10px] uppercase text-slate-400">Total Score</div>
              <div className="text-lg font-black text-amber-300">{score} PTS</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400">Best Streak</div>
              <div className="text-lg font-black text-cyan-300">{streak} 🔥</div>
            </div>
          </div>

          {/* Quick Continent Switcher for Next Conquest */}
          <div className="space-y-1.5 text-left pt-1">
            <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-cyan-400" />
              <span>Conquer Another Region:</span>
            </label>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
              {CONTINENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onChangeContinent(opt.value)}
                  className={`px-2 py-1.5 rounded-xl border text-left transition-all ${
                    continent === opt.value
                      ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={onRestart}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 font-bold text-slate-950 text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
            <button
              onClick={onExit}
              className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ultra-compact Minimized Floating Pill on the side
  if (isMinimized) {
    return (
      <div
        id="map-spotter-hud-minimized"
        className="fixed top-20 sm:top-24 left-3 sm:left-4 z-40 pointer-events-none"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 hover:border-cyan-400 px-3 py-1.5 rounded-2xl shadow-xl text-xs font-bold text-slate-100 transition-all hover:scale-105 group"
          title="Expand Globe Spotter HUD"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-cyan-300 font-mono text-[11px]">🎯 Find:</span>
          <span className="font-black text-white">{clueMode === 'flag' ? 'Mystery Nation' : targetCountry.name}</span>
          <span className="text-[10px] text-slate-400 font-mono">
            ({guessedCount}/{totalRounds})
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
        </button>
      </div>
    );
  }

  // Sleek, Compact Side-Docked HUD (Does NOT block the center map or globe!)
  return (
    <div
      id="map-spotter-hud"
      className="fixed top-20 sm:top-24 left-3 sm:left-4 z-40 w-64 sm:w-72 max-w-[calc(100vw-24px)] pointer-events-none animate-in slide-in-from-left-4 duration-200"
    >
      <div className="pointer-events-auto bg-slate-950/92 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 shadow-2xl space-y-2.5 text-slate-100">
        {/* Top Header Row: Title, Scope, Mini Actions */}
        <div className="flex items-center justify-between gap-1.5 border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded-md shrink-0">
              🎯 SPOTTER
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold truncate">
              {continent === 'All' ? 'Infinite World' : continent}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
              title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 transition-colors"
              title="Minimize HUD to small pill"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>

            {/* Exit (single 'X') */}
            <button
              id="btn-spotter-exit-x"
              onClick={onExit}
              className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition-all"
              title="Exit Spotter Challenge (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Region & Infinite vs Lives Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Region Select */}
          <select
            value={continent}
            onChange={(e) => onChangeContinent(e.target.value as ContinentFilter)}
            className="flex-1 bg-slate-900 border border-slate-700/80 text-slate-200 text-[11px] font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-cyan-500/50 transition-colors min-w-0 truncate"
            title="Choose continent or Whole World to conquer"
          >
            {CONTINENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Infinite vs Lives Mode Toggle */}
          <button
            onClick={() => onToggleLivesMode(!playWithLives)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 border transition-all shrink-0 ${
              playWithLives
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
            }`}
            title={playWithLives ? 'Playing with 3 lives (Click to switch to Infinite)' : 'Playing Infinite mode (Click to switch to 3 Lives)'}
          >
            {playWithLives ? (
              <>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>3 Lives</span>
              </>
            ) : (
              <>
                <InfinityIcon className="w-3 h-3 text-emerald-400" />
                <span>Infinite</span>
              </>
            )}
          </button>
        </div>

        {/* Repositioned Prominent Flag & Target Country Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center text-center space-y-1.5 shadow-inner">
          {/* Dedicated Prominent Flag Showcase at the top */}
          {clueMode !== 'name' ? (
            <div className="p-1 bg-slate-950/80 rounded-xl border border-slate-700/70 shadow-md">
              <CountryFlag
                countryCode={targetCountry.code}
                countryName={targetCountry.name}
                flagEmoji={targetCountry.flag}
                size="lg"
              />
            </div>
          ) : (
            <div className="w-12 h-8 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-base shadow-md">
              🌐
            </div>
          )}

          {/* Target Country Name */}
          <div className="w-full">
            <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-semibold leading-tight">
              {clueMode === 'flag' ? 'Spot This Flag on the Globe' : 'Find & Click on Globe'}
            </div>
            <h3 className="text-sm sm:text-base font-black text-white truncate leading-tight mt-0.5">
              {clueMode === 'flag' ? 'Mystery Nation' : targetCountry.name}
            </h3>
          </div>

          {/* Clue Mode Toggle */}
          <div className="flex items-center gap-0.5 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-[9px] font-bold">
            <button
              onClick={() => setClueMode('both')}
              className={`px-2 py-0.5 rounded transition-colors ${
                clueMode === 'both' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Show Name & Flag"
            >
              Both
            </button>
            <button
              onClick={() => setClueMode('name')}
              className={`px-2 py-0.5 rounded transition-colors ${
                clueMode === 'name' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Show Name Only"
            >
              Name Only
            </button>
            <button
              onClick={() => setClueMode('flag')}
              className={`px-2 py-0.5 rounded transition-colors ${
                clueMode === 'flag' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Show Flag Only"
            >
              Flag Only
            </button>
          </div>
        </div>

        {/* Progress & Conquest Bar (Pure gameplay without hint/reveal cheats) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <span>Conquered:</span>
              <span className="text-white">{guessedCount}</span>
              <span>/</span>
              <span>{totalRounds}</span>
              <span className="text-[9px] text-emerald-300">({percentConquered}%)</span>
            </span>

            <div className="flex items-center gap-2 font-bold">
              {/* Hearts if in Lives Mode */}
              {playWithLives && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs transition-opacity ${
                        i < lives ? 'opacity-100 scale-100' : 'opacity-20 scale-75 grayscale'
                      }`}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
              )}

              <span className="text-amber-400 flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-amber-400 inline" />
                <span>{streak}</span>
              </span>
              <span className="text-cyan-300">{score} PTS</span>
            </div>
          </div>

          {/* Slim Emerald Glow Progress Bar */}
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              style={{ width: `${percentConquered}%` }}
            />
          </div>
        </div>

        {/* Click Feedback Toast Banner */}
        {lastGuessFeedback && (
          <div
            className={`px-2.5 py-1.5 rounded-xl text-[10.5px] font-bold flex items-center justify-between gap-1.5 animate-in zoom-in-95 duration-150 border ${
              lastGuessFeedback.status === 'correct'
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/60 text-rose-200'
            }`}
          >
            <span className="truncate">{lastGuessFeedback.message}</span>
            {lastGuessFeedback.status === 'correct' && (
              <span className="text-[9.5px] font-mono text-emerald-300 shrink-0 animate-pulse">
                Next...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
