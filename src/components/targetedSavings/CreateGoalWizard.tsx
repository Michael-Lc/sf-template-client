import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useTargetedSavingsStore } from '@/stores/targetedSavingsStore';
import { PREDEFINED_PLANS, FUNDING_SOURCES, getBonusRate, calculateMaturityBalance } from '@/types/targetedSavings';
import { formatCurrency } from '@/lib/utils';

export function CreateGoalWizard() {
  const { 
    currentStep, 
    goalForm, 
    setCurrentStep, 
    updateGoalForm, 
    resetGoalForm, 
    setIsCreatingGoal,
    addGoal 
  } = useTargetedSavingsStore();

  const [customPlanName, setCustomPlanName] = useState('');
  const [isCustomPlan, setIsCustomPlan] = useState(false);

  const handleClose = () => {
    resetGoalForm();
    setIsCreatingGoal(false);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const bonusRate = goalForm.withdrawalRule === 'maturity' ? getBonusRate(goalForm.duration || 0) : 0;
    const expectedMaturityBalance = calculateMaturityBalance(
      goalForm.targetAmount || 0,
      bonusRate,
      goalForm.withdrawalRule || 'anytime'
    );

    const newGoal = {
      id: Date.now().toString(),
      name: goalForm.name || '',
      description: goalForm.description || '',
      targetAmount: goalForm.targetAmount || 0,
      currentAmount: 0,
      duration: goalForm.duration || 0,
      frequency: goalForm.frequency || 'monthly',
      fundingSource: goalForm.fundingSource || 'wallet',
      startDate: goalForm.startDate || new Date().toISOString().split('T')[0],
      endDate: goalForm.endDate || '',
      withdrawalRule: goalForm.withdrawalRule || 'anytime',
      bonusRate,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      progress: 0,
      expectedMaturityBalance,
      contributionAmount: goalForm.targetAmount ? goalForm.targetAmount / (goalForm.duration || 1) : 0
    };

    addGoal(newGoal);
    handleClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Savings Goal</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {PREDEFINED_PLANS.map((plan) => (
                  <button
                    key={plan}
                    onClick={() => {
                      updateGoalForm({ name: plan });
                      setIsCustomPlan(false);
                    }}
                    className={`p-4 text-left border rounded-lg transition-colors ${
                      goalForm.name === plan && !isCustomPlan
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium">{plan}</p>
                  </button>
                ))}
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsCustomPlan(true);
                    updateGoalForm({ name: customPlanName });
                  }}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    isCustomPlan
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-700">Custom Plan Name</p>
                </button>
                
                {isCustomPlan && (
                  <input
                    type="text"
                    placeholder="Enter custom plan name"
                    value={customPlanName}
                    onChange={(e) => {
                      setCustomPlanName(e.target.value);
                      updateGoalForm({ name: e.target.value });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                placeholder="Describe your savings goal..."
                value={goalForm.description || ''}
                onChange={(e) => updateGoalForm({ description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Your Target</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={goalForm.targetAmount || ''}
                  onChange={(e) => updateGoalForm({ targetAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Months)
              </label>
              <select
                value={goalForm.duration || ''}
                onChange={(e) => updateGoalForm({ duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                {Array.from({ length: 60 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month} month{month > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {goalForm.duration && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800 mb-1">Bonus Rate Available</p>
                <p className="text-2xl font-bold text-green-700">{getBonusRate(goalForm.duration)}%</p>
                <p className="text-xs text-green-600">
                  Applies only if withdrawal rule is set to "At Maturity"
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Setup</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Savings Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['daily', 'weekly', 'monthly'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => updateGoalForm({ frequency: freq as any })}
                    className={`p-3 text-center border rounded-lg transition-colors ${
                      goalForm.frequency === freq
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium capitalize">{freq}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Source
              </label>
              <div className="space-y-3">
                {FUNDING_SOURCES.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => updateGoalForm({ fundingSource: source.id as any })}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      goalForm.fundingSource === source.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900">{source.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timing & Rules</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={goalForm.startDate || ''}
                  onChange={(e) => updateGoalForm({ startDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={goalForm.endDate || ''}
                  onChange={(e) => updateGoalForm({ endDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Rules
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => updateGoalForm({ withdrawalRule: 'maturity' })}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    goalForm.withdrawalRule === 'maturity'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">At Maturity</p>
                      <p className="text-sm text-gray-600">Withdraw only after end date</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {goalForm.duration ? getBonusRate(goalForm.duration) : 0}% Bonus
                    </Badge>
                  </div>
                </button>
                
                <button
                  onClick={() => updateGoalForm({ withdrawalRule: 'anytime' })}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    goalForm.withdrawalRule === 'anytime'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Anytime</p>
                      <p className="text-sm text-gray-600">Withdraw anytime with 1% penalty</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">1% Penalty</Badge>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        const bonusRate = goalForm.withdrawalRule === 'maturity' ? getBonusRate(goalForm.duration || 0) : 0;
        const expectedBalance = calculateMaturityBalance(goalForm.targetAmount || 0, bonusRate, goalForm.withdrawalRule || 'anytime');
        const contributionAmount = goalForm.targetAmount && goalForm.duration ? goalForm.targetAmount / goalForm.duration : 0;
        
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Summary</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Goal Name</p>
                  <p className="font-semibold text-gray-900">{goalForm.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Target Amount</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(goalForm.targetAmount || 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{goalForm.duration} months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Frequency</p>
                  <p className="font-semibold text-gray-900 capitalize">{goalForm.frequency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contribution Amount</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(contributionAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Maturity Balance</p>
                  <p className="font-semibold text-green-600">{formatCurrency(expectedBalance)}</p>
                </div>
              </div>
              
              {bonusRate > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bonus Interest</span>
                    <span className="font-semibold text-green-600">+{formatCurrency(expectedBalance - (goalForm.targetAmount || 0))}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return goalForm.name;
      case 2:
        return goalForm.targetAmount && goalForm.duration;
      case 3:
        return goalForm.frequency && goalForm.fundingSource;
      case 4:
        return goalForm.startDate && goalForm.endDate && goalForm.withdrawalRule;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create Savings Goal</h2>
              <p className="text-sm text-gray-600">Step {currentStep} of 5</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Goal Setup</span>
              <span>Target Details</span>
              <span>Contribution</span>
              <span>Timing & Rules</span>
              <span>Summary</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep === 5 ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span>Create Goal</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}