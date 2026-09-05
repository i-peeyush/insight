import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Save, 
  Share2, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Map, 
  Star, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Megaphone, 
  CheckCircle2, 
  Eye,
  Send,
  Sparkles,
  X
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { companyConfig, useCompanyConfig } from '../../config/company';
import { useToast } from '../../contexts/ToastContext';
import { saveStoredCompanyConfig } from '../../utils/dataStore';
import { CompanyConfig } from '../../types/company';

interface PlatformMeta {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  placeholder: string;
}

const PRESET_PLATFORMS: PlatformMeta[] = [
  { key: 'facebook', label: 'Facebook Page URL', icon: Facebook, color: 'bg-[#1877F2]', placeholder: 'https://facebook.com/your-business' },
  { key: 'twitter', label: 'Twitter / X Profile URL', icon: Twitter, color: 'bg-black', placeholder: 'https://twitter.com/your-handle' },
  { key: 'instagram', label: 'Instagram Profile URL', icon: Instagram, color: 'bg-[#E4405F]', placeholder: 'https://instagram.com/your-business' },
  { key: 'linkedin', label: 'LinkedIn Company Page URL', icon: Linkedin, color: 'bg-[#0A66C2]', placeholder: 'https://linkedin.com/company/your-company' },
  { key: 'youtube', label: 'YouTube Channel URL', icon: Youtube, color: 'bg-[#FF0000]', placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'whatsapp', label: 'WhatsApp Support (Number / Link)', icon: MessageCircle, color: 'bg-[#25D366]', placeholder: '+18005557378 or https://wa.me/...' },
  { key: 'yelp', label: 'Yelp Reviews & Profile URL', icon: Star, color: 'bg-[#D32323]', placeholder: 'https://yelp.com/biz/your-company' },
  { key: 'googleBusiness', label: 'Google Business Profile / Maps URL', icon: Map, color: 'bg-[#4285F4]', placeholder: 'https://maps.google.com/?q=...' },
  { key: 'tiktok', label: 'TikTok Handle / URL', icon: Globe, color: 'bg-slate-800', placeholder: 'https://tiktok.com/@youraccount' },
  { key: 'pinterest', label: 'Pinterest Profile URL', icon: Share2, color: 'bg-[#E60023]', placeholder: 'https://pinterest.com/yourboard' },
  { key: 'threads', label: 'Threads Profile URL', icon: Globe, color: 'bg-black', placeholder: 'https://threads.net/@yourhandle' },
  { key: 'reddit', label: 'Reddit Community URL', icon: Globe, color: 'bg-[#FF4500]', placeholder: 'https://reddit.com/r/yourcommunity' },
  { key: 'telegram', label: 'Telegram Support Channel', icon: Send, color: 'bg-[#229ED9]', placeholder: 'https://t.me/yourchannel' },
  { key: 'nextdoor', label: 'Nextdoor Neighborhood Page', icon: Globe, color: 'bg-[#00B050]', placeholder: 'https://nextdoor.com/pages/your-page' },
];

