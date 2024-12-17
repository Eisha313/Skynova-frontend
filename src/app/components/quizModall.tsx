
// "use client";

// import React from "react";

// interface QuizModalProps {
//   quizDetails: {
//     title: string;
//     description: string;
//     questions: {
//       _id: string;
//       text: string;
//       options: string[];
//       answer: string;
//     }[];
//   };
//   isOpen: boolean;
//   onClose: () => void;
// }

// const QuizModal = ({ quizDetails, isOpen, onClose }: { quizDetails: any; isOpen: boolean; onClose: () => void }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className=" fixed inset-0 bg-black  bg-opacity-60 flex justify-center items-center z-50 overflow-y-auto"
//       onClick={onClose}
//     >
//       <div className="bg-custom-image py-4 mt-24  text-white rounded-xl shadow-lg max-w-2xl w-full p-8 relative overflow-y-auto">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-white hover:text-gray-900 transition z-10"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ✖
//         </button>

//         {/* Modal Content */}
//         <div className="text-center">
//           <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">{quizDetails.title}</h2>
//           <p className="text-white text-sm mb-6">{quizDetails.description}</p>
//         </div>

//         <div>
//           {quizDetails.questions && quizDetails.questions.length > 0 ? (
//             quizDetails.questions.map((question: any, index: number) => (
//               <div key={question._id} className="mb-8 p-4 bg-[#212C44] rounded-lg shadow-sm">
//                 <h3 className="font-semibold text-lg mb-2">
//                   {index + 1}. {question.text}
//                 </h3>
//                 <ul className="list-disc pl-6 text-white space-y-1">
//                   {question.options.map((option: string, i: number) => (
//                     <li key={i} className="text-white">
//                       {option}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="text-sm mt-3">
//                   <span className="font-semibold text-green-600">Correct Answer:</span>{" "}
//                   <span className="text-white">{question.answer}</span>
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400 italic">No questions available for this quiz.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizModal;
"use client";

import React from "react";

interface QuizModalProps {
  quizDetails: {
    title: string;
    description: string;
    questions: {
      _id: string;
      text: string;
      options: string[];
      answer: string;
    }[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal = ({ quizDetails, isOpen, onClose }: QuizModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-custom-image py-4 text-white rounded-xl shadow-lg max-w-2xl w-full p-8 relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-900 transition"
          onClick={onClose}
          aria-label="Close"
        >
          ✖
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">{quizDetails.title}</h2>
          <p className="text-white text-sm mb-6">{quizDetails.description}</p>
        </div>

        <div>
          {quizDetails.questions && quizDetails.questions.length > 0 ? (
            quizDetails.questions.map((question, index) => (
              <div key={question._id} className="mb-8 p-4 bg-[#212C44] rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  {index + 1}. {question.text}
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  {question.options.map((option, i) => (
                    <li key={i} className="text-white">
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="text-sm mt-3">
                  <span className="font-semibold text-green-600">Correct Answer:</span>{" "}
                  <span className="text-white">{question.answer}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No questions available for this quiz.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
