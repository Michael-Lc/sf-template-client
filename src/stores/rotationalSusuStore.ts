import { create } from 'zustand';
import { SusuGroup, SusuMember, SusuContribution, SusuPayout, SusuReport } from '../types/rotationalSusu';

interface RotationalSusuState {
  // Groups
  groups: SusuGroup[];
  activeGroup: SusuGroup | null;
  userGroups: SusuGroup[];
  
  // Contributions & Payouts
  contributions: SusuContribution[];
  payouts: SusuPayout[];
  reports: SusuReport[];
  
  // UI State
  isCreatingGroup: boolean;
  currentStep: number;
  groupForm: Partial<SusuGroup>;
  selectedMembers: SusuMember[];
  
  // Actions
  setActiveGroup: (group: SusuGroup | null) => void;
  setIsCreatingGroup: (creating: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateGroupForm: (updates: Partial<SusuGroup>) => void;
  resetGroupForm: () => void;
  
  // Group Management
  createGroup: (group: SusuGroup) => void;
  updateGroup: (id: string, updates: Partial<SusuGroup>) => void;
  deleteGroup: (id: string) => void;
  
  // Member Management
  addMember: (groupId: string, member: SusuMember) => void;
  removeMember: (groupId: string, memberId: string) => void;
  updateMember: (groupId: string, memberId: string, updates: Partial<SusuMember>) => void;
  confirmMembership: (groupId: string, memberId: string) => void;
  
  // Contributions
  addContribution: (contribution: SusuContribution) => void;
  updateContribution: (id: string, updates: Partial<SusuContribution>) => void;
  getGroupContributions: (groupId: string) => SusuContribution[];
  
  // Payouts
  addPayout: (payout: SusuPayout) => void;
  updatePayout: (id: string, updates: Partial<SusuPayout>) => void;
  getGroupPayouts: (groupId: string) => SusuPayout[];
  
  // Reports
  generateReport: (groupId: string, type: 'savings' | 'payout' | 'penalty') => SusuReport;
  exportReport: (reportId: string, format: 'excel' | 'pdf') => void;
}

export const useRotationalSusuStore = create<RotationalSusuState>((set, get) => ({
  // Initial State
  groups: [
    {
      id: '1',
      name: 'Tech Team Savings Circle',
      description: 'Monthly savings group for the tech department',
      adminId: 'user1',
      adminName: 'John Doe',
      organizationId: 'org1',
      status: 'active',
      createdAt: '2024-01-01',
      durationPerRound: 4,
      savingsFrequency: 'monthly',
      contributionAmount: 500,
      hasPenaltyPolicy: true,
      penaltyDaysAfter: 3,
      penaltyRate: 5,
      currentCycle: 1,
      currentRound: 3,
      startDate: '2024-01-01',
      nextPayoutDate: '2024-04-01',
      maxMembers: 8,
      totalBalance: 12000,
      members: [
        {
          id: 'm1',
          userId: 'user1',
          name: 'John Doe',
          email: 'john@company.com',
          phone: '+233123456789',
          rotationOrder: 1,
          fundingSource: 'payroll',
          status: 'active',
          joinedAt: '2024-01-01',
          totalContributed: 1500,
          missedPayments: 0,
          penaltiesOwed: 0,
          hasReceivedPayout: true,
          payoutDate: '2024-01-01',
          payoutAmount: 4000
        },
        {
          id: 'm2',
          userId: 'user2',
          name: 'Jane Smith',
          email: 'jane@company.com',
          phone: '+233123456790',
          rotationOrder: 2,
          fundingSource: 'wallet',
          status: 'active',
          joinedAt: '2024-01-01',
          totalContributed: 1500,
          missedPayments: 0,
          penaltiesOwed: 0,
          hasReceivedPayout: true,
          payoutDate: '2024-02-01',
          payoutAmount: 4000
        },
        {
          id: 'm3',
          userId: 'user3',
          name: 'Mike Johnson',
          email: 'mike@company.com',
          phone: '+233123456791',
          rotationOrder: 3,
          fundingSource: 'momo',
          status: 'active',
          joinedAt: '2024-01-01',
          totalContributed: 1500,
          missedPayments: 0,
          penaltiesOwed: 0,
          hasReceivedPayout: false
        }
      ]
    },
    {
      id: '2',
      name: 'Marketing Department Fund',
      description: 'Weekly savings for marketing team events',
      adminId: 'user4',
      adminName: 'Sarah Wilson',
      organizationId: 'org1',
      status: 'pending',
      createdAt: '2024-02-01',
      durationPerRound: 2,
      savingsFrequency: 'weekly',
      contributionAmount: 100,
      hasPenaltyPolicy: false,
      currentCycle: 1,
      currentRound: 1,
      maxMembers: 6,
      totalBalance: 0,
      members: [
        {
          id: 'm4',
          userId: 'user4',
          name: 'Sarah Wilson',
          email: 'sarah@company.com',
          phone: '+233123456792',
          rotationOrder: 1,
          fundingSource: 'card',
          status: 'confirmed',
          joinedAt: '2024-02-01',
          totalContributed: 0,
          missedPayments: 0,
          penaltiesOwed: 0,
          hasReceivedPayout: false
        }
      ]
    }
  ],
  
  activeGroup: null,
  userGroups: [],
  contributions: [
    {
      id: 'c1',
      groupId: '1',
      memberId: 'm1',
      memberName: 'John Doe',
      amount: 500,
      dueDate: '2024-03-01',
      paidDate: '2024-03-01',
      status: 'paid',
      fundingSource: 'Payroll Debit',
      transactionId: 'TXN123456789',
      cycle: 1,
      round: 3
    },
    {
      id: 'c2',
      groupId: '1',
      memberId: 'm2',
      memberName: 'Jane Smith',
      amount: 500,
      dueDate: '2024-03-01',
      paidDate: '2024-03-01',
      status: 'paid',
      fundingSource: 'Smiggle Wallet',
      transactionId: 'TXN123456790',
      cycle: 1,
      round: 3
    },
    {
      id: 'c3',
      groupId: '1',
      memberId: 'm3',
      memberName: 'Mike Johnson',
      amount: 500,
      dueDate: '2024-03-01',
      status: 'pending',
      fundingSource: 'Auto Momo Debit',
      cycle: 1,
      round: 3
    }
  ],
  
  payouts: [
    {
      id: 'p1',
      groupId: '1',
      recipientId: 'm1',
      recipientName: 'John Doe',
      amount: 4000,
      payoutDate: '2024-01-01',
      cycle: 1,
      rotationOrder: 1,
      status: 'paid',
      transactionId: 'PAY123456789'
    },
    {
      id: 'p2',
      groupId: '1',
      recipientId: 'm2',
      recipientName: 'Jane Smith',
      amount: 4000,
      payoutDate: '2024-02-01',
      cycle: 1,
      rotationOrder: 2,
      status: 'paid',
      transactionId: 'PAY123456790'
    }
  ],
  
  reports: [],
  
  // UI State
  isCreatingGroup: false,
  currentStep: 1,
  groupForm: {},
  selectedMembers: [],
  
  // Actions
  setActiveGroup: (group) => set({ activeGroup: group }),
  setIsCreatingGroup: (creating) => set({ isCreatingGroup: creating, currentStep: creating ? 1 : 0 }),
  setCurrentStep: (step) => set({ currentStep: step }),
  updateGroupForm: (updates) => set((state) => ({ groupForm: { ...state.groupForm, ...updates } })),
  resetGroupForm: () => set({ groupForm: {}, currentStep: 1, selectedMembers: [] }),
  
  // Group Management
  createGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  updateGroup: (id, updates) => set((state) => ({
    groups: state.groups.map(group => group.id === id ? { ...group, ...updates } : group)
  })),
  deleteGroup: (id) => set((state) => ({
    groups: state.groups.filter(group => group.id !== id)
  })),
  
  // Member Management
  addMember: (groupId, member) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === groupId 
        ? { ...group, members: [...group.members, member] }
        : group
    )
  })),
  
  removeMember: (groupId, memberId) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === groupId 
        ? { ...group, members: group.members.filter(m => m.id !== memberId) }
        : group
    )
  })),
  
  updateMember: (groupId, memberId, updates) => set((state) => ({
    groups: state.groups.map(group => 
      group.id === groupId 
        ? { 
            ...group, 
            members: group.members.map(member => 
              member.id === memberId ? { ...member, ...updates } : member
            )
          }
        : group
    )
  })),
  
  confirmMembership: (groupId, memberId) => {
    get().updateMember(groupId, memberId, { status: 'confirmed' });
  },
  
  // Contributions
  addContribution: (contribution) => set((state) => ({
    contributions: [...state.contributions, contribution]
  })),
  
  updateContribution: (id, updates) => set((state) => ({
    contributions: state.contributions.map(contrib => 
      contrib.id === id ? { ...contrib, ...updates } : contrib
    )
  })),
  
  getGroupContributions: (groupId) => {
    return get().contributions.filter(contrib => contrib.groupId === groupId);
  },
  
  // Payouts
  addPayout: (payout) => set((state) => ({
    payouts: [...state.payouts, payout]
  })),
  
  updatePayout: (id, updates) => set((state) => ({
    payouts: state.payouts.map(payout => 
      payout.id === id ? { ...payout, ...updates } : payout
    )
  })),
  
  getGroupPayouts: (groupId) => {
    return get().payouts.filter(payout => payout.groupId === groupId);
  },
  
  // Reports
  generateReport: (groupId, type) => {
    const group = get().groups.find(g => g.id === groupId);
    if (!group) throw new Error('Group not found');
    
    const report: SusuReport = {
      groupId,
      groupName: group.name,
      reportType: type,
      generatedAt: new Date().toISOString(),
      data: [],
      totalAmount: 0,
      period: {
        startDate: group.startDate || '',
        endDate: new Date().toISOString().split('T')[0]
      }
    };
    
    switch (type) {
      case 'savings':
        report.data = get().getGroupContributions(groupId);
        report.totalAmount = report.data.reduce((sum: number, contrib: any) => sum + contrib.amount, 0);
        break;
      case 'payout':
        report.data = get().getGroupPayouts(groupId);
        report.totalAmount = report.data.reduce((sum: number, payout: any) => sum + payout.amount, 0);
        break;
      case 'penalty':
        report.data = get().getGroupContributions(groupId).filter((contrib: any) => contrib.penaltyAmount > 0);
        report.totalAmount = report.data.reduce((sum: number, contrib: any) => sum + (contrib.penaltyAmount || 0), 0);
        break;
    }
    
    set((state) => ({ reports: [...state.reports, report] }));
    return report;
  },
  
  exportReport: (reportId, format) => {
    const report = get().reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Simulate export functionality
    console.log(`Exporting report ${reportId} as ${format}`);
    // In a real app, this would trigger file download
  }
}));