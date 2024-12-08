'use client';
import { useState } from 'react';

interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string;
  quizId?: string;
}

interface QuestionFormProps {
  quizId: string;
  onAddQuestion: (question: Question) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ quizId, onAddQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: '',
    options: ['', '', '', ''],
    answer: '',
    quizId: quizId
  });

  const handleSaveQuestion = () => {
    if (currentQuestion.text && currentQuestion.answer && currentQuestion.options.every(option => option)) {
      onAddQuestion(currentQuestion);
      setCurrentQuestion({ text: '', options: ['', '', '', ''], answer: '', quizId: quizId });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white ">
    <div className="mb-4 p-4 bg-[#212C44] rounded-lg shadow-md">
      <h2 className='text-center text-white font-bold'>Quiz</h2>
      <label className="block mt-2 font-medium">Question Title
      <span className="text-red-500"> *</span>
      </label>
      <input
        type="text"
        placeholder="Question Text"
        value={currentQuestion.text}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
        
        className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      <label className="block mt-2 font-medium">Options
      <span className="text-red-500"> *</span>
      </label>
      {currentQuestion.options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...currentQuestion.options];
            newOptions[index] = e.target.value;
            setCurrentQuestion({ ...currentQuestion, options: newOptions });
          }}
          
        className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={currentQuestion.answer}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
        // className="border p-2 mb-2 w-full"
        className="w-full px-4 py-2 mt-8 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none"

      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-12"
        onClick={handleSaveQuestion}
      >
        Save Question
      </button>
    </div>
    </div>
  );
};

export default QuestionForm;
