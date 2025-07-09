// src/components/Admin/ReviewManager.tsx

import { useState, useMemo, useCallback } from 'react';
import { useReviews, useReviewStats } from '../../hooks/useData';
import {
  Search, Star, ThumbsUp, Trash2, ArrowUp, ArrowDown, ShieldCheck
  // FIXED: Removed unused 'Clock' and 'Flag' icons to eliminate warnings.
} from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { format, isValid } from 'date-fns';
import { Review } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';

// Helper Components
const RatingStars = ({ rating, size = 5 }: { rating: number, size?: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size * 4} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
    ))}
  </div>
);

const StatusBadge = ({ review }: { review: Review }) => {
  if (review.isApproved) {
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Approved</span>;
  }
  if (review.isPending) {
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</span>;
  }
   if (review.isFlagged) {
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Flagged</span>;
  }
  return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">N/A</span>;
};

// Main Component
export default function ReviewManager() {
  const { reviews, isLoading: isLoadingReviews, error } = useReviews();
  const { stats } = useReviewStats(reviews);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Review>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = useCallback((column: keyof Review) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn]);

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        review.name.toLowerCase().includes(lowercasedTerm) ||
        (review.orderId && review.orderId.toLowerCase().includes(lowercasedTerm)) ||
        review.content.toLowerCase().includes(lowercasedTerm);

      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'approved' && review.isApproved) ||
        (filterStatus === 'pending' && review.isPending && !review.isApproved) ||
        (filterStatus === 'flagged' && review.isFlagged);

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (sortColumn === 'createdAt' || sortColumn === 'updatedAt') {
            const aTime = new Date(aVal as string).getTime();
            const bTime = new Date(bVal as string).getTime();
            if (!isNaN(aTime) && !isNaN(bTime)) {
                 return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
            }
        }
        
        if (typeof aVal === 'string' && typeof bVal === 'string') return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        if (typeof aVal === 'number' && typeof bVal === 'number') return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        if (typeof aVal === 'boolean' && typeof bVal === 'boolean') return sortDirection === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
        
        return 0;
    });
  }, [reviews, searchTerm, filterStatus, sortColumn, sortDirection]);

  const handleToggleApproval = async (review: Review) => {
    const toastId = toast.loading('Updating status...');
    const reviewRef = doc(db, 'reviews', review.id);
    try {
      await updateDoc(reviewRef, {
        isApproved: !review.isApproved,
        isPending: false,
        updatedAt: new Date().toISOString(),
      });
      toast.success(`Review ${!review.isApproved ? 'approved' : 'unapproved'} successfully.`, { id: toastId });
    } catch (e) {
      console.error("Error updating review status: ", e);
      toast.error('Failed to update review status.', { id: toastId });
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this review?")) return;

    const toastId = toast.loading('Deleting review...');
    const reviewRef = doc(db, 'reviews', reviewId);
    try {
      await deleteDoc(reviewRef);
      toast.success('Review deleted successfully.', { id: toastId });
    } catch (e) {
      console.error("Error deleting review: ", e);
      toast.error('Failed to delete review.', { id: toastId });
    }
  };

  const formatDateSafe = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
  }

  if (isLoadingReviews) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Manage <span className="text-primary-500">Reviews</span></h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Moderate and view customer feedback.</p>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Reviews</h3>
              <p className="text-3xl font-bold mt-1">{stats.totalReviews}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</h3>
              <div className="flex items-baseline space-x-2 mt-1">
                <p className="text-3xl font-bold">{stats.averageRating.toFixed(2)}</p>
                <RatingStars rating={stats.averageRating} size={4}/>
              </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approval</h3>
              <p className="text-3xl font-bold mt-1 text-yellow-500">{stats.pendingReviews}</p>
          </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Verified Purchases</h3>
              <p className="text-3xl font-bold mt-1 text-blue-500">{stats.verifiedPurchases}</p>
          </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Reviews</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
              <input type="text" id="search" className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" placeholder="Search by name, content, order ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Status</label>
            <select id="statusFilter" className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Customer {sortColumn === 'name' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('rating')}>
                    <div className="flex items-center">Rating {sortColumn === 'rating' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</div>
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('isApproved')}>
                     <div className="flex items-center">Status {sortColumn === 'isApproved' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center">Date {sortColumn === 'createdAt' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</div>
                </th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedReviews.length > 0 ? (
                filteredAndSortedReviews.map(review => (
                  <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">{review.name}</div>
                        {review.isVerifiedPurchase && <div className="text-xs text-blue-500 flex items-center"><ShieldCheck size={12} className="mr-1"/>Verified Purchase</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><RatingStars rating={review.rating} /></td>
                    <td className="px-6 py-4"><p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm truncate">{review.content}</p></td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge review={review} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDateSafe(review.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleToggleApproval(review)} className="text-green-500 hover:text-green-700" title={review.isApproved ? 'Unapprove' : 'Approve'}><ThumbsUp size={20} /></button>
                      <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={20} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-10 text-gray-500">No reviews found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}