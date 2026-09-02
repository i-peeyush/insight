import React from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MapPin, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useAllLeads } from '../../hooks/useLeads';
import { useAllBookings } from '../../hooks/useBookings';
import { formatDate } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const { data: leads } = useAllLeads();
  const { data: bookings } = useAllBookings();

  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter((l) => l.status === 'NEW').length || 0;
  const totalBookings = bookings?.length || 0;
  const pendingBookings = bookings?.filter((b) => b.status === 'REQUESTED').length || 0;
  const confirmedBookings = bookings?.filter((b) => b.status === 'CONFIRMED').length || 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalLeads}</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{newLeads} new requests pending triage</span>
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{pendingBookings}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Awaiting dispatch route approval
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmed Slots</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{confirmedBookings}</div>
          <div className="text-xs text-emerald-700 font-medium mt-2">
            Scheduled on active routes
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalBookings}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Lifetime recorded inspection requests
          </div>
        </Card>
      </div>

      {/* Two Column Table Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Inbound Quote Leads</h3>
              <p className="text-xs text-slate-500">Live incoming website quote submissions</p>
            </div>
          </div>

          <div className="space-y-3">
            {leads?.slice(0, 4).map((lead) => (
              <div key={lead.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    {lead.firstName} {lead.lastName}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    {lead.pestProblem} • {lead.city}, {lead.state}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={lead.status === 'NEW' ? 'warning' : 'accent'}>
                    {lead.status}
                  </Badge>
                  <div className="text-[10px] text-slate-400">
                    {formatDate(lead.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Bookings */}
        <Card className="p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Scheduled Bookings</h3>
              <p className="text-xs text-slate-500">Inspections reserved via appointment wizard</p>
            </div>
          </div>

          <div className="space-y-3">
            {bookings?.slice(0, 4).map((booking) => (
              <div key={booking.bookingId} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    {booking.customerName} ({booking.bookingId})
                  </div>
                  <div className="text-emerald-700 font-semibold mt-0.5">
                    {booking.serviceTitle}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    📅 {formatDate(booking.scheduledDate)} ({booking.scheduledTime})
                  </div>
                </div>
                <Badge variant={booking.status === 'CONFIRMED' ? 'primary' : 'warning'}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
