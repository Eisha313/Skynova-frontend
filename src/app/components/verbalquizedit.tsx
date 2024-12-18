'use client';
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
  params: { id: string };
}
const QuizEdit = ({ id }: { id: string }
) => {
  const router = useRouter();
  
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  

  useEffect(() => {
    
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/viewVerbalQuiz/${id}`,{credentials:'include'});
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
      const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizzes/updateVerbalQuiz/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
        credentials:'include'
      });
      if (response.ok) {
        router.push('/verbalquiz'); 
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
    <div className="container text-white mx-auto p-4 bg-[#212C44] rounded-lg shadow-md">
      
      <label className="block mt-7 font-medium">Title</label>
      <input
        type="text"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        // className="border p-2 mb-2 w-full"
        className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      <label className="block mt-7 font-medium">Description</label>
      <textarea
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        // className="border p-2 mb-4 w-full"
        className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, text: e.target.value })
            }
            
         className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

          />
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[optIndex] = e.target.value;
                    handleQuestionChange(index, { ...question, options: updatedOptions });
                  }}
                  // className="border p-2 flex-grow"
         className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

                />
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleQuestionChange(index, { ...question, answer: e.target.value })}
            // className="border p-2 mb-2 w-full"
         className="w-full px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

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

export default QuizEdit;
