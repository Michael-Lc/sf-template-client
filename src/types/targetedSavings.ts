export interface SavingsGoal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  duration: number; // in months
  frequency: 'daily' | 'weekly' | 'monthly';
  fundingSource: 'payroll' | 'wallet' | 'momo' | 'card';
  startDate: string;
  endDate: string;
  withdrawalRule: 'maturity' | 'anytime';
  bonusRate: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  progress: number;
  expectedMaturityBalance: number;
  contributionAmount: number;
}

export interface SavingsTransaction {
  id: string;
  goalId: string;
  date: string;
  time: string;
  type: 'contribution' | 'withdrawal' | 'bonus' | 'penalty';
  source: string;
  amount: number;
  transactionId: string;
  runningBalance: number;
}

export interface ContributionSchedule {
  date: string;
  amount: number;
  runningTotal: number;
  status: 'pending' | 'completed' | 'missed';
}

export const PREDEFINED_PLANS = [
  'School Fees',
  'House Rent', 
  'Gadget Purchase',
  'Business Capital',
  'Holiday Saver'
];

export const FUNDING_SOURCES = [
  {
    id: 'payroll',
    name: 'Payroll Debit',
    description: 'Automatic deduction from your salary before it reaches your account'
  },
  {
    id: 'wallet',
    name: 'Smiggle Wallet',
    description: 'Deduct from your available Smiggle Wallet balance'
  },
  {
    id: 'momo',
    name: 'Auto Momo Debit',
    description: 'Automatic mobile money deduction from your linked account'
  },
  {
    id: 'card',
    name: 'Recurring Card Debit',
    description: 'Automatic deduction from your linked bank card via Stanbic API'
  }
];

export const BONUS_RATE_TIERS = [
  { minMonths: 0, maxMonths: 6, rate: 2 },
  { minMonths: 6, maxMonths: 12, rate: 5 },
  { minMonths: 12, maxMonths: 24, rate: 10 },
  { minMonths: 24, maxMonths: 36, rate: 20 },
  { minMonths: 36, maxMonths: 48, rate: 30 },
  { minMonths: 48, maxMonths: 60, rate: 35 }
];

export function getBonusRate(months: number): number {
  const tier = BONUS_RATE_TIERS.find(t => months > t.minMonths && months <= t.maxMonths);
  return tier ? tier.rate : 0;
}

export function calculateMaturityBalance(
  targetAmount: number,
  bonusRate: number,
  withdrawalRule: string
): number {
  if (withdrawalRule === 'maturity') {
    return targetAmount + (targetAmount * bonusRate / 100);
  }
  return targetAmount;
}