import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Phone, Calculator, Calendar } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { navigationConfig } from '../../config/navigation';
import { companyConfig } from '../../config/company';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
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
                      ? 'text-[#144A38] bg-[#E8F5F1]'
                      : 'text-slate-700 hover:text-[#144A38] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive || activeDropdown === item.label
                      ? 'text-[#144A38] bg-[#E8F5F1]'
                      : 'text-slate-700 hover:text-[#144A38] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === item.label}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#144A38] transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu Panel */}
                <div
                  className={`absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 transition-all duration-200 z-50 ${
                    activeDropdown === item.label
                      ? 'opacity-100 visible translate-y-1'
                      : 'opacity-0 invisible translate-y-3 pointer-events-none'
                  }`}
                >
                  <div className="space-y-1">
                    {item.children!.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div className="text-xs font-bold text-slate-900 group-hover/item:text-[#144A38]">
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
            Get a Quote
          </Button>

          <Button
            to="/book-inspection"
            variant="primary"
            size="sm"
            leftIcon={<Calendar className="w-3.5 h-3.5" />}
          >
            Book Inspection
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${companyConfig.phoneRaw}`}
            className="p-2 rounded-lg bg-[#E8F5F1] text-[#144A38] hover:bg-[#144A38] hover:text-white transition-colors"
            aria-label="Call Insight Pest"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
