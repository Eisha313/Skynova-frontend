// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useUser } from "@/app/components/context/userContext";

// export interface Quiz {
//   _id: number;
//   title: string;
//   description: string;
//   attempted: boolean;
//   attemptedSecondTime: boolean;
//   attemptCount: number; // Tracks the number of attempts
//   marks: number;
// }

// const QuizList: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { _id,token } = useUser();

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const quizResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes", {
//           credentials: "include",
//         });

//         if (!quizResponse.ok) {
//           throw new Error("Failed to fetch quizzes.");
//         }

//         const quizzesData = await quizResponse.json();

//         const quizzesWithFlags = quizzesData.map((quiz: any) => ({
//           ...quiz,
//           attempted: false,
//           attemptedSecondTime: false,
//           attemptCount: 0,
//           marks: 0,
//         }));

//         setQuizzes(quizzesWithFlags);

//         const resultResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         if (resultResponse.ok) {
//           const resultsData = await resultResponse.json();

//           const updatedQuizzes = quizzesWithFlags.map((quiz: any) => {
//             // const result = resultsData.find((res: any) => res.quizId._id === quiz._id);
//             // const results = resultsData.filter((res: any) => res.quizId._id === quiz._id);
//             const results = resultsData.filter((res: any) => res.quizId._id === quiz._id && res.userId._id === _id);

//             if (results.length > 0) {
//               console.log(
//                 "results[results.length - 1].marks < 100 && results.length < 2 for quiz",
//                 quiz.title,

//                 results[results.length - 1].marks < 100 && results.length < 2
//               );

//               const lastAttemptMarks = results[results.length - 1].marks;
//               const totalQuestions = quiz.questions.length;

//               const hasScoredPerfect = lastAttemptMarks === totalQuestions;
//               const totalAttempts = results.length;

//               return {
//                 ...quiz,
//                 attempted: true,
//                 attemptCount: totalAttempts,
//                 marks: results[totalAttempts - 1].marks,
//                 attemptedSecondTime: hasScoredPerfect && totalAttempts > 1,
//               };
//             }

//             return quiz;
//           });

//           setQuizzes(updatedQuizzes);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError("Failed to fetch quizzes.");
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, [token]);

//   if (loading) return <div className="text-white">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   const handleModal = (quiz: Quiz) => {
//     if (quiz.attempted && quiz.attemptedSecondTime) {
//       alert("You have another chance to improve your score!");
//     }
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen p-8">
//       {quizzes.length === 0 ? (
//         <div>No quizzes available</div>
//       ) : (
//         quizzes.map((quiz, index) => {
//           const isClickable = index === 0 || quizzes[index - 1]?.attempted;

//           return (
//             <div
//               key={quiz._id}
//               className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white"
//             >
//               <div className="flex items-center">
//                 <span className="text-lg font-bold mr-4">{index + 1}</span>
//                 <div>
//                   <h2 className="font-bold">{quiz.title}</h2>
//                   <p>{quiz.description}</p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 {/* First Attempt Button */}
//                 {!quiz.attempted && (
//                   <Link href={`/userRender/quiz/${quiz._id}/attempt`}>
//                     <button
//                       className={`px-4 py-2 rounded-lg text-white ${
//                         isClickable ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"
//                       }`}
//                       disabled={!isClickable}
//                     >
//                       Attempt
//                     </button>
//                   </Link>
//                 )}

//                 {/* Reattempt and Result Buttons */}
//                 {quiz.attempted && quiz.attemptCount < 2 && (
//                   <>
//                     {/* Reattempt Button */}
//                     <Link href={`/userRender/quiz/${quiz._id}/attempt`}>
//                       <button
//                         className={`px-4 py-2 rounded-lg text-white ${
//                           quiz.attemptedSecondTime
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                         disabled={quiz.attemptedSecondTime}
//                       >
//                         Reattempt
//                       </button>
//                     </Link>

//                     {/* Result Button */}
//                     <Link href={`/userRender/quiz/${quiz._id}/result`}>
//                       <button className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">Result</button>
//                     </Link>
//                   </>
//                 )}

