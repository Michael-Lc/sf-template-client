import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, PieChart, Calendar, TrendingUp } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export function GroupSavingMembershipCard() {
  const { groupMemberships, savingsInsight } = useSavingsStore();

  const totalContributions = groupMemberships.reduce((sum, group) => sum + group.yourContribution, 0);
  const averageContributionRate = groupMemberships.reduce((sum, group) => sum + group.contributionRate, 0) / groupMemberships.length;

  const pieData = groupMemberships.map((group, index) => ({
    name: group.groupName,
    value: group.yourContribution,
    percentage: group.contributionRate,
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Contribution: {formatCurrency(data.value)}</p>
          <p className="text-sm text-gray-600">Rate: {data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Group Memberships</h3>
            <p className="text-sm text-gray-600">{savingsInsight.activeGroups} active groups</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          {averageContributionRate.toFixed(1)}% Avg Rate
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total Contributions</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalContributions)}</p>
            <p className="text-xs text-gray-600 mt-1">Across all groups</p>
          </div>

          <div className="space-y-2">
            {groupMemberships.slice(0, 3).map((group, index) => (
              <div key={group.groupId} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.groupName}</p>
                    <p className="text-xs text-gray-500">{group.totalMembers} members</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.yourContribution)}</p>
                  <p className="text-xs text-gray-500">{group.contributionRate.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Next meeting dates</span>
          <div className="flex items-center space-x-1 text-green-600">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Feb 15-25</span>
          </div>
        </div>
      </div>
    </Card>
  );
}