// src/pages/Reviews.tsx - ULTIMATE FIX

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ThumbsUp, Filter, Search, ChevronDown, Calendar, MessageSquare, Plus, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useReviews as useDatabaseReviews } from '../hooks/useData';
import { Review, ReviewStats } from '../types';
import ReviewSubmissionForm from '../components/Reviews/ReviewSubmissionForm';
import { format, isValid } from 'date-fns';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/Common/LoadingSpinner';

type SortOption = 'newest' | 'oldest' | 'highest-rated' | 'lowest-rated' | 'most-helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'verified' | 'platform';

const REVIEWS_PER_PAGE = 20;

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMM dd, yyyy') : 'N/A';
};

export default function Reviews() {
  const { reviews: allReviews, isLoading } = useDatabaseReviews();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const approvedReviews = useMemo(() => allReviews.filter(r => r.isApproved), [allReviews]);

  const stats = useMemo<ReviewStats>(() => {
    const total = approvedReviews.length;
    const average = total > 0 ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    approvedReviews.forEach(r => { distribution[r.rating as keyof typeof distribution]++; });
    return {
      totalReviews: total,
      averageRating: average,
      ratingDistribution: distribution,
      pendingReviews: 0,
      flaggedReviews: 0,
      verifiedPurchases: approvedReviews.filter(r => r.isVerifiedPurchase).length,
      platformReviews: { google: 0, trustpilot: 0, sitejabber: 0, website: 0 }
    };
  }, [approvedReviews]);

  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...approvedReviews];
    if (searchTerm) {
      filtered = filtered.filter(review => {
        const name = review.userName || '';
        const comment = review.comment || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || comment.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    if (filterBy !== 'all') {
      if (filterBy === 'verified') filtered = filtered.filter(r => r.isVerifiedPurchase);
      else if (filterBy === 'platform') filtered = filtered.filter(r => r.platform && r.platform !== 'website');
      else filtered = filtered.filter(r => r.rating === parseInt(filterBy));
    }
    filtered.sort((a, b) => {
      function getDateField(r: Review) {
        if (r.publishDate && typeof (r.publishDate as any).toDate === 'function') return (r.publishDate as any).toDate();
        if (r.publishDate instanceof Date) return r.publishDate;
        if (r.createdAt && typeof (r.createdAt as any).toDate === 'function') return (r.createdAt as any).toDate();
        if (r.createdAt instanceof Date) return r.createdAt;
        return new Date();
      }
      const aDate = getDateField(a);
      const bDate = getDateField(b);
      switch (sortBy) {
        case 'newest': return bDate.getTime() - aDate.getTime();
        case 'oldest': return aDate.getTime() - bDate.getTime();
        case 'highest-rated': return b.rating - a.rating;
        case 'lowest-rated': return a.rating - b.rating;
        case 'most-helpful': return (b.helpfulCount ?? 0) - (a.helpfulCount ?? 0);
        default: return 0;
      }
    });
    setFilteredReviews(filtered);
    setCurrentPage(1);
  }, [approvedReviews, sortBy, filterBy, searchTerm]);

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const displayedReviews = filteredReviews.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          size={14} 
          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
    </div>
  );

  const platformLogoConfig: Record<string, { name: string; logo: string; alt: string; bg: string; textColor: string }> = {
    google: {
      name: 'Google',
      logo: 'https://cdn.worldvectorlogo.com/logos/google-g-2015.svg',
      alt: 'Google',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300'
    },
    trustpilot: {
      name: 'Trustpilot',
      logo: 'https://cdn.worldvectorlogo.com/logos/trustpilot-1.svg',
      alt: 'Trustpilot',
      bg: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300'
    },
    sitejabber: {
      name: 'Sitejabber',
      logo: '/images/Sitejabber_logo.png',
      alt: 'Sitejabber',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300'
    },
  };

  const getPlatformBadge = (review: Review) => {
    if (!review.platform || review.platform === 'website') return null;
    const platformConfig = platformLogoConfig[review.platform];
    if (!platformConfig) return null;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${platformConfig.bg} ${platformConfig.textColor}`}>
        <img 
          src={platformConfig.logo} 
          alt={platformConfig.alt} 
          className="w-3 h-3 object-contain flex-shrink-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <span className="truncate">{platformConfig.name}</span>
      </span>
    );
  };

  const handleMarkAsHelpful = (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking helpful button
    toast.success('Thank you for your feedback!');
    console.log(`Marked review ${reviewId} as helpful.`);
  };

  const openReviewModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    document.body.style.overflow = ''; // Restore scroll
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeReviewModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-royal-blue via-primary to-deep-navy py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]" aria-hidden />
        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-tight">
              Student Reviews & Testimonials
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Read authentic reviews from students who have experienced our academic writing services.
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 md:mt-10 md:grid-cols-4 md:gap-6">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <div className="text-2xl font-bold text-white md:text-3xl">{stats.totalReviews}</div>
                <div className="mt-1 text-xs text-white/85 md:text-sm">Total Reviews</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-2xl font-bold text-white md:text-3xl">{stats.averageRating.toFixed(1)}</span>
                  <Star className="fill-current text-yellow-400" size={20} />
                </div>
                <div className="mt-1 text-xs text-white/85 md:text-sm">Average Rating</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <div className="text-2xl font-bold text-white md:text-3xl">{stats.verifiedPurchases}</div>
                <div className="mt-1 text-xs text-white/85 md:text-sm">Verified Purchases</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <div className="text-2xl font-bold text-white md:text-3xl">98%</div>
                <div className="mt-1 text-xs text-white/85 md:text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
              Rating Distribution
            </h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] || 0;
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 w-16 md:w-20">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="text-yellow-400 fill-current" size={14} />
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 md:h-3">
                      <div 
                        className="bg-yellow-400 h-2.5 md:h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 w-12 md:w-16 text-right">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 md:py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search reviews..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white md:py-3 md:text-base dark:border-gray-600"
                />
              </div>
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Filter Button */}
              <div className="relative flex-1 sm:flex-initial">
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm md:text-base"
                >
                  <Filter size={18} />
                  <span>Filter</span>
                  <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                {showFilters && (
                  <>
                    <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20">
                      <div className="p-2">
                        <button 
                          onClick={() => { setFilterBy('all'); setShowFilters(false); }} 
                          className={`w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === 'all' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-light-blue' : ''}`}
                        >
                          All Reviews
                        </button>
                        <button 
                          onClick={() => { setFilterBy('verified'); setShowFilters(false); }} 
                          className={`w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === 'verified' ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-light-blue' : ''}`}
                        >
                          Verified Only
                        </button>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <button 
                            key={r} 
                            onClick={() => { setFilterBy(r.toString() as FilterOption); setShowFilters(false); }} 
                            className={`w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${filterBy === r.toString() ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-light-blue' : ''}`}
                          >
                            {r} Stars
                          </button>
                        ))}
                      </div>
                    </div>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowFilters(false)} 
                    />
                  </>
                )}
              </div>

              {/* Sort Dropdown */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortOption)} 
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white sm:flex-initial md:text-base dark:border-gray-600"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-rated">Lowest Rated</option>
                <option value="most-helpful">Most Helpful</option>
              </select>

              {/* Write Review Button */}
              <button 
                onClick={() => setShowSubmissionForm(true)} 
                className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-deep-navy md:px-6 md:text-base"
              >
                <Plus size={18} />
                <span>Write Review</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid - EXACTLY 4 PER ROW */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Customer Reviews ({filteredReviews.length})
            </h2>
            {totalPages > 1 && (
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {displayedReviews.length > 0 ? (
            <>
              {/* GRID: 1 mobile, 2 tablet, 4 desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedReviews.map((review) => {
                  const name = review.userName || '';
                  const comment = review.comment || '';
                  const reviewDate = (() => {
                    if (review.publishDate && typeof (review.publishDate as any).toDate === 'function') return (review.publishDate as any).toDate();
                    if (review.publishDate instanceof Date) return review.publishDate;
                    if (review.createdAt && typeof (review.createdAt as any).toDate === 'function') return (review.createdAt as any).toDate();
                    if (review.createdAt instanceof Date) return review.createdAt;
                    return new Date();
                  })();
                  
                  return (
                    <div 
                      key={review.id} 
                      onClick={() => openReviewModal(review)}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 flex flex-col min-h-[280px] cursor-pointer group"
                    >
                      {/* Header - Avatar + Name + Platform */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary md:h-10 md:w-10">
                            <span className="text-sm font-bold text-primary-foreground">{name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">
                              {name}
                            </h3>
                            <div className="mt-0.5">{renderStars(review.rating)}</div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {getPlatformBadge(review)}
                        </div>
                      </div>

                      {/* Comment - Excerpt (truncated) */}
                      <div className="flex-grow mb-3 overflow-hidden">
                        <p className="line-clamp-5 text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-primary dark:text-gray-300 dark:group-hover:text-light-blue md:text-base">
                          {comment}
                        </p>
                        {comment.length > 150 && (
                          <span className="mt-2 inline-block text-xs font-medium text-primary">
                            Click to read full review →
                          </span>
                        )}
                      </div>

                      {/* Footer - Helpful + Date */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                        <button 
                          onClick={(e) => handleMarkAsHelpful(review.id, e)} 
                          className="z-10 flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-light-blue md:text-sm"
                        >
                          <ThumbsUp size={14} />
                          <span>({review.helpfulCount ?? 0})</span>
                        </button>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1"/>
                          <span>{formatDate(reviewDate.toISOString())}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 md:mt-12 flex items-center justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 md:gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          if (page === 1 || page === totalPages) return true;
                          if (Math.abs(page - currentPage) <= 1) return true;
                          return false;
                        })
                        .map((page, index, array) => {
                          const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                          
                          return (
                            <div key={page} className="flex items-center gap-1 md:gap-2">
                              {showEllipsisBefore && (
                                <span className="px-1 md:px-2 text-gray-500 text-sm">...</span>
                              )}
                              <button
                                onClick={() => goToPage(page)}
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg transition-colors text-sm md:text-base ${
                                  currentPage === page
                                    ? 'bg-primary font-semibold text-primary-foreground'
                                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                              >
                                {page}
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 md:py-16">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No reviews match your criteria
              </h3>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filters.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setFilterBy('all'); }} 
                className="text-sm font-medium text-primary transition-colors hover:text-deep-navy md:text-base"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-royal-blue via-primary to-deep-navy py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to Experience Excellence?
          </h2>
          <Link 
            to="/order-now" 
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-gray-100 md:px-8 md:py-4 md:text-lg"
          >
            Place Your Order Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Review Submission Modal */}
      {showSubmissionForm && (
        <ReviewSubmissionForm 
          onClose={() => setShowSubmissionForm(false)} 
          onSuccess={() => { 
            setShowSubmissionForm(false); 
            toast.success('Review submitted successfully!'); 
          }}
        />
      )}

      {/* Full Review Modal/Popup */}
      {isModalOpen && selectedReview && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/35 z-[9998] transition-opacity"
            onClick={closeReviewModal}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[540px] w-[calc(100%-40px)] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-[9999] max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={closeReviewModal}
              className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
              aria-label="Close review"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="p-5 md:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pr-8">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">
                      {(selectedReview.userName || '').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 
                      id="review-modal-title"
                      className="font-semibold text-lg text-gray-900 dark:text-white mb-1"
                    >
                      {selectedReview.userName || 'Anonymous'}
                    </h3>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedReview.rating)}
                      {getPlatformBadge(selectedReview)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Review Text */}
              <div className="mb-4">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedReview.comment}
                </p>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsHelpful(selectedReview.id, e);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-light-blue"
                >
                  <ThumbsUp size={16} />
                  <span>Helpful ({selectedReview.helpfulCount ?? 0})</span>
                </button>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} className="mr-1.5"/>
                  <span>
                    {(() => {
                      const reviewDate = (() => {
                        if (selectedReview.publishDate && typeof (selectedReview.publishDate as any).toDate === 'function') 
                          return (selectedReview.publishDate as any).toDate();
                        if (selectedReview.publishDate instanceof Date) 
                          return selectedReview.publishDate;
                        if (selectedReview.createdAt && typeof (selectedReview.createdAt as any).toDate === 'function') 
                          return (selectedReview.createdAt as any).toDate();
                        if (selectedReview.createdAt instanceof Date) 
                          return selectedReview.createdAt;
                        return new Date();
                      })();
                      return formatDate(reviewDate.toISOString());
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
