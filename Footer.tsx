import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mauve-900 text-roseGold-100/90 pt-16 pb-12 border-t border-mauve-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-mauve-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Marry<span className="text-roseGold-400">On</span>
              </span>
            </Link>
            <p className="text-sm text-mauve-300 max-w-sm leading-relaxed">
              Your Dream Wedding, Beautifully Planned. Discover top-rated verified wedding vendors, manage Indian rupee budgets with smart AI overrun savings, and coordinate tasks & guests in one place.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-mauve-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-roseGold-400" /> Pune & Mumbai, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-roseGold-400" /> support@marryon.app
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-roseGold-300">Wedding Planning</h4>
            <ul className="space-y-2 text-sm text-mauve-300">
              <li><Link to="/app/ai-planner" className="hover:text-white transition-colors">AI Wedding Planner</Link></li>
              <li><Link to="/app/budget" className="hover:text-white transition-colors">Budget & Overrun Engine</Link></li>
              <li><Link to="/app/tasks" className="hover:text-white transition-colors">Wedding Checklist</Link></li>
              <li><Link to="/app/guests" className="hover:text-white transition-colors">Guest List & RSVP</Link></li>
              <li><Link to="/app/compare" className="hover:text-white transition-colors">Compare Vendors</Link></li>
            </ul>
          </div>

          {/* Marketplace Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-roseGold-300">Vendor Categories</h4>
            <ul className="space-y-2 text-sm text-mauve-300">
              <li><Link to="/vendors?category=Venue" className="hover:text-white transition-colors">Wedding Venues</Link></li>
              <li><Link to="/vendors?category=Photography" className="hover:text-white transition-colors">Photographers</Link></li>
              <li><Link to="/vendors?category=Catering" className="hover:text-white transition-colors">Regal Caterers</Link></li>
              <li><Link to="/vendors?category=Decoration" className="hover:text-white transition-colors">Mandap & Florists</Link></li>
              <li><Link to="/vendors?category=Makeup" className="hover:text-white transition-colors">Bridal Makeup & Henna</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-roseGold-300">Platform</h4>
            <ul className="space-y-2 text-sm text-mauve-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Features Overview</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mauve-400">
          <p>© {new Date().getFullYear()} MarryOn Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-roseGold-400 fill-roseGold-400" /> for Indian Weddings
          </p>
        </div>
      </div>
    </footer>
  );
};
