import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Sparkles, Heart, ShieldCheck, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="roseGold">About MarryOn</Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-mauve-900">
          Reimagining Indian Wedding Planning
        </h1>
        <p className="text-base text-mauve-600 leading-relaxed">
          We believe celebrating your love story shouldn't require financial chaos or months of stress. MarryOn empowers couples with transparency, smart savings, and verified partners.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-premium">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
          alt="Indian Wedding Celebration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mauve-950/70 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="font-serif text-2xl font-bold">Plan Less, Celebrate More.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 space-y-3">
          <Heart className="w-8 h-8 text-roseGold-600" />
          <h3 className="font-serif text-lg font-bold text-mauve-900">Our Mission</h3>
          <p className="text-xs text-mauve-600 leading-relaxed">
            To provide every Indian couple with clear financial transparency, accessible intelligent tools, and a reliable marketplace free from hidden middleman fees.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <ShieldCheck className="w-8 h-8 text-roseGold-600" />
          <h3 className="font-serif text-lg font-bold text-mauve-900">100% Verified Partners</h3>
          <p className="text-xs text-mauve-600 leading-relaxed">
            We manually review GST and trade credentials so you never have to worry about unprofessional service on your most sacred wedding day.
          </p>
        </Card>

        <Card className="p-6 space-y-3">
          <Sparkles className="w-8 h-8 text-roseGold-600" />
          <h3 className="font-serif text-lg font-bold text-mauve-900">Cultural Sensitivity</h3>
          <p className="text-xs text-mauve-600 leading-relaxed">
            Tailored specifically for Indian wedding traditions — from regional rituals and multi-day ceremonies to auspicious muhurats and authentic feasts.
          </p>
        </Card>
      </div>
    </div>
  );
};
