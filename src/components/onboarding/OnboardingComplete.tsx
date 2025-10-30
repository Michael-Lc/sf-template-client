import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, User, Mail, Phone, Briefcase, CreditCard, FileText } from 'lucide-react';

export function OnboardingComplete() {
  const { formData, resetOnboarding } = useOnboardingStore();

  const handleContinue = () => {
    // In a real app, you would navigate to the main dashboard
    console.log('Navigating to dashboard...');
    resetOnboarding(); // For demo purposes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FinanceHub!</h1>
          <p className="text-gray-600">Your profile has been successfully created and is under review</p>
        </div>

        {/* Profile Summary */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {formData.firstName} {formData.middleName} {formData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{formData.emailAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-medium text-gray-900">
                    {formData.countryCode} {formData.mobileNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Employer</p>
                  <p className="font-medium text-gray-900">{formData.employerName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Smiggle Wallet ID</p>
                  <p className="font-medium text-gray-900">{formData.smiggleWalletId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Documents</p>
                  <p className="font-medium text-gray-900">All documents uploaded</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Document Verification</p>
                <p className="text-sm text-gray-600">
                  Our team will review your uploaded documents within 24-48 hours
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-green-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Account Activation</p>
                <p className="text-sm text-gray-600">
                  Once verified, your account will be activated and you'll receive a confirmation email
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Start Using FinanceHub</p>
                <p className="text-sm text-gray-600">
                  Access all features including savings, investments, and financial management tools
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button onClick={handleContinue} size="lg" className="px-8 py-3">
            Continue to Dashboard
          </Button>
          <p className="text-sm text-gray-500">
            You can always update your profile information from your account settings
          </p>
        </div>
      </div>
    </div>
  );
}