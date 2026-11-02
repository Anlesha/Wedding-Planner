import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="roseGold">Legal & Trust</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-mauve-900">Privacy Policy</h1>
        <p className="text-xs text-mauve-500">Last updated: October 2026</p>
      </div>

      <Card className="p-8 space-y-6 text-sm text-mauve-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">1. Information We Collect</h2>
          <p>
            MarryOn collects information you provide directly, including names, wedding dates, locations, estimated budgets in INR, guest counts, and vendor communication records. For wedding vendors, we collect business registration numbers, GST certificates, and portfolios.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">2. How We Use Your Data</h2>
          <p>
            Your information is used solely to provide intelligent wedding planning assistance, compute category budgets, connect you with verified specialists upon enquiry submission, and verify vendor credentials. We never sell your personal wedding details or guest lists to telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">3. Data Security & Storage</h2>
          <p>
            All financial figures, guest contact details, and vendor documents are protected using industry-standard encryption protocols and Row-Level Security (RLS) policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-mauve-900">4. Contacting Our Data Protection Officer</h2>
          <p>
            For privacy queries or data removal requests, email us at <strong className="text-mauve-900">privacy@marryon.app</strong>.
          </p>
        </section>
      </Card>
    </div>
  );
};
