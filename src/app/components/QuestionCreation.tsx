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
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Question Text"
        value={currentQuestion.text}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
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
          className="border p-2 mb-2 w-full"
        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={currentQuestion.answer}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSaveQuestion}
      >
        Save Question
      </button>
    </div>
  );
};

export default QuestionForm;
