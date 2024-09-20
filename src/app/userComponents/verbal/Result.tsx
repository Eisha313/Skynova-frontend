
import React, { useEffect, useState } from 'react';

interface Question {
  text: string;
  options: string[];
  answer: string;
}

interface ResultDetail {
  _id: string;
  questions: Question[];
  answers: string[];
  score: number;
}

const DetailedResult: React.FC<{ id: string }> = ({ id }) => {
  const [result, setResult] = useState<ResultDetail | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching detailed result:', error);
      }
    };

    if (id) {
      fetchResult();
    }
  }, [id]);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-2xl mb-6">Detailed Results</h1>
      {result.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="mb-2">Question {index + 1}: {question.text}</p>
          {question.options.map((option, i) => {
            const isCorrect = option === question.answer;
            const userAnswer = result.answers[index];
            const isSelected = option === userAnswer;

            return (
              <div
                key={i}
                className={`p-4 mb-2 border rounded-lg ${isCorrect ? 'border-green-500' : isSelected ? 'border-red-500' : 'border-white'}`}
              >
                {option}
                {isSelected && !isCorrect && (
                  <p className="text-red-500 mt-2">Correct answer: {question.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DetailedResult;
