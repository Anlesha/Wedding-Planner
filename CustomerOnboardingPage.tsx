import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWedding } from '../../contexts/WeddingContext';
import { useToast } from '../../contexts/ToastContext';
import { formatINR } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const CustomerOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { wedding, updateWedding } = useWedding();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [partner1, setPartner1] = useState(wedding.partner1Name || 'Aarav Sharma');
  const [partner2, setPartner2] = useState(wedding.partner2Name || 'Meera Kulkarni');
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate || '2026-12-18');
  const [city, setCity] = useState(wedding.city || 'Pune');
  const [venueName, setVenueName] = useState(wedding.venueName || 'The Corinthians Resort');
  const [totalBudget, setTotalBudget] = useState(wedding.totalBudget || 2500000);
  const [estimatedGuests, setEstimatedGuests] = useState(wedding.estimatedGuests || 350);
  const [weddingStyle, setWeddingStyle] = useState(wedding.weddingStyle || 'Royal Maharashtrian Elegance');
  const [priorities, setPriorities] = useState<string[]>(wedding.priorities || ['Photography', 'Catering', 'Venue']);

  const totalSteps = 4;

  const togglePriority = (cat: string) => {
    if (priorities.includes(cat)) {
      setPriorities(priorities.filter((p) => p !== cat));
    } else {
      setPriorities([...priorities, cat]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Finalize setup
      updateWedding({
        partner1Name: partner1,
        partner2Name: partner2,
        coupleNames: `${partner1.split(' ')[0]} & ${partner2.split(' ')[0]}`,
        weddingDate,
        city,
        venueName,
        totalBudget,
        estimatedGuests,
        weddingStyle,
        priorities,
      });

      // Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('Wedding workspace initialized successfully! 🎉', 'success');
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-warmBg py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-mauve-600">
            <span>Step {step} of {totalSteps}</span>
            <span className="text-roseGold-700 font-bold">
              {step === 1 && 'Couple Details'}
              {step === 2 && 'Location & Guests'}
              {step === 3 && 'Wedding Budget'}
              {step === 4 && 'Style & Priorities'}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-blush-200 overflow-hidden">
            <div
              className="h-full bg-roseGold-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Card */}
        <Card className="p-8 shadow-premium space-y-6 bg-white/95 backdrop-blur-md">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Who is Getting Married?</h2>
                <p className="text-xs text-mauve-500">Let's personalize your planning dashboard</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Partner 1 Name"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  placeholder="e.g. Aarav"
                  required
                />
                <Input
                  label="Partner 2 Name"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  placeholder="e.g. Meera"
                  required
                />
              </div>

              <Input
                label="Target Wedding Date"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                leftIcon={<Calendar className="w-4 h-4" />}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Where & Who?</h2>
                <p className="text-xs text-mauve-500">Venue location and guest scale</p>
              </div>

              <Select
                label="Wedding City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={[
                  { value: 'Pune', label: 'Pune, Maharashtra' },
                  { value: 'Mumbai', label: 'Mumbai, Maharashtra' },
                  { value: 'Goa', label: 'Goa (Beach Destination)' },
                  { value: 'Jaipur', label: 'Jaipur, Rajasthan (Royal Palace)' },
                  { value: 'Udaipur', label: 'Udaipur, Rajasthan' },
                  { value: 'Bengaluru', label: 'Bengaluru, Karnataka' },
                  { value: 'Delhi NCR', label: 'Delhi NCR' },
                ]}
              />

              <Input
                label="Venue Name or Preference"
                placeholder="e.g. The Corinthians Resort / Open Lawn"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
              />

              <Input
                label="Estimated Guest Count"
                type="number"
                value={estimatedGuests}
                onChange={(e) => setEstimatedGuests(Number(e.target.value))}
                leftIcon={<Users className="w-4 h-4" />}
                helperText="Typical Indian weddings range from 200 to 800 guests."
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Total Wedding Budget</h2>
                <p className="text-xs text-mauve-500">MarryOn will allocate funds across 10 essential categories</p>
              </div>

              <div className="p-4 rounded-2xl bg-roseGold-50 border border-roseGold-200 text-center">
                <span className="text-xs uppercase tracking-wider text-roseGold-800 font-bold block mb-1">
                  Target Budget
                </span>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-roseGold-700">
                  {formatINR(totalBudget)}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1500000, 2500000, 4000000, 6000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTotalBudget(amt)}
                    className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all ${
                      totalBudget === amt
                        ? 'bg-roseGold-500 text-white border-roseGold-500 shadow-xs'
                        : 'border-blush-200 text-mauve-800 hover:bg-blush-50'
                    }`}
                  >
                    {amt >= 10000000 ? `₹${amt / 10000000} Cr` : `₹${amt / 100000} Lakh`}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="500000"
                max="10000000"
                step="100000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full accent-roseGold-500 cursor-pointer"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-mauve-900">Style & Priorities</h2>
                <p className="text-xs text-mauve-500">Select what matters most to your family</p>
              </div>

              <Select
                label="Wedding Theme / Aesthetic"
                value={weddingStyle}
                onChange={(e) => setWeddingStyle(e.target.value)}
                options={[
                  { value: 'Royal Maharashtrian Elegance', label: 'Royal Maharashtrian Elegance' },
                  { value: 'Palace Heritage Regal', label: 'Palace Heritage Regal (Jaipur/Udaipur)' },
                  { value: 'Tropical Beach Sunset', label: 'Tropical Beach Sunset (Goa)' },
                  { value: 'Modern Minimalist Intimate', label: 'Modern Minimalist Intimate' },
                  { value: 'Grand Bollywood Extravaganza', label: 'Grand Bollywood Extravaganza' },
                ]}
              />

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-mauve-700">
                  Select Top Priority Categories
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Photography', 'Catering', 'Venue', 'Decoration', 'Clothing', 'Music & DJ'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => togglePriority(cat)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        priorities.includes(cat)
                          ? 'bg-roseGold-50 text-roseGold-800 border-roseGold-400 shadow-xs'
                          : 'border-blush-200 text-mauve-700 hover:bg-blush-50'
                      }`}
                    >
                      <span>{cat}</span>
                      {priorities.includes(cat) && <CheckCircle2 className="w-4 h-4 text-roseGold-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-blush-100">
            {step > 1 ? (
              <Button variant="ghost" size="md" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={step === totalSteps ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            >
              {step === totalSteps ? 'Launch Dashboard' : 'Next Step'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
