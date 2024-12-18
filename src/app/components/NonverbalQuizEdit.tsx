// 'use client';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

//  interface Option {
//   label: string;
//   image: string;
//   _id?: string;
// }
// interface Question {
//   _id?: string;
//   text: string;
//   image?: string;
//   options: Option[];
//   answer: string;
//   quizId?: string;
// }

// interface QuizDetail {
//   _id: string;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// interface EditQuizProps {
//   params: { title: string };
// }

// const NonverbalQuizEdit = ({ id }: { id: string }) => {
//   const router = useRouter();
//   const [quiz, setQuiz] = useState<QuizDetail | null>(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonverbalQuiz/${id}`,{credentials:'include'});
//         if (response.ok) {
//           const data = await response.json();
//           setQuiz(data);
//         } else {
//           console.error('Failed to fetch quiz details');
//         }
//       } catch (error) {
//         console.error('Error fetching quiz details:', error);
//       }
//     };

//     if (id) {
//       fetchQuiz();
//     }
//   }, [id]);

//   const handleSaveQuiz = async () => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/updateNonverbalQuiz/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(quiz),
//         credentials:'include'

//       });
//       if (response.ok) {
//         router.push('/nonverbalquiz');
//       } else {
//         console.error('Failed to save quiz');
//       }
//     } catch (error) {
//       console.error('Error saving quiz:', error);
//     }
//   };

//   const handleQuestionChange = (index: number, updatedQuestion: Question) => {
//     if (quiz) {
//       const updatedQuestions = [...quiz.questions];
//       updatedQuestions[index] = updatedQuestion;
//       setQuiz({ ...quiz, questions: updatedQuestions });
//     }
//   };

//   if (!quiz) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
//       <input
//         type="text"
//         value={quiz.title}
//         onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
//         className="border p-2 mb-2 w-full"
//       />
//       <textarea
//         value={quiz.description}
//         onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
//         className="border p-2 mb-4 w-full"
//       />
//       {quiz.questions.map((question, index) => (
//         <div key={index} className="mb-4">
//           <input
//             type="text"
//             value={question.text}
//             onChange={(e) =>
//               handleQuestionChange(index, { ...question, text: e.target.value })
//             }
//             className="border p-2 mb-2 w-full"
//           />
//           {question.image && (
//   <div className="w-32 h-32 border border-gray-300 flex items-center justify-center overflow-hidden">
//     <img
//       src={question.image}
//       alt="Question image preview"
//       className="object-cover w-full h-full"
//     />
//   </div>
// )}

//           <ul>
//   {question.options.map((option, optIndex) => (
//     <li key={optIndex} className="flex flex-col mb-4 space-y-2">
//       <div className="flex items-center space-x-4">
//         <label className="font-semibold">
//           {String.fromCharCode(65 + optIndex)} {/* A, B, C, D */}
//         </label>
//         <input
//           type="file"
//           onChange={(e) => {
//             if (e.target.files && e.target.files[0]) {
//               const reader = new FileReader();
//               reader.onload = () => {
//                 const updatedOptions = [...question.options];
//                 updatedOptions[optIndex].image = reader.result as string;
//                 handleQuestionChange(index, { ...question, options: updatedOptions });
//               };
//               reader.readAsDataURL(e.target.files[0]);
//             }
//           }}
//           className="border p-2 flex-grow"
//         />
//       </div>
//       {option.image && (
//         <div className="flex items-center space-x-4">
//           <label className="text-sm text-gray-500">Preview:</label>
//           <div className="w-32 h-32 border border-gray-300 flex items-center justify-center overflow-hidden">
//             <img
//               src={option.image}
//               alt={`Option ${String.fromCharCode(65 + optIndex)} preview`}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </li>
//   ))}
// </ul>

//           <input
//             type="text"
//             value={question.answer}
//             onChange={(e) => handleQuestionChange(index, { ...question, answer: e.target.value })}
//             className="border p-2 mb-2 w-full"
//           />
//         </div>
//       ))}
//       <button
//         onClick={handleSaveQuiz}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Save Quiz
//       </button>
//     </div>
//   );
// };

// export default NonverbalQuizEdit;
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Option {
  label: string;
  image: string;
  _id?: string;
}

interface Question {
  _id?: string;
  text: string;
  image?: string;
  options: Option[];
  answer: string;
  quizId?: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface EditQuizProps {
  params: { title: string };
}

const NonverbalQuizEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonverbalQuiz/${id}`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setQuiz(data);
        } else {
          console.error("Failed to fetch quiz details");
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleSaveQuiz = async () => {
    try {
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/updateNonverbalQuiz/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quiz),
          credentials: "include",
        }
      );
      if (response.ok) {
        router.push("/nonverbalquiz");
      } else {
        console.error("Failed to save quiz");
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[index] = updatedQuestion;
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
      <div className="mb-4 p-4 bg-[#212C44] rounded-lg shadow-md mx-auto overflow-auto overflow-y-auto">
        <input
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
        />
        <textarea
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          // className="border p-2 mb-4 w-full"
          className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
        />
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(index, { ...question, text: e.target.value })}
              // className="border p-2 mb-2 w-full"
              className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
            />
            {question.image && (
              <div className="w-32 h-32 border border-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src={question.image}
                  alt="Question image preview"
                  // className="object-cover w-full h-full"
                  className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
                />
              </div>
            )}

            <ul>
              {question.options.map((option, optIndex) => (
                <li key={optIndex} className="flex flex-col mb-4 space-y-2">
                  <div className="flex items-center space-x-4">
                    <label className="font-semibold">
                      {String.fromCharCode(65 + optIndex)} {/* A, B, C, D */}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const updatedOptions = [...question.options];
                            updatedOptions[optIndex].image = reader.result as string;
                            handleQuestionChange(index, { ...question, options: updatedOptions });
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      // className="border p-2"
                      className="w-full  flex-grow px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
                    />
                  </div>
                  {option.image && (
                    <div className="flex items-center space-x-4">
                      <label className="text-sm text-gray-500">Preview:</label>
                      <div className="w-32 h-32 border border-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                          src={option.image}
                          alt={`Option ${String.fromCharCode(65 + optIndex)} preview`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <input
              type="text"
              value={question.answer}
              onChange={(e) => handleQuestionChange(index, { ...question, answer: e.target.value })}
              flex-grow
              className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"
            />
          </div>
        ))}
        <button onClick={handleSaveQuiz} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default NonverbalQuizEdit;
