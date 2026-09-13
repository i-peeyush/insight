import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  LogOut,
  ExternalLink,
  Shield,
  Settings,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { useAllLeads } from '../../hooks/useLeads';
import { useAllBookings } from '../../hooks/useBookings';
import { t } from '../../language';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { data: leads } = useAllLeads();
  const { data: bookings } = useAllBookings();

  const newLeadsCount = leads?.filter(l => l.status === 'NEW').length || 0;
  const pendingBookingsCount = bookings?.filter(b => b.status === 'REQUESTED').length || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <Logo variant="navbar" className="justify-center mb-4" />
            <h2 className="text-xl font-bold text-slate-900">{t.admin.auth.portalTitle}</h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.admin.auth.portalSub}
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => login('admin@insightpest.internal', 'ADMIN')}
            >
              {t.admin.auth.signInAdmin}
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center"
              to="/"
            >
              {t.admin.auth.returnWebsite}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: t.admin.nav.dashboard, path: '/admin', icon: LayoutDashboard },
    { label: t.admin.nav.leads, path: '/admin/leads', icon: Users, badge: newLeadsCount },
    { label: t.admin.nav.bookings, path: '/admin/bookings', icon: Calendar, badge: pendingBookingsCount },
    { label: t.admin.nav.services, path: '/admin/services', icon: ShieldAlert },
    { label: t.admin.nav.testimonials, path: '/admin/testimonials', icon: MessageSquare },
    { label: t.admin.nav.faq, path: '/admin/faq', icon: HelpCircle },
    { label: t.admin.nav.blog, path: '/admin/blog', icon: FileText },
    { label: t.admin.nav.settings, path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden lg:flex flex-shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800">
            <Logo variant="navbar" lightMode />
            <div className="mt-3 flex items-center gap-2 text-xs text-red-400 bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-900/60">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span className="font-bold">{t.admin.auth.staffBadge} ({user?.role})</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#DC2626] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                      isActive ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.admin.auth.returnWebsite}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.nav.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {t.admin.nav.portalTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <div className="text-right hidden md:block">
              <div className="text-xs font-extrabold text-slate-900">{user?.fullName}</div>
              <div className="text-[10px] text-slate-400">{user?.email}</div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
              {t.admin.nav.logout}
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-slate-900 text-white p-4 space-y-1 border-b border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#DC2626] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-red-600 text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}

        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
