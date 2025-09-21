// src/components/Admin/ReviewManager.tsx

import { useState, useMemo, useCallback } from 'react';
import { useReviews, useReviewStats } from '../../hooks/useData';
import { Search, Star, ThumbsUp, Trash2, ArrowUp, ArrowDown, ShieldCheck, PlusCircle, XCircle, Edit } from 'lucide-react';
import { doc, updateDoc, deleteDoc, addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { format } from 'date-fns'; // FIXED: Removed unused 'isValid' import
import { Review } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';
import Sidebar from '../layout/Sidebar';

// Helper Components
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />)}
  </div>
);

const StatusBadge = ({ review }: { review: Review }) => {
  if (review.isApproved) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Approved</span>;
  if (review.isPending) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</span>;
  return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Draft</span>;
};

// Main Component
export default function ReviewManager() {
  const { reviews, isLoading: isLoadingReviews, error } = useReviews();
  const { stats } = useReviewStats(reviews);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Review>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<Partial<Review> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSort = useCallback((column: keyof Review) => {
    if (sortColumn === column) setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortColumn(column); setSortDirection('desc'); }
  }, [sortColumn]);
  
  // Fix: Use correct Review field names and handle publishDate for display
  const openModal = (review: Partial<Review> | null = null) => {
    setCurrentReview(review ? {
      ...review,
      publishDate: review?.publishDate && typeof (review.publishDate as any).toDate === 'function'
        ? (review.publishDate as any).toDate()
        : review?.publishDate || undefined,
    } : {
      userName: '',
      rating: 5,
      comment: '',
      platform: 'website',
      isApproved: true,
      isPending: false,
      isVerifiedPurchase: true,
      helpfulCount: 0,
      publishDate: undefined,
    });
    setIsModalOpen(true);
  }

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = searchTerm === '' || review.userName.toLowerCase().includes(searchTerm.toLowerCase()) || review.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || (filterStatus === 'approved' && review.isApproved) || (filterStatus === 'pending' && review.isPending);
      return matchesSearch && matchesStatus;
    });
    return [...filtered].sort((a, b) => {
      const aVal = a[sortColumn]; const bVal = b[sortColumn];
      if (aVal && bVal && (aVal.constructor.name === 'Timestamp' && bVal.constructor.name === 'Timestamp')) {
          const aTime = (aVal as any).toDate().getTime();
          const bTime = (bVal as any).toDate().getTime();
          return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      if (typeof aVal === 'number' && typeof bVal === 'number') return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') return sortDirection === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      return 0;
    });
  }, [reviews, searchTerm, filterStatus, sortColumn, sortDirection]);

  const handleToggleApproval = async (review: Review) => {
    const toastId = toast.loading('Updating status...');
    try {
      await updateDoc(doc(db, 'reviews', review.id), { isApproved: !review.isApproved, isPending: false, updatedAt: new Date().toISOString() });
      toast.success(`Review ${!review.isApproved ? 'approved' : 'unapproved'}.`, { id: toastId });
    } catch (e) { toast.error('Failed to update status.', { id: toastId }); }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    const toastId = toast.loading('Deleting review...');
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      toast.success('Review deleted.', { id: toastId });
    } catch (e) { toast.error('Failed to delete review.', { id: toastId }); }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReview?.userName || !currentReview?.comment) { toast.error("Name and Content are required."); return; }
    
    setIsSubmitting(true);
    const toastId = toast.loading("Saving review...");
    
    const { id, ...reviewData } = currentReview;

    // Convert publishDate to Firestore Timestamp if it's a JS Date
    if (reviewData.publishDate) {
      if (reviewData.publishDate instanceof Date) {
        reviewData.publishDate = Timestamp.fromDate(reviewData.publishDate);
      } else if (typeof reviewData.publishDate === 'string') {
        // If it's a string (from input type=date), convert to Date then Timestamp
        reviewData.publishDate = Timestamp.fromDate(new Date(reviewData.publishDate));
      }
    }

    try {
      if (id) {
        await updateDoc(doc(db, "reviews", id), { ...reviewData, updatedAt: serverTimestamp() });
        toast.success("Review updated successfully!", { id: toastId });
      } else {
        await addDoc(collection(db, "reviews"), { ...reviewData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        toast.success("Review added successfully!", { id: toastId });
      }
      setIsModalOpen(false);
    } catch(err) {
      toast.error("Failed to save review.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatDateSafe = (dateObj: any) => {
    if (dateObj && typeof dateObj.toDate === 'function') {
      return format(dateObj.toDate(), 'MMM dd, yyyy');
    }
    return 'N/A';
  }

  if (isLoadingReviews) return <div className="p-10"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="flex-1 container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Reviews</span></h1>
        <button onClick={() => openModal()} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusCircle size={20} className="mr-2" /> Add Review
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"><h3 className="text-sm font-medium text-gray-500">Total Reviews</h3><p className="text-3xl font-bold mt-1">{stats.totalReviews}</p></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"><h3 className="text-sm font-medium text-gray-500">Average Rating</h3><div className="flex items-baseline space-x-2 mt-1"><p className="text-3xl font-bold">{stats.averageRating.toFixed(2)}</p><RatingStars rating={stats.averageRating}/></div></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"><h3 className="text-sm font-medium text-gray-500">Pending Approval</h3><p className="text-3xl font-bold mt-1 text-yellow-500">{reviews.filter(r => r.isPending).length}</p></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"><h3 className="text-sm font-medium text-gray-500">Verified Purchases</h3><p className="text-3xl font-bold mt-1 text-blue-500">{stats.verifiedPurchases}</p></div>
      </div>
       
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Reviews</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
              <input type="text" id="search" className="w-full pl-10 pr-4 py-2 border rounded-lg" placeholder="Search by name or content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Status</label>
            <select id="statusFilter" className="w-full p-2 border rounded-lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('userName')}><div className="flex items-center">Customer {sortColumn === 'userName' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('rating')}><div className="flex items-center">Rating {sortColumn === 'rating' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('isApproved')}><div className="flex items-center">Status {sortColumn === 'isApproved' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase cursor-pointer" onClick={() => handleSort('publishDate')}><div className="flex items-center">Date {sortColumn === 'publishDate' && (sortDirection === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedReviews.map(review => (
                <tr key={review.id}>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium">{review.userName}</div>{review.isVerifiedPurchase && <div className="text-xs text-blue-500 flex items-center"><ShieldCheck size={12} className="mr-1"/>Verified</div>}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><RatingStars rating={review.rating} /></td>
                    <td className="px-6 py-4"><p className="text-sm max-w-sm truncate">{review.comment}</p></td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge review={review} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDateSafe(review.publishDate || review.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleToggleApproval(review)} className="text-green-500 hover:text-green-700" title={review.isApproved ? 'Unapprove' : 'Approve'}><ThumbsUp size={18} /></button>
                      <button onClick={() => openModal(review)} className="text-blue-500 hover:text-blue-700" title="Edit"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={18} /></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">{currentReview?.id ? "Edit Review" : "Add New Review"}</h3>
                    <button type="button" onClick={() => setIsModalOpen(false)}><XCircle className="text-gray-400"/></button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div><label className="block text-sm">Customer Name</label><input type="text" required value={currentReview?.userName || ''} onChange={e => setCurrentReview(p => ({...p!, userName: e.target.value}))} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700"/></div>
                    <div><label className="block text-sm">Rating</label><select value={currentReview?.rating || 5} onChange={e => setCurrentReview(p => ({...p!, rating: parseInt(e.target.value)}))} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700">{[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}</select></div>
                    <div><label className="block text-sm">Content</label><textarea required value={currentReview?.comment || ''} onChange={e => setCurrentReview(p => ({...p!, comment: e.target.value}))} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700" rows={4}/></div>
                    <div><label className="block text-sm">Platform</label>
                        <select value={currentReview?.platform || 'website'} onChange={e => setCurrentReview(p => ({...p!, platform: e.target.value as Review['platform']}))} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700">
                           <option value="website">Website</option><option value="google">Google</option><option value="trustpilot">Trustpilot</option><option value="sitejabber">Sitejabber</option>
                        </select>
                    </div>
                    <div><label className="block text-sm">Helpful Count</label><input type="number" min="0" value={currentReview?.helpfulCount ?? 0} onChange={e => setCurrentReview(p => ({...p!, helpfulCount: parseInt(e.target.value)}))} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700"/></div>
                    <div><label className="block text-sm">Publish Date</label><input type="date" value={currentReview?.publishDate ? (currentReview.publishDate instanceof Date ? currentReview.publishDate.toISOString().slice(0,10) : (typeof currentReview.publishDate === 'string' ? currentReview.publishDate : '')) : ''} onChange={e => setCurrentReview({...currentReview, publishDate: e.target.value ? new Date(e.target.value) : undefined})} className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700"/></div>
                     <div className="flex items-center space-x-4">
                         <label className="flex items-center"><input type="checkbox" checked={currentReview?.isApproved} onChange={e => setCurrentReview(p => ({...p!, isApproved: e.target.checked}))} /> <span className="ml-2">Approved</span></label>
                         <label className="flex items-center"><input type="checkbox" checked={currentReview?.isVerifiedPurchase} onChange={e => setCurrentReview(p => ({...p!, isVerifiedPurchase: e.target.checked}))} /> <span className="ml-2">Verified Purchase</span></label>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
                    <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center disabled:opacity-50">
                      {isSubmitting && <LoadingSpinner size="sm" className="mr-2"/>}
                      {isSubmitting ? "Saving..." : "Save Review"}
                    </button>
                </div>
            </form>
        </div>
    )}
      </main>
    </div>
  );
}