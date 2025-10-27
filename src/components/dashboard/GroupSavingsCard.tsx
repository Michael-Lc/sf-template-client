import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, Trophy } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency } from '@/lib/utils';

export function GroupSavingsCard() {
  const { groupSavings } = useFinanceStore();

  const totalContributions = groupSavings.reduce((sum, group) => sum + group.nextContribution, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Group Savings</h3>
            <p className="text-sm text-gray-600">Rotational savings participation</p>
          </div>
        </div>
        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
          {groupSavings.length} Groups
        </Badge>
      </div>

      <div className="mb-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <div className="text-center">
          <p className="text-sm text-indigo-700 mb-1">Next Total Contribution</p>
          <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalContributions)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {groupSavings.map((group, index) => (
          <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">{group.groupName}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Position #{group.yourPosition}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">Members</p>
                <p className="text-sm font-semibold text-gray-900">{group.totalMembers}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">Total Pool</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.totalPool)}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>Next: {formatCurrency(group.nextContribution)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Due {new Date(group.contributionDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}