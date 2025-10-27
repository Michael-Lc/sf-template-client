import { create } from 'zustand';
import { WalletBalance, SavingsGoal, Loan, ExpenseCategory, FinancialHealth, GroupSavings } from '../types/finance';

interface FinanceState {
  walletBalance: WalletBalance;
  savingsGoals: SavingsGoal[];
  loans: Loan[];
  expenseCategories: ExpenseCategory[];
  financialHealth: FinancialHealth;
  groupSavings: GroupSavings[];
  creditScore: number;
  totalSavings: number;
}

export const useFinanceStore = create<FinanceState>(() => ({
  walletBalance: {
    available: 5847.23,
    pending: 320.50,
    total: 6167.73
  },
  creditScore: 742,
  totalSavings: 24580.00,
  financialHealth: {
    score: 8.2,
    status: 'good',
    factors: {
      creditUtilization: 0.23,
      paymentHistory: 0.98,
      savingsRate: 0.15,
      debtToIncome: 0.28
    }
  },
  savingsGoals: [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 15000,
      currentAmount: 8500,
      progress: 56.7,
      dueDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Vacation Fund',
      targetAmount: 5000,
      currentAmount: 2100,
      progress: 42,
      dueDate: '2024-08-15'
    },
    {
      id: '3',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 12000,
      progress: 48,
      dueDate: '2025-06-01'
    }
  ],
  loans: [
    {
      id: '1',
      type: 'Personal Loan',
      amount: 15000,
      balance: 8500,
      interestRate: 6.5,
      monthlyPayment: 285,
      nextDueDate: '2024-02-15',
      status: 'active'
    },
    {
      id: '2',
      type: 'Auto Loan',
      amount: 28000,
      balance: 15200,
      interestRate: 4.2,
      monthlyPayment: 480,
      nextDueDate: '2024-02-20',
      status: 'active'
    }
  ],
  expenseCategories: [
    { category: 'Housing', amount: 1850, percentage: 32, change: -2.1 },
    { category: 'Transportation', amount: 650, percentage: 11, change: 5.3 },
    { category: 'Food & Dining', amount: 520, percentage: 9, change: -1.8 },
    { category: 'Utilities', amount: 280, percentage: 5, change: 12.5 },
    { category: 'Entertainment', amount: 340, percentage: 6, change: -8.2 },
    { category: 'Healthcare', amount: 195, percentage: 3, change: 2.7 },
    { category: 'Shopping', amount: 480, percentage: 8, change: 15.4 },
    { category: 'Other', amount: 435, percentage: 8, change: -3.5 }
  ],
  groupSavings: [
    {
      groupName: 'Office Team Savings',
      totalMembers: 8,
      yourPosition: 3,
      nextContribution: 500,
      contributionDate: '2024-02-10',
      totalPool: 12400
    },
    {
      groupName: 'Family Investment Circle',
      totalMembers: 12,
      yourPosition: 7,
      nextContribution: 750,
      contributionDate: '2024-02-25',
      totalPool: 28500
    }
  ]
}));