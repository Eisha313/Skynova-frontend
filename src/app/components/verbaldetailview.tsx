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

const QuizView: React.FC = () => {
  const router = useRouter();
  const { title } = router.query;
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://192.168.18.26:3000/verbalQuizzes/viewVerbalQuiz/${title}`);
        if (response.ok) {
          const data = await response.json();
          setQuiz(data);
        } else {
          console.error('Failed to fetch quiz details');
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    if (title) {
      fetchQuiz();
    }
  }, [title]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-4"><strong>Description:</strong> {quiz.description}</p>
      <div>
        <strong>Questions:</strong>
        <ul>
          {quiz.questions.map((question) => (
            <li key={question._id} className="ml-4 mb-2">
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
    </div>
  );
};

export default QuizView;
