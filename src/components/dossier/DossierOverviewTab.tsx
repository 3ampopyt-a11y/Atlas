import React from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { formatBudget, formatGdp, formatPerCapita, formatPersonnel, getUnStatus } from '../../utils/formatters.ts';
import { getVerifiedSovereignInfo } from '../../utils/sovereignData.ts';
import { getAlliancesFor, SHARED_ISO_ENTRIES } from '../../utils/allianceData.ts';
import { getCountryCulinaryProfile } from '../../utils/nationalFoodsData.ts';
import { CONSIDERED_ITEMS } from '../../utils/consideredData.ts';
import { getCountryLeadingProfile } from '../../utils/worldLeadingData.ts';
import { getCountryNationalSport } from '../../utils/nationalSportsData.ts';
import { CountryFlag } from '../CountryFlag.tsx';
import { AllianceCard } from '../AllianceCard.tsx';
import {
  Sparkles,
  BookOpen,
  Globe2,
  Maximize2,
  TreePine,
  Landmark,
  Crown,
  Scale,
  Users,
  MapPin,
  Maximize,
  Languages,
  UserCheck,
  Gauge,
  Shield,
  Utensils,
  Award,
  Trophy,
} from 'lucide-react';

interface DossierOverviewTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onNavigateToCuisine?: () => void;
  onNavigateToCulture?: () => void;
}

