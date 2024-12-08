// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from "@/app/components/context/userContext";

// interface Option {
//   label: string;
//   image?: string;
// }

// interface Question {
//   text: string;
//   questionImage?: string;
//   options: Option[];
//   answer: string;
// }

// interface Result {
//   id: string;
//   quizId: {
//     title: string;
//     questions: Question[];
//   };
//   answers: (string | null)[];
//   marks: number;
// }

// const NonVerbalQuizResult: React.FC<{ id: string, goBackToList: () => void }> = ({ id, goBackToList }) => {
//   const [result, setResult] = useState<Result | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const router = useRouter();
//   const { token } = useUser();

//   useEffect(() => {
//     const fetchResult = async () => {
//       try {
//         const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch result');
//         }

//         const data = await response.json();
//         setResult(data.results[0]);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching result:', err);
//         setError('Failed to load result. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchResult();
//   }, [id, token]);

//   const handleImageClick = (image: string) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setSelectedImage(null);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="bg-[#212C44] p-8 text-white mt-20">
//       <h1 className="text-3xl font-bold mb-6 text-center">Result: {result?.quizId.title}</h1>
//       <div className="mb-4">
//         <p className="text-2xl text-center font-bold">Score: {result?.marks}/{result?.quizId.questions.length}</p>
//       </div>
//       <div className="space-y-4">
//         {result?.quizId.questions.map((question, index) => (
//           <div key={index} className=" p-4 rounded-lg">
//             <div className="font-bold mb-2 flex items-center">
//               {index + 1}. {question.text}
//               {question.questionImage && (
//   <img
//     src={question.questionImage}
//     alt="Question"
//     className="ml-4 w-16 h-16 object-cover cursor-pointer"
//     onClick={() => question.questionImage && handleImageClick(question.questionImage)} // Only call if questionImage is defined
//   />
// )}

//             </div>
//             <div className="space-y-2">
//               {question.options.map((option, optIndex) => (
//                 <div
//                   key={optIndex}
//                   className={`p-2 rounded-lg border ${
//                     option.label === result.answers[index]
//                       ? option.label === question.answer ? 'border-green-500 bg-green-900' : 'border-red-500 bg-red-900'
//                       : 'border-white'
//                   } flex items-center`}
//                 >
//                  <span className="mr-2 font-bold">{String.fromCharCode(65 + optIndex)}.</span>
// {option.image ? (
//   <img
//     src={option.image}
//     alt={`Option ${String.fromCharCode(65 + optIndex)}`}
//     className="w-24 h-24 object-cover cursor-pointer"
//     onClick={() => option.image && handleImageClick(option.image)} // Only call if option.image is defined
//   />
// ) : (
//   <span>{option.label}</span>
// )}

//                 </div>
//               ))}
//             </div>
//             {result.answers[index] !== question.answer && result.answers[index] !== null && (
//               <div className="mt-2 text-green-400">Correct Answer: {question.answer}</div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button
//         className="bg-blue-500 px-4 py-2 mt-6 rounded-lg"
//         onClick={goBackToList}
//       >
//         Go back
//       </button>

//       {/* Modal for image pop-up */}
//       {isOpen && selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg">
//             <img src={selectedImage} alt="Option" className="w-full h-auto max-w-sm mx-auto" />
//             <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={closeModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NonVerbalQuizResult;
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/components/context/userContext";

interface Option {
  label: string;
  image?: string;
}

interface Question {
  text: string;
  questionImage?: string;
  options: Option[];
  answer: string;
}

interface Result {
  id: string;
  quizId: {
    title: string;
    questions: Question[];
  };
  answers: (string | null)[];
  marks: number;
}

const NonVerbalQuizResult: React.FC<{ id: string; goBackToList: () => void }> = ({ id, goBackToList }) => {
  console.log("We are in the NonVerbalQuizResult component");

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useUser();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // const response = await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, {
        const response = await fetch(`http://localhost:4000/nonVerbalQuizResult/viewNonVerbalQuizResult/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        setResult(data.results[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching result:", err);
        setError("Failed to load result. Please try again later.");
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, token]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-[#212C44] p-8 text-white mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Result: {result?.quizId.title}</h1>
      <div className="mb-4">
        <p className="text-2xl text-center font-bold">
          Score: {result?.marks}/{result?.quizId.questions.length}
        </p>
      </div>
      <div className="space-y-6">
        {result?.quizId.questions.map((question, index) => (
          <div key={index} className="border p-6 rounded-lg space-y-4">
            <div className="font-bold mb-2 flex items-center">
              {index + 1}. {question.text}
              {question.questionImage && (
                <img
                  src={question.questionImage}
                  alt="Question"
                  className="ml-4 w-20 h-20 object-cover cursor-pointer"
                  onClick={() => question.questionImage && handleImageClick(question.questionImage)}
                />
              )}
            </div>
            <div className="space-y-4">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-4 rounded-lg border flex items-center space-x-4 ${
                    option.label === result.answers[index]
                      ? option.label === question.answer
                        ? "border-green-500 bg-green-900"
                        : "border-red-500 bg-red-900"
                      : "border-gray-500"
                  }`}
                >
                  <span className="font-bold">{String.fromCharCode(65 + optIndex)}.</span>
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={`Option ${String.fromCharCode(65 + optIndex)}`}
                      className="w-28 h-28 object-cover cursor-pointer"
                      onClick={() => option.image && handleImageClick(option.image)}
                    />
                  ) : (
                    <span>{option.label}</span>
                  )}
                </div>
              ))}
            </div>
            {result.answers[index] !== question.answer && result.answers[index] !== null && (
              <div className="mt-2 text-green-400">Correct Answer: {question.answer}</div>
            )}
          </div>
        ))}
      </div>
      <button className="bg-blue-500 px-6 py-3 mt-8 rounded-lg" onClick={goBackToList}>
        Go back
      </button>

      {/* Modal for image pop-up */}
      {isOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full mx-auto">
            <img src={selectedImage} alt="Option" className="w-full h-auto max-h-[500px] mx-auto object-contain" />
            <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonVerbalQuizResult;
