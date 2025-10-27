import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PiggyBank, Target, Calendar } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency } from '@/lib/utils';

export function SavingsProgressCard() {
  const { savingsGoals, totalSavings } = useFinanceStore();

  const totalProgress = savingsGoals.reduce((sum, goal) => sum + goal.progress, 0) / savingsGoals.length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-purple-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Savings Progress</h3>
            <p className="text-sm text-gray-600">Total: {formatCurrency(totalSavings)}</p>
          </div>
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
          {savingsGoals.length} Goals
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{totalProgress.toFixed(1)}%</span>
        </div>
        <Progress value={totalProgress} className="h-3" />
      </div>

      <div className="space-y-4">
        {savingsGoals.slice(0, 3).map((goal) => (
          <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{goal.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {goal.progress.toFixed(1)}%
              </Badge>
            </div>
            
            <div className="mb-2">
              <Progress value={goal.progress} className="h-2" />
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(goal.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}