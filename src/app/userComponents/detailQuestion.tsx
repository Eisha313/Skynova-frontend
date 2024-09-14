
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { format, parseISO } from 'date-fns';
// import Link from 'next/link';

// interface User {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   profilePicture: string | null;
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
//   answers: Answer[];
// }

// interface QuestionDetailProps {
//   id: string;
// }

// const QuestionDetail: React.FC<QuestionDetailProps> = ({ id }) => {
//   const [question, setQuestion] = useState<Question | null>(null);
//   const [answer, setAnswer] = useState<string>('');

//   const fetchQuestion = useCallback(async () => {
//     if (!id) return;
//     try {
//       const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestion/${id}`,{credentials:'include'});
//       if (response.ok) {
//         const data = await response.json();
//         const questionData = data[0];
//         setQuestion({
//           ...questionData,
//           answers: questionData.answers || []
//         });
//       } else {
//         console.error('Error fetching question:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchQuestion();
//   }, [fetchQuestion]);

//   const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setAnswer(e.target.value);
//   };

//   const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!id) return;
//     try {
//       const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityAnswers/createCommunityAnswer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: answer, questionId: id }),
//         credentials:'include'
//       });

//       if (response.ok) {
//         setAnswer('');
//         fetchQuestion(); // Refresh the question to include the new answer
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
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">{question.title}</h1>
//         <p className="text-lg text-gray-800">{question.body}</p>
//         <div className="flex items-center mt-4">
//           {question.author ? (
//             <>
//               {question.author.profilePicture && isValidURL(question.author.profilePicture) ? (
//                 <img
//                   src={question.author.profilePicture}
//                   alt={getUsername(question.author)}
//                   className="w-10 h-10 rounded-full"
//                 />
//               ) : (
//                 <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
//                   {getUsername(question.author)[0].toUpperCase()}
//                 </div>
//               )}
//               <Link href={`/chat/${question.author._id}`} className="ml-3 text-blue-500 hover:underline">
//                 {getUsername(question.author)}
//               </Link>
//             </>
//           ) : (
//             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
//               Unknown
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-700">Answers</h2>
//         {question.answers.length === 0 ? (
//           <p className="text-gray-600">No answers yet. Be the first to answer!</p>
//         ) : (
//           <div className="space-y-6">
//             {question.answers.map((ans) => (
//               <div key={ans._id} className="bg-blue-50 p-4 rounded-lg shadow-lg">
//                 <div className="flex items-center mb-2">
//                   {ans.author ? (
//                     <>
//                       {ans.author.profilePicture && isValidURL(ans.author.profilePicture) ? (
//                         <img
//                           src={ans.author.profilePicture}
//                           alt={getUsername(ans.author)}
//                           className="w-8 h-8 rounded-full"
//                         />
//                       ) : (
//                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
//                           {getUsername(ans.author)[0].toUpperCase()}
//                         </div>
//                       )}
//                       <Link href={`/chat/${ans.author._id}`} className="ml-3 text-blue-500 hover:underline">
//                         {getUsername(ans.author)}
//                       </Link>
//                     </>
//                   ) : (
//                     <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
//                       Unknown
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-gray-900 mb-2">{ans.content}</p>
//                 <p className="text-sm text-gray-600">
//                   By {getUsername(ans.author)} on {ans.date ? format(parseISO(ans.date), 'MMMM d, yyyy') : 'Unknown date'}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleAnswerSubmit} className="mt-10">
//         <textarea
//           value={answer}
//           onChange={handleAnswerChange}
//           className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
//           rows={5}
//           placeholder="Write your answer here..."
//           required
//         />
//         <button
//           type="submit"
//           className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
//         >
//           Post Answer
//         </button>
//       </form>
//     </div>
//   );
// };

// const isValidURL = (url: string) => {
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// };

// export default QuestionDetail;
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useUser } from '../components/context/userContext'; 

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  profileImage: string | null;
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
  answers: Answer[];
}

interface QuestionDetailProps {
  id: string;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ id }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');

  const { token, firstName, lastName, _id: userId, profileImage } = useUser(); // Get profile image from useUser

  const fetchQuestion = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestion/${id}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}` // Send token in the request header
        }
      });
      if (response.ok) {
        const data = await response.json();
        const questionData = data[0];
        setQuestion({
          ...questionData,
          answers: questionData.answers || []
        });
        console.log(data)
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
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityAnswers/createCommunityAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Send token in the header
        },
        body: JSON.stringify({
          content: answer,
          questionId: id,
          author: {
            _id: userId,
            firstName,
            lastName,
            profileImage  // Send profile image
          }
        }),
        credentials: 'include'
      });

      if (response.ok) {
        setAnswer('');
        fetchQuestion(); // Refresh the question to include the new answer
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

  if (!question) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">{question.title}</h1>
        <p className="text-lg text-gray-800">{question.body}</p>
        <div className="flex items-center mt-4">
          {question.author ? (
            <>
              {question.author.profileImage && isValidURL(question.author.profileImage) ? (
                <img
                  src={question.author.profileImage}
                  alt={getUsername(question.author)}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                  {getUsername(question.author)[0].toUpperCase()}
                </div>
              )}
              <Link href={`/chat/${question.author._id}`} className="ml-3 text-blue-500 hover:underline">
                {getUsername(question.author)}
              </Link>
            </>
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
              Unknown
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Answers</h2>
        {question.answers.length === 0 ? (
          <p className="text-gray-600">No answers yet. Be the first to answer!</p>
        ) : (
          <div className="space-y-6">
            {question.answers.map((ans) => (
              <div key={ans._id} className="bg-blue-50 p-4 rounded-lg shadow-lg">
                <div className="flex items-center mb-2">
                  {ans.author ? (
                    <>
                      {ans.author.profileImage && isValidURL(ans.author.profileImage) ? (
                        <img
                          src={ans.author.profileImage}
                          alt={getUsername(ans.author)}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                          {getUsername(ans.author)[0].toUpperCase()}
                        </div>
                      )}
                      <Link href={`/chat/${ans.author._id}`} className="ml-3 text-blue-500 hover:underline">
                        {getUsername(ans.author)}
                      </Link>
                    </>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      Unknown
                    </div>
                  )}
                </div>
                <p className="text-gray-900 mb-2">{ans.content}</p>
                <p className="text-gray-600 text-sm">
                  {format(parseISO(ans.date), 'PPPpp')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleAnswerSubmit} className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Answer</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Write your answer here..."
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          rows={5}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-blue-800"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuestionDetail;

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}


