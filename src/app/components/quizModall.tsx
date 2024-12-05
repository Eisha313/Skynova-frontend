// 'use client';

// import React from 'react';

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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//         <button className="absolute top-2 right-2" onClick={onClose}>
//           Close
//         </button>
//         <div className="text-center mb-6">
//   <label htmlFor="quiz-title" className="block text-gray-600 text-sm mb-2">
//     Quiz Title
//   </label>
//   <h2 id="quiz-title" className="text-xl font-bold mb-4">
//     {quizDetails.title}
//   </h2>
  
//   <label htmlFor="quiz-description" className="block text-gray-600 text-sm mb-2">
//     Description
//   </label>
//   <p id="quiz-description" className="mb-4 text-gray-700">
//     {quizDetails.description}
//   </p>
// </div>

//         <div className=''>
//           {quizDetails.questions && quizDetails.questions.length > 0 ? (
//             quizDetails.questions.map((question: any, index: number) => (
//               <div key={question._id} className="mb-6">
//                 <h3 className="font-medium mb-2">
//                   {index + 1}. {question.text}
//                 </h3>
//                 <ul className="list-disc pl-6">
//                   {question.options.map((option: string, i: number) => (
//                     <li key={i}>{option}</li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-green-600">
//                   Correct Answer: {question.answer.join(', ')}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No questions available for this quiz.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuizModal
'use client';

import React from 'react';

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

const QuizModal = ({
  quizDetails,
  isOpen,
  onClose,
}: {
  quizDetails: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
          onClick={onClose}
          aria-label="Close"
        >
          ✖
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">
            {quizDetails.title}
          </h2>
          <p className="text-gray-500 text-sm mb-6">{quizDetails.description}</p>
        </div>

        <div>
          {quizDetails.questions && quizDetails.questions.length > 0 ? (
            quizDetails.questions.map((question: any, index: number) => (
              <div
                key={question._id}
                className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {index + 1}. {question.text}
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {question.options.map((option: string, i: number) => (
                    <li key={i} className="text-gray-800">
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="text-sm mt-3">
                  <span className="font-semibold text-green-600">
                    Correct Answer:
                  </span>{' '}
                  <span className="text-gray-800">{question.answer}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              No questions available for this quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
