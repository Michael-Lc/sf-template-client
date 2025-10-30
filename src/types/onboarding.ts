export interface OnboardingData {
  // Step 1: Basic Identification
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  ghanaCardNumber: string;
  tinNumber?: string;
  ssnitNumber?: string;

  // Step 2: Contact & Address
  mobileNumber: string;
  countryCode: string;
  emailAddress: string;
  residentialAddress: string;
  digitalAddress?: string;
  nearestLandmark?: string;

  // Step 3: Employment & Income
  employerName: string;
  employerType: 'public' | 'private' | 'ngo' | 'self-employed';
  employmentType: 'permanent' | 'contract' | 'casual';
  occupation: string;
  netTakeHomePay: number;
  salaryFrequency: 'monthly' | 'bi-weekly';
  salaryAccountBank: string;
  dateOfEmployment: string;

  // Step 4: Next of Kin
  nextOfKinName: string;
  nextOfKinRelationship: 'spouse' | 'parent' | 'sibling' | 'friend' | 'other';
  nextOfKinContact: string;
  nextOfKinAddress?: string;

  // Step 5: Banking & Wallet
  smiggleWalletId?: string;
  mobileMoneyNetwork?: string;
  mobileMoneyNumber?: string;
  bankCardNumber?: string;
  bankName?: string;
  cardExpiryDate?: string;

  // Step 6: Documents
  nationalIdFront?: File;
  nationalIdBack?: File;
  employmentLetter?: File;
  latestPayslip?: File;
  selfiePhoto?: File;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const COUNTRIES = [
  'Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'Tunisia', 'Algeria',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Other'
];

export const EMPLOYER_TYPES = [
  { value: 'public', label: 'Public Sector' },
  { value: 'private', label: 'Private Company' },
  { value: 'ngo', label: 'NGO/Non-Profit' },
  { value: 'self-employed', label: 'Self-Employed' }
];

export const EMPLOYMENT_TYPES = [
  { value: 'permanent', label: 'Permanent' },
  { value: 'contract', label: 'Contract' },
  { value: 'casual', label: 'Casual' }
];

export const SALARY_FREQUENCIES = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'bi-weekly', label: 'Bi-weekly' }
];

export const RELATIONSHIPS = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'friend', label: 'Friend' },
  { value: 'other', label: 'Other' }
];

export const BANKS = [
  'Stanbic Bank', 'GCB Bank', 'Ecobank', 'Absa Bank', 'Fidelity Bank',
  'Standard Chartered', 'Zenith Bank', 'UBA Bank', 'CAL Bank', 'Other'
];

export const MOBILE_NETWORKS = [
  { value: 'mtn', label: 'MTN Mobile Money' },
  { value: 'vodafone', label: 'Vodafone Cash' },
  { value: 'airteltigo', label: 'AirtelTigo Money' }
];