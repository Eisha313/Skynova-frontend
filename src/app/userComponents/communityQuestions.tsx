'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
                const response = await fetch('http://192.168.18.26:3000/communityQuestions/viewCommunityQuestions');
                if (!response.ok) throw new Error('response was not okay');
                const data = await response.json();
                const mappedQuestions: Question[] = data.map((question: any) => ({
                    id: question._id,
                    title: question.title,
                    body: question.body,
                }));
                setQuestions(mappedQuestions);
            } catch (error) {
                console.log('error fetching the user', error);
            }
        };
        fetchQuestions();
    }, []);

    return (
        <div className="relative mx-auto max-w-4xl p-6 bg-gray-100 flex flex-col rounded-md shadow-lg">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Community Questions</h1>
                <Link href={'/userRender/addCommunityQuestion'}>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        Post Question
                    </button>
                </Link>
            </div>
            <div className="space-y-4">
                {questions.map((question) => (
                    <div key={question.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
                        <p className="text-gray-700 mb-2">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
                        <Link href={`/userRender/viewCommunityQuestions/${question.id}/questionDetail`} className="text-blue-500 hover:underline text-sm">
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityQuestions;
