import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentStep: 0,
    formData: {},
    isCurrentStepValid: false,
  };





  const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
      nextStep: (state) => {
        state.currentStep += 1;
      },
      prevStep: (state) => {
        state.currentStep -= 1;
      },
      goToStep: (state, action) => {
        state.currentStep = action.payload;
      },
      setFormData: (state, action) => {
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
      },
      setStepValidity: (state, action) => {
        state.isCurrentStepValid = action.payload;
      },
      resetStepper: () => initialState,
    },
  });
  
  export const {
    nextStep,
    prevStep,
    goToStep,
    setFormData,
    setStepValidity,
    resetStepper,
  } = stepperSlice.actions;
  
  export default stepperSlice.reducer;


