import { useState } from 'react'; // <-- FIXED: Removed 'React' from import
import { useForm } from 'react-hook-form';
import { 
  X, 
  Star, 
  User, 
  AlertCircle, 
  CheckCircle,
  Loader
} from 'lucide-react';
import { ReviewSubmission } from '../../types';
import { useReviews } from '../../hooks/useReviews';
import toast from 'react-hot-toast';

interface ReviewSubmissionFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewSubmissionForm({ onClose, onSuccess }: ReviewSubmissionFormProps) {
  // Removed verifyOrderId as it's no longer needed for user input
  const { submitReview } = useReviews(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  // Removed orderVerified state as Order ID input is removed

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ReviewSubmission>();

  const watchedContent = watch('content', '');
  // Removed watchedOrderId as Order ID input is removed

  // Removed useEffect for verifying order ID

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const onSubmit = async (data: ReviewSubmission) => {
    if (selectedRating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData: ReviewSubmission = {
        ...data,
        rating: selectedRating,
        isAnonymous,
        // orderId is now optional, so it's not explicitly added here unless it comes from elsewhere
        // If you later want to link reviews to orders without user input,
        // this is where you'd add logic to get the orderId (e.g., from a user's completed orders list)
      };

      const success = await submitReview(submissionData);
      
      if (success) {
        onSuccess();
      } else {
        toast.error('Failed to submit review. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while submitting your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Share Your Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Help other students by sharing your honest review
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Anonymous Toggle */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-3"
              />
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Submit as Anonymous
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your review will be displayed as "Anonymous User"
                </p>
              </div>
            </label>
          </div>

          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${
                      rating <= (hoverRating || selectedRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                {selectedRating > 0 && (
                  <>
                    {selectedRating} star{selectedRating !== 1 ? 's' : ''} - 
                    {selectedRating === 5 && ' Excellent'}
                    {selectedRating === 4 && ' Very Good'}
                    {selectedRating === 3 && ' Good'}
                    {selectedRating === 2 && ' Fair'}
                    {selectedRating === 1 && ' Poor'}
                  </>
                )}
              </span>
            </div>
            {selectedRating === 0 && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                Please select a rating
              </p>
            )}
          </div>

          {/* Name Field - Hidden if Anonymous */}
          {!isAnonymous && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  {...register('name', { 
                    required: !isAnonymous ? 'Name is required' : false,
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          {/* Removed Order ID section completely */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Order ID *
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                {...register('orderId', { required: 'Order ID is required' })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="e.g., #70286"
              />
              {orderVerified !== null && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {orderVerified ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <AlertCircle className="text-red-500" size={20} />
                  )}
                </div>
              )}
            </div>
            {errors.orderId && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.orderId.message}
              </p>
            )}
            {orderVerified === true && (
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <CheckCircle size={14} className="mr-1" />
                Order verified - will be marked as "Verified Purchase"
              </p>
            )}
            {orderVerified === false && watchedOrderId && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                Order ID not found in our records
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Your order ID is required to verify your purchase
            </p>
          </div>
          */}

          {/* Review Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Review *
            </label>
            <textarea
              {...register('content', { 
                required: 'Review content is required',
                minLength: { value: 20, message: 'Review must be at least 20 characters' },
                maxLength: { value: 1000, message: 'Review must be less than 1000 characters' }
              })}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Share your detailed experience with our service. What did you like? How did we help you achieve your academic goals?"
              maxLength={1000}
            />
            <div className="flex justify-between mt-1">
              {errors.content && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.content.message}
                </p>
              )}
              <span className="text-gray-400 text-sm ml-auto">
                {watchedContent?.length || 0}/1000
              </span>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Review Guidelines
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Be honest and provide constructive feedback</li>
              <li>• Focus on your experience with our service</li>
              <li>• Avoid personal information or inappropriate content</li>
              <li>• Reviews are moderated and may take 24-48 hours to appear</li>
              {/* Removed Order ID guideline */}
              {/* <li>• Your Order ID helps verify your purchase</li> */}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
