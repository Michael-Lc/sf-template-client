import { useForm } from 'react-hook-form';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { MOBILE_NETWORKS, BANKS } from '@/types/onboarding';
import { Button } from '@/components/ui/button';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import { ArrowRight, ArrowLeft, Wallet, CreditCard } from 'lucide-react';
import { useEffect } from 'react';

interface BankingWalletForm {
  smiggleWalletId?: string;
  mobileMoneyNetwork?: string;
  mobileMoneyNumber?: string;
  bankCardNumber?: string;
  bankName?: string;
  cardExpiryDate?: string;
}

export function BankingWalletStep() {
  const { formData, updateFormData, nextStep, previousStep, markStepCompleted } = useOnboardingStore();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BankingWalletForm>({
    defaultValues: {
      smiggleWalletId: formData.smiggleWalletId || '',
      mobileMoneyNetwork: formData.mobileMoneyNetwork || '',
      mobileMoneyNumber: formData.mobileMoneyNumber || '',
      bankCardNumber: formData.bankCardNumber || '',
      bankName: formData.bankName || '',
      cardExpiryDate: formData.cardExpiryDate || ''
    },
    mode: 'onChange'
  });

  // Auto-generate Smiggle Wallet ID
  useEffect(() => {
    if (!formData.smiggleWalletId) {
      const walletId = `SW${Date.now().toString().slice(-8)}`;
      setValue('smiggleWalletId', walletId);
    }
  }, [formData.smiggleWalletId, setValue]);

  const onSubmit = (data: BankingWalletForm) => {
    updateFormData(data);
    markStepCompleted(5);
    nextStep();
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Wallet className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Banking & Wallet Information</h2>
          <p className="text-gray-600">Set up your financial accounts for transactions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Smiggle Wallet */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-medium text-blue-800">Smiggle Wallet</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wallet ID (Auto-generated)
            </label>
            <input
              {...register('smiggleWalletId')}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              placeholder="Auto-generating..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Your unique Smiggle Wallet ID will be used for all transactions
            </p>
          </div>
        </div>

        {/* Mobile Money Account */}
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <h3 className="text-lg font-medium text-green-800">Mobile Money Account</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Network
              </label>
              <select
                {...register('mobileMoneyNetwork')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select network</option>
                {MOBILE_NETWORKS.map((network) => (
                  <option key={network.value} value={network.value}>
                    {network.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Money Number
              </label>
              <input
                {...register('mobileMoneyNumber', {
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit mobile number'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0123456789"
              />
              {errors.mobileMoneyNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.mobileMoneyNumber.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bank Card */}
        <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-medium text-purple-800">Bank Card</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <select
                {...register('bankName')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your bank</option>
                {BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  {...register('bankCardNumber', {
                    pattern: {
                      value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                      message: 'Please enter a valid 16-digit card number'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    e.target.value = formatted;
                  }}
                />
                {errors.bankCardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.bankCardNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <MonthYearPicker
                  value={formData.cardExpiryDate || ''}
                  onChange={(value) => setValue('cardExpiryDate', value)}
                  placeholder="MM/YY"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">🔒</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Security Notice</h4>
              <p className="text-sm text-yellow-700">
                Your financial information is encrypted and securely stored. We use bank-level security 
                to protect your data and will never share it with unauthorized parties.
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