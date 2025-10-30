import { useOnboardingStore } from '@/stores/onboardingStore';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StepIndicator() {
  const { steps, currentStep } = useOnboardingStore();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200',
                  step.isCompleted
                    ? 'bg-green-500 text-white'
                    : step.isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                )}
              >
                {step.isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              
              {/* Step Info */}
              <div className="mt-2 text-center">
                <p className={cn(
                  'text-sm font-medium',
                  step.isActive ? 'text-blue-600' : 'text-gray-600'
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-24">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-all duration-200',
                  step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}