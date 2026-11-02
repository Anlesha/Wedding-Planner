import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { storageService } from '../../services/storageService';
import { formatINR } from '../../utils/formatters';
import {
  Sparkles,
  Search,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  ArrowRight,
  Star,
  Heart,
  ChevronRight,
  TrendingDown,
  Building2,
  Camera,
  UtensilsCrossed,
  Flower2,
  Palette,
  Music,
  Gem,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const vendors = storageService.getVendors().slice(0, 4);

  const categories = [
    { name: 'Venues', icon: Building2, count: '34 available', path: '/vendors?category=Venue', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80' },
    { name: 'Photography', icon: Camera, count: '48 available', path: '/vendors?category=Photography', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80' },
    { name: 'Catering & Feasts', icon: UtensilsCrossed, count: '29 available', path: '/vendors?category=Catering', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80' },
    { name: 'Decor & Mandaps', icon: Flower2, count: '38 available', path: '/vendors?category=Decoration', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bridal Styling & Henna', icon: Palette, count: '25 available', path: '/vendors?category=Makeup', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sangeet DJs & Sound', icon: Music, count: '19 available', path: '/vendors?category=Music & DJ', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-roseGold-200/40 via-blush-200/30 to-ivory-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush-100/80 border border-roseGold-200 text-roseGold-800 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-roseGold-500" />
                <span>Next-Gen Smart Wedding Planning for India</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-mauve-900 tracking-tight leading-[1.15]">
                Your Dream Wedding, <br />
                <span className="gold-gradient-text italic">Beautifully Planned.</span>
              </h1>

              <p className="text-base sm:text-lg text-mauve-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover trusted verified wedding vendors, master your budget in INR with intelligent AI overrun detection, and organize rituals without juggling endless spreadsheets.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/app/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="primary"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-md hover:shadow-lg"
                  >
                    Start Planning (Free)
                  </Button>
                </Link>
                <Link to="/vendors" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    leftIcon={<Search className="w-4 h-4" />}
                    className="w-full sm:w-auto bg-white/80"
                  >
                    Explore 150+ Vendors
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-blush-200/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="font-serif text-2xl font-bold text-mauve-900">100%</p>
                  <p className="text-xs text-mauve-500 font-medium">Verified Vendors</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-mauve-900">₹0</p>
                  <p className="text-xs text-mauve-500 font-medium">Platform Fee</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-mauve-900">15-20%</p>
                  <p className="text-xs text-mauve-500 font-medium">Average Savings</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-premium border-4 border-white aspect-[4/5] group">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                    alt="Indian Wedding Celebration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mauve-950/70 via-transparent to-transparent" />
                  
                  {/* Overlay couple tag */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-roseGold-200 font-medium">Real Maharashtra Wedding</p>
                    <h3 className="font-serif text-xl font-bold mt-0.5">Aarav & Meera</h3>
                    <p className="text-xs text-white/80">The Corinthians Resort, Pune • 18 Dec 2026</p>
                  </div>
                </div>

                {/* Floating Smart Overrun Engine Pill */}
                <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-premium border border-roseGold-200/80 max-w-[240px] animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-mauve-900 leading-tight">AI Budget Protection</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">Saved ₹1.4 Lakh on Decor</p>
                    </div>
                  </div>
                </div>

                {/* Floating Verified Photographer Tag */}
                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-premium border border-blush-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-roseGold-400">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                      alt="Rohan Deshpande"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-mauve-900">Rohan Deshpande</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-mauve-500">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>4.9 (42 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WEDDING CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="roseGold">Service Categories</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900">
            Handpicked Wedding Specialists
          </h2>
          <p className="text-sm text-mauve-600">
            From palace venues and authentic Maharashtrian catering to cinematic videographers, explore specialists verified for quality and transparency.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={cat.path}
                className="group relative rounded-2xl overflow-hidden bg-white border border-blush-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-4 text-center flex flex-col items-center justify-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blush-50 group-hover:bg-roseGold-500 transition-colors flex items-center justify-center text-roseGold-600 group-hover:text-white">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-mauve-900 group-hover:text-roseGold-700 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-mauve-400 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. DUAL DIFFERENTIATOR: SMART BUDGET OVERRUN & AI PLANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-mauve-900 via-mauve-800 to-roseGold-950 rounded-3xl p-8 sm:p-12 text-white shadow-premium relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-roseGold-500/20 text-roseGold-300 border border-roseGold-400/30 text-xs font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>The MarryOn Difference</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Never Overspend on Your Wedding. <br />
                <span className="text-roseGold-300 italic">Smart Alternative Suggestions.</span>
              </h2>
              <p className="text-sm sm:text-base text-mauve-200 leading-relaxed max-w-xl">
                When unexpected costs push a category over budget, MarryOn doesn’t just show an alarm. Our algorithm immediately analyzes verified vendors in your city and proposes comparable, high-rated alternatives to save tens of thousands of rupees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <Wallet className="w-5 h-5 text-roseGold-300 mb-2" />
                  <h4 className="text-sm font-bold text-white">Live INR Utilization</h4>
                  <p className="text-xs text-mauve-300 mt-1">Track advances, pending dues, and planned versus actual spending in real time.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <Sparkles className="w-5 h-5 text-roseGold-300 mb-2" />
                  <h4 className="text-sm font-bold text-white">AI Wedding Assistant</h4>
                  <p className="text-xs text-mauve-300 mt-1">Ask questions in plain English: checklist timelines, vendor matches, and budget cuts.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/app/budget">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Experience Budget Engine
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive demo card */}
            <div className="lg:col-span-5 bg-white text-mauve-900 rounded-2xl p-6 shadow-premium border border-blush-200">
              <div className="flex items-center justify-between pb-3 border-b border-blush-100">
                <span className="text-xs font-bold text-mauve-500 uppercase tracking-wider">Example Live Alert</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">Over Budget (+₹30,000)</span>
              </div>

              <div className="py-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Decoration & Mandap</span>
                    <span className="text-rose-600">₹2,80,000 / ₹2,50,000</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-blush-100 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '112%' }} />
                  </div>
                </div>

                <div className="p-3 bg-blush-50 rounded-xl border border-blush-200 space-y-2">
                  <p className="text-xs font-bold text-mauve-800 flex items-center gap-1.5">
                    💡 Smart Alternative Available
                  </p>
                  <p className="text-xs text-mauve-600">
                    Switch to <strong>Utsav Mandap & Floral Arts</strong> in Swargate, Pune.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-emerald-700 font-bold">Estimated Savings: ₹1,40,000</span>
                    <Link to="/vendors/ven-007" className="text-xs text-roseGold-600 font-bold hover:underline">
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-mauve-400">MarryOn keeps you in total control. No bookings changed without your sign-off.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED VENDORS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="roseGold">Verified Marketplace</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900 mt-2">
              Featured Wedding Professionals
            </h2>
            <p className="text-sm text-mauve-600 mt-1">
              Top-rated pros with verified business credentials and transparent pricing.
            </p>
          </div>
          <Link to="/vendors">
            <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              View All Vendors
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} hoverEffect className="p-0 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-mauve-100">
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
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mauve-500 font-medium">{vendor.city}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-mauve-800">
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
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <Badge variant="roseGold">Simple Process</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900">
            How MarryOn Works
          </h2>
          <p className="text-sm text-mauve-600">
            Three simple steps to coordinate your entire wedding effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-roseGold-100 text-roseGold-700 font-serif text-2xl font-bold flex items-center justify-center mx-auto shadow-xs">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-mauve-900">Set Budget & Rituals</h3>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Input your total wedding budget, guest count, and wedding date. MarryOn generates suggested allocations and a ritual-specific task checklist.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-roseGold-100 text-roseGold-700 font-serif text-2xl font-bold flex items-center justify-center mx-auto shadow-xs">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-mauve-900">Discover & Compare</h3>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Explore verified vendors across photography, catering, and decor. Compare packages side-by-side and submit direct enquiries without middleman markups.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-blush-200/80 shadow-soft text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-roseGold-100 text-roseGold-700 font-serif text-2xl font-bold flex items-center justify-center mx-auto shadow-xs">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-mauve-900">Track & Celebrate</h3>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Manage RSVP counts, track payment milestones, and let our smart budget overrun engine warn you before extra costs pile up.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VENDOR ONBOARDING CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blush-100/70 border border-roseGold-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <Badge variant="roseGold">For Wedding Vendors</Badge>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-mauve-900">
              Grow Your Wedding Business on MarryOn
            </h3>
            <p className="text-sm text-mauve-600 leading-relaxed">
              Showcase your portfolio, receive genuine enquiries from couples in your city, manage bookings and quotes, and earn a trusted verified partner badge.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Join as a Vendor
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="bg-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
