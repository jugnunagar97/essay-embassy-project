import { useState, useEffect } from 'react';
import { Review, ReviewSubmission, ReviewStats } from '../types';
import toast from 'react-hot-toast';

// Mock orders data for verification
const mockOrders = [
  { id: '#70286', clientName: 'John Doe', status: 'completed' },
  { id: '#70285', clientName: 'Sarah Johnson', status: 'completed' },
  { id: '#70284', clientName: 'Michael Chen', status: 'completed' },
  { id: '#70283', clientName: 'Emily Rodriguez', status: 'completed' },
  { id: '#70282', clientName: 'David Thompson', status: 'completed' },
];

// Mock data for reviews with streamlined structure
const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    content: 'Outstanding essay writing service! The writer assigned to my psychology essay was incredibly knowledgeable and delivered a well-researched, perfectly formatted paper. The quality exceeded my expectations and I received an A+ on my assignment. Highly recommend!',
    orderId: '#70285',
    location: 'New York, USA',
    purchaseDate: '2024-01-15',
    platform: 'website',
    platformVerified: false,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 24,
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    isAnonymous: false
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    content: 'Used Essay Embassy for my business management case study. The writer demonstrated excellent understanding of the subject matter and provided detailed analysis with proper citations. Delivered on time and communication was excellent throughout the process.',
    orderId: '#70284',
    location: 'California, USA',
    purchaseDate: '2024-01-12',
    platform: 'google',
    platformVerified: true,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 18,
    createdAt: '2024-01-18T14:15:00Z',
    updatedAt: '2024-01-18T14:15:00Z',
    isAnonymous: false
  },
  {
    id: '3',
    name: 'Anonymous User',
    rating: 4,
    content: 'Great research paper help! Needed assistance with a complex environmental science paper. The writer provided comprehensive research with credible sources and proper formatting. Minor revisions were needed but the support team was very responsive.',
    orderId: '#70283',
    location: 'Texas, USA',
    purchaseDate: '2024-01-10',
    platform: 'website',
    platformVerified: false,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 12,
    createdAt: '2024-01-15T09:45:00Z',
    updatedAt: '2024-01-15T09:45:00Z',
    isAnonymous: true
  },
  {
    id: '4',
    name: 'David Thompson',
    rating: 5,
    content: 'Excellent dissertation chapter work! Working on my PhD dissertation and needed help with the literature review chapter. The writer assigned was clearly an expert in my field and provided an exceptional piece of work. The depth of analysis and quality of writing was impressive.',
    orderId: '#70282',
    location: 'Florida, USA',
    purchaseDate: '2024-01-08',
    platform: 'trustpilot',
    platformVerified: true,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 31,
    createdAt: '2024-01-12T16:20:00Z',
    updatedAt: '2024-01-12T16:20:00Z',
    isAnonymous: false
  },
  {
    id: '5',
    name: 'Lisa Wang',
    rating: 4,
    content: 'Good assignment help for my nursing coursework. The writer understood the requirements well and provided a comprehensive care plan with proper citations. Delivery was on time and the quality was good. Would recommend for nursing students.',
    location: 'Washington, USA',
    purchaseDate: '2024-01-05',
    platform: 'sitejabber',
    platformVerified: true,
    isVerifiedPurchase: false,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 15,
    createdAt: '2024-01-10T11:30:00Z',
    updatedAt: '2024-01-10T11:30:00Z',
    isAnonymous: false
  },
  {
    id: '6',
    name: 'Anonymous User',
    rating: 5,
    content: 'Amazing customer service and quality work! Not only was the quality of my term paper excellent, but the customer service was outstanding. They kept me updated throughout the process and were available 24/7 to answer my questions.',
    orderId: '#70281',
    location: 'Illinois, USA',
    purchaseDate: '2024-01-03',
    platform: 'website',
    platformVerified: false,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 22,
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-08T13:45:00Z',
    isAnonymous: true
  },
  {
    id: '7',
    name: 'Robert Kim',
    rating: 5,
    content: 'Top-quality research work! Impressed with the depth of research and analysis provided for my computer science project. The writer clearly had expertise in the field and delivered work that exceeded my expectations. The code examples and technical explanations were spot-on.',
    orderId: '#70280',
    location: 'Oregon, USA',
    purchaseDate: '2024-01-01',
    platform: 'google',
    platformVerified: true,
    isVerifiedPurchase: true,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 19,
    createdAt: '2024-01-03T12:10:00Z',
    updatedAt: '2024-01-03T12:10:00Z',
    isAnonymous: false
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    rating: 4,
    content: 'Reliable and professional service. Used Essay Embassy for multiple assignments throughout my semester. Consistently delivered quality work on time. The writers are knowledgeable and the support team is very helpful. Pricing is reasonable for the quality provided.',
    location: 'Nevada, USA',
    purchaseDate: '2023-12-28',
    platform: 'trustpilot',
    platformVerified: true,
    isVerifiedPurchase: false,
    isApproved: true,
    isPending: false,
    isFlagged: false,
    helpfulCount: 16,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    isAnonymous: false
  },
  {
    id: '9',
    name: 'Mark Anderson',
    rating: 3,
    content: 'Mixed experience with the service. The paper was delivered on time but didn\'t fully meet my expectations initially. Had to request revisions to get it to an acceptable standard. Customer service was responsive and helpful throughout the revision process.',
    location: 'Arizona, USA',
    purchaseDate: '2023-12-25',
    platform: 'website',
    platformVerified: false,
    isVerifiedPurchase: false,
    isApproved: false,
    isPending: true,
    isFlagged: false,
    helpfulCount: 3,
    createdAt: '2023-12-28T14:30:00Z',
    updatedAt: '2023-12-28T14:30:00Z',
    moderatorNotes: 'Pending review - customer complaint about initial quality',
    isAnonymous: false
  }
];

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<ReviewStats>({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    pendingReviews: 0,
    flaggedReviews: 0,
    verifiedPurchases: 0,
    platformReviews: { google: 0, trustpilot: 0, sitejabber: 0, website: 0 }
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      calculateStats(mockReviews);
      setIsLoading(false);
    }, 1000);
  }, []);

  const calculateStats = (reviewList: Review[]) => {
    const approvedReviews = reviewList.filter(r => r.isApproved);
    const totalReviews = approvedReviews.length;
    const averageRating = totalReviews > 0 
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
      : 0;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    approvedReviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
    });

    const platformReviews = { google: 0, trustpilot: 0, sitejabber: 0, website: 0 };
    approvedReviews.forEach(review => {
      if (review.platform) {
        platformReviews[review.platform]++;
      }
    });

    setStats({
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      pendingReviews: reviewList.filter(r => r.isPending).length,
      flaggedReviews: reviewList.filter(r => r.isFlagged).length,
      verifiedPurchases: reviewList.filter(r => r.isVerifiedPurchase).length,
      platformReviews
    });
  };

  const getApprovedReviews = () => {
    return reviews.filter(review => review.isApproved && !review.isPending)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getPendingReviews = () => {
    return reviews.filter(review => review.isPending);
  };

  const getFlaggedReviews = () => {
    return reviews.filter(review => review.isFlagged);
  };

  const verifyOrderId = (orderId: string): boolean => {
    return mockOrders.some(order => order.id === orderId && order.status === 'completed');
  };

  const submitReview = async (reviewData: ReviewSubmission): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if Order ID is valid for verification
      const isVerifiedPurchase = reviewData.orderId ? verifyOrderId(reviewData.orderId) : false;

      const newReview: Review = {
        id: Date.now().toString(),
        name: reviewData.isAnonymous ? 'Anonymous User' : reviewData.name,
        rating: reviewData.rating,
        content: reviewData.content,
        orderId: reviewData.orderId,
        location: reviewData.location,
        purchaseDate: reviewData.purchaseDate,
        platform: 'website',
        platformVerified: false,
        isVerifiedPurchase,
        isApproved: false,
        isPending: true,
        isFlagged: false,
        helpfulCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isAnonymous: reviewData.isAnonymous || false
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      calculateStats(updatedReviews);

      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      return false;
    }
  };

  const approveReview = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { ...review, isApproved: true, isPending: false, updatedAt: new Date().toISOString() }
        : review
    );
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success('Review approved successfully');
  };

  const rejectReview = (reviewId: string, reason?: string) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success('Review rejected and removed');
  };

  const flagReview = (reviewId: string, reason?: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { 
            ...review, 
            isFlagged: true, 
            moderatorNotes: reason,
            updatedAt: new Date().toISOString() 
          }
        : review
    );
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success('Review flagged for further review');
  };

  const updateReview = (reviewId: string, updates: Partial<Review>) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { ...review, ...updates, updatedAt: new Date().toISOString() }
        : review
    );
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success('Review updated successfully');
  };

  const addReview = (reviewData: Partial<Review>) => {
    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewData.name || 'Anonymous User',
      rating: reviewData.rating || 5,
      content: reviewData.content || '',
      orderId: reviewData.orderId,
      location: reviewData.location,
      purchaseDate: reviewData.purchaseDate,
      platform: reviewData.platform || 'website',
      platformVerified: reviewData.platformVerified || false,
      isVerifiedPurchase: reviewData.orderId ? verifyOrderId(reviewData.orderId) : false,
      isApproved: true,
      isPending: false,
      isFlagged: false,
      helpfulCount: 0,
      createdAt: reviewData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isAnonymous: reviewData.isAnonymous || false,
      moderatorNotes: reviewData.moderatorNotes
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success('Review added successfully');
  };

  const markAsHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpfulCount: review.helpfulCount + 1 }
        : review
    );
    setReviews(updatedReviews);
    toast.success('Thank you for your feedback!');
  };

  const bulkApprove = (reviewIds: string[]) => {
    const updatedReviews = reviews.map(review =>
      reviewIds.includes(review.id)
        ? { ...review, isApproved: true, isPending: false, updatedAt: new Date().toISOString() }
        : review
    );
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success(`${reviewIds.length} reviews approved successfully`);
  };

  const bulkReject = (reviewIds: string[]) => {
    const updatedReviews = reviews.filter(review => !reviewIds.includes(review.id));
    setReviews(updatedReviews);
    calculateStats(updatedReviews);
    toast.success(`${reviewIds.length} reviews rejected and removed`);
  };

  return {
    reviews,
    isLoading,
    stats,
    getApprovedReviews,
    getPendingReviews,
    getFlaggedReviews,
    submitReview,
    approveReview,
    rejectReview,
    flagReview,
    updateReview,
    addReview,
    markAsHelpful,
    bulkApprove,
    bulkReject,
    verifyOrderId
  };
}