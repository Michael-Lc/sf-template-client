import { create } from 'zustand';
import { Budget, Transaction, ExpenseCategory, FinancialSummary, BudgetAlert, PREDEFINED_CATEGORIES } from '../types/pfm';

interface PFMState {
  // Data
  budgets: Budget[];
  transactions: Transaction[];
  categories: ExpenseCategory[];
  financialSummary: FinancialSummary[];
  alerts: BudgetAlert[];
  
  // UI State
  activeBudget: Budget | null;
  selectedMonth: string;
  selectedCategory: ExpenseCategory | null;
  isCreatingBudget: boolean;
  isEditingTransaction: boolean;
  selectedTransaction: Transaction | null;
  
  // Actions
  setActiveBudget: (budget: Budget | null) => void;
  setSelectedMonth: (month: string) => void;
  setSelectedCategory: (category: ExpenseCategory | null) => void;
  setIsCreatingBudget: (creating: boolean) => void;
  setIsEditingTransaction: (editing: boolean) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  
  // Budget Management
  createBudget: (budget: Budget) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getCurrentBudget: () => Budget | null;
  
  // Transaction Management
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionsByCategory: (categoryId: string, month?: string) => Transaction[];
  getTransactionsByMonth: (month: string) => Transaction[];
  
  // Category Management
  addCategory: (category: ExpenseCategory) => void;
  updateCategory: (id: string, updates: Partial<ExpenseCategory>) => void;
  deleteCategory: (id: string) => void;
  
  // Analytics
  generateFinancialSummary: (month: string) => FinancialSummary;
  getBudgetAlerts: () => BudgetAlert[];
  markAlertAsRead: (alertId: string) => void;
}

