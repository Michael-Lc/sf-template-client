import { TargetSavingsProgressCard } from '../savings/TargetSavingsProgressCard';
import { GroupSavingMembershipCard } from '../savings/GroupSavingMembershipCard';
import { RotationalSusuStatusCard } from '../savings/RotationalSusuStatusCard';
import { MonthlySavingsConsistencyCard } from '../savings/MonthlySavingsConsistencyCard';
import { InterestRewardsSummaryCard } from '../savings/InterestRewardsSummaryCard';
import { TargetedSavingsModule } from '../targetedSavings/TargetedSavingsModule';
import { RotationalSusuModule } from '../rotationalSusu/RotationalSusuModule';
import { PiggyBank, Target, Users } from 'lucide-react';
import { useState } from 'react';

export function SavingsInvestments() {
  const [activeSubmodule, setActiveSubmodule] = useState('insight');

  const renderSubmodule = () => {
    switch (activeSubmodule) {
      case 'insight':
        return (
          <div className="space-y-8">
            {/* Savings Insight Dashboard Header */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Savings Insight Dashboard</h2>
                    <p className="text-blue-100">Your complete savings performance and group activity overview</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <PiggyBank className="w-5 h-5" />
                        <span className="text-sm font-medium">Active Goals</span>
                      </div>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-5 h-5" />
                        <span className="text-sm font-medium">Group Memberships</span>
                      </div>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="w-5 h-5" />
                        <span className="text-sm font-medium">Consistency</span>
                      </div>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Dashboard Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TargetSavingsProgressCard />
              <GroupSavingMembershipCard />
            </section>

            {/* Rotational Susu Section */}
            <section>
              <RotationalSusuStatusCard />
            </section>

            {/* Performance Analytics */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlySavingsConsistencyCard />
              <InterestRewardsSummaryCard />
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Savings Actions</h3>
                <p className="text-gray-600">Manage your savings goals and group activities</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  onClick={() => setActiveSubmodule('targeted')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create New Goal
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Join Savings Group
                </button>
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Start Susu Circle
                </button>
                <button className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  View All Reports
                </button>
              </div>
            </section>
          </div>
        );
      case 'targeted':
        return <TargetedSavingsModule />;
      case 'susu':
        return <RotationalSusuModule />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Savings & Investments</h1>
        <p className="text-gray-600">Comprehensive savings dashboard with automated plans and group activities</p>
        
        {/* Submodule Navigation */}
        <div className="mt-6 flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveSubmodule('insight')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'insight'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Savings Insight
          </button>
          <button
            onClick={() => setActiveSubmodule('targeted')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'targeted'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Targeted Savings
          </button>
          <button
            onClick={() => setActiveSubmodule('susu')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'susu'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rotational Susu
          </button>
        </div>
      </div>

      {renderSubmodule()}
    </div>
  );
}