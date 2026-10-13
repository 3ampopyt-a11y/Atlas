import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CountryData, ContinentFilter } from '../types.ts';
import { countryList } from '../data/countriesData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { gameAudio } from '../utils/gameAudio.ts';
import {
  GameDifficulty,
  DIFFICULTY_CONFIGS,
  filterCountriesByDifficulty,
} from '../utils/gameDifficulty.ts';
import {
  X,
  Trophy,
  Flame,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Globe,
  Flag,
  Landmark,
  Compass,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Award,
  Layers,
  LogOut,
} from 'lucide-react';

export type QuizCategory = 'flags' | 'capitals' | 'trivia' | 'spotter' | 'mixed';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMapSpotter: (continent: ContinentFilter, difficulty?: GameDifficulty) => void;
  onFlyToCountry: (country: CountryData) => void;
}

interface Question {
  id: string;
  category: 'flags' | 'capitals' | 'trivia';
  prompt: string;
  subPrompt?: string;
  targetCountry: CountryData;
  flagCode?: string;
  capitalTarget?: string;
  options: {
    label: string;
    subLabel?: string;
    isCorrect: boolean;
    countryData?: CountryData;
  }[];
  explanation: string;
}

export const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  onStartMapSpotter,
  onFlyToCountry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('flags');
  const [selectedContinent, setSelectedContinent] = useState<ContinentFilter>('All');
  const [difficulty, setDifficulty] = useState<GameDifficulty>('medium');
  const [gameModeType, setGameModeType] = useState<'sprint10' | 'sprint20' | 'survival'>('sprint10');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Gameplay state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(gameAudio.enabled);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Review of missed questions
  const [missedQuestions, setMissedQuestions] = useState<{
    prompt: string;
    targetName: string;
    chosenName: string;
    country: CountryData;
  }[]>([]);

  // High scores saved in localStorage
  const [highScores, setHighScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('geo_atlas_highscores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleSound = () => {
    gameAudio.enabled = !gameAudio.enabled;
    setSoundEnabled(gameAudio.enabled);
  };

  // Filter pool of countries by selected continent AND difficulty level
  const eligibleCountries = useMemo(() => {
    const continentPool = countryList.filter((c) => {
      if (!c.name || !c.capital) return false;
      if (selectedContinent === 'All') return true;
      return c.continent.toLowerCase() === selectedContinent.toLowerCase();
    });

    return filterCountriesByDifficulty(continentPool, difficulty);
  }, [selectedContinent, difficulty]);

  // Generate question set
  const generateQuestions = useCallback((): Question[] => {
    const pool = [...eligibleCountries];
    if (pool.length < 4) return [];

    // Shuffle pool
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const count = gameModeType === 'sprint10' ? 10 : gameModeType === 'sprint20' ? 20 : 50;
    const selectedTargets = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

    return selectedTargets.map((target, idx) => {
      // Determine question category
      let cat: 'flags' | 'capitals' | 'trivia' = 'flags';
      if (selectedCategory === 'flags') cat = 'flags';
      else if (selectedCategory === 'capitals') cat = 'capitals';
      else if (selectedCategory === 'trivia') cat = 'trivia';
      else {
        // Mixed Grand Prix: cycle through categories
        const mod = idx % 3;
        cat = mod === 0 ? 'flags' : mod === 1 ? 'capitals' : 'trivia';
      }

      // Pick 3 plausible distractors from the filtered pool
      const distractors = pool
        .filter((c) => c.id !== target.id)
        .sort((a, b) => {
          const sameContA = a.continent === target.continent ? 1 : 0;
          const sameContB = b.continent === target.continent ? 1 : 0;
          return sameContB - sameContA + (0.5 - Math.random());
        })
        .slice(0, 3);

      if (cat === 'flags') {
        const options = [
          { label: target.name, isCorrect: true, countryData: target },
          ...distractors.map((d) => ({ label: d.name, isCorrect: false, countryData: d })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q-flag-${idx}`,
          category: 'flags',
          prompt: 'Which country has this national flag?',
          subPrompt: `Continent: ${target.continent}`,
          targetCountry: target,
          flagCode: target.code,
          options,
          explanation: `${target.name} (Capital: ${target.capital}) is located in ${target.continent} with a population of ${target.demographics.population.toLocaleString()}.`,
        };
      }

      if (cat === 'capitals') {
        // 50% chance: Country -> Capital, 50% chance: Capital -> Country
        const isCountryToCapital = Math.random() > 0.5;

        if (isCountryToCapital) {
          // Question: What is the capital of [Country]?
          // Options: Pure capital cities (NO spoilers!)
          const options = [
            { label: target.capital, isCorrect: true, countryData: target },
            ...distractors.map((d) => ({
              label: d.capital,
              isCorrect: false,
              countryData: d,
            })),
          ].sort(() => 0.5 - Math.random());

          return {
            id: `q-cap-${idx}`,
            category: 'capitals',
            prompt: `What is the capital city of ${target.name}?`,
            subPrompt: `Geographic Challenge • ${target.continent}`,
            targetCountry: target,
            capitalTarget: target.capital,
            options,
            explanation: `The capital of ${target.name} is ${target.capital}.`,
          };
        } else {
          // Question: [Capital] is the capital city of which country?
          // CRITICAL: Options are PURE country names.
          // UNDER NO CIRCUMSTANCES should subLabel state the capital!
          const options = [
            { label: target.name, isCorrect: true, countryData: target },
            ...distractors.map((d) => ({
              label: d.name,
              isCorrect: false,
              countryData: d,
            })),
          ].sort(() => 0.5 - Math.random());

          return {
            id: `q-cap-rev-${idx}`,
            category: 'capitals',
            prompt: `${target.capital} is the capital city of which country?`,
            subPrompt: `Geographic Challenge • Located in ${target.continent}`,
            targetCountry: target,
            capitalTarget: target.capital,
            options,
            explanation: `${target.capital} is the capital city of ${target.name}.`,
          };
        }
      }

      // Trivia / Geography Facts
      const triviaType = Math.floor(Math.random() * 3);
      if (triviaType === 0) {
        // Continent Location
        const options = [
          { label: target.name, isCorrect: true, countryData: target },
          ...distractors.map((d) => ({ label: d.name, isCorrect: false, countryData: d })),
        ].sort(() => 0.5 - Math.random());

        return {
          id: `q-triv-cont-${idx}`,
          category: 'trivia',
          prompt: `Which of these nations is situated in ${target.continent}?`,
          subPrompt: `Continental Geography Challenge`,
          targetCountry: target,
          options,
          explanation: `${target.name} is situated in ${target.continent}.`,
        };
      } else if (triviaType === 1) {
        // Largest Population among group
        const allCandidates = [target, ...distractors].sort(
          (a, b) => b.demographics.population - a.demographics.population
        );
        const topPopCountry = allCandidates[0];

        // Do NOT spoil population numbers before guessing!
        const options = allCandidates.map((c) => ({
          label: c.name,
          isCorrect: c.id === topPopCountry.id,
          countryData: c,
        }));

        return {
          id: `q-triv-pop-${idx}`,
          category: 'trivia',
          prompt: 'Which of these countries has the highest population?',
          subPrompt: 'Demographic Comparison Challenge',
          targetCountry: topPopCountry,
          options,
          explanation: `${topPopCountry.name} has the largest population with ${topPopCountry.demographics.population.toLocaleString()} people.`,
        };
      } else {
        // Longest Sovereign History
        const allCandidates = [target, ...distractors].sort(
          (a, b) => b.longevity.yearsAlive - a.longevity.yearsAlive
        );
        const oldestCountry = allCandidates[0];

        // Do NOT spoil years before guessing!
        const options = allCandidates.map((c) => ({
          label: c.name,
          isCorrect: c.id === oldestCountry.id,
          countryData: c,
        }));

        return {
          id: `q-triv-long-${idx}`,
          category: 'trivia',
          prompt: 'Which country has the longest continuous sovereign history?',
          subPrompt: 'Ancient Civilization & Sovereignty Challenge',
          targetCountry: oldestCountry,
          options,
          explanation: `${oldestCountry.name} has an enduring continuity of ${oldestCountry.longevity.yearsAlive.toLocaleString()} years (${oldestCountry.longevity.foundationEvent}).`,
        };
      }
    });
  }, [eligibleCountries, gameModeType, selectedCategory]);

  // Start new game
  const handleStartGame = () => {
    if (selectedCategory === 'spotter') {
      // Launch live interactive map spotting challenge with chosen difficulty!
      onStartMapSpotter(selectedContinent, difficulty);
      onClose();
      return;
    }

    const generated = generateQuestions();
    if (generated.length === 0) return;

    setQuestions(generated);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(3);
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
    setIsFinished(false);
    setMissedQuestions([]);
    setIsPlaying(true);
    gameAudio.playClick();
  };

  // Auto-advance timer reference
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer when unmounting or category changes
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const finishGame = useCallback((finalScore?: number) => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsFinished(true);

    // Save high score
    const targetScore = finalScore !== undefined ? finalScore : score;
    const key = `${selectedCategory}_${selectedContinent}`;
    setHighScores((prev) => {
      const currentHigh = prev[key] || 0;
      if (targetScore > currentHigh) {
        const updated = { ...prev, [key]: targetScore };
        try {
          localStorage.setItem('geo_atlas_highscores', JSON.stringify(updated));
        } catch {}
        return updated;
      }
      return prev;
    });
  }, [score, selectedCategory, selectedContinent]);

  const advanceToNext = useCallback((fromIndex: number) => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (fromIndex + 1 < questions.length) {
      setCurrentQuestionIndex(fromIndex + 1);
      setSelectedAnswerIndex(null);
      setHasAnswered(false);
    } else {
      finishGame();
    }
  }, [questions.length, finishGame]);

  // Exit quiz and return to game menu
  const handleExitQuiz = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsPlaying(false);
    setIsFinished(false);
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
  }, []);

  // Exit entire game modal back to world map
  const handleExitGame = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsPlaying(false);
    setIsFinished(false);
    onClose();
  }, [onClose]);

  // Handle answer choice: auto-advances so the user doesn't have to press "Next Question"
  const handleChooseAnswer = (index: number) => {
    if (hasAnswered) return;

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    setSelectedAnswerIndex(index);
    setHasAnswered(true);

    const isCorrect = currentQ.options[index]?.isCorrect;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((prev) => Math.max(prev, newStreak));

      // Calculate score with streak multiplier
      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      const pts = 100 * multiplier;
      const newScore = score + pts;
      setScore(newScore);

      if (newStreak >= 3 && newStreak % 3 === 0) {
        gameAudio.playStreak();
      } else {
        gameAudio.playCorrect();
      }

      // Automatically advance to next question without requiring manual "Next" click!
      const currentIdx = currentQuestionIndex;
      autoAdvanceTimerRef.current = setTimeout(() => {
        advanceToNext(currentIdx);
      }, 420);
    } else {
      gameAudio.playWrong();
      setStreak(0);

      // Record missed question
      setMissedQuestions((prev) => [
        ...prev,
        {
          prompt: currentQ.prompt,
          targetName: currentQ.targetCountry.name,
          chosenName: currentQ.options[index]?.label || 'Unknown',
          country: currentQ.targetCountry,
        },
      ]);

      if (gameModeType === 'survival') {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          autoAdvanceTimerRef.current = setTimeout(() => {
            finishGame();
          }, 700);
          return;
        }
      }

      // On wrong answer, give brief time (650ms) to see the correct answer, then advance automatically!
      const currentIdx = currentQuestionIndex;
      autoAdvanceTimerRef.current = setTimeout(() => {
        advanceToNext(currentIdx);
      }, 650);
    }
  };

  // Manual next question button (skips any remaining timer)
  const handleNext = () => {
    gameAudio.playClick();
    advanceToNext(currentQuestionIndex);
  };

  const currentQ = questions[currentQuestionIndex];

  // Performance Title
  const getRankBadge = () => {
    const total = questions.length || 1;
    const correctCount = total - missedQuestions.length;
    const pct = Math.round((correctCount / total) * 100);

    if (pct >= 90) return { title: '👑 Grand Cartographer', color: 'text-amber-300' };
    if (pct >= 70) return { title: '🗺️ Master Navigator', color: 'text-cyan-300' };
    if (pct >= 50) return { title: '🧭 Global Geographer', color: 'text-emerald-300' };
    return { title: '🎒 Apprentice Traveler', color: 'text-purple-300' };
  };

  if (!isOpen) return null;

  return (
    <div
      id="game-modal-overlay"
      onClick={handleExitGame}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="game-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/25">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  GEOGRAPHY ARCADE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  QUIZ & SPOTTING
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-100 leading-tight">
                World Geography Challenge
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Menu / Mode Switcher when playing */}
            {isPlaying && (
              <button
                id="btn-quiz-menu-switch"
                onClick={handleExitQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-slate-100 text-xs font-semibold transition-all shadow-sm"
                title="Return to Game Modes Menu"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            )}

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Prominent Direct "Exit Game" Button (Returns to Map) */}
            <button
              id="btn-direct-exit-game"
              onClick={handleExitGame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 hover:border-rose-400 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Exit Game and return to World Map (Esc)"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Exit Game</span>
            </button>

            {/* Close Button X */}
            <button
              onClick={handleExitGame}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title="Close and Return to Map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Setup Screen or Active Gameplay or Finish Screen */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {!isPlaying && !isFinished ? (
            /* ========================================================================= */
            /* 1. GAME SETUP / CATEGORY SELECTOR SCREEN                                 */
            /* ========================================================================= */
            <div className="space-y-6">
              {/* Category Selector Grid */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Game Mode</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mode 1: Flags */}
                  <button
                    onClick={() => setSelectedCategory('flags')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      selectedCategory === 'flags'
                        ? 'bg-gradient-to-br from-cyan-950/80 to-blue-950/60 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">🚩</span>
                      {selectedCategory === 'flags' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-100">Flag Master Quiz</div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Inspect national flags from 240+ nations and guess the correct country.
                    </p>
                  </button>

                  {/* Mode 2: Capitals */}
                  <button
                    onClick={() => setSelectedCategory('capitals')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      selectedCategory === 'capitals'
                        ? 'bg-gradient-to-br from-purple-950/80 to-pink-950/60 border-purple-400/80 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">🏛️</span>
                      {selectedCategory === 'capitals' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500 text-slate-950">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-100">Capital Cities</div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Test your knowledge on world capitals, sovereign seats of government, and metropolises.
                    </p>
                  </button>

                  {/* Mode 3: Map Spotter */}
                  <button
                    onClick={() => setSelectedCategory('spotter')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      selectedCategory === 'spotter'
                        ? 'bg-gradient-to-br from-emerald-950/80 to-teal-950/60 border-emerald-400/80 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">🎯</span>
                      {selectedCategory === 'spotter' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                      <span>Globe Spotter Challenge</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                        LIVE 3D
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Given country names, spot and click them directly on the interactive 3D spinning globe!
                    </p>
                  </button>

                  {/* Mode 4: Mixed Grand Championship */}
                  <button
                    onClick={() => setSelectedCategory('mixed')}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      selectedCategory === 'mixed'
                        ? 'bg-gradient-to-br from-amber-950/80 to-orange-950/60 border-amber-400/80 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">🏆</span>
                      {selectedCategory === 'mixed' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm text-slate-100">All-Rounder Grand Prix</div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      Random mixed challenges featuring flags, capitals, demographics, continents, and geography trivia.
                    </p>
                  </button>
                </div>
              </div>

              {/* Filters: Continent Region */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Geographic Region</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  {['All', 'Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'].map(
                    (cont) => (
                      <button
                        key={cont}
                        onClick={() => setSelectedContinent(cont as ContinentFilter)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          selectedContinent === cont
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                            : 'bg-slate-950/60 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {cont === 'All' ? '🌍 Worldwide' : cont}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Difficulty Level Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Difficulty Level</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-sans">
                    {DIFFICULTY_CONFIGS[difficulty].shortDesc}
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(DIFFICULTY_CONFIGS) as GameDifficulty[]).map((diffKey) => {
                    const cfg = DIFFICULTY_CONFIGS[diffKey];
                    const isSelected = difficulty === diffKey;

                    return (
                      <button
                        key={diffKey}
                        id={`btn-difficulty-${diffKey}`}
                        onClick={() => setDifficulty(diffKey)}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? `${cfg.bgClass} ${cfg.borderClass} ring-2 ring-white/20 shadow-lg scale-[1.02]`
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-sm">{cfg.badge}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          )}
                        </div>
                        <div className={`font-black text-xs ${isSelected ? cfg.textClass : 'text-slate-200'}`}>
                          {cfg.name}
                        </div>
                        <div className="text-[9.5px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                          {cfg.shortDesc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Game Length / Survival Mode (Only for multiple choice quiz modes) */}
              {selectedCategory !== 'spotter' && (
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Challenge Format</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      onClick={() => setGameModeType('sprint10')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        gameModeType === 'sprint10'
                          ? 'bg-slate-800 border-cyan-400 text-cyan-300 font-bold shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-base font-black">10</div>
                      <div className="text-[10px] uppercase font-mono">Quick Sprint</div>
                    </button>

                    <button
                      onClick={() => setGameModeType('sprint20')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        gameModeType === 'sprint20'
                          ? 'bg-slate-800 border-cyan-400 text-cyan-300 font-bold shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-base font-black">20</div>
                      <div className="text-[10px] uppercase font-mono">Standard Tour</div>
                    </button>

                    <button
                      onClick={() => setGameModeType('survival')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        gameModeType === 'survival'
                          ? 'bg-slate-800 border-rose-500 text-rose-300 font-bold shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-base font-black">❤️❤️❤️</div>
                      <div className="text-[10px] uppercase font-mono">Endless Survival</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Start & Exit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  id="btn-start-game-cta"
                  onClick={handleStartGame}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-purple-600/30 border border-white/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 group"
                >
                  <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span>
                    {selectedCategory === 'spotter'
                      ? 'Launch Live Globe Spotter 🎯'
                      : 'Start Geography Quiz 🚀'}
                  </span>
                </button>
                <button
                  id="btn-setup-exit-game"
                  onClick={handleExitGame}
                  className="py-4 px-5 rounded-2xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-200 font-bold text-sm transition-all flex items-center justify-center gap-2 shrink-0"
                  title="Return to World Map"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Exit Game</span>
                </button>
              </div>
            </div>
          ) : isFinished ? (
            /* ========================================================================= */
            /* 2. FINAL SCORECARD SCREEN                                                 */
            /* ========================================================================= */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/25">
                🏆
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  QUIZ COMPLETE
                </span>
                <h2 className="text-3xl font-black text-slate-100 mt-1">
                  {getRankBadge().title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {score >= 800
                    ? 'Exceptional mastery of world flags, nations, and sovereign capitals!'
                    : 'Great effort! Practice more to climb the Global Geographer ranks.'}
                </p>
              </div>

              {/* Scorecard Stats Grid */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950/70 p-4 rounded-3xl border border-slate-800 text-center">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Total Score</div>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">{score}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Accuracy</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                    {Math.round(
                      ((questions.length - missedQuestions.length) / (questions.length || 1)) * 100
                    )}
                    %
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Best Streak</div>
                  <div className="text-2xl font-black text-cyan-300 font-mono mt-0.5">
                    {bestStreak} 🔥
                  </div>
                </div>
              </div>

              {/* Missed Questions Review */}
              {missedQuestions.length > 0 && (
                <div className="space-y-2 text-left">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Review Questions to Learn ({missedQuestions.length})
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {missedQuestions.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <CountryFlag
                            countryCode={m.country.code}
                            countryName={m.country.name}
                            flagEmoji={m.country.flag}
                            size="md"
                          />
                          <div>
                            <div className="font-bold text-slate-200">{m.country.name}</div>
                            <div className="text-[10px] text-slate-400">
                              Capital: {m.country.capital} • {m.country.continent}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onFlyToCountry(m.country);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-cyan-300 transition-colors shrink-0"
                        >
                          View on Map →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Play Again / Return / Exit Game Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="btn-scorecard-play-again"
                  onClick={handleStartGame}
                  className="flex-1 min-w-[130px] py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>
                <button
                  id="btn-scorecard-change-mode"
                  onClick={() => setIsPlaying(false)}
                  className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all"
                >
                  Change Mode
                </button>
                <button
                  id="btn-scorecard-exit-game"
                  onClick={handleExitGame}
                  className="py-3.5 px-5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-1.5"
                  title="Return to World Map"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Exit Game</span>
                </button>
              </div>
            </div>
          ) : currentQ ? (
            /* ========================================================================= */
            /* 3. ACTIVE QUIZ QUESTION SCREEN                                           */
            /* ========================================================================= */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Question Header & Live Progress */}
              <div className="flex items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-mono font-bold">
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className={`px-2 py-0.5 rounded-xl text-[10.5px] font-mono font-bold border ${DIFFICULTY_CONFIGS[difficulty].bgClass} ${DIFFICULTY_CONFIGS[difficulty].borderClass} ${DIFFICULTY_CONFIGS[difficulty].textClass}`}>
                    {DIFFICULTY_CONFIGS[difficulty].badge} {DIFFICULTY_CONFIGS[difficulty].name}
                  </span>

                  {gameModeType === 'survival' && (
                    <span className="flex items-center gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm transition-opacity ${
                            i < lives ? 'opacity-100' : 'opacity-20 grayscale'
                          }`}
                        >
                          ❤️
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {streak > 1 && (
                    <div className="flex items-center gap-1 text-amber-400 font-bold font-mono">
                      <span>🔥 {streak} Streak</span>
                      {streak >= 3 && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[10px]">
                          {streak >= 5 ? '3x PTS' : '2x PTS'}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-cyan-300 font-mono font-bold bg-cyan-950/60 px-2.5 py-1 rounded-xl border border-cyan-800/60">
                    {score} PTS
                  </div>
                </div>
              </div>

              {/* Visual Showcase (Flag / Prompt Card) */}
              <div className="bg-slate-950/70 border border-slate-800/90 rounded-3xl p-5 text-center space-y-3">
                {currentQ.category === 'flags' && currentQ.flagCode && (
                  <div className="flex justify-center py-2">
                    <CountryFlag
                      countryCode={currentQ.flagCode}
                      countryName={currentQ.targetCountry.name}
                      flagEmoji={currentQ.targetCountry.flag}
                      size="xl"
                      className="shadow-2xl rounded-xl ring-2 ring-slate-700/60"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 leading-tight">
                    {currentQ.prompt}
                  </h3>
                  {currentQ.subPrompt && (
                    <p className="text-xs text-slate-400 mt-1 font-medium">{currentQ.subPrompt}</p>
                  )}
                </div>
              </div>

              {/* Multiple Choice Options (4 Choices) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/50 text-slate-200';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20 font-bold ring-2 ring-emerald-400/40';
                    } else if (selectedAnswerIndex === idx) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/20 font-bold';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      disabled={hasAnswered}
                      onClick={() => handleChooseAnswer(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div>
                          <div className="font-bold text-sm">{opt.label}</div>
                          {hasAnswered && opt.subLabel && (
                            <div className="text-[10px] text-slate-400 font-normal">{opt.subLabel}</div>
                          )}
                        </div>
                      </div>

                      {hasAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && selectedAnswerIndex === idx && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Auto-advancing feedback banner (No manual Next button required!) */}
              {hasAnswered && (
                <div
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in duration-150 border ${
                    currentQ.options[selectedAnswerIndex!]?.isCorrect
                      ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag
                      countryCode={currentQ.targetCountry.code}
                      countryName={currentQ.targetCountry.name}
                      flagEmoji={currentQ.targetCountry.flag}
                      size="sm"
                    />
                    <div className="text-xs leading-snug">
                      {currentQ.options[selectedAnswerIndex!]?.isCorrect ? (
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Spot on! {currentQ.options[selectedAnswerIndex!]?.label}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-rose-300">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Correct answer: {currentQ.options.find((o) => o.isCorrect)?.label}</span>
                        </div>
                      )}
                      <p className="text-[11px] opacity-80 mt-0.5">{currentQ.explanation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-cyan-300 font-bold hidden sm:inline animate-pulse">
                      Advancing... ⏩
                    </span>
                    <button
                      id="btn-skip-auto-advance"
                      onClick={handleNext}
                      className="px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 transition-all shadow-md"
                      title="Advance immediately without delay"
                    >
                      <span>Skip</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Gameplay Bar: Direct "Exit Game" & Auto-advance Indicator */}
              <div className="flex items-center justify-between pt-3 text-xs text-slate-400 border-t border-slate-800/80">
                <button
                  id="btn-quiz-bottom-exit"
                  onClick={handleExitGame}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/50 text-slate-300 hover:text-rose-200 text-xs font-bold transition-all shadow-sm"
                  title="Exit Game and return to World Map"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Exit Game to Map</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Press answer to auto-advance • Esc exits</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
