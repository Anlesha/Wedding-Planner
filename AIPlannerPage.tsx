import React, { useState, useRef, useEffect } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { storageService } from '../../services/storageService';
import { AIChatMessage } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Trash2,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

export const AIPlannerPage: React.FC = () => {
  const { wedding, totalBudget, totalActualSpent, remainingBudget, isOverBudget, overrunAlerts } = useWedding();
  const [messages, setMessages] = useState<AIChatMessage[]>(() => storageService.getAIChatMessages());
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Help me plan my ₹25 Lakh budget in Pune',
    'Find photographers in Pune under ₹1 Lakh',
    'My budget is exceeded. Help me reduce costs',
    'What should I prioritize 60 days before wedding?',
    'Suggest catering budget for 350 guests',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    storageService.addAIChatMessage(userMsg);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyContent = '';
      let recommendedVendors: string[] = [];
      let actionSuggestions: { label: string; route: string }[] = [];

      if (lower.includes('photo') || lower.includes('camera')) {
        replyContent = `For your wedding in Pune on ${formatDate(wedding.weddingDate)}, I highly recommend checking out **Rohan Deshpande Photography** (Verified Partner, 4.9★, starts at ₹65,000 for candid coverage, 2-day royal package at ₹1,50,000). For tighter budgets, **ShutterMoments Studios** in Kothrud starts at ₹38,000.`;
        recommendedVendors = ['ven-001', 'ven-006'];
        actionSuggestions = [
          { label: 'View Rohan Deshpande Profile', route: '/vendors/ven-001' },
          { label: 'Compare Photographers', route: '/app/compare' }
        ];
      } else if (lower.includes('budget') || lower.includes('reduce') || lower.includes('cost') || lower.includes('exceed') || lower.includes('overrun')) {
        replyContent = `Here is your current financial snapshot:\n\n• **Total Target Budget:** ${formatINR(totalBudget)}\n• **Committed Expenses:** ${formatINR(totalActualSpent)}\n• **Remaining Balance:** ${formatINR(remainingBudget)}\n\n💡 **Smart Savings Opportunity:** Your Decoration category has an estimated commitment of ₹2,80,000 against a suggested ₹2,50,000. By switching to **Utsav Mandap & Floral Arts**, you can save approximately **₹1,40,000** while keeping fresh marigold mandap decor!`;
        recommendedVendors = ['ven-007'];
        actionSuggestions = [
          { label: 'Review Overrun Engine in Budget', route: '/app/budget' },
          { label: 'View Utsav Mandap Profile', route: '/vendors/ven-007' }
        ];
      } else if (lower.includes('cater') || lower.includes('food') || lower.includes('guest')) {
        const estCostPerPlate = 1450;
        const totalFood = wedding.estimatedGuests * estCostPerPlate;
        replyContent = `For ${wedding.estimatedGuests} guests, catering at an authentic multi-cuisine standard (like **Royal Peshwa Caterers**' Maharaja Feast at ₹1,450/plate) comes out to approximately **${formatINR(totalFood)}**.\n\nTips to optimize catering:\n1. Keep 3 live dessert counters instead of 5.\n2. Ensure RSVP headcounts are finalized 15 days prior to avoid over-ordering buffet plates.`;
        recommendedVendors = ['ven-003'];
        actionSuggestions = [
          { label: 'Manage RSVP Headcounts', route: '/app/guests' },
          { label: 'View Royal Peshwa Caterers', route: '/vendors/ven-003' }
        ];
      } else if (lower.includes('checklist') || lower.includes('prioritize') || lower.includes('days') || lower.includes('timeline')) {
        replyContent = `With **${formatDate(wedding.weddingDate)}** approaching (less than 70 days left!), here are your top 3 immediate action items:\n\n1. **Finalize catering tasting:** Lock in desserts and live counter menu with parents.\n2. **Send digital save-the-dates:** WhatsApp links to VIP family and friends for early RSVP confirmations.\n3. **Mandap walkthrough at venue:** Meet your decorator at ${wedding.venueName || 'the venue'} to inspect night lighting.`;
        actionSuggestions = [
          { label: 'Open Wedding Checklist', route: '/app/tasks' },
          { label: 'Check Wedding Calendar', route: '/app/calendar' }
        ];
      } else {
        replyContent = `Thank you for asking! With your Pune wedding set for **${formatDate(wedding.weddingDate)}** with **${wedding.estimatedGuests} guests** and a **${formatINR(totalBudget)} budget**, our platform can help you optimize every rupee. Would you like me to analyze your catering options, recommend decorators, or review pending checklist tasks?`;
        actionSuggestions = [
          { label: 'Explore Verified Vendors', route: '/vendors' },
          { label: 'Check My Budget', route: '/app/budget' }
        ];
      }

      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toISOString(),
        recommendedVendors,
        actionSuggestions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      storageService.addAIChatMessage(assistantMsg);
      setIsTyping(false);
    }, 700);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      storageService.clearAIChat();
      setMessages([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-8">
      {/* Header with clear chat button */}
      <div className="flex items-center justify-between pb-2 border-b border-blush-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-mauve-900">
              AI Wedding Assistant
            </h1>
          </div>
          <p className="text-xs text-mauve-500 mt-0.5">
            Synced with {wedding.coupleNames} • {wedding.city} • {formatINR(totalBudget)} Budget
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 text-xs text-mauve-400 hover:text-rose-600 transition-colors p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Suggested Prompts Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1.5 rounded-full bg-white border border-roseGold-200/80 hover:border-roseGold-400 text-xs text-mauve-800 font-medium whitespace-nowrap shadow-xs hover:bg-roseGold-50 transition-colors shrink-0"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Panel */}
      <Card className="min-h-[500px] max-h-[600px] overflow-y-auto p-4 sm:p-6 space-y-4 bg-white/90">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-3 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-roseGold-500 text-white rounded-tr-xs'
                      : 'bg-blush-50/70 border border-blush-200 text-mauve-900 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Recommended Vendors Widget */}
                {!isUser && msg.recommendedVendors && msg.recommendedVendors.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                    {msg.recommendedVendors.map((vId) => {
                      const v = storageService.getVendorById(vId);
                      if (!v) return null;
                      return (
                        <div
                          key={v.id}
                          className="p-2.5 rounded-xl bg-white border border-roseGold-200 shadow-xs flex items-center gap-3"
                        >
                          <img
                            src={v.coverImage}
                            alt={v.businessName}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-mauve-900 truncate">
                              {v.businessName}
                            </h4>
                            <p className="text-[11px] text-roseGold-700 font-bold">
                              Starts {formatINR(v.startingPrice)}
                            </p>
                          </div>
                          <Link to={`/vendors/${v.id}`}>
                            <Button variant="secondary" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Action Suggestions Buttons */}
                {!isUser && msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-left pt-1">
                    {msg.actionSuggestions.map((act, i) => (
                      <Link key={i} to={act.route}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-[11px] py-1 border-roseGold-300 hover:bg-roseGold-50"
                          rightIcon={<ArrowRight className="w-3 h-3" />}
                        >
                          {act.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}

                <div className="text-[10px] text-mauve-400 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-mauve-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 items-center text-mauve-500 text-xs">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-roseGold-500 to-blush-400 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-blush-50 border border-blush-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-roseGold-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-roseGold-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-roseGold-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </Card>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask anything: e.g. 'How much should I keep aside for wedding photographer?'..."
          className="flex-1 bg-white border border-blush-300 rounded-2xl px-4 py-3 text-sm text-mauve-900 outline-none focus:border-roseGold-500 focus:ring-2 focus:ring-roseGold-100 shadow-soft"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="px-5 rounded-2xl"
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send
        </Button>
      </form>
    </div>
  );
};
