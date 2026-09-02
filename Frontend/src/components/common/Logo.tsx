import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'mobile' | 'icon-only';
  lightMode?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  lightMode = false,
  className = ''
}) => {
  const isDarkBg = lightMode;
  const textColorPrimary = isDarkBg ? '#FFFFFF' : '#144A38';
  const textColorSecondary = isDarkBg ? '#34D399' : '#059669';
  const iconShieldFill = isDarkBg ? '#10B981' : '#144A38';
  const iconShieldStroke = isDarkBg ? '#34D399' : '#10B981';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 select-none ${className}`} aria-label="Insight Pest Solutions Home">
      {/* Official Brand Shield Icon */}
      <svg
        width={variant === 'mobile' ? 36 : 42}
        height={variant === 'mobile' ? 36 : 42}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="64" height="64" rx="14" fill={iconShieldFill} />
        {/* Protective Shield Geometry */}
        <path
          d="M32 10L48 16V28C48 40.5 41.2 49.8 32 54C22.8 49.8 16 40.5 16 28V16L32 10Z"
          fill="#10B981"
          fillOpacity="0.25"
          stroke={iconShieldStroke}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Core IPM Focus & Leaf Target Symbol */}
        <circle cx="32" cy="27" r="5" fill="#10B981" />
        <path d="M32 32V43" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M25 37.5L39 37.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        {/* Antennae & Micro-Defense Rays */}
        <path d="M24 23L19 19" stroke={iconShieldStroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 23L45 19" stroke={iconShieldStroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 41L19 45" stroke={iconShieldStroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 41L45 45" stroke={iconShieldStroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Brand Typography Wordmark */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              style={{ color: textColorPrimary, fontFamily: 'var(--font-heading)' }}
              className="text-xl md:text-2xl font-extrabold tracking-tight uppercase"
            >
              INSIGHT
            </span>
          </div>
          <span
            style={{ color: textColorSecondary }}
            className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase mt-0.5"
          >
            PEST SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
};
