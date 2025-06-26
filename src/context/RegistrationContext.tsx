import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface RegistrationState {
  currentStep: number;
  userId: number | null;
  formData: {
    step1: { email: string } | null;
    step2: FormData | null;
    step3: FormData | null;
    step4: FormData | null;
    step5: Record<string, any> | null;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

type RegistrationAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_USER_ID'; payload: number }
  | { type: 'SET_STEP_DATA'; payload: { step: number; data: any } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'RESET' };

const initialState: RegistrationState = {
  currentStep: 1,
  userId: null,
  formData: {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  },
  loading: false,
  error: null,
  success: false,
};

function registrationReducer(state: RegistrationState, action: RegistrationAction): RegistrationState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_STEP_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [`step${action.payload.step}`]: action.payload.data,
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface RegistrationContextType {
  state: RegistrationState;
  dispatch: React.Dispatch<RegistrationAction>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
} 