import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, Calendar, Calculator, Shield } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { navigationConfig } from '../../config/navigation';
import { companyConfig } from '../../config/company';
import { t } from '../../language';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  if (!isOpen) return null;

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/60 backdrop-blur-sm md:hidden animate-fade-in">
      <div className="w-full bg-white h-full flex flex-col justify-between overflow-y-auto max-w-sm">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <Logo variant="mobile" />
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label={t.nav.header.closeMenuAria}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-5 flex-1 space-y-2">
          {navigationConfig.mainNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isSubOpen = openSubmenu === item.label;
            const isActive = location.pathname === item.path;

            return (
              <div key={item.label} className="border-b border-slate-100/60 pb-2">
                {hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-800 hover:text-[#DC2626]"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-red-600' : ''
                        }`}
                      />
                    </button>
                    {isSubOpen && (
                      <div className="pl-3 py-2 space-y-2 bg-slate-50 rounded-lg animate-fade-in">
                        {item.children!.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={onClose}
                            className="block text-sm font-medium text-slate-600 hover:text-[#DC2626] py-1"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`block py-2 text-base font-semibold transition-colors ${
                      isActive ? 'text-[#DC2626]' : 'text-slate-800 hover:text-[#DC2626]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
          <Button
            to="/request-quote"
            variant="gold"
            size="md"
            className="w-full justify-center"
            leftIcon={<Calculator className="w-4 h-4" />}
            onClick={onClose}
          >
            {t.nav.mobileMenu.quickQuote}
          </Button>

          <Button
            to="/book-inspection"
            variant="primary"
            size="md"
            className="w-full justify-center"
            leftIcon={<Calendar className="w-4 h-4" />}
            onClick={onClose}
          >
            {t.nav.mobileMenu.bookInspection}
          </Button>

          <a
            href={`tel:${companyConfig.phoneRaw}`}
            className="flex items-center justify-center gap-2 text-sm font-bold text-[#DC2626] py-2 hover:underline"
          >
            <Phone className="w-4 h-4 text-red-600" />
            <span>{t.nav.mobileMenu.callPrefix} {companyConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
