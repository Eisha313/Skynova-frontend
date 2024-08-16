// components/QuizModal.tsx
import React from 'react';
import { Aviator } from './addaviator'; 

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizDetails: Aviator | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quizDetails }) => {
  if (!isOpen || !quizDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-2xl font-bold mb-4">{quizDetails.firstName} {quizDetails.lastName}</h2>
        <p className="mb-2"><strong>Email:</strong> {quizDetails.email}</p>
        <p className="mb-2"><strong>Role:</strong> {quizDetails.role}</p>
        {/* Add more details as needed */}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
