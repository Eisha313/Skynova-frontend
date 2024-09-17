
// 'use client'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Quiz {
//   _id: number;
//   title: string;
//   description: string;
//   attempted: boolean; // Boolean to track if the user has attempted the quiz
// }

// const QuizList: React.FC = () => {
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch quizzes from the backend
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes');
//         const data = await response.json();
//         // Here, we're assuming the backend sends back an array of quizzes with title and description
//         // Add the "attempted" field to each quiz based on your app's logic
//         const quizzesWithAttemptedFlag = data.map((quiz: any) => ({
//           ...quiz,
//           attempted: false, // Initially mark all quizzes as not attempted. Adjust this logic as needed.
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
//           {/* Render either "Result" or "Attempt" based on whether the quiz is attempted */}
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
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Quiz {
  _id: number;
  title: string;
  description: string;
  attempted: boolean; // Assuming the backend provides this field
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes', {
          credentials: 'include',
        });
        const data = await response.json();

        // If the backend provides "attempted" data, we use it directly
        // Otherwise, you can implement logic to determine which quizzes have been attempted
        const quizzesWithAttemptedFlag = data.map((quiz: any) => ({
          ...quiz,
          attempted: quiz.attempted || false, // Assume attempted is sent by backend or fallback to false
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
          {/* Render either "Result" or "Attempt" based on whether the quiz is attempted */}
          <Link href={quiz.attempted ? `/userRender/verbal/${quiz._id}/result` : `/userRender/verbal/${quiz._id}/attempt`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              {quiz.attempted ? 'Result' : 'Attempt'}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
