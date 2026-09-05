import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Check, 
  X, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  UserCheck, 
  Truck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  CalendarDays,
  ListFilter
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminDrawer } from '../../components/admin/AdminDrawer';
import { useAllBookings } from '../../hooks/useBookings';
import { Booking } from '../../types/booking';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';

const TECHNICIANS = [
  { id: 'tech-1', name: 'Marcus Vance (Senior Specialist)', zone: 'North Metro / Raleigh' },
  { id: 'tech-2', name: 'David Miller (Termite Lead)', zone: 'South Zone / Cary' },
  { id: 'tech-3', name: 'Elena Rostova (Eco-IPM Route)', zone: 'East Metro / Durham' },
  { id: 'tech-4', name: 'Sam Thorne (Emergency Dispatch)', zone: 'Central / Rapid Response' }
];

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredBookings } from '../../utils/dataStore';

export const AdminBookingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialBookings } = useAllBookings();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    if (initialBookings && initialBookings.length > 0) {
      setBookings(initialBookings);
    }
  }, [initialBookings]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assignedTech, setAssignedTech] = useState<Record<string, string>>({
    'BK-84920': 'tech-1',
    'BK-92384': 'tech-2'
  });

  // Manual booking form state
  const [formState, setFormState] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    serviceTitle: 'Insight Smart Shield (Complete Home Defense)',
    scheduledDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    scheduledTime: '09:00 AM - 11:00 AM',
    notes: ''
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.customerName || !formState.phone) {
      addToast('Customer name and phone number are required', 'error');
      return;
    }

    const newBooking: Booking = {
      bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceTitle: formState.serviceTitle,
      customerName: formState.customerName,
      email: formState.email || 'customer@example.com',
      phone: formState.phone,
      address: formState.address || '450 Elmwood Drive',
      scheduledDate: formState.scheduledDate,
      scheduledTime: formState.scheduledTime,
      notes: formState.notes,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveStoredBookings(updated);
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    setIsAddModalOpen(false);
    addToast(`Inspection appointment ${newBooking.bookingId} created!`, 'success');
  };

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => b.bookingId === bookingId ? { ...b, status: newStatus } : b);
    setBookings(updated);
    saveStoredBookings(updated);
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    if (selectedBooking && selectedBooking.bookingId === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    addToast(`Booking ${bookingId} marked as ${newStatus}`, 'success');
  };

  const handleAssignTechnician = (bookingId: string, techId: string) => {
    setAssignedTech({ ...assignedTech, [bookingId]: techId });
    const techName = TECHNICIANS.find(t => t.id === techId)?.name || 'Technician';
    addToast(`Assigned ${techName} to route dispatch`, 'info');
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch = `${b.bookingId} ${b.customerName} ${b.serviceTitle} ${b.address} ${b.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="primary">CONFIRMED</Badge>;
      case 'REQUESTED':
        return <Badge variant="warning">AWAITING ROUTING</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="accent">EN ROUTE / ACTIVE</Badge>;
      case 'COMPLETED':
        return <Badge variant="success">COMPLETED</Badge>;
      case 'CANCELLED':
        return <Badge variant="danger">CANCELLED</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Inspection & Service Bookings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live technician dispatch calendar, route assignments, and confirmed appointments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Schedule New Booking
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <SearchBar 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by Booking ID, customer, address, service program..." 
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All Appointments ({bookings.length})</option>
              <option value="REQUESTED">Awaiting Routing</option>
              <option value="CONFIRMED">Confirmed Slots</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Quick Status Pill Bar */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold text-[11px] mr-1">Quick Filter:</span>
          {['ALL', 'REQUESTED', 'CONFIRMED', 'COMPLETED'].map((st) => {
            const count = st === 'ALL' ? bookings.length : bookings.filter(b => b.status === st).length;
            const isActive = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-colors ${
                  isActive
                    ? 'bg-[#DC2626] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </Card>

      {/* Main Bookings Table */}
      <Card padding="none" className="bg-white border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service Program</th>
                <th className="p-4">Scheduled Slot</th>
                <th className="p-4">Address</th>
                <th className="p-4">Assigned Route Specialist</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((booking) => {
                  const tech = TECHNICIANS.find(t => t.id === assignedTech[booking.bookingId]);
                  return (
                    <tr 
                      key={booking.bookingId} 
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <td className="p-4 font-mono font-extrabold text-[#DC2626]">
                        {booking.bookingId}
                      </td>

                      <td className="p-4 font-bold text-slate-900">
                        <div>{booking.customerName}</div>
                        <div className="text-[11px] text-slate-500 font-normal font-mono">
                          {booking.phone}
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        {booking.serviceTitle}
                      </td>

                      <td className="p-4">
                        <div className="font-extrabold text-slate-900">
                          {formatDate(booking.scheduledDate)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {booking.scheduledTime}
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">
                        {booking.address}
                      </td>

                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={assignedTech[booking.bookingId] || ''}
                          onChange={(e) => handleAssignTechnician(booking.bookingId, e.target.value)}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-1 focus:ring-red-500"
                        >
                          <option value="">-- Unassigned --</option>
                          {TECHNICIANS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4">
                        {getStatusBadge(booking.status)}
                      </td>

                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="View Dispatch Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <CalendarDays className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">No appointments found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Booking Detail Slide-Over Drawer */}
      <AdminDrawer
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={selectedBooking ? `Booking ${selectedBooking.bookingId}` : 'Appointment Details'}
        subtitle={selectedBooking ? `${selectedBooking.serviceTitle}` : ''}
        width="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            {/* Status Changer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                Appointment Dispatch Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['REQUESTED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as Booking['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedBooking.bookingId, st)}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                      selectedBooking.status === st
                        ? 'bg-[#DC2626] text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Slot Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Schedule & Route Assignment
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-extrabold text-slate-900">{formatDate(selectedBooking.scheduledDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Arrival Window:</span>
                  <span className="font-extrabold text-red-600">{selectedBooking.scheduledTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Technician:</span>
                  <span className="font-semibold text-slate-800">
                    {TECHNICIANS.find(t => t.id === assignedTech[selectedBooking.bookingId])?.name || 'Unassigned'}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Customer & Property Location
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-extrabold text-slate-900">{selectedBooking.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <a href={`tel:${selectedBooking.phone}`} className="font-bold text-red-600 hover:underline">
                    {selectedBooking.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a href={`mailto:${selectedBooking.email}`} className="font-bold text-slate-900 hover:underline">
                    {selectedBooking.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service Address:</span>
                  <span className="font-semibold text-slate-800 text-right">{selectedBooking.address}</span>
                </div>
                {selectedBooking.notes && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-500 block mb-1">Customer Instructions:</span>
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 italic">
                      "{selectedBooking.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleStatusChange(selectedBooking.bookingId, 'COMPLETED');
                  addToast('Appointment marked as completed!', 'success');
                }}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Mark Completed
              </Button>
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* Manual Booking Schedule Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Inspection or Treatment Slot"
        subtitle="Book a guaranteed appointment window for a customer"
        maxWidth="xl"
      >
        <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Customer Full Name *</label>
            <input
              type="text"
              required
              value={formState.customerName}
              onChange={(e) => setFormState({ ...formState, customerName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="e.g. David Richardson"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="(919) 555-0188"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="customer@example.com"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Service Address</label>
            <input
              type="text"
              value={formState.address}
              onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="128 Brookside Way, Raleigh, NC"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Pest Control Program</label>
            <select
              value={formState.serviceTitle}
              onChange={(e) => setFormState({ ...formState, serviceTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              <option value="Insight Smart Shield (Complete Home Defense)">Insight Smart Shield (Complete Home Defense)</option>
              <option value="Termite Sentricon Hexagonal Defense">Termite Sentricon Hexagonal Defense</option>
              <option value="Bed Bug Thermal Remediation">Bed Bug Thermal Remediation</option>
              <option value="Rodent Chew-Proof Exclusion">Rodent Chew-Proof Exclusion</option>
              <option value="Mosquito & Tick Yard Guard">Mosquito & Tick Yard Guard</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Scheduled Date *</label>
              <input
                type="date"
                required
                value={formState.scheduledDate}
                onChange={(e) => setFormState({ ...formState, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Arrival Window *</label>
              <select
                value={formState.scheduledTime}
                onChange={(e) => setFormState({ ...formState, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              >
                <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Dispatch Notes</label>
            <textarea
              rows={2}
              value={formState.notes}
              onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Gate code, aggressive pets, crawlspace entry location..."
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
