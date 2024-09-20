'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  text: string;
  options: string[];
  answer: string;
}

interface Result {
  quiz: {
    title: string;
    questions: Question[];
  };
  answers: string[];
  score: number;
}

const NonVerbalQuizResult: React.FC<{ id: string }> = ({ id }) => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        setResult(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Result: {result?.quiz.title}</h1>
      <div className="mb-4">
        <p className="text-lg">Score: {result?.score}/{result?.quiz.questions.length}</p>
      </div>
      <div className="space-y-4">
        {result?.quiz.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="font-bold mb-2">{index + 1}. {question.text}</div>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-2 rounded-lg border ${
                    option === result.answers[index]
                      ? option === question.answer ? 'border-green-500 bg-green-900' : 'border-red-500 bg-red-900'
                      : 'border-white'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            {result.answers[index] !== question.answer && (
              <div className="mt-2 text-green-400">Correct Answer: {question.answer}</div>
            )}
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 px-4 py-2 mt-6 rounded-lg"
        onClick={() => router.push('/userRender/nonverbal')}
      >
        Go back
      </button>
    </div>
  );
};

export default NonVerbalQuizResult;
