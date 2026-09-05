import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { useFaqs } from '../../hooks/useFaqs';
import { FaqItem } from '../../types/faq';
import { useToast } from '../../contexts/ToastContext';

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredFaqs } from '../../utils/dataStore';

export const AdminFaqPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialFaqs } = useFaqs();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqs(initialFaqs);
    }
  }, [initialFaqs]);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState({
    question: '',
    answer: '',
    category: 'General'
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormState({
      question: '',
      answer: '',
      category: 'General'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormState({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.question || !formState.answer) {
      addToast('Question and answer are required', 'error');
      return;
    }

    let updated: FaqItem[];
    if (editingFaq) {
      updated = faqs.map(f => f.id === editingFaq.id ? { ...f, ...formState } : f);
      addToast('FAQ question updated and applied to website', 'success');
    } else {
      const newFaq: FaqItem = {
        id: `faq-${Date.now()}`,
        question: formState.question,
        answer: formState.answer,
        category: formState.category
      };
      updated = [newFaq, ...faqs];
      addToast('New FAQ published to website help center!', 'success');
    }

    setFaqs(updated);
    saveStoredFaqs(updated);
    queryClient.invalidateQueries({ queryKey: ['faqs'] });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, q: string) => {
    if (window.confirm(`Are you sure you want to delete this FAQ?`)) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      saveStoredFaqs(updated);
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      addToast('FAQ question removed from website', 'info');
    }
  };

  const categories = Array.from(new Set(faqs.map(f => f.category || 'General')));

  const filtered = faqs.filter(f => {
    const matchesSearch = `${f.question} ${f.answer} ${f.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            FAQ Knowledge Base Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage public questions and answers for treatments, safety, and scheduling
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Question
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search FAQs by question, answer, category..." 
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Categories ({faqs.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filtered.map((faq) => (
          <Card key={faq.id} className="p-6 bg-white border-slate-200 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 font-extrabold text-[10px] uppercase">
                    {faq.category || 'General'}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenEdit(faq)}
                  leftIcon={<Edit className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit FAQ Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaq ? 'Edit FAQ Question' : 'Add FAQ Question'}
        subtitle="Manage customer help center entries"
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Category</label>
            <input
              type="text"
              required
              value={formState.category}
              onChange={(e) => setFormState({ ...formState, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="e.g. Safety & Pets, Pricing, Treatments"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Question *</label>
            <input
              type="text"
              required
              value={formState.question}
              onChange={(e) => setFormState({ ...formState, question: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="e.g. Are your pest control treatments safe for cats and dogs?"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Detailed Answer *</label>
            <textarea
              rows={5}
              required
              value={formState.answer}
              onChange={(e) => setFormState({ ...formState, answer: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Explain the protocol, safety guidelines, and details..."
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
              Save Question
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
