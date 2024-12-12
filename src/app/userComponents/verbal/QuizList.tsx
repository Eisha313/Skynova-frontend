"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/components/context/userContext";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  attempted: boolean;
}

interface QuizListProps {
  onSelectQuiz?: (quiz: Quiz) => void;
  shouldRecheckList: boolean;
  goToNextStep: () => void;
}

interface QuizResult {
  quizId: {
    _id: string;
  };
  userId: {
    _id: string;
  };
}

const QuizList: React.FC<QuizListProps> = ({ onSelectQuiz, shouldRecheckList, goToNextStep }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, _id } = useUser();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchQuizzes = async () => {
      try {
        const quizResponse = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes",
          {
            credentials: "include",
            signal: abortController.signal,
          }
        );

        const quizzesData = await quizResponse.json();

        const resultResponse = await fetch(
          "https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!resultResponse.ok) {
          throw new Error("Failed to fetch quiz results.");
        }

        const resultsData: QuizResult[] = await resultResponse.json();
        console.log("Quizzes Data:", quizzesData);
        console.log("Results Data:", resultsData);

        const attemptedQuizIds = new Set(
          resultsData.filter((result) => result.userId?._id === _id).map((result) => result?.quizId?._id)
        );

        const quizzesWithAttemptedFlag = quizzesData.map((quiz: Quiz) => ({
          ...quiz,
          attempted: attemptedQuizIds.has(quiz._id),
        }));

        if (Array.from(attemptedQuizIds).filter((id) => Boolean(id)).length === quizzesData.length) {
          goToNextStep();
        } else {
          console.log("Not all quizzes attempted");
        }

        console.log("Quizzes with Attempted Flag:", quizzesWithAttemptedFlag);
        setQuizzes(quizzesWithAttemptedFlag);
        setLoading(false);
      } catch (error) {
        console.error(error);
        if (abortController.signal.aborted) {
          return;
        }
        setError("Failed to fetch quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();

    return () => {
      abortController.abort();
    };
  }, [token, shouldRecheckList, _id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-[#212C44]  p-8  rounded-lg">
      {quizzes.map((quiz, index) => (
        <div
          key={quiz._id}
          className="flex justify-between items-center p-4 mb-4 border border-[#A49898] rounded-lg text-[#A49898]"
        >
          <div className="flex items-center">
            <span className="text-lg font-bold mr-4">{index + 1}</span>
            <div>
              <h2 className="font-bold">{quiz.title}</h2>
              <p>{quiz.description}</p>
            </div>
          </div>
          {onSelectQuiz ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onSelectQuiz(quiz)}
            >
              {quiz.attempted ? "View Result" : "Attempt Quiz"}
            </button>
          ) : (
            <Link
              href={quiz.attempted ? `/userRender/verbal/${quiz._id}/result` : `/userRender/verbal/${quiz._id}/attempt`}
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                {quiz.attempted ? "View Result" : "Attempt Quiz"}
              </button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizList;
