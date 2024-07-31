'use client';
import React from 'react';

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

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizDetails: QuizDetail | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quizDetails }) => {
  if (!isOpen || !quizDetails) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{quizDetails.title}</h2>
        <p className="text-gray-700 mb-4">{quizDetails.description}</p>
        {quizDetails.questions.length === 0 ? (
          <p>No questions available for this quiz.</p>
        ) : (
          <ul className="space-y-4">
            {quizDetails.questions.map((question, index) => (
              <li key={index} className="border p-4 rounded-md shadow-sm">
                <p className="font-semibold mb-2">{question.text}</p>
                <ul className="list-disc list-inside mb-2">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex} className="text-gray-600">{option}</li>
                  ))}
                </ul>
                <p className="font-medium text-blue-600">Correct Answer: {question.answer}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
