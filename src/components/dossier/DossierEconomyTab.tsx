import React from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { formatGdp, formatPerCapita } from '../../utils/formatters.ts';
import {
  DollarSign,
  PieChart,
  Building2,
  Zap,
  Ship,
  Plane,
  Train,
  Gem,
  Briefcase,
  Layers,
} from 'lucide-react';

interface DossierEconomyTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
}

export const DossierEconomyTab: React.FC<DossierEconomyTabProps> = ({
  country,
  details,
}) => {
  const { agriculture = 0, industry = 0, services = 0, year: sectorYear } = details.economicSectors || {};
  const infra = details.infrastructureHighlights;

  return (
    <div id="section-economy" className="space-y-4 animate-in fade-in duration-150">
      {/* Macroeconomic Performance */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-400" /> Macroeconomics & Output
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-400">Nominal GDP</div>
            <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
              {formatGdp(country.economy.gdpNominalUSD)}
            </div>
            <div className="text-[10px] text-slate-500">Global economic output</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-slate-400">GDP Per Capita</div>
            <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">
              {formatPerCapita(country.economy.gdpPerCapitaUSD)}
            </div>
            <div className="text-[10px] text-slate-500">Per citizen standard</div>
          </div>
        </div>
        <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
          <span className="text-slate-400">Sovereign Currency:</span>
          <span className="font-semibold text-slate-200">
            {country.economy.currencyName} ({country.economy.currencyCode} {country.economy.currencySymbol})
          </span>
        </div>
      </div>

      {/* GDP Sector Composition */}
      {details.economicSectors && (
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-cyan-400" /> GDP Sector Breakdown{sectorYear ? ` (${sectorYear})` : ''}
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-800">
            <div
              style={{ width: `${services}%` }}
              className="h-full bg-cyan-500 rounded-l-full"
              title={`Services: ${services}%`}
            />
            <div
              style={{ width: `${industry}%` }}
              className="h-full bg-amber-500"
              title={`Industry: ${industry}%`}
            />
            <div
              style={{ width: `${agriculture}%` }}
              className="h-full bg-emerald-500 rounded-r-full"
              title={`Agriculture: ${agriculture}%`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span className="text-slate-300 font-medium">Services ({services}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-300 font-medium">Industry ({industry}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300 font-medium">Agriculture ({agriculture}%)</span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Strategic Infrastructure Highlights */}
      {infra && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-sky-400" /> Critical Infrastructure & Transit Networks
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(infra.mainAirports || infra.airportCount !== undefined) && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  <span>{infra.mainAirports ? 'International Hub Airports' : 'Airports'}</span>
                </div>
                <div className="font-semibold text-slate-200 text-xs leading-snug">
                  {infra.mainAirports ? infra.mainAirports.join(', ') : `${infra.airportCount!.toLocaleString()} airports and airfields`}
                </div>
              </div>
            )}

            {infra.majorPorts && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Ship className="w-3.5 h-3.5 text-blue-400" />
                  <span>{infra.mainAirports ? 'Major Deepwater Ports' : 'Key Ports'}</span>
                </div>
                <div className="font-semibold text-slate-200 text-xs leading-snug">
                  {infra.majorPorts.join(', ')}
                </div>
              </div>
            )}

            {(infra.highSpeedRailStatus || infra.railwaysKm !== undefined) && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Train className="w-3.5 h-3.5 text-amber-400" />
                  <span>{infra.highSpeedRailStatus ? 'High-Speed Rail Network' : 'Railway Network'}</span>
                </div>
                <div className="font-semibold text-slate-200 text-xs leading-snug">
                  {infra.highSpeedRailStatus || `${Math.round(infra.railwaysKm!).toLocaleString()} km of track`}
                </div>
              </div>
            )}

            {infra.cleanEnergyPercent !== undefined && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{infra.cleanEnergyBasis === 'capacity' ? 'Non-Fossil Power' : 'Clean / Renewable Energy'}</span>
                </div>
                <div className="font-mono font-bold text-emerald-400 text-sm">
                  {infra.cleanEnergyPercent}% {infra.cleanEnergyBasis === 'capacity' ? 'of Installed Capacity' : 'of Grid Generation'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Strategic Natural Resources */}
      {details.naturalResources && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Gem className="w-4 h-4 text-amber-400" /> Strategic Natural Resources
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.naturalResources.map((res, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]"
              >
                {res}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Trading Partners: export and import shares where the Factbook has them, else the hand-written list */}
      {[
        { title: 'Top Export Markets', list: details.exportPartners },
        { title: 'Top Import Sources', list: details.importPartners },
        { title: 'Top Global Trading Partners', list: details.exportPartners ? undefined : details.topTradingPartners },
      ]
        .filter((section) => section.list)
        .map((section) => (
          <div key={section.title} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200 text-xs">{section.title}</div>
            <div className="flex flex-wrap gap-1.5">
              {section.list!.map((partner, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px]"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        ))}

      {/* Key Exports */}
      {country.economy.mainExports.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs">Key Export Commodities</div>
          <div className="flex flex-wrap gap-1.5">
            {country.economy.mainExports.map((exp, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Major Industries */}
      {country.economy.majorIndustries.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs">Leading National Industries</div>
          <div className="flex flex-wrap gap-1.5">
            {country.economy.majorIndustries.map((ind, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px]"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Political Leadership */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-[11px]">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-purple-400" /> Political Architecture & Leadership
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800">
          <span className="text-slate-400">Government Type:</span>
          <span className="font-semibold text-slate-200 max-w-[240px] text-right truncate">
            {country.governance.governmentType}
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800">
          <span className="text-slate-400">Head of State:</span>
          <span className="font-semibold text-slate-200">{country.governance.headOfState}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-400">Head of Government:</span>
          <span className="font-semibold text-slate-200">{country.governance.headOfGovernment}</span>
        </div>
      </div>
    </div>
  );
};
