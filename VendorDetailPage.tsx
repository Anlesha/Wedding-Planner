import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useWedding } from '../../contexts/WeddingContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  Phone,
  Mail,
  Globe,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  Scale,
  Sparkles,
  ArrowLeft,
  XCircle
} from 'lucide-react';

export const VendorDetailPage: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wedding, createEnquiry, wishlist, toggleWishlist, isWishlisted } = useWedding();

  const vendor = storageService.getVendorById(vendorId || '');
  const allReviews = storageService.getReviews().filter(r => r.vendorId === vendorId);

  const [activeImage, setActiveImage] = useState<string>(vendor?.coverImage || '');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Enquiry Form State
  const [customerName, setCustomerName] = useState(wedding.coupleNames || user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98220 99999');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'aarav.meera@marryon.app');
  const [proposedDate, setProposedDate] = useState(wedding.weddingDate || '2026-12-18');
  const [guestCount, setGuestCount] = useState(wedding.estimatedGuests || 350);
  const [selectedPackage, setSelectedPackage] = useState(vendor?.packages[0]?.name || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!vendor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-mauve-900">Vendor Not Found</h2>
        <p className="text-sm text-mauve-600">The requested wedding specialist could not be located.</p>
        <Link to="/vendors">
          <Button variant="primary" size="md">
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(vendor.id);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createEnquiry({
        weddingId: wedding.id,
        customerId: user?.id || 'cust-001',
        customerName,
        customerPhone,
        customerEmail,
        vendorId: vendor.id,
        vendorName: vendor.businessName,
        vendorCategory: vendor.category,
        proposedDate,
        guestCount: Number(guestCount),
        selectedPackage,
        message: message || `Hi ${vendor.businessName}, we would love to check availability for our wedding on ${formatDate(proposedDate)}.`,
      });

      setIsSubmitting(false);
      setEnquiryModalOpen(false);
    }, 600);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    storageService.addReview({
      vendorId: vendor.id,
      customerId: user?.id || 'cust-001',
      customerName: user?.name || wedding.coupleNames || 'Verified Couple',
      rating: reviewRating,
      comment: reviewComment,
      eventDate: wedding.weddingDate || '2026-10-01',
    });

    setReviewComment('');
    setReviewModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button */}
      <Link
        to="/vendors"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-mauve-600 hover:text-roseGold-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Vendor Directory
      </Link>

      {/* Main Vendor Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-3">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-mauve-100 shadow-premium border-2 border-white">
            <img
              src={activeImage || vendor.coverImage}
              alt={vendor.businessName}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {vendor.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {vendor.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    (activeImage || vendor.coverImage) === img
                      ? 'border-roseGold-500 shadow-sm scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Vendor Summary & CTA Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="roseGold">{vendor.category}</Badge>
              {vendor.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Partner
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900 leading-tight">
              {vendor.businessName}
            </h1>

            <p className="text-sm text-mauve-600 italic">"{vendor.tagline}"</p>

            <div className="flex items-center gap-4 text-xs font-medium text-mauve-700 pt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-sm">{vendor.rating}</span>
                <span className="text-mauve-400">({vendor.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1 text-mauve-600">
                <MapPin className="w-3.5 h-3.5 text-roseGold-500" /> {vendor.city}
              </span>
              <span>•</span>
              <span>{vendor.experienceYears}+ years experience</span>
            </div>
          </div>

          {/* Pricing & Booking Action Box */}
          <Card className="p-6 bg-gradient-to-br from-roseGold-50/50 via-white to-blush-50/40 border-roseGold-200 space-y-5">
            <div className="flex items-baseline justify-between border-b border-blush-100 pb-4">
              <div>
                <span className="text-[11px] text-mauve-500 uppercase font-semibold">Starting Price</span>
                <p className="font-serif text-3xl font-bold text-roseGold-700">
                  {formatINR(vendor.startingPrice)}
                </p>
              </div>
              <span className="text-xs text-mauve-500">Includes basic package</span>
            </div>

            <div className="space-y-2.5">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-md"
                onClick={() => setEnquiryModalOpen(true)}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send Booking Enquiry
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => toggleWishlist(vendor.id)}
                  leftIcon={<Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />}
                  className="bg-white"
                >
                  {wishlisted ? 'Saved' : 'Save'}
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate(`/app/compare?v1=${vendor.id}`)}
                  leftIcon={<Scale className="w-4 h-4" />}
                >
                  Compare
                </Button>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="pt-3 border-t border-blush-100/80 space-y-2 text-xs text-mauve-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-roseGold-600" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-roseGold-600" />
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-roseGold-600" />
                <span>{vendor.address}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* About & Services Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* About description */}
          <section className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft space-y-4">
            <h2 className="font-serif text-2xl font-bold text-mauve-900">About {vendor.businessName}</h2>
            <p className="text-sm text-mauve-700 leading-relaxed whitespace-pre-line">
              {vendor.description}
            </p>
          </section>

          {/* Service Packages */}
          <section className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Curated Packages</h2>
                <p className="text-xs text-mauve-500">Transparent pricing for rituals and ceremonies</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendor.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    pkg.isPopular
                      ? 'border-roseGold-400 bg-roseGold-50/30 shadow-md ring-1 ring-roseGold-200'
                      : 'border-blush-200 bg-white shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-mauve-900">{pkg.name}</h3>
                    {pkg.isPopular && (
                      <span className="text-[10px] font-bold uppercase bg-roseGold-500 text-white px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p className="font-serif text-2xl font-bold text-roseGold-700 mb-2">
                    {formatINR(pkg.price)}
                  </p>
                  <p className="text-xs text-mauve-600 mb-4">{pkg.description}</p>

                  <ul className="space-y-2 text-xs text-mauve-700 border-t border-blush-100 pt-3">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.isPopular ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      setEnquiryModalOpen(true);
                    }}
                  >
                    Select This Package
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Client Reviews */}
          <section className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Verified Client Reviews</h2>
                <p className="text-xs text-mauve-500">Based on {allReviews.length} confirmed bookings</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setReviewModalOpen(true)}>
                Write a Review
              </Button>
            </div>

            <div className="space-y-4">
              {allReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-blush-50/50 border border-blush-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-mauve-900">{rev.customerName}</h4>
                      <p className="text-[11px] text-mauve-400">Wedding: {formatDate(rev.eventDate)}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-mauve-700 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar: Availability Calendar & Policies */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-mauve-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-roseGold-600" /> Availability Check
            </h3>
            <p className="text-xs text-mauve-600">
              Dates marked open have confirmed crew availability for {vendor.city} and surrounding areas.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-800">
                <span className="font-semibold">18 Dec 2026 (Aarav & Meera)</span>
                <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">
                  Open for Booking
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800">
                <span className="font-semibold">25 Dec 2026</span>
                <span className="text-[10px] font-bold uppercase bg-rose-200 text-rose-800 px-2 py-0.5 rounded">
                  Booked
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enquiry Modal */}
      <Modal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title={`Send Enquiry to ${vendor.businessName}`}
        subtitle="Submit your requirements directly without broker commissions."
      >
        <form onSubmit={handleSubmitEnquiry} className="space-y-4">
          <Input
            label="Couple Names / Contact Person"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Proposed Wedding Date"
              type="date"
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
              required
            />
            <Input
              label="Estimated Guests"
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
            />
          </div>

          <Select
            label="Interested Package"
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            options={vendor.packages.map((p) => ({ value: p.name, label: `${p.name} (${formatINR(p.price)})` }))}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Specific Requirements or Questions
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., We have a Sangeet ceremony on the previous evening at Corinthians Resort..."
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400 focus:ring-2 focus:ring-roseGold-100"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setEnquiryModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Submit Enquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Review ${vendor.businessName}`}
        subtitle="Share your authentic feedback to help fellow couples."
      >
        <form onSubmit={handleAddReview} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700 mb-1.5">
              Rating (1 to 5 Stars)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= reviewRating ? 'text-amber-500 fill-amber-500' : 'text-mauve-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
              Your Review & Experience
            </label>
            <textarea
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="How was their punctuality, quality, and coordination on the wedding day?"
              required
              className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400 focus:ring-2 focus:ring-roseGold-100"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Post Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
