import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Flag, 
  Edit2, 
  Trash2,
  Star,
  Shield,
  Calendar,
  User,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Hash,
  MapPin
} from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { Review } from '../../types';
import { format, isValid } from 'date-fns';
import toast from 'react-hot-toast';

type ViewMode = 'all' | 'pending' | 'approved' | 'flagged';

interface ReviewFormData {
  name: string;
  rating: number;
  content: string;
  orderId?: string;
  location?: string;
  purchaseDate?: string;
  platform: 'google' | 'trustpilot' | 'sitejabber' | 'website';
  platformVerified: boolean;
  isAnonymous: boolean;
  createdAt: string;
  moderatorNotes?: string;
}

// Helper function to safely format dates
const formatDate = (dateString: string, formatString: string = 'MMM dd, yyyy HH:mm'): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (!isValid(date)) return 'N/A';
  
  return format(date, formatString);
};

export default function ReviewManager() {
  const { 
    reviews, 
    stats, 
    getPendingReviews, 
    getFlaggedReviews, 
    approveReview, 
    rejectReview, 
    flagReview, 
    updateReview,
    addReview,
    bulkApprove,
    bulkReject
  } = useReviews();

  const [viewMode, setViewMode] = useState<ViewMode>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ReviewFormData>();

  const watchedRating = watch('rating', 5);
  const watchedPlatform = watch('platform', 'website');

  const getFilteredReviews = () => {
    let filtered: Review[] = [];
    
    switch (viewMode) {
      case 'pending':
        filtered = getPendingReviews();
        break;
      case 'approved':
        filtered = reviews.filter(r => r.isApproved && !r.isPending);
        break;
      case 'flagged':
        filtered = getFlaggedReviews();
        break;
      default:
        filtered = reviews;
    }

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.orderId && review.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (review.location && review.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const filteredReviews = getFilteredReviews();

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map(r => r.id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedReviews.length === 0) {
      toast.error('Please select reviews to approve');
      return;
    }
    bulkApprove(selectedReviews);
    setSelectedReviews([]);
    setShowBulkActions(false);
  };

  const handleBulkReject = () => {
    if (selectedReviews.length === 0) {
      toast.error('Please select reviews to reject');
      return;
    }
    if (confirm(`Are you sure you want to reject ${selectedReviews.length} reviews? This action cannot be undone.`)) {
      bulkReject(selectedReviews);
      setSelectedReviews([]);
      setShowBulkActions(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review.id);
    setValue('name', review.name);
    setValue('rating', review.rating);
    setValue('content', review.content);
    setValue('orderId', review.orderId || '');
    setValue('location', review.location || '');
    setValue('purchaseDate', review.purchaseDate || '');
    setValue('platform', review.platform || 'website');
    setValue('platformVerified', review.platformVerified || false);
    setValue('isAnonymous', review.isAnonymous || false);
    setValue('createdAt', review.createdAt.split('T')[0]);
    setValue('moderatorNotes', review.moderatorNotes || '');
    setShowAddForm(false);
  };

  const handleAddReview = () => {
    setShowAddForm(true);
    setEditingReview(null);
    reset({
      name: '',
      rating: 5,
      content: '',
      orderId: '',
      location: '',
      purchaseDate: '',
      platform: 'website',
      platformVerified: false,
      isAnonymous: false,
      createdAt: new Date().toISOString().split('T')[0],
      moderatorNotes: ''
    });
  };

  const onSubmit = (data: ReviewFormData) => {
    const reviewData = {
      ...data,
      createdAt: new Date(data.createdAt).toISOString()
    };

    if (editingReview) {
      updateReview(editingReview, reviewData);
      setEditingReview(null);
    } else {
      addReview(reviewData);
      setShowAddForm(false);
    }
    reset();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingReview(null);
    reset();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (review: Review) => {
    if (review.isFlagged) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <Flag size={12} className="mr-1" />
          Flagged
        </span>
      );
    }
    if (review.isPending) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          <Clock size={12} className="mr-1" />
          Pending
        </span>
      );
    }
    if (review.isApproved) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle size={12} className="mr-1" />
          Approved
        </span>
      );
    }
    return null;
  };

  const getPlatformBadge = (review: Review) => {
    if (!review.platform || review.platform === 'website') return null;

    const platformConfig = {
      google: { name: 'Google', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
      trustpilot: { name: 'Trustpilot', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
      sitejabber: { name: 'Sitejabber', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' }
    };

    const config = platformConfig[review.platform];
    if (!config) return null;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {review.platformVerified && <Shield size={12} className="mr-1" />}
        {config.name}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Management</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddReview}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Review</span>
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download size={20} />
            <span>Export Reviews</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalReviews}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <MessageSquare className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingReviews}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <Star className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified Purchases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.verifiedPurchases}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Shield className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingReview) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingReview ? 'Edit Review' : 'Add New Review'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Reviewer name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    {...register('rating', { required: 'Rating is required' })}
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < watchedRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm font-medium ml-2">{watchedRating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Content *
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Review text..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  {...register('orderId')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., #70286"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  {...register('purchaseDate')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform *
                </label>
                <select
                  {...register('platform', { required: 'Platform is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="website">Website</option>
                  <option value="google">Google Reviews</option>
                  <option value="trustpilot">Trustpilot</option>
                  <option value="sitejabber">Sitejabber</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Review Date *
                </label>
                <input
                  type="date"
                  {...register('createdAt', { required: 'Date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('platformVerified')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Platform Verified</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('isAnonymous')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Anonymous</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Moderator Notes
              </label>
              <textarea
                {...register('moderatorNotes')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Internal notes..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{editingReview ? 'Update' : 'Add'} Review</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* View Mode Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { key: 'pending', label: 'Pending', count: stats.pendingReviews },
              { key: 'approved', label: 'Approved', count: stats.totalReviews },
              { key: 'flagged', label: 'Flagged', count: stats.flaggedReviews },
              { key: 'all', label: 'All', count: reviews.length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as ViewMode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === key
                    ? 'bg-white dark:bg-gray-800 text-primary-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Bulk Actions */}
            {selectedReviews.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <span>Bulk Actions ({selectedReviews.length})</span>
                  <ChevronDown size={16} className={`transition-transform ${showBulkActions ? 'rotate-180' : ''}`} />
                </button>

                {showBulkActions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-2">
                      <button
                        onClick={handleBulkApprove}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-green-600"
                      >
                        <Check size={16} />
                        <span>Approve Selected</span>
                      </button>
                      <button
                        onClick={handleBulkReject}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600"
                      >
                        <X size={16} />
                        <span>Reject Selected</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Reviews ({filteredReviews.length})
            </h3>
            {filteredReviews.length > 0 && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedReviews.length === filteredReviews.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Select All</span>
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={() => handleSelectReview(review.id)}
                    className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {review.isAnonymous ? (
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="text-gray-500 dark:text-gray-400" size={24} />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {review.name}
                        </h4>
                        {getStatusBadge(review)}
                        {getPlatformBadge(review)}
                        {review.isVerifiedPurchase && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{formatDate(review.createdAt)}</span>
                      {review.orderId && (
                        <span className="flex items-center">
                          <Hash size={14} className="mr-1" />
                          {review.orderId}
                        </span>
                      )}
                      {review.location && (
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {review.location}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {expandedReview === review.id 
                        ? review.content 
                        : review.content.length > 200 
                          ? `${review.content.substring(0, 200)}...`
                          : review.content
                      }
                      {review.content.length > 200 && (
                        <button
                          onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                          className="text-primary-500 hover:text-primary-600 ml-2"
                        >
                          {expandedReview === review.id ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </p>

                    {review.moderatorNotes && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-400">
                          <strong>Moderator Notes:</strong> {review.moderatorNotes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      {review.isPending && (
                        <>
                          <button
                            onClick={() => approveReview(review.id)}
                            className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                            title="Approve Review"
                          >
                            <Check size={16} />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => rejectReview(review.id)}
                            className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                            title="Reject Review"
                          >
                            <X size={16} />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEditReview(review)}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        title="Edit Review"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => flagReview(review.id, 'Flagged for review')}
                        className="text-orange-600 hover:text-orange-800 flex items-center space-x-1"
                        title="Flag Review"
                      >
                        <Flag size={16} />
                        <span>Flag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No reviews found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm 
                  ? 'Try adjusting your search criteria.'
                  : `No ${viewMode} reviews at the moment.`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close bulk actions */}
      {showBulkActions && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowBulkActions(false)}
        />
      )}
    </div>
  );
}