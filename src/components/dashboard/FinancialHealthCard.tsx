import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';

export function FinancialHealthCard() {
  const { financialHealth } = useFinanceStore();

  const getHealthColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (score: number) => {
    if (score >= 8) return 'bg-green-50 border-green-200';
    if (score >= 6) return 'bg-blue-50 border-blue-200';
    if (score >= 4) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const scorePercentage = (financialHealth.score / 10) * 100;

  const healthFactors = [
    { label: 'Credit Utilization', value: financialHealth.factors.creditUtilization * 100, target: 30 },
    { label: 'Payment History', value: financialHealth.factors.paymentHistory * 100, target: 95 },
    { label: 'Savings Rate', value: financialHealth.factors.savingsRate * 100, target: 20 },
    { label: 'Debt-to-Income', value: financialHealth.factors.debtToIncome * 100, target: 36 }
  ];

  return (
    <Card className={`p-6 ${getHealthBg(financialHealth.score)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Financial Health</h3>
            <Badge className={`text-xs ${getHealthColor(financialHealth.score)} bg-white border`}>
              {financialHealth.status.charAt(0).toUpperCase() + financialHealth.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Improving</span>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`text-4xl font-bold mb-2 ${getHealthColor(financialHealth.score)}`}>
          {financialHealth.score.toFixed(1)}
        </div>
        <Progress value={scorePercentage} className="mb-2 h-3" />
        <p className="text-xs text-gray-600">Health Score (0-10)</p>
      </div>

      <div className="space-y-3">
        {healthFactors.map((factor, index) => {
          const isGood = factor.label === 'Credit Utilization' || factor.label === 'Debt-to-Income' 
            ? factor.value <= factor.target 
            : factor.value >= factor.target;

          return (
            <div key={index} className="p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {isGood ? (
                    <Shield className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className="text-sm font-medium text-gray-900">{factor.label}</span>
                </div>
                <span className={`text-sm font-semibold ${isGood ? 'text-green-600' : 'text-yellow-600'}`}>
                  {factor.value.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>Target: {factor.target}%</span>
                <span className={isGood ? 'text-green-600' : 'text-yellow-600'}>
                  {isGood ? '✓ Good' : '⚠ Needs attention'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}