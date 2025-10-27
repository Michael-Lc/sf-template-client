import { cn } from '@/lib/utils';
import { Wallet, PiggyBank, TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { id: 'finances', name: 'My Finances', icon: Wallet },
  { id: 'savings', name: 'Savings & Investments', icon: PiggyBank },
  { id: 'management', name: 'Personal Financial Management', icon: TrendingUp },
];

export function Navigation({ activeModule, onModuleChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FinanceHub</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => onModuleChange(module.id)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2',
                      activeModule === module.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{module.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    onModuleChange(module.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3',
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{module.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}