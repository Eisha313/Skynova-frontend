// // 'use client';
// // import { useState } from 'react';
// // import QuizCreation from './NonverbalQuizCreation';
// // import NonverbalQuestionForm from './nonverbalQuestionCreation';
// // import Link from 'next/link';

// // interface Option {
// //   label: string;
// //   image: string;
// // }

// // interface Question {
// //   _id?: string;
// //   text: string;
// //   options: Option[];
// //   answer: string;
// //   quizId?: string;
// // }

// // const NonverbalQuizForm = () => {
// //   const [questions, setQuestions] = useState<Question[]>([]);
// //   const [quizCreated, setQuizCreated] = useState(false);
// //   const [quizId, setQuizId] = useState<string | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const fetchQuizIdByTitle = async (title: string): Promise<string | null> => {
// //     try {
// //       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes',{credentials:'include'});
// //       if (response.ok) {
// //         const data = await response.json();
// //         const quiz = data.find((quiz: { title: string; _id: string }) => quiz.title === title);
// //         return quiz?._id || null;
// //       } else {
// //         console.error('Failed to fetch quizzes');
// //         return null;
// //       }
// //     } catch (error) {
// //       console.error('Error fetching quizzes:', error);
// //       return null;
// //     }
// //   };

// //   const handleAddQuestion = (question: Question) => {
// //     setQuestions([...questions, question]);
// //   };

// //   const handleQuizCreation = async (title: string, description: string) => {
// //     try {
// //       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/createNonVerbalQuiz', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ title, description }),
// //         credentials:'include'
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log(data)
// //         setQuizId(data.quizId);
// //         setQuizCreated(true);
// //       } else {
// //         console.error('Failed to create quiz');
// //       }
// //     } catch (error) {
// //       console.error('Error creating quiz:', error);
// //       setError('Error creating quiz');
// //     }
// //   };

// //   return (
    
// //     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
// //   {!quizCreated ? (
// //     <QuizCreation onCreateQuiz={handleQuizCreation} />
// //   ) : (
// //     <NonverbalQuestionForm quizId={quizId || ''} onAddQuestion={handleAddQuestion} />
// //   )}
// //   <Link href="/nonverbalquiz">
// //     <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
// //       {quizCreated ? 'Complete Quiz' : 'Cancel'}
// //     </button>
// //   </Link>
// // </div>

// //   );
// // };

// // export default NonverbalQuizForm;
// 'use client';
// import { useState } from 'react';
// import QuizCreation from './NonverbalQuizCreation';
// import NonverbalQuestionForm from './nonverbalQuestionCreation';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // To navigate back

// interface Option {
//   label: string;
//   image: string;
// }

// interface Question {
//   _id?: string;
//   text: string;
//   options: Option[];
//   answer: string;
//   quizId?: string;
// }

// const NonverbalQuizForm = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [quizCreated, setQuizCreated] = useState(false);
//   const [quizId, setQuizId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter(); // Use useRouter for navigation

//   const fetchQuizIdByTitle = async (title: string): Promise<string | null> => {
//     try {
//       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes', { credentials: 'include' });
//       if (response.ok) {
//         const data = await response.json();
//         const quiz = data.find((quiz: { title: string; _id: string }) => quiz.title === title);
//         return quiz?._id || null;
//       } else {
//         console.error('Failed to fetch quizzes');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//       return null;
//     }
//   };

//   const handleAddQuestion = (question: Question) => {
//     setQuestions([...questions, question]);
//   };

//   const handleQuizCreation = async (title: string, description: string) => {
//     try {
//       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/createNonVerbalQuiz', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, description }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setQuizId(data.quizId);
//         setQuizCreated(true);
//       } else {
//         console.error('Failed to create quiz');
//       }
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       setError('Error creating quiz');
//     }
//   };

  
//   const handleCompleteQuiz = async () => {
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/completeQuiz/${quizId}`, {
//         method: 'PATCH',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         console.log('Quiz marked as completed');
//         router.push('/nonverbal')
//       } else {
//         console.error('Failed to mark quiz as completed');
//       }
//     } catch (error) {
//       console.error('Error marking quiz as completed:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
//       {!quizCreated ? (
//         <QuizCreation onCreateQuiz={handleQuizCreation} />
//       ) : (
//         <NonverbalQuestionForm quizId={quizId || ''} onAddQuestion={handleAddQuestion} />
//       )}
      
//       {quizCreated ? (
//         <button
//           onClick={handleCompleteQuiz}
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Complete Quiz
//         </button>
//       ) : (
//         <Link href="/nonverbalquiz">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Cancel</button>
//         </Link>
//       )}
//     </div>
//   );
// };

// export default NonverbalQuizForm;
'use client';
import { useState } from 'react';
import QuizCreation from './NonverbalQuizCreation';
import NonverbalQuestionForm from './nonverbalQuestionCreation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Option {
  label: string;
  image: string;
}

interface Question {
  _id?: string;
  text: string;
  options: Option[];
  answer: string;
  quizId?: string;
}

const NonverbalQuizForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizCreated, setQuizCreated] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchQuizIdByTitle = async (title: string): Promise<string | null> => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        const quiz = data.find((quiz: { title: string; _id: string }) => quiz.title === title);
        return quiz?._id || null;
      } else {
        console.error('Failed to fetch quizzes');
        return null;
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return null;
    }
  };

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleQuizCreation = async (title: string, description: string) => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/createNonVerbalQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQuizId(data.quizId);
        setQuizCreated(true);
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('Error creating quiz');
    }
  };

  const handleCompleteQuiz = async () => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/completeQuiz/${quizId}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Quiz marked as completed');
        router.back(); // Navigate back to the previous page
      } else {
        console.error('Failed to mark quiz as completed');
      }
    } catch (error) {
      console.error('Error marking quiz as completed:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {!quizCreated ? (
        <QuizCreation onCreateQuiz={handleQuizCreation} />
      ) : (
        <div className="mt-6">
          <NonverbalQuestionForm quizId={quizId || ''} onAddQuestion={handleAddQuestion} />
          
          {/* Questions List with Serial Numbers */}
          {questions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Added Questions:</h3>
              <ul className="list-decimal pl-6 space-y-2">
                {questions.map((question, index) => (
                  <li key={question._id || index} className="flex items-start justify-between bg-gray-100 p-3 rounded-lg shadow">
                    <span className="font-medium text-gray-800">
                      {index + 1}. {question.text}
                    </span>
                 
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    
      {/* {quizCreated ? (
        <button
          onClick={handleCompleteQuiz}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-6 text-center"
        >
          Complete Quiz
        </button>
      ) : (
        <Link href="/nonverbalquiz">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-6 text-center">
            Cancel
          </button>
        </Link>
      )} */}
    </div>
  );
};

export default NonverbalQuizForm;