export const usePFMStore = create<PFMState>((set, get) => ({
  // Initial State
  budgets: [
    {
      id: '1',
      name: 'January 2024 Budget',
      month: '2024-01',
      totalBudget: 5000,
      totalSpent: 3850,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      categories: [
        {
          id: 'food',
          name: 'Food & Groceries',
          budgetAmount: 800,
          spentAmount: 650,
          color: '#10B981',
          icon: '🍽️',
          alertThreshold: 80,
          status: 'safe'
        },
        {
          id: 'transport',
          name: 'Transport',
          budgetAmount: 400,
          spentAmount: 380,
          color: '#3B82F6',
          icon: '🚗',
          alertThreshold: 80,
          status: 'warning'
        },
        {
          id: 'utilities',
          name: 'Utilities',
          budgetAmount: 300,
          spentAmount: 320,
          color: '#F59E0B',
          icon: '💡',
          alertThreshold: 80,
          status: 'exceeded'
        },
        {
          id: 'housing',
          name: 'Rent & Accommodation',
          budgetAmount: 1500,
          spentAmount: 1500,
          color: '#8B5CF6',
          icon: '🏠',
          alertThreshold: 80,
          status: 'safe'
        },
        {
          id: 'entertainment',
          name: 'Entertainment',
          budgetAmount: 200,
          spentAmount: 150,
          color: '#EC4899',
          icon: '🎬',
          alertThreshold: 80,
          status: 'safe'
        },
        {
          id: 'healthcare',
          name: 'Healthcare',
          budgetAmount: 250,
          spentAmount: 180,
          color: '#06B6D4',
          icon: '🏥',
          alertThreshold: 80,
          status: 'safe'
        },
        {
          id: 'education',
          name: 'Education',
          budgetAmount: 300,
          spentAmount: 270,
          color: '#EF4444',
          icon: '📚',
          alertThreshold: 80,
          status: 'safe'
        },
        {
          id: 'others',
          name: 'Others',
          budgetAmount: 250,
          spentAmount: 400,
          color: '#6B7280',
          icon: '📦',
          alertThreshold: 80,
          status: 'exceeded'
        }
      ]
    }
  ],
  
  transactions: [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Grocery shopping at Shoprite',
      amount: 120,
      categoryId: 'food',
      paymentSource: 'wallet',
      transactionId: 'TXN001234567',
      isAutoSynced: true,
      tags: ['groceries', 'weekly shopping']
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Uber ride to office',
      amount: 25,
      categoryId: 'transport',
      paymentSource: 'card',
      transactionId: 'TXN001234568',
      isAutoSynced: true,
      tags: ['commute', 'work']
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Electricity bill payment',
      amount: 85,
      categoryId: 'utilities',
      paymentSource: 'wallet',
      transactionId: 'TXN001234569',
      isAutoSynced: false,
      tags: ['bills', 'monthly']
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Netflix subscription',
      amount: 15,
      categoryId: 'entertainment',
      paymentSource: 'card',
      transactionId: 'TXN001234570',
      isAutoSynced: true,
      tags: ['subscription', 'streaming']
    },
    {
      id: '5',
      date: '2024-01-10',
      description: 'Doctor consultation',
      amount: 50,
      categoryId: 'healthcare',
      paymentSource: 'cash',
      transactionId: 'TXN001234571',
      isAutoSynced: false,
      tags: ['medical', 'consultation']
    }
  ],
  
  categories: PREDEFINED_CATEGORIES,
  
  financialSummary: [
    {
      month: '2024-01',
      totalIncome: 5500,
      totalExpenses: 3850,
      totalSavings: 1650,
      savingsRate: 30,
      budgetUtilization: 77,
      topExpenseCategories: [
        { categoryId: 'housing', categoryName: 'Rent & Accommodation', amount: 1500, percentage: 39 },
        { categoryId: 'food', categoryName: 'Food & Groceries', amount: 650, percentage: 17 },
        { categoryId: 'others', categoryName: 'Others', amount: 400, percentage: 10 },
        { categoryId: 'transport', categoryName: 'Transport', amount: 380, percentage: 10 },
        { categoryId: 'utilities', categoryName: 'Utilities', amount: 320, percentage: 8 }
      ]
    }
  ],
  
  alerts: [
    {
      id: '1',
      type: 'warning',
      categoryId: 'transport',
      categoryName: 'Transport',
      message: 'You have spent 95% of your Transport budget',
      threshold: 80,
      currentAmount: 380,
      budgetAmount: 400,
      createdAt: '2024-01-15T10:30:00Z',
      isRead: false
    },
    {
      id: '2',
      type: 'exceeded',
      categoryId: 'utilities',
      categoryName: 'Utilities',
      message: 'You have exceeded your Utilities budget by $20',
      currentAmount: 320,
      budgetAmount: 300,
      createdAt: '2024-01-14T15:45:00Z',
      isRead: false
    },
    {
      id: '3',
      type: 'exceeded',
      categoryId: 'others',
      categoryName: 'Others',
      message: 'You have exceeded your Others budget by $150',
      currentAmount: 400,
      budgetAmount: 250,
      createdAt: '2024-01-13T09:20:00Z',
      isRead: false
    }
  ],
  
  // UI State
  activeBudget: null,
  selectedMonth: '2024-01',
  selectedCategory: null,
  isCreatingBudget: false,
  isEditingTransaction: false,
  selectedTransaction: null,
  
  // Actions
  setActiveBudget: (budget) => set({ activeBudget: budget }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setIsCreatingBudget: (creating) => set({ isCreatingBudget: creating }),
  setIsEditingTransaction: (editing) => set({ isEditingTransaction: editing }),
  setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
  
  // Budget Management
  createBudget: (budget) => set((state) => ({ budgets: [...state.budgets, budget] })),
  updateBudget: (id, updates) => set((state) => ({
    budgets: state.budgets.map(budget => budget.id === id ? { ...budget, ...updates } : budget)
  })),
  deleteBudget: (id) => set((state) => ({
    budgets: state.budgets.filter(budget => budget.id !== id)
  })),
  getCurrentBudget: () => {
    const { budgets, selectedMonth } = get();
    return budgets.find(budget => budget.month === selectedMonth && budget.status === 'active') || null;
  },
  
  // Transaction Management
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction]
  })),
  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    )
  })),
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(transaction => transaction.id !== id)
  })),
  getTransactionsByCategory: (categoryId, month) => {
    const { transactions } = get();
    return transactions.filter(transaction => {
      const matchesCategory = transaction.categoryId === categoryId;
      const matchesMonth = month ? transaction.date.startsWith(month) : true;
      return matchesCategory && matchesMonth;
    });
  },
  getTransactionsByMonth: (month) => {
    const { transactions } = get();
    return transactions.filter(transaction => transaction.date.startsWith(month));
  },
  
  // Category Management
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, category]
  })),
  updateCategory: (id, updates) => set((state) => ({
    categories: state.categories.map(category => 
      category.id === id ? { ...category, ...updates } : category
    )
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(category => category.id !== id && !category.isCustom)
  })),
  
  // Analytics
  generateFinancialSummary: (month) => {
    const { transactions, budgets } = get();
    const monthTransactions = transactions.filter(t => t.date.startsWith(month));
    const monthBudget = budgets.find(b => b.month === month);
    
    const totalExpenses = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = 5500; // This would come from income tracking
    const totalSavings = totalIncome - totalExpenses;
    const savingsRate = (totalSavings / totalIncome) * 100;
    const budgetUtilization = monthBudget ? (totalExpenses / monthBudget.totalBudget) * 100 : 0;
    
    // Calculate top expense categories
    const categoryTotals = monthTransactions.reduce((acc, transaction) => {
      acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
    
    const topExpenseCategories = Object.entries(categoryTotals)
      .map(([categoryId, amount]) => {
        const category = get().categories.find(c => c.id === categoryId);
        return {
          categoryId,
          categoryName: category?.name || 'Unknown',
          amount,
          percentage: (amount / totalExpenses) * 100
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    
    return {
      month,
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsRate,
      budgetUtilization,
      topExpenseCategories
    };
  },
  
  getBudgetAlerts: () => {
    return get().alerts.filter(alert => !alert.isRead);
  },
  
  markAlertAsRead: (alertId) => set((state) => ({
    alerts: state.alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    )
  }))
}));