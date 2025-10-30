import { create } from 'zustand';
import { OnboardingData, OnboardingStep } from '../types/onboarding';

interface OnboardingState {
  currentStep: number;
  steps: OnboardingStep[];
  formData: Partial<OnboardingData>;
  isSubmitting: boolean;
  isCompleted: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepCompleted: (stepId: number) => void;
  submitOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
}

const initialSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Personal identification details',
    isCompleted: false,
    isActive: true
  },
  {
    id: 2,
    title: 'Contact & Address',
    description: 'Contact information and address',
    isCompleted: false,
    isActive: false
  },
  {
    id: 3,
    title: 'Employment Details',
    description: 'Work and income information',
    isCompleted: false,
    isActive: false
  },
  {
    id: 4,
    title: 'Emergency Contact',
    description: 'Next of kin information',
    isCompleted: false,
    isActive: false
  },
  {
    id: 5,
    title: 'Banking & Wallet',
    description: 'Financial account details',
    isCompleted: false,
    isActive: false
  },
  {
    id: 6,
    title: 'Document Upload',
    description: 'Identity and employment documents',
    isCompleted: false,
    isActive: false
  }
];

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 1,
  steps: initialSteps,
  formData: {},
  isSubmitting: false,
  isCompleted: false,

  setCurrentStep: (step) => set((state) => ({
    currentStep: step,
    steps: state.steps.map(s => ({
      ...s,
      isActive: s.id === step
    }))
  })),

  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length) {
      get().setCurrentStep(currentStep + 1);
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      get().setCurrentStep(currentStep - 1);
    }
  },

  markStepCompleted: (stepId) => set((state) => ({
    steps: state.steps.map(step =>
      step.id === stepId ? { ...step, isCompleted: true } : step
    )
  })),

  submitOnboarding: async () => {
    set({ isSubmitting: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('Onboarding data:', get().formData);
      
      set({ isCompleted: true, isSubmitting: false });
    } catch (error) {
      console.error('Onboarding submission failed:', error);
      set({ isSubmitting: false });
    }
  },

  resetOnboarding: () => set({
    currentStep: 1,
    steps: initialSteps,
    formData: {},
    isSubmitting: false,
    isCompleted: false
  })
}));