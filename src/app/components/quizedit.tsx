
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string[]; 
}

interface QuizDetail {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  attempted: boolean;
}

const QuizEditSimple = ({ id }: { id: string }) => {
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizDetail>({
    _id: '',
    title: '',
    description: '',
    questions: [],
    attempted: false,
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/viewQuiz/${id}`,
          { credentials: 'include' }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setQuiz(data[0]); 
          }
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
    
      for (const question of quiz.questions) {
        if (question._id) {
          
          const questionResponse = await fetch(
            `https://sky-nova-8ccaddc754ce.herokuapp.com/questions/updateQuestion/${question._id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(question),
              credentials: 'include',
            }
          );
  
          if (!questionResponse.ok) {
            console.error(`Failed to update question with ID: ${question._id}`);
          }
        } else {
          console.error('Question ID is missing, unable to update.');
        }
      }
  
      // Then, update the quiz details
      const quizResponse = await fetch(
        `https://sky-nova-8ccaddc754ce.herokuapp.com/quizzes/updateQuiz/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: quiz.title,
            description: quiz.description,
            attempted: quiz.attempted,
          }),
          credentials: 'include',
        }
      );
  
      if (quizResponse.ok) {
        router.push('/quizPage');
      } else {
        console.error('Failed to update quiz details');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };
  

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  if (!quiz._id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Quiz</h1>

      <div className="mb-4">
        <label className="block font-medium mb-2">Quiz Title</label>
        <input
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="border p-2 mb-2 w-full rounded"
          placeholder="Enter Quiz Title"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Quiz Description</label>
        <textarea
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          className="border p-2 mb-4 w-full rounded"
          placeholder="Enter Quiz Description"
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Questions</h2>

      {quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => (
          <div key={question._id || index} className="mb-8 p-4 border rounded">
            <label className="block font-medium mb-2">Question {index + 1}</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) =>
                handleQuestionChange(index, { ...question, text: e.target.value })
              }
              className="border p-2 mb-4 w-full rounded"
              placeholder="Enter Question Text"
            />

            <label className="block font-medium mb-2">Options</label>
            {['A', 'B', 'C', 'D'].map((label, optIndex) => (
              <div key={optIndex} className="mb-2 flex items-center">
                <span className="w-6">{label}:</span>
                <input
                  type="text"
                  value={question.options[optIndex] || ''}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[optIndex] = e.target.value;
                    handleQuestionChange(index, { ...question, options: updatedOptions });
                  }}
                  className="border p-2 flex-grow rounded"
                  placeholder={`Enter Option ${label}`}
                />
              </div>
            ))}

            <div className="mt-4">
              <label className="block font-medium mb-2">Correct Answer</label>
              <select
                value={question.answer[0] || ''}
                onChange={(e) =>
                  handleQuestionChange(index, { ...question, answer: [e.target.value] })
                }
                className="border p-2 w-full rounded"
              >
                <option value="" disabled>
                  Select Correct Answer
                </option>
                {['Option A', 'Option B', 'Option C', 'Option D'].map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      ) : (
        <p>No questions available</p>
      )}

      <button
        onClick={handleSaveQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizEditSimple;
