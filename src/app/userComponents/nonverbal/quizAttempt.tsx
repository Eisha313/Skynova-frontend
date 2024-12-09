
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';
// import { useUser } from "@/app/components/context/userContext";

// interface Option {
//   label: string;
//   image: string;
// }

// interface Question {
//   text: string;
//   options: Option[];
//   answer: string;
//   image?: string;
// }

// interface QuizDetail {
//   _id: string;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// interface QuizAttemptProps {
//   quizId: string;
//   goBack?: () => void;
//   goToNextStep?: () => void;
// }

// const NonVerbalQuizAttempt: React.FC<QuizAttemptProps> = ({ quizId, goBack, goToNextStep }) => {
//   const [quiz, setQuiz] = useState<QuizDetail | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<string[]>([]);
//   const { _id, token } = useUser();
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [showCompletionScreen, setShowCompletionScreen] = useState(false);
//   const [score, setScore] = useState<number | null>(null);
//   const [totalQuestions, setTotalQuestions] = useState<number>(0);
//   const [showModal, setShowModal] = useState(false);
//   const [enlargedImage, setEnlargedImage] = useState<string | null>(null); // State for enlarged image modal
//   const router = useRouter();

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await fetch(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonVerbalQuiz/${quizId}`,
//           { credentials: "include" }
//         );
//         const data = await response.json();
//         setQuiz(data);
//         const quizTime = data.questions.length * 60;
//         setTimeLeft(quizTime);
//         setTotalQuestions(data.questions.length);
//       } catch (error) {
//         console.error("Error fetching quiz details:", error);
//       }
//     };

//     if (quizId) {
//       fetchQuiz();
//     }
//   }, [quizId]);

//   const calculateResult = () => {
//     let calculatedScore = 0;
//     quiz?.questions.forEach((question, index) => {
//       if (answers[index]?.trim() === question.answer.trim()) {
//         calculatedScore += 1;
//       }
//     });
//     return calculatedScore;
//   };

//   const handleSubmit = async () => {
//     try {
//       const resultScore = calculateResult();
//       setScore(resultScore);

//       const response = await fetch(
//         `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/createNonVerbalQuizResult`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             description: "Non-Verbal Quiz Result",
//             answers,
//             marks: resultScore,
//             quizId: quiz?._id,
//             userId: _id,
//           }),
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         setQuizFinished(true);
//         setShowCompletionScreen(true);
//         goToNextStep && goToNextStep();
//       } else {
//         console.error("Failed to submit results:", response.statusText);
//         alert("Failed to submit the quiz. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting quiz results:", error);
//       alert("An error occurred while submitting the quiz.");
//     }
//   };

//   useEffect(() => {
//     if (!quiz || quizFinished) return;

//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerId);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [timeLeft, quiz, quizFinished]);

//   if (!quiz) return <div>Loading...</div>;

//   const progress = ((currentQuestion + 1) / totalQuestions) * 100;

//   return (
//     <div className="bg-[#212C44] p-8 flex flex-col justify-center items-center text-white">
     
//       <div className="w-full max-w-lg mb-4">
//         <div className="flex justify-between text-sm mb-1">
//           <span className="flex justify-center">Question:{currentQuestion + 1} of {totalQuestions}</span>
//           <span>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-2.5">
//           <div
//             className="bg-blue-500 h-2.5 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>

     
      

    
// <div className="text-center">
//   {quiz?.questions?.[currentQuestion]?.image && (
//     <Image
//       src={quiz.questions[currentQuestion].image}
//       alt={`Question ${currentQuestion + 1} image`}
//       width={128}
//       height={128}
//       className="object-cover mb-2 cursor-pointer"
//       onClick={() => {
//         if (quiz.questions[currentQuestion].image) {
//           setEnlargedImage(quiz.questions[currentQuestion].image);
//         }
//       }} 
//     />
//   )}
//   <h2 className="text-xl mb-6">
//     {quiz?.questions?.[currentQuestion]?.text || 'Loading question...'}
//   </h2>
// </div>



// <div className="grid grid-cols-2 gap-4 mb-6">
//   {quiz?.questions?.[currentQuestion]?.options?.map((option, index) => (
//     <label
//       key={index}
//       className={`flex flex-col items-center p-6 border border-white rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
//         selectedOption === option.label ? 'bg-blue-500' : ''
//       }`}
//       onClick={() => {
//         setSelectedOption(option.label);
//         setAnswers((prevAnswers) => {
//           const updatedAnswers = [...prevAnswers];
//           updatedAnswers[currentQuestion] = option.label;
//           return updatedAnswers;
//         });
//       }}
//     >
//       <Image
//         src={option.image}
//         alt={`Option ${option.label}`}
//         width={128}
//         height={128}
//         onClick={(e) => {
//           e.stopPropagation();
//           setEnlargedImage(option.image);
//         }} // Enlarge option image on click
//       />
//       <span className="mt-2 text-center">{option.label}</span> {/* Centered label below image */}
//     </label>
//   ))}
// </div>


//       {/* Navigation Buttons */}
//       <div className="flex justify-between w-full max-w-md">
//         {currentQuestion > 0 && (
//           <button
//             onClick={() => setCurrentQuestion(currentQuestion - 1)}
//             className="bg-blue-500 px-4 py-2 rounded-lg"
//           >
//             Previous
//           </button>
//         )}
//         {currentQuestion < totalQuestions - 1 ? (
//           <button
//             onClick={() => setCurrentQuestion(currentQuestion + 1)}
//             className="bg-blue-500 px-4 py-2 rounded-lg ml-auto"
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-green-500 px-4 py-2 rounded-lg ml-auto"
//           >
//             Submit
//           </button>
//         )}
//       </div>

    
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-black">
//             <h2 className="text-xl font-bold mb-4">Are you sure you want to submit the quiz?</h2>
//             <div className="flex justify-between">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => {
//                   setShowModal(false);
//                   handleSubmit();
//                 }}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

      
//       {enlargedImage && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <Image src={enlargedImage} alt="Enlarged Option" width={500} height={500} className="object-contain" />
//             <button
//               onClick={() => setEnlargedImage(null)}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NonVerbalQuizAttempt;
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/app/components/context/userContext";

interface Option {
  label: string;
  image: string;
}

interface Question {
  text: string;
  options: Option[];
  answer: string;
  questionImage?: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizAttemptProps {
  quizId: string;
  goBack?: () => void;
  goToNextStep?: () => void;
}

const NonVerbalQuizAttempt: React.FC<QuizAttemptProps> = ({ quizId, goBack, goToNextStep }) => {
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const { _id, token } = useUser();
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonVerbalQuiz/${quizId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setQuiz(data);
        const quizTime = data.questions.length * 60;
        setTimeLeft(quizTime);
        setTotalQuestions(data.questions.length);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const calculateResult = () => {
    let calculatedScore = 0;
    quiz?.questions.forEach((question, index) => {
      if (answers[index]?.trim() === question.answer.trim()) {
        calculatedScore += 1;
      }
    });
    return calculatedScore;
  };

  const handleSubmit = async () => {
    try {
      const resultScore = calculateResult();
      setScore(resultScore);

      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/createNonVerbalQuizResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: "Non-Verbal Quiz Result",
            answers,
            marks: resultScore,
            quizId: quiz?._id,
            userId: _id,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setQuizFinished(true);
        setShowCompletionScreen(true);
        goToNextStep && goToNextStep();
      } else {
        console.error("Failed to submit results:", response.statusText);
        alert("Failed to submit the quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };

  useEffect(() => {
    if (!quiz || quizFinished) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, quizFinished]);

  if (!quiz) return <div>Loading...</div>;

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="bg-[#212C44] p-8 flex flex-col justify-center items-center text-white">
      {/* Progress Bar and Timer */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="flex justify-center">Question: {currentQuestion + 1} of {totalQuestions}</span>
          <span>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Text and Image */}
      <div className="text-center">
        {quiz?.questions?.[currentQuestion]?.questionImage && (
          <Image
            src={quiz.questions[currentQuestion].questionImage}
            alt={`Question ${currentQuestion + 1} image`}
            width={200}
            height={200}
            className="object-cover mb-4"
          />
        )}
        <h2 className="text-xl mb-6">
          {quiz?.questions?.[currentQuestion]?.text || "Loading question..."}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quiz?.questions?.[currentQuestion]?.options?.map((option, index) => (
          <label
            key={index}
            className={`flex flex-col items-center p-6 border border-white rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedOption === option.label ? "bg-blue-500" : ""
            }`}
            onClick={() => {
              setSelectedOption(option.label);
              setAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[currentQuestion] = option.label;
                return updatedAnswers;
              });
            }}
          >
            <Image
              src={option.image}
              alt={`Option ${option.label}`}
              width={128}
              height={128}
            />
            <span className="mt-2 text-center">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-md">
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            Previous
          </button>
        )}
        {currentQuestion < totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="bg-blue-500 px-4 py-2 rounded-lg ml-auto"
            disabled={!selectedOption}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 px-4 py-2 rounded-lg ml-auto"
            disabled={!selectedOption}
          >
            Submit
          </button>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to submit the quiz?</h2>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowModal(false);
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonVerbalQuizAttempt;
