import React, { useState } from 'react';
import { AllianceInfo } from '../utils/allianceData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { Shield, ChevronDown, ChevronUp, Globe2, ExternalLink } from 'lucide-react';

interface AllianceCardProps {
  alliance: AllianceInfo;
  currentCountryCode?: string;
  onSelectCountry?: (countryCode: string) => void;
}

export const AllianceCard: React.FC<AllianceCardProps> = ({
  alliance,
  currentCountryCode,
  onSelectCountry,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentCodeUpper = (currentCountryCode || '').toUpperCase();

  return (
    <div className={`p-4 rounded-2xl border transition-all ${alliance.accentColor} bg-slate-900/80 shadow-md`}>
      {/* Header: Emblem + Name + Type Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none filter drop-shadow">{alliance.flagEmoji}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-slate-100 text-sm sm:text-base">
                {alliance.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-700">
                {alliance.shortName}
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">
              {alliance.type} • {alliance.members.length} Member Nations
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 flex items-center gap-1 text-xs"
          title={isExpanded ? 'Collapse members' : 'Expand member flags'}
        >
          <span className="hidden sm:inline text-[11px] font-medium">
            {isExpanded ? 'Hide' : 'All Flags'}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Treaty Article Key Clause */}
      <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs">
        <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-cyan-400" /> Defense Commitment:
        </div>
        <p className="text-slate-200 font-medium mt-0.5 text-xs sm:text-[13px] leading-relaxed">
          {alliance.treatyArticle}
        </p>
      </div>

      {/* Short Description */}
      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
        {alliance.description}
      </p>

      {/* Member Nations Flags Preview */}
      <div className="mt-3 pt-3 border-t border-slate-800/70">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>Member State Flags ({alliance.members.length})</span>
          <span className="text-[10px] text-slate-500">
            {currentCodeUpper ? '★ Indicates current nation' : ''}
          </span>
        </div>

        {/* Member Flags Grid / Ribbon */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {(isExpanded ? alliance.members : alliance.members.slice(0, 14)).map((member) => {
            const isCurrent = member.code.toUpperCase() === currentCodeUpper;
            return (
              <div
                key={member.code}
                onClick={() => onSelectCountry?.(member.code)}
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-bold shadow-sm'
                    : 'bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white'
                }`}
                title={`${member.name} (${member.code})`}
              >
                <CountryFlag countryCode={member.code} countryName={member.name} size="sm" />
                <span className="text-[11px] font-medium">{member.name}</span>
                {isCurrent && <span className="text-cyan-400 text-[10px]">★</span>}
              </div>
            );
          })}

          {!isExpanded && alliance.members.length > 14 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              +{alliance.members.length - 14} more flags...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
