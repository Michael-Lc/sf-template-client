import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils';

export function RotationalSusuStatusCard() {
  const { rotationalSusu, savingsInsight } = useSavingsStore();

  const nextPayout = rotationalSusu.find(susu => susu.status === 'waiting');
  const activeSusu = rotationalSusu.filter(susu => susu.status === 'active');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rotational Susu Status</h3>
            <p className="text-sm text-gray-600">{savingsInsight.activeSusuGroups} active groups</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          {nextPayout ? 'Payout Pending' : 'Active'}
        </Badge>
      </div>

      {/* Next Payout Highlight */}
      {nextPayout && (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-lg font-semibold text-purple-900">{nextPayout.groupName}</h4>
              <p className="text-sm text-purple-700">Next payout coming up!</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(nextPayout.totalPayout)}</p>
              <p className="text-sm text-purple-700">Expected payout</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center p-2 bg-white rounded border border-purple-100">
              <p className="text-xs text-purple-600">Your Position</p>
              <p className="text-lg font-bold text-purple-900">#{nextPayout.yourPosition}</p>
            </div>
            <div className="text-center p-2 bg-white rounded border border-purple-100">
              <p className="text-xs text-purple-600">Current Turn</p>
              <p className="text-lg font-bold text-purple-900">#{nextPayout.currentPosition}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-purple-700">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {new Date(nextPayout.nextPayoutDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{formatCurrency(nextPayout.monthlyContribution)}/month</span>
            </div>
          </div>
        </div>
      )}

      {/* Susu Groups Table */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Active Groups</h4>
        
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Group</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">Position</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">Members</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Contribution</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rotationalSusu.map((susu) => (
                <tr key={susu.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{susu.groupName}</p>
                      <p className="text-xs text-gray-500">Cycle {susu.cycle}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">#{susu.yourPosition}</p>
                      <p className="text-xs text-gray-500">of {susu.totalMembers}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{susu.totalMembers}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(susu.monthlyContribution)}</p>
                    <p className="text-xs text-gray-500">monthly</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge 
                      variant={susu.status === 'active' ? 'default' : susu.status === 'waiting' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {susu.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calendar Widget */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Upcoming Payouts</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {rotationalSusu.map((susu) => (
            <div key={susu.id} className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-gray-600">{susu.groupName}</span>
              <span className="font-medium text-gray-900">
                {new Date(susu.nextPayoutDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}