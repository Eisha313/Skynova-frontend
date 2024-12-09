

import React from 'react';
import Image from 'next/image';
import { QuizDetail, Option, Question } from "@/types/types";

interface NonverbalQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizDetail | null;
}

const NonverbalQuizModal: React.FC<NonverbalQuizModalProps> = ({ isOpen, onClose, quiz }) => {

  const getValidImageSrc = (src: unknown): string => {
    if (typeof src !== "string" || src.trim() === "") {
      return "/placeholder-image.png"; 
    }
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    if (src.startsWith("/")) {
      return src;
    }
    return "/placeholder-image.png"; 
  };

  // Debugging: Check if quiz data is available
  console.log("Quiz Data: ", quiz);

  if (!isOpen || !quiz || !quiz.questions || quiz.questions.length === 0) {
    return <p>Loading or No Questions Available</p>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-custom-image text-white rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto max-h-[90vh]">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-white">Quiz Title:</label>
            <h2 className="text-2xl font-bold">{quiz.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 p-2 rounded focus:outline-none"
          >
            ✖
          </button>
        </div>
  
        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-white">Quiz Description:</label>
            <p className="text-white">{quiz.description}</p>
          </div>
  
          {/* Questions */}
          <ul className="space-y-6">
            {quiz.questions?.map((question) => (
              <li key={question._id} className="border-b pb-6">
                {/* Question Text */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-semibold text-white">Question:</label>
                  <h3 className="font-semibold text-lg">{question.text}</h3>
                </div>
  
                {/* Question Image */}
                {question.image && (
                  <div className="mt-4 w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src={getValidImageSrc(question.image)}
                      alt="Question Image"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
  
                {/* Options */}
                <ul className="flex flex-wrap gap-4 mt-6">
                  {Array.isArray(question.options) && question.options.length > 0 ? (
                    question.options.map((option) => (
                      <li
                        key={option._id}
                        className="flex flex-col items-center text-center"
                      >
                        <Image
                          src={getValidImageSrc(option.image)}
                          alt={`Option ${option.label.toUpperCase()}`}
                          width={100}
                          height={100}
                          className="object-cover border border-gray-300 rounded-lg"
                        />
                        <span className="text-sm mt-2 font-medium">
                          Option {option.label.toUpperCase()}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-white">No options available</p>
                  )}
                </ul>
  
                {/* Correct Answer */}
                <div className="mt-6 flex items-center space-x-4">
                  <label className="text-sm font-semibold text-white">Correct Answer:</label>
                  {(() => {
                    const correctOption = Array.isArray(question.options)
                      ? question.options.find((opt) => opt.label === question.answer)
                      : undefined;
  
                    if (correctOption) {
                      return (
                        <div className="flex flex-col items-center">
                          <Image
                            src={getValidImageSrc(correctOption.image)}
                            alt={`Correct Answer: Option ${correctOption.label.toUpperCase()}`}
                            width={100}
                            height={100}
                            className="object-cover border border-gray-300 rounded-lg"
                          />
                          <span className="text-sm text-white mt-2 font-medium">
                            Option {correctOption.label.toUpperCase()}
                          </span>
                        </div>
                      );
                    } else {
                      return <p className="text-red-500">Correct answer not found.</p>;
                    }
                  })()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default NonverbalQuizModal;
