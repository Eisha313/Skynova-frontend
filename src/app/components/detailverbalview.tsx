'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Question {
  _id: string;
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

const QuizDetailPage: React.FC = () => {
  const router = useRouter();
  const { title } = router.query;
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (title) {
        try {
          const response = await fetch(`http://192.168.18.26:3000/quizzes/viewQuiz/${title}`);
          if (response.ok) {
            const data: QuizDetail = await response.json();
            setQuiz(data);
          } else {
            console.error('Failed to fetch quiz details');
          }
        } catch (error) {
          console.error('Error fetching quiz details:', error);
        }
      }
    };

    fetchQuizDetails();
  }, [title]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p className="mt-2"><strong>Description:</strong> {quiz.description}</p>
      <div className="mt-2">
        <strong>Questions:</strong>
        <ul>
          {quiz.questions.map((question) => (
            <li key={question._id} className="ml-4">
              <p><strong>Question:</strong> {question.text}</p>
              <ul className="list-disc ml-8">
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {question.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default QuizDetailPage;