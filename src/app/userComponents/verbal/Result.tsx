"use client";

import React, { useEffect, useState } from "react";
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
  console.log("We are in the detailed result page for verbal quiz");

  const [results, setResults] = useState<ResultDetail[]>([]);
  const { token } = useUser();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResult/${id}`,
          // `http://localhost:4000/verbalQuizResult/viewVerbalQuizResult/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching detailed results:", error);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (!results || results.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-[#212C44] p-8 text-white  ">
      <h1 className="text-2xl mb-6">Detailed Results</h1>
      <div className=" overflow-y-auto">
        {results.map((result, resultIndex) => (
          <div key={resultIndex} className="mb-8">
            <h2 className="text-xl mb-4">
              Score: {result.marks} / {result.quizId?.questions?.length || 1}
            </h2>
            {result.quizId?.questions?.map((question, index) => (
              <div key={index} className="mb-6">
                <p className="mb-2">
                  Question {index + 1}: {question.text}
                </p>
                {question.options.map((option, i) => {
                  const isCorrect = option === question.answer;
                  const userAnswer = result.answers[index];
                  const isSelected = option === userAnswer;

                  return (
                    <div
                      key={i}
                      className={`p-4 mb-2 border rounded-lg ${
                        isCorrect ? "border-[#081839] bg-[#1F60B2]" : isSelected ? "border-red-500" : "border-white"
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
                {result.answers[index] !== question.answer && (
                  <p className="text-red-500 mt-2">Correct answer: {question.answer}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedResult;
