import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  Eye,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SearchBar } from '../../components/common/SearchBar';
import { AdminModal } from '../../components/admin/AdminModal';
import { useBlog } from '../../hooks/useBlog';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';

import { useQueryClient } from '@tanstack/react-query';
import { saveStoredBlog } from '../../utils/dataStore';

export const AdminBlogPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: initialPosts } = useBlog();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Dr. Evelyn Reed (Lead Entomologist)',
    authorRole: 'Board-Certified Entomologist',
    category: 'Prevention Tips',
    readingTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    tags: 'prevention, termites, home maintenance'
  });

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormState({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Dr. Evelyn Reed (Lead Entomologist)',
      authorRole: 'Board-Certified Entomologist',
      category: 'Prevention Tips',
      readingTime: '4 min read',
      coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      tags: 'prevention, pest control, seasonal guide'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormState({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorRole: post.authorRole || 'Entomologist',
      category: post.category,
      readingTime: post.readingTime || '4 min read',
      coverImage: post.coverImage || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      tags: post.tags?.join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.slug) {
      addToast('Title and URL slug are required', 'error');
      return;
    }

    const tagArray = formState.tags.split(',').map(t => t.trim()).filter(Boolean);

    let updated: BlogPost[];
    if (editingPost) {
      updated = posts.map(p => p.id === editingPost.id ? {
        ...p,
        ...formState,
        tags: tagArray
      } : p);
      addToast(`Article "${formState.title}" updated and applied to public website`, 'success');
    } else {
      const newPost: BlogPost = {
        id: `post-${Date.now()}`,
        ...formState,
        featured: false,
        tags: tagArray,
        publishedDate: new Date().toISOString()
      };
      updated = [newPost, ...posts];
      addToast(`New article "${formState.title}" published to website!`, 'success');
    }

    setPosts(updated);
    saveStoredBlog(updated);
    queryClient.invalidateQueries({ queryKey: ['blog'] });
    queryClient.invalidateQueries({ queryKey: ['post'] });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the article "${title}"?`)) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      saveStoredBlog(updated);
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      addToast(`Article removed from website`, 'info');
    }
  };

  const categories = Array.from(new Set(posts.map(p => p.category)));

  const filtered = posts.filter(p => {
    const matchesSearch = `${p.title} ${p.excerpt} ${p.author} ${p.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Knowledge Base & Blog Articles CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish entomologist prevention guides, seasonal alerts, and educational articles
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Article
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-white border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search articles by title, excerpt, category, author..." 
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="ALL">All Categories ({posts.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Card key={post.id} className="bg-white border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white rounded-lg text-[10px] font-bold uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>📅 {formatDate(post.publishedDate)}</span>
                  <span>⏱️ {post.readingTime}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="text-[11px] text-slate-500 font-semibold pt-1">
                  By {post.author}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </a>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleOpenEdit(post)}
                  leftIcon={<Edit className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Blog Article' : 'Create New Educational Article'}
        subtitle="Publish scientific pest identification and seasonal guides"
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Article Headline *</label>
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
                placeholder="e.g. 5 Signs You Have Subterranean Termites"
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
                placeholder="5-signs-termites-spring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <input
                type="text"
                value={formState.category}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="Prevention Tips"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Author Name</label>
              <input
                type="text"
                value={formState.author}
                onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Reading Time</label>
              <input
                type="text"
                value={formState.readingTime}
                onChange={(e) => setFormState({ ...formState, readingTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
                placeholder="4 min read"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
            <input
              type="url"
              value={formState.coverImage}
              onChange={(e) => setFormState({ ...formState, coverImage: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Excerpt / Summary</label>
            <textarea
              rows={2}
              value={formState.excerpt}
              onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Short 2-sentence summary for previews..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Article Body Content</label>
            <textarea
              rows={6}
              value={formState.content}
              onChange={(e) => setFormState({ ...formState, content: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="Full article markdown or paragraphs..."
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={formState.tags}
              onChange={(e) => setFormState({ ...formState, tags: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500"
              placeholder="termites, prevention, seasonal maintenance"
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
              Publish Article
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};
