
// 'use client'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Quiz {
//   _id: number;
//   title: string;
//   description: string;
//   attempted: boolean; 
// }

// const QuizList: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
    
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes', {
//           credentials: 'include',
//         });
//         const data = await response.json();

//         // If the backend provides "attempted" data, we use it directly
//         // Otherwise, you can implement logic to determine which quizzes have been attempted
//         const quizzesWithAttemptedFlag = data.map((quiz: any) => ({
//           ...quiz,
//           attempted: quiz.attempted || false, // Assume attempted is sent by backend or fallback to false
//         }));

//         setQuizzes(quizzesWithAttemptedFlag);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch quizzes.');
//         setLoading(false);
//       }
//     };
    
//     fetchQuizzes();
//   }, []);

//   if (loading) return <div className="text-white">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-900 min-h-screen p-8">
//       {quizzes.map((quiz, index) => (
//         <div key={quiz._id} className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white">
//           <div className="flex items-center">
//             <span className="text-lg font-bold mr-4">{index + 1}</span>
//             <div>
//               <h2 className="font-bold">{quiz.title}</h2>
//               <p>{quiz.description}</p>
//             </div>
//           </div>
         
//           <Link href={quiz.attempted ? `/userRender/verbal/${quiz._id}/result` : `/userRender/verbal/${quiz._id}/attempt`}>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//               {quiz.attempted ? 'Result' : 'Attempt'}
//             </button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default QuizList;



// 'use client'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useUser } from '@/app/components/context/userContext';

// interface Quiz {
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

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const quizResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes', {
//           credentials: 'include',
//         });
//         const quizzesData = await quizResponse.json();

//         // Fetch user results without specifying a quiz ID
//         const resultResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (!resultResponse.ok) {
//           throw new Error('Failed to fetch quiz results.');
//         }

//         const resultsData = await resultResponse.json();

//         const attemptedQuizIds = new Set(resultsData.map((result: any) => result.quizId._id));

        
//         const quizzesWithAttemptedFlag = quizzesData.map((quiz: any) => ({
//           ...quiz,
//           attempted: attemptedQuizIds.has(quiz._id),
//         }));

//         setQuizzes(quizzesWithAttemptedFlag);
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
//       {quizzes.map((quiz, index) => (
//         <div key={quiz._id} className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white">
//           <div className="flex items-center">
//             <span className="text-lg font-bold mr-4">{index + 1}</span>
//             <div>
//               <h2 className="font-bold">{quiz.title}</h2>
//               <p>{quiz.description}</p>
//             </div>
//           </div>
//           <Link href={quiz.attempted ? `/userRender/verbal/${quiz._id}/result` : `/userRender/verbal/${quiz._id}/attempt`}>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//               {quiz.attempted ? 'Result' : 'Attempt'}
//             </button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuizList;



'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/app/components/context/userContext';

interface Quiz {
  _id: number;
  title: string;
  description: string;
  attempted: boolean; 
}

interface QuizListProps {
  onSelectQuiz: (id: string) => void; 
}
interface QuizResult {
  quizId: {
    _id: string; // or number, depending on your backend
  };
}

const QuizList: React.FC<QuizListProps> = ({ onSelectQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useUser(); 
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes', {
          credentials: 'include',
        });
        const quizzesData = await quizResponse.json();
  
        const resultResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (!resultResponse.ok) {
          throw new Error('Failed to fetch quiz results.');
        }
  
        const resultsData: QuizResult[] = await resultResponse.json(); // Specify the type here
        console.log('Quizzes Data:', quizzesData); // Log for debugging
        console.log('Results Data:', resultsData); // Log for debugging
  
        // Safely handle potential nulls and specify the result type
        const attemptedQuizIds = new Set(
          resultsData?.map((result: QuizResult) => result.quizId?._id).filter(id => id != null)
        );
  
        const quizzesWithAttemptedFlag = quizzesData.map((quiz: any) => ({
          ...quiz,
          attempted: attemptedQuizIds.has(quiz._id),
        }));
  
        setQuizzes(quizzesWithAttemptedFlag);
        setLoading(false);
      } catch (error) {
        console.error(error); 
        setError('Failed to fetch quizzes.');
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, [token]);
  
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const quizResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes', {
  //         credentials: 'include',
  //       });
  //       const quizzesData = await quizResponse.json();

  //       const resultResponse = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //       });

  //       if (!resultResponse.ok) {
  //         throw new Error('Failed to fetch quiz results.');
  //       }

  //       const resultsData = await resultResponse.json();
  //       const attemptedQuizIds = new Set(resultsData.map((result: any) => result.quizId._id));

  //       const quizzesWithAttemptedFlag = quizzesData.map((quiz: any) => ({
  //         ...quiz,
  //         attempted: attemptedQuizIds.has(quiz._id),
  //       }));

  //       setQuizzes(quizzesWithAttemptedFlag);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error); 
  //       setError('Failed to fetch quizzes.');
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchQuizzes();
  // }, [token]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      {quizzes.map((quiz, index) => (
        <div key={quiz._id} className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white">
          <div className="flex items-center">
            <span className="text-lg font-bold mr-4">{index + 1}</span>
            <div>
              <h2 className="font-bold">{quiz.title}</h2>
              <p>{quiz.description}</p>
            </div>
          </div>
          <Link href={quiz.attempted ? `/userRender/verbal/${quiz._id}/result` : `/userRender/verbal/${quiz._id}/attempt`}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelectQuiz(quiz._id.toString())} 
            >
              {quiz.attempted ? 'Result' : 'Attempt'}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
