
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; 

// interface Question {
//   _id?: string;
//   text: string;
//   options: string[];
//   answer: string; 
//   quizId?: string;
// }

// interface QuestionFormProps {
//   quizId: string;
//   onAddQuestion: (question: Question) => void;
// }

// const QuestionForm: React.FC<QuestionFormProps> = ({ quizId, onAddQuestion }) => {
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     text: '',
//     options: ['', '', '', ''],
//     answer: '', // Initialize as an empty string
//     quizId: quizId,
//   });

//   const [showOptions, setShowOptions] = useState(false); // State to show "End Quiz" and "Add Another Question"
//   const router = useRouter(); // For navigation

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[index] = value;
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleAnswerSelect = (index: number) => {
//     const selectedAnswer = `Option ${String.fromCharCode(97 + index)}`; // 'a', 'b', 'c', 'd'
//     setCurrentQuestion({ ...currentQuestion, answer: selectedAnswer }); // Set only one answer
//   };

//   const handleSaveQuestion = () => {
//     if (
//       currentQuestion.text &&
//       currentQuestion.options.every((option) => option) &&
//       currentQuestion.answer
//     ) {
//       onAddQuestion(currentQuestion);
//       setCurrentQuestion({ text: '', options: ['', '', '', ''], answer: '', quizId: quizId });
//       setShowOptions(true); // Show options after saving the question
//     } else {
//       alert('Please fill out all fields and select a correct answer.');
//     }
//   };

//   const handleAddAnotherQuestion = () => {
//     setShowOptions(false); // Hide options and reset form for a new question
//   };

//   const handleEndQuiz = () => {
//     router.push('/quizPage'); // Navigate to quiz list page
//   };

//   return (
//     <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
//       {!showOptions ? (
//         <>
//           <input
//             type="text"
//             placeholder="Question Text"
//             value={currentQuestion.text}
//             onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
//             className="border p-2 mb-2 w-full"
//           />
//           {currentQuestion.options.map((option, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <input
//                 type="radio"
//                 name="correctAnswer" // Group radio buttons by the same name
//                 checked={currentQuestion.answer === `Option ${String.fromCharCode(97 + index)}`}
//                 onChange={() => handleAnswerSelect(index)}
//                 className="mr-2"
//               />
//               <label className="mr-2">{String.fromCharCode(97 + index)}.</label>
//               <input
//                 type="text"
//                 placeholder={`Option ${index + 1}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 className="border p-2 w-full"
//               />
//             </div>
//           ))}
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={handleSaveQuestion}
//           >
//             Save Question
//           </button>
//         </>
//       ) : (
//         <div className="flex justify-between mt-4">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded"
//             onClick={handleAddAnotherQuestion}
//           >
//             Add Another Question
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded"
//             onClick={handleEndQuiz}
//           >
//             End Quiz
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionForm;
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string; 
  quizId?: string;
}

interface QuestionFormProps {
  quizId: string;
  onAddQuestion: (question: Question) => Promise<void>;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ quizId, onAddQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: '',
    options: ['', '', '', ''],
    answer: '', 
    quizId: quizId,
  });

  const [showOptions, setShowOptions] = useState(false); 
  const router = useRouter(); 

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAnswerSelect = (index: number) => {
    const selectedAnswer = `Option ${String.fromCharCode(97 + index)}`; 
    setCurrentQuestion({ ...currentQuestion, answer: selectedAnswer });
  };

  const areOptionsUnique = (options: string[]): boolean => {
    const trimmedOptions = options.map((option) => option.trim());
    return new Set(trimmedOptions).size === trimmedOptions.length;
  };

  const handleSaveQuestion = () => {
    const { text, options, answer } = currentQuestion;

    if (!text || options.some((option) => !option.trim())) {
      alert('Please fill out all fields.');
      return;
    }

    if (!areOptionsUnique(options)) {
      alert('Options must be unique. Please make sure each option is different.');
      return;
    }

    if (!answer) {
      alert('Please select a correct answer.');
      return;
    }

    onAddQuestion(currentQuestion);
    setCurrentQuestion({ text: '', options: ['', '', '', ''], answer: '', quizId: quizId });
    setShowOptions(true); 
  };

  const handleAddAnotherQuestion = () => {
    setShowOptions(false); 
  };

  const handleEndQuiz = () => {
    router.push('/quizPage'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
    <div className="mb-4 p-4 bg-[#212C44] text-white rounded-lg shadow-md w-full">
      {!showOptions ? (
        <>
        <label className="block mt-7 font-medium">Question Text
      <span className="text-red-500"> *</span>
      </label>
          <input
            type="text"
            placeholder="Question Text"
            value={currentQuestion.text}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
           className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
          />
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center mt-9 mb-2">
              <input
                type="radio"
                name="correctAnswer" // Group radio buttons by the same name
                checked={currentQuestion.answer === `Option ${String.fromCharCode(97 + index)}`}
                onChange={() => handleAnswerSelect(index)}
                className="mr-2"
              />
              <label className="mr-2">{String.fromCharCode(97 + index)}.</label>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                 className="px-4 py-2 w-full text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-12 rounded"
            onClick={handleSaveQuestion}
          >
            Save Question
          </button>
        </>
      ) : (
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddAnotherQuestion}
          >
            Add Another Question
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleEndQuiz}
          >
            End Quiz
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default QuestionForm;
