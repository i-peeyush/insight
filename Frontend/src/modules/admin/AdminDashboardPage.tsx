import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  Plus, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Phone,
  Mail,
  Filter,
  Sparkles,
  TrendingUp,
  Download,
  Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { AdminStatCard } from '../../components/admin/AdminStatCard';
import { useAllLeads } from '../../hooks/useLeads';
import { useAllBookings } from '../../hooks/useBookings';
import { useServices } from '../../hooks/useServices';
import { formatDate } from '../../utils/formatters';
import { t } from '../../language';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: leads } = useAllLeads();
  const { data: bookings } = useAllBookings();
  const { data: services } = useServices();

  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter((l) => l.status === 'NEW').length || 0;
  const totalBookings = bookings?.length || 0;
  const pendingBookings = bookings?.filter((b) => b.status === 'REQUESTED').length || 0;
  const confirmedBookings = bookings?.filter((b) => b.status === 'CONFIRMED').length || 0;

  // Estimated pipeline value: calculated from average service initial price * leads
  const pipelineValue = totalLeads * 149 + totalBookings * 249;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-700">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.admin.dashboard.commandCenter}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.admin.dashboard.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            {t.admin.dashboard.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/admin/leads')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            {t.admin.dashboard.manageLeadsBtn}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 text-white hover:bg-slate-700"
            onClick={() => navigate('/admin/bookings')}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            {t.admin.dashboard.dispatchCalendarBtn}
          </Button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard
          title={t.admin.dashboard.inboundLeadsTitle}
          value={totalLeads}
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          trend={{
            value: `+${newLeads}`,
            isPositive: true,
            text: t.admin.dashboard.newInquiriesPending
          }}
          onClick={() => navigate('/admin/leads')}
        />

        <AdminStatCard
          title={t.admin.dashboard.pendingBookingsTitle}
          value={pendingBookings}
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          trend={{
            value: `${pendingBookings} Action`,
            isPositive: false,
            text: t.admin.dashboard.awaitingDispatch
          }}
          onClick={() => navigate('/admin/bookings')}
        />

        <AdminStatCard
          title={t.admin.dashboard.confirmedBookingsTitle}
          value={confirmedBookings}
          icon={CheckCircle2}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
          trend={{
            value: `${Math.round((confirmedBookings / (totalBookings || 1)) * 100)}%`,
            isPositive: true,
            text: t.admin.dashboard.scheduledThisMonth
          }}
          onClick={() => navigate('/admin/bookings')}
        />

        <AdminStatCard
          title={t.admin.dashboard.pipelineValueTitle}
          value={`$${pipelineValue.toLocaleString()}`}
          icon={DollarSign}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          trend={{
            value: '+18.4%',
            isPositive: true,
            text: t.admin.dashboard.estimatedVolume
          }}
        />
      </div>

      {/* Main Two-Column Operations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Immediate Lead Triage Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Immediate Triage Queue (Recent Leads)</span>
                </h3>
                <p className="text-xs text-slate-500">Fast-response dispatch for newest quote submissions</p>
              </div>
              <Link
                to="/admin/leads"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                <span>View All ({totalLeads})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {leads && leads.length > 0 ? (
                leads.slice(0, 5).map((lead) => (
                  <div 
                    key={lead.id} 
                    className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {lead.firstName} {lead.lastName}
                        </span>
                        <Badge variant={lead.status === 'NEW' ? 'warning' : 'accent'}>
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="text-xs font-semibold text-red-600">
                        Pest: {lead.pestProblem} • {lead.propertyType}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-3">
                        <span>📍 {lead.city}, {lead.state}</span>
                        <span>🕒 {formatDate(lead.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
                        title={`Call ${lead.phone}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="p-2 bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors"
                        title={`Email ${lead.email}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      <Button
                        to="/admin/leads"
                        variant="primary"
                        size="xs"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No incoming leads recorded.
                </div>
              )}
            </div>
          </Card>

          {/* Service Distribution Summary */}
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Active Services Catalog Status</h3>
                <p className="text-xs text-slate-500">Live service programs configured in system</p>
              </div>
              <Link
                to="/admin/services"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                <span>Edit Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services?.slice(0, 4).map((service) => (
                <div 
                  key={service.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900">{service.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Starting at {service.pricingEstimate}
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Upcoming Dispatches & Quick Bookings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span>Upcoming Route Dispatches</span>
                </h3>
                <p className="text-xs text-slate-500">Reserved technician inspection time slots</p>
              </div>
              <Link
                to="/admin/bookings"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                <span>Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {bookings && bookings.length > 0 ? (
                bookings.slice(0, 5).map((booking) => (
                  <div 
                    key={booking.bookingId} 
                    className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 space-y-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-red-600">
                        {booking.bookingId}
                      </span>
                      <Badge variant={booking.status === 'CONFIRMED' ? 'primary' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {booking.customerName}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {booking.serviceTitle}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>📅 {formatDate(booking.scheduledDate)}</span>
                      <span>⏰ {booking.scheduledTime}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No appointments scheduled.
                </div>
              )}
            </div>
          </Card>

          {/* Quick System Links Card */}
          <Card className="p-6 bg-slate-900 text-white border-slate-800">
            <h4 className="text-sm font-extrabold tracking-wide uppercase text-red-400 mb-3">
              Admin Quick Tools
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/admin/testimonials"
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-medium text-slate-200"
              >
                ⭐ Moderate Reviews
              </Link>
              <Link
                to="/admin/faq"
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-medium text-slate-200"
              >
                ❓ FAQ Knowledge Base
              </Link>
              <Link
                to="/admin/blog"
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-medium text-slate-200"
              >
                📰 Blog Post CMS
              </Link>
              <Link
                to="/admin/settings"
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-medium text-slate-200"
              >
                ⚙️ Company Config
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
