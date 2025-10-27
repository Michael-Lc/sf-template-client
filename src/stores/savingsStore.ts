import { create } from 'zustand';
import { TargetSaving, GroupMembership, RotationalSusu, MonthlySavingsData, InterestReward, SavingsInsight } from '../types/savings';

interface SavingsState {
  savingsInsight: SavingsInsight;
  targetSavings: TargetSaving[];
  groupMemberships: GroupMembership[];
  rotationalSusu: RotationalSusu[];
  monthlySavingsData: MonthlySavingsData[];
  interestRewards: InterestReward[];
}

export const useSavingsStore = create<SavingsState>(() => ({
  savingsInsight: {
    totalSavings: 47850.00,
    monthlyGrowth: 12.5,
    averageConsistency: 87.3,
    totalInterestEarned: 2340.50,
    totalRewardPoints: 1250,
    activeTargets: 4,
    activeGroups: 3,
    activeSusuGroups: 2
  },
  targetSavings: [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 15000,
      currentAmount: 8500,
      progress: 56.7,
      dueDate: '2024-12-31',
      category: 'Emergency',
      monthlyContribution: 750,
      status: 'active'
    },
    {
      id: '2',
      name: 'Vacation Fund',
      targetAmount: 5000,
      currentAmount: 3200,
      progress: 64,
      dueDate: '2024-08-15',
      category: 'Lifestyle',
      monthlyContribution: 400,
      status: 'active'
    },
    {
      id: '3',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 12000,
      progress: 48,
      dueDate: '2025-06-01',
      category: 'Transportation',
      monthlyContribution: 850,
      status: 'active'
    },
    {
      id: '4',
      name: 'Home Down Payment',
      targetAmount: 50000,
      currentAmount: 18500,
      progress: 37,
      dueDate: '2026-03-01',
      category: 'Real Estate',
      monthlyContribution: 1200,
      status: 'active'
    }
  ],
  groupMemberships: [
    {
      groupId: '1',
      groupName: 'Office Savings Circle',
      totalMembers: 8,
      yourContribution: 2400,
      totalContributions: 19200,
      contributionRate: 12.5,
      status: 'active',
      nextMeeting: '2024-02-15'
    },
    {
      groupId: '2',
      groupName: 'Family Investment Group',
      totalMembers: 12,
      yourContribution: 3600,
      totalContributions: 43200,
      contributionRate: 8.3,
      status: 'active',
      nextMeeting: '2024-02-20'
    },
    {
      groupId: '3',
      groupName: 'Neighborhood Savings',
      totalMembers: 6,
      yourContribution: 1800,
      totalContributions: 10800,
      contributionRate: 16.7,
      status: 'active',
      nextMeeting: '2024-02-25'
    }
  ],
  rotationalSusu: [
    {
      id: '1',
      groupName: 'Tech Professionals Susu',
      totalMembers: 10,
      currentPosition: 3,
      yourPosition: 7,
      monthlyContribution: 500,
      lastPayoutDate: '2024-01-15',
      nextPayoutDate: '2024-07-15',
      totalPayout: 5000,
      status: 'active',
      cycle: 1
    },
    {
      id: '2',
      groupName: 'Community Builders Circle',
      totalMembers: 8,
      currentPosition: 5,
      yourPosition: 2,
      monthlyContribution: 750,
      lastPayoutDate: '2023-12-10',
      nextPayoutDate: '2024-04-10',
      totalPayout: 6000,
      status: 'waiting',
      cycle: 2
    }
  ],
  monthlySavingsData: [
    { month: 'Jul', successRate: 85, targetAmount: 2000, actualAmount: 1700, deductionCount: 17, totalDeductions: 20 },
    { month: 'Aug', successRate: 90, targetAmount: 2000, actualAmount: 1800, deductionCount: 18, totalDeductions: 20 },
    { month: 'Sep', successRate: 95, targetAmount: 2000, actualAmount: 1900, deductionCount: 19, totalDeductions: 20 },
    { month: 'Oct', successRate: 80, targetAmount: 2000, actualAmount: 1600, deductionCount: 16, totalDeductions: 20 },
    { month: 'Nov', successRate: 88, targetAmount: 2000, actualAmount: 1760, deductionCount: 17, totalDeductions: 20 },
    { month: 'Dec', successRate: 92, targetAmount: 2000, actualAmount: 1840, deductionCount: 18, totalDeductions: 20 },
    { month: 'Jan', successRate: 87, targetAmount: 2000, actualAmount: 1740, deductionCount: 17, totalDeductions: 20 }
  ],
  interestRewards: [
    {
      type: 'interest',
      amount: 125.50,
      source: 'Emergency Fund',
      earnedDate: '2024-01-31',
      description: 'Monthly interest on savings balance'
    },
    {
      type: 'reward',
      amount: 50,
      source: 'Consistency Bonus',
      earnedDate: '2024-01-31',
      description: 'Reward points for 90%+ savings consistency'
    },
    {
      type: 'interest',
      amount: 89.25,
      source: 'Vacation Fund',
      earnedDate: '2024-01-31',
      description: 'High-yield savings interest'
    },
    {
      type: 'reward',
      amount: 25,
      source: 'Goal Achievement',
      earnedDate: '2024-01-28',
      description: 'Milestone reward for reaching 50% of vacation goal'
    }
  ]
}));