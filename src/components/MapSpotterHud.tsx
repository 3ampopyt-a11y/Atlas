import React, { useState, useEffect } from 'react';
import { CountryData } from '../types.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { gameAudio } from '../utils/gameAudio.ts';
import {
  GameDifficulty,
  DIFFICULTY_CONFIGS,
} from '../utils/gameDifficulty.ts';
import { CheckCircle2, XCircle, HelpCircle, Eye, ArrowRight, Volume2, VolumeX, RotateCcw, Trophy, LogOut } from 'lucide-react';

interface MapSpotterHudProps {
  targetCountry: CountryData;
  score: number;
  streak: number;
  lives: number;
  roundNumber: number;
  totalRounds: number;
  difficulty?: GameDifficulty;
  lastGuessFeedback: {
    status: 'correct' | 'wrong' | 'revealed';
    countryName: string;
    message: string;
  } | null;
  onNextQuestion: () => void;
  onExit: () => void;
  onRestart: () => void;
  onChangeDifficulty?: (diff: GameDifficulty) => void;
  isGameOver: boolean;
  onReveal: () => void;
  onFlyToTarget: () => void;
}

export const MapSpotterHud: React.FC<MapSpotterHudProps> = ({
  targetCountry,
  score,
  streak,
  lives,
  roundNumber,
  totalRounds,
  difficulty = 'medium',
  lastGuessFeedback,
  onNextQuestion,
  onExit,
  onRestart,
  onChangeDifficulty,
  isGameOver,
  onReveal,
  onFlyToTarget,
}) => {
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(gameAudio.enabled);
  const [clueMode, setClueMode] = useState<'both' | 'name' | 'flag'>('both');

  // Reset hint level when target country changes
  useEffect(() => {
    setHintLevel(0);
  }, [targetCountry.id]);

  const toggleSound = () => {
    gameAudio.enabled = !gameAudio.enabled;
    setSoundEnabled(gameAudio.enabled);
  };

  const getHint = () => {
    if (hintLevel === 0) {
      setHintLevel(1);
    } else if (hintLevel === 1) {
      setHintLevel(2);
    }
  };

  if (isGameOver) {
    const isWin = lives > 0;
    return (
      <div
        id="map-spotter-gameover"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      >
        <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
            {isWin ? '🏆' : '💀'}
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                MAP SPOTTER CHALLENGE
              </span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${DIFFICULTY_CONFIGS[difficulty].bgClass} ${DIFFICULTY_CONFIGS[difficulty].borderClass} ${DIFFICULTY_CONFIGS[difficulty].textClass}`}>
                {DIFFICULTY_CONFIGS[difficulty].badge} {DIFFICULTY_CONFIGS[difficulty].name}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-100">
              {isWin ? 'Mission Complete!' : 'Out of Lives!'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isWin
                ? 'Outstanding geography knowledge! You spotted countries across the globe.'
                : 'Nice attempt! Review the countries and try again to beat your record.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Final Score</div>
              <div className="text-2xl font-black text-amber-300 font-mono">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Best Streak</div>
              <div className="text-2xl font-black text-cyan-300 font-mono">{streak} 🔥</div>
            </div>
          </div>

          {/* Difficulty Quick Switch on Game Over */}
          {onChangeDifficulty && (
            <div className="space-y-1.5 pt-1">
              <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Try Another Difficulty:
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                {(Object.keys(DIFFICULTY_CONFIGS) as GameDifficulty[]).map((dKey) => {
                  const cfg = DIFFICULTY_CONFIGS[dKey];
                  const isCurrent = difficulty === dKey;
                  return (
                    <button
                      key={dKey}
                      onClick={() => onChangeDifficulty(dKey)}
                      className={`px-2 py-1.5 rounded-xl border transition-all ${
                        isCurrent
                          ? `${cfg.bgClass} ${cfg.borderClass} ${cfg.textClass} ring-1 ring-white/30 font-black`
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div>{cfg.badge}</div>
                      <div className="text-[9.5px] truncate">{cfg.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onRestart}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-slate-950 text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              id="btn-spotter-gameover-exit"
              onClick={onExit}
              className="py-3 px-5 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="map-spotter-hud"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none"
    >
      <div className="pointer-events-auto bg-slate-950/95 backdrop-blur-xl border border-slate-700/90 rounded-3xl p-4 shadow-2xl space-y-3 animate-in slide-in-from-top-4 duration-300">
        {/* Top Status Strip */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/30 flex items-center gap-1.5">
              <span>🎯</span>
              <span>
                Round {roundNumber}/{totalRounds}
              </span>
            </span>

            {difficulty && (
              <span className={`px-2 py-0.5 rounded-xl text-[10.5px] font-mono font-bold border ${DIFFICULTY_CONFIGS[difficulty].bgClass} ${DIFFICULTY_CONFIGS[difficulty].borderClass} ${DIFFICULTY_CONFIGS[difficulty].textClass}`}>
                {DIFFICULTY_CONFIGS[difficulty].badge} {DIFFICULTY_CONFIGS[difficulty].name}
              </span>
            )}

            {/* Lives */}
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm transition-all ${
                    i < lives ? 'opacity-100 scale-100' : 'opacity-20 scale-75 grayscale'
                  }`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono">
              <span>🔥</span>
              <span>{streak} Streak</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-300 font-mono bg-cyan-950/50 px-2.5 py-1 rounded-xl border border-cyan-800/50">
              <span>{score} PTS</span>
            </div>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Exit Game */}
            <button
              id="btn-spotter-exit-game"
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 hover:border-rose-400 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Exit Game and return to World Map (Esc)"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Exit Game</span>
            </button>
          </div>
        </div>

        {/* Challenge Prompt */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {clueMode !== 'name' ? (
              <CountryFlag
                countryCode={targetCountry.code}
                countryName={targetCountry.name}
                flagEmoji={targetCountry.flag}
                size="lg"
              />
            ) : (
              <div className="w-11 h-8 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sm shadow-inner">
                🌐
              </div>
            )}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <span>
                  {clueMode === 'flag'
                    ? 'SPOT THIS FLAG ON THE GLOBE'
                    : 'FIND & CLICK ON THE GLOBE'}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-100 leading-tight">
                {clueMode === 'flag' ? 'Mystery Nation' : targetCountry.name}
              </h3>
            </div>
          </div>

          {/* Prompt Mode Switcher & Hint / Reveal Actions */}
          <div className="flex items-center gap-2">
            {/* Clue Mode Switcher */}
            <div className="flex items-center gap-0.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setClueMode('both')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  clueMode === 'both'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Clue shows both country name and flag"
              >
                Name & Flag
              </button>
              <button
                onClick={() => setClueMode('name')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  clueMode === 'name'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Clue shows country name only (No flag)"
              >
                Name Only
              </button>
              <button
                onClick={() => setClueMode('flag')}
                className={`px-2 py-0.5 rounded-lg transition-colors ${
                  clueMode === 'flag'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Clue shows flag only (Find country on globe)"
              >
                Flag Only
              </button>
            </div>

            {hintLevel < 2 && (
              <button
                onClick={getHint}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-amber-500/30 transition-all hover:scale-105"
                title="Get a geographic hint"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{hintLevel === 0 ? 'Hint' : 'Extra Hint'}</span>
              </button>
            )}

            <button
              onClick={onReveal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all hover:text-cyan-300"
              title="Show where this country is"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal</span>
            </button>
          </div>
        </div>

        {/* Hint Box (if activated) */}
        {hintLevel > 0 && (
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-2.5 text-xs text-amber-200 space-y-1 animate-in fade-in duration-150">
            <div className="font-bold flex items-center gap-1.5 text-amber-400 text-[11px]">
              <span>💡 Geographic Clue:</span>
            </div>
            <div>
              {hintLevel >= 1 && (
                <span>
                  Located in <strong className="text-amber-100">{targetCountry.continent}</strong>.
                </span>
              )}{' '}
              {hintLevel >= 2 && (
                <span>
                  Capital city is <strong className="text-amber-100">{targetCountry.capital}</strong>.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Feedback Message on Click */}
        {lastGuessFeedback && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-center justify-between gap-3 animate-in zoom-in-95 duration-150 border ${
              lastGuessFeedback.status === 'correct'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : lastGuessFeedback.status === 'revealed'
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {lastGuessFeedback.status === 'correct' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span className="font-semibold leading-snug">{lastGuessFeedback.message}</span>
            </div>

            {(lastGuessFeedback.status === 'correct' || lastGuessFeedback.status === 'revealed') && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-emerald-300 font-bold hidden sm:inline animate-pulse">
                  Advancing... ⏩
                </span>
                <button
                  onClick={onNextQuestion}
                  className="px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-all shadow-md"
                  title="Advance immediately"
                >
                  <span>Skip</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
