
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

  const { token, firstName, lastName, _id: userId, profileImage } = useUser(); 
  
console.log({ token, firstName, lastName, userId, profileImage });


  const fetchQuestion = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/viewCommunityQuestion/${id}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const questionData = data[0];
        setQuestion({
          ...questionData,
          answers: questionData.answers || []
        });
        console.log("this is data",data)
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
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          content: answer,
          questionId: id,
          author: {
            _id: userId,
            firstName,
            lastName,
            profileImage  
          }
        }),
        
        credentials: 'include'
      });
     

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

  if (!question) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
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


