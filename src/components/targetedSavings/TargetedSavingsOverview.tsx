import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ViewToggle } from '@/components/ui/view-toggle';
import { Filters } from '@/components/ui/filters';
import { Target, Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useTargetedSavingsStore } from '@/stores/targetedSavingsStore';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function TargetedSavingsOverview() {
  const { goals, setIsCreatingGoal, setActiveGoal } = useTargetedSavingsStore();
  
  const [view, setView] = useState<'card' | 'table'>(() => {
    return (localStorage.getItem('targetedSavingsView') as 'card' | 'table') || 'card';
  });
  
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    fundingSource: ''
  });

  useEffect(() => {
    localStorage.setItem('targetedSavingsView', view);
  }, [view]);
  
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const totalSaved = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // Filter goals based on filters
  const filteredGoals = goals.filter(goal => {
    if (filters.status && goal.status !== filters.status) return false;
    if (filters.startDate && goal.startDate < filters.startDate) return false;
    if (filters.endDate && goal.endDate > filters.endDate) return false;
    if (filters.fundingSource && goal.fundingSource !== filters.fundingSource) return false;
    return true;
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'paused', label: 'Paused' }
  ];

  const fundingSourceOptions = [
    { value: 'payroll', label: 'Payroll Debit' },
    { value: 'wallet', label: 'Smiggle Wallet' },
    { value: 'momo', label: 'Mobile Money' },
    { value: 'card', label: 'Bank Card' }
  ];

  const resetFilters = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: '',
      fundingSource: ''
    });
  };
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

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        onResetFilters={resetFilters}
        statusOptions={statusOptions}
        fundingSourceOptions={fundingSourceOptions}
      />

      {/* View Toggle */}
      <div className="flex justify-end">
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <Card className="p-12 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Goals Found</h3>
          <p className="text-gray-600 mb-6">
            {Object.values(filters).some(v => v) 
              ? "No goals match your current filters. Try adjusting your search criteria."
              : "Start your savings journey by creating your first goal"
            }
          </p>
          <button
            onClick={() => setIsCreatingGoal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create New Goal
          </button>
        </Card>
      ) : view === 'card' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGoals.map((goal) => (
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
      ) : (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Plan Name</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-700">Target Amount</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Duration</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Progress</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Funding Source</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Start Date</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">End Date</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGoals.map((goal) => (
                  <tr 
                    key={goal.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setActiveGoal(goal)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{goal.name}</p>
                        <p className="text-xs text-gray-500">{goal.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {formatCurrency(goal.targetAmount)}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {goal.duration} months
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{goal.progress.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center capitalize text-gray-600">
                      {goal.fundingSource}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {new Date(goal.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {new Date(goal.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={
                        goal.status === 'active' ? 'bg-green-100 text-green-700' :
                        goal.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {goal.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}