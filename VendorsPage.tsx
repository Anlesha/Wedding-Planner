import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import { useWedding } from '../../contexts/WeddingContext';
import { VendorCategory, VendorProfile } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  Heart,
  MapPin,
  X,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export const VendorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, toggleWishlist, isWishlisted } = useWedding();

  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('recommended');

  const allVendors = storageService.getVendors();

  const categories = [
    'All',
    'Venue',
    'Photography',
    'Catering',
    'Decoration',
    'Makeup',
    'Clothing',
    'Music & DJ',
    'Wedding Planner',
  ];

  const cities = ['All', 'Pune', 'Mumbai', 'Goa', 'Jaipur', 'Udaipur'];

  const filteredVendors = useMemo(() => {
    return allVendors
      .filter((vendor) => {
        // Category filter
        if (selectedCategory !== 'All' && vendor.category !== selectedCategory) return false;
        // City filter
        if (selectedCity !== 'All' && !vendor.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
        // Verified filter
        if (verifiedOnly && !vendor.isVerified) return false;
        // Rating filter
        if (minRating > 0 && vendor.rating < minRating) return false;
        // Price filter
        if (vendor.startingPrice > maxPrice) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = vendor.businessName.toLowerCase().includes(q);
          const matchDesc = vendor.description.toLowerCase().includes(q);
          const matchCat = vendor.category.toLowerCase().includes(q);
          const matchCity = vendor.city.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchCity) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default: recommended (featured first, then rating)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }, [allVendors, selectedCategory, selectedCity, verifiedOnly, minRating, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedCity('All');
    setMaxPrice(1000000);
    setVerifiedOnly(false);
    setMinRating(0);
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedCity !== 'All' ||
    verifiedOnly ||
    minRating > 0 ||
    maxPrice < 1000000 ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <div>
          <Badge variant="roseGold">Marketplace</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900 mt-1">
            Discover Verified Wedding Vendors
          </h1>
          <p className="text-sm text-mauve-600 mt-1">
            Browse authentic wedding partners in Pune, Mumbai, and beyond with transparent packages.
          </p>
        </div>

        {/* Global Search and Sort */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <div className="flex-1">
            <Input
              placeholder="Search by vendor name, service, style, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="w-full md:w-56 shrink-0">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'recommended', label: 'Recommended' },
                { value: 'price_asc', label: 'Price: Low to High' },
                { value: 'price_desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="bg-white rounded-3xl p-5 border border-blush-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-blush-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-roseGold-600" />
              <h3 className="text-sm font-bold text-mauve-900 uppercase tracking-wider">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-mauve-700 uppercase tracking-wider block">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat === 'All') searchParams.delete('category');
                    else searchParams.set('category', cat);
                    setSearchParams(searchParams);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-roseGold-500 text-white shadow-xs font-semibold'
                      : 'bg-blush-50 text-mauve-700 hover:bg-blush-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-mauve-700 uppercase tracking-wider block">
              City / Region
            </label>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              options={cities.map((c) => ({ value: c, label: c }))}
            />
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-mauve-700 uppercase tracking-wider">Starting Budget</span>
              <span className="font-bold text-roseGold-700">{formatINR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="1000000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-roseGold-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-mauve-400">
              <span>₹20k</span>
              <span>₹10 Lakh+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-mauve-700 uppercase tracking-wider block">
              Customer Rating
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 4.0, 4.5, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`py-1.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                    minRating === rating
                      ? 'bg-roseGold-500 text-white border-roseGold-500 shadow-xs'
                      : 'border-blush-200 text-mauve-700 hover:bg-blush-50'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Toggle */}
          <div className="pt-2 border-t border-blush-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-mauve-900 block">Verified Only</span>
              <span className="text-[11px] text-mauve-500">Government ID & GST verified</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-mauve-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-roseGold-500"></div>
            </label>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-mauve-700">
              Showing <span className="text-roseGold-700 font-bold">{filteredVendors.length}</span> matching specialists
            </p>
          </div>

          {filteredVendors.length === 0 ? (
            <EmptyState
              icon={<Search className="w-8 h-8" />}
              title="No vendors found"
              description="No specialists match your selected category, city, and budget filters. Try adjusting your parameters."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const wishlisted = isWishlisted(vendor.id);

                return (
                  <Card key={vendor.id} hoverEffect className="p-0 overflow-hidden flex flex-col justify-between">
                    <div>
                      {/* Image header with category pill & Wishlist button */}
                      <div className="relative aspect-[4/3] bg-mauve-100 overflow-hidden">
                        <img
                          src={vendor.coverImage}
                          alt={vendor.businessName}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="bg-white/95 backdrop-blur-xs text-mauve-900 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                            {vendor.category}
                          </span>
                          {vendor.isVerified && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(vendor.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
                            wishlisted
                              ? 'bg-rose-500 text-white'
                              : 'bg-white/90 text-mauve-600 hover:text-rose-500'
                          }`}
                          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 text-mauve-500 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-roseGold-500 shrink-0" />
                            {vendor.city}
                          </span>
                          <div className="flex items-center gap-1 font-bold text-mauve-800">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{vendor.rating}</span>
                            <span className="text-mauve-400 font-normal">({vendor.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-base font-bold text-mauve-900 line-clamp-1">
                          {vendor.businessName}
                        </h3>

                        <p className="text-xs text-mauve-600 line-clamp-2 leading-relaxed">
                          {vendor.tagline || vendor.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom starting price and CTA */}
                    <div className="p-4 pt-0 border-t border-blush-100 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-mauve-400 uppercase font-semibold">Starts from</span>
                        <p className="text-sm font-bold text-roseGold-700">{formatINR(vendor.startingPrice)}</p>
                      </div>
                      <Link to={`/vendors/${vendor.id}`}>
                        <Button variant="secondary" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
