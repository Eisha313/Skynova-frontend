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
          {/* Outer Circle */}
          <div className="relative flex items-center justify-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${
                index <= currentStep ? 'bg-[#212C44]' : 'bg-gray-300'
              }`}
            >
              {/* Inner Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
                  index < currentStep
                    ? 'bg-blue-500 text-white'
                    : index === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600'
                }`}
                onClick={() => onStepChange(index)}
              >
                {index < currentStep ? '✔️' : index + 1}
              </div>
            </div>
          </div>

          {/* Line between steps */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              style={{ minWidth: '30px' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;

// import React from 'react';

// interface StepperProps {
//   currentStep: number;
//   steps: string[];
//   onStepChange: (step: number) => void;
// }

// const Stepper: React.FC<StepperProps> = ({ currentStep, steps, onStepChange }) => {
//   return (
//     <div className="flex justify-center items-center my-8 bg-gray-900 py-6 rounded-lg">
//       {steps.map((step, index) => (
//         <div key={index} className="flex items-center">
//           <div
//             className={`cursor-pointer flex items-center justify-center w-12 h-12 rounded-full border-4 
//               ${index < currentStep ? 'bg-blue-500 border-blue-500 text-white' : 
//               index === currentStep ? 'bg-blue-500 text-white border-blue-500' : 
//               'bg-gray-800 border-gray-500 text-gray-400'}`
//             }
//             onClick={() => onStepChange(index)}
//           >
//             {index < currentStep ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             ) : (
//               <span className="text-lg">{index + 1}</span>
//             )}
//           </div>
//           {index < steps.length - 1 && (
//             <div
//               className={`w-16 h-2 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-500'}`}
//             ></div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stepper;
