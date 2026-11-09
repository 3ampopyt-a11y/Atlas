import React from 'react';
import { CountryData, MapMetricMode, ContinentFilter } from '../types.ts';
import { getCountryFillColor } from '../utils/mapColors.ts';
import { getOwnFlagUrl, ownFlagPatternId } from '../utils/ownFlags.ts';

export interface ProjectedCountry {
  id: string;
  uniqueKey: string;
  name: string;
  paths: string[];
  countryData: CountryData | undefined;
}

interface CountryLayerProps {
  items: ProjectedCountry[];
  selectedCountry: CountryData | null;
  hoveredCountryId: string | null;
  hoveredName: string;
  metricMode: MapMetricMode;
  borderMode: 'sharp' | 'contrast' | 'subtle';
  flagFillEnabled: boolean;
  flagCodes: Set<string>;
  climateFilter?: string;
  isSpotterActive: boolean;
  spotterContinent?: ContinentFilter;
  spotterFeedback: {
    status: 'correct' | 'wrong' | 'revealed';
    countryName: string;
    message: string;
  } | null;
  spotterGuessedIds?: string[];
  // Drop expensive glow filters while the globe is moving; they are repainted every frame otherwise
  isMoving: boolean;
  onHover: (country: CountryData | null, name: string) => void;
  onLeave: () => void;
  onSelect: (country: CountryData) => void;
}

// Memoized so tooltip/cursor updates in WorldMap don't reconcile ~240 country groups on every pointer move
export const CountryLayer = React.memo(function CountryLayer({
  items,
  selectedCountry,
  hoveredCountryId,
  hoveredName,
  metricMode,
  borderMode,
  flagFillEnabled,
  flagCodes,
  climateFilter,
  isSpotterActive,
  spotterContinent,
  spotterFeedback,
  spotterGuessedIds,
  isMoving,
  onHover,
  onLeave,
  onSelect,
}: CountryLayerProps) {
  const getCountryStrokeClass = (isSelected: boolean, isHovered: boolean) => {
    if (isSelected) {
      return isMoving
        ? 'stroke-cyan-300 stroke-[2.2]'
        : 'stroke-cyan-300 stroke-[2.2] filter drop-shadow-[0_0_12px_rgba(6,182,212,0.95)]';
    }
    if (isHovered) {
      return isMoving
        ? 'stroke-white stroke-[1.8]'
        : 'stroke-white stroke-[1.8] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] brightness-110';
    }
    if (metricMode === 'flags') {
      return 'stroke-slate-950/90 stroke-[0.8]';
    }
    if (borderMode === 'contrast') {
      return 'stroke-slate-950 stroke-[0.9]';
    }
    if (borderMode === 'sharp') {
      return 'stroke-slate-950 stroke-[0.7]';
    }
    return 'stroke-slate-950/80 stroke-[0.4]';
  };

  return (
    <g id="country-polygons">
      {items.map((item) => {
        if (!item.paths || item.paths.length === 0) return null;
        const country = item.countryData;

        // In Globe Spotter Challenge for a specific continent (e.g. Europe, Africa),
        // only render and show that specific part of the world!
        if (isSpotterActive && spotterContinent && spotterContinent !== 'All') {
          const belongsToContinent =
            country && country.continent.toLowerCase() === spotterContinent.toLowerCase();
          if (!belongsToContinent) {
            return null;
          }
        }

        const isSelected = selectedCountry?.id === item.id || selectedCountry?.name === item.name;
        const isHovered = hoveredCountryId === item.id || hoveredName === item.name;

        const code = country?.code?.toLowerCase();
        const hasFlagPattern = Boolean(code && code.length === 2 && flagCodes.has(code));

        // Default color calculation
        let fillColor = getCountryFillColor(country, metricMode, isSelected, isHovered, climateFilter);
        if (metricMode === 'flags' && !isSpotterActive) {
          if (flagFillEnabled && country && getOwnFlagUrl(country.name)) {
            fillColor = `url(#${ownFlagPatternId(country.name)})`;
          } else if (flagFillEnabled && hasFlagPattern) {
            fillColor = `url(#flag-pat-${code})`;
          }
        }

        // Check if country was successfully guessed in Map Spotter mode
        const isGuessedInSpotter = Boolean(
          isSpotterActive &&
            spotterGuessedIds &&
            ((country && spotterGuessedIds.includes(country.id)) ||
              spotterGuessedIds.includes(item.id) ||
              (code && spotterGuessedIds.includes(code)) ||
              spotterGuessedIds.includes(item.name.toLowerCase()))
        );

        // CRITICAL FOR GLOBE SPOTTER CHALLENGE:
        // Unguessed countries are neutral dark slate to avoid spoilers.
        // Once clicked and correctly identified, the country lights up in radiant bright neon emerald!
        if (isSpotterActive) {
          if (isGuessedInSpotter) {
            // Conquered country glows in vibrant bright emerald!
            fillColor = isHovered ? '#34d399' : '#00e599';
          } else if (isSelected && spotterFeedback) {
            if (spotterFeedback.status === 'correct') {
              fillColor = isHovered ? '#34d399' : '#00e599'; // Bright radiant emerald
            } else if (spotterFeedback.status === 'wrong') {
              fillColor = isHovered ? '#fb7185' : '#f43f5e'; // Bright rose
            } else if (spotterFeedback.status === 'revealed') {
              fillColor = isHovered ? '#38bdf8' : '#0284c7'; // Bright cyan
            }
          } else {
            fillColor = isHovered ? '#334155' : '#1e293b';
          }
        }

        // High-clarity stroke class for spotter mode vs normal mode
        const strokeClass = isSpotterActive
          ? isGuessedInSpotter
            ? isMoving
              ? 'stroke-emerald-300 stroke-[1.6]'
              : 'stroke-emerald-300 stroke-[1.6] filter drop-shadow-[0_0_8px_rgba(0,229,153,0.85)]'
            : isSelected && spotterFeedback?.status === 'correct'
            ? isMoving
              ? 'stroke-emerald-300 stroke-2'
              : 'stroke-emerald-300 stroke-2 filter drop-shadow-[0_0_10px_rgba(0,229,153,0.9)]'
            : isSelected && spotterFeedback?.status === 'wrong'
            ? 'stroke-rose-400 stroke-2'
            : isHovered
            ? 'stroke-cyan-300 stroke-[1.8]'
            : 'stroke-slate-700/80 stroke-[0.8]'
          : getCountryStrokeClass(isSelected, isHovered);

        return (
          <g
            key={item.uniqueKey}
            id={`country-${item.uniqueKey}`}
            className={isSpotterActive ? 'cursor-crosshair' : 'cursor-pointer'}
            onPointerEnter={() => onHover(country || null, item.name)}
            onPointerLeave={onLeave}
            onClick={(e) => {
              e.stopPropagation();
              if (country) {
                onSelect(country);
              }
            }}
          >
            {item.paths.map((pD, pIdx) => (
              <path
                key={pIdx}
                d={pD}
                fill={fillColor}
                className={`transition-colors duration-150 ${strokeClass}`}
              />
            ))}
          </g>
        );
      })}
    </g>
  );
});
