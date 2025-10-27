export interface TargetSaving {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progress: number;
  dueDate: string;
  category: string;
  monthlyContribution: number;
  status: 'active' | 'completed' | 'paused';
}

export interface GroupMembership {
  groupId: string;
  groupName: string;
  totalMembers: number;
  yourContribution: number;
  totalContributions: number;
  contributionRate: number;
  status: 'active' | 'pending' | 'completed';
  nextMeeting: string;
}

export interface RotationalSusu {
  id: string;
  groupName: string;
  totalMembers: number;
  currentPosition: number;
  yourPosition: number;
  monthlyContribution: number;
  lastPayoutDate: string;
  nextPayoutDate: string;
  totalPayout: number;
  status: 'active' | 'waiting' | 'completed';
  cycle: number;
}

export interface MonthlySavingsData {
  month: string;
  successRate: number;
  targetAmount: number;
  actualAmount: number;
  deductionCount: number;
  totalDeductions: number;
}

export interface InterestReward {
  type: 'interest' | 'reward';
  amount: number;
  source: string;
  earnedDate: string;
  description: string;
}

export interface SavingsInsight {
  totalSavings: number;
  monthlyGrowth: number;
  averageConsistency: number;
  totalInterestEarned: number;
  totalRewardPoints: number;
  activeTargets: number;
  activeGroups: number;
  activeSusuGroups: number;
}