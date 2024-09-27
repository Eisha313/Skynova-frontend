
import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: string[];
  onStepChange: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps, onStepChange }) => {
  return (
    <div className="flex justify-center items-center my-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => onStepChange(index)}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 border-t-2 ${index < currentStep ? 'border-blue-500' : 'border-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
