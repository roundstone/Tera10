import React from 'react';
import { useRegistration } from '../../../../context/RegistrationContext';
import { registrationApi } from '../../../../api/registrationApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../config/route';

// Assuming this is your existing component with form UI and Zod validation
const KYBForm: React.FC = () => {
  const { state, dispatch } = useRegistration();
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await registrationApi.submitStep2(state.userId!, formData);

      if (response.success) {
        dispatch({ type: 'SET_STEP_DATA', payload: { step: 2, data: formData } });
        dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
        navigate(ROUTES.ONBOARDING.DEVELOPER.KYC);
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div>
      {/* Your existing form UI code here */}
      {state.loading && <div>Loading...</div>}
      {state.error && <div className="error">{state.error}</div>}
    </div>
  );
};

export default KYBForm; 