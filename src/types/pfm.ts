export interface Budget {
  id: string;
  name: string;
  month: string; // YYYY-MM format
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
  status: 'active' | 'completed' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color: string;
  icon: string;
  subcategories?: BudgetSubcategory[];
  alertThreshold: number; // percentage (e.g., 80 for 80%)
  status: 'safe' | 'warning' | 'exceeded';
}

export interface BudgetSubcategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  parentCategoryId: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  categoryId: string;
  subcategoryId?: string;
  paymentSource: 'wallet' | 'card' | 'cash' | 'momo';
  transactionId: string;
  receiptUrl?: string;
  isAutoSynced: boolean;
  tags: string[];
  notes?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  isCustom: boolean;
  parentId?: string;
  subcategories: ExpenseCategory[];
  budgetAmount?: number;
  alertThreshold: number;
}

export interface FinancialSummary {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number;
  budgetUtilization: number;
  topExpenseCategories: {
    categoryId: string;
    categoryName: string;
    amount: number;
    percentage: number;
  }[];
}

export interface BudgetAlert {
  id: string;
  type: 'warning' | 'exceeded' | 'monthly_review';
  categoryId?: string;
  categoryName?: string;
  message: string;
  threshold?: number;
  currentAmount: number;
  budgetAmount: number;
  createdAt: string;
  isRead: boolean;
}

export const PREDEFINED_CATEGORIES: ExpenseCategory[] = [
  {
    id: 'food',
    name: 'Food & Groceries',
    color: '#10B981',
    icon: '🍽️',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'groceries', name: 'Groceries', color: '#10B981', icon: '🛒', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'restaurants', name: 'Restaurants', color: '#10B981', icon: '🍴', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'takeout', name: 'Takeout', color: '#10B981', icon: '🥡', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'transport',
    name: 'Transport',
    color: '#3B82F6',
    icon: '🚗',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'fuel', name: 'Fuel', color: '#3B82F6', icon: '⛽', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'public_transport', name: 'Public Transport', color: '#3B82F6', icon: '🚌', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'taxi_uber', name: 'Taxi/Uber', color: '#3B82F6', icon: '🚕', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities',
    color: '#F59E0B',
    icon: '💡',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'electricity', name: 'Electricity', color: '#F59E0B', icon: '⚡', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'water', name: 'Water', color: '#F59E0B', icon: '💧', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'internet', name: 'Internet', color: '#F59E0B', icon: '📶', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'housing',
    name: 'Rent & Accommodation',
    color: '#8B5CF6',
    icon: '🏠',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'rent', name: 'Rent', color: '#8B5CF6', icon: '🏠', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'maintenance', name: 'Maintenance', color: '#8B5CF6', icon: '🔧', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    color: '#EF4444',
    icon: '📚',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'tuition', name: 'Tuition', color: '#EF4444', icon: '🎓', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'books', name: 'Books & Materials', color: '#EF4444', icon: '📖', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#06B6D4',
    icon: '🏥',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'medical', name: 'Medical', color: '#06B6D4', icon: '💊', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'insurance', name: 'Insurance', color: '#06B6D4', icon: '🛡️', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: '#EC4899',
    icon: '🎬',
    isCustom: false,
    alertThreshold: 80,
    subcategories: [
      { id: 'movies', name: 'Movies', color: '#EC4899', icon: '🎥', isCustom: false, alertThreshold: 80, subcategories: [] },
      { id: 'games', name: 'Games', color: '#EC4899', icon: '🎮', isCustom: false, alertThreshold: 80, subcategories: [] }
    ]
  },
  {
    id: 'others',
    name: 'Others',
    color: '#6B7280',
    icon: '📦',
    isCustom: false,
    alertThreshold: 80,
    subcategories: []
  }
];

export const PAYMENT_SOURCES = [
  { id: 'wallet', name: 'Smiggle Wallet', icon: '💳' },
  { id: 'card', name: 'Bank Card', icon: '💳' },
  { id: 'cash', name: 'Cash', icon: '💵' },
  { id: 'momo', name: 'Mobile Money', icon: '📱' }
];