export interface SusuGroup {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  adminName: string;
  organizationId: string;
  status: 'draft' | 'pending' | 'active' | 'paused' | 'completed';
  createdAt: string;
  
  // Group Settings
  durationPerRound: number; // weeks
  savingsFrequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
  contributionAmount: number;
  hasPenaltyPolicy: boolean;
  penaltyDaysAfter?: number;
  penaltyRate?: number;
  
  // Cycle Management
  currentCycle: number;
  currentRound: number;
  startDate?: string;
  nextPayoutDate?: string;
  
  // Members
  members: SusuMember[];
  maxMembers: number;
  totalBalance: number;
}

export interface SusuMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  rotationOrder: number;
  fundingSource: 'payroll' | 'wallet' | 'momo' | 'card';
  status: 'invited' | 'confirmed' | 'active' | 'defaulted';
  joinedAt: string;
  
  // Payment Tracking
  totalContributed: number;
  missedPayments: number;
  penaltiesOwed: number;
  lastPaymentDate?: string;
  hasReceivedPayout: boolean;
  payoutDate?: string;
  payoutAmount?: number;
}

export interface SusuContribution {
  id: string;
  groupId: string;
  memberId: string;
  memberName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'penalty';
  fundingSource: string;
  transactionId?: string;
  penaltyAmount?: number;
  cycle: number;
  round: number;
}

export interface SusuPayout {
  id: string;
  groupId: string;
  recipientId: string;
  recipientName: string;
  amount: number;
  payoutDate: string;
  cycle: number;
  rotationOrder: number;
  status: 'scheduled' | 'paid' | 'failed';
  transactionId?: string;
}

export interface SusuReport {
  groupId: string;
  groupName: string;
  reportType: 'savings' | 'payout' | 'penalty';
  generatedAt: string;
  data: any[];
  totalAmount: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export const DURATION_OPTIONS = [
  { value: 1, label: 'Every 1 week' },
  { value: 2, label: 'Every 2 weeks' },
  { value: 3, label: 'Every 3 weeks' },
  { value: 4, label: 'Every 4 weeks' },
  { value: 5, label: 'Every 5 weeks' },
  { value: 6, label: 'Every 6 weeks' },
  { value: 7, label: 'Every 7 weeks' },
  { value: 8, label: 'Every 8 weeks' }
];

export const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' }
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