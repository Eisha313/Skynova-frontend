// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   profileImage: string | null;
// }

// interface Question {
//   _id: string;
//   title: string;
//   body: string;
//   author: User | null;
// }

// const CommunityQuestions: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions', { credentials: 'include' });
//         if (!response.ok) throw new Error('Failed to fetch the questions');
//         const data = await response.json();
//         console.log(data);
//         setQuestions(data);
//       } catch (error) {
//         setError('Failed to load questions. Please try again later.');
//         console.error('Error fetching the questions', error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const getUsername = (user: User | null) => {
//     if (!user) return 'Unknown';
//     const firstName = user.firstName || '';
//     const lastName = user.lastName || '';
//     return `${firstName} ${lastName}`.trim() || 'Unknown';
//   };

//   return (
//     <div className="relative mx-auto max-w-4xl p-6 bg-gray-100 flex flex-col rounded-md shadow-lg">
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Community Questions</h1>
//         <Link href={'/userRender/addCommunityQuestion'}>
//           <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
//             Post Question
//           </button>
//         </Link>
//       </div>
//       {error && (
//         <div className="mb-6 text-red-500">
//           {error}
//         </div>
//       )}
//       <div className="space-y-4">
//         {questions.map((question) => (
//           <div key={question._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden">
//             <div className="flex items-center mb-2">
//               {question.author ? (
//                 <>
//                   {question.author.profileImage && isValidURL(question.author.profileImage) ? (
//                     <img
//                       src={question.author.profileImage}
//                       alt={getUsername(question.author)}
//                       className="w-10 h-10 rounded-full"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
//                       {getUsername(question.author)[0].toUpperCase()}
//                     </div>
//                   )}
//                   <Link href={`/userRender/chat/${question.author._id}`} className="ml-3 text-blue-500 hover:underline">
//                     {getUsername(question.author)}
//                   </Link>
//                 </>
//               ) : (
//                 <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black">
//                   Unknown
//                 </div>
//               )}
//             </div>
//             <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
//             <p className="text-gray-700 mb-2">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
//             <Link href={`/userRender/viewCommunityQuestions/${question._id}/questionDetail`} className="text-blue-500 hover:underline text-sm">
//               Read more
//             </Link>
//           </div>
//         ))}
//       </div>
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

// export default CommunityQuestions;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useUser } from '../components/context/userContext';

// interface Question {
//   _id: string;
//   title: string;
//   body: string;
//   author?: {
//     firstName: string;
//     lastName: string;
//   };
// }

// const CommunityQuestions = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [newQuestion, setNewQuestion] = useState({ title: '', body: '' });

