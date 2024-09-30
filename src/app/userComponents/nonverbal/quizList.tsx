// 'use client'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Quiz {
//   _id: number;
//   title: string;
//   description: string;
//   attempted: boolean; 
// }

// const NonVerbalQuizList: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalquizzes/viewNonVerbalQuizzes', {
//           credentials: 'include',
//         });
//         const data = await response.json();

//         const quizzesWithAttemptedFlag = data.map((quiz: any) => ({
//           ...quiz,
//           attempted: quiz.attempted || false,
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
//     <div className="bg-gray-900 min-h-screen p-8 mt-20">
//         <div className='flex justify-center align center text-white font-bold text-lg mb-8'><h2>Non Verbal Aptitude test</h2></div>
//       {quizzes.map((quiz, index) => (
//         <div key={quiz._id} className="flex justify-between items-center p-4 mb-4 border border-white rounded-lg text-white">
//           <div className="flex items-center">
//             <span className="text-lg font-bold mr-4">{index + 1}</span>
//             <div>
//               <h2 className="font-bold">{quiz.title}</h2>
//               <p>{quiz.description}</p>
//             </div>
//           </div>
//           <Link href={quiz.attempted ? `/userRender/nonverbal/${quiz._id}/result` : `/userRender/nonverbal/${quiz._id}/attempt`}>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//               {quiz.attempted ? 'Result' : 'Attempt'}
//             </button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NonVerbalQuizList;
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';


interface Quiz {
  _id: number;
  title: string;
  description: string;
  attempted: boolean;
}

interface NonVerbalQuizListProps {
  // onSelectQuiz: (quizId: number) => void;
  
    onSelectQuiz?: (id: string) => void; 
  }


const NonVerbalQuizList: React.FC<NonVerbalQuizListProps> = ({ onSelectQuiz }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          'https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes',
          {
            credentials: 'include',
          }
        );
        const data = await response.json();

        const quizzesWithAttemptedFlag = data.map((quiz: any) => ({
          ...quiz,
          attempted: quiz.attempted || false,
        }));

        setQuizzes(quizzesWithAttemptedFlag);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch quizzes.');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8 mt-20">
      <div className="flex justify-center items-center text-white font-bold text-lg mb-8">
        <h2>Non Verbal Aptitude Test</h2>
      </div>
      {quizzes.map((quiz, index) => (
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
              quiz.attempted
                ? `/userRender/nonverbal/${quiz._id}/result`
                : `/userRender/nonverbal/${quiz._id}/attempt`
            }
          >
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() =>
                onSelectQuiz && typeof onSelectQuiz === 'function' &&
                 onSelectQuiz(quiz._id.toString())} 
            >
              {quiz.attempted ? 'Result' : 'Attempt'}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NonVerbalQuizList;
