import { OverviewCard } from '../dashboard/OverviewCard';
import { WalletBalanceCard } from '../dashboard/WalletBalanceCard';
import { SavingsProgressCard } from '../dashboard/SavingsProgressCard';
import { CreditScoreCard } from '../dashboard/CreditScoreCard';
import { LoanActivityCard } from '../dashboard/LoanActivityCard';
import { ExpensesOverviewCard } from '../dashboard/ExpensesOverviewCard';
import { GroupSavingsCard } from '../dashboard/GroupSavingsCard';
import { FinancialHealthCard } from '../dashboard/FinancialHealthCard';
import { ExpenseSavingsChart } from '../dashboard/ExpenseSavingsChart';

export function MyFinances() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Finances</h1>
        <p className="text-gray-600">Your complete financial dashboard with real-time insights and analytics</p>
      </div>

      <div className="space-y-8">
        {/* Overview Section */}
        <section>
          <OverviewCard />
        </section>

        {/* Main Dashboard Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-6">
            <WalletBalanceCard />
            <CreditScoreCard />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <SavingsProgressCard />
            <ExpensesOverviewCard />
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <FinancialHealthCard />
            <LoanActivityCard />
          </div>
        </section>

        {/* Expense and Savings Trends Chart */}
        <section>
          <ExpenseSavingsChart />
        </section>

        {/* Group Savings Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GroupSavingsCard />
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-gray-600 mb-4">Manage your finances efficiently</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Transfer Money
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Add Savings Goal
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}