'use client';
import { useState } from 'react';
import QuizCreation from './verbalQuizcreation';
import QuestionForm from './verbalQuestionform';
import Link from 'next/link';

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string;
  quizId?: string;
}

const VerbalQuizForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizCreated, setQuizCreated] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizIdByTitle = async (title: string): Promise<string | null> => {
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalquizzes/viewVerbalQuizzes',{credentials:'include'});
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

  const handleCreateQuiz = async (title: string, description: string) => {
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    setError(null); 

    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/createVerbalQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
        credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Quiz created:', data);
        const fetchedQuizId = await fetchQuizIdByTitle(title); 
        if (fetchedQuizId) {
          setQuizCreated(true);
          setQuizId(fetchedQuizId); 
        } else {
          setError('Failed to fetch quiz ID.');
        }
      } else {
        setError('Failed to create quiz');
        console.error('Failed to create quiz');
      }
    } catch (error) {
      setError('Error creating quiz');
      console.error('Error creating quiz:', error);
    }
  };

  const handleAddQuestion = async (question: Question) => {
    if (!quizId) {
      setError('Quiz ID is missing.');
      return;
    }

    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuestions/createVerbalQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...question, quizId }),
        credentials:'include'
      });

      if (response.ok) {
        const data: Question = await response.json();
        setQuestions([...questions, data]);
      } else {
        setError('Failed to add question');
        console.error('Failed to add question');
      }
    } catch (error) {
      setError('Error adding question');
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}

      {!quizCreated ? (
        <QuizCreation onCreateQuiz={handleCreateQuiz} />
      ) : (
        <div>
          {quizId && <QuestionForm quizId={quizId} onAddQuestion={handleAddQuestion} />}
        </div>
      )}
    </div>
  );
};

export default VerbalQuizForm;
