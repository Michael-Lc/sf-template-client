import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { COUNTRIES } from '@/types/onboarding';
import { Button } from '@/components/ui/button';
import { ArrowRight, User } from 'lucide-react';

interface BasicInfoForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  ghanaCardNumber: string;
  tinNumber?: string;
  ssnitNumber?: string;
}

export function BasicInformationStep() {
  const { formData, updateFormData, nextStep, markStepCompleted } = useOnboardingStore();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<BasicInfoForm>({
    defaultValues: {
      firstName: formData.firstName || '',
      middleName: formData.middleName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
      gender: formData.gender || 'male',
      nationality: formData.nationality || 'Ghana',
      ghanaCardNumber: formData.ghanaCardNumber || '',
      tinNumber: formData.tinNumber || '',
      ssnitNumber: formData.ssnitNumber || ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: BasicInfoForm) => {
    updateFormData(data);
    markStepCompleted(1);
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          <p className="text-gray-600">Please provide your personal identification details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              {...register('middleName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter middle name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Date of Birth and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality *
          </label>
          <select
            {...register('nationality', { required: 'Nationality is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
          )}
        </div>

        {/* ID Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghana Card Number *
            </label>
            <input
              {...register('ghanaCardNumber', { 
                required: 'Ghana Card number is required',
                pattern: {
                  value: /^GHA-\d{9}-\d$/,
                  message: 'Invalid Ghana Card format (GHA-XXXXXXXXX-X)'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="GHA-123456789-1"
            />
            {errors.ghanaCardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.ghanaCardNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TIN Number
            </label>
            <input
              {...register('tinNumber')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter TIN number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SSNIT Number
            </label>
            <input
              {...register('ssnitNumber')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter SSNIT number"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
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