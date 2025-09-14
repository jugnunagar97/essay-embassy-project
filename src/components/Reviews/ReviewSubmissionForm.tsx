// src/components/Reviews/ReviewSubmissionForm.tsx

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { XCircle, Send } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner'; // FIXED: Corrected the import path for LoadingSpinner
import { useAuth } from '../../context/AuthContext';

interface ReviewSubmissionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewSubmissionForm({ onClose, onSuccess }: ReviewSubmissionFormProps) {
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be registered and logged in to submit a review. Please log in or create an account.');
      return;
    }
    if (!comment || !userName) {
      toast.error('Please fill out your name and review content.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting your review...');

    const newReview = {
      userName,
      comment,
      rating,
      orderId: orderId || '',
      isAnonymous: false,
      isApproved: false,
      isPending: true,
      isFlagged: false,
      isVerifiedPurchase: false, // This must be verified by an admin
      platform: 'website',
      helpfulCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'reviews'), newReview);
      toast.success('Review submitted for approval!', { id: toastId });
      onSuccess();
    } catch (error) {
      toast.error('Failed to submit review. Please try again later.', { id: toastId });
      console.error("Error submitting review: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg transform transition-all">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share Your Experience</h3>
          <button type="button" onClick={onClose}><XCircle className="text-gray-400 hover:text-gray-600"/></button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input id="name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700" />
          </div>
          {/* Removed anonymous option */}
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium mb-1">Order ID (Optional)</label>
            <input id="orderId" type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700" placeholder="e.g., #12345 to get a 'Verified' badge"/>
          </div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">Your Rating</label>
          <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700">
            <option value="5">5 Stars - Excellent</option>
            <option value="4">4 Stars - Good</option>
            <option value="3">3 Stars - Average</option>
            <option value="2">2 Stars - Poor</option>
            <option value="1">1 Star - Bad</option>
          </select>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">Your Review</label>
            <textarea id="content" value={comment} onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700" rows={4} />
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50 flex items-center">
            {isSubmitting ? <LoadingSpinner size="sm" className="mr-2"/> : <Send size={16} className="mr-2"/>}
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}