'use client';
import { useState } from 'react';
import QuizCreation from './NonverbalQuizCreation';
import NonverbalQuestionForm from './nonverbalQuestionCreation';
import Link from 'next/link';

interface Option {
  label: string;
  image: string;
}

interface Question {
  _id?: string;
  text: string;
  options: Option[];
  answer: string;
  quizId?: string;
}

const NonverbalQuizForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizCreated, setQuizCreated] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizIdByTitle = async (title: string): Promise<string | null> => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/viewNonVerbalQuizzes',{credentials:'include'});
      if (response.ok) {
        const data = await response.json();
        const quiz = data.find((quiz: { title: string; _id: string }) => quiz.title === title);
        return quiz?._id || null;
      } else {
        console.error('Failed to fetch quizzes');
        return null;
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return null;
    }
  };

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleQuizCreation = async (title: string, description: string) => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizzes/createNonVerbalQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
        credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        setQuizId(data._id);
        setQuizCreated(true);
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('Error creating quiz');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      {!quizCreated ? (
        <QuizCreation onCreateQuiz={handleQuizCreation} />
      ) : (
        <NonverbalQuestionForm quizId={quizId!} onAddQuestion={handleAddQuestion} />
      )}
      <Link href="/nonverbalquiz">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          {quizCreated ? 'Complete Quiz' : 'Cancel'}
        </button>
      </Link>
    </div>
  );
};

export default NonverbalQuizForm;
