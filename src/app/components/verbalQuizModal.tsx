// 'use client';
// import React from 'react';

// interface Question {
//   _id?: string;
//   text: string;
//   options: string[];
//   answer: string;
//   quizId?: string;
// }

// interface QuizDetail {
//   _id: string;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// interface QuizModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   quizDetails: QuizDetail | null;
// }

// const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quizDetails }) => {
//   if (!isOpen || !quizDetails) return null;

//   return (
//     <div className="fixed inset-0 bg-custom-image bg-opacity-50 flex justify-center items-center z-50 text-white">
//       <div className="bg-[#212C44] p-6 rounded-lg shadow-lg w-4/5 max-w-lg text-white">
//         <h2 className="text-2xl font-bold mb-4text-white">{quizDetails.title}</h2>
//         <p className="text-white mb-4">{quizDetails.description}</p>
//         {quizDetails.questions.length === 0 ? (
//           <p>No questions available for this quiz.</p>
//         ) : (
//           <ul className="space-y-4">
//             {quizDetails.questions.map((question, index) => (
              
//               <li key={index} className="border p-4 rounded-md shadow-sm">
//                 <p className="font-semibold mb-2">{question.text}</p>
//                 <ul className="list-disc list-inside mb-2">
//                   {question.options.map((option, optIndex) => (
//                     <li key={optIndex} className="text-white">{option}</li>
//                   ))}
//                 </ul>
//                 <p className="font-medium text-blue-600">Correct Answer: {question.answer}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//         <button
//           onClick={onClose}
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuizModal;
"use client";
import React from "react";

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string;
  quizId?: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizDetails: QuizDetail | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quizDetails }) => {
  if (!isOpen || !quizDetails) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-16 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#212C44] p-6 rounded-lg shadow-lg w-4/5 max-w-lg text-white relative max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Title and Description */}
        <h2 className="text-2xl mt-12 font-bold mb-4">{quizDetails.title}</h2>
        <p className="mb-4">{quizDetails.description}</p>

        {/* Questions List */}
        {quizDetails.questions.length === 0 ? (
          <p className="italic text-gray-400">No questions available for this quiz.</p>
        ) : (
          <ul className="space-y-4">
            {quizDetails.questions.map((question, index) => (
              <li key={index} className="border p-4 rounded-md shadow-sm bg-[#1A2236]">
                <p className="font-semibold mb-2">{index + 1}. {question.text}</p>
                <ul className="list-disc list-inside mb-2">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex}>{option}</li>
                  ))}
                </ul>
                <p className="font-medium text-green-500">
                  Correct Answer: <span>{question.answer}</span>
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
