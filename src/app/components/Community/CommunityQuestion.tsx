
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import Link from 'next/link';

// // interface Question {
// //     id: number;
// //     title: string;
// //     body: string;
// // }

// // const CommunityQuestions: React.FC = () => {
// //     const [questions, setQuestions] = useState<Question[]>([]);

// //     useEffect(() => {
// //         const fetchQuestions = async () => {
// //             try {
// //                 const response = await fetch('http://192.168.18.54:3000/communityQuestions/viewCommunityQuestions');
// //                 if (!response.ok) throw new Error('response was not okay');
// //                 const data = await response.json();
// //                 const mappedQuestions: Question[] = data.map((question: any) => ({
// //                     id: question._id,
// //                     title: question.title,
// //                     body: question.body,
// //                 }));
// //                 setQuestions(mappedQuestions);
// //             } catch (error) {
// //                 console.log('error fetching the questions', error);
// //             }
// //         };
// //         fetchQuestions();
// //     }, []);

// //     const handleDelete = async (id: number) => {
// //         try {
// //             const response = await fetch(`http://192.168.18.54:3000/communityQuestions/deleteCommunityQuestion/${id}`, {
// //                 method: 'DELETE',
// //             });
// //             if (!response.ok) throw new Error('Failed to delete the question');
// //             setQuestions(questions.filter((question) => question.id !== id));
// //         } catch (error) {
// //             console.log('error deleting the question', error);
// //         }
// //     };

// //     return (
// //         <div className="relative mx-auto max-w-4xl p-6 bg-gray-100 flex flex-col rounded-md shadow-lg">
// //             <div className="mb-6 flex justify-between items-center">
// //                 <h1 className="text-3xl font-bold text-gray-800">Community Questions</h1>
// //                 {/* <Link href={'/userRender/addCommunityQuestion'}>
// //                     <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
// //                         Post Question
// //                     </button>
// //                 </Link> */}
// //             </div>
// //             <div className="space-y-4">
// //                 {questions.map((question) => (
// //                     <div key={question.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden">
// //                         <div className="flex justify-between items-center">
// //                             <div>
// //                                 <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
// //                                 <p className="text-gray-700 mb-2">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
// //                                 <Link href={`/community/${question.id}/questiondetail`} className="text-blue-500 hover:underline text-sm">
// //                                     Read more
// //                                 </Link>
// //                             </div>
// //                             <button
// //                                 onClick={() => handleDelete(question.id)}
// //                                 className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
// //                             >
// //                                 Delete
// //                             </button>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// // export default CommunityQuestions;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { AiOutlineDelete } from 'react-icons/ai';

// interface Question {
//     id: number;
//     title: string;
//     body: string;
// }

// const CommunityQuestions: React.FC = () => {
//     const [questions, setQuestions] = useState<Question[]>([]);

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions');
//                 if (!response.ok) throw new Error('response was not okay');
//                 const data = await response.json();
//                 const mappedQuestions: Question[] = data.map((question: any) => ({
//                     id: question._id,
//                     title: question.title,
//                     body: question.body,
//                 }));
//                 setQuestions(mappedQuestions);
//             } catch (error) {
//                 console.log('error fetching the questions', error);
//             }
//         };
//         fetchQuestions();
//     }, []);

//     const handleDelete = async (id: number) => {
//         try {
//             const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/deleteCommunityQuestion/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete the question');
//             setQuestions(questions.filter((question) => question.id !== id));
//         } catch (error) {
//             console.log('error deleting the question', error);
//         }
//     };

//     return (
//         <div className="relative mx-auto max-w-4xl p-8 bg-gray-50 flex flex-col rounded-lg shadow-lg">
//             <div className="text-center mb-8">
//                 <h1 className="text-4xl font-extrabold text-gray-900">Community Questions</h1>
//                 {/* <Link href={'/userRender/addCommunityQuestion'}>
//                     <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
//                         Post Question
//                     </button>
//                 </Link> */}
//             </div>
//             <div className="space-y-6">
//                 {questions.map((question) => (
//                     <div key={question.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <h2 className="text-2xl font-semibold mb-3 text-gray-900">{question.title}</h2>
//                                 <p className="text-gray-800 mb-3">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
//                                 <Link href={`/community/${question.id}/questiondetail`} className="text-blue-600 hover:underline text-sm">
//                                     Read more
//                                 </Link>
//                             </div>
//                             <button
//                                 onClick={() => handleDelete(question.id)}
//                                 className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
//                                 aria-label="Delete question"
//                             >
//                                 <AiOutlineDelete className="w-5 h-5" />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CommunityQuestions;
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';

interface Question {
  id: string;
  title: string;
  body: string;
}

const CommunityQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Question | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions',{
          credentials: 'include',});
        if (!response.ok) throw new Error('response was not okay');
        const data = await response.json();
        const mappedQuestions: Question[] = data.map((question: any) => ({
          id: question._id,
          title: question.title,
          body: question.body,
        }));
        setQuestions(mappedQuestions);
      } catch (error) {
        console.log('error fetching the questions', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/deleteCommunityQuestion/${id}`,{
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete the question');
      setQuestions(questions.filter((question) => question.id !== id));
      setSelectedQuestions(selectedQuestions.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.log('error deleting the question', error);
    }
  };

  const handleSort = (key: keyof Question) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map(question => question.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectQuestion = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(questionId => questionId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const renderArrow = (key: keyof Question) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  return (
    <div className="relative mx-auto max-w-4xl p-8 bg-gray-50 flex flex-col rounded-lg shadow-lg">
      <div className="text-center mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Community Questions</h1>
        <Link href={'/userRender/addCommunityQuestion'}>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Post Question
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-eisha text-white">
            <tr>
              <th className="py-2 px-4 border-b bg-gray-200">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              {['Title', 'Body', 'Actions'].map((header, index) => (
                <th
                  key={header}
                  className="py-2 px-4 border-b border-gray-200 cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase() as keyof Question)}
                >
                  {header} {index !== 2 && renderArrow(header.toLowerCase() as keyof Question)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedQuestions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-100 transition duration-300">
                <td className="py-2 px-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleSelectQuestion(question.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{question.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link href={`/community/${question.id}/questiondetail`} className="text-blue-600 hover:underline text-sm mr-2">
                    Read more
                  </Link>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="text-red-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    aria-label="Delete question"
                  >
                    <AiOutlineDelete className="text-gray-700 w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityQuestions;
