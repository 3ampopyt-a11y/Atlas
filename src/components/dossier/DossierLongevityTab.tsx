import React from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { getUnStatus } from '../../utils/formatters.ts';
import {
  Clock,
  BookOpen,
  Calendar,
  Milestone,
  History,
} from 'lucide-react';

interface DossierLongevityTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
}

export const DossierLongevityTab: React.FC<DossierLongevityTabProps> = ({
  country,
  details,
}) => {
  return (
    <div id="section-longevity" className="space-y-4 animate-in fade-in duration-150">
      {/* Longevity Timeline Highlight */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Sovereign Continuity & Age
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
            {country.longevity.yearsAlive.toLocaleString()} Years Alive
          </span>
        </div>

        <div className="border-l-2 border-emerald-500/50 pl-3.5 py-1 space-y-3 text-xs">
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
              Origin / Foundation Event
            </div>
            <div className="font-bold text-slate-100 text-sm mt-0.5">
              {country.longevity.foundationEvent}
            </div>
            <div className="text-slate-400 mt-0.5">
              Foundation Year:{' '}
              <span className="font-mono text-emerald-300 font-bold">
                {country.longevity.foundationYear < 0
                  ? `${Math.abs(country.longevity.foundationYear)} BCE`
                  : `${country.longevity.foundationYear} CE`}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400">
              Current Sovereign Era
            </div>
            <div className="font-semibold text-slate-200 mt-0.5">
              {country.longevity.sovereignEra}
            </div>
            {country.longevity.constitutionYear && (
              <div className="text-slate-400 mt-0.5">
                Constitution in Effect:{' '}
                <span className="font-mono text-cyan-300 font-semibold">
                  {country.longevity.constitutionYear}
                </span>
              </div>
            )}
          </div>

          {country.longevity.ancientOrigin && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400">
                Ancient Civilizational Roots
              </div>
              <div className="text-slate-300 mt-0.5">
                {country.longevity.ancientOrigin}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Epoch Chronological Timeline Milestones */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <Milestone className="w-4 h-4 text-cyan-400" /> Defining Chronological Epochs & Milestones
        </div>
        <div className="relative border-l-2 border-slate-800 pl-4 space-y-3 ml-2 my-1">
          {details.historicalMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-slate-950 group-hover:scale-125 transition-transform" />
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-100 text-xs">{m.title}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-semibold shrink-0">
                    {m.year}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Continuity Notes */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-400" /> Historical Statehood Deep-Dive
        </div>
        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
          {country.longevity.historicalContinuityNotes}
        </p>
      </div>

      {/* Key Milestones & Dates */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-[11px]">
        <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-amber-400" /> Key Governance Milestones
        </div>
        <div className="space-y-1.5">
          {country.longevity.independenceDate && (
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Independence Declared:</span>
              <span className="font-semibold text-slate-200">{country.longevity.independenceDate}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400">UN Membership Since:</span>
            <span className="font-mono font-semibold text-slate-200">{country.governance.unMemberSince || getUnStatus(country)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">National Holiday / Day:</span>
            <span className="font-semibold text-slate-200">{country.governance.nationalDay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
