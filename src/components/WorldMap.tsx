import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  geoOrthographic,
  geoNaturalEarth1,
  geoPath,
  geoGraticule10,
  geoDistance,
} from 'd3-geo';
import { CountryData, MapMetricMode } from '../types.ts';
import { worldFeatures50, worldBorders50 } from '../data/worldMapData.ts';
import { countryMapPoints, isCoordOnFrontHemisphere } from '../utils/geoCentroids.ts';
import { getCountryFillColor } from '../utils/mapColors.ts';
import { formatLongevity, formatBudget, formatPersonnel, formatPopulation } from '../utils/formatters.ts';
import { getVerifiedSovereignInfo } from '../utils/sovereignData.ts';
import { getCountryAlliances } from '../utils/allianceData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { countryList } from '../data/countriesData.ts';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Globe,
  Layers,
  Sparkles,
  MapPin,
  Crown,
  Users,
  Maximize,
  Shield,
  Play,
  Pause,
  Swords,
  Mountain,
  Palmtree,
  Activity,
  CloudSun,
  Flame,
  Radio,
  Flag,
  Compass,
} from 'lucide-react';
import { MILITARY_HOTSPOTS, MilitaryHotspot, NUCLEAR_STATES } from '../data/warData.ts';
import { WORLD_PEAKS, DEPRESSION_POINTS, MountainPeak, DepressionPoint } from '../data/altitudeData.ts';
import { TECTONIC_PLATES, FAULT_LINES, SEISMIC_HOTSPOTS, TectonicPlate, FaultLine, SeismicHotspot, getPlateGeoJsonFeature, getPlateForCountryCode } from '../data/tectonicData.ts';
import { BIOMES_FEATURES, BiomeFeature } from '../data/biomesData.ts';
import { CLIMATE_ZONES, getCountryClimateZone } from '../data/climateData.ts';
import { FeatureDetailModal, SelectedMapFeature } from './FeatureDetailModal.tsx';

interface WorldMapProps {
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  metricMode: MapMetricMode;
  isSpotterActive?: boolean;
  spotterFeedback?: {
    status: 'correct' | 'wrong' | 'revealed';
    countryName: string;
    message: string;
  } | null;
}

