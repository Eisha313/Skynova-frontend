import React from 'react';

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

interface NonverbalQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizDetails: QuizDetail | null;
}

const NonverbalQuizModal: React.FC<NonverbalQuizModalProps> = ({ isOpen, onClose, quizDetails }) => {
  if (!isOpen || !quizDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl w-full">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{quizDetails.title}</h2>
        <p className="mb-4">{quizDetails.description}</p>
        <ul className="space-y-4">
          {quizDetails.questions.map((question) => (
            <li key={question._id}>
              <h3 className="font-semibold">{question.text}</h3>
              <ul className="space-y-2 mt-2">
                {question.options.map((option, index) => (
                  <li key={index}>
                    <img src={option} alt={`Option ${index + 1}`} className="w-32 h-32 object-cover" />
                  </li>
                ))}
              </ul>
              <p className="mt-2"><strong>Correct Answer:</strong> <img src={question.answer} alt="Correct Answer" className="w-32 h-32 object-cover" /></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NonverbalQuizModal;
