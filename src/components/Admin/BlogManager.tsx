// src/components/Admin/BlogManager.tsx

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  collection, addDoc, onSnapshot, query, orderBy, doc,
  updateDoc, deleteDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { BlogPost } from '../../types'; // Assuming BlogPost type is defined here
import LoadingSpinner from '../Common/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import {
  PlusCircle, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, XCircle,
  FolderPlus, FolderEdit, Save, Plus // FIXED: Ensured 'Plus' is explicitly imported.
} from 'lucide-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import { db } from '../../firebase';

// Define the structure for a blog category
interface BlogCategory {
  id: string;
  name: string;
  createdAt?: Timestamp;
}

// Extend BlogPostFormData to include category management fields
interface BlogPostFormData {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string; // Stored as comma-separated string in form, converted to array for Firestore
  category: string; // The selected category name
  slug: string;
  published: boolean;
  publishedAt?: Timestamp | null;
}

// NOTE: The 'quillModules' constant is now removed from here.
// Its content is directly integrated into 'memoizedQuillModules' below for correct ReactQuill configuration.
// This resolves the "Cannot find name 'quillModules'" error that appeared previously.

export default function BlogManager() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]); // State for categories
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPostFormData> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // State for category management modal
  const [newCategoryName, setNewCategoryName] = useState(''); // State for new category input
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null); // State for category being edited
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all'); // Filter by category
  const [sortColumn, setSortColumn] = useState<keyof BlogPost>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const quillRef = useRef<ReactQuill>(null); // Ref for ReactQuill instance

  // Effect to fetch blog posts from Firestore
  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setBlogPosts(posts);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      toast.error("Failed to load blog posts.");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Effect to fetch blog categories from Firestore
  useEffect(() => {
    const q = query(collection(db, 'blogCategories'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogCategory));
      setBlogCategories(categories);
    }, (error) => {
      console.error("Error fetching categories: ", error);
      toast.error("Failed to load blog categories.");
    });
    return () => unsubscribe();
  }, []);

  // Callback for handling column sorting in the table
  const handleSort = useCallback((column: keyof BlogPost) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn]);

  // Memoized function to filter and sort blog posts for display
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

        // Handle Timestamp comparison
        if (aVal instanceof Timestamp && bVal instanceof Timestamp) {
          const aTime = aVal.toDate().getTime();
          const bTime = bVal.toDate().getTime();
          return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
        }
        // Handle string comparison
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        // Fallback for other types or if values are null/undefined
        return 0;
      });
  }, [blogPosts, searchTerm, filterCategory, sortColumn, sortDirection]);

  // Opens the blog post creation/edit modal
  const openModal = (post?: BlogPost) => {
    setCurrentPost(post ? { ...post, tags: post.tags.join(', ') } : {
      title: '', content: '', excerpt: '', author: '',
      category: '', // FIXED: Set initial category to empty string for new posts to prevent issues.
      slug: '', tags: '', published: false
    });
    setFeaturedImageFile(null); // Clear any previously selected image file
    setIsModalOpen(true);
  };

  // Handles the submission of the blog post form (create or update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost || !currentPost.title || !currentPost.content || !currentPost.category) {
      toast.error("Title, Content, and Category are required.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(currentPost.id ? 'Updating post...' : 'Creating post...');

    try {
      let imageUrl = currentPost.featuredImage || '';
      // If a new featured image file is selected, upload it
      if (featuredImageFile) {
        const imageRef = ref(storage, `blog_images/${Date.now()}_${featuredImageFile.name}`);
        await uploadBytes(imageRef, featuredImageFile);
        imageUrl = await getDownloadURL(imageRef);
        // If updating and there was an old image, delete it
        if (currentPost.id && currentPost.featuredImage && currentPost.featuredImage !== imageUrl) {
          try {
            const oldImageRef = ref(storage, currentPost.featuredImage);
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.warn("Failed to delete old featured image:", deleteError);
          }
        }
      }

      // Prepare data to save to Firestore
      const dataToSave = {
        title: currentPost.title,
        content: currentPost.content,
        excerpt: currentPost.excerpt,
        featuredImage: imageUrl,
        author: currentPost.author,
        tags: (currentPost.tags as string)?.split(',').map((t: string) => t.trim()).filter(Boolean) || [],
        category: currentPost.category,
        // Auto-generate slug if not provided or if it's a new post
        slug: currentPost.slug || currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        published: currentPost.published,
      };

      if (currentPost.id) {
        // Update existing post
        const postRef = doc(db, 'blogPosts', currentPost.id);
        await updateDoc(postRef, {
          ...dataToSave,
          // Set publishedAt if it's a new publish, otherwise keep existing
          publishedAt: currentPost.published ? (currentPost.publishedAt || serverTimestamp()) : null,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Add new post
        await addDoc(collection(db, 'blogPosts'), {
          ...dataToSave,
          publishedAt: currentPost.published ? serverTimestamp() : null,
          createdAt: serverTimestamp(),
        });
      }

      toast.success('Post saved successfully!', { id: toastId });
      setIsModalOpen(false); // Close the modal on success

    } catch (err: any) {
      console.error("Error saving post:", err);
      toast.error(`Error: ${err.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Handles the deletion of a blog post
  const handleDeletePost = async (post: BlogPost) => {
    // Custom confirmation modal instead of window.confirm
    const confirmed = await new Promise((resolve) => {
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4';
      confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete "${post.title}"?</p>
          <div class="flex justify-center space-x-4">
            <button id="cancelBtn" type="button" class="btn-secondary px-4 py-2">Cancel</button>
            <button id="confirmBtn" type="button" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);

      document.getElementById('cancelBtn')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(false);
      });
      document.getElementById('confirmBtn')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(true);
      });
    });

    if (!confirmed) return;

    toast.loading('Deleting post...');
    try {
      // Delete featured image from storage if it exists
      if (post.featuredImage) {
        const imageRef = ref(storage, post.featuredImage);
        await deleteObject(imageRef).catch(err => console.warn("Image delete failed, may not exist or already deleted.", err));
      }
      // Delete post document from Firestore
      await deleteDoc(doc(db, 'blogPosts', post.id));
      toast.success('Post deleted!');
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast.error(`Failed to delete post: ${err.message}`);
    }
  };

  // Formats Firestore Timestamp objects to a readable date string
  const formatDateSafe = (dateObj: Timestamp | null | undefined) => dateObj ? format(dateObj.toDate(), 'MMM dd, yyyy') : 'N/A';

  // Custom image handler for ReactQuill
  // FIXED: Moved this function definition UPWARDS to resolve "Cannot find name 'imageHandler'" error.
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        toast.loading('Uploading image...', { id: 'image-upload' });
        try {
          const storageRef = ref(storage, `blog_content_images/${Date.now()}_${file.name}`);
          const uploadResult = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(uploadResult.ref);

          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            if (range) {
              quill.insertEmbed(range.index, 'image', imageUrl);
              quill.setSelection(range.index + 1, 0); // FIXED: Added ', 0' for RangeStatic type.
            } else {
              const length = quill.getLength(); // Get length first
              quill.insertEmbed(length, 'image', imageUrl);
              quill.setSelection(length, 0); // FIXED: Added ', 0' for RangeStatic type.
            }
          }
          toast.success('Image uploaded!', { id: 'image-upload' });
        } catch (error: any) {
          console.error("Error uploading image:", error);
          toast.error(`Image upload failed: ${error.message}`, { id: 'image-upload' });
        }
      }
    };
  }, []);

  // Memoized Quill modules with custom image handler
  // FIXED: This now directly defines the toolbar and handlers, resolving "moduleClass is not a constructor"
  // and ensuring 'memoizedQuillModules' is correctly structured and used.
  const memoizedQuillModules = useMemo(() => ({
    toolbar: {
      container: [ // Define the toolbar structure here
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler, // Assign your custom image handler
      },
    },
  }), [imageHandler]);


  // Category Management Functions
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }
    if (blogCategories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      toast.error("Category already exists.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Adding category...');
    try {
      await addDoc(collection(db, 'blogCategories'), {
        name: newCategoryName.trim(),
        createdAt: serverTimestamp(),
      });
      toast.success('Category added successfully!', { id: toastId });
      setNewCategoryName('');
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast.error(`Failed to add category: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !newCategoryName.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }
    if (blogCategories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase() && cat.id !== editingCategory.id)) {
      toast.error("Category with this name already exists.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Updating category...');
    try {
      const categoryRef = doc(db, 'blogCategories', editingCategory.id);
      await updateDoc(categoryRef, { name: newCategoryName.trim() });
      toast.success('Category updated successfully!', { id: toastId });
      setEditingCategory(null);
      setNewCategoryName('');
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(`Failed to update category: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category: BlogCategory) => {
    // Custom confirmation modal
    const confirmed = await new Promise((resolve) => {
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4';
      confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete category "${category.name}"? This will not delete posts, but they might lose their category association if not updated.</p>
          <div class="flex justify-center space-x-4">
            <button id="cancelBtnCat" type="button" class="btn-secondary px-4 py-2">Cancel</button>
            <button id="confirmBtnCat" type="button" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);

      document.getElementById('cancelBtnCat')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(false);
      });
      document.getElementById('confirmBtnCat')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(true);
      });
    });

    if (!confirmed) return;

    toast.loading('Deleting category...');
    try {
      await deleteDoc(doc(db, 'blogCategories', category.id));
      toast.success('Category deleted!');
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(`Failed to delete category: ${error.message}`);
    }
  };

  // Show loading spinner if data is still being fetched
  if (isLoading) {
    return <div className="p-10 flex justify-center items-center"><LoadingSpinner size="lg" /></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage <span className="text-primary-500">Blog Posts</span></h1>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => openModal()} className="btn-primary flex items-center">
            <PlusCircle size={20} className="mr-2" /> New Post
          </button>
          <button onClick={() => setIsCategoryModalOpen(true)} className="btn-secondary flex items-center">
            <FolderPlus size={20} className="mr-2" /> Manage Categories
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search-posts" className="form-label">Search Posts</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="search-posts"
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="filter-category" className="form-label">Filter by Category</label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="form-select"
            >
              <option value="all">All Categories</option>
              {/* Dynamically populate categories from fetched data */}
              {blogCategories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('title')}>
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    {sortColumn === 'title' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => handleSort('publishedAt')}>
                  <div className="flex items-center space-x-1">
                    <span>Published</span>
                    {sortColumn === 'publishedAt' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">Status</th>
                <th className="relative px-6 py-3 text-right"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No blog posts found.</td>
                </tr>
              ) : (
                filteredAndSortedPosts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{post.title}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{post.author}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{post.category || 'Uncategorized'}</td> {/* Display 'Uncategorized' if empty */}
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatDateSafe(post.publishedAt)}</td>
                    <td className="px-6 py-4">
                      {post.published ?
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Published</span> :
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Draft</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/blog/${post.slug}`} target="_blank" className="text-gray-500 hover:text-primary-500 inline-block icon-hover" title="View Post">
                        <Eye size={18} />
                      </Link>
                      <button onClick={() => openModal(post)} className="text-blue-500 hover:text-blue-700 icon-hover" title="Edit Post">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeletePost(post)} className="text-red-500 hover:text-red-700 icon-hover" title="Delete Post">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Post Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentPost?.id ? "Edit Blog Post" : "Add New Blog Post"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Close"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable Content) */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <label htmlFor="post-title" className="form-label">Post Title <span className="text-red-500">*</span></label>
                <input
                  id="post-title"
                  type="text"
                  placeholder="Enter post title"
                  required
                  value={currentPost?.title || ''}
                  onChange={e => setCurrentPost(p => ({ ...p!, title: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="post-content" className="form-label">Content <span className="text-red-500">*</span></label>
                <ReactQuill
                  key={currentPost?.id || 'new'} // FIXED: Added key prop to force re-render on new post/edit.
                  ref={quillRef} // Attach ref for custom image handler
                  theme="snow"
                  value={currentPost?.content || ''}
                  onChange={(content) => setCurrentPost(p => ({ ...p!, content: content }))}
                  modules={memoizedQuillModules} // Use memoized modules with custom handler
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="post-excerpt" className="form-label">Excerpt (short summary for list page) <span className="text-red-500">*</span></label>
                <textarea
                  id="post-excerpt"
                  placeholder="Enter a brief summary of the post..."
                  required
                  value={currentPost?.excerpt || ''}
                  onChange={e => setCurrentPost(p => ({ ...p!, excerpt: e.target.value }))}
                  className="form-input"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="post-author" className="form-label">Author <span className="text-red-500">*</span></label>
                  <input
                    id="post-author"
                    type="text"
                    placeholder="Enter author name"
                    required
                    value={currentPost?.author || ''}
                    onChange={e => setCurrentPost(p => ({ ...p!, author: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="post-category" className="form-label">Category <span className="text-red-500">*</span></label>
                  <select
                    id="post-category"
                    required
                    value={currentPost?.category || ''}
                    onChange={e => setCurrentPost(p => ({ ...p!, category: e.target.value }))}
                    className="form-select"
                  >
                    <option value="" disabled>Select a category</option>
                    {blogCategories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="post-tags" className="form-label">Tags (comma-separated)</label>
                <input
                  id="post-tags"
                  type="text"
                  placeholder="e.g., essay, writing, tips, academic"
                  value={currentPost?.tags || ''}
                  onChange={e => setCurrentPost(p => ({ ...p!, tags: e.target.value as any }))}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="post-slug" className="form-label">URL Slug (auto-generates if empty)</label>
                <input
                  id="post-slug"
                  type="text"
                  placeholder="e.g., how-to-write-essays"
                  value={currentPost?.slug || ''}
                  onChange={e => setCurrentPost(p => ({ ...p!, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') }))}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="featured-image" className="form-label">Featured Image</label>
                <input
                  id="featured-image"
                  type="file"
                  onChange={(e) => setFeaturedImageFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-700 dark:text-gray-300
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                             file:bg-primary-500 file:text-white
                             hover:file:bg-primary-600 file:transition-colors file:duration-200
                             cursor-pointer"
                />
                {(currentPost?.featuredImage && !featuredImageFile) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                    <img src={currentPost.featuredImage} alt="current featured" className="w-48 h-auto object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"/>
                  </div>
                )}
                {featuredImageFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Image Preview:</p>
                    <img src={URL.createObjectURL(featuredImageFile)} alt="new featured" className="w-48 h-auto object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"/>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={currentPost?.published || false}
                  onChange={e => setCurrentPost(p => ({ ...p!, published: e.target.checked }))}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="published" className="ml-2 text-gray-700 dark:text-gray-300">Publish Post</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : <Save size={20} className="mr-2" />}
                {isSubmitting ? "Saving..." : "Save Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Management Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
            {/* Category Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage <span className="text-primary-500">Categories</span></h3>
              <button
                type="button"
                onClick={() => { setIsCategoryModalOpen(false); setNewCategoryName(''); setEditingCategory(null); }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Close"
              >
                <XCircle size={24} />
              </button>
            </div>

            {/* Category Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Add/Edit Category Form */}
              <div>
                <label htmlFor="category-name" className="form-label">{editingCategory ? "Rename Category" : "Add New Category"}</label>
                <div className="flex gap-2">
                  <input
                    id="category-name"
                    type="text"
                    placeholder={editingCategory ? "Enter new category name" : "Enter new category name"}
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    className="form-input flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission
                        editingCategory ? handleUpdateCategory() : handleAddCategory();
                      }
                    }}
                  />
                  <button
                    onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                    disabled={isSubmitting || !newCategoryName.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" /> : editingCategory ? <FolderEdit size={20} /> : <Plus size={20} />}
                    <span className="ml-2">{editingCategory ? "Rename" : "Add"}</span>
                  </button>
                  {editingCategory && (
                    <button
                      onClick={() => { setEditingCategory(null); setNewCategoryName(''); }}
                      className="btn-secondary flex items-center"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Existing Categories List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">Existing Categories</h4>
                {blogCategories.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No categories added yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {blogCategories.map(cat => (
                      <li key={cat.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-100 dark:border-gray-600">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{cat.name}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => { setEditingCategory(cat); setNewCategoryName(cat.name); }}
                            className="text-blue-500 hover:text-blue-700 icon-hover"
                            title="Edit Category"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="text-red-500 hover:text-red-700 icon-hover"
                            title="Delete Category"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Category Modal Footer */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                onClick={() => { setIsCategoryModalOpen(false); setNewCategoryName(''); setEditingCategory(null); }}
                className="btn-secondary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
