
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/components/context/userContext";

interface Option {
  label: string;
  image?: string;
}

interface Question {
  text: string;
  options: Option[];
  answer: string;
}

interface Result {
  id: string;
  quizId: {
    title: string;
    questions: Question[];
  };
  answers: (string | null)[];
  marks: number;
}

const NonVerbalQuizResult: React.FC<{ id: string }> = ({ id }) => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useUser(); // Getting token from context

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch result');
        }

        const data = await response.json();
        setResult(data.results[0]); // Extracting the first result from the array
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to load result. Please try again later.');
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white  mt-20 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Result: {result?.quizId.title}</h1>
      <div className="mb-4">
        <p className="text-2xl  text-center font-bold">Score: {result?.marks}/{result?.quizId.questions.length}</p>
      </div>
      <div className="space-y-4">
        {result?.quizId.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="font-bold mb-2">{index + 1}. {question.text}</div>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-2 rounded-lg border ${
                    option.label === result.answers[index]
                      ? option.label === question.answer ? 'border-green-500 bg-green-900' : 'border-red-500 bg-red-900'
                      : 'border-white'
                  }`}
                >
                  {option.image ? (
                    <img src={option.image} alt={option.label} className="w-24 h-24 object-cover" />
                  ) : (
                    <span>{option.label}</span>
                  )}
                </div>
              ))}
            </div>
            {result.answers[index] !== question.answer && result.answers[index] !== null && (
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
