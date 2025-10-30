import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, RotateCcw, Calendar, Users, DollarSign } from 'lucide-react';
import { useRotationalSusuStore } from '@/stores/rotationalSusuStore';
import { formatCurrency } from '@/lib/utils';

export function CycleRestartModal() {
  const { activeGroup, isRestartingCycle, setIsRestartingCycle, startNewCycle } = useRotationalSusuStore();
  
  if (!isRestartingCycle || !activeGroup) return null;

  const currentCycle = activeGroup.cycles.find(c => c.cycleNumber === activeGroup.currentCycle);
  const nextCycleNumber = Math.max(...activeGroup.cycles.map(c => c.cycleNumber)) + 1;

  const handleConfirmRestart = () => {
    startNewCycle(activeGroup.id);
    setIsRestartingCycle(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Start New Cycle</h2>
                <p className="text-gray-600">Restart savings cycle for {activeGroup.name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsRestartingCycle(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Current Cycle Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Cycle Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Cycle Number</p>
                <p className="text-xl font-bold text-gray-900">{activeGroup.currentCycle}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-xl font-bold text-gray-900">{activeGroup.members.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Contribution</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(activeGroup.contributionAmount)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(activeGroup.totalBalance)}</p>
              </div>
            </div>
          </div>

          {/* New Cycle Configuration */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">New Cycle Configuration</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Cycle Number</span>
                <Badge className="bg-blue-100 text-blue-700">Cycle {nextCycleNumber}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Start Date</span>
                <span className="text-sm text-blue-600">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Members</span>
                <span className="text-sm text-blue-600">{activeGroup.members.length} members (same as current)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Contribution Amount</span>
                <span className="text-sm text-blue-600">{formatCurrency(activeGroup.contributionAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Frequency</span>
                <span className="text-sm text-blue-600 capitalize">{activeGroup.savingsFrequency}</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All current members will be carried over to the new cycle</li>
              <li>• Rotation order will reset to the beginning</li>
              <li>• Previous cycle data will be preserved for historical reference</li>
              <li>• New contribution schedule will begin immediately</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setIsRestartingCycle(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRestart}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Cycle</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}