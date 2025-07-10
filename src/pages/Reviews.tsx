// src/pages/Reviews.tsx

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ThumbsUp, Filter, Search, ChevronDown, Calendar, User, Shield, MessageSquare, Plus, ArrowRight, MapPin, Hash } from 'lucide-react';
import { useReviews as useDatabaseReviews } from '../hooks/useData';
import { Review, ReviewStats } from '../types';
import ReviewSubmissionForm from '../components/Reviews/ReviewSubmissionForm';
import { format, isValid } from 'date-fns';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/Common/LoadingSpinner';

type SortOption = 'newest' | 'oldest' | 'highest-rated' | 'lowest-rated' | 'most-helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'verified' | 'platform';

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMM dd, yyyy') : 'N/A';
};

export default function Reviews() {
  const { reviews: allReviews, isLoading } = useDatabaseReviews();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
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

  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...approvedReviews];
    if (searchTerm) {
      filtered = filtered.filter(review => review.name.toLowerCase().includes(searchTerm.toLowerCase()) || review.content.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filterBy !== 'all') {
      if (filterBy === 'verified') filtered = filtered.filter(r => r.isVerifiedPurchase);
      else if (filterBy === 'platform') filtered = filtered.filter(r => r.platform && r.platform !== 'website');
      else filtered = filtered.filter(r => r.rating === parseInt(filterBy));
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest-rated': return b.rating - a.rating;
        case 'lowest-rated': return a.rating - b.rating;
        case 'most-helpful': return b.helpfulCount - a.helpfulCount;
        default: return 0;
      }
    });
    setDisplayedReviews(filtered);
  }, [approvedReviews, sortBy, filterBy, searchTerm]);
  
  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}/>)}
    </div>
  );
  
  const getPlatformBadge = (review: Review) => {
    if (!review.platform || review.platform === 'website') return null;
    const config = { google: { name: 'Google', color: 'bg-blue-100 text-blue-800' }, trustpilot: { name: 'Trustpilot', color: 'bg-green-100 text-green-800' }, sitejabber: { name: 'Sitejabber', color: 'bg-orange-100 text-orange-800' }};
    const platformConfig = config[review.platform];
    if (!platformConfig) return null;
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${platformConfig.color}`}><Shield size={12} className="mr-1" />{platformConfig.name}</span>;
  };

  const handleMarkAsHelpful = (reviewId: string) => {
    toast.success('Thank you for your feedback!');
    console.log(`Marked review ${reviewId} as helpful.`);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16">
         <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Reviews & Testimonials</h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">Read authentic reviews from students who have experienced our academic writing services.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-3xl font-bold">{stats.totalReviews}</div><div className="text-primary-100 text-sm">Total Reviews</div></div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="flex items-center justify-center"><span className="text-3xl font-bold mr-2">{stats.averageRating.toFixed(1)}</span><Star className="text-yellow-400 fill-current" size={24}/></div><div className="text-primary-100 text-sm">Average Rating</div></div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-3xl font-bold">{stats.verifiedPurchases}</div><div className="text-primary-100 text-sm">Verified Purchases</div></div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><div className="text-3xl font-bold">98%</div><div className="text-primary-100 text-sm">Satisfaction Rate</div></div>
            </div>
         </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Rating Distribution</h2>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] || 0;
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 w-20"><span className="text-sm font-medium">{rating}</span><Star className="text-yellow-400 fill-current" size={16} /></div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3"><div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${percentage}%` }} /></div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search reviews..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg"/></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-4 py-3 border rounded-lg"><Filter size={20} /><span>Filter</span><ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} /></button>
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-10">
                    <div className="p-2">
                      <button onClick={() => { setFilterBy('all'); setShowFilters(false); }} className={`w-full text-left px-3 py-2 rounded ${filterBy === 'all' ? 'bg-primary-50' : ''}`}>All Reviews</button>
                      <button onClick={() => { setFilterBy('verified'); setShowFilters(false); }} className={`w-full text-left px-3 py-2 rounded ${filterBy === 'verified' ? 'bg-primary-50' : ''}`}>Verified</button>
                      {[5, 4, 3, 2, 1].map((r) => <button key={r} onClick={() => { setFilterBy(r.toString() as FilterOption); setShowFilters(false); }} className={`w-full text-left px-3 py-2 rounded flex items-center ${filterBy === r.toString() ? 'bg-primary-50' : ''}`}>{r} Stars</button>)}
                    </div>
                  </div>
                )}
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="px-4 py-3 border rounded-lg"><option value="newest">Newest</option><option value="highest-rated">Highest Rated</option><option value="most-helpful">Most Helpful</option></select>
              <button onClick={() => setShowSubmissionForm(true)} className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center"><Plus size={20} className="mr-2"/>Write Review</button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews ({displayedReviews.length})</h2>
          {displayedReviews.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {displayedReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {review.isAnonymous ? (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"><User size={24} /></div>
                      ) : (
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"><span className="text-white font-bold text-lg">{review.name.charAt(0)}</span></div>
                      )}
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">{renderStars(review.rating)}</div>
                      </div>
                    </div>
                    {getPlatformBadge(review)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{review.content}</p>
                   <div className="space-y-2 mt-4 mb-4">
                    {/* FIXED: Replaced CheckCircle with the Hash icon to use the import */}
                    {review.orderId && (<div className="flex items-center text-sm text-gray-500"><Hash size={14} className="mr-2 text-primary-500"/>Verified Purchase {review.orderId}</div>)}
                    {review.location && (<div className="flex items-center text-sm text-gray-500"><MapPin size={14} className="mr-2"/>{review.location}</div>)}
                   </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button onClick={() => handleMarkAsHelpful(review.id)} className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"><ThumbsUp size={16} /><span>Helpful ({review.helpfulCount})</span></button>
                    <div className="flex items-center text-sm text-gray-500"><Calendar size={14} className="mr-2"/>{formatDate(review.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MessageSquare size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold">No reviews match your criteria</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
              <button onClick={() => { setSearchTerm(''); setFilterBy('all'); }} className="text-primary-500 font-medium">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Excellence?</h2>
          <Link to="/order-now" className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 inline-flex items-center justify-center">Place Your Order Now<ArrowRight size={20} className="ml-2" /></Link>
        </div>
      </section>
      
      {showSubmissionForm && <ReviewSubmissionForm onClose={() => setShowSubmissionForm(false)} onSuccess={() => { setShowSubmissionForm(false); toast.success('Review submitted!'); }}/>}
      {showFilters && <div className="fixed inset-0 z-0" onClick={() => setShowFilters(false)} />}
    </div>
  );
}