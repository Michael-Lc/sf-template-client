import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency } from '@/lib/utils';

export function WalletBalanceCard() {
  const { walletBalance } = useFinanceStore();

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-green-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Smiggle Wallet</h3>
            <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
              Active
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center p-4 bg-white rounded-lg border border-green-100">
          <p className="text-sm text-gray-600 mb-1">Available Balance</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(walletBalance.available)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-lg border border-gray-100 flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Balance</p>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(walletBalance.total)}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-gray-100 flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-sm font-semibold text-gray-900">{formatCurrency(walletBalance.pending)}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-green-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Recent Activity</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+$125 today</span>
          </div>
        </div>
      </div>
    </Card>
  );
}