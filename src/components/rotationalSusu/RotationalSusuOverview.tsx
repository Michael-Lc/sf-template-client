import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ViewToggle } from '@/components/ui/view-toggle';
import { Filters } from '@/components/ui/filters';
import { Users, Plus, RotateCcw, Calendar, DollarSign, Settings, FileText } from 'lucide-react';
import { useRotationalSusuStore } from '@/stores/rotationalSusuStore';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function RotationalSusuOverview() {
  const { groups, setIsCreatingGroup, setActiveGroup } = useRotationalSusuStore();
  
  const [view, setView] = useState<'card' | 'table'>(() => {
    return (localStorage.getItem('rotationalSusuView') as 'card' | 'table') || 'card';
  });
  
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    fundingSource: ''
  });

  useEffect(() => {
    localStorage.setItem('rotationalSusuView', view);
  }, [view]);
  
  const activeGroups = groups.filter(group => group.status === 'active');
  const pendingGroups = groups.filter(group => group.status === 'pending');
  const totalBalance = activeGroups.reduce((sum, group) => sum + group.totalBalance, 0);
  const totalMembers = activeGroups.reduce((sum, group) => sum + group.members.length, 0);

  // Filter groups based on filters
  const filteredGroups = groups.filter(group => {
    if (filters.status && group.status !== filters.status) return false;
    if (filters.startDate && group.createdAt < filters.startDate) return false;
    if (filters.endDate && group.createdAt > filters.endDate) return false;
    return true;
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' }
  ];

  const fundingSourceOptions = [
    { value: 'payroll', label: 'Payroll Debit' },
    { value: 'wallet', label: 'Smiggle Wallet' },
    { value: 'momo', label: 'Mobile Money' },
    { value: 'card', label: 'Bank Card' }
  ];

  const resetFilters = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: '',
      fundingSource: ''
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'paused': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rotational Susu</h2>
          <p className="text-gray-600">Group savings with automated rotation and payouts</p>
        </div>
        <button
          onClick={() => setIsCreatingGroup(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Groups</h3>
              <p className="text-sm text-gray-600">{activeGroups.length} groups running</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-700">{activeGroups.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total active</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Balance</h3>
              <p className="text-sm text-gray-600">Across all groups</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">{formatCurrency(totalBalance)}</p>
            <p className="text-sm text-gray-600 mt-1">Group funds</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Members</h3>
              <p className="text-sm text-gray-600">Across all groups</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700">{totalMembers}</p>
            <p className="text-sm text-gray-600 mt-1">Active members</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending Groups</h3>
              <p className="text-sm text-gray-600">Awaiting confirmation</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-700">{pendingGroups.length}</p>
            <p className="text-sm text-gray-600 mt-1">Need action</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        onResetFilters={resetFilters}
        statusOptions={statusOptions}
        fundingSourceOptions={fundingSourceOptions}
      />

      {/* View Toggle */}
      <div className="flex justify-end">
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Groups List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Groups</h3>
        
        {filteredGroups.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Groups Found</h3>
            <p className="text-gray-600 mb-6">
              {Object.values(filters).some(v => v) 
                ? "No groups match your current filters. Try adjusting your search criteria."
                : "Create your first rotational susu group to start saving together"
              }
            </p>
            <button
              onClick={() => setIsCreatingGroup(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Create New Group
            </button>
          </Card>
        ) : view === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <Card 
                key={group.id} 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveGroup(group)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                  <Badge className={getStatusColor(group.status)}>
                    {group.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Members</p>
                    <p className="text-lg font-bold text-gray-900">{group.members.length}/{group.maxMembers}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Contribution</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(group.contributionAmount)}</p>
                  </div>
                </div>

                {group.status === 'active' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Cycle Progress</span>
                      <span className="text-gray-600">Round {group.currentRound}/{group.members.length}</span>
                    </div>
                    <Progress value={(group.currentRound / group.members.length) * 100} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{formatCurrency(group.totalBalance)} balance</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Group Name</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Members</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Contribution</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Frequency</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Rotation Status</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Next Payout</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Duration</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGroups.map((group) => (
                    <tr 
                      key={group.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setActiveGroup(group)}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{group.name}</p>
                          <p className="text-xs text-gray-500">{group.description}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {group.members.length}/{group.maxMembers}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(group.contributionAmount)}
                      </td>
                      <td className="px-4 py-3 text-center capitalize text-gray-600">
                        {group.savingsFrequency}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {group.status === 'active' ? `Round ${group.currentRound}/${group.members.length}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {group.nextPayoutDate ? new Date(group.nextPayoutDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {group.durationPerRound} weeks
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getStatusColor(group.status)}>
                          {group.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Management</h3>
          <p className="text-gray-600">Manage your rotational susu groups and generate reports</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Group Settings</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            <FileText className="w-4 h-4" />
            <span>Generate Reports</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            <Users className="w-4 h-4" />
            <span>Invite Members</span>
          </button>
        </div>
      </Card>
    </div>
  );
}