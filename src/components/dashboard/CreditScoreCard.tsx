import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, TrendingUp } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';

export function CreditScoreCard() {
  const { creditScore, financialHealth } = useFinanceStore();

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 750) return 'bg-green-50 border-green-200';
    if (score >= 700) return 'bg-blue-50 border-blue-200';
    if (score >= 650) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const scorePercentage = (creditScore / 850) * 100;

  return (
    <Card className={`p-6 ${getScoreBg(creditScore)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Credit Score</h3>
            <Badge className={`text-xs ${getScoreColor(creditScore)} bg-white border`}>
              {creditScore >= 750 ? 'Excellent' : creditScore >= 700 ? 'Good' : creditScore >= 650 ? 'Fair' : 'Poor'}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12 this month</span>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`text-4xl font-bold mb-2 ${getScoreColor(creditScore)}`}>
          {creditScore}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              creditScore >= 750 ? 'bg-green-500' : 
              creditScore >= 700 ? 'bg-blue-500' : 
              creditScore >= 650 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">Range: 300 - 850</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 bg-white rounded-lg border border-gray-100">
          <p className="text-xs text-gray-600 mb-1">Payment History</p>
          <p className="text-sm font-semibold text-gray-900">
            {(financialHealth.factors.paymentHistory * 100).toFixed(0)}%
          </p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-100">
          <p className="text-xs text-gray-600 mb-1">Utilization</p>
          <p className="text-sm font-semibold text-gray-900">
            {(financialHealth.factors.creditUtilization * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </Card>
  );
}