export const AdminSettingsPage: React.FC = () => {
  const { addToast } = useToast();
  const currentConfig = useCompanyConfig();

  const [settings, setSettings] = useState<CompanyConfig>(() => ({
    companyName: currentConfig.companyName || 'Insight Pest Solutions',
    tagline: currentConfig.tagline || 'Smarter, Safer Pest Protection',
    phone: currentConfig.phoneDisplay || '(800) 555-PEST',
    phoneDisplay: currentConfig.phoneDisplay || '(800) 555-PEST',
    phoneRaw: currentConfig.phoneRaw || '+18005557378',
    email: currentConfig.emailDisplay || 'service@insightpest.com',
    emailDisplay: currentConfig.emailDisplay || 'service@insightpest.com',
    emergencyContact: currentConfig.emergencyContact || '24/7 Rapid Response Dispatch Available',
    address: currentConfig.addressDisplay || currentConfig.address || '100 Innovation Parkway, Suite 400, Metro Area',
    addressDisplay: currentConfig.addressDisplay || '100 Innovation Parkway, Suite 400, Metro Area',
    businessHours: {
      monday_friday: currentConfig.businessHours?.monday_friday || '7:00 AM - 8:00 PM EST',
      saturday: currentConfig.businessHours?.saturday || '8:00 AM - 6:00 PM EST',
      sunday: currentConfig.businessHours?.sunday || 'Emergency & Scheduled Inspections Only',
      holidayNote: currentConfig.businessHours?.holidayNote || '24/7 Emergency Dispatch On Call'
    },
    socialLinks: {
      facebook: currentConfig.socialLinks?.facebook ?? 'https://facebook.com/insightpestsolutions',
      twitter: currentConfig.socialLinks?.twitter ?? 'https://twitter.com/insightpest',
      linkedin: currentConfig.socialLinks?.linkedin ?? 'https://linkedin.com/company/insight-pest-solutions',
      instagram: currentConfig.socialLinks?.instagram ?? 'https://instagram.com/insightpestsolutions',
      youtube: currentConfig.socialLinks?.youtube ?? 'https://youtube.com/@insightpestsolutions',
      tiktok: currentConfig.socialLinks?.tiktok ?? 'https://tiktok.com/@insightpest',
      pinterest: currentConfig.socialLinks?.pinterest ?? 'https://pinterest.com/insightpest',
      yelp: currentConfig.socialLinks?.yelp ?? 'https://yelp.com/biz/insight-pest-solutions',
      googleBusiness: currentConfig.socialLinks?.googleBusiness ?? 'https://maps.google.com/?q=Insight+Pest+Solutions',
      whatsapp: currentConfig.socialLinks?.whatsapp ?? '+18005557378'
    },
    announcement: {
      enabled: currentConfig.announcement?.enabled ?? true,
      badge: currentConfig.announcement?.badge || 'Limited Time Special',
      message: currentConfig.announcement?.message || 'Seasonal Protection Special: Save $50 on comprehensive initial perimeter defense!',
      buttonText: currentConfig.announcement?.buttonText || 'Claim Offer',
      buttonLink: currentConfig.announcement?.buttonLink || '/request-quote'
    },
    metrics: {
      homesProtected: currentConfig.metrics?.homesProtected || '50,000+',
      satisfactionRate: currentConfig.metrics?.satisfactionRate || '99.4%',
      yearsExperience: currentConfig.metrics?.yearsExperience || '15+',
      technicianCount: currentConfig.metrics?.technicianCount || '120+'
    },
    guarantee: {
      title: currentConfig.guarantee?.title || '100% Insight Protection Guarantee',
      description: currentConfig.guarantee?.description || 'If covered pests return between scheduled maintenance treatments, your certified technician retreats free of charge.'
    },
    badges: currentConfig.badges || [
      'EPA Safer Choice Compliant Methods',
      'Licensed & Insured Master Technicians',
      'Family & Pet-Friendly Formulations',
      'Same-Day Emergency Dispatch',
      'Smart Integrated Pest Management (IPM)'
    ]
  }));

  const [newBadgeText, setNewBadgeText] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'announcement' | 'hours' | 'metrics'>('general');
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [selectedPlatformToAdd, setSelectedPlatformToAdd] = useState<string>('threads');
  const [customPlatformKey, setCustomPlatformKey] = useState('');
  const [customPlatformLabel, setCustomPlatformLabel] = useState('');
  const [customPlatformUrl, setCustomPlatformUrl] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFullConfig: CompanyConfig = {
      ...settings,
      phone: settings.phoneDisplay,
      email: settings.emailDisplay,
      address: settings.addressDisplay
    };
    
    // Update live singleton and storage
    Object.assign(companyConfig, updatedFullConfig);
    saveStoredCompanyConfig(updatedFullConfig);
    addToast('Company settings & Social Media configuration applied to public website!', 'success');
  };

  const handleAddBadge = () => {
    if (!newBadgeText.trim()) return;
    setSettings(prev => ({
      ...prev,
      badges: [...prev.badges, newBadgeText.trim()]
    }));
    setNewBadgeText('');
  };

  const handleRemoveBadge = (index: number) => {
    setSettings(prev => ({
      ...prev,
      badges: prev.badges.filter((_, i) => i !== index)
    }));
  };

  // Social Links Handlers (Add / Delete / Update)
  const handleUpdateSocialLink = (platformKey: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platformKey]: url
      }
    }));
  };

  const handleDeleteSocialLink = (platformKey: string) => {
    setSettings(prev => {
      const updated = { ...prev.socialLinks };
      delete updated[platformKey];
      return {
        ...prev,
        socialLinks: updated
      };
    });
    addToast(`Removed social media link. Remember to click 'Save All Settings' to apply changes!`, 'info');
  };

  const handleAddSocialPlatform = () => {
    if (selectedPlatformToAdd === 'custom') {
      const key = customPlatformKey.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!key) {
        addToast('Please provide a valid platform identifier.', 'error');
        return;
      }
      setSettings(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: customPlatformUrl.trim()
        }
      }));
      setCustomPlatformKey('');
      setCustomPlatformLabel('');
      setCustomPlatformUrl('');
    } else {
      const preset = PRESET_PLATFORMS.find(p => p.key === selectedPlatformToAdd);
      if (preset) {
        setSettings(prev => ({
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            [preset.key]: ''
          }
        }));
      }
    }
    setShowAddSocialModal(false);
    addToast('Social media platform added to list!', 'success');
  };

  const activeSocialEntries = Object.entries(settings.socialLinks || {}).filter(([k]) => k);

  const getPlatformMeta = (key: string): { label: string; icon: React.ComponentType<{ className?: string }>; color: string; placeholder: string } => {
    const found = PRESET_PLATFORMS.find(p => p.key.toLowerCase() === key.toLowerCase());
    if (found) return found;
    return {
      label: `${key.charAt(0).toUpperCase() + key.slice(1)} Channel`,
      icon: Globe,
      color: 'bg-slate-700',
      placeholder: 'https://...'
    };
  };

  const availablePlatformsToAdd = PRESET_PLATFORMS.filter(
    preset => !Object.prototype.hasOwnProperty.call(settings.socialLinks || {}, preset.key)
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Company Settings & Public Site Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage hotlines, add/delete social media channels, configure top announcements, operating hours, and trust metrics
          </p>
        </div>

        <Button
          onClick={handleSave}
          variant="primary"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
          className="shadow-sm"
        >
          Save All Settings & Sync Live
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'general'
              ? 'bg-[#FEF2F2] text-[#DC2626] border-b-2 border-[#DC2626]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Brand & Contact Hotlines</span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-[#FEF2F2] text-[#DC2626] border-b-2 border-[#DC2626]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Links</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full bg-red-100 text-[#DC2626] text-[10px] font-bold">
            {activeSocialEntries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'announcement'
              ? 'bg-[#FEF2F2] text-[#DC2626] border-b-2 border-[#DC2626]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Announcement Banner</span>
          {settings.announcement?.enabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('hours')}
          className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'hours'
              ? 'bg-[#FEF2F2] text-[#DC2626] border-b-2 border-[#DC2626]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Operating Hours & Address</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-3.5 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'metrics'
              ? 'bg-[#FEF2F2] text-[#DC2626] border-b-2 border-[#DC2626]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Proof & Guarantee</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: Brand & Contact Hotlines */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Brand Identity & Public Hotlines</h3>
                  <p className="text-[11px] text-slate-500">Official company name, slogan, phone numbers and customer service email</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Display Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Insight Pest Solutions"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Tagline / Slogan</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Smarter, Safer, Reliable Pest Protection"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Phone (Display Format)</label>
                  <input
                    type="text"
                    value={settings.phoneDisplay}
                    onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="(800) 555-PEST"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Phone (Tel Link Format)</label>
                  <input
                    type="text"
                    value={settings.phoneRaw}
                    onChange={(e) => setSettings({ ...settings, phoneRaw: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-mono"
                    placeholder="+18005557378"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">24/7 Emergency Dispatch Hotline / Notice</label>
                  <input
                    type="text"
                    value={settings.emergencyContact}
                    onChange={(e) => setSettings({ ...settings, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="24/7 Rapid Response Dispatch Available"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Public Support Email</label>
                  <input
                    type="email"
                    value={settings.emailDisplay}
                    onChange={(e) => setSettings({ ...settings, emailDisplay: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="support@insightpestsolutions.com"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Trust Badges & Accreditation Tags */}
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Certifications & Trust Badges</h3>
                  <p className="text-[11px] text-slate-500">Accreditations and safety highlights shown on hero sections and footer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {settings.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 group"
                  >
                    <span>{badge}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(idx)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove tag"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 max-w-md pt-2">
                <input
                  type="text"
                  value={newBadgeText}
                  onChange={(e) => setNewBadgeText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBadge();
                    }
                  }}
                  placeholder="e.g., Licensed Entomologist on Staff"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                />
                <Button
                  type="button"
                  onClick={handleAddBadge}
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add Badge
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: Dynamic Social Media Links (Add / Delete / Edit) */}
        {activeTab === 'social' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Social Media & Public Channels</h3>
                    <p className="text-[11px] text-slate-500">
                      Add, edit, or delete any social media platform. Active links are displayed in the footer.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setShowAddSocialModal(true)}
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4 text-red-600" />}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  + Add Social Platform
                </Button>
              </div>

              {/* Social Media Grid */}
              {activeSocialEntries.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <Share2 className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">No social media links configured</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Click the button below to add your Facebook, Instagram, Twitter/X, YouTube, WhatsApp, or custom link.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setShowAddSocialModal(true)}
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Add Social Platform
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {activeSocialEntries.map(([platformKey, url]) => {
                    const meta = getPlatformMeta(platformKey);
                    const IconComponent = meta.icon;
                    const previewUrl = url && (url.startsWith('http') ? url : `https://wa.me/${url.replace(/[^0-9]/g, '')}`);

                    return (
                      <div 
                        key={platformKey}
                        className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-2 group relative"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${meta.color} text-white shadow-xs`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-extrabold">{meta.label}</span>
                          </span>

                          <div className="flex items-center gap-1">
                            {previewUrl && (
                              <a 
                                href={previewUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors" 
                                title="Test / Preview Link"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteSocialLink(platformKey)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={`Delete ${meta.label}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <input
                          type={platformKey === 'whatsapp' ? 'text' : 'url'}
                          value={url || ''}
                          onChange={(e) => handleUpdateSocialLink(platformKey, e.target.value)}
                          placeholder={meta.placeholder}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-xs font-medium placeholder:text-slate-400"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* TAB 3: Top Announcement Bar */}
        {activeTab === 'announcement' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Header Top Announcement Banner</h3>
                    <p className="text-[11px] text-slate-500">Broadcast seasonal specials, discounts, or emergency storm warnings across the entire website</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcement?.enabled ?? true}
                    onChange={(e) => setSettings({
                      ...settings,
                      announcement: {
                        ...settings.announcement!,
                        enabled: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  <span className="ml-2 text-xs font-bold text-slate-700">
                    {settings.announcement?.enabled ? 'Active / Visible' : 'Disabled'}
                  </span>
                </label>
              </div>

              {settings.announcement?.enabled && (
                <div className="space-y-4 text-xs pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={settings.announcement?.badge || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          announcement: {
                            ...settings.announcement!,
                            badge: e.target.value
                          }
                        })}
                        placeholder="e.g. Limited Time Special"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Action Button Text</label>
                      <input
                        type="text"
                        value={settings.announcement?.buttonText || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          announcement: {
                            ...settings.announcement!,
                            buttonText: e.target.value
                          }
                        })}
                        placeholder="e.g. Claim Offer"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Action Link URL</label>
                      <input
                        type="text"
                        value={settings.announcement?.buttonLink || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          announcement: {
                            ...settings.announcement!,
                            buttonLink: e.target.value
                          }
                        })}
                        placeholder="e.g. /request-quote"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Announcement Message Body</label>
                    <textarea
                      rows={2}
                      value={settings.announcement?.message || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: {
                          ...settings.announcement!,
                          message: e.target.value
                        }
                      })}
                      placeholder="Seasonal Protection Special: Save $50 on comprehensive initial perimeter defense!"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Banner Preview */}
                  <div className="p-4 bg-slate-900 rounded-xl text-white space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Live Header Preview
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs pt-1">
                      <div className="flex items-center gap-2 overflow-hidden truncate">
                        {settings.announcement?.badge && (
                          <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                            {settings.announcement.badge}
                          </span>
                        )}
                        <span className="text-slate-200 truncate">{settings.announcement?.message}</span>
                      </div>
                      {settings.announcement?.buttonText && (
                        <span className="text-red-400 font-bold text-[11px] underline flex-shrink-0">
                          {settings.announcement.buttonText} →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* TAB 4: Operating Hours & Headquarters Address */}
        {activeTab === 'hours' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Clock className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Operating Hours & Headquarters Address</h3>
                  <p className="text-[11px] text-slate-500">Service schedule displayed on contact page, footer, and quote flows</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monday - Friday Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours.monday_friday}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, monday_friday: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="7:00 AM - 8:00 PM EST"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saturday Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours.saturday}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, saturday: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="8:00 AM - 6:00 PM EST"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sunday Hours / Dispatch Policy</label>
                  <input
                    type="text"
                    value={settings.businessHours.sunday}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, sunday: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="Emergency & Scheduled Inspections Only"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency / Holiday Dispatch Note</label>
                  <input
                    type="text"
                    value={settings.businessHours.holidayNote || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, holidayNote: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="24/7 Emergency Dispatch On Call"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Regional Headquarters Physical Address</label>
                  <input
                    type="text"
                    value={settings.addressDisplay}
                    onChange={(e) => setSettings({ ...settings, addressDisplay: e.target.value, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                    placeholder="100 Innovation Parkway, Suite 400, Metro Area"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 5: Trust Metrics & Guarantee Policy */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-fade-in">
            {/* Public Statistics */}
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Public Trust & Proof Metrics</h3>
                  <p className="text-[11px] text-slate-500">Key statistics displayed on the public hero section and testimonials page</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Homes Protected Counter</label>
                  <input
                    type="text"
                    value={settings.metrics.homesProtected}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      metrics: { ...settings.metrics, homesProtected: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-extrabold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Satisfaction Rate (%)</label>
                  <input
                    type="text"
                    value={settings.metrics.satisfactionRate}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      metrics: { ...settings.metrics, satisfactionRate: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-extrabold text-[#DC2626]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Years of Experience</label>
                  <input
                    type="text"
                    value={settings.metrics.yearsExperience}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      metrics: { ...settings.metrics, yearsExperience: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-extrabold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Certified Technicians</label>
                  <input
                    type="text"
                    value={settings.metrics.technicianCount}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      metrics: { ...settings.metrics, technicianCount: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-extrabold text-slate-900"
                  />
                </div>
              </div>
            </Card>

            {/* Guarantee Policy Copy */}
            <Card className="p-6 bg-white border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">100% Insight Protection Guarantee</h3>
                  <p className="text-[11px] text-slate-500">The service guarantee copy featured in booking flows and terms</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guarantee Badge Title</label>
                  <input
                    type="text"
                    value={settings.guarantee.title}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      guarantee: { ...settings.guarantee, title: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guarantee Terms & Re-Service Description</label>
                  <textarea
                    rows={3}
                    value={settings.guarantee.description}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      guarantee: { ...settings.guarantee, description: e.target.value } 
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            * All changes apply immediately to public routes and navigation elements without needing a server restart.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save All Settings & Sync Live
          </Button>
        </div>
      </form>

      {/* Modal to Add a New Social Media Platform */}
      {showAddSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-red-600">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Add Social Media Platform</h3>
                  <p className="text-xs text-slate-500">Choose a platform to add to your public footer</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddSocialModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Select Social Network</label>
                <select
                  value={selectedPlatformToAdd}
                  onChange={(e) => setSelectedPlatformToAdd(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-medium"
                >
                  {availablePlatformsToAdd.map(p => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                  <option value="custom">+ Custom Social Channel / Website</option>
                </select>
              </div>

              {selectedPlatformToAdd === 'custom' && (
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Platform Identifier (e.g. angi, nextdoor, threads)</label>
                    <input
                      type="text"
                      value={customPlatformKey}
                      onChange={(e) => setCustomPlatformKey(e.target.value)}
                      placeholder="e.g. houzz"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Profile / Channel URL</label>
                    <input
                      type="url"
                      value={customPlatformUrl}
                      onChange={(e) => setCustomPlatformUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddSocialModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleAddSocialPlatform}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Platform
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
