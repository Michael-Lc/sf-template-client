import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverviewMetric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

const metrics: OverviewMetric[] = [
  {
    label: 'Net Worth',
    value: '$67,420',
    change: 12.5,
    changeLabel: 'vs last month'
  },
  {
    label: 'Monthly Income',
    value: '$8,450',
    change: 3.2,
    changeLabel: 'vs last month'
  },
  {
    label: 'Monthly Expenses',
    value: '$5,750',
    change: -8.1,
    changeLabel: 'vs last month'
  },
  {
    label: 'Savings Rate',
    value: '32%',
    change: 5.3,
    changeLabel: 'vs last month'
  }
];

export function OverviewCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Financial Overview</h2>
        <p className="text-gray-600 text-sm">Your complete financial snapshot at a glance</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
            <div className="flex items-center justify-center space-x-1">
              {metric.change > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={cn(
                "text-xs font-medium",
                metric.change > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(metric.change)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{metric.changeLabel}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}