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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Project</h1>
      <Stepper>
        <Step title={stepLabels[0]}>
          <Home className="bg-white p-6 rounded-lg shadow-sm" />
        </Step>
        
        <Step title={stepLabels[1]}>
          <JsonUpload className="bg-white p-6 rounded-lg shadow-sm" />
        </Step>
        
        <Step title={stepLabels[2]}>
          <ConfirmProjectUpload className="bg-white p-6 rounded-lg shadow-sm" />
        </Step>
      </Stepper>
    </div>
  );
};

export default DashboardSteps;