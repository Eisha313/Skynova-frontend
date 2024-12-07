
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/components/context/userContext';

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
  const [timeLeft, setTimeLeft] = useState(Infinity); 
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { token } = useUser();
  const { firstName, lastName } = useUser();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuiz/${id}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setQuiz(data[0]);
        setTotalQuestions(data[0].questions.length);
      
        setTimeLeft(60 * data[0].questions.length);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

 
  
  
  const calculateResult = () => {
    let calculatedScore = 0;
  
    quiz?.questions.forEach((question, index) => {
      const userAnswer = answers[index]?.trim().toLowerCase();
      console.log("User's answer:", userAnswer);
  
    
      const correctAnswerLabel =
        typeof question.answer === "string"
          ? question.answer.trim().toLowerCase()
          : (question.answer[0] as string).trim().toLowerCase();
  
      console.log("Correct answer value (label):", correctAnswerLabel);
  
      
      const matchResult = correctAnswerLabel.match(/option\s([a-z])/i);
      const correctAnswerIndex =
        matchResult && matchResult[1] ? matchResult[1].charCodeAt(0) - 97 : null;
  
      const correctAnswer =
        correctAnswerIndex !== null &&
        correctAnswerIndex >= 0 &&
        correctAnswerIndex < question.options.length
          ? question.options[correctAnswerIndex]?.trim().toLowerCase()
          : null;
  
      console.log("Mapped correct answer (value):", correctAnswer);
      console.log("Question options:", question.options);
  
     
      const userOptionIndex = question.options.findIndex(
        (option) => option.trim().toLowerCase() === userAnswer
      );
  
      const correctOptionLabel =
        correctAnswerIndex !== null && correctAnswerIndex >= 0
          ? String.fromCharCode(65 + correctAnswerIndex) 
          : "N/A";
  
      const userOptionLabel =
        userOptionIndex >= 0
          ? String.fromCharCode(65 + userOptionIndex)
          : "N/A";
  
      console.log(`Correct option: Option ${correctOptionLabel}`);
      console.log(`User selected: Option ${userOptionLabel}`);
  
     
      if (!correctAnswer) {
        console.warn(
          `Correct answer label "${correctAnswerLabel}" could not be mapped to any provided option:`,
          question.options
        );
      }
  
      
      if (userAnswer === correctAnswer) {
        calculatedScore += 1;
      } else {
        console.log(
          `Incorrect! User's answer "${userAnswer}" does not match the correct answer "${correctAnswer}".`
        );
      }
    });
  
    return calculatedScore;
  };
  
  const handleSubmit = async () => {
    const resultScore = calculateResult();
    setScore(resultScore);

    await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/results/createResults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: 'verbalQuiz',
        description: 'Verbal Quiz Result',
        answers,
        marks: resultScore,
        quizId: quiz?._id,
      }),
      credentials: 'include',
    });

    const resultResponse = await fetch(
      `https://sky-nova-8ccaddc754ce.herokuapp.com/results/viewResults`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    const resultsData = await resultResponse.json();
    const completedQuizCount = resultsData.length;

    let certificateTitle = '';
    if (resultScore > totalQuestions / 2) {
      if (completedQuizCount === 1) {
        certificateTitle = 'Basic ';
      } else if (completedQuizCount === 2) {
        certificateTitle = 'Medium ';
      } else if (completedQuizCount === 3) {
        certificateTitle = 'Advanced ';
      }

      if (certificateTitle) {
        // await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/createCertificates`, {
        await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/createCertificates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: certificateTitle,
            description: `${firstName} ${lastName}`,
            date: new Date().toISOString(),
          }),
          credentials: 'include',
        });
      }
    }

    setQuizFinished(true);
    setShowCompletionScreen(true);
  };

  useEffect(() => {
    if (!quiz || quizFinished) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quiz, quizFinished]);

  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedOption(null);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (showCompletionScreen && score !== null) {
    const isPassed = score > totalQuestions / 2;
    return (
      <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white">
        <div className="text-6xl mb-4">{isPassed ? '🎉' : '😢'}</div>
        <div className="text-lg mb-4">
          Score: {score}/{totalQuestions}
        </div>
        <div>
          {isPassed
            ? 'Congratulations! You passed the quiz.'
            : 'Better luck next time!'}
        </div>
        <button
          className="bg-blue-500 px-4 py-2 mt-4 rounded-lg"
          onClick={() => router.push(`/userRender/quiz/${id}/result`)}
        >
          View Detailed Results
        </button>
        <button
          className="bg-blue-500 px-4 py-2 mt-4 rounded-lg"
          onClick={() => router.push(`/userRender/quiz`)}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 flex flex-col justify-center items-center text-white">
      <div className="text-lg mb-4">
        Question {currentQuestion + 1}/{quiz.questions.length}:{' '}
        {quiz.questions[currentQuestion]?.text}
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {quiz.questions[currentQuestion]?.options.map((option, index) => (
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

      <div className="text-lg mb-4">
        Total Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
      </div>

      <div className="flex justify-between w-full max-w-md">
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            Previous
          </button>
        )}
        <button
          onClick={
            currentQuestion === quiz.questions.length - 1
              ? () => setShowModal(true)
              : handleNextQuestion
          }
          className={`${
            currentQuestion === quiz.questions.length - 1
              ? 'bg-green-500'
              : 'bg-blue-500'
          } px-4 py-2 rounded-lg ml-auto`}
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-black font-bold mb-4">
              Are you sure you want to submit the quiz?
            </h2>
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
