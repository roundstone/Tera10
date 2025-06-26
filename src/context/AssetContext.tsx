import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AssetState {
  currentStep: number;
  userId: string | null;
  assetId: number | null;
  editAssetId: number | null;
  formData: {
    step1: any | null;
    step2: any | null;
    step3: any | null;
    step4: any | null;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
}

type AssetAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'SET_ASSET_ID'; payload: number }
  | { type: 'SET_EDIT_ASSET_ID'; payload: number }
  | { type: 'SET_STEP_DATA'; payload: { step: number; data: any } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'RESET' };

const uId = localStorage.getItem('userId') || '';

const initialState: AssetState = {
  currentStep: 1,
  userId: uId,
  assetId: null,
  editAssetId: null,
  formData: {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
  },
  loading: false,
  error: null,
  success: false,
};

function assetReducer(state: AssetState, action: AssetAction): AssetState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_ASSET_ID':
      return { ...state, assetId: action.payload };
    case 'SET_EDIT_ASSET_ID':
      return { ...state, editAssetId: action.payload };
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

interface AssetContextType {
  state: AssetState;
  dispatch: React.Dispatch<AssetAction>;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export function AssetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assetReducer, initialState);

  return (
    <AssetContext.Provider value={{ state, dispatch }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAsset() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAsset must be used within a AssetProvider');
  }
  return context;
} 