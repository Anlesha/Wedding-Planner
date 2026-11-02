import React from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../../contexts/WeddingContext';
import { storageService } from '../../services/storageService';
import { formatINR } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  Heart,
  Star,
  ShieldCheck,
  MapPin,
  Trash2,
  Scale,
  Send,
  Store
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWedding();
  const allVendors = storageService.getVendors();
  const savedVendors = allVendors.filter((v) => wishlist.includes(v.id));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="roseGold">Shortlist</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Saved Vendors ({savedVendors.length})
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Your shortlisted specialists ready for quotation comparisons
          </p>
        </div>

        <Link to="/vendors">
          <Button variant="outline" size="sm" className="bg-white" leftIcon={<Store className="w-4 h-4" />}>
            Explore More Vendors
          </Button>
        </Link>
      </div>

      {savedVendors.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-8 h-8" />}
          title="Your wishlist is empty"
          description="Explore our curated directory of verified photographers, caterers, and decorators to save favorites."
          actionLabel="Browse Marketplace"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVendors.map((vendor) => (
            <Card key={vendor.id} hoverEffect className="p-0 overflow-hidden flex flex-col justify-between">
              <div>
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

                  <button
                    onClick={() => toggleWishlist(vendor.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 transition-colors shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-mauve-500">
                      <MapPin className="w-3.5 h-3.5 text-roseGold-500" /> {vendor.city}
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

              <div className="p-4 pt-0 border-t border-blush-100 mt-2 space-y-3">
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-[10px] text-mauve-400 uppercase font-semibold">Starts from</span>
                  <p className="text-sm font-bold text-roseGold-700">{formatINR(vendor.startingPrice)}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/app/compare?v1=${vendor.id}`} className="w-full">
                    <Button variant="secondary" size="sm" className="w-full" leftIcon={<Scale className="w-3.5 h-3.5" />}>
                      Compare
                    </Button>
                  </Link>
                  <Link to={`/vendors/${vendor.id}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
