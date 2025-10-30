import { useState } from 'react';
import { BudgetWellnessDashboard } from './BudgetWellnessDashboard';
import { TrackExpenses } from './TrackExpenses';
import { ManageCategories } from './ManageCategories';
import { CurrentMonthBudgetView } from './CurrentMonthBudgetView';
import { BarChart3, Receipt, FolderOpen, Calendar } from 'lucide-react';

export function PFMModule() {
  const [activeSubmodule, setActiveSubmodule] = useState('budget');

  const renderSubmodule = () => {
    switch (activeSubmodule) {
      case 'budget':
        return <CurrentMonthBudgetView />;
      case 'dashboard':
        return <BudgetWellnessDashboard />;
      case 'expenses':
        return <TrackExpenses />;
      case 'categories':
        return <ManageCategories />;
      default:
        return <CurrentMonthBudgetView />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Financial Management</h1>
        <p className="text-gray-600">Comprehensive budget tracking, expense management, and financial wellness tools</p>
        
        {/* Submodule Navigation */}
        <div className="mt-6 flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveSubmodule('budget')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'budget'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Current Budget</span>
          </button>
          <button
            onClick={() => setActiveSubmodule('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'dashboard'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Wellness Dashboard</span>
          </button>
          <button
            onClick={() => setActiveSubmodule('expenses')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'expenses'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Track Expenses</span>
          </button>
          <button
            onClick={() => setActiveSubmodule('categories')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSubmodule === 'categories'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Manage Categories</span>
          </button>
        </div>
      </div>

      {renderSubmodule()}
    </div>
  );
}