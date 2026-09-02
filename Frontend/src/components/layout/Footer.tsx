import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { navigationConfig } from '../../config/navigation';
import { companyConfig } from '../../config/company';
import { newsletterApi } from '../../api/contactApi';
import { useToast } from '../../contexts/ToastContext';
import { analytics } from '../../utils/analytics';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await newsletterApi.subscribe({ email });
      analytics.track('newsletter_subscribed', { email });
      showToast('Thank you for subscribing to seasonal pest protection alerts!', 'success');
      setEmail('');
    } catch (err) {
      showToast('Subscription failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container-custom">
        {/* Top Newsletter & Callout Banner */}
        <div className="bg-gradient-to-r from-[#144A38] to-[#1E293B] rounded-3xl p-8 md:p-12 mb-16 border border-emerald-800/40 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Seasonal Pest Defense Bulletin
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Stay ahead of seasonal pest migrations
            </h3>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              Get timely prevention tips, weather-driven pest swarm advisories, and exclusive subscriber treatment discounts.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-emerald-400 text-sm"
              required
            />
            <Button
              type="submit"
              variant="gold"
              size="md"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="footer" lightMode />
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              Insight Pest Solutions provides state-of-the-art Integrated Pest Management (IPM), termite defense, bed bug heat remediation, and rodent exclusion for residential and commercial properties.
            </p>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href={`tel:${companyConfig.phoneRaw}`} className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-bold">{companyConfig.phoneDisplay} (Toll-Free)</span>
              </a>
              <a href={`mailto:${companyConfig.emailDisplay}`} className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{companyConfig.emailDisplay}</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{companyConfig.addressDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Mon-Fri: {companyConfig.businessHours.monday_friday}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href={companyConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={companyConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={companyConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={companyConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Pest Services
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.services.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-emerald-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pest Library */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Pest Library
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.pestLibrary.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-emerald-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Insight Pest
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.company.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-emerald-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/admin" className="text-slate-500 hover:text-emerald-400 transition-colors text-[11px] block">
                  Staff / Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Guarantee Ribbon */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Insight Pest Solutions. All rights reserved. Professional Pest Control Services.</p>
          <div className="flex items-center gap-4 flex-wrap">
            {navigationConfig.footerNav.legal.map((item) => (
              <Link key={item.path} to={item.path} className="hover:text-slate-300 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