//   const router = useRouter();
//   const { _id, token } = useUser();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           'https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions',
//           { credentials: 'include' }
//         );
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredQuestions = questions.filter((q) =>
//     q.title && q.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         'https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/createCommunityQuestion',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newQuestion),
//           credentials: 'include',
//         }
//       );

//       if (response.ok) {
//         const createdQuestion = await response.json();
//         setQuestions((prevQuestions) => [createdQuestion, ...prevQuestions]);
//         setNewQuestion({ title: '', body: '' });

//       }
//       const fetchQuestions = async () => {
//         try {
//           const response = await fetch(
//             'https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions',
//             { credentials: 'include' }
//           );
//           const data = await response.json();
//           setQuestions(data);
//         } catch (error) {
//           console.error('Error fetching questions:', error);
//         }
//       };
//       fetchQuestions();

//     } catch (error) {
//       console.error('Error posting question:', error);
//     }
//   };

//   return (
//     <div className="relative min-h-screen
//      bg-[#0B1121]
//       text-white">
//       <div className='background-image-overlay'/>
//       <div className="page-overlay" />

//       <div className="max-w-screen-lg mx-auto px-4 py-12 z-10 relative">

//       <div className="text-center text-white">
//         <h1 className="text-4xl font-bold mb-2">Community</h1>
//         <p className="text-lg">
//           Explore our community of diverse questions, browse through questions, and contribute to find the information you need.
//         </p>
//       </div>

//       <div className="max-w-4xl mx-auto mt-8">
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full p-4 rounded-md shadow-lg border-none outline-none text-gray-900"
//         />
//       </div>

// <div className="max-w-4xl mx-auto mt-8 bg-gray-800 text-white rounded-md p-6 shadow-lg border border-blue-400">
//   <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
//   <form onSubmit={handleSubmit} className="space-y-4">
//     <input
//       type="text"
//       name="title"
//       value={newQuestion.title}
//       onChange={(e) =>
//         setNewQuestion({ ...newQuestion, title: e.target.value })
//       }
//       placeholder="Title"
//       className="w-full p-4 text-lg rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
//     />
//     <textarea
//       name="body"
//       value={newQuestion.body}
//       onChange={(e) =>
//         setNewQuestion({ ...newQuestion, body: e.target.value })
//       }
//       placeholder="Description"
//       rows={4}
//       className="w-full p-4 text-lg rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
//     />
//     <div className="flex justify-end">
//       <button
//         type="submit"
//         className="bg-[#1F60B2] px-8 py-3 text-lg font-semibold text-white rounded-md hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400"
//       >
//         Submit
//       </button>
//     </div>
//   </form>
// </div>

//       {/* Community Questions */}
//       <div className="max-w-4xl mx-auto mt-8">
//         <h2 className="text-2xl text-white font-bold mb-4">Community Questions</h2>
//         {filteredQuestions.map((question) => (
//           <div
//             key={question._id}
//             className="bg-gray-800 text-white p-4 mb-4 rounded-md shadow-lg"
//           >
//             <div className="flex items-center mb-2">

//               <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
//                 {question.author?.firstName?.[0] || '?'}
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold">{`${question.author?.firstName || 'Unknown'} ${
//                   question.author?.lastName || ''
//                 }`}</h3>
//                 <p className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</p>
//               </div>
//             </div>
//             <h4 className="text-xl font-semibold">{question.title}</h4>
//             <p className="text-gray-300">{question.body.slice(0, 100)}...</p>
//             <Link
//               href={`/userRender/viewCommunityQuestions/${question._id}/questionDetail`}
//               className="text-blue-400 mt-2 inline-block"
//             >
//               Read more
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CommunityQuestions;
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../components/context/userContext";

interface Author {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
}

interface Question {
  _id: string;
  title: string;
  body: string;
  author?: Author | null;
}

const CommunityQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newQuestion, setNewQuestion] = useState({ title: "", body: "" });
  const { token } = useUser();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions",
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const getUsername = (author: Author | null | undefined) => {
    if (!author) return "Unknown";
    return `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Unknown";
  };

  const isValidURL = (url: string | null | undefined) => {
    try {
      return !!url && Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredQuestions = questions.filter((q) => q.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/createCommunityQuestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newQuestion),
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to create question");
      const createdQuestion = await response.json();
      setQuestions((prev) => [createdQuestion, ...prev]);
      setNewQuestion({ title: "", body: "" });

      const fetchQuestions = async () => {
        try {
          const response = await fetch(
            "https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions",
            { credentials: "include" }
          );
          const data = await response.json();
          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-white">
      <div className="background-image-overlay" />
      <div className="page-overlay" />
      <div className="max-w-screen-lg mx-auto px-4 py-12 z-10 relative">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-1 bg-blue-400"></span>
          <h1 className="text-4xl font-bold">Community</h1>
          <span className="w-12 h-1 bg-blue-400"></span>
        </div>
        <p className="text-lg text-center mt-2">Explore and contribute to our community of questions.</p>

        {/* <div className="max-w-4xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-4 rounded-full bg-blue-800 text-white placeholder-gray-400 shadow-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l4-4m0 0l-4-4m4 4h8m-6 4h8" />
          </svg>
        </div> */}

        <div className="max-w-4xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-4 rounded-full bg-transparent text-white border border-white/30 shadow-md outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l4-4m0 0l-4-4m4 4h8m-6 4h8" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-gray-800 text-white rounded-md p-6 shadow-lg border border-blue-400">
          <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              placeholder="Title"
              className="w-full p-4 text-lg rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
            <textarea
              name="body"
              value={newQuestion.body}
              onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
              placeholder="Description"
              rows={4}
              className="w-full p-4 text-lg rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#1F60B2] px-8 py-3 text-lg font-semibold text-white rounded-md hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Community Questions</h2>
          {filteredQuestions.map((question) => (
            <div key={question._id} className="bg-gray-800 p-4 rounded-md mb-4">
              <div className="flex items-center">
                {question.author?.profileImage && isValidURL(question.author.profileImage) ? (
                  <img
                    src={question.author.profileImage}
                    alt={getUsername(question.author)}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    {getUsername(question.author)[0]}
                  </div>
                )}
                <Link
                  href={{
                    pathname: `/userRender/chat`,
                    query: {
                      id: question.author?._id,
                      firstName: question.author?.firstName,
                      lastName: question.author?.lastName,
                    },
                  }}
                  className="text-blue-400"
                >
                  {getUsername(question.author)}
                </Link>
              </div>
              <h3 className="text-xl font-bold mt-2">{question.title}</h3>
              <p>{question.body.slice(0, 100)}...</p>
              <Link
                href={`/userRender/viewCommunityQuestions/${question._id}/questionDetail`}
                className="text-blue-400 mt-2 inline-block"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityQuestions;
