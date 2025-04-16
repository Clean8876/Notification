// StepperContext.jsx
import React, { createContext, useContext, useState } from 'react';

const StepperContext = createContext();


export const useStepper = () => useContext(StepperContext);


export const StepperProvider = ({ totalSteps, children }) => {

  const [currentStep, setCurrentStep] = useState(0);
  
  const [formSubmitted, setFormSubmitted] = useState(false);


  const nextStep = () => {
    if (formSubmitted) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
      setFormSubmitted(false);
    } else {
      setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
    }
  };


  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };


  const goToStep = (index) => {
    if (index >= 0 && index < totalSteps) {
      setCurrentStep(index);
    }
  };
  const markStepCompleted = () => {
    setFormSubmitted(true);
  };
  

  return (
    <StepperContext.Provider
      value={{ currentStep, nextStep, prevStep, goToStep, totalSteps,markStepCompleted, formSubmitted }}
    >
      {children}
    </StepperContext.Provider>
  );
};
