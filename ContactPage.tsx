import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      showToast('Thank you! Your message has been received by our Pune operations team.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="roseGold">Get in Touch</Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-mauve-900">
          We’re Here to Help
        </h1>
        <p className="text-sm text-mauve-600 leading-relaxed">
          Have questions about finding verified vendors, budgeting your wedding, or joining as a partner? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6 bg-gradient-to-br from-white to-blush-50/50">
            <h3 className="font-serif text-xl font-bold text-mauve-900">Headquarters</h3>

            <div className="space-y-4 text-xs text-mauve-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-roseGold-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-mauve-900">Pune Office</strong>
                  <span>Koregaon Park Plaza, Level 4, Pune, Maharashtra 411001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-roseGold-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-mauve-900">Mumbai Regional Hub</strong>
                  <span>Bandra Kurla Complex (BKC), Mumbai 400051</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-roseGold-600 shrink-0" />
                <span>+91 20 2600 4567 / +91 98220 99999</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-roseGold-600 shrink-0" />
                <span>support@marryon.app / partnerships@marryon.app</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-roseGold-50 border border-roseGold-200 text-xs text-roseGold-900 space-y-1">
              <p className="font-bold">Wedding Emergency Helpline 🛎️</p>
              <p>For urgent day-of vendor coordination emergencies, call our 24/7 dedicated support desk.</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Meera Kulkarni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="meera@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  placeholder="+91 98220 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Subject / Inquiry Topic"
                  placeholder="e.g. Vendor Verification / Budget Query"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist with your wedding planning or vendor partnership?"
                  required
                  className="w-full bg-white border border-blush-300 rounded-xl p-3 text-sm text-mauve-900 outline-none focus:border-roseGold-400 focus:ring-2 focus:ring-roseGold-100"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" isLoading={isSending} leftIcon={<Send className="w-4 h-4" />}>
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
