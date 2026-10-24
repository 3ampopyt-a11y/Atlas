import React from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { formatPopulation } from '../../utils/formatters.ts';
import {
  Compass,
  Mountain,
  Waves,
  Users,
  ChevronRight,
} from 'lucide-react';

interface DossierGeographyTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
  onSelectNeighbor?: (neighborName: string) => void;
}

export const DossierGeographyTab: React.FC<DossierGeographyTabProps> = ({
  country,
  details,
  onSelectNeighbor,
}) => {
  return (
    <div id="section-geography" className="space-y-4 animate-in fade-in duration-150">
      {/* Territory Dimensions */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-cyan-400" /> Territorial Scale & Boundaries
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-400">Total Land Area</div>
            <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">
              {country.geography.areaKm2.toLocaleString()} km²
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              ({country.geography.areaSqMi.toLocaleString()} sq mi)
              {country.geography.areaKm2 >= 1000000 && ` • ~${(country.geography.areaKm2 / 1000000).toFixed(2)}M km²`}
            </div>
          </div>
          {country.geography.coastlineKm !== undefined && (
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-slate-400">Coastline Length</div>
              <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">
                {country.geography.coastlineKm ? `${country.geography.coastlineKm.toLocaleString()} km` : 'Landlocked'}
              </div>
              <div className="text-[10px] text-slate-500">Maritime perimeter</div>
            </div>
          )}
        </div>

        <div className="space-y-1 text-[11px] pt-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Highest Elevation:</span>
            <span className="font-semibold text-slate-200">
              {country.geography.highestPoint.name} ({country.geography.highestPoint.elevationM}m)
            </span>
          </div>
          {country.geography.lowestPoint && (
            <div className="flex justify-between">
              <span className="text-slate-400">Lowest Elevation:</span>
              <span className="font-semibold text-slate-200">
                {country.geography.lowestPoint.name} ({country.geography.lowestPoint.elevationM}m)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Mountain Ranges & Waterways */}
      {(details.majorMountainRanges || details.majorRivers) && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5 text-xs">
          {details.majorMountainRanges && (
            <>
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-amber-400" /> Mountain Ranges & Geography
              </div>
              <div className="flex flex-wrap gap-1.5">
                {details.majorMountainRanges.map((range, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px]">
                    {range}
                  </span>
                ))}
              </div>
            </>
          )}

          {details.majorRivers && (
            <>
              <div className={`font-bold text-slate-200 flex items-center gap-1.5 ${details.majorMountainRanges ? 'pt-2 border-t border-slate-800' : ''}`}>
                <Waves className="w-4 h-4 text-blue-400" /> Principal Waterways & Rivers
              </div>
              <div className="flex flex-wrap gap-1.5">
                {details.majorRivers.map((river, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px]">
                    {river}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Demographics & Urbanization */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <Users className="w-4 h-4 text-emerald-400" /> Population & Demographics
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-400">Population</div>
            <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
              {formatPopulation(country.demographics.population)}
            </div>
            <div className="text-[10px] text-slate-500">
              {country.demographics.population > 0 ? `${country.demographics.densityPerKm2} / km² density` : 'No permanent population'}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-400">Urban Rate & Longevity</div>
            <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">
              {country.demographics.urbanPercentage ? `${country.demographics.urbanPercentage}% Urban` : 'N/A'}
            </div>
            <div className="text-[10px] text-slate-500">
              Life Expectancy: {country.demographics.lifeExpectancy ? `${country.demographics.lifeExpectancy} yrs` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Terrain & Climate */}
      {(country.geography.terrain || country.geography.climate) && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-slate-200 text-xs">Terrain & Climate Conditions</div>
          {country.geography.terrain && <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{country.geography.terrain}</p>}
          {country.geography.climate && (
            <div className="text-slate-400">
              <span className="text-slate-200 font-semibold">Climate Type: </span>
              {country.geography.climate}
            </div>
          )}
        </div>
      )}

      {/* Bordering Sovereign Neighbors */}
      {country.geography.borders && country.geography.borders.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center justify-between">
            <span>Land Bordering Neighbors ({country.geography.borders.length})</span>
            <span className="text-[10px] text-cyan-400 font-normal">Click to pan & inspect</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {country.geography.borders.map((neighbor, idx) => (
              <button
                key={idx}
                onClick={() => onSelectNeighbor?.(neighbor)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-slate-300 text-[11px] font-medium transition-colors flex items-center gap-1"
              >
                <span>{neighbor}</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
