import React from 'react';
import { CountryData } from '../../types.ts';
import { ExtendedCountryDetails } from '../../data/countryDetails.ts';
import { getCountryCulinaryProfile } from '../../utils/nationalFoodsData.ts';
import { getCountryNationalSport } from '../../utils/nationalSportsData.ts';
import {
  Landmark,
  Utensils,
  GraduationCap,
  Sparkles,
  Flame,
  Globe2,
  Wheat,
  Coffee,
  Trophy,
} from 'lucide-react';

interface DossierCultureTabProps {
  country: CountryData;
  details: ExtendedCountryDetails;
  onNavigateToCuisine?: () => void;
}

export const DossierCultureTab: React.FC<DossierCultureTabProps> = ({
  country,
  details,
  onNavigateToCuisine,
}) => {
  const { nationalDish, famousHistoricalFigures, globalContributions } =
    details.culturalHeritageHighlights || {};
  const culinary = getCountryCulinaryProfile(country);
  const primaryDish = culinary.nationalDishes[0];
  const nationalSport = getCountryNationalSport(country);

  return (
    <div id="section-culture" className="space-y-4 animate-in fade-in duration-150">
      {/* Culinary Heritage & National Foods Showcase */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-amber-400" /> National Foods & Culinary Identity
          </div>
          {onNavigateToCuisine && (
            <button
              onClick={onNavigateToCuisine}
              className="text-[10px] text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              View All Foods & Recipes →
            </button>
          )}
        </div>

        {/* Primary National Dish Feature */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{primaryDish?.iconEmoji || '🍲'}</span>
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
                  Crown National Dish
                </span>
                <span className="font-bold text-slate-100 text-sm">
                  {primaryDish?.name || nationalDish}
                </span>
                {primaryDish?.nativeName && (
                  <span className="text-[11px] text-slate-400 font-mono ml-1.5">
                    ({primaryDish.nativeName})
                  </span>
                )}
              </div>
            </div>
            {primaryDish?.flavorProfile && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium shrink-0">
                {primaryDish.flavorProfile}
              </span>
            )}
          </div>

          {primaryDish?.description && (
            <p className="text-xs text-slate-300 leading-relaxed">
              {primaryDish.description}
            </p>
          )}

          {primaryDish?.keyIngredients && primaryDish.keyIngredients.length > 0 && (
            <div className="pt-1.5 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400 font-medium">Ingredients:</span>
              {primaryDish.keyIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 text-[10px] text-slate-200"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Highlights: Street Foods & Beverages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {culinary.popularStreetFoods.length > 0 && (
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                <Flame className="w-3 h-3" /> Famous Street Food:
              </span>
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span>{culinary.popularStreetFoods[0].iconEmoji || '🍢'}</span>
                <span>{culinary.popularStreetFoods[0].name}</span>
              </div>
            </div>
          )}
          {culinary.signatureBeverages.length > 0 && (
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                <Coffee className="w-3 h-3" /> Iconic Beverage:
              </span>
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span>{culinary.signatureBeverages[0].iconEmoji || '🫖'}</span>
                <span>{culinary.signatureBeverages[0].name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Celebrated Historical Figures & Pioneers */}
      {famousHistoricalFigures && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-cyan-400" /> Celebrated Historical Figures & Pioneers
          </div>
          <div className="flex flex-wrap gap-1.5">
            {famousHistoricalFigures.map((person, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-[11px] font-medium"
              >
                {person}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Global Civilizational Contributions */}
      {globalContributions && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Global Civilizational & Scientific Contributions
          </div>
          <div className="space-y-1.5 text-xs">
            {globalContributions.map((contrib, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{contrib}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* National Sport & Athletic Identity */}
      {nationalSport && (
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>National Sport & Athletic Heritage</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono font-bold border border-emerald-500/30">
            {nationalSport.status}
          </span>
        </div>
        <div className="flex items-start gap-3 pt-1">
          <span className="text-3xl p-2.5 rounded-2xl bg-slate-950 border border-emerald-500/30 shrink-0">
            {nationalSport.emoji}
          </span>
          <div className="space-y-1 flex-1">
            <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5 flex-wrap">
              <span>{nationalSport.sportName}</span>
              {nationalSport.nativeName && (
                <span className="text-xs text-slate-400 font-mono">
                  ({nationalSport.nativeName})
                </span>
              )}
            </div>
            {nationalSport.notableAchievements && (
              <div className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <span>🏅</span>
                <span>{nationalSport.notableAchievements}</span>
              </div>
            )}
            {nationalSport.iconicEventOrLeague && (
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="text-slate-500">Key League/Event:</span>
                <span className="text-slate-300 font-medium">{nationalSport.iconicEventOrLeague}</span>
              </div>
            )}
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {nationalSport.description}
            </p>
          </div>
        </div>
      </div>
      )}

      {/* National Symbols */}
      {(details.nationalAnimal || details.nationalSymbol) && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-[11px]">
          <div className="font-bold text-slate-200 text-xs">National Emblems & Symbols</div>
          {details.nationalAnimal && (
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">National Animal / Bird:</span>
              <span className="font-semibold text-slate-200">{details.nationalAnimal}</span>
            </div>
          )}
          {details.nationalSymbol && (
            <div className="flex justify-between py-1">
              <span className="text-slate-400">National Emblem:</span>
              <span className="font-semibold text-slate-200">{details.nationalSymbol}</span>
            </div>
          )}
        </div>
      )}

      {/* UNESCO World Heritage Sites */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-amber-400" /> UNESCO World Heritage
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
            {country.culture.unescoSitesCount} Sites
          </span>
        </div>
        {country.governance.nationalMotto && (
          <div className="text-slate-400 text-xs pt-1">
            <span className="font-medium text-slate-300">National Motto: </span>
            <span className="italic text-slate-200 font-serif">"{country.governance.nationalMotto}"</span>
          </div>
        )}
      </div>

      {/* Languages & Religions */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-[11px]">
        <div className="font-bold text-slate-200 text-xs">Linguistics & Faith</div>
        <div className="space-y-2">
          <div>
            <span className="text-slate-400 block mb-1">Official Languages:</span>
            <div className="flex flex-wrap gap-1">
              {country.culture.officialLanguages.map((lang, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800">
            <span className="text-slate-400 block mb-1">Major Religions:</span>
            <div className="flex flex-wrap gap-1">
              {country.culture.majorReligions.map((rel, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                  {rel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Iconic Landmarks */}
      {country.culture.famousLandmarks && country.culture.famousLandmarks.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="font-bold text-slate-200 text-xs">Iconic Landmarks & Wonders</div>
          <div className="space-y-1 text-xs">
            {country.culture.famousLandmarks.map((mark, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <span className="text-amber-400 font-bold">•</span>
                <span>{mark}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Geopolitical Trivia */}
      {country.culture.interestingFacts && country.culture.interestingFacts.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <div className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-cyan-400" /> Fascinating Geopolitical Trivia
          </div>
          <div className="space-y-2 text-xs">
            {country.culture.interestingFacts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                <span className="text-cyan-400 font-bold text-sm leading-none mt-0.5">✦</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
