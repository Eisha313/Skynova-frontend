
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
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-tranparent rounded-lg shadow-md">
      {/* Question Section */}
      <div className=" p-6 rounded-lg shadow-lg mb-6 border border-white/30">
        <h1 className="text-3xl font-bold text-white">{question.title}</h1>
        <p className="text-white mt-4">{question.body}</p>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Answers</h2>
        {question.answers && question.answers.length > 0 ? (
          question.answers.map((ans) => (
            <div
              key={ans._id}
              className="bg-[#4848483D] p-4 rounded-lg shadow-md border border-white/20 text-white"
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
              <p className="text-white mb-2">{ans.content}</p>
              <p className="text-white/30 text-sm">
                {new Date(ans.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white-500">No answers yet. Be the first to answer!</p>
        )}
      </div>

      {/* Answer Form */}
      <form
        onSubmit={handleAnswerSubmit}
        className="bg-bg-[#4848483D] text-white p-6 rounded-lg shadow-lg mt-8 border border-white/30"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Your Answer</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Write your answer here..."
          className="w-full p-4 text-white bg-[#4848483D] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
