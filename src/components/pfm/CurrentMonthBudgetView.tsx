import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Target, Download, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePFMStore } from '@/stores/pfmStore';
import { formatCurrency, cn } from '@/lib/utils';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#EC4899', '#6B7280'];

export function CurrentMonthBudgetView() {
  const { 
    getCurrentBudget, 
    financialSummary, 
    selectedMonth, 
    setSelectedMonth,
    alerts,
    markAlertAsRead
  } = usePFMStore();

  const [viewType, setViewType] = useState<'summary' | 'detailed'>('summary');
  
  const currentBudget = getCurrentBudget();
  const currentSummary = financialSummary.find(s => s.month === selectedMonth);
  const unreadAlerts = alerts.filter(alert => !alert.isRead);

  // Generate month options (current month and previous 11 months)
  const generateMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      months.push({ key: monthKey, label: monthLabel });
    }
    
    return months;
  };

  const monthOptions = generateMonthOptions();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const currentIndex = monthOptions.findIndex(m => m.key === selectedMonth);
    if (direction === 'prev' && currentIndex < monthOptions.length - 1) {
      setSelectedMonth(monthOptions[currentIndex + 1].key);
    } else if (direction === 'next' && currentIndex > 0) {
      setSelectedMonth(monthOptions[currentIndex - 1].key);
    }
  };

  const spendingByCategoryData = currentBudget?.categories.map((category, index) => ({
    name: category.name,
    budgeted: category.budgetAmount,
    spent: category.spentAmount,
    remaining: Math.max(0, category.budgetAmount - category.spentAmount),
    color: COLORS[index % COLORS.length],
    percentage: (category.spentAmount / category.budgetAmount) * 100
  })) || [];

  const pieData = currentBudget?.categories.map((category, index) => ({
    name: category.name,
    value: category.spentAmount,
    color: COLORS[index % COLORS.length]
  })) || [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
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

  const exportBudget = (format: 'pdf' | 'excel') => {
    console.log(`Exporting budget as ${format}`);
    // Implementation would generate and download the file
  };

  if (!currentBudget) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Current Monthly Budget</h2>
        </div>
        
        <Card className="p-12 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Budget Found</h3>
          <p className="text-gray-600 mb-6">
            No active budget found for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Create Budget
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Current Monthly Budget</h2>
          <p className="text-gray-600">Detailed view of your monthly budget and spending</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('summary')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'summary'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setViewType('detailed')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'detailed'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Detailed
            </button>
          </div>
          <button
            onClick={() => exportBudget('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {monthOptions.map((month) => (
                <option key={month.key} value={month.key}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => navigateMonth('next')}
            disabled={selectedMonth === monthOptions[0].key}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Budget Alerts */}
      {unreadAlerts.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-red-50 to-yellow-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Budget Alerts</h3>
              <p className="text-sm text-red-700">{unreadAlerts.length} active alerts</p>
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

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Budget</h3>
              <p className="text-sm text-gray-600">Allocated amount</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-700">
            {formatCurrency(currentBudget.totalBudget)}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-red-700">
            {formatCurrency(currentBudget.totalSpent)}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Savings Rate</h3>
              <p className="text-sm text-gray-600">% of income saved</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-700">
            {currentSummary ? `${currentSummary.savingsRate.toFixed(1)}%` : '0%'}
          </p>
        </Card>
      </div>

      {/* Charts Section */}
      {viewType === 'summary' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget vs Actual Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Budget vs Actual</h3>
                <p className="text-sm text-gray-600">Category-wise comparison</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingByCategoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="budgeted" fill="#3B82F6" name="Budgeted" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="spent" fill="#EF4444" name="Spent" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Spending Distribution Pie Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Spending Distribution</h3>
                <p className="text-sm text-gray-600">By category</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                  <Tooltip content={<PieTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      ) : (
        /* Detailed Category View */
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Category Details</h3>
              <p className="text-sm text-gray-600">Detailed breakdown by category</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBudget.categories.map((category) => {
              const utilizationPercentage = (category.spentAmount / category.budgetAmount) * 100;
              const isOverBudget = utilizationPercentage > 100;
              const isNearLimit = utilizationPercentage >= category.alertThreshold;
              const remaining = category.budgetAmount - category.spentAmount;
              
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
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Budgeted</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(category.budgetAmount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Spent</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(category.spentAmount)}</p>
                      </div>
                    </div>
                    
                    <Progress 
                      value={Math.min(utilizationPercentage, 100)} 
                      className={cn(
                        "h-2",
                        isOverBudget ? "[&>div]:bg-red-500" :
                        isNearLimit ? "[&>div]:bg-yellow-500" :
                        "[&>div]:bg-green-500"
                      )}
                    />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className={cn(
                        "font-medium",
                        remaining >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(Math.abs(remaining))} over`}
                      </span>
                      <span className="text-gray-500">
                        Alert at {category.alertThreshold}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Export Options */}
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Budget Report</h3>
          <p className="text-gray-600">Download your budget analysis in different formats</p>
        </div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => exportBudget('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => exportBudget('excel')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </Card>
    </div>
  );
}