
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useUser } from "@/app/components/context/userContext";

interface Option {
  label: string;
  image: string;
}

interface Question {
  text: string;
  options: Option[];
  answer: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

const NonVerbalQuizAttempt: React.FC<{ id: string }> = ({ id }) => {
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const { _id ,token} = useUser(); 

  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonVerbalQuiz/${id}`,
          { credentials: "include" }
        );
        const data = await response.json();
        console.log(data);
        setQuiz(data);
        const quizTime = data.questions.length * 60;
        setTimeLeft(quizTime);
        setTotalQuestions(data.questions.length);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const calculateResult = () => {
    let calculatedScore = 0;
    quiz?.questions.forEach((question, index) => {
      if (answers[index]?.trim() === question.answer.trim()) {
        calculatedScore += 1;
      }
    });
    return calculatedScore;
  };

  const handleSubmit = async () => {
    try {
      const resultScore = calculateResult();
      setScore(resultScore);
  
      const response = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/createNonVerbalQuizResult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: "Non-Verbal Quiz Result",
            answers, 
            marks: resultScore, 
            quizId: quiz?._id, 
            userId: _id, 
            
          }),
          credentials: "include",
        }
      );
  
      if (response.ok) {
        setQuizFinished(true);
        setShowCompletionScreen(true);
      } else {
        console.error("Failed to submit results:", response.statusText);
        alert("Failed to submit the quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz results:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };
  
  useEffect(() => {
    if (!quiz || quizFinished) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, quizFinished]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (showCompletionScreen && score !== null) {
    const isPassed = score > totalQuestions / 2;
    return (
      <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white">
        <div className="text-6xl mb-4">{isPassed ? "🎉" : "😢"}</div>
        <div className="text-lg mb-4">
          Score: {score}/{totalQuestions}
        </div>
        <div>{isPassed ? "Congratulations! You passed the quiz." : "Better luck next time!"}</div>
        <button className="bg-blue-500 px-4 py-2 mt-4 rounded-lg" onClick={() => router.push(`/userRender/nonverbal/${id}/result`)}>
          View Detailed Results
        </button>
        <button className="bg-blue-500 px-4 py-2 mt-4 rounded-lg" onClick={() => router.push(`/userRender/nonverbal`)}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white mt-20">
      

<div className="flex flex-col space-y-4 mb-4">
  {quiz.questions[currentQuestion].options.map((option, index) => (
    <label
      key={index}
      className={`p-4 border border-white rounded-lg cursor-pointer transition-all duration-300 ${
        selectedOption === option.label ? 'bg-blue-500' : ''
      } hover:bg-blue-400 flex flex-col items-center`}
      onClick={() => {
        setSelectedOption(option.label);
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentQuestion] = option.label;
          return updatedAnswers;
        });
      }}
    >
    
      <Image
        src={option.image}
        alt={`Option ${option.label}`}
        width={128} 
        height={128}
        className="object-cover mb-2" 
      />

      <span className="text-white">{option.label}</span>
    </label>
  ))}
</div>


      <div className="text-lg mb-4">Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</div>

      <div className="flex justify-between w-full max-w-md">
        {currentQuestion > 0 && (
          <button onClick={() => setCurrentQuestion(currentQuestion - 1)} className="bg-blue-500 px-4 py-2 rounded-lg">
            Previous
          </button>
        )}
        {currentQuestion === quiz.questions.length - 1 ? (
          <button onClick={() => setShowModal(true)} className="bg-green-500 px-4 py-2 rounded-lg ml-auto">
            Submit
          </button>
        ) : (
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="bg-blue-500 px-4 py-2 rounded-lg ml-auto">
            Next
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to submit the quiz?</h2>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={() => { setShowModal(false); handleSubmit(); }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonVerbalQuizAttempt;
