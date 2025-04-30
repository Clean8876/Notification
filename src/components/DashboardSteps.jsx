// src/components/DashboardSteps.jsx
import React from 'react';
import Stepper from './Stepper';
import Step from './Step'; // Make sure this component exists
import Home from '../Pages/Home';
import JsonUpload from './JsonUpload';
import ConfirmProjectUpload from './ConfirmProjectUpload';

const DashboardSteps = () => {
  // Define your step labels here
  const stepLabels = [
    'Project Setup',
    'Upload Configuration',
    'Confirmation'
  ];

  return (
    <main className="pt-16 md:pt-16 w-10/12">
    <div className="p-1  p-1  ">
        <div className="max-max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Project</h1>
        </div>
      <Stepper>
        <Step title={stepLabels[0]}>
          <Home className="" />
        </Step>
        
        <Step title={stepLabels[1]}>
          <JsonUpload className="" />
        </Step>
        
        <Step title={stepLabels[2]}>
          <ConfirmProjectUpload className="" />
        </Step>
      </Stepper>
    </div></main>
  );
};

export default DashboardSteps;