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
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/context/userContext";

interface Question {
  text: string;
  options: string[];
  answer: string;
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
        const response = await fetch(
          // `https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResult/${id}`,
          `http://localhost:4000/results/viewResult/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching detailed results:", error);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (!results || results.length === 0) {
    return <div>Loading...</div>;
  }

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
  };

  return (
    //     <div className="bg-[#212C44] p-8 text-white">
    //       <h1 className="text-2xl mb-6">Detailed Results</h1>
    //       <div className="overflow-y-auto">
    //         {results.map((result, resultIndex) => (
    //           <div key={resultIndex} className="mb-8">
    //             <h2 className="text-xl mb-4">
    //               {result.quizId.title} - Score: {result.marks} / {result.quizId.questions.length}
    //             </h2>
    //             <p className="text-gray-400 mb-6">{result.quizId.description}</p>

    //             {result.quizId.questions.map((question, index) => {
    //               const userAnswer = result.answers[index]?.trim().toLowerCase();
    //               const correctAnswer = question.options.find(
    //                 (option) => option.trim().toLowerCase() === userAnswer
    //               );

    //               const isCorrect = correctAnswer === userAnswer;

    //               return (
    //                 <div key={index} className="mb-6">
    //                   <p className="mb-2">Question {index + 1}: {question.text}</p>
    //                   {question.options.map((option, i) => {
    //                     const optionText = option.trim().toLowerCase();
    //                     const isSelected = optionText === userAnswer;
    //                     const isCorrectOption = optionText === userAnswer;

    //                     const optionClass = `p-4 mb-2 border rounded-lg ${
    //                       isSelected
    //                         ? isCorrectOption
    //                           ? 'bg-green-500 border-green-500'
    //                           : 'bg-red-500 border-red-500'
    //                         : isCorrectOption
    //                         ? ' border-green-500'
    //                         : 'border-white'
    //                     }`;

    //                     return (
    //                       <div key={i} className={optionClass}>
    //                         {String.fromCharCode(65 + i)}: {option}
    //                       </div>
    //                     );
    //                   })}
    //                   {!isCorrect && (
    //                     <p className="text-red-500 mt-2">Correct answer: {correctAnswer}</p>
    //                   )}
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // };
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
              const userAnswer = result.answers[index]?.trim().toLowerCase();
              let correctAnswer = "";
              const options = question.options;
              const correctAnswerOption = toTitleCase(question.answer[0]);
              const correctAnswerOptionn = correctAnswerOption.split(" ")[1].trim().toUpperCase();

              switch (correctAnswerOptionn) {
                case "A":
                  correctAnswer = options[0];
                  break;
                case "B":
                  correctAnswer = options[1];
                  break;
                case "C":
                  correctAnswer = options[2];
                  break;
                case "D":
                  correctAnswer = options[3];
                  break;
                default:
                  break;
              }

              return (
                <div key={index} className="mb-6">
                  <p className="mb-2">
                    Question {index + 1}: {question.text}
                  </p>
                  {question.options.map((option, i) => {
                    const optionText = option.trim().toLowerCase();
                    const isSelected = optionText === userAnswer;
                    // const isCorrect = optionText === correctAnswer?.trim()?.toLowerCase();
                    const isCorrect = optionText === correctAnswer?.trim()?.toLowerCase();

                    const optionClass = `p-4 mb-2 border rounded-lg ${
                      isSelected
                        ? isCorrect
                          ? "bg-green-500 border-green-500" // Correct and selected
                          : "bg-red-500 border-red-500" // Incorrect and selected
                        : isCorrect
                        ? "bg-green-500 border-green-500" // Correct but not selected
                        : "border-white" // Neutral option
                    }`;

                    return (
                      <div key={i} className={optionClass}>
                        {String.fromCharCode(65 + i)}: {option}
                      </div>
                    );
                  })}
                  {userAnswer !== correctAnswer.trim().toLowerCase() && (
                    <p className="text-red-500 mt-2">Correct answer: {correctAnswerOption}</p>
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
