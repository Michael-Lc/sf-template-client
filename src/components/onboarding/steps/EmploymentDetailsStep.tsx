import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { EMPLOYER_TYPES, EMPLOYMENT_TYPES, SALARY_FREQUENCIES, BANKS } from '@/types/onboarding';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface EmploymentDetailsForm {
  employerName: string;
  employerType: 'public' | 'private' | 'ngo' | 'self-employed';
  employmentType: 'permanent' | 'contract' | 'casual';
  occupation: string;
  netTakeHomePay: number;
  salaryFrequency: 'monthly' | 'bi-weekly';
  salaryAccountBank: string;
  dateOfEmployment: string;
}

export function EmploymentDetailsStep() {
  const { formData, updateFormData, nextStep, previousStep, markStepCompleted } = useOnboardingStore();
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<EmploymentDetailsForm>({
    defaultValues: {
      employerName: formData.employerName || '',
      employerType: formData.employerType || 'private',
      employmentType: formData.employmentType || 'permanent',
      occupation: formData.occupation || '',
      netTakeHomePay: formData.netTakeHomePay || 0,
      salaryFrequency: formData.salaryFrequency || 'monthly',
      salaryAccountBank: formData.salaryAccountBank || '',
      dateOfEmployment: formData.dateOfEmployment || ''
    },
    mode: 'onChange'
  });

  const watchedSalary = watch('netTakeHomePay');
  const watchedFrequency = watch('salaryFrequency');

  const onSubmit = (data: EmploymentDetailsForm) => {
    updateFormData(data);
    markStepCompleted(3);
    nextStep();
  };

  const calculateAnnualSalary = () => {
    if (!watchedSalary) return 0;
    return watchedFrequency === 'monthly' ? watchedSalary * 12 : watchedSalary * 26;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Employment & Income Details</h2>
          <p className="text-gray-600">Please provide your employment and income information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Employer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer Name *
            </label>
            <input
              {...register('employerName', { required: 'Employer name is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter employer name"
            />
            {errors.employerName && (
              <p className="text-red-500 text-sm mt-1">{errors.employerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer Type *
            </label>
            <select
              {...register('employerType', { required: 'Employer type is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {EMPLOYER_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.employerType && (
              <p className="text-red-500 text-sm mt-1">{errors.employerType.message}</p>
            )}
          </div>
        </div>

        {/* Employment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type *
            </label>
            <select
              {...register('employmentType', { required: 'Employment type is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.employmentType && (
              <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupation / Role *
            </label>
            <input
              {...register('occupation', { required: 'Occupation is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Software Engineer"
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
            )}
          </div>
        </div>

        {/* Salary Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Take-Home Pay *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₵</span>
              <input
                type="number"
                {...register('netTakeHomePay', { 
                  required: 'Net take-home pay is required',
                  min: { value: 1, message: 'Salary must be greater than 0' }
                })}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            {errors.netTakeHomePay && (
              <p className="text-red-500 text-sm mt-1">{errors.netTakeHomePay.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Frequency *
            </label>
            <select
              {...register('salaryFrequency', { required: 'Payment frequency is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SALARY_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
            {errors.salaryFrequency && (
              <p className="text-red-500 text-sm mt-1">{errors.salaryFrequency.message}</p>
            )}
          </div>
        </div>

        {/* Salary Summary */}
        {watchedSalary > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Salary Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">
                  {watchedFrequency === 'monthly' ? 'Monthly' : 'Bi-weekly'} Pay:
                </span>
                <span className="font-semibold text-blue-800 ml-2">
                  {formatCurrency(watchedSalary)}
                </span>
              </div>
              <div>
                <span className="text-blue-600">Estimated Annual:</span>
                <span className="font-semibold text-blue-800 ml-2">
                  {formatCurrency(calculateAnnualSalary())}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bank and Employment Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Account Bank *
            </label>
            <select
              {...register('salaryAccountBank', { required: 'Salary account bank is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your bank</option>
              {BANKS.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.salaryAccountBank && (
              <p className="text-red-500 text-sm mt-1">{errors.salaryAccountBank.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Employment *
            </label>
            <input
              type="date"
              {...register('dateOfEmployment', { required: 'Date of employment is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.dateOfEmployment && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfEmployment.message}</p>
            )}
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