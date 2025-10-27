'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { toaster } from '@/utils/services/toast-service';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: any;
}

const RatingModal = ({ isOpen, onClose, consultation }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toaster.error({ text: 'Please select a rating' });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const customerId = typeof window !== 'undefined' ? localStorage.getItem('customer_id') : null;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_HTTPS}/customers/submit-review`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            customerIdLocal: customerId,
            consultationId: consultation?._id,
            customerId: consultation?.customerId,
            astrologerId: consultation?.astrologerId?._id,
            rating: rating,
            review: review,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toaster.success({ text: data.message || 'Review submitted successfully!' });
        onClose();
        setRating(0);
        setReview('');
      } else {
        toaster.info({ text: data.message || 'Failed to submit review' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toaster.error({ text: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold">Rate Your Consultation</h2>
          <p className="text-red-100 text-sm mt-1">
            with {consultation?.astrologerId?.astrologerName || 'Astrologer'}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How would you rate your experience?
            </label>
            <div className="flex gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform duration-200 hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={40}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                {rating === 1 && '⭐ Poor'}
                {rating === 2 && '⭐⭐ Fair'}
                {rating === 3 && '⭐⭐⭐ Good'}
                {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Write your review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with others..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl  focus:border-transparent resize-none text-sm"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {review.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Star size={20} />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
