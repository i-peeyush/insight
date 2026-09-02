import React, { useState } from 'react';
import { Calendar, Check, X, Clock, MapPin } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { useAllBookings } from '../../hooks/useBookings';
import { formatDate } from '../../utils/formatters';

export const AdminBookingsPage: React.FC = () => {
  const { data: bookings } = useAllBookings();
  const [search, setSearch] = useState('');

  const filtered = bookings?.filter((b) =>
    `${b.bookingId} ${b.customerName} ${b.serviceTitle} ${b.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Inspection & Service Bookings</h2>
          <p className="text-xs text-slate-500">Live appointment calendar and dispatch status</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by Booking ID, customer..." />
        </div>
      </div>

      <Card padding="none" className="bg-white border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service Program</th>
                <th className="p-4">Scheduled Slot</th>
                <th className="p-4">Address</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered?.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#144A38]">
                    {booking.bookingId}
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    <div>{booking.customerName}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{booking.phone}</div>
                  </td>
                  <td className="p-4 font-medium text-emerald-800">
                    {booking.serviceTitle}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{formatDate(booking.scheduledDate)}</div>
                    <div className="text-[11px] text-slate-500">{booking.scheduledTime}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {booking.address}
                  </td>
                  <td className="p-4">
                    <Badge variant={booking.status === 'CONFIRMED' ? 'primary' : 'warning'}>
                      {booking.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const AdminServicesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-900">Services Catalog Manager</h2>
      <p className="text-xs text-slate-500">Enable, disable, or adjust service descriptions and pricing tiers.</p>
      <Card className="p-8 text-center text-slate-500 text-xs">
        Connected to centralized feature service architecture. Changes sync directly to MockDirectory or Spring Boot REST API.
      </Card>
    </div>
  );
};
