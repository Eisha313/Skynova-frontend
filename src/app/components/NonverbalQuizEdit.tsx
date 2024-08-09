'use client';
import Image from 'next/image'; // Import Image component
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string;
  quizId?: string;
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface EditQuizProps {
  params: { title: string };
}

const NonverbalQuizEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/viewNonverbalQuiz/${id}`);
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

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleSaveQuiz = async () => {
    try {
      const response = await fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/nonverbalQuizzes/updateNonverbalQuiz/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        router.push('/nonverbalquiz'); 
      } else {
        console.error('Failed to save quiz');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    if (quiz) {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[index] = updatedQuestion;
      setQuiz({ ...quiz, questions: updatedQuestions });
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        className="border p-2 mb-4 w-full"
      />
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, text: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex} className="flex items-center mb-2">
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optIndex] = reader.result as string;
                        handleQuestionChange(index, { ...question, options: updatedOptions });
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="border p-2 flex-grow"
                />
                {option && (
                  <Image
                    src={option}
                    alt={`Option ${optIndex + 1}`}
                    width={128} // Adjust the width as needed
                    height={128} // Adjust the height as needed
                    className="mt-2 object-cover"
                  />
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleQuestionChange(index, { ...question, answer: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
        </div>
      ))}
      <button
        onClick={handleSaveQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default NonverbalQuizEdit;
