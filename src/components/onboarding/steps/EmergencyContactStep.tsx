import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { RELATIONSHIPS } from '@/types/onboarding';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Users } from 'lucide-react';

interface EmergencyContactForm {
  nextOfKinName: string;
  nextOfKinRelationship: 'spouse' | 'parent' | 'sibling' | 'friend' | 'other';
  nextOfKinContact: string;
  nextOfKinAddress?: string;
}

export function EmergencyContactStep() {
  const { formData, updateFormData, nextStep, previousStep, markStepCompleted } = useOnboardingStore();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<EmergencyContactForm>({
    defaultValues: {
      nextOfKinName: formData.nextOfKinName || '',
      nextOfKinRelationship: formData.nextOfKinRelationship || 'parent',
      nextOfKinContact: formData.nextOfKinContact || '',
      nextOfKinAddress: formData.nextOfKinAddress || ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: EmergencyContactForm) => {
    updateFormData(data);
    markStepCompleted(4);
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Emergency Contact</h2>
          <p className="text-gray-600">Please provide your next of kin information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Emergency Contact Information */}
        <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
          <h3 className="text-lg font-medium text-orange-800 mb-4">Next of Kin Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('nextOfKinName', { required: 'Next of kin name is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter full name"
              />
              {errors.nextOfKinName && (
                <p className="text-red-500 text-sm mt-1">{errors.nextOfKinName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship *
                </label>
                <select
                  {...register('nextOfKinRelationship', { required: 'Relationship is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {RELATIONSHIPS.map((relationship) => (
                    <option key={relationship.value} value={relationship.value}>
                      {relationship.label}
                    </option>
                  ))}
                </select>
                {errors.nextOfKinRelationship && (
                  <p className="text-red-500 text-sm mt-1">{errors.nextOfKinRelationship.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  {...register('nextOfKinContact', { 
                    required: 'Contact number is required',
                    pattern: {
                      value: /^\+?[\d\s-()]+$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+233 123 456 789"
                />
                {errors.nextOfKinContact && (
                  <p className="text-red-500 text-sm mt-1">{errors.nextOfKinContact.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address (Optional)
              </label>
              <textarea
                {...register('nextOfKinAddress')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter address (optional)"
              />
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Important Notice</h4>
              <p className="text-sm text-blue-700">
                This person will be contacted in case of emergencies or if we're unable to reach you. 
                Please ensure the information provided is accurate and up-to-date.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            className="flex items-center space-x-2 px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            type="submit"
            disabled={!isValid}
            className="flex items-center space-x-2 px-6 py-3"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}