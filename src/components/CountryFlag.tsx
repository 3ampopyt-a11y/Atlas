import React, { useState } from 'react';
import { getCountryFlagEmoji } from '../utils/sovereignData.ts';

interface CountryFlagProps {
  countryCode?: string; // 2-letter ISO code, e.g. "US", "FR"
  countryName?: string;
  flagEmoji?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const SIZES = {
  sm: 'w-5 h-3.5 text-base',
  md: 'w-7 h-5 text-xl',
  lg: 'w-10 h-7 text-3xl',
  xl: 'w-14 h-10 text-4xl',
  '2xl': 'w-20 h-14 text-5xl',
};

const IMG_WIDTHS = {
  sm: 'w40',
  md: 'w80',
  lg: 'w160',
  xl: 'w320',
  '2xl': 'w640',
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName = 'Country',
  flagEmoji,
  size = 'md',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const sizeClasses = SIZES[size] || SIZES.md;
  const imgWidth = IMG_WIDTHS[size] || IMG_WIDTHS.md;
  const code = (countryCode || '').toLowerCase().trim();

  // If code is valid 2-letter, try rendering genuine high-res national flag image from FlagCDN
  const isValidCode = code.length === 2 && /^[a-z]{2}$/.test(code);

  if (isValidCode && !hasError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-md shadow-sm border border-slate-700/60 bg-slate-800 ${sizeClasses.split(' ')[0]} ${sizeClasses.split(' ')[1]} ${className}`}
        title={`${countryName} National Flag`}
      >
        <img
          src={`https://flagcdn.com/${imgWidth}/${code}.png`}
          srcSet={`https://flagcdn.com/${imgWidth === 'w40' ? 'w80' : 'w160'}/${code}.png 2x`}
          alt={`${countryName} National Flag`}
          className="w-full h-full object-cover select-none"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback to true Unicode emoji flag
  const fallbackEmoji = flagEmoji && flagEmoji !== '🌐' && flagEmoji !== '🏳️'
    ? flagEmoji
    : getCountryFlagEmoji({ code: countryCode, flag: flagEmoji });

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none filter drop-shadow leading-none ${sizeClasses.split(' ')[2] || 'text-xl'} ${className}`}
      title={`${countryName} Flag`}
      role="img"
      aria-label={`${countryName} Flag`}
    >
      {fallbackEmoji}
    </span>
  );
};
