import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  Trash2
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminDrawer } from '../../components/admin/AdminDrawer';
import { useAllLeads } from '../../hooks/useLeads';
import { Lead } from '../../types/lead';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredLeads } from '../../utils/dataStore';

export const AdminLeadsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialLeads } = useAllLeads();
  const [leads, setLeads] = useState<Lead[]>([]);
  const { addToast } = useToast();

  // Initialize leads from hook
  React.useEffect(() => {
    if (initialLeads && initialLeads.length > 0) {
      setLeads(initialLeads);
    }
  }, [initialLeads]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [pestFilter, setPestFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [leadNotes, setLeadNotes] = useState<Record<string, string[]>>({});

  // Form state for creating a manual lead
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'NC',
    zipCode: '',
    propertyType: 'Residential Single Family',
    pestProblem: 'General Pest Maintenance',
    urgencyLevel: 'Standard',
    preferredContactMethod: 'Phone Call',
    preferredContactTime: 'Morning (8AM - 12PM)',
    notes: ''
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.firstName || !formState.phone) {
      addToast('First name and phone number are required', 'error');
      return;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email || 'customer@example.com',
      phone: formState.phone,
      address: formState.address || '123 Main St',
      city: formState.city || 'Raleigh',
      state: formState.state || 'NC',
      zipCode: formState.zipCode || '27601',
      propertyType: formState.propertyType,
      pestProblem: formState.pestProblem,
      serviceRequired: 'Targeted Elimination & Perimeter Protection',
      urgencyLevel: formState.urgencyLevel as any,
      preferredContactMethod: formState.preferredContactMethod as any,
      preferredContactTime: formState.preferredContactTime as any,
      notes: formState.notes,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    saveStoredLeads(updated);
    queryClient.invalidateQueries({ queryKey: ['leads'] });
    setIsAddModalOpen(false);
    addToast('New inbound lead recorded successfully', 'success');
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'NC',
      zipCode: '',
      propertyType: 'Residential Single Family',
      pestProblem: 'General Pest Maintenance',
      urgencyLevel: 'Standard',
      preferredContactMethod: 'Phone Call',
      preferredContactTime: 'Morning (8AM - 12PM)',
      notes: ''
    });
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    saveStoredLeads(updated);
    queryClient.invalidateQueries({ queryKey: ['leads'] });
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    addToast(`Lead status updated to ${newStatus}`, 'success');
  };

  const handleAddNote = (leadId: string) => {
    if (!newNote.trim()) return;
    const existing = leadNotes[leadId] || [];
    setLeadNotes({
      ...leadNotes,
      [leadId]: [...existing, `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${newNote.trim()}`]
    });
    setNewNote('');
    addToast('Staff note appended to lead record', 'info');
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to remove this lead record?')) {
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      saveStoredLeads(updated);
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setSelectedLead(null);
      addToast('Lead removed from active list', 'info');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Pest Problem', 'Property Type', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id,
      `"${l.firstName} ${l.lastName}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.city}"`,
      `"${l.pestProblem}"`,
      `"${l.propertyType}"`,
      l.status,
      l.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Insight_Pest_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Leads CSV file generated and downloaded', 'success');
  };

  const filtered = leads.filter((l) => {
    const matchesSearch = `${l.firstName} ${l.lastName} ${l.email} ${l.city} ${l.pestProblem} ${l.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesPest = pestFilter === 'ALL' || l.pestProblem.toLowerCase().includes(pestFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPest;
  });

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="warning">NEW INQUIRY</Badge>;
      case 'CONTACTED':
        return <Badge variant="primary">CONTACTED</Badge>;
      case 'QUOTED':
        return <Badge variant="accent">ESTIMATE SENT</Badge>;
      case 'WON':
        return <Badge variant="success">CONVERTED (WON)</Badge>;
      case 'LOST':
        return <Badge variant="danger">CLOSED (LOST)</Badge>;
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
            Quote Requests & Inbound Leads
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, triage, qualify, and convert incoming homeowner inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Record Manual Lead
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
              placeholder="Search leads by customer name, phone, email, city, pest..." 
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All Statuses ({leads.length})</option>
              <option value="NEW">New Inquiries</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUOTED">Quoted</option>
              <option value="WON">Converted (Won)</option>
              <option value="LOST">Lost</option>
            </select>

            <select
              value={pestFilter}
              onChange={(e) => setPestFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            >
              <option value="ALL">All Pest Problems</option>
              <option value="Termite">Termites</option>
              <option value="Bed Bug">Bed Bugs</option>
              <option value="Rodent">Rodents / Mice</option>
              <option value="Ant">Ants</option>
              <option value="Mosquito">Mosquitoes</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Quick Status Pill Bar */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold text-[11px] mr-1">Quick View:</span>
          {['ALL', 'NEW', 'CONTACTED', 'QUOTED', 'WON'].map((st) => {
            const count = st === 'ALL' ? leads.length : leads.filter(l => l.status === st).length;
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

      {/* Main Leads Table */}
      <Card padding="none" className="bg-white border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                <th className="p-4">Customer Contact</th>
                <th className="p-4">Property Location</th>
                <th className="p-4">Pest & Diagnosis</th>
                <th className="p-4">Urgency</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date Received</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="p-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        {lead.firstName} {lead.lastName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{lead.phone}</span>
                        <span>•</span>
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-700">
                      <div className="font-semibold">{lead.propertyType}</div>
                      <div className="text-[11px] text-slate-500">
                        {lead.address}, {lead.city}, {lead.state}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-red-600">{lead.pestProblem}</span>
                      <div className="text-[11px] text-slate-500">
                        Pref: {lead.preferredContactMethod} ({lead.preferredContactTime})
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                        lead.urgencyLevel === 'Immediate' || lead.urgencyLevel === 'High'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.urgencyLevel || 'Standard'}
                      </span>
                    </td>

                    <td className="p-4">
                      {getStatusBadge(lead.status)}
                    </td>

                    <td className="p-4 text-slate-500">
                      {formatDate(lead.createdAt)}
                    </td>

                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title={`Call ${lead.phone}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">No leads matched your search criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lead Detail Slide-Over Drawer */}
      <AdminDrawer
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title={selectedLead ? `${selectedLead.firstName} ${selectedLead.lastName}` : 'Lead Details'}
        subtitle={selectedLead ? `Inbound Quote Record ID: ${selectedLead.id}` : ''}
        width="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            {/* Quick Status Changer Banner */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                Current Lead Status
              </label>
              <div className="flex flex-wrap gap-2">
                {(['NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST'] as Lead['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedLead.id, st)}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                      selectedLead.status === st
                        ? 'bg-[#DC2626] text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Contact Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Contact Information
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-red-600 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-slate-900 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {selectedLead.address}, {selectedLead.city}, {selectedLead.state} {selectedLead.zipCode}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Preferred Contact:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedLead.preferredContactMethod} ({selectedLead.preferredContactTime})
                  </span>
                </div>
              </div>
            </div>

            {/* Pest Diagnosis & Specs */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Pest & Property Details
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Reported Problem:</span>
                  <span className="font-extrabold text-red-600">{selectedLead.pestProblem}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Property Type:</span>
                  <span className="font-semibold text-slate-800">{selectedLead.propertyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Urgency Level:</span>
                  <span className="font-bold text-amber-700">{selectedLead.urgencyLevel || 'Standard'}</span>
                </div>
                {selectedLead.notes && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-500 block mb-1">Customer Comments:</span>
                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 italic">
                      "{selectedLead.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Internal Staff Notes & Activity Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Staff Internal Notes & History
              </h4>
              <div className="space-y-2">
                {leadNotes[selectedLead.id]?.map((note, i) => (
                  <div key={i} className="p-3 bg-amber-50 text-amber-900 rounded-xl text-xs border border-amber-200">
                    {note}
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add follow-up note..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-red-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddNote(selectedLead.id);
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddNote(selectedLead.id)}
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteLead(selectedLead.id)}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Archive Lead
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleStatusChange(selectedLead.id, 'WON');
                  addToast('Lead converted! Ready for inspection dispatch.', 'success');
                }}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Mark Won & Book
              </Button>
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* Manual Lead Record Modal */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record New Inbound Lead"
        subtitle="Log a customer phone call, walk-in, or referral inquiry into the CRM"
        maxWidth="xl"
      >
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formState.firstName}
                onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Michael"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Last Name</label>
              <input
                type="text"
                value={formState.lastName}
                onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Jenkins"
              />
            </div>
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
                placeholder="(919) 555-0199"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="m.jenkins@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Street Address</label>
              <input
                type="text"
                value={formState.address}
                onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="4208 Pinecrest Trail"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">City</label>
              <input
                type="text"
                value={formState.city}
                onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Raleigh"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Pest Problem</label>
              <select
                value={formState.pestProblem}
                onChange={(e) => setFormState({ ...formState, pestProblem: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              >
                <option value="Termite Inspection & Defense">Termites</option>
                <option value="Bed Bug Thermal Remediation">Bed Bugs</option>
                <option value="Rodent Exclusion & Trapping">Rodents / Mice</option>
                <option value="Ant & Cockroach Elimination">Ants & Roaches</option>
                <option value="Mosquito & Tick Yard Guard">Mosquitoes</option>
                <option value="General Pest Maintenance">General Maintenance</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Property Type</label>
              <select
                value={formState.propertyType}
                onChange={(e) => setFormState({ ...formState, propertyType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              >
                <option value="Residential Single Family">Residential Single Family</option>
                <option value="Townhouse / Condo">Townhouse / Condo</option>
                <option value="Commercial Office / Retail">Commercial Office / Retail</option>
                <option value="Restaurant / Food Service">Restaurant / Food Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Inspection Notes / Symptoms</label>
            <textarea
              rows={3}
              value={formState.notes}
              onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Notes on pest sightings, property access gates, pets..."
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
              Save Inbound Lead
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