const BASE_WIDTH = 960;
const BASE_HEIGHT = 500;
const BASE_GLOBE_SCALE = 225;

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedCountry,
  onSelectCountry,
  metricMode,
  isSpotterActive = false,
  spotterFeedback = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Projection Mode: 'round' (3D Round Globe - DEFAULT) vs 'flat' (2D Flat Map)
  const [projectionMode, setProjectionMode] = useState<'round' | 'flat'>('round');

  // 3D Globe Rotation (yaw = longitude, pitch = latitude)
  const [rotation, setRotation] = useState<{ yaw: number; pitch: number }>({ yaw: -15, pitch: -20 });
  const [isSpinning, setIsSpinning] = useState(false);

  // Zoom & Pan transforms
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Flag Map Mode options: whether country polygons are filled with their flags
  const [flagFillEnabled, setFlagFillEnabled] = useState(true);

  // Precompute unique 2-letter country codes for national flag SVG pattern definitions
  const uniqueFlagCodes = useMemo(() => {
    const set = new Set<string>();
    countryList.forEach((c) => {
      if (c.code && c.code.length === 2) {
        set.add(c.code.toLowerCase());
      }
    });
    return Array.from(set);
  }, []);

  // Dragging interaction state
  const [isDragging, setIsDragging] = useState(false);
  const pointerDownRef = useRef<{
    isDown: boolean;
    startX: number;
    startY: number;
    startYaw: number;
    startPitch: number;
    startPanX: number;
    startPanY: number;
    hasMoved: boolean;
  }>({
    isDown: false,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startPitch: 0,
    startPanX: 0,
    startPanY: 0,
    hasMoved: false,
  });

  // Border clarity mode: 'sharp', 'contrast', 'subtle'
  const [borderMode, setBorderMode] = useState<'sharp' | 'contrast' | 'subtle'>('sharp');

  // Hover state
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [hoveredName, setHoveredName] = useState<string>('');
  const [hoveredFeature, setHoveredFeature] = useState<{
    type: string;
    name: string;
    detail: string;
    icon: string;
    badge?: string;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Selected feature detail modal (Hotspots, Peaks, Tectonic, Biomes)
  const [selectedFeature, setSelectedFeature] = useState<SelectedMapFeature | null>(null);

  // Tectonic mode interactive state & filters
  const [tectonicFilter, setTectonicFilter] = useState<'all' | 'convergent' | 'divergent' | 'transform' | 'ring-of-fire'>('all');
  const [showPlateSurfaces, setShowPlateSurfaces] = useState(true);
  const [plateOpacity, setPlateOpacity] = useState<number>(0.38);
  const [showFaultLines, setShowFaultLines] = useState(true);
  const [showTectonicHotspots, setShowTectonicHotspots] = useState(true);
  const [showPlateBadges, setShowPlateBadges] = useState(true);
  const [activePlateId, setActivePlateId] = useState<string | null>(null);

  // Animation frame throttled drag rotation for 60fps/120fps performance
  const dragRafId = useRef<number | null>(null);
  const pendingRotation = useRef<{ yaw: number; pitch: number } | null>(null);
  const pendingPan = useRef<{ x: number; y: number } | null>(null);

  // Global pointer release safety
  const endDrag = useCallback(() => {
    pointerDownRef.current.isDown = false;
    setIsDragging(false);
    if (dragRafId.current !== null) {
      cancelAnimationFrame(dragRafId.current);
      dragRafId.current = null;
    }
  }, []);

  useEffect(() => {
    const handleGlobalPointerUp = () => endDrag();
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [endDrag]);

  // Auto-Spin animation for 3D Globe
  useEffect(() => {
    if (!isSpinning || projectionMode !== 'round') return;
    let animId: number;
    const step = () => {
      setRotation((prev) => ({
        ...prev,
        yaw: (prev.yaw + 0.25) % 360,
      }));
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isSpinning, projectionMode]);

  // Create D3 Projection with optimized precision (0.8 for smooth 60fps rendering)
  const projection = useMemo(() => {
    if (projectionMode === 'round') {
      return geoOrthographic()
        .scale(BASE_GLOBE_SCALE * zoom)
        .translate([BASE_WIDTH / 2 + pan.x, BASE_HEIGHT / 2 + pan.y])
        .rotate([rotation.yaw, rotation.pitch, 0])
        .clipAngle(90)
        .precision(0.8);
    } else {
      return geoNaturalEarth1()
        .scale(153 * zoom)
        .translate([BASE_WIDTH / 2 + pan.x, BASE_HEIGHT / 2 + pan.y])
        .precision(0.8);
    }
  }, [projectionMode, zoom, pan.x, pan.y, rotation.yaw, rotation.pitch]);

  const pathGenerator = useMemo(() => {
    return geoPath(projection);
  }, [projection]);

  const graticulePath = useMemo(() => {
    return pathGenerator(geoGraticule10());
  }, [pathGenerator]);

  const bordersPath = useMemo(() => {
    return pathGenerator(worldBorders50 as any);
  }, [pathGenerator]);

  // Precompute country paths using the current projection
  // When a feature is a MultiPolygon (e.g. France with French Guiana & Reunion, Spain with Canaries, Portugal with Azores),
  // decomposing into individual polygon sub-paths ensures that SVG patternContentUnits="objectBoundingBox"
  // maps the national flag directly onto each visible landmass (e.g. Metropolitan France, Mainland Spain, Mainland Portugal)
  // rather than stretching across thousands of miles of ocean and leaving mainland France as an empty white stripe!
  const projectedCountryList = useMemo(() => {
    return worldFeatures50
      .map((feature, idx) => {
        const paths: string[] = [];
        if (feature.geometry?.type === 'Polygon') {
          const d = pathGenerator(feature as any);
          if (d) paths.push(d);
        } else if (feature.geometry?.type === 'MultiPolygon') {
          for (const polyCoords of feature.geometry.coordinates) {
            const d = pathGenerator({ type: 'Polygon', coordinates: polyCoords } as any);
            if (d) paths.push(d);
          }
        } else {
          const d = pathGenerator(feature as any);
          if (d) paths.push(d);
        }

        const mapPoint = countryMapPoints[idx];
        return {
          id: feature.id,
          uniqueKey: `${feature.id || 'f'}-${idx}`,
          name: feature.properties?.name || mapPoint?.name || 'Unknown',
          pathD: paths.join(' '),
          paths,
          countryData: mapPoint?.countryData,
          centroid: mapPoint?.centroid || [0, 0],
        };
      })
      .filter((item) => item.paths.length > 0);
  }, [pathGenerator]);

  // Precompute projected Tectonic Plate polygonal surfaces
  const projectedPlateSurfaces = useMemo(() => {
    if (metricMode !== 'tectonic') return [];
    return TECTONIC_PLATES.map((plate) => {
      const feature = getPlateGeoJsonFeature(plate);
      if (!feature) return null;
      const pathD = pathGenerator(feature) || '';
      return {
        plate,
        pathD,
      };
    }).filter((p): p is { plate: TectonicPlate; pathD: string } => Boolean(p && p.pathD));
  }, [metricMode, pathGenerator]);

  // Pointer interactions (Drag to Rotate 3D Globe or Pan Flat Map)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pointerDownRef.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      startYaw: rotation.yaw,
      startPitch: rotation.pitch,
      startPanX: pan.x,
      startPanY: pan.y,
      hasMoved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDownRef.current.isDown) {
      const dx = e.clientX - pointerDownRef.current.startX;
      const dy = e.clientY - pointerDownRef.current.startY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        pointerDownRef.current.hasMoved = true;
        if (!isDragging) {
          setIsDragging(true);
        }

        if (projectionMode === 'round') {
          // In 3D Globe mode, drag naturally rotates the spherical Earth!
          const sensitivity = 0.38 / Math.pow(zoom, 0.45);
          const nextYaw = pointerDownRef.current.startYaw + dx * sensitivity;
          const nextPitch = Math.max(-85, Math.min(85, pointerDownRef.current.startPitch - dy * sensitivity));
          pendingRotation.current = { yaw: nextYaw, pitch: nextPitch };
          if (dragRafId.current === null) {
            dragRafId.current = requestAnimationFrame(() => {
              if (pendingRotation.current) {
                setRotation(pendingRotation.current);
              }
              dragRafId.current = null;
            });
          }
        } else {
          // In flat mode, drag pans the map
          pendingPan.current = {
            x: pointerDownRef.current.startPanX + dx / zoom,
            y: pointerDownRef.current.startPanY + dy / zoom,
          };
          if (dragRafId.current === null) {
            dragRafId.current = requestAnimationFrame(() => {
              if (pendingPan.current) {
                setPan(pendingPan.current);
              }
              dragRafId.current = null;
            });
          }
        }
      }
      return; // Do NOT update tooltip while dragging to ensure buttery 60-120fps motion!
    }

    // Only update tooltip position if a country or feature is actively hovered
    if (hoveredCountry || hoveredFeature || hoveredName) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handlePointerUp = () => {
    endDrag();
  };

  // Zoom controls
  const handleZoom = useCallback((factor: number) => {
    setZoom((prev) => Math.min(Math.max(prev * factor, 0.8), 12));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation({ yaw: -15, pitch: -20 });
    setIsSpinning(false);
    setActivePlateId(null);
  }, []);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoom((prev) => Math.min(Math.max(prev * factor, 0.8), 12));
  };

  // Focus and center on a Tectonic Plate
  const focusPlate = useCallback(
    (plate: TectonicPlate) => {
      setActivePlateId(plate.id);
      const [lng, lat] = plate.centerCoordinates;
      if (projectionMode === 'round') {
        setRotation({ yaw: -lng, pitch: -lat });
        setZoom((prev) => Math.max(prev, 1.45));
      } else {
        const coords = projection([lng, lat]);
        if (coords) {
          setPan({
            x: BASE_WIDTH / 2 - coords[0],
            y: BASE_HEIGHT / 2 - coords[1],
          });
          setZoom((prev) => Math.max(prev, 1.8));
        }
      }
      setSelectedFeature({ type: 'tectonic-plate', data: plate });
    },
    [projectionMode, projection]
  );

  // Center on selected country
  const centerOnCountry = useCallback(
    (country: CountryData) => {
      const [lng, lat] = country.coordinates;
      if (projectionMode === 'round') {
        // Rotate the 3D round Earth so the country is directly centered facing the user!
        setRotation({ yaw: -lng, pitch: -lat });
        setZoom((prev) => Math.max(prev, 1.8));
      } else {
        const coords = projection([lng, lat]);
        if (coords) {
          setPan({
            x: BASE_WIDTH / 2 - coords[0],
            y: BASE_HEIGHT / 2 - coords[1],
          });
          setZoom((prev) => Math.max(prev, 2.5));
        }
      }
    },
    [projectionMode, projection]
  );

  // Automatically center and rotate 3D globe / flat map to selected country
  useEffect(() => {
    if (selectedCountry) {
      centerOnCountry(selectedCountry);
    }
  }, [selectedCountry, centerOnCountry]);

  // Focus continent presets
  const focusContinent = (continent: string) => {
    if (projectionMode === 'round') {
      switch (continent) {
        case 'Europe':
          setRotation({ yaw: -15, pitch: -50 });
          setZoom(1.9);
          break;
        case 'Asia':
          setRotation({ yaw: -95, pitch: -35 });
          setZoom(1.6);
          break;
        case 'North America':
          setRotation({ yaw: 100, pitch: -40 });
          setZoom(1.6);
          break;
        case 'South America':
          setRotation({ yaw: 60, pitch: 18 });
          setZoom(1.6);
          break;
        case 'Africa':
          setRotation({ yaw: -20, pitch: 0 });
          setZoom(1.7);
          break;
        case 'Oceania':
          setRotation({ yaw: -135, pitch: 25 });
          setZoom(1.9);
          break;
        default:
          setRotation({ yaw: -15, pitch: -20 });
          setZoom(1);
          break;
      }
    } else {
      switch (continent) {
        case 'Europe':
          setPan({ x: -250, y: 70 });
          setZoom(2.8);
          break;
        case 'Asia':
          setPan({ x: -380, y: 80 });
          setZoom(2.0);
          break;
        case 'North America':
          setPan({ x: 260, y: 80 });
          setZoom(1.8);
          break;
        case 'South America':
          setPan({ x: 160, y: -180 });
          setZoom(1.8);
          break;
        case 'Africa':
          setPan({ x: -80, y: -60 });
          setZoom(2.0);
          break;
        case 'Oceania':
          setPan({ x: -450, y: -220 });
          setZoom(2.4);
          break;
        default:
          setPan({ x: 0, y: 0 });
          setZoom(1);
          break;
      }
    }
  };

  // Border style helper
  const getBorderMeshClasses = () => {
    if (borderMode === 'contrast') {
      return 'stroke-white/70 stroke-[0.9] pointer-events-none';
    }
    if (borderMode === 'sharp') {
      return 'stroke-slate-300/50 stroke-[0.7] pointer-events-none';
    }
    return 'stroke-slate-700/60 stroke-[0.5] pointer-events-none';
  };

  const getCountryStrokeClass = (isSelected: boolean, isHovered: boolean) => {
    if (isSelected) {
      return 'stroke-cyan-300 stroke-[2.2] filter drop-shadow-[0_0_12px_rgba(6,182,212,0.95)]';
    }
    if (isHovered) {
      return 'stroke-white stroke-[1.8] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] brightness-110';
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

  // Check if a point is currently on the front hemisphere of the globe
  const isVisibleOnMap = useCallback(
    (coords: [number, number]) => {
      if (projectionMode === 'flat') return true;
      return isCoordOnFrontHemisphere(coords, rotation);
    },
    [projectionMode, rotation]
  );

  // Compute Globe Sphere Center and Radius
  const globeCenter = useMemo(() => {
    return [BASE_WIDTH / 2 + pan.x, BASE_HEIGHT / 2 + pan.y];
  }, [pan.x, pan.y]);

  const globeRadius = useMemo(() => {
    return BASE_GLOBE_SCALE * zoom;
  }, [zoom]);

  return (
    <div
      id="world-map-container"
      ref={containerRef}
      className={`relative w-full h-full min-h-[500px] overflow-hidden bg-[#030712] select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* Deep Space Background with Star Field */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/60 via-[#030712] to-black" />

      {/* Decorative Star Dust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:120px_120px]" />

      {/* Main Map SVG */}
      <svg
        id="world-map-svg"
        viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
        className="w-full h-full block relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* 3D Globe Spherical Lighting Gradient */}
          <radialGradient
            id="globe-shading"
            cx="32%"
            cy="28%"
            r="75%"
            fx="26%"
            fy="22%"
          >
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#0f172a" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#050d1a" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </radialGradient>

          {/* National Flag SVG Pattern Textures - only loaded in flags mode with flagFill enabled for optimal memory and FPS */}
          {metricMode === 'flags' && flagFillEnabled && uniqueFlagCodes.map((code) => (
            <pattern
              id={`flag-pat-${code}`}
              key={`flag-pat-${code}`}
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <rect width="1" height="1" fill="#1e293b" />
              <image
                href={`https://flagcdn.com/w320/${code}.png`}
                xlinkHref={`https://flagcdn.com/w320/${code}.png`}
                crossOrigin="anonymous"
                x="0"
                y="0"
                width="1"
                height="1"
                preserveAspectRatio="none"
              />
            </pattern>
          ))}
        </defs>

        {/* 3D Round Globe Atmosphere Outer Glow Rings (Clean hardware-accelerated SVG glow) */}
        {projectionMode === 'round' && (
          <>
            <circle
              cx={globeCenter[0]}
              cy={globeCenter[1]}
              r={globeRadius + 7}
              fill="none"
              stroke="rgba(56, 189, 248, 0.12)"
              strokeWidth="9"
              className="pointer-events-none"
            />
            <circle
              cx={globeCenter[0]}
              cy={globeCenter[1]}
              r={globeRadius + 2}
              fill="none"
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth="2.5"
              className="pointer-events-none"
            />
          </>
        )}

        {/* Ocean Background Sphere / Disk */}
        <g id="globe-ocean-sphere">
          {projectionMode === 'round' ? (
            <circle
              cx={globeCenter[0]}
              cy={globeCenter[1]}
              r={globeRadius}
              fill="url(#globe-shading)"
              stroke="rgba(56, 189, 248, 0.5)"
              strokeWidth="1.2"
            />
          ) : (
            <path
              d={pathGenerator({ type: 'Sphere' } as any) || ''}
              className="fill-[#080d1a] stroke-cyan-500/25 stroke-1"
            />
          )}
        </g>

        {/* Graticule Latitude/Longitude Curved Grid Lines */}
        {graticulePath && (
          <path
            d={graticulePath}
            fill="none"
            className="stroke-slate-700/35 stroke-[0.5] pointer-events-none"
          />
        )}

        {/* TECTONIC PLATE SHADED SURFACES (Visible across oceans in 'tectonic' mode) */}
        {metricMode === 'tectonic' && !isSpotterActive && showPlateSurfaces && (
          <g id="tectonic-plate-surfaces">
            {projectedPlateSurfaces.map(({ plate, pathD }) => {
              const isSelected = activePlateId === plate.id;
              const isHovered = hoveredFeature?.name === plate.name;

              return (
                <path
                  key={`plate-surface-${plate.id}`}
                  id={`plate-surface-${plate.id}`}
                  d={pathD}
                  fill={plate.color}
                  fillOpacity={isSelected ? 0.65 : isHovered ? 0.52 : plateOpacity}
                  stroke={isSelected || isHovered ? '#ffffff' : plate.color}
                  strokeWidth={isSelected ? 3 : isHovered ? 2.2 : 1.2}
                  className="transition-all duration-150 cursor-pointer"
                  onPointerEnter={() => {
                    if (!isDragging) {
                      setHoveredFeature({
                        type: `${plate.type} Tectonic Plate • ${plate.lithosphereType} Lithosphere`,
                        name: plate.name,
                        detail: `Surface Area: ${plate.areaMkm2}M km² (${plate.percentageEarthSurface}% of Earth) • Drift: ${plate.driftSpeedMmYr} mm/yr ${plate.driftVector.arrow} (${plate.driftDirection})`,
                        icon: '🌋',
                      });
                    }
                  }}
                  onPointerLeave={() => {
                    setHoveredFeature(null);
                    setTooltipPos(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    focusPlate(plate);
                  }}
                />
              );
            })}
          </g>
        )}

        {/* Country Polygons */}
        <g id="country-polygons">
          {projectedCountryList.map((item) => {
            if (!item.paths || item.paths.length === 0) return null;
            const country = item.countryData;
            const isSelected = selectedCountry?.id === item.id || selectedCountry?.name === item.name;
            const isHovered = hoveredCountry?.id === item.id || hoveredName === item.name;

            const code = country?.code?.toLowerCase();
            const hasFlagPattern = Boolean(code && code.length === 2 && uniqueFlagCodes.includes(code));

            // Default color calculation
            let fillColor = getCountryFillColor(country, metricMode, isSelected, isHovered);
            if (metricMode === 'flags' && !isSpotterActive) {
              if (flagFillEnabled && hasFlagPattern) {
                fillColor = `url(#flag-pat-${code})`;
              }
            }

            // CRITICAL FOR GLOBE SPOTTER CHALLENGE:
            // The world map MUST NEVER show flag textures or reveal country identities.
            // Countries have a clean, blind geopolitical palette, only revealing feedback upon guess.
            if (isSpotterActive) {
              if (isSelected && spotterFeedback) {
                if (spotterFeedback.status === 'correct') {
                  fillColor = isHovered ? '#34d399' : '#059669'; // Vibrant emerald correct
                } else if (spotterFeedback.status === 'wrong') {
                  fillColor = isHovered ? '#fb7185' : '#e11d48'; // Rose incorrect guess
                } else if (spotterFeedback.status === 'revealed') {
                  fillColor = isHovered ? '#38bdf8' : '#0284c7'; // Cyan revealed
                }
              } else {
                fillColor = isHovered ? '#334155' : '#1e293b';
              }
            }

            // High-clarity stroke class for spotter mode vs normal mode
            const strokeClass = isSpotterActive
              ? isSelected && spotterFeedback?.status === 'correct'
                ? 'stroke-emerald-400 stroke-2'
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
                onPointerEnter={() => {
                  if (!isDragging) {
                    setHoveredCountry(country || null);
                    setHoveredName(item.name);
                  }
                }}
                onPointerLeave={() => {
                  setHoveredCountry(null);
                  setHoveredName('');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (pointerDownRef.current.hasMoved) return;
                  if (country) {
                    onSelectCountry(country);
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

        {/* International Borders Overlay Line Mesh */}
        {bordersPath && (
          <>
            <path
              d={bordersPath}
              fill="none"
              className="stroke-slate-950 stroke-[1.2] pointer-events-none opacity-80"
            />
            <path
              d={bordersPath}
              fill="none"
              className={getBorderMeshClasses()}
            />
          </>
        )}

        {/* TECTONIC FAULT LINES & PLATE BOUNDARIES (Visible in 'tectonic' mode) */}
        {metricMode === 'tectonic' && !isSpotterActive && showFaultLines && (
          <g id="tectonic-fault-lines">
            {FAULT_LINES.filter((fault) => {
              if (tectonicFilter === 'convergent') return fault.type === 'Convergent';
              if (tectonicFilter === 'divergent') return fault.type === 'Divergent';
              if (tectonicFilter === 'transform') return fault.type === 'Transform';
              return true;
            }).map((fault) => {
              const lineGeoJson = {
                type: 'LineString',
                coordinates: fault.coordinates,
              };
              const d = pathGenerator(lineGeoJson as any);
              if (!d) return null;

              const isRoF = Boolean(fault.isRingOfFire);
              const isRoFMode = tectonicFilter === 'ring-of-fire';
              const isHighlighted = isRoFMode && isRoF;
              const isDimmed = isRoFMode && !isRoF;

              return (
                <g
                  key={fault.id}
                  className="cursor-pointer group"
                  opacity={isDimmed ? 0.2 : 1}
                  onPointerEnter={() => {
                    if (!isDragging) {
                      setHoveredFeature({
                        type: `${fault.type} Plate Boundary`,
                        name: fault.name,
                        detail: `Speed: ${fault.speed || 'Active'} • ${fault.notableFeatures}`,
                        icon: fault.type === 'Convergent' ? '🔴' : fault.type === 'Divergent' ? '🔵' : '🟡',
                        badge: fault.isRingOfFire ? '🔥 Ring of Fire' : undefined,
                      });
                    }
                  }}
                  onPointerLeave={() => {
                    setHoveredFeature(null);
                    setTooltipPos(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({ type: 'fault-line', data: fault });
                  }}
                >
                  {/* Invisible wide hit area for effortless hover and click */}
                  <path d={d} fill="none" stroke="transparent" strokeWidth="18" />

                  {/* High-visibility glowing background stroke */}
                  <path
                    d={d}
                    fill="none"
                    stroke={isHighlighted ? '#f43f5e' : fault.color}
                    strokeWidth={isHighlighted ? '7' : '4.5'}
                    strokeOpacity={isHighlighted ? '0.75' : '0.35'}
                  />

                  {/* Crisp primary fault line */}
                  <path
                    d={d}
                    fill="none"
                    stroke={isHighlighted ? '#ffedd5' : fault.color}
                    strokeWidth={isHighlighted ? '2.8' : '2'}
                    strokeDasharray={
                      fault.type === 'Convergent'
                        ? 'none'
                        : fault.type === 'Divergent'
                        ? '7 4'
                        : '4 4'
                    }
                    className="group-hover:stroke-white transition-colors"
                  />

                  {/* Subduction zone tick marks simulation for Convergent boundaries */}
                  {fault.type === 'Convergent' && (
                    <path
                      d={d}
                      fill="none"
                      stroke="#fecdd3"
                      strokeWidth="3.5"
                      strokeDasharray="2 10"
                      strokeOpacity="0.8"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Active/Hovered Plate Highlighting Boundary across continents and oceans */}
        {metricMode === 'tectonic' && (
          <g id="active-plate-highlight" className="pointer-events-none">
            {projectedPlateSurfaces
              .filter(({ plate }) => activePlateId === plate.id || hoveredFeature?.name === plate.name)
              .map(({ plate, pathD }) => (
                <path
                  key={`plate-highlight-${plate.id}`}
                  d={pathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  strokeDasharray="6 4"
                />
              ))}
          </g>
        )}

        {/* TECTONIC PLATES LABELS, MOTION VECTORS & SEISMIC HOTSPOTS */}
        {metricMode === 'tectonic' && !isSpotterActive && (
          <g id="tectonic-hotspots-and-labels">
            {/* 1. Plate Region Badges with Drift Vectors */}
            {showPlateBadges &&
              TECTONIC_PLATES.map((plate) => {
                if (!isVisibleOnMap(plate.centerCoordinates)) return null;
                const coords = projection(plate.centerCoordinates);
                if (!coords) return null;

                const isCurrentActive = activePlateId === plate.id;
                const isHovered = hoveredFeature?.name === plate.name;

                return (
                  <g
                    key={plate.id}
                    transform={`translate(${coords[0]}, ${coords[1]})`}
                    className="cursor-pointer group"
                    onPointerEnter={() => {
                      if (!isDragging) {
                        setHoveredFeature({
                          type: `${plate.type} Tectonic Plate (${plate.lithosphereType})`,
                          name: plate.name,
                          detail: `Drift: ${plate.driftSpeedMmYr} mm/yr ${plate.driftVector.arrow} (${plate.driftDirection}) • Area: ${plate.areaMkm2}M km² (${plate.percentageEarthSurface}%)`,
                          icon: '🌋',
                        });
                      }
                    }}
                    onPointerLeave={() => {
                      setHoveredFeature(null);
                      setTooltipPos(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      focusPlate(plate);
                    }}
                  >
                    {/* Directional Velocity Radial Indicator */}
                    <circle
                      r="16"
                      fill={plate.color}
                      fillOpacity="0.12"
                      stroke={plate.color}
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />
                    <circle
                      r="4.5"
                      fill={plate.color}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      className="group-hover:scale-125 transition-transform"
                    />

                    {/* Clear High-Contrast Plate Badge Box */}
                    <g transform="translate(0, 18)">
                      <rect
                        x="-70"
                        y="-10"
                        width="140"
                        height="30"
                        rx="8"
                        fill="#090d16"
                        fillOpacity="0.9"
                        stroke={isHovered || isCurrentActive ? '#ffffff' : plate.color}
                        strokeWidth={isHovered || isCurrentActive ? '1.8' : '1'}
                        className="transition-colors"
                      />
                      <text
                        x="0"
                        y="1"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9.5"
                        fontWeight="800"
                        letterSpacing="0.03em"
                        className="pointer-events-none select-none uppercase font-sans"
                      >
                        {plate.shortName} Plate
                      </text>
                      <text
                        x="0"
                        y="12.5"
                        textAnchor="middle"
                        fill={plate.color}
                        fontSize="8.5"
                        fontWeight="700"
                        className="pointer-events-none select-none font-mono"
                      >
                        {plate.driftVector.arrow} {plate.driftSpeedMmYr} mm/yr • {plate.lithosphereType[0]}
                      </text>
                    </g>
                  </g>
                );
              })}

            {/* 2. Seismic & Volcanic Hotspots */}
            {showTectonicHotspots &&
              SEISMIC_HOTSPOTS.map((spot) => {
                if (!isVisibleOnMap(spot.coordinates)) return null;
                const coords = projection(spot.coordinates);
                if (!coords) return null;

                const isVolcano = spot.type === 'Volcano' || spot.type === 'Hotspot';
                const isTrench = spot.type === 'Subduction Trench';
                const markerColor = isVolcano ? '#f97316' : isTrench ? '#06b6d4' : '#ef4444';
                const markerIcon = isVolcano ? '🌋' : isTrench ? '🌊' : '⚡';

                return (
                  <g
                    key={spot.id}
                    transform={`translate(${coords[0]}, ${coords[1]})`}
                    className="cursor-pointer group"
                    onPointerEnter={() => {
                      if (!isDragging) {
                        setHoveredFeature({
                          type: `Seismic Hotspot • ${spot.type}`,
                          name: spot.name,
                          detail: `${spot.intensity} Intensity • ${spot.elevationOrDepth || ''} • ${spot.details}`,
                          icon: markerIcon,
                        });
                      }
                    }}
                    onPointerLeave={() => {
                      setHoveredFeature(null);
                      setTooltipPos(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature({ type: 'seismic', data: spot });
                    }}
                  >
                    {/* Concentric marker ring */}
                    <circle
                      r="8.5"
                      fill="none"
                      stroke={markerColor}
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      strokeOpacity="0.75"
                    />
                    <circle
                      r="4.5"
                      fill={markerColor}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      className="group-hover:scale-125 transition-transform"
                    />
                  </g>
                );
              })}
          </g>
        )}

        {/* MOUNTAIN SUMMITS & TRENCHES (Visible in 'altitude' mode) */}
        {metricMode === 'altitude' && !isSpotterActive && (
          <g id="altitude-peaks-and-trenches">
            {/* World Peaks */}
            {WORLD_PEAKS.map((peak) => {
              if (!isVisibleOnMap(peak.coordinates)) return null;
              const coords = projection(peak.coordinates);
              if (!coords) return null;

              return (
                <g
                  key={peak.id}
                  transform={`translate(${coords[0]}, ${coords[1]})`}
                  className="cursor-pointer group"
                  onPointerEnter={() => {
                    setHoveredFeature({
                      type: 'Mountain Summit',
                      name: peak.name,
                      detail: `${peak.elevationM.toLocaleString()}m (${peak.elevationFt.toLocaleString()} ft) • ${peak.range} • ${peak.country}`,
                      icon: '🏔️',
                    });
                  }}
                  onPointerLeave={() => setHoveredFeature(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({ type: 'peak', data: peak });
                  }}
                >
                  <polygon points="0,-8 7,5 -7,5" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" className="group-hover:scale-125 transition-transform" />
                  <polygon points="0,-8 3,-2 -3,-2" fill="#38bdf8" />
                </g>
              );
            })}

            {/* Deep Trenches & Depressions */}
            {DEPRESSION_POINTS.map((dep) => {
              if (!isVisibleOnMap(dep.coordinates)) return null;
              const coords = projection(dep.coordinates);
              if (!coords) return null;

              return (
                <g
                  key={dep.id}
                  transform={`translate(${coords[0]}, ${coords[1]})`}
                  className="cursor-pointer group"
                  onPointerEnter={() => {
                    setHoveredFeature({
                      type: 'Deep Depression',
                      name: dep.name,
                      detail: `${dep.elevationM.toLocaleString()}m (${dep.elevationFt.toLocaleString()} ft) depth • ${dep.type} • ${dep.notes}`,
                      icon: '🌊',
                    });
                  }}
                  onPointerLeave={() => setHoveredFeature(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({ type: 'depression', data: dep });
                  }}
                >
                  <circle r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.2" className="group-hover:scale-125 transition-transform" />
                  <circle r="8" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse opacity-60" />
                </g>
              );
            })}
          </g>
        )}

        {/* BIOMES: DESERTS, OCEANS, RAINFORESTS (Visible in 'biomes' mode) */}
        {metricMode === 'biomes' && !isSpotterActive && (
          <g id="biomes-features">
            {BIOMES_FEATURES.map((biome) => {
              if (!isVisibleOnMap(biome.coordinates)) return null;
              const coords = projection(biome.coordinates);
              if (!coords) return null;

              return (
                <g
                  key={biome.id}
                  transform={`translate(${coords[0]}, ${coords[1]})`}
                  className="cursor-pointer group"
                  onPointerEnter={() => {
                    setHoveredFeature({
                      type: 'Biome Feature',
                      name: biome.name,
                      detail: `${biome.areaKm2 ? biome.areaKm2.toLocaleString() + ' km² • ' : ''}${biome.description}`,
                      icon: biome.icon,
                    });
                  }}
                  onPointerLeave={() => setHoveredFeature(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({ type: 'biome', data: biome });
                  }}
                >
                  <circle r="6" fill={biome.color} stroke="#ffffff" strokeWidth="1.2" className="group-hover:scale-125 transition-transform" />
                  <circle r="11" fill="none" stroke={biome.color} strokeWidth="1" strokeDasharray="3 2" className="animate-spin opacity-50" style={{ animationDuration: '6s' }} />
                </g>
              );
            })}
          </g>
        )}

        {/* WAR & MILITARY HOTSPOTS (Visible in 'war' mode) */}
        {metricMode === 'war' && !isSpotterActive && (
          <g id="war-military-hotspots">
            {MILITARY_HOTSPOTS.map((hotspot) => {
              if (!isVisibleOnMap(hotspot.coordinates)) return null;
              const coords = projection(hotspot.coordinates);
              if (!coords) return null;

              return (
                <g
                  key={hotspot.id}
                  transform={`translate(${coords[0]}, ${coords[1]})`}
                  className="cursor-pointer group"
                  onPointerEnter={() => {
                    setHoveredFeature({
                      type: 'Military Hotspot',
                      name: hotspot.name,
                      detail: `${hotspot.region} • ${hotspot.threatLevel} Threat • Forces: ${hotspot.primaryForces.slice(0, 2).join(', ')}`,
                      icon: '⚠️',
                    });
                  }}
                  onPointerLeave={() => setHoveredFeature(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature({ type: 'hotspot', data: hotspot });
                  }}
                >
                  {/* Tactical radar rings */}
                  <circle
                    r="14"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className="animate-spin opacity-80"
                    style={{ animationDuration: '4s' }}
                  />
                  <circle
                    r="8"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                  <circle r="3.5" fill="#dc2626" className="group-hover:scale-150 transition-transform" />
                </g>
              );
            })}
          </g>
        )}

        {/* 3D Round Globe Sphere Edge Horizon Shading Ring (Front Overlay) */}
        {projectionMode === 'round' && (
          <circle
            cx={globeCenter[0]}
            cy={globeCenter[1]}
            r={globeRadius}
            fill="none"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1.5"
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* Floating Map Zoom, Reset, 3D Globe & Projection Controls */}
      <div
        id="map-floating-controls"
        className="absolute bottom-6 left-6 flex flex-col gap-1.5 z-30 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl"
      >
        {/* Toggle 3D Round Globe / 2D Flat Map */}
        <button
          id="btn-toggle-projection"
          title={`Switch to ${projectionMode === 'round' ? 'Flat 2D Map' : '3D Round Globe'}`}
          onClick={() => {
            setProjectionMode((prev) => (prev === 'round' ? 'flat' : 'round'));
          }}
          className={`p-2 rounded-xl transition-all ${
            projectionMode === 'round'
              ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 shadow-sm'
              : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800'
          }`}
        >
          <Globe className="w-5 h-5 animate-pulse" />
        </button>

        {/* Auto Spin Toggle for 3D Globe */}
        {projectionMode === 'round' && (
          <button
            id="btn-toggle-spin"
            title={isSpinning ? 'Pause Globe Auto-Spin' : 'Start Globe Auto-Spin'}
            onClick={() => setIsSpinning((prev) => !prev)}
            className={`p-2 rounded-xl transition-all ${
              isSpinning
                ? 'text-amber-300 bg-amber-500/20 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {isSpinning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        )}

        {/* Toggle Flag Texture Fill in Flags Mode */}
        {metricMode === 'flags' && (
          <button
            id="btn-toggle-flag-fill"
            title={`Flag Texture on Countries: ${flagFillEnabled ? 'ON (Countries filled with flags)' : 'OFF (Solid color)'}`}
            onClick={() => setFlagFillEnabled((prev) => !prev)}
            className={`p-2 rounded-xl transition-all ${
              flagFillEnabled
                ? 'text-cyan-300 bg-cyan-500/25 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Flag className="w-5 h-5" />
          </button>
        )}

        <div className="w-full h-px bg-slate-800 my-0.5" />

        <button
          id="btn-zoom-in"
          title="Zoom In (+)"
          onClick={() => handleZoom(1.3)}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          id="btn-zoom-out"
          title="Zoom Out (-)"
          onClick={() => handleZoom(0.77)}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <div className="w-full h-px bg-slate-800 my-0.5" />

        <button
          id="btn-reset-view"
          title="Reset Whole World View"
          onClick={handleReset}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {selectedCountry && (
          <button
            id="btn-center-country"
            title={`Center on ${selectedCountry.name}`}
            onClick={() => centerOnCountry(selectedCountry)}
            className="p-2 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        )}

        <div className="w-full h-px bg-slate-800 my-0.5" />

        {/* Toggle Border Clarity */}
        <button
          id="btn-toggle-border-clarity"
          title={`Border Visibility: ${borderMode.toUpperCase()} (Click to toggle)`}
          onClick={() => {
            setBorderMode((prev) => (prev === 'sharp' ? 'contrast' : prev === 'contrast' ? 'subtle' : 'sharp'));
          }}
          className={`p-2 rounded-xl transition-colors ${
            borderMode === 'contrast'
              ? 'text-amber-400 bg-amber-500/20'
              : borderMode === 'sharp'
              ? 'text-cyan-300 bg-cyan-500/15'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Continent Focus Bar */}
      {metricMode !== 'tectonic' && !isSpotterActive && (
        <div
          id="continent-jump-bar"
          className="absolute bottom-6 left-24 hidden md:flex items-center gap-1.5 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/80 shadow-xl text-xs text-slate-300"
        >
          <span className="flex items-center gap-1 text-slate-400 font-medium mr-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            {projectionMode === 'round' ? 'Spin to:' : 'Focus:'}
          </span>
          {['World', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'].map((cont) => (
            <button
              key={cont}
              id={`btn-focus-${cont.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => focusContinent(cont)}
              className="px-2.5 py-1 rounded-xl hover:bg-slate-800 hover:text-cyan-300 transition-colors font-medium"
            >
              {cont === 'North America' ? 'N. America' : cont === 'South America' ? 'S. America' : cont}
            </button>
          ))}
        </div>
      )}

      {/* TECTONIC MODE INTERACTIVE CONTROLLER HUD */}
      {metricMode === 'tectonic' && !isSpotterActive && (
        <div
          id="tectonic-control-hud"
          className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-30 flex flex-col gap-2 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 shadow-2xl text-xs max-w-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header & Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-100 text-sm">
              <span className="text-base">🌋</span>
              <span>Tectonic Plates & Boundaries</span>
            </div>

            {/* Boundary Filters */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setTectonicFilter('all')}
                className={`px-2 py-0.5 rounded-lg transition-colors font-semibold ${
                  tectonicFilter === 'all'
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTectonicFilter('convergent')}
                className={`px-2 py-0.5 rounded-lg transition-colors font-semibold flex items-center gap-1 ${
                  tectonicFilter === 'convergent'
                    ? 'bg-red-500/25 text-red-300 border border-red-400/40'
                    : 'text-slate-400 hover:text-red-300'
                }`}
                title="Convergent: Subduction Trenches & Mountain Collisions"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Subduction
              </button>
              <button
                onClick={() => setTectonicFilter('divergent')}
                className={`px-2 py-0.5 rounded-lg transition-colors font-semibold flex items-center gap-1 ${
                  tectonicFilter === 'divergent'
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
                title="Divergent: Ocean Spreading Ridges & Continental Rifts"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Ridges
              </button>
              <button
                onClick={() => setTectonicFilter('transform')}
                className={`px-2 py-0.5 rounded-lg transition-colors font-semibold flex items-center gap-1 ${
                  tectonicFilter === 'transform'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title="Transform: Lateral Strike-Slip Faults"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Transform
              </button>
              <button
                onClick={() => setTectonicFilter((prev) => (prev === 'ring-of-fire' ? 'all' : 'ring-of-fire'))}
                className={`px-2 py-0.5 rounded-lg transition-all font-bold flex items-center gap-1 ${
                  tectonicFilter === 'ring-of-fire'
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg'
                    : 'text-orange-400 hover:bg-orange-500/10'
                }`}
                title="Highlight the Pacific Ring of Fire"
              >
                <span>🔥</span>
                Ring of Fire
              </button>
            </div>
          </div>

          {/* Sub-toggles & Opacity & Quick Jump Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Plate Surfaces Fill Toggle */}
              <button
                onClick={() => setShowPlateSurfaces((prev) => !prev)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium flex items-center gap-1.5 border ${
                  showPlateSurfaces
                    ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-sm'
                    : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
                title="Toggle Shaded Tectonic Plate Surfaces across the Earth"
              >
                <span>🗺️</span>
                <span className="font-semibold">Plate Surfaces</span>
              </button>

              {/* Opacity selector when surfaces are on */}
              {showPlateSurfaces && (
                <div className="flex items-center gap-0.5 bg-slate-900 px-1 py-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                  {[
                    { label: '25%', val: 0.25 },
                    { label: '45%', val: 0.45 },
                    { label: '65%', val: 0.65 },
                  ].map((lvl) => (
                    <button
                      key={lvl.label}
                      onClick={() => setPlateOpacity(lvl.val)}
                      className={`px-1.5 py-0.5 rounded transition-colors ${
                        Math.abs(plateOpacity - lvl.val) < 0.05
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Fault Lines Toggle */}
              <button
                onClick={() => setShowFaultLines((prev) => !prev)}
                className={`px-2 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 border ${
                  showFaultLines ? 'bg-slate-800 text-slate-100 border-slate-700' : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
                title="Toggle Plate Boundary & Fault Lines"
              >
                <span>⚡</span>
                <span>Fault Lines</span>
              </button>

              {/* Plate Badges Toggle */}
              <button
                onClick={() => setShowPlateBadges((prev) => !prev)}
                className={`px-2 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 border ${
                  showPlateBadges ? 'bg-slate-800 text-slate-100 border-slate-700' : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
              >
                <span>🏷️</span>
                <span>Badges</span>
              </button>

              {/* Hotspots Toggle */}
              <button
                onClick={() => setShowTectonicHotspots((prev) => !prev)}
                className={`px-2 py-1 rounded-lg transition-colors font-medium flex items-center gap-1 border ${
                  showTectonicHotspots ? 'bg-slate-800 text-slate-100 border-slate-700' : 'text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
              >
                <span>🌋</span>
                <span>Hotspots</span>
              </button>
            </div>

            {/* Quick-Jump to Plates strip */}
            <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-0.5 scrollbar-thin">
              <span className="text-slate-400 font-mono text-[10px] uppercase shrink-0">Jump To:</span>
              {TECTONIC_PLATES.map((plate) => (
                <button
                  key={plate.id}
                  onClick={() => focusPlate(plate)}
                  className={`px-2 py-0.5 rounded-lg text-[10.5px] font-semibold whitespace-nowrap transition-all border ${
                    activePlateId === plate.id
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                  style={{
                    borderLeftColor: plate.color,
                    borderLeftWidth: '3px',
                  }}
                >
                  {plate.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cursor Floating Tooltip (Concealed during Spotter Challenge so no flags or names are spoiled) */}
      {tooltipPos && !isSpotterActive && (hoveredFeature || hoveredCountry || hoveredName) && (
        <div
          id="map-hover-tooltip"
          className="pointer-events-none absolute z-40 bg-slate-950/95 backdrop-blur-md border border-slate-700/90 rounded-2xl px-3.5 py-3 shadow-2xl text-xs text-slate-200 transition-all duration-75 max-w-sm"
          style={{
            left: `${Math.min(tooltipPos.x + 16, (containerRef.current?.clientWidth || 800) - 290)}px`,
            top: `${Math.min(tooltipPos.y + 16, (containerRef.current?.clientHeight || 600) - 210)}px`,
          }}
        >
          {hoveredFeature ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800">
                <span className="text-base">{hoveredFeature.icon}</span>
                <div>
                  <div className="font-bold text-sm text-slate-100 leading-tight">
                    {hoveredFeature.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    {hoveredFeature.type}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-300 leading-snug">
                {hoveredFeature.detail}
              </div>
              <div className="pt-1 text-[9.5px] text-cyan-400/80 font-mono">
                Click to open full analysis →
              </div>
            </div>
          ) : hoveredCountry ? (() => {
            const sov = getVerifiedSovereignInfo(hoveredCountry);
            const alliances = getCountryAlliances(hoveredCountry.code || hoveredCountry.name);

            return (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                  <CountryFlag
                    countryCode={hoveredCountry.code}
                    countryName={hoveredCountry.name}
                    flagEmoji={sov.flag}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-100 leading-tight truncate">
                      {sov.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[210px]">
                      {sov.officialName}
                    </div>
                  </div>
                </div>

                {/* Alliances Banner */}
                {alliances.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mr-0.5">
                      <Shield className="w-3 h-3 text-cyan-400" />
                      Alliance:
                    </span>
                    {alliances.slice(0, 2).map((ally) => (
                      <span
                        key={ally.id}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${ally.accentColor}`}
                      >
                        <span>{ally.flagEmoji}</span>
                        <span>{ally.shortName}</span>
                      </span>
                    ))}
                    {alliances.length > 2 && (
                      <span className="text-[9px] text-slate-500 font-mono">
                        +{alliances.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Mode-specific highlighted stat */}
                {metricMode === 'area' && (
                  <div className="bg-teal-950/50 border border-teal-500/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-teal-300">
                      📐 {sov.areaKm2 >= 1000000 ? `${(sov.areaKm2 / 1000000).toFixed(2)}M km²` : `${sov.areaKm2.toLocaleString()} km²`} ({sov.areaSqMi.toLocaleString()} sq mi)
                    </span>
                    <span className="text-teal-400 font-mono text-[10px] font-semibold">
                      {sov.areaKm2 >= 5000000 ? 'Continental Giant' : sov.areaKm2 >= 1000000 ? 'Major Global Territory' : sov.areaKm2 >= 100000 ? 'Regional Landmass' : 'Compact Territory'}
                    </span>
                  </div>
                )}

                {metricMode === 'population' && (
                  <div className="bg-blue-950/50 border border-blue-500/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-300">👥 {sov.populationFormatted}</span>
                    <span className="text-blue-400 font-mono text-[10px] font-semibold">{sov.densityPerKm2} / km²</span>
                  </div>
                )}

                {metricMode === 'war' && (
                  <div className="bg-red-950/50 border border-red-500/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-red-300">⚔️ {hoveredCountry.military.activePersonnel.toLocaleString()} Active Troops</span>
                    <span className="text-amber-400 font-mono font-bold">GFP #{hoveredCountry.military.globalRank}</span>
                  </div>
                )}

                {metricMode === 'climate' && (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 text-[11px] text-emerald-200">
                    <span className="font-semibold">{getCountryClimateZone(hoveredCountry.code, hoveredCountry.continent, hoveredCountry.geography.climate).icon} {getCountryClimateZone(hoveredCountry.code, hoveredCountry.continent, hoveredCountry.geography.climate).name}</span>
                  </div>
                )}

                {metricMode === 'altitude' && (
                  <div className="bg-indigo-950/50 border border-indigo-500/40 rounded-xl px-2.5 py-1.5 text-[11px] text-indigo-200">
                    <span>🏔️ High Point: {hoveredCountry.geography.highestPoint?.name || 'Peak'} ({hoveredCountry.geography.highestPoint?.elevationM || 0}m)</span>
                  </div>
                )}

                {metricMode === 'biomes' && (
                  <div className="bg-amber-950/50 border border-amber-500/40 rounded-xl px-2.5 py-1.5 text-[11px] text-amber-200">
                    <span>🌿 {hoveredCountry.geography.climate}</span>
                  </div>
                )}

                {metricMode === 'tectonic' && (() => {
                  const plate = getPlateForCountryCode(hoveredCountry.code);
                  if (!plate) return null;
                  return (
                    <div
                      className="rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] border"
                      style={{
                        backgroundColor: `${plate.color}20`,
                        borderColor: `${plate.color}60`,
                      }}
                    >
                      <span className="font-bold flex items-center gap-1.5 text-slate-100">
                        <span>🌋</span>
                        <span>{plate.name}</span>
                      </span>
                      <span className="font-mono text-[10px] font-bold" style={{ color: plate.color }}>
                        {plate.driftVector.arrow} {plate.driftSpeedMmYr} mm/yr
                      </span>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Capital City</span>
                    <span className="font-semibold text-slate-100 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      <span className="truncate">{sov.capital}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Active Military</span>
                    <span className="font-bold text-red-400 font-mono flex items-center gap-1">
                      <Swords className="w-3 h-3 text-red-400 shrink-0" />
                      <span>{formatPersonnel(hoveredCountry.military.activePersonnel)}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Population</span>
                    <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{sov.populationFormatted}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Land Area</span>
                    <span className="font-semibold text-slate-200 font-mono flex items-center gap-1">
                      <Maximize className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span>{sov.areaKm2.toLocaleString()} km²</span>
                    </span>
                    <span className="text-[9.5px] text-slate-500 font-mono pl-4 block">
                      ≈ {sov.areaSqMi.toLocaleString()} sq mi
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[190px]">{sov.governmentType}</span>
                  <span className="text-cyan-400 font-semibold shrink-0">Click for dossier →</span>
                </div>
              </div>
            );
          })() : (
            <div className="font-semibold text-slate-300">{hoveredName}</div>
          )}
        </div>
      )}

      {/* Spotter Challenge Blind Crosshair Hint (Zero spoilers: no country name, flag, or capital) */}
      {tooltipPos && isSpotterActive && (hoveredCountry || hoveredName) && (
        <div
          id="spotter-cursor-indicator"
          className="pointer-events-none absolute z-40 bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 rounded-xl px-2.5 py-1.5 shadow-2xl text-[11px] font-bold text-cyan-300 transition-all duration-75 flex items-center gap-1.5"
          style={{
            left: `${Math.min(tooltipPos.x + 14, (containerRef.current?.clientWidth || 800) - 130)}px`,
            top: `${Math.min(tooltipPos.y + 14, (containerRef.current?.clientHeight || 600) - 40)}px`,
          }}
        >
          <span>🎯</span>
          <span>Click to guess</span>
        </div>
      )}

      {/* Feature Detail Modal for Hotspots, Peaks, Tectonic, Biomes */}
      <FeatureDetailModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
};