//                 {/* Only Result Button After Second Attempt */}
//                 {quiz.attemptCount >= 2 && (
//                   <Link href={`/userRender/quiz/${quiz._id}/result`}>
//                     <button className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">Result</button>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default QuizList;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/components/context/userContext";

export interface Quiz {
  _id: number;
  title: string;
  description: string;
  attempted: boolean;
  attemptedSecondTime: boolean;
  attemptCount: number; // Tracks the number of attempts
  marks: number;
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { _id, token } = useUser();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes", {
          credentials: "include",
        });

        if (!quizResponse.ok) {
          throw new Error("Failed to fetch quizzes.");
        }

        const quizzesData = await quizResponse.json();

        const quizzesWithFlags = quizzesData.map((quiz: any) => ({
          ...quiz,
          attempted: false,
          attemptedSecondTime: false,
          attemptCount: 0,
          marks: 0,
        }));

        setQuizzes(quizzesWithFlags);

        const resultResponse = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (resultResponse.ok) {
          const resultsData = await resultResponse.json();

          const updatedQuizzes = quizzesWithFlags.map((quiz: any) => {
            // const result = resultsData.find((res: any) => res.quizId._id === quiz._id);
            // const results = resultsData.filter((res: any) => res.quizId._id === quiz._id);
            const results = resultsData.filter(
              (res: any) => res && res.quizId && res.quizId._id === quiz._id && res.userId._id === _id
            );

            if (results.length > 0) {
              console.log(
                "results[results.length - 1].marks < 100 && results.length < 2 for quiz",
                quiz.title,

                results[results.length - 1].marks < 100 && results.length < 2
              );

              const lastAttemptMarks = results[results.length - 1].marks;
              const totalQuestions = quiz.questions.length;

              const hasScoredPerfect = lastAttemptMarks === totalQuestions;

              const totalAttempts = results.length;

              return {
                ...quiz,
                attempted: true,
                attemptCount: totalAttempts,
                marks: results[totalAttempts - 1].marks,
                attemptedSecondTime: hasScoredPerfect || totalAttempts > 1,
              };
            }

            return quiz;
          });

          setQuizzes(updatedQuizzes);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [token]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const handleModal = (quiz: Quiz) => {
    if (quiz.attempted && quiz.attemptedSecondTime) {
      alert("You have another chance to improve your score!");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8 ">
      {quizzes.length === 0 ? (
        <div>No quizzes available</div>
      ) : (
        quizzes.map((quiz, index) => {
          const isClickable = index === 0 || quizzes[index - 1]?.attempted;

          return (
            
            
            <div
              key={quiz._id}
              className="flex justify-between mt-20 items-center p-4 mb-4 border border-white rounded-lg text-white"
            >
              <div className="flex items-center">
                <span className="text-lg font-bold mr-4">{index + 1}</span>
                <div>
                  <h2 className="font-bold">{quiz.title}</h2>
                  <p>{quiz.description}</p>
                </div>
              </div>

              <div className="flex gap-4">
                {/* First Attempt Button */}
                {!quiz.attempted && (
                  <Link href={`/userRender/quiz/${quiz._id}/attempt`}>
                    <button
                      className={`px-4 py-2 rounded-lg text-white ${
                        isClickable ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isClickable}
                    >
                      Attempt
                    </button>
                  </Link>
                )}

                {/* Reattempt and Result Buttons */}
                {quiz.attempted && quiz.attemptCount < 2 && (
                  <>
                    {/* Reattempt Button */}
                    <Link href={`/userRender/quiz/${quiz._id}/attempt`}>
                      <button
                        className={`px-4 py-2 rounded-lg text-white ${
                          quiz.attemptedSecondTime
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        disabled={quiz.attemptedSecondTime}
                      >
                        Reattempt
                      </button>
                    </Link>

                    {/* Result Button */}
                    <Link href={`/userRender/quiz/${quiz._id}/result`}>
                      <button className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">Result</button>
                    </Link>
                  </>
                )}

                {/* Only Result Button After Second Attempt */}
                {quiz.attemptCount >= 2 && (
                  <Link href={`/userRender/quiz/${quiz._id}/result`}>
                    <button className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">Result</button>
                  </Link>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuizList;
