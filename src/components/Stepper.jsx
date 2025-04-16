// Stepper.jsx
import React, { useEffect, useState } from 'react';
import { StepperProvider, useStepper } from '../context/StepperContext';
import { FaCheck } from "react-icons/fa";

const Stepper = ({ children }) => {
  // Count the steps from the children passed into the component
  const totalSteps = React.Children.count(children);
  return (
    // Provide the step data to all children within this block.
    <StepperProvider totalSteps={totalSteps}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8 md:mb-12">  
          <StepIndicator />
        </div>
        <StepsContainer>{children}</StepsContainer>
        <Navigation />
      </div>
    </StepperProvider>
  );
};

const StepIndicator = () => {
  const { currentStep, totalSteps } = useStepper();
  const [isMobile, setIsMobile] = useState(false);
  const steps = ['Project Setup', 'Upload Configuration', 'Confirmation'];
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  // Mobile layout shows steps vertically
  if (isMobile) {
    return (
      <div className="py-2">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className={`
              flex items-center mb-4 last:mb-0 
              ${index < currentStep ? 'opacity-70' : ''}
              ${index === currentStep ? 'font-semibold' : ''}
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center shrink-0
              transition-colors duration-300 mr-3
              ${index < currentStep ? 'bg-blue-500' : ''}
              ${index === currentStep ? 'bg-blue-500 ring-4 ring-blue-200' : ''}
              ${index > currentStep ? 'bg-gray-100 border-2 border-gray-300' : ''}
            `}>
              {index < currentStep ? (
                <FaCheck className="w-3 h-3 text-white" />
              ) : (
                <span className={`${index <= currentStep ? 'text-white' : 'text-gray-400'} text-sm`}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={`
              text-sm font-medium
              ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}
            `}>
              {step}
            </span>
            
            {/* Vertical connector line */}
            {index < steps.length - 1 && (
              <div className="absolute ml-4 mt-8 h-4 w-[2px] bg-gray-200">
                <div 
                  className="w-full bg-blue-500 transition-all duration-500"
                  style={{
                    height: index < currentStep ? '100%' : '0%'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  // Desktop layout (horizontal steps)
  return (
    <div className="relative py-4">
      {/* Connector line container */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`
          }}
        />
      </div>
      <div className="flex justify-between relative">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-col items-center relative z-10"
            style={{ width: `${100 / steps.length}%` }}
          >
            {/* Step circle */}
            <div className={`
              w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
              transition-colors duration-300 mb-2
              ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-100 border-2 border-gray-300'}
              ${index === currentStep ? 'ring-2 sm:ring-4 ring-blue-200' : ''}
            `}>
              {index < currentStep ? (
                <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              ) : (
                <span className={`text-xs sm:text-sm ${index <= currentStep ? 'text-white' : 'text-gray-400'}`}>
                  {index + 1}
                </span>
              )}
            </div>
            {/* Step label */}
            <span className={`
              text-xs sm:text-sm font-medium text-center
              ${index <= currentStep ? 'text-gray-900' : 'text-gray-400'}
              ${index === currentStep ? 'font-semibold' : ''}
            `}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component that shows only the active step.
const StepsContainer = ({ children }) => {
  const { currentStep } = useStepper();
  // Convert children into an array to safely pick one.
  const stepsArray = React.Children.toArray(children);
  return (
    <div className="my-4 sm:my-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
        {stepsArray[currentStep]}
      </div>
    </div>
  );
};

// Navigation buttons to go forward or back between steps.
const Navigation = () => {
  const { currentStep, nextStep, prevStep, totalSteps } = useStepper();
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className="order-2 sm:order-1 w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors text-sm sm:text-base"
      >
        Previous
      </button>
      <button
        onClick={nextStep}
        disabled={currentStep === totalSteps - 1}
        className="order-1 sm:order-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors text-sm sm:text-base"
      >
        {currentStep === totalSteps - 2 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default Stepper;