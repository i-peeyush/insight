import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Search } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { useAllLeads } from '../../hooks/useLeads';
import { formatDate } from '../../utils/formatters';

export const AdminLeadsPage: React.FC = () => {
  const { data: leads } = useAllLeads();
  const [search, setSearch] = useState('');

  const filtered = leads?.filter((l) =>
    `${l.firstName} ${l.lastName} ${l.email} ${l.city} ${l.pestProblem}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quote Requests & Inbound Leads</h2>
          <p className="text-xs text-slate-500">Manage, contact, and qualify incoming homeowner inquiries</p>
        </div>
        <div className="w-full sm:w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search leads by name, city, pest..." />
        </div>
      </div>

      <Card padding="none" className="bg-white border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Property & City</th>
                <th className="p-4">Pest & Service</th>
                <th className="p-4">Contact Pref</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered?.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">
                    <div>{lead.firstName} {lead.lastName}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{lead.phone} • {lead.email}</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <div>{lead.propertyType}</div>
                    <div className="text-[11px] text-slate-500">{lead.address}, {lead.city}, {lead.state}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#144A38]">{lead.pestProblem}</span>
                    <div className="text-[11px] text-slate-500">{lead.serviceRequired}</div>
                  </td>
                  <td className="p-4 text-slate-600">
                    {lead.preferredContactMethod} ({lead.preferredContactTime})
                  </td>
                  <td className="p-4">
                    <Badge variant={lead.status === 'NEW' ? 'warning' : 'accent'}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-400">
                    {formatDate(lead.createdAt)}
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
