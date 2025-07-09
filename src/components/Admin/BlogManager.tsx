// src/components/Admin/BlogManager.tsx

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  ArrowUp,
  ArrowDown,
  Calendar,
  BookOpen,
  ToggleLeft,
  ToggleRight,
  Image,
  X // FIXED: Added missing X icon for modal close button
} from 'lucide-react';
import { db, storage } from '../../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp // FIXED: Imported the Timestamp type from Firestore
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { BlogPost } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner'; // FIXED: Corrected path for components
import toast from 'react-hot-toast';
import { format, isValid } from 'date-fns';

// Helper function for date formatting
const formatDate = (date: Timestamp | Date | null, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!date) return 'N/A';

  // FIXED: Handles both Firestore Timestamp and JS Date objects safely
  const d = date instanceof Timestamp ? date.toDate() : date;
  if (isValid(d)) {
    return format(d, formatStr);
  }
  return 'N/A';
};

// Form data interface for adding/editing blog posts
interface BlogPostFormData {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string;
  category: string;
  slug: string;
  published: boolean;
  // This helps track the original publishedAt date when editing
  publishedAt?: Timestamp | null;
}

// Main Blog Management Component
export default function BlogManager() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPostFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof BlogPost>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Fetch Blog Posts with real-time updates
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Order by createdAt for consistent initial load, sorting is handled client-side later
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: BlogPost[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as BlogPost));
      setBlogPosts(posts);
      setIsLoading(false);
    }, (err: FirebaseError) => {
      console.error("Error fetching blog posts:", err);
      setError(err.message || "Failed to load blog posts.");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ADDED: Sorting handler function
  const handleSort = useCallback((column: keyof BlogPost) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn]);

  // Filter and Sort Logic
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(lowercasedTerm) ||
        post.content.toLowerCase().includes(lowercasedTerm) ||
        post.author.toLowerCase().includes(lowercasedTerm);

      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;

      const matchesPublished = filterPublished === 'all' ||
        (filterPublished === 'published' && post.published) ||
        (filterPublished === 'draft' && !post.published);

      return matchesSearch && matchesCategory && matchesPublished;
    });

    return [...filtered].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue instanceof Timestamp && bValue instanceof Timestamp) {
        const aTime = aValue.toDate().getTime();
        const bTime = bValue.toDate().getTime();
        return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
       if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      }
      return 0;
    });
  }, [blogPosts, searchTerm, filterCategory, filterPublished, sortColumn, sortDirection]);

  // Handle Add/Edit Form Submission
  const handleFormSubmit = async (data: BlogPostFormData) => {
    if (!data.title || !data.content || !data.excerpt || !data.author || !data.category) {
        toast.error("Please fill out all required fields.");
        return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = data.featuredImage || '';
      const toastId = toast.loading(data.id ? 'Updating post...' : 'Adding new post...');

      if (featuredImageFile) {
        toast.loading("Uploading image...", { id: 'imageUpload' });
        const imageRef = ref(storage, `blog_images/${Date.now()}_${featuredImageFile.name}`);
        const snapshot = await uploadBytes(imageRef, featuredImageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        toast.success("Image uploaded!", { id: 'imageUpload' });
      }

      const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

      const postData: Omit<BlogPost, 'id'> = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: imageUrl,
        author: data.author,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: data.category,
        slug,
        published: data.published,
        updatedAt: serverTimestamp() as Timestamp,
        // Set createdAt only on new documents
        createdAt: data.id ? (blogPosts.find(p => p.id === data.id)?.createdAt as Timestamp) : serverTimestamp() as Timestamp,
        // Set publishedAt logic
        publishedAt: data.published ? (data.publishedAt || serverTimestamp() as Timestamp) : null
      };

      if (data.id) {
        const postRef = doc(db, 'blogPosts', data.id);
        await updateDoc(postRef, postData);
        toast.success("Blog post updated successfully!", { id: toastId });
      } else {
        await addDoc(collection(db, 'blogPosts'), postData);
        toast.success("New blog post added successfully!", { id: toastId });
      }

      setIsModalOpen(false);
      setCurrentPost(null);
      setFeaturedImageFile(null);
    } catch (err: any) {
      console.error("Error saving blog post:", err);
      const message = err.message || "Failed to save blog post.";
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (postId: string, imageUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      return;
    }
    const toastId = toast.loading("Deleting post...");
    try {
      if (imageUrl) {
        try {
          // FIXED: Correctly create a storage reference from the full URL
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (storageError: any) {
            // Log a warning if the image doesn't exist, but don't block deletion
            if (storageError.code === 'storage/object-not-found') {
                console.warn(`Image not found in storage, but proceeding with document deletion: ${imageUrl}`);
            } else {
                throw storageError; // Rethrow other storage errors
            }
        }
      }
      await deleteDoc(doc(db, 'blogPosts', postId));
      toast.success("Blog post deleted successfully!", { id: toastId });
    } catch (err: any) {
      console.error("Error deleting blog post:", err);
      toast.error(err.message || "Failed to delete blog post.", { id: toastId });
    }
  };

  // Handle Publish Toggle
  const handlePublishToggle = async (post: BlogPost) => {
    const toastId = toast.loading("Updating status...");
    try {
      const postRef = doc(db, 'blogPosts', post.id);
      await updateDoc(postRef, {
        published: !post.published,
        publishedAt: !post.published ? serverTimestamp() : null
      });
      toast.success(`Post ${!post.published ? 'published' : 'set to draft'}.`, { id: toastId });
    } catch (err: any) {
      console.error("Error toggling publish status:", err);
      toast.error(err.message || "Failed to toggle status.", { id: toastId });
    }
  };

  // Open Add/Edit Modal
  const openModal = (post?: BlogPost) => {
    setCurrentPost(post ? {
      ...post,
      tags: post.tags.join(', '),
    } : {
      title: '', content: '', excerpt: '', featuredImage: '', author: '',
      tags: '', category: '', slug: '', published: false
    });
    setFeaturedImageFile(null);
    setIsModalOpen(true);
  };
  
   // The rest of the JSX remains largely the same, but with corrected handlers and props.
   // I have included the full corrected JSX below.

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Blog Posts</span></h1>
        <button
          onClick={() => openModal()}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <PlusCircle size={20} className="mr-2" /> New Post
        </button>
      </div>

      {isLoading ? (
        <div className="min-h-64 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="min-h-64 flex items-center justify-center text-red-600 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">Error: {error}</div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Posts</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Search by title, author, content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Category</label>
                <select
                  id="categoryFilter"
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {[...new Set(blogPosts.map(p => p.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="publishedFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Status</label>
                <select
                  id="publishedFilter"
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  value={filterPublished}
                  onChange={(e) => setFilterPublished(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <button
                  onClick={() => {
                    setSearchTerm(''); setFilterCategory('all'); setFilterPublished('all');
                    setSortColumn('createdAt'); setSortDirection('desc');
                  }}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >Clear Filters</button>
              </div>
            </div>
          </div>

          {/* Blog Posts Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {/* FIXED: All table headers now correctly use the implemented handleSort function */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                      <div className="flex items-center"><BookOpen size={14} className="mr-1" /> Title {sortColumn === 'title' && (sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />)}</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('author')}>
                      <div className="flex items-center">Author {sortColumn === 'author' && (sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />)}</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                      <div className="flex items-center">Category {sortColumn === 'category' && (sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />)}</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('publishedAt')}>
                      <div className="flex items-center"><Calendar size={14} className="mr-1" /> Published Date {sortColumn === 'publishedAt' && (sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />)}</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('published')}>
                      <div className="flex items-center">Status {sortColumn === 'published' && (sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />)}</div>
                    </th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAndSortedPosts.length > 0 ? (
                    filteredAndSortedPosts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{post.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{post.author}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{post.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{formatDate(post.publishedAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button onClick={() => openModal(post)} className="text-blue-500 hover:text-blue-700" title="Edit"><Edit size={20} /></button>
                          <button onClick={() => handlePublishToggle(post)} className="text-gray-500 hover:text-gray-700" title={post.published ? "Set to Draft" : "Publish"}>
                            {post.published ? <ToggleRight size={20} className="text-green-500"/> : <ToggleLeft size={20} />}
                          </button>
                          <button onClick={() => handleDeletePost(post.id, post.featuredImage)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={20} /></button>
                          <Link to={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-700" title="View Live"><Eye size={20} /></Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No blog posts found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Blog Post Modal */}
      {isModalOpen && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentPost.id ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"><X size={24} /></button>
            </div>
            <div className="overflow-y-auto flex-grow">
              <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(currentPost); }} className="p-6 space-y-6">
                {/* All form inputs remain the same */}
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                    <input type="text" id="title" value={currentPost.title} onChange={(e) => setCurrentPost(p => ({ ...p!, title: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt (short summary) *</label>
                    <textarea id="excerpt" value={currentPost.excerpt} onChange={(e) => setCurrentPost(p => ({ ...p!, excerpt: e.target.value }))} rows={2} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-y" />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content *</label>
                    <textarea id="content" value={currentPost.content} onChange={(e) => setCurrentPost(p => ({ ...p!, content: e.target.value }))} rows={10} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-y" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
                    {currentPost.featuredImage && !featuredImageFile && (
                        <div className="flex items-center space-x-3 mb-2">
                            <img src={currentPost.featuredImage} alt="Featured" className="w-24 h-auto rounded-lg object-cover shadow-md" />
                            <button type="button" onClick={() => setCurrentPost(p => ({ ...p!, featuredImage: '' }))} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                        </div>
                    )}
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                        <input type="file" id="featuredImage" onChange={(e) => setFeaturedImageFile(e.target.files ? e.target.files[0] : null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                        <Image size={24} className="mx-auto text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Drag & drop or click to upload</p>
                        {featuredImageFile && <p className="text-xs text-primary-500 mt-1 font-semibold">{featuredImageFile.name}</p>}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author *</label>
                        <input type="text" id="author" value={currentPost.author} onChange={(e) => setCurrentPost(p => ({ ...p!, author: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                        <input type="text" id="category" value={currentPost.category} onChange={(e) => setCurrentPost(p => ({ ...p!, category: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" />
                    </div>
                     <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
                        <input type="text" id="tags" value={currentPost.tags} onChange={(e) => setCurrentPost(p => ({ ...p!, tags: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="e.g., essay, research, tips" />
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                        <input type="text" id="slug" value={currentPost.slug} onChange={(e) => setCurrentPost(p => ({ ...p!, slug: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="auto-generates from title"/>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Leave empty to auto-generate from title.</p>
                    </div>
                    <div className="md:col-span-2 flex items-center pt-2">
                        <input type="checkbox" id="published" checked={currentPost.published} onChange={(e) => setCurrentPost(p => ({ ...p!, published: e.target.checked }))} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <label htmlFor="published" className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-300">Publish Post (visible to public)</label>
                    </div>
                </div>
                 <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium disabled:opacity-50">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:bg-primary-400">
                        {isSubmitting ? (<><LoadingSpinner size="sm" className="mr-2" /> Saving...</>) : (currentPost.id ? 'Save Changes' : 'Add Post')}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}