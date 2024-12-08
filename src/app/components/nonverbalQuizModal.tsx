
// import React from 'react';
// import Image from 'next/image';

// interface Question {
//   _id: string;
//   text: string;
//   options: string[];
//   answer: string;
// }

// interface QuizDetail {
//   _id: string;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// interface NonverbalQuizModalProps {
//   isOpen: boolean; 
//   onClose: () => void;
//   quiz: QuizDetail | null; 
// }

// const NonverbalQuizModal: React.FC<NonverbalQuizModalProps> = ({ isOpen, onClose, quiz }) => {
//   if (!isOpen || !quiz) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl w-full">
//         <button
//           className="text-gray-600 hover:text-gray-800"
//           onClick={onClose}
//         >
//           Close
//         </button>
//         <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
//         <p className="mb-4">{quiz.description}</p>
//         <ul className="space-y-4">
//           {quiz.questions.map((question) => (
//             <li key={question._id}>
//               <h3 className="font-semibold">{question.text}</h3>
//               <ul className="space-y-2 mt-2">
//                 {question.options.map((option, index) => (
//                   <li key={index}>
//                     <Image
//                       src={option}
//                       alt={`Option ${index + 1}`}
//                       width={128}
//                       height={128}
//                       className="object-cover"
//                     />
//                   </li>
//                 ))}
//               </ul>
//               <p className="mt-2">
//                 <strong>Correct Answer:</strong>
//                 <Image
//                   src={question.answer}
//                   alt="Correct Answer"
//                   width={128}
//                   height={128}
//                   className="object-cover"
//                 />
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NonverbalQuizModal;
// src/app/components/NonverbalQuizModal.tsx

import React from 'react';
import Image from 'next/image';
import{QuizDetail,Option,Question} from "@/types/types";


interface NonverbalQuizModalProps {
  isOpen: boolean; 
  onClose: () => void;
  quiz: QuizDetail | null; 
}

const NonverbalQuizModal: React.FC<NonverbalQuizModalProps> = ({ isOpen, onClose, quiz }) => {
 
  const getValidImageSrc = (src: unknown): string => {
    if (typeof src !== "string" || src.trim() === "") {
      return "/placeholder-image.png"; // Replace with your placeholder image path
    }
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    if (src.startsWith("/")) {
      return src;
    }
    return "/placeholder-image.png"; // Fallback image
  };

  if (!isOpen || !quiz) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md max-w-3xl w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded"
          >
            ✖
          </button>
        </div>

        {/* Description */}
        <div className="p-4">
          <p className="text-gray-700 mb-4">{quiz.description}</p>

          {/* Questions */}
          <ul className="space-y-6">
            {quiz.questions?.map((question) => (
              <li key={question._id} className="border-b pb-4">
                <h3 className="font-semibold text-lg">{question.text}</h3>

                {/* Options */}
                {/* <ul className="flex flex-wrap space-x-4 mt-4">
                  {question.options.map((option) => (
                    <li key={option._id} className="flex flex-col items-center mb-4">
                      <Image
                        src={getValidImageSrc(option.image)}
                        alt={`Option ${option.label.toUpperCase()}`}
                        width={100}
                        height={100}
                        className="object-cover border rounded-lg"
                      />
                      <span className="text-sm mt-2">Option {option.label.toUpperCase()}</span>
                    </li>
                  ))}
                </ul> */}
                <ul className="flex flex-wrap space-x-4 mt-4">
  {Array.isArray(question.options) && question.options.map((option) => (
    <li key={option._id} className="flex flex-col items-center mb-4">
      <Image
        src={getValidImageSrc(option.image)}
        alt={`Option ${option.label.toUpperCase()}`}
        width={100}
        height={100}
        className="object-cover border rounded-lg"
      />
      <span className="text-sm mt-2">Option {option.label.toUpperCase()}</span>
    </li>
  ))}
</ul>

                
                {/* <div className="mt-4">
                  <p className="font-medium">
                    <strong>Correct Answer:</strong>
                  </p>
                  {(() => {
                    const correctOption = question.options.find(opt => opt.label === question.answer);
                    if (correctOption) {
                      return (
                        <div className="flex flex-col items-center mt-2">
                          <Image
                            src={getValidImageSrc(correctOption.image)}
                            alt={`Correct Answer: Option ${correctOption.label.toUpperCase()}`}
                            width={100}
                            height={100}
                            className="object-cover border rounded-lg"
                          />
                          <span className="text-sm mt-2">Option {correctOption.label.toUpperCase()}</span>
                        </div>
                      );
                    } else {
                      return <p className="text-red-500">Correct answer not found.</p>;
                    }
                  })()}
                </div> */}
                <div className="mt-4">
  <p className="font-medium">
    <strong>Correct Answer:</strong>
  </p>
  {(() => {
    // Check if question.options is an array before using find
    const correctOption = Array.isArray(question.options) 
      ? question.options.find(opt => opt.label === question.answer) 
      : undefined;
    
    if (correctOption) {
      return (
        <div className="flex flex-col items-center mt-2">
          <Image
            src={getValidImageSrc(correctOption.image)}
            alt={`Correct Answer: Option ${correctOption.label.toUpperCase()}`}
            width={100}
            height={100}
            className="object-cover border rounded-lg"
          />
          <span className="text-sm mt-2">Option {correctOption.label.toUpperCase()}</span>
        </div>
      );
    } else {
      return <p className="text-red-500">Correct answer not found.</p>;
    }
  })()}
</div>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NonverbalQuizModal;

