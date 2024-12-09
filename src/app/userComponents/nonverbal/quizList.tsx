
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useUser } from "@/app/components/context/userContext"; 

// export interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   attempted: boolean;
// }

// interface NonVerbalQuizListProps {
//   onSelectQuiz?: (quiz: Quiz) => void;
//   shouldRecheckList: boolean;
//   goToNextStep: () => void;
// }

// interface QuizResult {
//   quizId: {
//     _id: string;
//   };
//   userId: {
//     _id: string;
//   };
// }

// const NonVerbalQuizList: React.FC<NonVerbalQuizListProps> = ({
//   onSelectQuiz,
//   shouldRecheckList,
//   goToNextStep,
// }) => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token, _id } = useUser();

//   useEffect(() => {
//     const abortController = new AbortController();

//     const fetchQuizzes = async () => {
//       try {
//         // Fetch all non-verbal quizzes
//         const quizResponse = await fetch(
//           "https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes",
//           {
//             credentials: "include",
//             signal: abortController.signal,
//           }
//         );
//         const quizzesData = await quizResponse.json();

//         // Fetch non-verbal quiz results for the current user
//         const resultResponse = await fetch(
//           "https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResults",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           }
//         );

//         if (!resultResponse.ok) {
//           throw new Error("Failed to fetch quiz results.");
//         }

//         const resultsData: QuizResult[] = await resultResponse.json();

       
//         const attemptedQuizIds = new Set(
//           resultsData
//             .filter((result) => result.userId?._id === _id)
//             .map((result) => result.quizId._id)
//         );

      
       
//         const quizzesWithAttemptedFlag = quizzesData.map((quiz: Quiz) => ({
//           ...quiz,
//           attempted: quiz.attempted || attemptedQuizIds.has(quiz._id),
//       }));
      
//         // Check if all quizzes are attempted
//         if (Array.from(attemptedQuizIds).filter((id) => Boolean(id)).length === quizzesData.length) {
//           goToNextStep();
//         } else {
//           console.log("Not all quizzes attempted");
//         }

//         setQuizzes(quizzesWithAttemptedFlag);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         if (abortController.signal.aborted) {
//           return;
//         }
//         setError("Failed to fetch quizzes.");
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();

//     return () => {
//       abortController.abort();
//     };
//   }, [token, shouldRecheckList, _id]);

//   if (loading) return <div className="text-white">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="bg-[#212C44] min-h-screen p-8 mt-20">
//       <div className="flex justify-center items-center text-white font-bold text-lg mb-8">
//         <h2>Non Verbal Aptitude Test</h2>
//       </div>
//       {quizzes.map((quiz, index) => (
//         <div
//           key={quiz._id}
//           className="flex justify-between items-center p-4 mb-4 border  rounded-lg  border-[#A49898] rounded-lg text-[#A49898]"
//         >
//           <div className="flex items-center">
//             <span className="text-lg font-bold mr-4">{index + 1}</span>
//             <div>
//               <h2 className="font-bold">{quiz.title}</h2>
//               <p>{quiz.description}</p>
//             </div>
//           </div>
//           {onSelectQuiz ? (
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               onClick={() => onSelectQuiz(quiz)}
//             >
//               {quiz.attempted ? "View Result" : "Attempt Quiz"}
//             </button>
//           ) : (
//             <Link
//               href={
//                 quiz.attempted
//                   ? `/userRender/nonverbal/${quiz._id}/result`
//                   : `/userRender/nonverbal/${quiz._id}/attempt`
//               }
//             >
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 {quiz.attempted ? "View Result" : "Attempt Quiz"}
//               </button>
//             </Link>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NonVerbalQuizList;
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/components/context/userContext";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  attempted: boolean;
  resultAvailable: boolean;
}

interface NonVerbalQuizListProps {
  onSelectQuiz?: (quiz: Quiz) => void;
  shouldRecheckList: boolean;
  goToNextStep: () => void;
}

interface QuizResult {
  quizId: {
    _id: string;
  };
  userId: {
    _id: string;
  };
}

const NonVerbalQuizList: React.FC<NonVerbalQuizListProps> = ({
  onSelectQuiz,
  shouldRecheckList,
  goToNextStep,
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, _id } = useUser();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchQuizzes = async () => {
      try {
        // Fetch all non-verbal quizzes
        const quizResponse = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes",
          {
            credentials: "include",
            signal: abortController.signal,
          }
        );

        // Log the response status and body for debugging
        console.log("Quiz response status:", quizResponse.status);
        const quizzesData = await quizResponse.json();
        console.log("Fetched quizzes:", quizzesData); // Check the quizzes data structure

        if (!quizResponse.ok) {
          throw new Error("Failed to fetch quizzes.");
        }

        // Fetch non-verbal quiz results for the current user
        const resultResponse = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResults",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!resultResponse.ok) {
          throw new Error("Failed to fetch quiz results.");
        }

        const resultsData: QuizResult[] = await resultResponse.json();
        console.log("Fetched quiz results:", resultsData);

        // Create a set of attempted quizzes and a map for result availability
        const attemptedQuizIds = new Set(
          resultsData
            .filter((result) => result.userId?._id === _id)
            .map((result) => result.quizId._id)
        );

        const resultAvailabilityMap = new Map(
          resultsData.map((result) => [result.quizId._id, true])
        );

        // Update quizzes with attempted and resultAvailable flags
        const quizzesWithFlags = quizzesData.map((quiz: Quiz) => ({
          ...quiz,
          attempted: quiz.attempted || attemptedQuizIds.has(quiz._id),
          resultAvailable: resultAvailabilityMap.has(quiz._id),
        }));

        // Check if all quizzes are attempted
        if (quizzesWithFlags.every((quiz: Quiz) => quiz.attempted)) {
          goToNextStep();
        } else {
          console.log("Not all quizzes attempted");
        }

        setQuizzes(quizzesWithFlags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        if (abortController.signal.aborted) {
          return;
        }
        setError("Failed to fetch quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();

    return () => {
      abortController.abort();
    };
  }, [token, shouldRecheckList, _id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-[#212C44] min-h-screen p-8 mt-20">
      <div className="flex justify-center items-center text-white font-bold text-lg mb-8">
        <h2>Non Verbal Aptitude Test</h2>
      </div>
      {quizzes.map((quiz, index) => (
        <div
          key={quiz._id}
          className="flex justify-between items-center p-4 mb-4 border rounded-lg border-[#A49898] text-[#A49898]"
        >
          <div className="flex items-center">
            <span className="text-lg font-bold mr-4">{index + 1}</span>
            <div>
              <h2 className="font-bold">{quiz.title}</h2>
              <p>{quiz.description}</p>
            </div>
          </div>
          {onSelectQuiz ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelectQuiz(quiz)}
            >
              {quiz.attempted
                ? quiz.resultAvailable
                  ? "View Result"
                  : "Result not available yet"
                : "Attempt Quiz"}
            </button>
          ) : (
            <Link
              href={
                quiz.attempted
                  ? quiz.resultAvailable
                    ? `/userRender/nonverbal/${quiz._id}/result`
                    : "#"
                  : `/userRender/nonverbal/${quiz._id}/attempt`
              }
            >
              <button
                className={`px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  quiz.attempted && !quiz.resultAvailable
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                disabled={quiz.attempted && !quiz.resultAvailable}
              >
                {quiz.attempted
                  ? quiz.resultAvailable
                    ? "View Result"
                    : "Result not available yet"
                  : "Attempt Quiz"}
              </button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NonVerbalQuizList;
