import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  TrendingDown,
  ShieldCheck,
  CheckSquare,
  Users,
  Calendar,
  Heart,
  Scale,
  Bell,
  Wallet,
  ArrowRight
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      icon: TrendingDown,
      title: 'Smart Budget Overrun Detection',
      desc: 'Our proprietary algorithm monitors actual vendor receipts vs planned category limits. If a category exceeds its allocation, MarryOn highlights immediate verified alternatives with calculated rupee savings.',
      badge: 'Differentiator',
    },
    {
      icon: Sparkles,
      title: 'AI Wedding Assistant',
      desc: 'Chat directly with our intelligent assistant trained on Indian wedding logistics. Generate tailored checklists, budget advice, vendor comparisons, and ritual timelines on demand.',
      badge: 'Smart AI',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Vendor Verification',
      desc: 'No unverified listings. Every partner undergoes GST verification, trade license review, and authentic customer sign-off to ensure zero wedding-day no-shows.',
      badge: 'Trust',
    },
    {
      icon: CheckSquare,
      title: 'Ritual-Centric Task Manager',
      desc: 'Organize Haldi, Mehendi, Sangeet, Muhurat, and Reception to-dos with intelligent due date reminders based on days remaining.',
      badge: 'Productivity',
    },
    {
      icon: Scale,
      title: 'Side-by-Side Vendor Comparison',
      desc: 'Compare package pricing, crew sizes, deliverables, and ratings across multiple compatible vendors before committing your hard-earned deposit.',
      badge: 'Clarity',
    },
    {
      icon: Users,
      title: 'Guest List & RSVP Tracker',
      desc: 'Categorize attendees by Bride Family, Groom Family, VIPs, and Friends. Track dietary preferences (Jain, Pure Veg) and table allocations.',
      badge: 'Coordination',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="roseGold">Features</Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-mauve-900">
          Everything You Need For Your Big Day
        </h1>
        <p className="text-base text-mauve-600 leading-relaxed">
          MarryOn brings together intelligent budget governance, verified Indian wedding specialists, and intuitive coordination tools under a unified roof.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((f, i) => {
          const Icon = f.icon;
          return (
            <Card key={i} hoverEffect className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-roseGold-100 flex items-center justify-center text-roseGold-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="roseGold">{f.badge}</Badge>
                </div>
                <h3 className="font-serif text-xl font-bold text-mauve-900">{f.title}</h3>
                <p className="text-sm text-mauve-600 leading-relaxed">{f.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-roseGold-600 to-mauve-800 rounded-3xl p-10 text-white text-center space-y-6 shadow-premium">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">Start Planning Your Dream Wedding</h2>
        <p className="text-sm text-roseGold-100 max-w-xl mx-auto">
          Free forever for couples. No hidden commission charges or inflated vendor packages.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/app/dashboard">
            <Button variant="secondary" size="lg" className="bg-white text-mauve-900 shadow-md">
              Open Planner Workspace
            </Button>
          </Link>
          <Link to="/vendors">
            <Button variant="outline" size="lg" className="text-white border-white/60 hover:bg-white/10">
              Browse Vendors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
