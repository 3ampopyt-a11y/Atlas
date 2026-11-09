import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CountryData, MapMetricMode, ContinentFilter } from './types.ts';
import { countryList, getCountryByName } from './data/countriesData.ts';
import { WorldMap } from './components/WorldMap.tsx';
import { TopNav } from './components/TopNav.tsx';
import { CountryDossier } from './components/CountryDossier.tsx';
import { RankingsModal } from './components/RankingsModal.tsx';
import { CompareModal } from './components/CompareModal.tsx';
import { ConsideredModal } from './components/ConsideredModal.tsx';
import { GameModal } from './components/GameModal.tsx';
import { AskSearchModal } from './components/AskSearchModal.tsx';
import { MapSpotterHud } from './components/MapSpotterHud.tsx';
import { gameAudio } from './utils/gameAudio.ts';
import { GameDifficulty, filterCountriesByDifficulty } from './utils/gameDifficulty.ts';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [metricMode, setMetricMode] = useState<MapMetricMode>('flags');
  const [selectedContinent, setSelectedContinent] = useState<ContinentFilter>('All');
  const [isRankingsOpen, setIsRankingsOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isConsideredOpen, setIsConsideredOpen] = useState<boolean>(false);
  const [isGameOpen, setIsGameOpen] = useState<boolean>(false);
  const [isAskSearchOpen, setIsAskSearchOpen] = useState<boolean>(false);
  const [askSearchInitialQuery, setAskSearchInitialQuery] = useState<string>('');
  const [compareInitialCountry, setCompareInitialCountry] = useState<CountryData | null>(null);

  // Live Map Spotting Challenge State
  const [isSpotterActive, setIsSpotterActive] = useState<boolean>(false);
  const [spotterContinent, setSpotterContinent] = useState<ContinentFilter>('All');
  const [spotterDifficulty, setSpotterDifficulty] = useState<GameDifficulty>('medium');
  const [spotterTargets, setSpotterTargets] = useState<CountryData[]>([]);
  const [spotterGuessedIds, setSpotterGuessedIds] = useState<string[]>([]);
  const [spotterPlayWithLives, setSpotterPlayWithLives] = useState<boolean>(false);
  const [spotterCurrentIndex, setSpotterCurrentIndex] = useState<number>(0);
  const [spotterScore, setSpotterScore] = useState<number>(0);
  const [spotterStreak, setSpotterStreak] = useState<number>(0);
  const [spotterLives, setSpotterLives] = useState<number>(3);
  const [spotterFeedback, setSpotterFeedback] = useState<{
    status: 'correct' | 'wrong' | 'revealed';
    countryName: string;
    message: string;
  } | null>(null);
  const [isSpotterGameOver, setIsSpotterGameOver] = useState<boolean>(false);
  const spotterAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear spotter timer on unmount
  useEffect(() => {
    return () => {
      if (spotterAdvanceTimerRef.current) {
        clearTimeout(spotterAdvanceTimerRef.current);
      }
    };
  }, []);

  // Keyboard shortcuts (Escape closes modals/dossier/games)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAskSearchOpen) setIsAskSearchOpen(false);
        else if (isGameOpen) setIsGameOpen(false);
        else if (isSpotterActive) setIsSpotterActive(false);
        else if (isRankingsOpen) setIsRankingsOpen(false);
        else if (isCompareOpen) setIsCompareOpen(false);
        else if (isConsideredOpen) setIsConsideredOpen(false);
        else if (selectedCountry) setSelectedCountry(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAskSearchOpen, isGameOpen, isSpotterActive, isRankingsOpen, isCompareOpen, isConsideredOpen, selectedCountry]);

  // Handle clicking a neighbor in the dossier
  const handleSelectNeighbor = useCallback((neighborName: string) => {
    const target = getCountryByName(neighborName);
    if (target) {
      setSelectedCountry(target);
    }
  }, []);

  // Handle starting a comparison from the dossier
  const handleCompareWith = useCallback((country: CountryData) => {
    setCompareInitialCountry(country);
    setIsCompareOpen(true);
  }, []);

  // Start live interactive Map Spotting mode (Infinite / Full Conquest Mode)
  const handleStartMapSpotter = useCallback(
    (continent: ContinentFilter, difficulty: GameDifficulty = 'medium', withLives?: boolean) => {
      const pool = countryList.filter((c) => {
        if (!c.name || !c.capital) return false;
        if (continent === 'All') return true;
        return c.continent.toLowerCase() === continent.toLowerCase();
      });

      const filteredPool = filterCountriesByDifficulty(pool, difficulty);
      // Infinite / Full Region Conquest: Include all countries in the pool (no 10-cap limit)
      const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());
      setSpotterContinent(continent);
      setSpotterDifficulty(difficulty);
      setSpotterTargets(shuffled);
      setSpotterGuessedIds([]);
      setSpotterCurrentIndex(0);
      setSpotterScore(0);
      setSpotterStreak(0);
      setSpotterLives(3);
      if (withLives !== undefined) {
        setSpotterPlayWithLives(withLives);
      }
      setSpotterFeedback(null);
      setIsSpotterGameOver(false);
      setIsSpotterActive(true);
      setSelectedCountry(null); // Deselect any open country
    },
    []
  );

  // Interactive country selection (intercepted during Map Spotting mode)
  const handleSelectCountry = useCallback(
    (country: CountryData) => {
      if (isSpotterActive && !isSpotterGameOver) {
        const target = spotterTargets[spotterCurrentIndex];
        if (!target) return;

        // If current round already concluded, wait for next
        if (spotterFeedback?.status === 'correct' || spotterFeedback?.status === 'revealed') {
          return;
        }

        // In continent-specific Spotter mode, ignore clicks outside that continent
        if (spotterContinent && spotterContinent !== 'All') {
          if (country.continent.toLowerCase() !== spotterContinent.toLowerCase()) {
            return;
          }
        }

        const isMatch =
          country.id === target.id ||
          country.name.toLowerCase() === target.name.toLowerCase() ||
          country.code.toLowerCase() === target.code.toLowerCase();

        if (isMatch) {
          // Correct guess!
          const newStreak = spotterStreak + 1;
          const multiplier = newStreak >= 3 ? 2 : 1;
          const pts = 100 * multiplier;

          setSpotterStreak(newStreak);
          setSpotterScore((prev) => prev + pts);

          // Add to guessed country IDs so it permanently illuminates in bright neon emerald!
          setSpotterGuessedIds((prev) => {
            const next = new Set(prev);
            next.add(country.id);
            if (country.code) next.add(country.code.toLowerCase());
            next.add(country.name.toLowerCase());
            return Array.from(next);
          });

          setSpotterFeedback({
            status: 'correct',
            countryName: country.name,
            message: `🎉 Spot on! Conquered ${country.name}! (+${pts} PTS)`,
          });
          gameAudio.playCorrect();
          setSelectedCountry(country);

          // Auto-advance to next round
          if (spotterAdvanceTimerRef.current) {
            clearTimeout(spotterAdvanceTimerRef.current);
          }
          spotterAdvanceTimerRef.current = setTimeout(() => {
            handleSpotterNext();
          }, 750);
        } else {
          // Incorrect guess!
          setSpotterStreak(0);
          gameAudio.playWrong();

          if (spotterPlayWithLives) {
            const newLives = spotterLives - 1;
            setSpotterLives(newLives);

            if (newLives <= 0) {
              setSpotterFeedback({
                status: 'wrong',
                countryName: country.name,
                message: `❌ You clicked ${country.name}! Out of lives.`,
              });
              setTimeout(() => {
                setIsSpotterGameOver(true);
              }, 750);
            } else {
              setSpotterFeedback({
                status: 'wrong',
                countryName: country.name,
                message: `❌ That's ${country.name}! Look in ${target.continent}. (${newLives} ${
                  newLives === 1 ? 'life' : 'lives'
                } left)`,
              });
            }
          } else {
            // Infinite mode: no life penalty, player can keep guessing until found!
            setSpotterFeedback({
              status: 'wrong',
              countryName: country.name,
              message: `❌ That's ${country.name}! Find ${target.name} (${target.continent})`,
            });
          }
        }
        return;
      }

      // Normal mode: select country to view dossier
      setSelectedCountry(country);
    },
    [
      isSpotterActive,
      isSpotterGameOver,
      spotterTargets,
      spotterCurrentIndex,
      spotterStreak,
      spotterLives,
      spotterPlayWithLives,
      spotterContinent,
      spotterFeedback,
    ]
  );

  // Next round in spotter challenge
  const handleSpotterNext = useCallback(() => {
    if (spotterAdvanceTimerRef.current) {
      clearTimeout(spotterAdvanceTimerRef.current);
      spotterAdvanceTimerRef.current = null;
    }
    if (spotterCurrentIndex + 1 < spotterTargets.length) {
      setSpotterCurrentIndex((prev) => prev + 1);
      setSpotterFeedback(null);
      setSelectedCountry(null);
    } else {
      setIsSpotterGameOver(true);
    }
  }, [spotterCurrentIndex, spotterTargets.length]);

  // Exit spotter challenge
  const handleExitSpotter = useCallback(() => {
    if (spotterAdvanceTimerRef.current) {
      clearTimeout(spotterAdvanceTimerRef.current);
      spotterAdvanceTimerRef.current = null;
    }
    setIsSpotterActive(false);
    setSpotterFeedback(null);
    setSelectedCountry(null);
  }, []);

  const spotterTarget = spotterTargets[spotterCurrentIndex] || null;

  return (
    <div id="app-root" className="relative w-screen h-dvh overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* 1. Fullscreen Interactive Map Canvas */}
      <WorldMap
        selectedCountry={selectedCountry}
        onSelectCountry={handleSelectCountry}
        metricMode={metricMode}
        isSpotterActive={isSpotterActive}
        spotterContinent={spotterContinent}
        spotterFeedback={spotterFeedback}
        spotterGuessedIds={spotterGuessedIds}
      />

      {/* 2. Top Floating Navigation & Search Bar */}
      <TopNav
        onSelectCountry={handleSelectCountry}
        onOpenRankings={() => setIsRankingsOpen(true)}
        onOpenCompare={() => {
          setCompareInitialCountry(selectedCountry);
          setIsCompareOpen(true);
        }}
        onOpenConsidered={() => setIsConsideredOpen(true)}
        onOpenAskSearch={(queryText?: string) => {
          setAskSearchInitialQuery(queryText || '');
          setIsAskSearchOpen(true);
        }}
        selectedContinent={selectedContinent}
        onChangeContinent={setSelectedContinent}
        metricMode={metricMode}
        onChangeMetric={setMetricMode}
      />

      {/* 3. Live Globe Map Spotter HUD (Docked on the side, compact, infinite conquest & lives option) */}
      {isSpotterActive && spotterTarget && (
        <MapSpotterHud
          targetCountry={spotterTarget}
          score={spotterScore}
          streak={spotterStreak}
          guessedCount={spotterGuessedIds.length}
          totalRounds={spotterTargets.length}
          continent={spotterContinent}
          onChangeContinent={(cont) => handleStartMapSpotter(cont, spotterDifficulty, spotterPlayWithLives)}
          playWithLives={spotterPlayWithLives}
          onToggleLivesMode={(enabled) => {
            setSpotterPlayWithLives(enabled);
            if (enabled) setSpotterLives(3);
          }}
          lives={spotterLives}
          difficulty={spotterDifficulty}
          lastGuessFeedback={spotterFeedback}
          onNextQuestion={handleSpotterNext}
          onExit={handleExitSpotter}
          onRestart={() => handleStartMapSpotter(spotterContinent, spotterDifficulty, spotterPlayWithLives)}
          isGameOver={isSpotterGameOver}
        />
      )}

      {/* 4. Active Country Dossier (Sovereignty, Longevity, Military Breakdown) */}
      {selectedCountry && !isSpotterActive && (
        <CountryDossier
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onSelectNeighbor={handleSelectNeighbor}
          onCompareWith={handleCompareWith}
        />
      )}

      {/* 5. Global Leaderboards & Rankings Modal */}
      <RankingsModal
        isOpen={isRankingsOpen}
        onClose={() => setIsRankingsOpen(false)}
        onSelectCountry={handleSelectCountry}
      />

      {/* 6. Head-to-Head Country Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialCountry={compareInitialCountry}
        onSelectForView={handleSelectCountry}
      />

      {/* 7. Considered in the World (Best Food, Military, Oldest Civilizations, Heritage) */}
      <ConsideredModal
        isOpen={isConsideredOpen}
        onClose={() => setIsConsideredOpen(false)}
        onSelectCountry={handleSelectCountry}
        onCompareWith={handleCompareWith}
      />

      {/* 8. Geography Quiz & Game Mode Modal */}
      <GameModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onStartMapSpotter={handleStartMapSpotter}
        onFlyToCountry={setSelectedCountry}
      />

      {/* 9. Global Knowledge & Search Modal */}
      <AskSearchModal
        isOpen={isAskSearchOpen}
        onClose={() => {
          setIsAskSearchOpen(false);
          setAskSearchInitialQuery('');
        }}
        initialQuery={askSearchInitialQuery}
        onSelectCountry={handleSelectCountry}
        onCompareWith={handleCompareWith}
      />

      {/* 10. Floating Corner Controls: "SEARCH" Stacked Directly Above "GAME" Mode */}
      {!isSpotterActive && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex-col items-end gap-2 sm:gap-2.5 pointer-events-auto ${
            // The open dossier (and its minimized pill) occupies this corner; these buttons would cover it
            selectedCountry ? 'hidden' : 'flex'
          }`}
        >
          {/* Button that says "Search" above Game Mode */}
          <button
            id="btn-corner-search"
            onClick={() => {
              setAskSearchInitialQuery('');
              setIsAskSearchOpen(true);
            }}
            title="Search world facts, planes, defense & geography"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-cyan-600/40 border border-white/25 transition-all hover:scale-105 active:scale-95 group animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <span className="text-base group-hover:scale-110 transition-transform">🔍</span>
            <span>Search</span>
          </button>

          {/* Game Mode Button */}
          <button
            id="btn-corner-game"
            onClick={() => setIsGameOpen(true)}
            title="Play World Geography Quiz & Spotting Game"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-purple-600/40 border border-white/25 transition-all hover:scale-105 active:scale-95 group animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <span className="text-lg group-hover:rotate-12 transition-transform">🎮</span>
            <span>Game</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold tracking-tight lowercase">
              quiz
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
