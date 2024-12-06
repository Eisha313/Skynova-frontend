
// import React, { useEffect, useState } from 'react';
// import { useUser } from "@/app/components/context/userContext";

// interface Question {
//   text: string;
//   options: string[];
// }

// interface ResultDetail {
//   _id: string;
//   quizId: {
//     questions: Question[];
//   };
//   answers: string[]; 
//   marks: number;
// }

// const DetailedResult: React.FC<{ id: string }> = ({ id }) => {
//   const [results, setResults] = useState<ResultDetail[]>([]);
//   const { token } = useUser();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/results/viewResult/${id}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         const data = await response.json();
//         setResults(data.results || []);
//       } catch (error) {
//         console.error('Error fetching detailed results:', error);
//       }
//     };

//     if (id) {
//       fetchResults();
//     }
//   }, [id]);

//   if (!results || results.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-[#212C44] p-8 text-white">
//       <h1 className="text-2xl mb-6">Detailed Results</h1>
//       <div className="overflow-y-auto">
//         {results.map((result, resultIndex) => (
//           <div key={resultIndex} className="mb-8">
//             <h2 className="text-xl mb-4">
//               Score: {result.marks} / {result.quizId.questions.length}
//             </h2>
            
//             {result.quizId.questions.map((question, index) => {
//   const userAnswer = result.answers[index]?.trim().toLowerCase();
//   const correctAnswer = question.options[0]?.trim().toLowerCase();
  
  
//   console.log(`Question ${index + 1}: ${question.text}`);
//   console.log(`User Answer: "${userAnswer}"`);
//   console.log(`Correct Answer: "${correctAnswer}"`);
  
//   const isCorrect = userAnswer === correctAnswer;

//   if (!isCorrect) {
//     console.warn(`Mismatch for Question ${index + 1}: User selected "${userAnswer}", but correct is "${correctAnswer}".`);
//   }

//   return (
//     <div key={index} className="mb-6">
//       <p className="mb-2">Question {index + 1}: {question.text}</p>
//       {question.options.map((option, i) => {
//         const optionText = option.trim().toLowerCase();
//         const isSelected = optionText === userAnswer;
//         const isCorrectOption = optionText === correctAnswer;

//         const optionClass = `p-4 mb-2 border rounded-lg ${
//           isSelected
//             ? isCorrect
//               ? 'bg-green-500 border-green-500' 
//               : 'bg-red-500 border-red-500'   
//             : isCorrectOption
//             ? ' border-green-500' 
//             : 'border-white'
//         }`;

//         return (
//           <div key={i} className={optionClass}>
//             {String.fromCharCode(65 + i)}: {option}
//           </div>
//         );
//       })}
//       {!isCorrect && (
//         <p className="text-red-500 mt-2">Correct answer: {question.options[0]}</p>
//       )}
//     </div>
//   );
// })}

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DetailedResult;
import React, { useEffect, useState } from 'react';
import { useUser } from "@/app/components/context/userContext";

interface Question {
  text: string;
  options: string[];
}

interface ResultDetail {
  _id: string;
  quizId: {
    title: string;
    description: string;
    questions: Question[];
  };
  answers: string[];
  marks: number;
}

const DetailedResult: React.FC<{ id: string }> = ({ id }) => {
  const [results, setResults] = useState<ResultDetail[]>([]);
  const { token } = useUser();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResult/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching detailed results:', error);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (!results || results.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#212C44] p-8 text-white">
      <h1 className="text-2xl mb-6">Detailed Results</h1>
      <div className="overflow-y-auto">
        {results.map((result, resultIndex) => (
          <div key={resultIndex} className="mb-8">
            <h2 className="text-xl mb-4">
              {result.quizId.title} - Score: {result.marks} / {result.quizId.questions.length}
            </h2>
            <p className="text-gray-400 mb-6">{result.quizId.description}</p>
            
            {result.quizId.questions.map((question, index) => {
              const userAnswer = result.answers[index]?.trim().toLowerCase(); // Correct answer from backend
              const correctAnswer = question.options.find(
                (option) => option.trim().toLowerCase() === userAnswer
              );
              
              const isCorrect = correctAnswer === userAnswer;

              return (
                <div key={index} className="mb-6">
                  <p className="mb-2">Question {index + 1}: {question.text}</p>
                  {question.options.map((option, i) => {
                    const optionText = option.trim().toLowerCase();
                    const isSelected = optionText === userAnswer;
                    const isCorrectOption = optionText === userAnswer;

                    const optionClass = `p-4 mb-2 border rounded-lg ${
                      isSelected
                        ? isCorrectOption
                          ? 'bg-green-500 border-green-500' // Correct selection
                          : 'bg-red-500 border-red-500'   // Wrong selection
                        : isCorrectOption
                        ? ' border-green-500' // Highlight correct answer
                        : 'border-white'
                    }`;

                    return (
                      <div key={i} className={optionClass}>
                        {String.fromCharCode(65 + i)}: {option}
                      </div>
                    );
                  })}
                  {!isCorrect && (
                    <p className="text-red-500 mt-2">Correct answer: {correctAnswer}</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedResult;
