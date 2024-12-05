
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useUser } from '@/app/components/context/userContext';

// export interface Quiz {
//   _id: number;
//   title: string;
//   description: string;
//   attempted: boolean;
// }

// const QuizList: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { token } = useUser();

//   console.log("HELLO SHAMPOO")

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const quizResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes', {
//           credentials: 'include',
//         });
//         console.log(quizResponse.status, quizResponse.ok); 
        
//         if (!quizResponse.ok) {
//           throw new Error('Failed to fetch quizzes.');
//         }
        
//         const quizzesData = await quizResponse.json();
//         console.log(quizzesData);  
        
        
//         const quizzesWithAttemptedFlag = quizzesData.map((quiz: any) => {
//           if (!quiz?._id) {
//             console.warn('Quiz missing _id:', quiz);
//             return null;  
//           }
//           return {
//             ...quiz,
//             attempted: false,
//           };
//         }).filter((quiz: any) => quiz !== null); 

//         setQuizzes(quizzesWithAttemptedFlag);

//         const resultResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (resultResponse.ok) {
//           const resultsData = await resultResponse.json();

//           console.log("resultsData", resultsData);
//           const attemptedQuizIds = new Set(resultsData.map((result: any) => result?.quizId?._id));

          
//           const updatedQuizzes = quizzesWithAttemptedFlag.map((quiz: any) => ({
//             ...quiz,
//             attempted: attemptedQuizIds.has(quiz?._id),
//           }));

//           setQuizzes(updatedQuizzes);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to fetch quizzes.');
//         setLoading(false);
//       }
//     };

//     fetchQuizzes();
//   }, [token]);

//   if (loading) return <div className="text-white">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-900 min-h-screen p-8">
//       {quizzes.length === 0 ? (
//         <div>No quizzes available</div>
//       ) : (
//         quizzes.map((quiz, index) => (
//           <div key={quiz._id} className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white">
//             <div className="flex items-center">
//               <span className="text-lg font-bold mr-4">{index + 1}</span>
//               <div>
//                 <h2 className="font-bold">{quiz.title}</h2>
//                 <p>{quiz.description}</p>
//               </div>
//             </div>
//             <Link href={quiz.attempted ? `/userRender/quiz/${quiz._id}/result` : `/userRender/quiz/${quiz._id}/attempt`}>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 {quiz.attempted ? 'Result' : 'Attempt'}
//               </button>
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default QuizList;
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/app/components/context/userContext';

export interface Quiz {
  _id: number;
  title: string;
  description: string;
  attempted: boolean;
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUser();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuizzes', {
          credentials: 'include',
        });

        if (!quizResponse.ok) {
          throw new Error('Failed to fetch quizzes.');
        }

        const quizzesData = await quizResponse.json();

        const quizzesWithAttemptedFlag = quizzesData.map((quiz: any) => ({
          ...quiz,
          attempted: false, // Default value
        }));

        setQuizzes(quizzesWithAttemptedFlag);

        const resultResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (resultResponse.ok) {
          const resultsData = await resultResponse.json();

          const attemptedQuizIds = new Set(resultsData.map((result: any) => result?.quizId?._id));

          const updatedQuizzes = quizzesWithAttemptedFlag.map((quiz: any) => ({
            ...quiz,
            attempted: attemptedQuizIds.has(quiz?._id),
          }));

          setQuizzes(updatedQuizzes);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch quizzes.');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [token]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      {quizzes.length === 0 ? (
        <div>No quizzes available</div>
      ) : (
        quizzes.map((quiz, index) => {
          const isClickable =
            index === 0 || quizzes[index - 1]?.attempted; // Only clickable if it's the first quiz or the previous one is attempted

          return (
            <div
              key={quiz._id}
              className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white"
            >
              <div className="flex items-center">
                <span className="text-lg font-bold mr-4">{index + 1}</span>
                <div>
                  <h2 className="font-bold">{quiz.title}</h2>
                  <p>{quiz.description}</p>
                </div>
              </div>
              <Link
                href={
                  isClickable
                    ? quiz.attempted
                      ? `/userRender/quiz/${quiz._id}/result`
                      : `/userRender/quiz/${quiz._id}/attempt`
                    : '#'
                }
              >
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    isClickable
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isClickable}
                >
                  {quiz.attempted ? 'Result' : 'Attempt'}
                </button>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuizList;
