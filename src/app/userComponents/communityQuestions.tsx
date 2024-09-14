
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
}

interface Question {
  _id: string;
  title: string;
  body: string;
  author: User | null;
}

const CommunityQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestions', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch the questions');
        const data = await response.json();
        console.log(data); // Debug: Check the response structure
        setQuestions(data);
      } catch (error) {
        setError('Failed to load questions. Please try again later.');
        console.error('Error fetching the questions', error);
      }
    };
    fetchQuestions();
  }, []);

  const getUsername = (user: User | null) => {
    if (!user) return 'Unknown';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Unknown';
  };

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
      {error && (
        <div className="mb-6 text-red-500">
          {error}
        </div>
      )}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition overflow-hidden">
            <div className="flex items-center mb-2">
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
                  <Link href={`/userRender/chat/${question.author._id}`} className="ml-3 text-blue-500 hover:underline">
                    {getUsername(question.author)}
                  </Link>
                </>
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                  Unknown
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
            <p className="text-gray-700 mb-2">{question.body.slice(0, 100)}{question.body.length > 100 ? '...' : ''}</p>
            <Link href={`/userRender/viewCommunityQuestions/${question._id}/questionDetail`} className="text-blue-500 hover:underline text-sm">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default CommunityQuestions;
