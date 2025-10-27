import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Gift, TrendingUp, Star, Calendar } from 'lucide-react';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils';

export function InterestRewardsSummaryCard() {
  const { interestRewards, savingsInsight } = useSavingsStore();

  const totalInterest = interestRewards
    .filter(reward => reward.type === 'interest')
    .reduce((sum, reward) => sum + reward.amount, 0);

  const totalRewards = interestRewards
    .filter(reward => reward.type === 'reward')
    .reduce((sum, reward) => sum + reward.amount, 0);

  const recentRewards = interestRewards
    .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
    .slice(0, 4);

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Interest & Rewards</h3>
            <p className="text-sm text-gray-600">Earnings from savings activities</p>
          </div>
        </div>
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
          This Month
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg border border-yellow-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Interest Earned</p>
              <p className="text-xs text-gray-500">From savings accounts</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{formatCurrency(savingsInsight.totalInterestEarned)}</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+12.5% vs last month</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-yellow-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Reward Points</p>
              <p className="text-xs text-gray-500">From achievements</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{savingsInsight.totalRewardPoints}</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <Star className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-500 font-medium">+75 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Earnings</h4>
        
        {recentRewards.map((reward, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                reward.type === 'interest' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {reward.type === 'interest' ? (
                  <DollarSign className="w-4 h-4 text-green-600" />
                ) : (
                  <Gift className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{reward.source}</p>
                <p className="text-xs text-gray-500">{reward.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                reward.type === 'interest' ? 'text-green-600' : 'text-purple-600'
              }`}>
                {reward.type === 'interest' ? formatCurrency(reward.amount) : `${reward.amount} pts`}
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{new Date(reward.earnedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-4 pt-4 border-t border-yellow-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Earnings (All Time)</span>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(savingsInsight.totalInterestEarned)} + {savingsInsight.totalRewardPoints} pts
            </p>
            <p className="text-xs text-gray-500">Interest + Reward Points</p>
          </div>
        </div>
      </div>
    </Card>
  );
}