export const DossierOverviewTab: React.FC<DossierOverviewTabProps> = ({
  country,
  details,
  isFullscreen,
  onToggleFullscreen,
  onNavigateToCuisine,
  onNavigateToCulture,
}) => {
  const sovereign = getVerifiedSovereignInfo(country);
  const alliances = getAlliancesFor(country);
  const culinary = getCountryCulinaryProfile(country);
  const primaryDish = culinary.nationalDishes[0];

  const countryAccolades = CONSIDERED_ITEMS.filter(
    (item) =>
      (item.countryCode === country.code && !SHARED_ISO_ENTRIES.has(country.id)) ||
      item.countryId === country.id ||
      item.countryName.toLowerCase() === country.name.toLowerCase()
  );

  const leadingProfile = getCountryLeadingProfile(country);
  const nationalSport = getCountryNationalSport(country);

  return (
    <div id="section-overview" className="space-y-4 animate-in fade-in duration-150">
      {/* Fullscreen Callout Banner (only if not fullscreen) */}
      {!isFullscreen && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">✨</span>
            <span className="text-xs text-slate-200 font-medium">
              Want an expansive view? Open the full screen dossier report.
            </span>
          </div>
          <button
            id="btn-callout-fullscreen"
            onClick={onToggleFullscreen}
            className="px-2.5 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-semibold flex items-center gap-1 transition-colors shrink-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      )}

      {/* CORE SOVEREIGN IDENTITY & LEADERSHIP HERO CARD */}
      <div
        id="card-sovereign-identity"
        className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 shadow-xl space-y-3.5"
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80 ${isFullscreen ? 'lg:hidden' : ''}`}>
          <div className="flex items-center gap-3.5">
            <CountryFlag
              countryCode={country.code}
              countryName={country.name}
              flagEmoji={sovereign.flag}
              size="xl"
              className="border-2 border-slate-700/80 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 tracking-tight">
                  {sovereign.name}
                </h3>
                {country.code3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                    {country.code3}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30">
                  {country.continent}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                {sovereign.officialName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-slate-800/70 border border-slate-700/60 rounded-xl px-3 py-1.5">
            <MapPin className="w-4 h-4 text-rose-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                Capital City
              </div>
              <div className="text-xs font-bold text-slate-100">
                {sovereign.capital}
              </div>
            </div>
          </div>
        </div>

        {/* Vital Sovereign Facts Matrix: President, Government, Population, Area, Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {/* President / Head of State Card */}
          <div
            id="card-head-of-state"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{sovereign.leaderRole || sovereign.headOfStateRole || 'Executive Leader'}</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                Leader
              </span>
            </div>
            <div className="text-sm font-bold text-slate-100 leading-snug">
              {sovereign.leader || sovereign.president}
            </div>
            {sovereign.headOfGovernment && sovereign.headOfGovernment !== sovereign.leader && (
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5 truncate">
                <UserCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{sovereign.headOfGovernment}</span>
              </div>
            )}
          </div>

          {/* Government Type Card */}
          <div
            id="card-government-type"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Government Structure</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                Regime
              </span>
            </div>
            <div className="text-sm font-bold text-slate-100 leading-snug">
              {sovereign.governmentType}
            </div>
            <div className="text-[11px] text-slate-400">
              {getUnStatus(country)} • {country.governance.unMemberSince > 0 ? 'Sovereign Era' : 'Status'}: {country.longevity.sovereignEra}
            </div>
          </div>

          {/* Population Card */}
          <div
            id="card-population-stat"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>National Population</span>
              </span>
              {sovereign.population > 0 && (
                <span className="text-[10px] font-mono text-emerald-300">
                  {sovereign.densityPerKm2}/km²
                </span>
              )}
            </div>
            <div className="text-base font-bold text-emerald-300 font-mono">
              {sovereign.populationFormatted}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {sovereign.population > 0
                ? `${sovereign.populationExact} citizens${sovereign.urbanPercentage ? ` (${sovereign.urbanPercentage}% urban)` : ''}`
                : 'No permanent population'}
            </div>
          </div>

          {/* Land Area Card */}
          <div
            id="card-area-stat"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-indigo-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5" />
                <span>Geographic Land Area</span>
              </span>
              <span className="text-[10px] text-indigo-300 font-mono">Territory</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-100 font-mono">
              {sovereign.areaKm2.toLocaleString()} km²
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>≈ {sovereign.areaSqMi.toLocaleString()} sq miles</span>
              {sovereign.areaKm2 >= 1000000 && (
                <span className="text-indigo-400 font-semibold text-[10px]">
                  ~{(sovereign.areaKm2 / 1000000).toFixed(2)}M km²
                </span>
              )}
            </div>
          </div>

          {/* Capital City Card */}
          <div
            id="card-capital-city"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-rose-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                <span>Capital City & Seat</span>
              </span>
              <span className="text-[10px] text-rose-300">Metro Hub</span>
            </div>
            <div className="text-base font-bold text-slate-100">
              {sovereign.capital}
            </div>
            <div className="text-[11px] text-slate-400">
              Subregion: {country.subregion}
            </div>
          </div>

          {/* Official Languages Card */}
          <div
            id="card-languages-list"
            className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between text-[11px] text-purple-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                <span>Official & National Languages</span>
              </span>
              <span className="text-[10px] text-purple-300">Linguistic</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {sovereign.languages.length === 0 && (
                <span className="text-slate-400 text-[11px]">None (no permanent population)</span>
              )}
              {sovereign.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* National Food & Culinary Identity Highlight */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-amber-500/30 shrink-0">
            {primaryDish?.iconEmoji || '🍲'}
          </span>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              National Dish & Culinary Identity
            </div>
            <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5 flex-wrap">
              <span>{primaryDish?.name || details.culturalHeritageHighlights?.nationalDish}</span>
              {primaryDish?.nativeName && (
                <span className="text-[11px] text-slate-400 font-mono">
                  ({primaryDish.nativeName})
                </span>
              )}
              {primaryDish?.flavorProfile && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                  {primaryDish.flavorProfile}
                </span>
              )}
            </div>
          </div>
        </div>
        {onNavigateToCuisine && (
          <button
            onClick={onNavigateToCuisine}
            className="text-[11px] text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 shrink-0 flex items-center gap-1"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>View Foods</span>
          </button>
        )}
      </div>

      {/* National Sport & Athletic Heritage Highlight */}
      {nationalSport && (
      <div
        id="card-national-sport"
        className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 flex items-start sm:items-center justify-between gap-3"
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-emerald-500/30 shrink-0">
            {nationalSport.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                National Sport & Athletic Heritage
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono font-semibold border border-emerald-500/30">
                {nationalSport.status}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {nationalSport.category}
              </span>
            </div>
            <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5 flex-wrap mt-0.5">
              <span>{nationalSport.sportName}</span>
              {nationalSport.nativeName && (
                <span className="text-[11px] text-slate-400 font-mono">
                  ({nationalSport.nativeName})
                </span>
              )}
            </div>
            {nationalSport.notableAchievements && (
              <div className="text-[11px] text-amber-300/90 font-medium flex items-center gap-1 mt-0.5">
                <span className="shrink-0">🏅</span>
                <span className="line-clamp-1">{nationalSport.notableAchievements}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1 line-clamp-2">
              {nationalSport.description}
            </p>
          </div>
        </div>
        {onNavigateToCulture && (
          <button
            onClick={onNavigateToCulture}
            className="text-[11px] text-emerald-300 hover:text-emerald-200 font-semibold underline underline-offset-2 shrink-0 flex items-center gap-1 self-start sm:self-center"
          >
            <span>Culture</span>
          </button>
        )}
      </div>
      )}

      {/* Leading the World In Section */}
      {leadingProfile && leadingProfile.records.length > 0 && (
        <div
          id="card-world-leader-in"
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/50 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-amber-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span>Leading the World In</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-200 border border-amber-500/40 font-mono font-bold">
                    World #1
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-medium line-clamp-1 mt-0.5">
                  {leadingProfile.leadBanner}
                </div>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono font-bold border border-amber-500/30">
              {leadingProfile.records.length} Global Record{leadingProfile.records.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {leadingProfile.records.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                      {rec.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-100 leading-snug">
                        {rec.title}
                      </div>
                      <div className="text-[11px] font-semibold text-amber-400 font-mono">
                        {rec.metricOrValue}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
                    {rec.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Considered World Accolades Highlight */}
      {countryAccolades.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/40 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Considered Best in the World Accolades</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold border border-amber-500/30">
              {countryAccolades.length} World Title{countryAccolades.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-2">
            {countryAccolades.map((acc) => (
              <div
                key={acc.id}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-2.5"
              >
                <span className="text-xl p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {acc.icon}
                </span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-amber-300">{acc.badge}</span>
                    <span className="text-[10px] text-cyan-300 font-mono font-medium">{acc.rankBadge}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">{acc.crownFeature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Executive Country Overview */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Strategic Executive Profile
        </div>
        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
          {details.overview}
        </p>
      </div>

      {/* Quick Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">Global Firepower</div>
          {/* powerIndex 0: not in the Global Firepower ranking */}
          <div className="text-base font-bold text-amber-400 font-mono">
            {country.military.powerIndex > 0 ? `Rank #${country.military.globalRank}` : 'Not ranked'}
          </div>
          {country.military.powerIndex > 0 && (
            <div className="text-[10px] text-slate-400">
              PowerIndex: {country.military.powerIndex.toFixed(4)}
            </div>
          )}
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">Annual Defense Budget</div>
          <div className="text-base font-bold text-cyan-400 font-mono">
            {country.military.defenseBudgetUSD > 0 ? formatBudget(country.military.defenseBudgetUSD) : 'Not listed'}
          </div>
          {country.military.defenseBudgetUSD > 0 && (
            <div className="text-[10px] text-slate-400">
              {country.military.defenseBudgetPercentGDP}% of GDP
            </div>
          )}
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">Active Armed Forces</div>
          <div className="text-base font-bold text-rose-400 font-mono">
            {country.military.activePersonnel > 0 ? formatPersonnel(country.military.activePersonnel) : 'None listed'}
          </div>
          {country.military.reservePersonnel > 0 && (
            <div className="text-[10px] text-slate-400">
              +{formatPersonnel(country.military.reservePersonnel)} Reserves
            </div>
          )}
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400">Nominal GDP</div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            {formatGdp(country.economy.gdpNominalUSD)}
          </div>
          <div className="text-[10px] text-slate-400">
            {formatPerCapita(country.economy.gdpPerCapitaUSD)} / capita
          </div>
        </div>
      </div>

      {/* DEDICATED ALLIANCES & TREATY FLAGS SECTION */}
      <div id="section-alliances-overview" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
              Military & Geopolitical Alliances & Flags
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {alliances.length > 0 ? `${alliances.length} Active Treaty Pacts` : 'Neutral / Non-Aligned'}
          </span>
        </div>

        {alliances.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5">
            <div className="text-2xl">🕊️</div>
            {getUnStatus(country) !== 'Not a UN Member' || country.longevity.sovereignEra === 'Sovereign State' ? (
              <>
                <div className="font-bold text-slate-200 text-xs">Neutral / Non-Aligned Sovereign State</div>
                <p className="text-slate-400 text-xs max-w-md mx-auto">
                  {country.name} does not hold formal binding mutual defense commitments with external military pacts, maintaining independent foreign and security policy.
                </p>
              </>
            ) : (
              <>
                <div className="font-bold text-slate-200 text-xs">No Alliance Memberships of Its Own</div>
                <p className="text-slate-400 text-xs max-w-md mx-auto">
                  {country.name} is not a sovereign state and holds no military alliance memberships in its own name.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {alliances.map((alliance) => (
              <AllianceCard
                key={alliance.id}
                alliance={alliance}
                currentCountryCode={country.code}
              />
            ))}
          </div>
        )}
      </div>

      {/* International Alliances & Multilateral Treaties */}
      {details.internationalMemberships.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-indigo-400" /> International Organisations & Alliances
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.internationalMemberships.map((org, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium"
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Climate & Biomes */}
      {details.climateBiomes && (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <TreePine className="w-4 h-4 text-emerald-400" /> Climate & Ecological Biomes
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.climateBiomes.map((biome, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px]"
              >
                {biome}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Founding Figures & Originators */}
      {details.foundingFigures && (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Founding Figures & Sovereign Inception
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.foundingFigures.map((figure, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium"
              >
                {figure}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Historical Predecessors & Empires */}
      {details.historicalPredecessors && (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-slate-400" /> Historical Predecessors & Pre-Statehood Eras
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.historicalPredecessors.map((pred, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[11px]"
              >
                {pred}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Society, Digital & Infrastructure Quick Facts */}
      {(details.hdiScore !== undefined || details.drivingSide || details.callingCode || details.tld || details.timeZones) && (
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-[11px]">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" /> Infrastructure & Society Standards
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {details.hdiScore !== undefined && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Human Dev. Index{details.hdiYear ? ` (${details.hdiYear})` : ''}</div>
                <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">
                  {details.hdiScore.toFixed(3)}{' '}
                  <span className="text-[10px] text-slate-400 font-normal">({details.hdiTier})</span>
                </div>
              </div>
            )}
            {details.drivingSide && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Driving Side</div>
                <div className="font-bold text-slate-200 text-sm mt-0.5">
                  {details.drivingSide} Side
                </div>
              </div>
            )}
            {(details.callingCode || details.tld) && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px]">
                  {details.callingCode && details.tld ? 'Calling Code & TLD' : details.callingCode ? 'Calling Code' : 'Internet Domain'}
                </div>
                <div className="font-mono font-bold text-slate-200 text-sm mt-0.5">
                  {[details.callingCode, details.tld].filter(Boolean).join(' • ')}
                </div>
              </div>
            )}
            {details.timeZones && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Time Zone(s)</div>
                <div className="font-mono text-slate-300 text-[11px] truncate mt-0.5" title={details.timeZoneNote}>
                  {details.timeZones[0]}
                </div>
                {details.timeZoneNote && (
                  <div className="text-slate-500 text-[10px] leading-snug mt-0.5">{details.timeZoneNote}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
