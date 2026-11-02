import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="roseGold">Terms of Service</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900">Terms of Service</h1>
        <p className="text-xs text-mauve-500">Effective Date: October 2026</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-mauve-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MarryOn ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to all terms, please discontinue use of the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">2. Marketplace & Vendor Relations</h2>
          <p>
            MarryOn acts as an intelligent discovery and coordination platform connecting couples with independent wedding service providers. While we audit business credentials and GST registrations, final service agreements, deposits, and delivery contracts are executed between the couple and the vendor.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">3. Accurate Financial Planning</h2>
          <p>
            Budget recommendations, category allocations, and smart savings suggestions provided by MarryOn are estimated calculations based on representative market rates in India and should be adjusted to fit your specific ceremony scale and family preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">4. Dispute Resolution & Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India, with exclusive jurisdiction in the courts of Pune, Maharashtra.
          </p>
        </section>
      </Card>
    </div>
  );
};
