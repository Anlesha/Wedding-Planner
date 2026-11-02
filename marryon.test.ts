import { describe, it, expect, beforeEach } from 'vitest';
import { formatINR, getDaysRemaining, calculateBudgetSummary } from '../utils/formatters';
import { storageService } from '../services/storageService';
import { Expense } from '../types';

describe('MarryOn Core Business Logic', () => {
  beforeEach(() => {
    storageService.resetDemoData();
  });

  describe('Indian Currency & Date Formatters', () => {
    it('formats Indian Rupee amounts correctly with symbol', () => {
      expect(formatINR(1000)).toContain('1,000');
      expect(formatINR(2500000)).toContain('25,00,000');
      expect(formatINR(0)).toContain('0');
    });

    it('calculates days remaining for upcoming wedding dates', () => {
      const futureDate = '2026-12-18';
      const result = getDaysRemaining(futureDate);
      expect(result).toHaveProperty('days');
      expect(result).toHaveProperty('label');
    });
  });

  describe('Budget Calculations & Overrun Detection', () => {
    it('calculates total planned, actual, and remaining budget', () => {
      const totalBudget = 2500000;
      const sampleExpenses: Expense[] = [
        {
          id: 'exp-1',
          weddingId: 'wed-1',
          title: 'Venue Deposit',
          category: 'Venue',
          estimatedCost: 1000000,
          actualCost: 1100000,
          paidAmount: 500000,
          dueDate: '2026-11-01',
          paymentStatus: 'partially_paid',
          createdAt: new Date().toISOString()
        },
        {
          id: 'exp-2',
          weddingId: 'wed-1',
          title: 'Photo Package',
          category: 'Photography',
          estimatedCost: 150000,
          actualCost: 150000,
          paidAmount: 150000,
          dueDate: '2026-11-15',
          paymentStatus: 'paid',
          createdAt: new Date().toISOString()
        }
      ];

      const summary = calculateBudgetSummary(totalBudget, sampleExpenses);
      expect(summary.totalBudget).toBe(2500000);
      expect(summary.totalEstimated).toBe(1150000);
      expect(summary.totalActual).toBe(1250000);
      expect(summary.totalPaid).toBe(650000);
      expect(summary.remainingBudget).toBe(1250000);
      expect(summary.isOverBudget).toBe(false);
    });

    it('correctly flags an over-budget status when expenses exceed limit', () => {
      const totalBudget = 500000;
      const sampleExpenses: Expense[] = [
        {
          id: 'exp-1',
          weddingId: 'wed-1',
          title: 'Luxury Venue',
          category: 'Venue',
          estimatedCost: 600000,
          actualCost: 650000,
          paidAmount: 200000,
          dueDate: '2026-11-01',
          paymentStatus: 'partially_paid',
          createdAt: new Date().toISOString()
        }
      ];

      const summary = calculateBudgetSummary(totalBudget, sampleExpenses);
      expect(summary.isOverBudget).toBe(true);
      expect(summary.remainingBudget).toBeLessThan(0);
    });
  });

  describe('Storage Service & Role Access', () => {
    it('loads default customer wedding data', () => {
      const wedding = storageService.getWedding();
      expect(wedding.coupleNames).toBe('Aarav & Meera');
      expect(wedding.city).toBe('Pune');
      expect(wedding.totalBudget).toBe(2500000);
    });

    it('manages task creation, status updates, and deletion', () => {
      const initialCount = storageService.getTasks().length;
      const newTask = storageService.addTask({
        weddingId: 'wed-001',
        title: 'Book Sangeet Choreographer',
        category: 'Music & DJ',
        dueDate: '2026-10-30',
        priority: 'high',
        status: 'todo'
      });

      expect(storageService.getTasks().length).toBe(initialCount + 1);

      storageService.updateTask(newTask.id, { status: 'completed' });
      const updated = storageService.getTasks().find(t => t.id === newTask.id);
      expect(updated?.status).toBe('completed');

      storageService.deleteTask(newTask.id);
      expect(storageService.getTasks().length).toBe(initialCount);
    });

    it('handles verification workflow and assigns Verified Partner badge', () => {
      const pendingRequests = storageService.getVerifications();
      expect(pendingRequests.length).toBeGreaterThan(0);

      const targetReq = pendingRequests[0];
      storageService.reviewVerification(
        targetReq.id,
        'verified',
        'Approved trade documentation in test suite',
        'TestAdmin'
      );

      const updatedVendor = storageService.getVendorById(targetReq.vendorId);
      expect(updatedVendor?.isVerified).toBe(true);
      expect(updatedVendor?.verificationStatus).toBe('verified');
    });

    it('records security audit trail entries upon administrative actions', () => {
      const initialLogs = storageService.getAuditLogs().length;
      storageService.addAuditLog({
        adminId: 'adm-001',
        adminName: 'TestAuditor',
        action: 'POLICY_TEST_RUN',
        target: 'System Unit Test',
        details: 'Automated verification check passed'
      });

      expect(storageService.getAuditLogs().length).toBe(initialLogs + 1);
    });
  });
});
