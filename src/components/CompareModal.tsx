import React, { useState } from 'react';
import { CountryData } from '../types.ts';
import { countryList } from '../data/countriesData.ts';
import { formatBudget, formatGdp, formatPerCapita, formatPersonnel, formatPopulation, formatArea, formatLongevity, getNuclearBadge } from '../utils/formatters.ts';
import { getCountryAlliances } from '../utils/allianceData.ts';
import { getCountryCulinaryProfile } from '../utils/nationalFoodsData.ts';
import { getDetailedMilitary } from '../utils/militaryData.ts';
import { CountryFlag } from './CountryFlag.tsx';
import { X, Plus, Scale, Shield, Clock, Award, DollarSign, Users, Plane, Anchor, Utensils } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountry?: CountryData | null;
  onSelectForView: (country: CountryData) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  initialCountry,
  onSelectForView,
}) => {
  const [selectedCountries, setSelectedCountries] = useState<CountryData[]>(() => {
    const list: CountryData[] = [];
    if (initialCountry) {
      list.push(initialCountry);
      // Pick another famous nation for instant comparison
      const second = countryList.find((c) => c.id !== initialCountry.id && (c.name === 'China' || c.name === 'United States' || c.name === 'United Kingdom'));
      if (second) list.push(second);
    } else {
      const us = countryList.find((c) => c.name === 'United States');
      const cn = countryList.find((c) => c.name === 'China');
      if (us) list.push(us);
      if (cn) list.push(cn);
    }
    return list;
  });

  const [searchPickerIndex, setSearchPickerIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleAddCountry = (c: CountryData) => {
    if (selectedCountries.some((item) => item.id === c.id)) return;
    if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, c]);
    } else if (searchPickerIndex !== null) {
      const copy = [...selectedCountries];
      copy[searchPickerIndex] = c;
      setSelectedCountries(copy);
    }
    setSearchPickerIndex(null);
    setSearchQuery('');
  };

  const handleRemoveCountry = (id: string) => {
    if (selectedCountries.length <= 1) return;
    setSelectedCountries(selectedCountries.filter((c) => c.id !== id));
  };

  const filteredPickerList = countryList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.officialName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="compare-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="compare-modal-dialog"
        className="w-full max-w-5xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-y-auto custom-scrollbar text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Minimal Close Button */}
        <button
          id="btn-close-compare"
          onClick={onClose}
          className="sticky top-3 right-3 self-end -mb-9 mr-3 z-30 p-1.5 sm:p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 shadow-md backdrop-blur-sm transition-colors"
          title="Close comparison"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Natural Scrolling Header */}
        <div className="p-5 pr-12 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Sovereign & Military Head-to-Head Comparison
              </h2>
              <p className="text-xs text-slate-400">
                Compare sovereign longevity, armed forces strength, defense spending, and hardware
              </p>
            </div>
          </div>
        </div>

        {/* Selected Country Columns */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40 grid grid-cols-1 md:grid-cols-3 gap-3">
          {selectedCountries.map((country, idx) => (
            <div
              key={country.id}
              className="relative p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <CountryFlag
                  countryCode={country.code}
                  countryName={country.name}
                  flagEmoji={country.flag}
                  size="md"
                  className="shrink-0"
                />
                <div>
                  <div className="font-bold text-slate-100 text-sm">{country.name}</div>
                  <div className="text-[10px] text-slate-400">
                    GFP #{country.military.globalRank} • Alive {country.longevity.yearsAlive.toLocaleString()} yrs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSearchPickerIndex(idx)}
                  className="px-2 py-1 rounded-lg text-[10px] text-cyan-400 hover:bg-slate-800 transition-colors"
                >
                  Change
                </button>
                {selectedCountries.length > 1 && (
                  <button
                    onClick={() => handleRemoveCountry(country.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {selectedCountries.length < 3 && (
            <button
              id="btn-add-compare-slot"
              onClick={() => setSearchPickerIndex(selectedCountries.length)}
              className="p-3 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Nation to Compare</span>
            </button>
          )}
        </div>

        {/* Modal Body / Comparison Matrix - scrolls naturally with header */}
        <div className="p-5 space-y-6 text-xs">
          {/* Section 1: Sovereign Longevity */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-sm">
              <Clock className="w-4 h-4" /> Sovereign Longevity & Historical Statehood
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedCountries.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400">How Long It Is Alive:</div>
                  <div className="text-base font-bold font-mono text-emerald-400">
                    {c.longevity.yearsAlive.toLocaleString()} Years Alive
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    <span className="text-slate-500 block">Foundation:</span>
                    {c.longevity.foundationEvent} (
                    <span className="text-emerald-300 font-mono font-semibold">
                      {c.longevity.foundationYear < 0
                        ? `${Math.abs(c.longevity.foundationYear)} BCE`
                        : `${c.longevity.foundationYear} CE`}
                    </span>
                    )
                  </div>
                  <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800/80">
                    Current Era: <span className="text-slate-200">{c.longevity.sovereignEra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Military Firepower & Defense */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 text-sm">
              <Shield className="w-4 h-4" /> Military Firepower & Armed Forces
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedCountries.map((c) => {
                const nuclear = getNuclearBadge(c.military.nuclearStatus, c.military.nuclearWarheads);
                const mil = getDetailedMilitary(c);
                return (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Global Firepower:</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        Rank #{mil.globalRank} ({mil.tier})
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">PowerIndex:</span>
                      <span className="font-mono text-slate-200 font-semibold">
                        {mil.powerIndex.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Annual Defense Budget:</span>
                      <span className="font-mono font-bold text-cyan-400">
                        {formatBudget(mil.defenseBudgetUSD)} ({mil.defenseBudgetPercentGDP}% GDP)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Active Duty Troops:</span>
                      <span className="font-mono font-bold text-rose-400">
                        {mil.activePersonnel.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] bg-amber-500/10 p-1.5 rounded-xl border border-amber-500/20">
                      <span className="text-amber-300 font-medium">⚡ Active Reserves:</span>
                      <span className="font-mono font-bold text-amber-300">
                        {mil.reservePersonnel.toLocaleString()} ({mil.reserveRatioPercent}%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Paramilitary Force:</span>
                      <span className="font-mono text-slate-300">
                        {mil.paramilitary.toLocaleString()}
                      </span>
                    </div>
                    <div className={`p-2 rounded-xl text-[10px] border flex justify-between ${nuclear.color}`}>
                      <span>{nuclear.icon} {mil.nuclearStatus}</span>
                      <span className="font-mono font-bold">~{mil.nuclearWarheads}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Hardware & Arsenal */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-sky-400 text-sm">
              <Plane className="w-4 h-4" /> Vehicles, Aircraft & Warship Arsenal
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedCountries.map((c) => {
                const mil = getDetailedMilitary(c);
                return (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Main Battle Tanks:</span>
                      <span className="font-mono font-bold text-emerald-400">{mil.tanks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Armored Fighting Vehicles:</span>
                      <span className="font-mono text-slate-200">{mil.armoredVehicles.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Artillery & MLRS:</span>
                      <span className="font-mono text-amber-300 font-semibold">
                        {(mil.selfPropelledArtillery + mil.towedArtillery).toLocaleString()} Guns • {mil.rocketArtilleryMLRS} MLRS
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400">Combat Jets:</span>
                      <span className="font-mono font-bold text-sky-400">{mil.combatAircraft.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Attack Helicopters:</span>
                      <span className="font-mono text-rose-300 font-bold">{mil.attackHelicopters.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Aircraft Fleet:</span>
                      <span className="font-mono text-slate-200 font-bold">{mil.totalAircraft.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400">Naval Fleet Total:</span>
                      <span className="font-mono font-bold text-blue-400">{mil.navalFleetTotal} Ships</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Carriers & Amphibious:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{mil.aircraftCarriers} Carriers • {mil.helicopterCarriers} LHD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submarines:</span>
                      <span className="font-mono font-bold text-blue-400">
                        {mil.submarines} {mil.nuclearSubmarines > 0 ? `(${mil.nuclearSubmarines} Nuclear)` : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Economy & Territory */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-sm">
              <DollarSign className="w-4 h-4" /> Economy, Population & Territory
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedCountries.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nominal GDP:</span>
                    <span className="font-mono font-bold text-emerald-400">{formatGdp(c.economy.gdpNominalUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GDP Per Capita:</span>
                    <span className="font-mono text-slate-200">{formatPerCapita(c.economy.gdpPerCapitaUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Population:</span>
                    <span className="font-mono font-bold text-slate-200">{formatPopulation(c.demographics.population)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Land Area:</span>
                    <span className="font-mono text-slate-200">
                      {c.geography.areaKm2.toLocaleString()} km²
                      {c.geography.areaKm2 >= 1000000 && ` (~${(c.geography.areaKm2 / 1000000).toFixed(2)}M)`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Defense Alliances & Geopolitical Pacts */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-sm">
              <Shield className="w-4 h-4" /> Defense Alliances & Collective Security
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedCountries.map((c) => {
                const countryAlliances = getCountryAlliances(c.code || c.name);
                return (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-[11px]">
                    <div className="text-slate-400 text-[10px]">
                      {countryAlliances.length > 0 ? `${countryAlliances.length} Active Treaties` : 'Non-Aligned / Neutral'}
                    </div>
                    {countryAlliances.length === 0 ? (
                      <div className="p-2 rounded-xl bg-slate-950/60 text-slate-400 text-xs">
                        🕊️ No formal mutual defense pacts (Neutral)
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {countryAlliances.map((a) => (
                          <div
                            key={a.id}
                            className={`p-2 rounded-xl border flex items-center justify-between gap-1.5 ${a.accentColor}`}
                          >
                            <span className="flex items-center gap-1.5 font-bold text-slate-100">
                              <span className="text-sm">{a.flagEmoji}</span>
                              <span>{a.shortName}</span>
                            </span>
                            <span className="text-[10px] text-slate-300 font-mono">
                              {a.members.length} Allies
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 6: National Foods & Culinary Heritage */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" /> 6. National Foods & Culinary Heritage
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedCountries.map((c) => {
                const culinary = getCountryCulinaryProfile(c);
                const primary = culinary.nationalDishes[0];
                return (
                  <div key={c.id} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <span className="font-bold text-slate-200 text-xs truncate">{c.name}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1">
                      <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                        National Dish
                      </div>
                      <div className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                        <span>{primary?.iconEmoji || '🍲'}</span>
                        <span className="truncate">{primary?.name}</span>
                      </div>
                      {primary?.flavorProfile && (
                        <div className="text-[10px] text-amber-300/80 font-mono">
                          {primary.flavorProfile}
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <span className="text-slate-400 text-[10px] block font-medium">Staples:</span>
                      <span className="text-xs">{culinary.stapleIngredients.slice(0, 3).join(', ')}</span>
                    </div>

                    {culinary.signatureBeverages.length > 0 && (
                      <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">Iconic Drink:</span>
                        <span className="font-semibold text-slate-200 text-[10px] truncate max-w-[130px]">
                          {culinary.signatureBeverages[0].iconEmoji || '🫖'} {culinary.signatureBeverages[0].name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Picker Modal Overlay if user clicked "Change" or "Add" */}
        {searchPickerIndex !== null && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-20 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-100 text-sm">Select a Country to Compare</h3>
              <button
                onClick={() => setSearchPickerIndex(null)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 mb-3 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
              {filteredPickerList.slice(0, 30).map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleAddCountry(c)}
                  className="w-full py-2.5 px-3 flex items-center justify-between hover:bg-slate-900 rounded-lg text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="font-bold text-slate-200 text-xs">{c.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {c.capital} • {c.continent}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[10px]">
                    <span className="text-amber-400 font-mono">Rank #{c.military.globalRank}</span>
                    <span className="block text-emerald-400">Alive {c.longevity.yearsAlive} yrs</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
