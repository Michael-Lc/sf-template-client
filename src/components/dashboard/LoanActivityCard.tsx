import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency } from '@/lib/utils';

export function LoanActivityCard() {
  const { loans } = useFinanceStore();

  const activeLoans = loans.filter(loan => loan.status === 'active');
  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalOriginal = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalPaidPercentage = ((totalOriginal - totalOutstanding) / totalOriginal) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-orange-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Active Loans</h3>
            <p className="text-sm text-gray-600">{activeLoans.length} active loans</p>
          </div>
        </div>
        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
          {formatCurrency(totalOutstanding)} Outstanding
        </Badge>
      </div>

      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Repayment Progress</span>
          <span className="text-sm text-gray-600">{totalPaidPercentage.toFixed(1)}% Paid</span>
        </div>
        <Progress value={totalPaidPercentage} className="h-3" />
      </div>

      <div className="space-y-3">
        {activeLoans.map((loan) => {
          const paidPercentage = ((loan.amount - loan.balance) / loan.amount) * 100;
          
          return (
            <div key={loan.id} className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{loan.type}</p>
                  <p className="text-xs text-gray-500">{loan.interestRate}% APR</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {paidPercentage.toFixed(1)}% Paid
                </Badge>
              </div>
              
              <div className="mb-2">
                <Progress value={paidPercentage} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{formatCurrency(loan.monthlyPayment)}/mo</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Due {new Date(loan.nextDueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="font-medium">{formatCurrency(loan.balance)} left</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}