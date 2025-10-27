export interface WalletBalance {
  available: number;
  pending: number;
  total: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progress: number;
  dueDate: string;
}

export interface Loan {
  id: string;
  type: string;
  amount: number;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  nextDueDate: string;
  status: 'active' | 'pending' | 'completed';
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  change: number;
}

export interface FinancialHealth {
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  factors: {
    creditUtilization: number;
    paymentHistory: number;
    savingsRate: number;
    debtToIncome: number;
  };
}

export interface GroupSavings {
  groupName: string;
  totalMembers: number;
  yourPosition: number;
  nextContribution: number;
  contributionDate: string;
  totalPool: number;
}