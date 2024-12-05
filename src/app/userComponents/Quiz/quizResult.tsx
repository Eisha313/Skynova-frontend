

import React, { useEffect, useState } from 'react';
import { useUser } from "@/app/components/context/userContext";

interface Question {
  text: string;
  options: string[];
  answer: string;
}

interface ResultDetail {
  _id: string;
  quizId: {
    questions: Question[];
  };
  answers: string[];
  marks: number;
}



const DetailedResult: React.FC<{ id: string }> = ({ id }) => {
  const [results, setResults] = useState<ResultDetail[]>([]);
  const { token } = useUser();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:4000/results/viewResult/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching detailed results:', error);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (results.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-[#212C44] p-8 text-white">
      <h1 className="text-2xl mb-6">Detailed Results</h1>
      <div className=" overflow-y-auto">
        {results.map((result, resultIndex) => (
          <div key={resultIndex} className="mb-8">
            <h2 className="text-xl mb-4">Score: {result.marks} / {result.quizId.questions.length}</h2>
            {result.quizId.questions.map((question, index) => {
              const userAnswer = result.answers[index]?.trim().toLowerCase();

              

              console.log("question",question)
              const correctAnswer = question.answer[0]?.trim().toLowerCase(); 

              if (!correctAnswer) {
                console.warn(`Missing or invalid correct answer for question ${index + 1}`);
                return null;
              }

              const isCorrect = userAnswer === correctAnswer;

              return (
                <div key={index} className="mb-6">
                  <p className="mb-2">Question {index + 1}: {question.text}</p>
                  {question.options.map((option, i) => {
                    const isSelected = option.trim().toLowerCase() === userAnswer;
                    const optionLabel = String.fromCharCode(65 + i);
                    const optionClass = `p-4 mb-2 border rounded-lg ${
                      isCorrect && isSelected ? 'border-[#1F60B2] bg-[#1F60B2]' : 
                      isSelected ? 'border-red-500' : 
                      isCorrect ? 'border-[#081839] bg-[#1F60B2]' : 'border-white'
                    }`;

                    return (
                      <div key={i} className={optionClass}>
                        {optionLabel}: {option}
                      </div>
                    );
                  })}
                  {!isCorrect && (
                    <p className="text-red-500 mt-2">Correct answer: {correctAnswer}</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
export default DetailedResult;