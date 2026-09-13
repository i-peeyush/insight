import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  Map,
  Star,
  Globe,
  Share2
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { navigationConfig } from '../../config/navigation';
import { useCompanyConfig } from '../../config/company';
import { newsletterApi } from '../../api/contactApi';
import { useToast } from '../../contexts/ToastContext';
import { analytics } from '../../utils/analytics';
import { t } from '../../language';

export const Footer: React.FC = () => {
  const company = useCompanyConfig();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast(t.nav.footer.invalidEmail, 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await newsletterApi.subscribe({ email });
      analytics.track('newsletter_subscribed', { email });
      showToast(t.nav.footer.subscribeSuccess, 'success');
      setEmail('');
    } catch (err) {
      showToast(t.nav.footer.subscribeError, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const social = company.socialLinks || {};

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container-custom">
        {/* Top Newsletter & Callout Banner */}
        <div className="bg-gradient-to-r from-[#DC2626] to-[#1E293B] rounded-3xl p-8 md:p-12 mb-16 border border-red-200/40 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-red-200 uppercase tracking-widest">
              {t.nav.footer.bulletinEyebrow}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {t.nav.footer.bulletinTitle}
            </h3>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              {t.nav.footer.bulletinDesc}
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.nav.footer.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-red-200 text-sm"
              required
            />
            <Button
              type="submit"
              variant="gold"
              size="md"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              {t.nav.footer.subscribeButton}
            </Button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="footer" lightMode />
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              {company.tagline || t.nav.footer.taglineDefault}
            </p>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2.5 hover:text-[#DC2626] transition-colors">
                <Phone className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                <span className="font-bold">{company.phoneDisplay}</span>
              </a>
              <a href={`mailto:${company.emailDisplay}`} className="flex items-center gap-2.5 hover:text-[#DC2626] transition-colors">
                <Mail className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                <span>{company.emailDisplay}</span>
              </a>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>{company.addressDisplay || company.address}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <span>Mon-Fri: {company.businessHours?.monday_friday || '7:00 AM - 8:00 PM EST'}</span>
              </div>
            </div>

            {/* Extended Social Media Profiles */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.nav.footer.connectWithUs}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(social).map(([key, url]) => {
                  if (!url || typeof url !== 'string' || !url.trim()) return null;
                  
                  const cleanKey = key.toLowerCase();
                  let icon = <Globe className="w-4 h-4" />;
                  let bgHover = 'hover:bg-slate-700';
                  let title = key.charAt(0).toUpperCase() + key.slice(1);
                  let href = url;

                  if (cleanKey.includes('facebook')) {
                    icon = <Facebook className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#1877F2]';
                    title = 'Facebook';
                  } else if (cleanKey.includes('twitter') || cleanKey === 'x') {
                    icon = <Twitter className="w-4 h-4" />;
                    bgHover = 'hover:bg-black';
                    title = 'Twitter / X';
                  } else if (cleanKey.includes('instagram')) {
                    icon = <Instagram className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#E4405F]';
                    title = 'Instagram';
                  } else if (cleanKey.includes('linkedin')) {
                    icon = <Linkedin className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#0A66C2]';
                    title = 'LinkedIn';
                  } else if (cleanKey.includes('youtube')) {
                    icon = <Youtube className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#FF0000]';
                    title = 'YouTube';
                  } else if (cleanKey.includes('whatsapp')) {
                    icon = <MessageCircle className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#25D366]';
                    title = 'WhatsApp';
                    href = url.startsWith('http') ? url : `https://wa.me/${url.replace(/[^0-9]/g, '')}`;
                  } else if (cleanKey.includes('yelp')) {
                    icon = <Star className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#D32323]';
                    title = 'Yelp';
                  } else if (cleanKey.includes('google') || cleanKey.includes('map')) {
                    icon = <Map className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#4285F4]';
                    title = 'Google Business Profile';
                  } else if (cleanKey.includes('tiktok')) {
                    icon = <Globe className="w-4 h-4" />;
                    bgHover = 'hover:bg-slate-700';
                    title = 'TikTok';
                  } else if (cleanKey.includes('pinterest')) {
                    icon = <Share2 className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#E60023]';
                    title = 'Pinterest';
                  } else if (cleanKey.includes('thread')) {
                    icon = <Globe className="w-4 h-4" />;
                    bgHover = 'hover:bg-black';
                    title = 'Threads';
                  } else if (cleanKey.includes('reddit')) {
                    icon = <Globe className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#FF4500]';
                    title = 'Reddit';
                  } else if (cleanKey.includes('telegram')) {
                    icon = <Send className="w-4 h-4" />;
                    bgHover = 'hover:bg-[#229ED9]';
                    title = 'Telegram';
                  }

                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white ${bgHover} transition-colors`}
                      aria-label={title}
                      title={title}
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {t.nav.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.services.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-red-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pest Library */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {t.nav.footer.pestsTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.pestLibrary.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-red-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {t.nav.footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.company.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-red-400 transition-colors block py-0.5">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/admin" className="text-slate-500 hover:text-red-400 transition-colors text-[11px] block font-semibold">
                  {t.nav.footer.adminPortalLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Guarantee Ribbon */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {company.companyName || 'Insight Pest Solutions'}. {t.nav.footer.rightsReserved}</p>
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

