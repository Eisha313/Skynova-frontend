
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  text: string;
  options: string[];
  answer: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

const QuizAttempt: React.FC<{ id: string }> = ({ id }) => {
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showModal, setShowModal] = useState(false); // Added state for modal
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/viewVerbalQuiz/${id}`, {
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data)
        setQuiz(data);
        const quizTime = data.questions.length * 60; 
        setTimeLeft(quizTime);
        setTotalQuestions(data.questions.length);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const calculateResult = async () => {
    let calculatedScore = 0;
    quiz?.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        calculatedScore += 1;
      }
    });
    return calculatedScore;
  };
  

  const handleSubmit = async () => {
    const resultScore = await calculateResult();
    setScore(resultScore);

    await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/createResults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'verbalQuiz', description: 'Verbal Quiz Result',answers, marks: resultScore }),
      credentials: 'include',
    });

    setQuizFinished(true);
    setShowCompletionScreen(true);
  };

  useEffect(() => {
    if (!quiz || quizFinished) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timerId);
      handleSubmit();
    }

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, quizFinished]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (showCompletionScreen && score !== null) {
    const isPassed = score > totalQuestions / 2;
    return (
      <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white">
        <div className="text-6xl mb-4">{isPassed ? '🎉' : '😢'}</div>
        <div className="text-lg mb-4">Score: {score}/{totalQuestions}</div>
        <div>{isPassed ? 'Congratulations! You passed the quiz.' : 'Better luck next time!'}</div>
        <button
          className="bg-blue-500 px-4 py-2 mt-4 rounded-lg"
          onClick={() => router.push(`/userRender/verbal/${id}/result`)}
        >
          View Detailed Results
        </button>
        <button
          className="bg-blue-500 px-4 py-2 mt-4 rounded-lg"
          onClick={() => router.push(`/userRender/verbal`)}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white">
      <div className="text-lg mb-4">
        Question {currentQuestion + 1}/{quiz.questions.length}: {quiz.questions[currentQuestion].text}
      </div>

      {/* <div className="flex flex-col space-y-4 mb-4">
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <label
            key={index}
            className={`p-4 border border-white rounded-lg cursor-pointer transition-all duration-300 ${
              selectedOption === option ? 'bg-blue-500' : ''
            } hover:bg-blue-400`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </label>
        ))}
      </div> */}
      <div className="flex flex-col space-y-4 mb-4">
  {quiz.questions[currentQuestion].options.map((option, index) => (
    <label
      key={index}
      className={`p-4 border border-white rounded-lg cursor-pointer transition-all duration-300 ${
        selectedOption === option ? 'bg-blue-500' : ''
      } hover:bg-blue-400`}
      onClick={() => {
        setSelectedOption(option); 
        
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentQuestion] = option; 
          return updatedAnswers;
        });
      }}
    >
      {option}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-black font-bold mb-4">Are you sure you want to submit the quiz?</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleSubmit();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;
