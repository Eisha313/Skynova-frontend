
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

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
//                 const response = await fetch('http://192.168.18.54:3000/communityQuestions/viewCommunityQuestions');
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
//             const response = await fetch(`http://192.168.18.54:3000/communityQuestions/deleteCommunityQuestion/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) throw new Error('Failed to delete the question');
//             setQuestions(questions.filter((question) => question.id !== id));
//         } catch (error) {
//             console.log('error deleting the question', error);
//         }
//     };

//     return (
//         <div className="relative mx-auto max-w-4xl p-6 bg-gray-100 flex flex-col rounded-md shadow-lg">
//             <div className="mb-6 flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-gray-800">Community Questions</h1>
//                 {/* <Link href={'/userRender/addCommunityQuestion'}>
//                     <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
//                         Post Question
//                     </button>
//                 </Link> */}
//             </div>
//             <div className="space-y-4">
//                 {questions.map((question) => (
//                     <div key={question.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden">
//                         <div className="flex justify-between items-center">
//                             <div>
//                                 <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
//                                 <p className="text-gray-700 mb-2">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
//                                 <Link href={`/community/${question.id}/questiondetail`} className="text-blue-500 hover:underline text-sm">
//                                     Read more
//                                 </Link>
//                             </div>
//                             <button
//                                 onClick={() => handleDelete(question.id)}
//                                 className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
//                             >
//                                 Delete
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
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';

interface Question {
    id: number;
    title: string;
    body: string;
}

const CommunityQuestions: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://192.168.18.54:3000/communityQuestions/viewCommunityQuestions');
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

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.18.54:3000/communityQuestions/deleteCommunityQuestion/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete the question');
            setQuestions(questions.filter((question) => question.id !== id));
        } catch (error) {
            console.log('error deleting the question', error);
        }
    };

    return (
        <div className="relative mx-auto max-w-4xl p-8 bg-gray-50 flex flex-col rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">Community Questions</h1>
                {/* <Link href={'/userRender/addCommunityQuestion'}>
                    <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        Post Question
                    </button>
                </Link> */}
            </div>
            <div className="space-y-6">
                {questions.map((question) => (
                    <div key={question.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900">{question.title}</h2>
                                <p className="text-gray-800 mb-3">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
                                <Link href={`/community/${question.id}/questiondetail`} className="text-blue-600 hover:underline text-sm">
                                    Read more
                                </Link>
                            </div>
                            <button
                                onClick={() => handleDelete(question.id)}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
                                aria-label="Delete question"
                            >
                                <AiOutlineDelete className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityQuestions;
