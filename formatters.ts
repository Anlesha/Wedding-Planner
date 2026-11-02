/**
 * Indian Rupee currency formatter
 * Example: 1500000 -> ₹15,00,000
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compact Indian currency formatting (Lakhs & Crores)
 * Example: 1500000 -> ₹15 Lakh | 15000000 -> ₹1.5 Cr
 */
export function formatCompactINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, '')} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `₹${amount}`;
}

/**
 * Format date string to display friendly (e.g. 15 Dec 2026)
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Calculate countdown days until wedding
 */
export function getDaysRemaining(targetDateStr: string): { days: number; isPast: boolean; label: string } {
  if (!targetDateStr) return { days: 0, isPast: false, label: 'Date not set' };
  const target = new Date(targetDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { days: Math.abs(diffDays), isPast: true, label: `${Math.abs(diffDays)} days ago` };
  }
  if (diffDays === 0) {
    return { days: 0, isPast: false, label: 'Today is the day! 💍' };
  }
  return { days: diffDays, isPast: false, label: `${diffDays} days left` };
}

/**
 * Calculate percentage safely
 */
export function calculatePercentage(part: number, total: number): number {
  if (!total || total <= 0) return 0;
  const p = Math.round((part / total) * 100);
  return Math.min(Math.max(p, 0), 100);
}

/**
 * Calculate complete wedding budget metrics
 */
export function calculateBudgetSummary(
  totalBudget: number,
  expenses: { estimatedCost: number; actualCost: number; paidAmount: number }[]
) {
  const totalEstimated = expenses.reduce((sum, e) => sum + (e.estimatedCost || 0), 0);
  const totalActual = expenses.reduce((sum, e) => sum + (e.actualCost || 0), 0);
  const totalPaid = expenses.reduce((sum, e) => sum + (e.paidAmount || 0), 0);
  const committed = Math.max(totalEstimated, totalActual);
  const remainingBudget = totalBudget - committed;
  const isOverBudget = committed > totalBudget;

  return {
    totalBudget,
    totalEstimated,
    totalActual,
    totalPaid,
    committed,
    remainingBudget,
    isOverBudget,
    utilizationPercentage: totalBudget > 0 ? Math.round((committed / totalBudget) * 100) : 0,
  };
}

