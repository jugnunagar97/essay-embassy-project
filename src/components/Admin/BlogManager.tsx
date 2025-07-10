// src/components/Admin/BlogManager.tsx

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { BlogPost } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { PlusCircle, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, XCircle } from 'lucide-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  publishedAt?: Timestamp | null;
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};

export default function BlogManager() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPostFormData> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof BlogPost>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setBlogPosts(posts);
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching posts: ", error);
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSort = useCallback((column: keyof BlogPost) => {
      if (sortColumn === column) {
        setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('desc');
      }
  }, [sortColumn]);

  const filteredAndSortedPosts = useMemo(() => {
    return blogPosts
      .filter(post => {
        const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
        const lowercasedTerm = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' ||
          post.title.toLowerCase().includes(lowercasedTerm) ||
          post.author.toLowerCase().includes(lowercasedTerm);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
          const aVal = a[sortColumn];
          const bVal = b[sortColumn];
          if (aVal && bVal && (aVal.constructor.name === 'Timestamp' && bVal.constructor.name === 'Timestamp')) {
              const aTime = (aVal as any).toDate().getTime();
              const bTime = (bVal as any).toDate().getTime();
              return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
          }
          if (typeof aVal === 'string' && typeof bVal === 'string') {
              return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          }
          return 0;
      });
  }, [blogPosts, searchTerm, filterCategory, sortColumn, sortDirection]);

  const openModal = (post?: BlogPost) => {
    setCurrentPost(post ? { ...post, tags: post.tags.join(', ') } : { title: '', content: '', excerpt: '', author: '', category: '', slug: '', tags: '', published: false });
    setFeaturedImageFile(null);
    setIsModalOpen(true);
  };

  // FIXED: The logic for handling form submission and timestamps
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost || !currentPost.title || !currentPost.content) {
      toast.error("Title and Content are required.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Saving post...');
    
    try {
      let imageUrl = currentPost.featuredImage || '';
      if (featuredImageFile) {
          const imageRef = ref(storage, `blog_images/${Date.now()}_${featuredImageFile.name}`);
          await uploadBytes(imageRef, featuredImageFile);
          imageUrl = await getDownloadURL(imageRef);
      }
      
      const dataToSave = {
          title: currentPost.title,
          content: currentPost.content,
          excerpt: currentPost.excerpt,
          featuredImage: imageUrl,
          author: currentPost.author,
          tags: (currentPost.tags as any)?.split(',').map((t:string) => t.trim()).filter(Boolean) || [],
          category: currentPost.category,
          slug: currentPost.slug || currentPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
          published: currentPost.published,
      };

      if (currentPost.id) {
        // This is an UPDATE
        const postRef = doc(db, 'blogPosts', currentPost.id);
        await updateDoc(postRef, {
            ...dataToSave,
            publishedAt: currentPost.published ? (currentPost.publishedAt || serverTimestamp()) : null,
            updatedAt: serverTimestamp(),
        });
      } else {
        // This is a NEW post
        await addDoc(collection(db, 'blogPosts'), {
            ...dataToSave,
            publishedAt: currentPost.published ? serverTimestamp() : null,
            createdAt: serverTimestamp(),
            // We don't need 'updatedAt' on creation, 'createdAt' serves that purpose initially.
        });
      }

      toast.success('Post saved successfully!', { id: toastId });
      setIsModalOpen(false);

    } catch (err: any) {
        console.error("Error saving post:", err);
        toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;
    toast.loading('Deleting post...');
    try {
        if (post.featuredImage) {
            const imageRef = ref(storage, post.featuredImage);
            await deleteObject(imageRef).catch(err => console.warn("Image delete failed, may not exist.", err));
        }
        await deleteDoc(doc(db, 'blogPosts', post.id));
        toast.success('Post deleted!');
    } catch(err) {
        toast.error('Failed to delete post.');
    }
  }
  
  const formatDateSafe = (dateObj: any) => dateObj ? format(dateObj.toDate(), 'MMM dd, yyyy') : 'N/A';

  if (isLoading) {
    return <div className="p-10 flex justify-center items-center"><LoadingSpinner size="lg"/></div>
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Blog Posts</span></h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center"><PlusCircle size={20} className="mr-2"/> New Post</button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Search Posts</label>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Search by title or author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 p-2 border rounded-lg"/></div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Filter by Category</label>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full p-2 border rounded-lg">
                    <option value="all">All Categories</option>
                    {[...new Set(blogPosts.map(p => p.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('title')}><div className="flex items-center">Title {sortColumn === 'title' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('publishedAt')}><div className="flex items-center">Published {sortColumn === 'publishedAt' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedPosts.map(post => (
                <tr key={post.id}>
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">{formatDateSafe(post.publishedAt)}</td>
                  <td className="px-6 py-4">{post.published ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Published</span> : <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Draft</span>}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link to={`/blog/${post.slug}`} target="_blank" className="text-gray-500 hover:text-gray-700 inline-block"><Eye size={18}/></Link>
                    <button onClick={() => openModal(post)} className="text-blue-500 hover:text-blue-700"><Edit size={18}/></button>
                    <button onClick={() => handleDeletePost(post)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">{currentPost?.id ? "Edit Blog Post" : "Add New Blog Post"}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)}><XCircle/></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <input type="text" placeholder="Post Title" required value={currentPost?.title || ''} onChange={e => setCurrentPost(p => ({...p!, title: e.target.value}))} className="w-full p-2 border rounded-lg"/>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <ReactQuill theme="snow" value={currentPost?.content || ''} onChange={(content) => setCurrentPost(p => ({ ...p!, content: content }))} modules={quillModules} className="bg-white"/>
              </div>

              <textarea placeholder="Excerpt (a short summary for the blog list page)" required value={currentPost?.excerpt || ''} onChange={e => setCurrentPost(p => ({...p!, excerpt: e.target.value}))} className="w-full p-2 border rounded-lg" rows={3}/>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Author" required value={currentPost?.author || ''} onChange={e => setCurrentPost(p => ({...p!, author: e.target.value}))} className="w-full p-2 border rounded-lg"/>
                <input type="text" placeholder="Category" required value={currentPost?.category || ''} onChange={e => setCurrentPost(p => ({...p!, category: e.target.value}))} className="w-full p-2 border rounded-lg"/>
              </div>
              <input type="text" placeholder="Tags (comma-separated)" value={currentPost?.tags as any || ''} onChange={e => setCurrentPost(p => ({...p!, tags: e.target.value as any}))} className="w-full p-2 border rounded-lg"/>
              <input type="text" placeholder="URL Slug (auto-generates if empty)" value={currentPost?.slug || ''} onChange={e => setCurrentPost(p => ({...p!, slug: e.target.value}))} className="w-full p-2 border rounded-lg"/>
              
              <div>
                <label className="block text-sm">Featured Image</label>
                <input type="file" onChange={(e) => setFeaturedImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm"/>
                {currentPost?.featuredImage && !featuredImageFile && <img src={currentPost.featuredImage} alt="current" className="w-32 h-auto mt-2 rounded-lg shadow-md"/>}
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="published" checked={currentPost?.published || false} onChange={e => setCurrentPost(p => ({...p!, published: e.target.checked}))} className="h-4 w-4 rounded"/>
                <label htmlFor="published" className="ml-2">Publish Post</label>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save Post"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}