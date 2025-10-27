import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const monthlyData = [
  { month: 'Jul', expenses: 5200, savings: 1800 },
  { month: 'Aug', expenses: 5450, savings: 1650 },
  { month: 'Sep', expenses: 5100, savings: 2100 },
  { month: 'Oct', expenses: 5350, savings: 1950 },
  { month: 'Nov', expenses: 5600, savings: 1750 },
  { month: 'Dec', expenses: 5950, savings: 1400 },
  { month: 'Jan', expenses: 5750, savings: 1850 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{`${label} 2024`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${formatCurrency(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ExpenseSavingsChart() {
  const currentExpenses = monthlyData[monthlyData.length - 1].expenses;
  const previousExpenses = monthlyData[monthlyData.length - 2].expenses;
  const expenseChange = ((currentExpenses - previousExpenses) / previousExpenses) * 100;

  const currentSavings = monthlyData[monthlyData.length - 1].savings;
  const previousSavings = monthlyData[monthlyData.length - 2].savings;
  const savingsChange = ((currentSavings - previousSavings) / previousSavings) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <p className="text-sm text-gray-600">Expenses vs Savings over time</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">Current Expenses</span>
            <div className="flex items-center space-x-1">
              {expenseChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-600" />
              )}
              <span className={`text-xs font-medium ${expenseChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(expenseChange).toFixed(1)}%
              </span>
            </div>
          </div>
          <p className="text-xl font-bold text-red-900">{formatCurrency(currentExpenses)}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Current Savings</span>
            <div className="flex items-center space-x-1">
              {savingsChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${savingsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(savingsChange).toFixed(1)}%
              </span>
            </div>
          </div>
          <p className="text-xl font-bold text-green-900">{formatCurrency(currentSavings)}</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#dc2626" 
              strokeWidth={3}
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
              name="Expenses"
            />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
              name="Savings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>7-month trend analysis</span>
          <span className="text-blue-600 font-medium">View detailed breakdown →</span>
        </div>
      </div>
    </Card>
  );
}