import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';

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
  const textColorPrimary = isDarkBg ? '#FFFFFF' : '#0F172A';
  const textColorSecondary = isDarkBg ? '#FCA5A5' : '#DC2626';

  const sizeClasses = {
    navbar: 'w-10 h-10',
    mobile: 'w-9 h-9',
    footer: 'w-11 h-11',
    'icon-only': 'w-10 h-10'
  }[variant];

  return (
    <Link to="/" className={`inline-flex items-center gap-3 select-none ${className}`} aria-label="Insight Pest Solutions Home">
      {/* Official Brand Logo Icon */}
      <img
        src={logoImg}
        alt="Insight Pest Solutions Logo"
        className={`${sizeClasses} object-contain flex-shrink-0 drop-shadow-sm`}
      />

      {/* Brand Typography Wordmark */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span
              style={{ color: textColorPrimary, fontFamily: 'var(--font-heading)' }}
              className="text-xl md:text-2xl font-black tracking-tight uppercase"
            >
              INSIGHT
            </span>
          </div>
          <span
            style={{ color: textColorSecondary }}
            className="text-[9px] md:text-[10px] font-extrabold tracking-widest uppercase mt-0.5"
          >
            PEST SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
};

