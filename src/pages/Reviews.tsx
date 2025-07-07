import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ThumbsUp, 
  Filter, 
  Search, 
  ChevronDown, 
  Calendar,
  User,
  Shield,
  MessageSquare,
  Plus,
  ArrowRight,
  MapPin,
  Hash,
  CheckCircle,
  Award
} from 'lucide-react';
import { useReviews } from '../hooks/useReviews';
import { Review } from '../types';
import ReviewSubmissionForm from '../components/Reviews/ReviewSubmissionForm';
import { format, isValid } from 'date-fns';
import toast from 'react-hot-toast';

type SortOption = 'newest' | 'oldest' | 'highest-rated' | 'lowest-rated' | 'most-helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'verified' | 'platform';

// Helper function to safely format dates
const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (!isValid(date)) return 'N/A';
  
  return format(date, 'MMM dd, yyyy');
};

export default function Reviews() {
  const { reviews, isLoading, stats, getApprovedReviews, markAsHelpful } = useReviews();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = getApprovedReviews();

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.orderId && review.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (review.location && review.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply rating filter
    if (filterBy !== 'all') {
      if (filterBy === 'verified') {
        filtered = filtered.filter(review => review.isVerifiedPurchase);
      } else if (filterBy === 'platform') {
        filtered = filtered.filter(review => review.platform && review.platform !== 'website');
      } else {
        const rating = parseInt(filterBy);
        filtered = filtered.filter(review => review.rating === rating);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest-rated':
          return b.rating - a.rating;
        case 'lowest-rated':
          return a.rating - b.rating;
        case 'most-helpful':
          return b.helpfulCount - a.helpfulCount;
        default:
          return 0;
      }
    });

    setDisplayedReviews(filtered);
  }, [reviews, sortBy, filterBy, searchTerm, getApprovedReviews]);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
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

  const handleMarkAsHelpful = (reviewId: string) => {
    markAsHelpful(reviewId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16">
        <div className="container">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Student Reviews & Testimonials
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Read authentic reviews from students who have experienced our academic writing services. 
              See why thousands trust Essay Embassy for their academic success.
            </p>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">{stats.totalReviews}</div>
                <div className="text-primary-100 text-sm">Total Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-3xl font-bold mr-2">{stats.averageRating}</span>
                  <Star className="text-yellow-400 fill-current" size={24} />
                </div>
                <div className="text-primary-100 text-sm">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">{stats.verifiedPurchases}</div>
                <div className="text-primary-100 text-sm">Verified Purchases</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-primary-100 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Rating Distribution
            </h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-20">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                      <Star className="text-yellow-400 fill-current" size={16} />
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                      {count} ({Math.round(percentage)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Filter size={20} />
                  <span>Filter</span>
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setFilterBy('all'); setShowFilters(false); }}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === 'all' ? 'bg-primary-50 text-primary-600' : ''}`}
                      >
                        All Reviews
                      </button>
                      <button
                        onClick={() => { setFilterBy('verified'); setShowFilters(false); }}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === 'verified' ? 'bg-primary-50 text-primary-600' : ''}`}
                      >
                        Verified Purchases
                      </button>
                      <button
                        onClick={() => { setFilterBy('platform'); setShowFilters(false); }}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === 'platform' ? 'bg-primary-50 text-primary-600' : ''}`}
                      >
                        Platform Reviews
                      </button>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => { setFilterBy(rating.toString() as FilterOption); setShowFilters(false); }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${filterBy === rating.toString() ? 'bg-primary-50 text-primary-600' : ''}`}
                        >
                          <span>{rating}</span>
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span>Stars</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-rated">Lowest Rated</option>
                <option value="most-helpful">Most Helpful</option>
              </select>

              {/* Submit Review Button */}
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Write Review</span>
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filterBy !== 'all' || searchTerm) && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {filterBy !== 'all' && (
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                  {filterBy === 'verified' ? 'Verified Purchases' : 
                   filterBy === 'platform' ? 'Platform Reviews' : 
                   `${filterBy} Stars`}
                </span>
              )}
              {searchTerm && (
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                  Search: "{searchTerm}"
                </span>
              )}
              <button
                onClick={() => {
                  setFilterBy('all');
                  setSearchTerm('');
                }}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Customer Reviews ({displayedReviews.length})
            </h2>
          </div>

          {displayedReviews.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {displayedReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 p-6">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
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
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {review.name}
                          </h3>
                          {review.isVerifiedPurchase && (
                            <div className="flex items-center space-x-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                              <CheckCircle size={12} />
                              <span>Verified Purchase</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating, 'sm')}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getPlatformBadge(review)}
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {review.content}
                  </p>

                  {/* Review Details */}
                  <div className="space-y-2 mb-4">
                    {review.orderId && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Hash size={14} className="mr-2 text-primary-500" />
                        <span>Verified Purchase {review.orderId}</span>
                      </div>
                    )}
                    {review.location && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="mr-2 text-primary-500" />
                        <span>{review.location}</span>
                      </div>
                    )}
                    {review.purchaseDate && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={14} className="mr-2 text-primary-500" />
                        <span>Purchased on {formatDate(review.purchaseDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Review Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleMarkAsHelpful(review.id)}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <ThumbsUp size={16} />
                      <span className="text-sm">Helpful ({review.helpfulCount})</span>
                    </button>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MessageSquare size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No reviews found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filterBy !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Be the first to share your experience with our services.'
                }
              </p>
              {searchTerm || filterBy !== 'all' ? (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBy('all');
                  }}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmissionForm(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Write the First Review
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied students who have achieved academic success with our professional writing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order-now"
                className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Place Your Order Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-500 transition-colors"
              >
                Share Your Experience
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission Form Modal */}
      {showSubmissionForm && (
        <ReviewSubmissionForm
          onClose={() => setShowSubmissionForm(false)}
          onSuccess={() => {
            setShowSubmissionForm(false);
            toast.success('Thank you! Your review has been submitted and is pending approval.');
          }}
        />
      )}

      {/* Click outside to close filters */}
      {showFilters && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}