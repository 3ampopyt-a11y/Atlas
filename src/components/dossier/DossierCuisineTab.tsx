import React, { useState } from 'react';
import { CountryData, NationalFoodItem } from '../../types.ts';
import { getCountryCulinaryProfile } from '../../utils/nationalFoodsData.ts';
import {
  Utensils,
  Sparkles,
  Flame,
  Coffee,
  Cookie,
  Wheat,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface DossierCuisineTabProps {
  country: CountryData;
}

export const DossierCuisineTab: React.FC<DossierCuisineTabProps> = ({ country }) => {
  const profile = getCountryCulinaryProfile(country);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mains' | 'street' | 'desserts' | 'drinks'>('all');
  const [expandedFood, setExpandedFood] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpandedFood(expandedFood === name ? null : name);
  };

  const renderFoodCard = (food: NationalFoodItem, isFeatured: boolean = false) => {
    const isExpanded = expandedFood === food.name || isFeatured;

    return (
      <div
        key={food.name}
        className={`p-4 rounded-2xl transition-all border ${
          isFeatured
            ? 'bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/40 shadow-lg'
            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-slate-950/70 border border-slate-800 shadow-inner flex items-center justify-center shrink-0">
              {food.iconEmoji || '🍲'}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-100 text-sm">{food.name}</span>
                {food.nativeName && (
                  <span className="text-xs font-medium text-amber-300/90 font-mono">
                    ({food.nativeName})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {food.category}
                </span>
                {food.flavorProfile && (
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    Profile: {food.flavorProfile}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleExpand(food.name)}
            className="text-slate-400 hover:text-slate-200 p-1 text-xs shrink-0"
            title={isExpanded ? 'Collapse Details' : 'Expand Details'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Food Description */}
        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
          {food.description}
        </p>

        {/* Expanded Details: Key Ingredients, Significance & Flavor */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs animate-in fade-in duration-150">
            {food.flavorProfile && (
              <div className="flex items-center gap-1.5 text-[11px] sm:hidden">
                <span className="text-slate-400">Flavor:</span>
                <span className="font-semibold text-amber-200">{food.flavorProfile}</span>
              </div>
            )}

            {food.keyIngredients && food.keyIngredients.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Key Ingredients & Spices:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {food.keyIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[10px]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {food.culturalSignificance && (
              <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-200/90 text-[11px] flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{food.culturalSignificance}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="section-cuisine" className="space-y-4 animate-in fade-in duration-150">
      {/* Header Banner: Culinary Traditions & Gastronomic Heritage */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              National Foods & Culinary Gastronomy
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {country.name}
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">
              Iconic national dishes, ancestral flavors, street delicacies, and traditional beverages
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {profile.culinaryTraditions}
        </p>

        {/* Staple Ingredients Strip */}
        {profile.stapleIngredients && profile.stapleIngredients.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Wheat className="w-3 h-3 text-amber-400" /> Staples:
            </span>
            {profile.stapleIngredients.map((staple, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/60 text-[10px] text-slate-200 font-medium"
              >
                {staple}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          All Culinary Items
        </button>
        <button
          onClick={() => setSelectedCategory('mains')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'mains'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Utensils className="w-3 h-3" /> National Dishes ({profile.nationalDishes.length})
        </button>
        {profile.popularStreetFoods.length > 0 && (
          <button
            onClick={() => setSelectedCategory('street')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'street'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Flame className="w-3 h-3" /> Street Foods ({profile.popularStreetFoods.length})
          </button>
        )}
        {profile.dessertsAndPastries.length > 0 && (
          <button
            onClick={() => setSelectedCategory('desserts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'desserts'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Cookie className="w-3 h-3" /> Desserts & Pastries ({profile.dessertsAndPastries.length})
          </button>
        )}
        {profile.signatureBeverages.length > 0 && (
          <button
            onClick={() => setSelectedCategory('drinks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'drinks'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Coffee className="w-3 h-3" /> Traditional Beverages ({profile.signatureBeverages.length})
          </button>
        )}
      </div>

      {/* Section 1: National Dishes & Signature Mains */}
      {(selectedCategory === 'all' || selectedCategory === 'mains') && (
        <div className="space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Utensils className="w-4 h-4 text-amber-400" /> Crown National Dishes & Signature Mains
            </span>
            <span className="text-[10px] text-slate-400">Primary Culinary Identity</span>
          </div>
          <div className="space-y-2.5">
            {profile.nationalDishes.map((food, idx) => renderFoodCard(food, idx === 0))}
          </div>
        </div>
      )}

      {/* Section 2: Popular Street Foods & Casual Bites */}
      {(selectedCategory === 'all' || selectedCategory === 'street') && profile.popularStreetFoods.length > 0 && (
        <div className="space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Flame className="w-4 h-4 text-orange-400" /> Popular Street Foods & Night Market Delicacies
            </span>
            <span className="text-[10px] text-slate-400">Local Daily Life</span>
          </div>
          <div className="space-y-2.5">
            {profile.popularStreetFoods.map((food) => renderFoodCard(food))}
          </div>
        </div>
      )}

      {/* Section 3: Desserts, Sweets & Pastries */}
      {(selectedCategory === 'all' || selectedCategory === 'desserts') && profile.dessertsAndPastries.length > 0 && (
        <div className="space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Cookie className="w-4 h-4 text-pink-400" /> Festive Desserts, Sweets & Bakery Pastries
            </span>
            <span className="text-[10px] text-slate-400">Celebration Treats</span>
          </div>
          <div className="space-y-2.5">
            {profile.dessertsAndPastries.map((food) => renderFoodCard(food))}
          </div>
        </div>
      )}

      {/* Section 4: Traditional Drinks & Iconic Beverages */}
      {(selectedCategory === 'all' || selectedCategory === 'drinks') && profile.signatureBeverages.length > 0 && (
        <div className="space-y-2.5">
          <div className="font-bold text-slate-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Coffee className="w-4 h-4 text-cyan-400" /> Iconic National Beverages & Tea/Coffee Traditions
            </span>
            <span className="text-[10px] text-slate-400">Hospitality & Culture</span>
          </div>
          <div className="space-y-2.5">
            {profile.signatureBeverages.map((food) => renderFoodCard(food))}
          </div>
        </div>
      )}
    </div>
  );
};
