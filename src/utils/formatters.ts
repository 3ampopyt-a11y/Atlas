import { CountryData } from '../types.ts';

export function formatBudget(budgetUSD: number): string {
  if (budgetUSD >= 1000) {
    return `$${(budgetUSD / 1000).toFixed(2)}T`;
  }
  if (budgetUSD >= 1) {
    return `$${budgetUSD.toFixed(1)}B`;
  }
  return `$${Math.round(budgetUSD * 1000)}M`;
}

export function formatPersonnel(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(2)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString();
}

export function formatPopulation(pop: number): string {
  if (pop >= 1000000000) {
    return `${(pop / 1000000000).toFixed(2)} Billion`;
  }
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)} Million`;
  }
  return pop.toLocaleString();
}

export function formatArea(areaKm2: number): string {
  return `${areaKm2.toLocaleString()} km² (${Math.round(areaKm2 * 0.3861).toLocaleString()} sq mi)`;
}

export function formatLongevity(country: CountryData): string {
  const years = country.longevity.yearsAlive;
  const foundYear = country.longevity.foundationYear;
  const yearStr = foundYear < 0 ? `${Math.abs(foundYear)} BCE` : `${foundYear} CE`;
  return `${years.toLocaleString()} years (since ${yearStr})`;
}

export function getNuclearBadge(status: string, warheads: number): { label: string; color: string; icon: string } {
  if (status === 'Declared Nuclear State') {
    return { label: `Nuclear Arsenal: ~${warheads.toLocaleString()}`, color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: '☢️' };
  }
  if (status === 'Undeclared Nuclear State') {
    return { label: `Undeclared Arsenal: ~${warheads}`, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: '☢️' };
  }
  if (status === 'Nuclear Sharing / NATO') {
    return { label: `NATO Nuclear Sharing (~${warheads})`, color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: '🛡️' };
  }
  if (status === 'Former Nuclear State') {
    return { label: 'Denuclearized State', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: '🕊️' };
  }
  return { label: 'Non-Nuclear State', color: 'bg-slate-800/80 text-slate-400 border-slate-700/50', icon: '🕊️' };
}
