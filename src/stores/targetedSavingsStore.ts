import { create } from 'zustand';
import { SavingsGoal, SavingsTransaction, ContributionSchedule } from '../types/targetedSavings';

interface TargetedSavingsState {
  goals: SavingsGoal[];
  transactions: SavingsTransaction[];
  activeGoal: SavingsGoal | null;
  isCreatingGoal: boolean;
  currentStep: number;
  goalForm: Partial<SavingsGoal>;
  
  // Actions
  setActiveGoal: (goal: SavingsGoal | null) => void;
  setIsCreatingGoal: (creating: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateGoalForm: (updates: Partial<SavingsGoal>) => void;
  resetGoalForm: () => void;
  addGoal: (goal: SavingsGoal) => void;
  updateGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteGoal: (id: string) => void;
  addTransaction: (transaction: SavingsTransaction) => void;
  getGoalTransactions: (goalId: string) => SavingsTransaction[];
}

export const useTargetedSavingsStore = create<TargetedSavingsState>((set, get) => ({
  goals: [
    {
      id: '1',
      name: 'School Fees',
      description: 'Saving for next semester tuition fees',
      targetAmount: 15000,
      currentAmount: 8500,
      duration: 12,
      frequency: 'monthly',
      fundingSource: 'payroll',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      withdrawalRule: 'maturity',
      bonusRate: 5,
      status: 'active',
      createdAt: '2024-01-01',
      progress: 56.7,
      expectedMaturityBalance: 15750,
      contributionAmount: 1250
    },
    {
      id: '2',
      name: 'Business Capital',
      description: 'Startup capital for my online business',
      targetAmount: 25000,
      currentAmount: 12000,
      duration: 18,
      frequency: 'monthly',
      fundingSource: 'wallet',
      startDate: '2023-10-01',
      endDate: '2025-04-01',
      withdrawalRule: 'maturity',
      bonusRate: 10,
      status: 'active',
      createdAt: '2023-10-01',
      progress: 48,
      expectedMaturityBalance: 27500,
      contributionAmount: 1389
    },
    {
      id: '3',
      name: 'Holiday Saver',
      description: 'Summer vacation fund',
      targetAmount: 8000,
      currentAmount: 6200,
      duration: 8,
      frequency: 'weekly',
      fundingSource: 'momo',
      startDate: '2023-12-01',
      endDate: '2024-08-01',
      withdrawalRule: 'anytime',
      bonusRate: 2,
      status: 'active',
      createdAt: '2023-12-01',
      progress: 77.5,
      expectedMaturityBalance: 8000,
      contributionAmount: 250
    }
  ],
  
  transactions: [
    {
      id: 'txn1',
      goalId: '1',
      date: '2024-01-31',
      time: '09:00 AM',
      type: 'contribution',
      source: 'Payroll Debit',
      amount: 1250,
      transactionId: 'TXN001234567',
      runningBalance: 1250
    },
    {
      id: 'txn2',
      goalId: '1',
      date: '2024-02-29',
      time: '09:00 AM',
      type: 'contribution',
      source: 'Payroll Debit',
      amount: 1250,
      transactionId: 'TXN001234568',
      runningBalance: 2500
    },
    {
      id: 'txn3',
      goalId: '2',
      date: '2024-01-15',
      time: '02:30 PM',
      type: 'contribution',
      source: 'Smiggle Wallet',
      amount: 1389,
      transactionId: 'TXN001234569',
      runningBalance: 5556
    }
  ],
  
  activeGoal: null,
  isCreatingGoal: false,
  currentStep: 1,
  goalForm: {},
  
  setActiveGoal: (goal) => set({ activeGoal: goal }),
  setIsCreatingGoal: (creating) => set({ isCreatingGoal: creating, currentStep: creating ? 1 : 0 }),
  setCurrentStep: (step) => set({ currentStep: step }),
  updateGoalForm: (updates) => set((state) => ({ goalForm: { ...state.goalForm, ...updates } })),
  resetGoalForm: () => set({ goalForm: {}, currentStep: 1 }),
  
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (id, updates) => set((state) => ({
    goals: state.goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal)
  })),
  deleteGoal: (id) => set((state) => ({
    goals: state.goals.filter(goal => goal.id !== id)
  })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction]
  })),
  
  getGoalTransactions: (goalId) => {
    return get().transactions.filter(t => t.goalId === goalId);
  }
}));