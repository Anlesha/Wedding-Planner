import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Sparkles, ArrowRight, UserCheck, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="roseGold">Process Guide</Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-mauve-900">
          How MarryOn Makes Wedding Planning Effortless
        </h1>
        <p className="text-base text-mauve-600 leading-relaxed">
          From the moment you fix your auspicious date to the final reception dance, here is how our platform supports you every step of the way.
        </p>
      </div>

      {/* For Couples */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-mauve-900">
            For Couples & Families
          </h2>
          <p className="text-xs text-mauve-500 mt-1">Four simple steps to your dream celebration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Personalized Setup',
              desc: 'Enter your target wedding date, guest headcount, and total budget in INR. MarryOn generates a realistic category allocation breakdown.'
            },
            {
              step: '02',
              title: 'Discover & Compare',
              desc: 'Search photographers, venues, caterers, and florists. Filter by price, verified status, and real photo galleries without broker calls.'
            },
            {
              step: '03',
              title: 'Direct Enquiries',
              desc: 'Submit your dates and requirements directly to verified pros. Receive customized quotes and review deliverables in your dashboard.'
            },
            {
              step: '04',
              title: 'Live Budget Guard',
              desc: 'Log advances and payments. If any vendor estimate exceeds your plan, MarryOn highlights lower-cost alternatives with rupee savings.'
            }
          ].map((item, i) => (
            <Card key={i} className="p-6 space-y-3 relative overflow-hidden border-blush-200">
              <span className="font-serif text-4xl font-bold text-roseGold-200/80 absolute top-4 right-4">
                {item.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-mauve-900 pt-2">{item.title}</h3>
              <p className="text-xs text-mauve-600 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* For Vendors */}
      <section className="bg-blush-50 rounded-3xl p-8 sm:p-12 border border-roseGold-200/60 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="roseGold">For Wedding Vendors</Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-mauve-900">
            Partner With India’s Smartest Wedding Platform
          </h2>
          <p className="text-xs text-mauve-600">
            Get high-intent direct booking requests without paying high lead commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 space-y-3 border border-blush-200 shadow-xs">
            <UserCheck className="w-8 h-8 text-roseGold-600" />
            <h4 className="font-serif text-base font-bold text-mauve-900">1. Create Business Profile</h4>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Upload your high-res portfolio, package pricing, service descriptions, and available calendar dates.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 space-y-3 border border-blush-200 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-roseGold-600" />
            <h4 className="font-serif text-base font-bold text-mauve-900">2. Submit Verification</h4>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Upload your GSTIN or business registration for admin audit. Verified vendors receive high marketplace priority.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 space-y-3 border border-blush-200 shadow-xs">
            <HeartHandshake className="w-8 h-8 text-roseGold-600" />
            <h4 className="font-serif text-base font-bold text-mauve-900">3. Receive Direct Enquiries</h4>
            <p className="text-xs text-mauve-600 leading-relaxed">
              Send customized quotations directly to couples, confirm bookings, and manage dates through our dedicated calendar.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/register">
            <Button variant="primary" size="lg">
              Join as a Wedding Vendor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
