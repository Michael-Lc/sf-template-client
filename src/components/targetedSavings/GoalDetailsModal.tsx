import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Download, Mail, Calendar, DollarSign, Target, TrendingUp } from 'lucide-react';
import { useTargetedSavingsStore } from '@/stores/targetedSavingsStore';
import { formatCurrency } from '@/lib/utils';

export function GoalDetailsModal() {
  const { activeGoal, setActiveGoal, getGoalTransactions } = useTargetedSavingsStore();
  
  if (!activeGoal) return null;

  const transactions = getGoalTransactions(activeGoal.id);
  const remainingAmount = activeGoal.targetAmount - activeGoal.currentAmount;
  const daysRemaining = Math.ceil((new Date(activeGoal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{activeGoal.name}</h2>
              <p className="text-gray-600">{activeGoal.description}</p>
            </div>
            <button
              onClick={() => setActiveGoal(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Goal Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Progress</p>
                  <p className="text-xs text-gray-500">{activeGoal.progress.toFixed(1)}% complete</p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={activeGoal.progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{formatCurrency(activeGoal.currentAmount)}</span>
                  <span className="text-gray-600">{formatCurrency(activeGoal.targetAmount)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Expected Maturity</p>
                  <p className="text-xs text-gray-500">Including bonus</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(activeGoal.expectedMaturityBalance)}</p>
              {activeGoal.bonusRate > 0 && (
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+{activeGoal.bonusRate}% bonus</span>
                </div>
              )}
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Time Remaining</p>
                  <p className="text-xs text-gray-500">Until maturity</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-700">{daysRemaining}</p>
              <p className="text-xs text-purple-600 mt-1">days remaining</p>
            </Card>
          </div>

          {/* Goal Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Target Amount</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(activeGoal.targetAmount)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Current Amount</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(activeGoal.currentAmount)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span className="font-semibold text-red-600">{formatCurrency(remainingAmount)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-900">{activeGoal.duration} months</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Frequency</span>
                  <span className="font-semibold text-gray-900 capitalize">{activeGoal.frequency}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Contribution</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(activeGoal.contributionAmount)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Withdrawal Rule</span>
                  <Badge className={activeGoal.withdrawalRule === 'maturity' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                    {activeGoal.withdrawalRule === 'maturity' ? 'At Maturity' : 'Anytime'}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Schedule</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Next Contribution</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(activeGoal.contributionAmount)}</p>
                  <p className="text-xs text-gray-500">Due in 3 days</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-medium text-gray-900">{new Date(activeGoal.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium text-gray-900">{new Date(activeGoal.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Funding Source</span>
                    <span className="font-medium text-gray-900 capitalize">{activeGoal.fundingSource}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings History */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Savings History</h3>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Email Statement</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Time</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Source</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Transaction ID</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Running Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-gray-600">{transaction.time}</td>
                      <td className="px-4 py-3">
                        <Badge className={
                          transaction.type === 'contribution' ? 'bg-green-100 text-green-700' :
                          transaction.type === 'withdrawal' ? 'bg-red-100 text-red-700' :
                          transaction.type === 'bonus' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{transaction.source}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{transaction.transactionId}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(transaction.runningBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400">Transactions will appear here once contributions start</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}