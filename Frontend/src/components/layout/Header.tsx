import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Phone, Calculator, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { navigationConfig } from '../../config/navigation';
import { useCompanyConfig } from '../../config/company';
import { t } from '../../language';

export const Header: React.FC = () => {
  const company = useCompanyConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms grace period prevents dropdown from vanishing during cursor transition
  };

  const handleToggle = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(prev => prev === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-40 bg-white transition-all duration-300">
      {/* Optional Top Announcement Bar (Configurable in Admin Settings) */}
      {company.announcement?.enabled && (
        <div className="bg-[#0F172A] text-white text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="container-custom flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {company.announcement.badge && (
                <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {company.announcement.badge}
                </span>
              )}
              <span className="text-slate-300 font-medium truncate">
                {company.announcement.message}
              </span>
            </div>
            {company.announcement.buttonText && company.announcement.buttonLink && (
              <Link
                to={company.announcement.buttonLink}
                className="hidden sm:inline-flex items-center gap-1 text-[#DC2626] font-bold text-[11px] hover:text-red-400 transition-colors flex-shrink-0"
              >
                <span>{company.announcement.buttonText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo variant="navbar" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationConfig.mainNav.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = location.pathname === item.path || 
                (hasChildren && item.children!.some(c => location.pathname === c.path));

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#DC2626] bg-[#FEF2F2]'
                        : 'text-slate-700 hover:text-[#DC2626] hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleToggle(item.label)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors select-none ${
                      isActive || isOpen
                        ? 'text-[#DC2626] bg-[#FEF2F2]'
                        : 'text-slate-700 hover:text-[#DC2626] hover:bg-slate-50'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#DC2626]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Panel with bridge padding to prevent mouse-leave gaps */}
                  <div
                    className={`absolute top-full left-0 pt-2 w-72 z-50 transition-all duration-200 ${
                      isOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 ring-1 ring-black/5">
                      {item.children!.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#DC2626]">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to="/request-quote"
              variant="outline"
              size="sm"
              leftIcon={<Calculator className="w-3.5 h-3.5" />}
            >
              {t.nav.requestQuote}
            </Button>

            <Button
              to="/book-inspection"
              variant="primary"
              size="sm"
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
            >
              {t.nav.bookInspection}
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${company.phoneRaw}`}
              className="p-2 rounded-lg bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-colors"
              aria-label={t.nav.header.callAria}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={t.nav.header.openMenuAria}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

