import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { useServices } from '../../hooks/useServices';
import { Service } from '../../types/service';
import { useToast } from '../../contexts/ToastContext';

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredServices } from '../../utils/dataStore';

export const AdminServicesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialServices } = useServices();
  const [services, setServices] = useState<Service[]>([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServices(initialServices);
    }
  }, [initialServices]);

  const [search, setSearch] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState<{
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    pricingEstimate: string;
    category: Service['category'];
    warranty: string;
    treatmentFrequency: string;
    features: string[];
  }>({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    pricingEstimate: '$149 Initial / $45 Mo',
    category: 'Residential',
    warranty: '100% Insight Protection Guarantee',
    treatmentFrequency: 'Quarterly Seasonal Rotation',
    features: ['EPA-Reduced Risk Botanical Micro-Treatments', 'Perimeter Exclusion Barrier', 'Free 24h Re-services']
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormState({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      pricingEstimate: '$149 Initial / $45 Mo',
      category: 'Residential',
      warranty: '100% Insight Protection Guarantee',
      treatmentFrequency: 'Quarterly Seasonal Rotation',
      features: ['EPA-Reduced Risk Botanical Micro-Treatments', 'Perimeter Exclusion Barrier', 'Free 24h Re-services']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormState({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      pricingEstimate: service.pricingEstimate,
      category: service.category,
      warranty: service.warranty,
      treatmentFrequency: service.treatmentFrequency || 'Quarterly Seasonal Rotation',
      features: service.features || []
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug) {
      addToast('Title and URL slug are required', 'error');
      return;
    }

    let updatedList: Service[];
    if (editingService) {
      // Update existing
      updatedList = services.map(s => s.id === editingService.id ? {
        ...s,
        ...formState
      } : s);
      addToast(`Service "${formState.title}" updated and applied to website`, 'success');
    } else {
      // Create new
      const newService: Service = {
        id: `srv-${Date.now()}`,
        ...formState,
        icon: 'ShieldAlert',
        featured: false,
        targetPests: ['Ants', 'Spiders', 'Roaches', 'Rodents'],
        heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
        process: [
          { step: 1, title: 'Comprehensive Inspection', desc: 'Detailed property assessment.' },
          { step: 2, title: 'Targeted Barrier Defense', desc: 'Application of active shield.' }
        ],
        faqs: []
      };
      updatedList = [...services, newService];
      addToast(`New service "${formState.title}" published to website catalog!`, 'success');
    }

    setServices(updatedList);
    saveStoredServices(updatedList);
    queryClient.invalidateQueries({ queryKey: ['services'] });
    queryClient.invalidateQueries({ queryKey: ['service'] });
    setIsModalOpen(false);
  };

  const handleDelete = (serviceId: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      const updatedList = services.filter(s => s.id !== serviceId);
      setServices(updatedList);
      saveStoredServices(updatedList);
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['service'] });
      addToast(`Service "${title}" removed from website`, 'info');
    }
  };

  const filtered = services.filter(s =>
    `${s.title} ${s.shortDescription} ${s.pricingEstimate}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Services & Treatment Programs Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure active pest control programs, warranty terms, and pricing tiers
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Service Program
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4 bg-white border-slate-200">
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search services by name, description, price..." 
        />
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <Card key={service.id} className="p-6 bg-white border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                  Active
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">{service.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{service.shortDescription}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Price Structure:</span>
                  <span className="font-extrabold text-slate-900">{service.pricingEstimate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-semibold text-slate-700">{service.treatmentFrequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Guarantee:</span>
                  <span className="font-semibold text-red-600">{service.warranty}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Features</span>
                {service.features?.slice(0, 3).map((f: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleOpenEdit(service)}
                leftIcon={<Edit className="w-3.5 h-3.5" />}
              >
                Edit
              </Button>
              <button
                onClick={() => handleDelete(service.id, service.title)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? `Edit Service: ${editingService.title}` : 'Add New Service Program'}
        subtitle="Configure service titles, warranty duration, and pricing"
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Service Program Name *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setFormState({ ...formState, title, slug: formState.slug || slug });
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Wildlife & Raccoon Relocation"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={formState.slug}
                onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-mono"
                placeholder="wildlife-relocation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Price Structure</label>
              <input
                type="text"
                value={formState.pricingEstimate}
                onChange={(e) => setFormState({ ...formState, pricingEstimate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="$199 Initial / $55 Mo"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Treatment Frequency</label>
              <input
                type="text"
                value={formState.treatmentFrequency}
                onChange={(e) => setFormState({ ...formState, treatmentFrequency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Bi-Monthly / Quarterly"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formState.shortDescription}
              onChange={(e) => setFormState({ ...formState, shortDescription: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Brief 1-2 sentence overview for cards..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Description</label>
            <textarea
              rows={3}
              value={formState.fullDescription}
              onChange={(e) => setFormState({ ...formState, fullDescription: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Detailed treatment overview and protocol..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Warranty Term</label>
            <input
              type="text"
              value={formState.warranty}
              onChange={(e) => setFormState({ ...formState, warranty: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="100% Insight Protection Guarantee"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save Service Program
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
