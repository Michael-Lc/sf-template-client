import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Target, Plus, Eye, Bell } from 'lucide-react';
import { usePFMStore } from '@/stores/pfmStore';
import { formatCurrency, cn } from '@/lib/utils';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#EC4899', '#6B7280'];

export function BudgetWellnessDashboard() {
  const { 
    getCurrentBudget, 
    financialSummary, 
    selectedMonth, 
    alerts,
    setIsCreatingBudget,
    setActiveBudget,
    markAlertAsRead
  } = usePFMStore();

  const currentBudget = getCurrentBudget();
  const currentSummary = financialSummary.find(s => s.month === selectedMonth);
  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  const incomeVsExpensesData = currentSummary ? [
    { name: 'Income', amount: currentSummary.totalIncome, color: '#10B981' },
    { name: 'Expenses', amount: currentSummary.totalExpenses, color: '#EF4444' },
    { name: 'Savings', amount: currentSummary.totalSavings, color: '#3B82F6' }
  ] : [];

  const spendingByCategoryData = currentBudget?.categories.map((category, index) => ({
    name: category.name,
    value: category.spentAmount,
    color: COLORS[index % COLORS.length],
    percentage: currentSummary ? (category.spentAmount / currentSummary.totalExpenses) * 100 : 0
  })) || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
          <p className="text-sm text-gray-500">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exceeded': return 'bg-red-100 text-red-800 border-red-200';
      case 'monthly_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget & Financial Wellness</h2>
          <p className="text-gray-600">Your complete financial overview for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => currentBudget && setActiveBudget(currentBudget)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Current Budget</span>
          </button>
          <button
            onClick={() => setIsCreatingBudget(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Budget</span>
          </button>
        </div>
      </div>

      {/* Alerts Section */}
      {unreadAlerts.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-red-50 to-yellow-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Budget Alerts</h3>
              <p className="text-sm text-red-700">{unreadAlerts.length} active alerts require your attention</p>
            </div>
          </div>
          <div className="space-y-2">
            {unreadAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">{alert.message}</span>
                  </div>
                  <button
                    onClick={() => markAlertAsRead(alert.id)}
                    className="text-xs px-2 py-1 bg-white rounded border hover:bg-gray-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Income</h3>
              <p className="text-sm text-gray-600">Total earnings</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-700">
            {currentSummary ? formatCurrency(currentSummary.totalIncome) : '$0'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Expenses</h3>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-700">
            {currentSummary ? formatCurrency(currentSummary.totalExpenses) : '$0'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Savings Rate</h3>
              <p className="text-sm text-gray-600">% of income saved</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-700">
            {currentSummary ? `${currentSummary.savingsRate.toFixed(1)}%` : '0%'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Budget Usage</h3>
              <p className="text-sm text-gray-600">% of budget used</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-700">
            {currentSummary ? `${currentSummary.budgetUtilization.toFixed(1)}%` : '0%'}
          </p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Income vs Expenses</h3>
              <p className="text-sm text-gray-600">Monthly financial flow</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpensesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Spending by Category Pie Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
              <p className="text-sm text-gray-600">Expense breakdown</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Budget Categories Overview */}
      {currentBudget && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
              <p className="text-sm text-gray-600">Current month budget vs actual spending</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentBudget.categories.map((category) => {
              const utilizationPercentage = (category.spentAmount / category.budgetAmount) * 100;
              const isOverBudget = utilizationPercentage > 100;
              const isNearLimit = utilizationPercentage >= category.alertThreshold;
              
              return (
                <div key={category.id} className={cn(
                  "p-4 rounded-lg border",
                  isOverBudget ? "bg-red-50 border-red-200" :
                  isNearLimit ? "bg-yellow-50 border-yellow-200" :
                  "bg-gray-50 border-gray-200"
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                    <Badge className={cn(
                      "text-xs",
                      isOverBudget ? "bg-red-100 text-red-700" :
                      isNearLimit ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    )}>
                      {utilizationPercentage.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(utilizationPercentage, 100)} 
                      className={cn(
                        "h-2",
                        isOverBudget ? "[&>div]:bg-red-500" :
                        isNearLimit ? "[&>div]:bg-yellow-500" :
                        "[&>div]:bg-green-500"
                      )}
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{formatCurrency(category.spentAmount)}</span>
                      <span>{formatCurrency(category.budgetAmount)}</span>
                    </div>
                    {isOverBudget && (
                      <p className="text-xs text-red-600 font-medium">
                        Over by {formatCurrency(category.spentAmount - category.budgetAmount)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Top 5 Expenses */}
      {currentSummary && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top 5 Expenses</h3>
              <p className="text-sm text-gray-600">Highest spending categories this month</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {currentSummary.topExpenseCategories.map((expense, index) => (
              <div key={expense.categoryId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{expense.categoryName}</p>
                    <p className="text-xs text-gray-500">{expense.percentage.toFixed(1)}% of total expenses</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}