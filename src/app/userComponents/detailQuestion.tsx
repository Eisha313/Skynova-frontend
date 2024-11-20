
// 'use client'; 

// import React, { useState, useEffect, useCallback } from 'react';
// import { format } from 'date-fns';
// import Link from 'next/link';
// import { useUser } from '../components/context/userContext';

// interface User {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   profileImage?: string | null; 
// }

// interface Answer {
//   _id: number;
//   content: string;
//   author: User | null;
//   date: string;
// }

// interface Question {
//   _id: number;
//   title: string;
//   body: string;
//   author: User | null;
//   answers: Answer[] | undefined;
// }

// interface QuestionDetailProps {
//   id: string;
// }

// const QuestionDetail: React.FC<QuestionDetailProps> = ({ id }) => {
//   const [question, setQuestion] = useState<Question | null>(null);
//   const [answer, setAnswer] = useState<string>('');

//   const { token, firstName, lastName, _id: userId, profileImage } = useUser();

 
//   const fetchQuestion = useCallback(async () => {
//     if (!id) return;
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestion/${id}`, {
//         credentials: 'include',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Fetched Question:', data);

//         const questionData = data;
//         setQuestion({
//           ...questionData,
//           // answers: questionData?.answers || [], 
//           answers:[...(questionData?.answers || [])], 
//         });
//       } else {
//         console.error('Error fetching question:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }, [id, token]);

//   useEffect(() => {
//     fetchQuestion();
//   }, [fetchQuestion]);

  
//   const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setAnswer(e.target.value);
//   };

  
//   const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!id || !token) return;
//     try {
//       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityAnswers/createCommunityAnswer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           content: answer,
//           questionId: id,
//           author: {
//             _id: userId,
//             firstName,
//             lastName,
//             profileImage: profileImage || null,
//           },
//         }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         setAnswer('');
//         fetchQuestion(); 
//       } else {
//         console.error('Error posting answer:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const getUsername = (user: User | null) => {
//     if (!user) return 'Unknown';
//     return `${user.firstName} ${user.lastName}`;
//   };

//   if (!question) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
//       <div className="space-y-6">
        
//         <h1 className="text-2xl font-bold text-blue-700 mb-4">{question.title}</h1>
//         <p className="text-gray-700">{question.body}</p>

        
//         {question?.answers && question.answers.length > 0 ? (
//   question.answers.map((ans) => (
//     <div key={ans._id} className="bg-blue-50 p-4 rounded-lg shadow-lg mb-4">
//       <div className="flex items-center mb-2">
        
//         {ans.author ? (
//           <>
//             {ans.author.profileImage ? (
//               <img
//                 src={ans.author.profileImage}
//                 alt={ans.author.firstName}
//                 className="w-8 h-8 rounded-full"
//               />
//             ) : (
//               <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
//                 {ans.author.firstName[0].toUpperCase()}
//               </div>
//             )}
//             <p className="ml-3 text-blue-500">{ans.author.firstName} {ans.author.lastName}</p>
//           </>
//         ) : (
//           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
//             Unknown
//           </div>
//         )}
//       </div>
//       <p className="text-gray-900 mb-2">{ans.content}</p>
//       <p className="text-gray-600 text-sm">{new Date(ans.date).toLocaleString()}</p>
//     </div>
//   ))
// ) : (
//   <p className="text-gray-500">No answers yet. Be the first to answer!</p>
// )}
// </div>


      
//       <form onSubmit={handleAnswerSubmit} className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Answer</h2>
//         <textarea
//           value={answer}
//           onChange={handleAnswerChange}
//           placeholder="Write your answer here..."
//           className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//           rows={5}
//         />
//         <button
//           type="submit"
//           className="bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-blue-800"
//         >
//           Submit Answer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuestionDetail;
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../components/context/userContext';

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
}

interface Answer {
  _id: number;
  content: string;
  author: User | null;
  date: string;
}

interface Question {
  _id: number;
  title: string;
  body: string;
  author: User | null;
  answers: Answer[] | undefined;
}

interface QuestionDetailProps {
  id: string;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ id }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');

  const { token, firstName, lastName, _id: userId, profileImage } = useUser();

  const fetchQuestion = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestion/${id}`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setQuestion({
          ...data,
          answers: [...(data?.answers || [])],
        });
      } else {
        console.error('Error fetching question:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !token) return;
    try {
      const response = await fetch(
        'https://sky-nova-8ccaddc754ce.herokuapp.com/communityAnswers/createCommunityAnswer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: answer,
            questionId: id,
            author: {
              _id: userId,
              firstName,
              lastName,
              profileImage: profileImage || null,
            },
          }),
          credentials: 'include',
        }
      );

      if (response.ok) {
        setAnswer('');
        fetchQuestion();
      } else {
        console.error('Error posting answer:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUsername = (user: User | null) => {
    if (!user) return 'Unknown';
    return `${user.firstName} ${user.lastName}`;
  };

  if (!question)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Question Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700">{question.title}</h1>
        <p className="text-gray-700 mt-4">{question.body}</p>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-700">Answers</h2>
        {question.answers && question.answers.length > 0 ? (
          question.answers.map((ans) => (
            <div
              key={ans._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center mb-2">
                {ans.author ? (
                  <>
                    {ans.author.profileImage ? (
                      <img
                        src={ans.author.profileImage}
                        alt={ans.author.firstName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        {ans.author.firstName[0].toUpperCase()}
                      </div>
                    )}
                    <p className="ml-3 text-blue-500 font-semibold">
                      {getUsername(ans.author)}
                    </p>
                  </>
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    Unknown
                  </div>
                )}
              </div>
              <p className="text-gray-900 mb-2">{ans.content}</p>
              <p className="text-gray-500 text-sm">
                {new Date(ans.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No answers yet. Be the first to answer!</p>
        )}
      </div>

      {/* Answer Form */}
      <form
        onSubmit={handleAnswerSubmit}
        className="bg-white p-6 rounded-lg shadow-lg mt-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Answer</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Write your answer here..."
          className="w-full p-4 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-blue-800 transition"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuestionDetail;
