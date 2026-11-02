import React from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../../contexts/WeddingContext';
import { formatDate } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import {
  Bell,
  CheckCircle2,
  TrendingDown,
  Calendar,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useWedding();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'budget':
        return <TrendingDown className="w-5 h-5 text-amber-600" />;
      case 'task':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-roseGold-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-blush-200">
        <div>
          <Badge variant="roseGold">Updates</Badge>
          <h1 className="font-serif text-3xl font-bold text-mauve-900 mt-1">
            Notification Center
          </h1>
          <p className="text-xs text-mauve-500 mt-0.5">
            Booking confirmations, payment milestones, and budget overrun alerts
          </p>
        </div>

        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={markAllNotificationsAsRead} className="bg-white">
            Mark All as Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-8 h-8" />}
          title="No notifications yet"
          description="You will receive alerts here when vendors respond to your quotes or when budget milestones arrive."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card
              key={n.id}
              className={`p-4 transition-all flex items-start justify-between gap-4 ${
                !n.read
                  ? 'bg-roseGold-50/40 border-roseGold-300 shadow-sm'
                  : 'bg-white hover:bg-blush-50/30'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-white border border-blush-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-mauve-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-mauve-600 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-mauve-400">{formatDate(n.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {n.link && (
                  <Link to={n.link} onClick={() => markNotificationAsRead(n.id)}>
                    <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      View
                    </Button>
                  </Link>
                )}
                {!n.read && (
                  <button
                    onClick={() => markNotificationAsRead(n.id)}
                    className="p-1 text-xs text-mauve-400 hover:text-roseGold-700"
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
