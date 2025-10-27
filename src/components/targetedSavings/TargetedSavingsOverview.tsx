import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useTargetedSavingsStore } from '@/stores/targetedSavingsStore';
import { formatCurrency } from '@/lib/utils';

export function TargetedSavingsOverview() {
  const { goals, setIsCreatingGoal, setActiveGoal } = useTargetedSavingsStore();
  
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const totalSaved = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Targeted Savings</h2>
          <p className="text-gray-600">Personal savings goals with automated contributions</p>
        </div>
        <button
          onClick={() => setIsCreatingGoal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
              <p className="text-sm text-gray-600">{activeGoals.length} goals in progress</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700">{activeGoals.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total active</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Saved</h3>
              <p className="text-sm text-gray-600">Across all goals</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">{formatCurrency(totalSaved)}</p>
            <div className="flex items-center justify-center space-x-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+12.5% this month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <p className="text-sm text-gray-600">{overallProgress.toFixed(1)}% complete</p>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-gray-600 text-center">
              {formatCurrency(totalSaved)} of {formatCurrency(totalTarget)}
            </p>
          </div>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeGoals.map((goal) => (
          <Card 
            key={goal.id} 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setActiveGoal(goal)}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
              <Badge className={`${
                goal.withdrawalRule === 'maturity' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {goal.bonusRate}% Bonus
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{goal.progress.toFixed(1)}%</span>
                </div>
                <Progress value={goal.progress} className="h-3" />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Contribution</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(goal.contributionAmount)}
                  </p>
                  <p className="text-xs text-gray-500">{goal.frequency}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Maturity</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(goal.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{goal.duration} months</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {activeGoals.length === 0 && (
        <Card className="p-12 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Goals</h3>
          <p className="text-gray-600 mb-6">Start your savings journey by creating your first goal</p>
          <button
            onClick={() => setIsCreatingGoal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Your First Goal
          </button>
        </Card>
      )}
    </div>
  );
}