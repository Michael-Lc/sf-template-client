import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Users, DollarSign, Calendar, Settings, FileText, Download, Mail, MessageCircle } from 'lucide-react';
import { useRotationalSusuStore } from '@/stores/rotationalSusuStore';
import { formatCurrency } from '@/lib/utils';

export function GroupDetailsModal() {
  const { activeGroup, setActiveGroup, getGroupContributions, getGroupPayouts, generateReport } = useRotationalSusuStore();
  
  if (!activeGroup) return null;

  const contributions = getGroupContributions(activeGroup.id);
  const payouts = getGroupPayouts(activeGroup.id);
  const cycleProgress = (activeGroup.currentRound / activeGroup.members.length) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'invited': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleGenerateReport = (type: 'savings' | 'payout' | 'penalty') => {
    const report = generateReport(activeGroup.id, type);
    console.log('Generated report:', report);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{activeGroup.name}</h2>
              <p className="text-gray-600">{activeGroup.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(activeGroup.status)}>
                {activeGroup.status}
              </Badge>
              <button
                onClick={() => setActiveGroup(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Group Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Members</p>
                  <p className="text-xs text-gray-500">{activeGroup.members.length} active</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-700">{activeGroup.members.length}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Balance</p>
                  <p className="text-xs text-gray-500">Group funds</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(activeGroup.totalBalance)}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Round</p>
                  <p className="text-xs text-gray-500">Cycle {activeGroup.currentCycle}</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700">{activeGroup.currentRound}/{activeGroup.members.length}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Contribution</p>
                  <p className="text-xs text-gray-500 capitalize">{activeGroup.savingsFrequency}</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-700">{formatCurrency(activeGroup.contributionAmount)}</p>
            </Card>
          </div>

          {/* Cycle Progress */}
          {activeGroup.status === 'active' && (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">Cycle Progress</h3>
                  <p className="text-sm text-purple-700">Round {activeGroup.currentRound} of {activeGroup.members.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-700">Next Payout</p>
                  <p className="text-lg font-bold text-purple-900">
                    {activeGroup.nextPayoutDate ? new Date(activeGroup.nextPayoutDate).toLocaleDateString() : 'TBD'}
                  </p>
                </div>
              </div>
              <Progress value={cycleProgress} className="h-3 mb-2" />
              <p className="text-sm text-purple-600">{cycleProgress.toFixed(1)}% complete</p>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="py-2 px-1 border-b-2 border-purple-500 text-purple-600 font-medium text-sm">
                  Members
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                  Contributions
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                  Payouts
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                  Reports
                </button>
              </nav>
            </div>
          </div>

          {/* Members Table */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Group Members</h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Invite Members</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Group Chat</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Member</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Rotation Order</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Total Contributed</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Funding Source</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Payout Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeGroup.members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline">#{member.rotationOrder}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(member.totalContributed)}
                      </td>
                      <td className="px-4 py-3 text-center capitalize text-gray-600">
                        {member.fundingSource}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {member.hasReceivedPayout ? (
                          <Badge className="bg-green-100 text-green-700">
                            Received
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Pending
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Contributions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Contributions</h3>
              <button
                onClick={() => handleGenerateReport('savings')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Savings Report</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Member</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Due Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Paid Date</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contributions.map((contribution) => (
                    <tr key={contribution.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{contribution.memberName}</td>
                      <td className="px-4 py-3 text-gray-600">{new Date(contribution.dueDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {contribution.paidDate ? new Date(contribution.paidDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(contribution.amount)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getStatusColor(contribution.status)}>
                          {contribution.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{contribution.fundingSource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-6 border-t border-gray-200">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Group Settings</span>
            </button>
            <button
              onClick={() => handleGenerateReport('payout')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Payout Report</span>
            </button>
            <button
              onClick={() => handleGenerateReport('penalty')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Penalty Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Send Reminders</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}