import React from 'react';
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
  Shield
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
            <h2 className="text-xl font-bold text-slate-900">Insight Operations Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Internal staff & administration management system
            </p>
          </div>
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => login('admin@insightpest.internal', 'ADMIN')}
            >
              Sign In as Administrator
            </Button>
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center"
              to="/"
            >
              Return to Public Website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Leads & Quotes', path: '/admin/leads', icon: Users },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Services Catalog', path: '/admin/services', icon: ShieldAlert },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { label: 'FAQ Manager', path: '/admin/faq', icon: HelpCircle },
    { label: 'Blog Posts', path: '/admin/blog', icon: FileText }
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-slate-800">
            <Logo variant="navbar" lightMode />
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal ({user?.role})</span>
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#144A38] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
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
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900">
            Operations & Service Control Console
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              {user?.fullName} ({user?.email})
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<LogOut className="w-3.5 h-3.5" />}>
              Sign Out
            </Button>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
