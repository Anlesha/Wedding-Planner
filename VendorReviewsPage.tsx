import React from 'react';
import { storageService } from '../../services/storageService';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Star, MessageCircle, Flag, CheckCircle2 } from 'lucide-react';

export const VendorReviewsPage: React.FC = () => {
  const { showToast } = useToast();
  const vendor = storageService.getVendorById('ven-001')!;
  const reviews = storageService.getReviews().filter((r) => r.vendorId === vendor.id);

  const handleReport = (id: string) => {
    const reason = prompt('Please specify why this review violates platform guidelines:');
    if (reason) {
      storageService.reportReview(id, reason);
      showToast('Review submitted to admin moderation queue.', 'info');
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <Badge variant="roseGold">Reputation & Feedback</Badge>
        <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
          Client Reviews & Ratings
        </h1>
        <p className="text-xs text-mauve-500 mt-0.5">
          Authentic feedback from couples who completed their wedding celebrations
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <Card key={rev.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blush-100">
              <div>
                <h4 className="font-serif text-base font-bold text-mauve-900">{rev.customerName}</h4>
                <p className="text-[11px] text-mauve-400">Wedding Date: {formatDate(rev.eventDate)}</p>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
            </div>

            <p className="text-xs text-mauve-700 leading-relaxed italic">
              "{rev.comment}"
            </p>

            <div className="flex justify-between items-center pt-2 text-[11px] text-mauve-400">
              <span>Reviewed on {formatDate(rev.createdAt)}</span>
              {rev.reported ? (
                <span className="text-amber-600 font-semibold">Under Moderation Review</span>
              ) : (
                <button
                  onClick={() => handleReport(rev.id)}
                  className="hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  <Flag className="w-3.5 h-3.5" /> Report Issue
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
