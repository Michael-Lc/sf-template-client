import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';

interface ContactAddressForm {
  countryCode: string;
  mobileNumber: string;
  emailAddress: string;
  residentialAddress: string;
  digitalAddress?: string;
  nearestLandmark?: string;
}

export function ContactAddressStep() {
  const { formData, updateFormData, nextStep, previousStep, markStepCompleted } = useOnboardingStore();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactAddressForm>({
    defaultValues: {
      countryCode: formData.countryCode || '+233',
      mobileNumber: formData.mobileNumber || '',
      emailAddress: formData.emailAddress || '',
      residentialAddress: formData.residentialAddress || '',
      digitalAddress: formData.digitalAddress || '',
      nearestLandmark: formData.nearestLandmark || ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: ContactAddressForm) => {
    updateFormData(data);
    markStepCompleted(2);
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Contact & Address Information</h2>
          <p className="text-gray-600">Please provide your contact details and address</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <div className="flex">
              <select
                {...register('countryCode')}
                className="px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              >
                <option value="+233">+233 (Ghana)</option>
                <option value="+234">+234 (Nigeria)</option>
                <option value="+254">+254 (Kenya)</option>
                <option value="+27">+27 (South Africa)</option>
              </select>
              <input
                {...register('mobileNumber', { 
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'Please enter a valid 9-digit mobile number'
                  }
                })}
                className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123456789"
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              {...register('emailAddress', { 
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
            {errors.emailAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</p>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residential Address *
          </label>
          <textarea
            {...register('residentialAddress', { required: 'Residential address is required' })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full residential address"
          />
          {errors.residentialAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.residentialAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digital Address (GhanaPost GPS)
            </label>
            <input
              {...register('digitalAddress', {
                pattern: {
                  value: /^[A-Z]{2}-\d{3}-\d{4}$/,
                  message: 'Invalid format (e.g., GA-123-4567)'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="GA-123-4567"
            />
            {errors.digitalAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.digitalAddress.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nearest Landmark
            </label>
            <input
              {...register('nearestLandmark')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Near Accra Mall"
            />
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