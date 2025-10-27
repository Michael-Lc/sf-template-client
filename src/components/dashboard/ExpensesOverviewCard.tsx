import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency, cn } from '@/lib/utils';

export function ExpensesOverviewCard() {
  const { expenseCategories } = useFinanceStore();

  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.amount, 0);
  const topCategories = expenseCategories
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <PieChart className="w-5 h-5 text-red-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Expenses Overview</h3>
            <p className="text-sm text-gray-600">Monthly spending breakdown</p>
          </div>
        </div>
        <Badge className="bg-red-100 text-red-700 border-red-200">
          {formatCurrency(totalExpenses)}
        </Badge>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-sm text-gray-600 mb-1">Total Monthly Expenses</p>
        <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <TrendingDown className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600 font-medium">8.1% vs last month</span>
        </div>
      </div>

      <div className="space-y-3">
        {topCategories.map((category, index) => (
          <div key={category.category} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                index === 0 && "bg-blue-500",
                index === 1 && "bg-green-500", 
                index === 2 && "bg-yellow-500",
                index === 3 && "bg-purple-500"
              )} />
              <div>
                <p className="text-sm font-medium text-gray-900">{category.category}</p>
                <p className="text-xs text-gray-500">{category.percentage}% of total</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(category.amount)}</p>
              <div className="flex items-center space-x-1">
                {category.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  category.change > 0 ? "text-red-500" : "text-green-500"
                )}>
                  {Math.abs(category.change)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}