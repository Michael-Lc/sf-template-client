import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, CheckCircle } from 'lucide-react';
import { useSavingsStore } from '@/stores/savingsStore';
import { formatCurrency } from '@/lib/utils';

export function MonthlySavingsConsistencyCard() {
  const { monthlySavingsData, savingsInsight } = useSavingsStore();

  const currentMonth = monthlySavingsData[monthlySavingsData.length - 1];
  const previousMonth = monthlySavingsData[monthlySavingsData.length - 2];
  const consistencyChange = currentMonth.successRate - previousMonth.successRate;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`${label} 2024`}</p>
          <p className="text-sm text-green-600">Success Rate: {data.successRate}%</p>
          <p className="text-sm text-gray-600">Target: {formatCurrency(data.targetAmount)}</p>
          <p className="text-sm text-gray-600">Actual: {formatCurrency(data.actualAmount)}</p>
          <p className="text-sm text-gray-600">Deductions: {data.deductionCount}/{data.totalDeductions}</p>
        </div>
      );
    }
    return null;
  };

  const getConsistencyColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-blue-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConsistencyBg = (rate: number) => {
    if (rate >= 90) return 'bg-green-50 border-green-200';
    if (rate >= 75) return 'bg-blue-50 border-blue-200';
    if (rate >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className={`p-6 ${getConsistencyBg(savingsInsight.averageConsistency)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Savings Consistency</h3>
            <p className="text-sm text-gray-600">Monthly deduction success rate</p>
          </div>
        </div>
        <Badge className={`${getConsistencyColor(savingsInsight.averageConsistency)} bg-white border`}>
          {savingsInsight.averageConsistency.toFixed(1)}% Average
        </Badge>
      </div>

      {/* Current Month Highlight */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">January 2024</h4>
            <p className="text-sm text-gray-600">Current month performance</p>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getConsistencyColor(currentMonth.successRate)}`}>
              {currentMonth.successRate}%
            </p>
            <div className="flex items-center justify-end space-x-1 mt-1">
              {consistencyChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
              )}
              <span className={`text-sm font-medium ${consistencyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(consistencyChange).toFixed(1)}% vs last month
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Successful</p>
            <p className="text-sm font-semibold text-green-600">{currentMonth.deductionCount}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Total Planned</p>
            <p className="text-sm font-semibold text-gray-900">{currentMonth.totalDeductions}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Amount Saved</p>
            <p className="text-sm font-semibold text-blue-600">{formatCurrency(currentMonth.actualAmount)}</p>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlySavingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="consistencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="successRate"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#consistencyGradient)"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Best Month</span>
          </div>
          <p className="text-lg font-bold text-green-600">95%</p>
          <p className="text-xs text-gray-500">September 2023</p>
        </div>
        
        <div className="p-3 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Target Rate</span>
          </div>
          <p className="text-lg font-bold text-blue-600">85%</p>
          <p className="text-xs text-gray-500">Monthly goal</p>
        </div>
      </div>
    </Card>
  );
}