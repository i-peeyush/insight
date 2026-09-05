import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Plus, 
  Search, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  Edit,
  ThumbsUp
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { useTestimonials } from '../../hooks/useTestimonials';
import { Testimonial } from '../../types/testimonial';
import { useToast } from '../../contexts/ToastContext';

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredTestimonials } from '../../utils/dataStore';

export const AdminTestimonialsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialTestimonials } = useTestimonials();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    if (initialTestimonials && initialTestimonials.length > 0) {
      setTestimonials(initialTestimonials);
    }
  }, [initialTestimonials]);

  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | 'ALL'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState({
    customerName: '',
    location: '',
    rating: 5,
    serviceUsed: 'Quarterly Home Defense',
    testimonialText: '',
    verifiedCustomer: true
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.customerName || !formState.testimonialText) {
      addToast('Customer name and review text are required', 'error');
      return;
    }

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      customerName: formState.customerName,
      location: formState.location || 'Raleigh, NC',
      rating: formState.rating,
      service: formState.serviceUsed,
      review: formState.testimonialText,
      verified: formState.verifiedCustomer,
      date: new Date().toISOString()
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    saveStoredTestimonials(updated);
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    setIsModalOpen(false);
    addToast('New customer review published to website!', 'success');
    setFormState({
      customerName: '',
      location: '',
      rating: 5,
      serviceUsed: 'Quarterly Home Defense',
      testimonialText: '',
      verifiedCustomer: true
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the review by ${name}?`)) {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      saveStoredTestimonials(updated);
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      addToast(`Review by ${name} removed from website`, 'info');
    }
  };

  const filtered = testimonials.filter(t => {
    const matchesSearch = `${t.customerName} ${t.location} ${t.review} ${t.service}`.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === 'ALL' || t.rating === ratingFilter;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews & Testimonials Moderation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Approve, manage, and feature verified homeowner and commercial client feedback
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Verified Review
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search reviews by customer name, city, service..." 
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Star Ratings ({testimonials.length})</option>
            <option value="5">5-Star Reviews Only</option>
            <option value="4">4-Star Reviews</option>
            <option value="3">3-Star & Below</option>
          </select>
        </div>
      </Card>

      {/* Testimonials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Card key={item.id} className="p-6 bg-white border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                {item.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{item.review}"
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs text-slate-900">{item.customerName}</div>
                  <div className="text-[11px] text-slate-500">{item.location} • {item.service}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleDelete(item.id, item.customerName)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Review Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Verified Customer Review"
        subtitle="Publish a real client review to the testimonials section"
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={formState.customerName}
                onChange={(e) => setFormState({ ...formState, customerName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Sarah M."
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">City / Neighborhood</label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Cary, NC"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Star Rating (1 - 5)</label>
              <select
                value={formState.rating}
                onChange={(e) => setFormState({ ...formState, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Average)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Service Program</label>
              <input
                type="text"
                value={formState.serviceUsed}
                onChange={(e) => setFormState({ ...formState, serviceUsed: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="e.g. Termite Sentricon Defense"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Testimonial Review Text *</label>
            <textarea
              rows={4}
              required
              value={formState.testimonialText}
              onChange={(e) => setFormState({ ...formState, testimonialText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="What the customer said about the technician and treatment..."
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
              Publish Review
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
