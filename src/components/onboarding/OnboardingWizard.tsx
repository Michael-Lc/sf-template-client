import { useOnboardingStore } from '@/stores/onboardingStore';
import { StepIndicator } from './StepIndicator';
import { BasicInformationStep } from './steps/BasicInformationStep';
import { ContactAddressStep } from './steps/ContactAddressStep';
import { EmploymentDetailsStep } from './steps/EmploymentDetailsStep';
import { EmergencyContactStep } from './steps/EmergencyContactStep';
import { BankingWalletStep } from './steps/BankingWalletStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { OnboardingComplete } from './OnboardingComplete';
import { Card } from '@/components/ui/card';

export function OnboardingWizard() {
  const { currentStep, isCompleted } = useOnboardingStore();

  if (isCompleted) {
    return <OnboardingComplete />;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep />;
      case 2:
        return <ContactAddressStep />;
      case 3:
        return <EmploymentDetailsStep />;
      case 4:
        return <EmergencyContactStep />;
      case 5:
        return <BankingWalletStep />;
      case 6:
        return <DocumentUploadStep />;
      default:
        return <BasicInformationStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FinanceHub</h1>
          <p className="text-gray-600">Let's set up your profile to get started</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Main Content */}
        <Card className="mt-8 p-8">
          {renderCurrentStep()}
        </Card>
      </div>
    </div>
  );
}