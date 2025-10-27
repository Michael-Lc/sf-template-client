import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils';

export function TargetSavingsProgressCard() {
  const { targetSavings, savingsInsight } = useSavingsStore();

  const totalTargetAmount = targetSavings.reduce((sum, saving) => sum + saving.targetAmount, 0);
  const totalCurrentAmount = targetSavings.reduce((sum, saving) => sum + saving.currentAmount, 0);
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100;

  const topSaving = targetSavings.reduce((prev, current) => 
    prev.currentAmount > current.currentAmount ? prev : current
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Target Savings Progress</h3>
            <p className="text-sm text-gray-600">{savingsInsight.activeTargets} active goals</p>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          {overallProgress.toFixed(1)}% Complete
        </Badge>
      </div>

      {/* Featured Goal */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{topSaving.name}</h4>
            <p className="text-sm text-gray-600">{topSaving.category}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(topSaving.currentAmount)}</p>
            <p className="text-sm text-gray-600">of {formatCurrency(topSaving.targetAmount)}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{topSaving.progress.toFixed(1)}%</span>
          </div>
          <Progress value={topSaving.progress} className="h-3" />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{formatCurrency(topSaving.monthlyContribution)}/month</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Due {new Date(topSaving.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Saved</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totalCurrentAmount)}</p>
          <div className="flex items-center justify-center space-x-1 mt-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">+{savingsInsight.monthlyGrowth}%</span>
          </div>
        </div>
        
        <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Target Amount</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totalTargetAmount)}</p>
          <p className="text-xs text-gray-500 mt-1">{formatCurrency(totalTargetAmount - totalCurrentAmount)} remaining</p>
        </div>
      </div>
    </Card>
  );
}