// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface Question {
//   text: string;
//   options: string[];
//   answer: string;
//   quizId: string;
// }

// interface QuestionFormProps {
//   onAddQuestion: (question: Question) => void;
//   quizId: string;
// }

// const NonverbalQuestionForm: React.FC<QuestionFormProps> = ({ onAddQuestion, quizId }) => {
//   const [text, setText] = useState('');
//   const [options, setOptions] = useState<string[]>(['', '', '', '']);
//   const [answer, setAnswer] = useState('');
//   const [questionCount, setQuestionCount] = useState(0); // Count of questions added
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const router = useRouter();

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const question: Question = {
//       text,
//       options,
//       answer,
//       quizId,
//     };

//     try {
//       const response = await fetch('http://192.168.18.26:3000/nonverbalQuizzes/createNonverbalQuestion', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(question),
//       });

//       if (response.ok) {
//         onAddQuestion(question);
//         setText('');
//         setOptions(['', '', '', '']);
//         setAnswer('');
//         setQuestionCount(questionCount + 1); // Increment the question count
//         setShowModal(true); // Show the modal
//       } else {
//         console.error('Failed to create question');
//       }
//     } catch (error) {
//       console.error('Error creating question:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Add a New Question</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
//             Question
//           </label>
//           <input
//             type="text"
//             id="text"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2">
//             Options (Upload Images for each option)
//           </label>
//           {options.map((option, index) => (
//             <div key={index} className="mb-2">
//               <input
//                 type="file"
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files[0]) {
//                     const reader = new FileReader();
//                     reader.onload = () => {
//                       handleOptionChange(index, reader.result as string);
//                     };
//                     reader.readAsDataURL(e.target.files[0]);
//                   }
//                 }}
//               />
//               {option && (
//                 <img src={option} alt={`Option ${index + 1}`} className="mt-2 w-32 h-32 object-cover" />
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="answer">
//             Correct Answer (Image URL)
//           </label>
//           <input
//             type="text"
//             id="answer"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Save Question
//         </button>
//       </form>

//       {/* Modal for next steps */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <p className="text-lg">Question {questionCount} saved successfully!</p>
//             <div className="flex space-x-4 mt-4">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={() => setShowModal(false)}
//               >
//                 Add More Questions
//               </button>
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 onClick={() => router.push('/nonverbalquiz')}
//               >
//                 Complete Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NonverbalQuestionForm;
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Option {
  label: string;
  image: string;
}

interface Question {
  text: string;
  image?: string;
  options: Option[];
  answer: string;
  quizId: string;
}

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void;
  quizId: string;
}

const NonverbalQuestionForm: React.FC<QuestionFormProps> = ({ onAddQuestion, quizId }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([
    { label: 'a', image: '' },
    { label: 'b', image: '' },
    { label: 'c', image: '' },
    { label: 'd', image: '' },
  ]);
  const [answer, setAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].image = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question: Question = {
      text,
      image: image || '',
      options,
      answer,
      quizId,
    };

    try {
      const response = await fetch('http://localhost:4000/nonVerbalQuizzes/createNonVerbalQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        onAddQuestion(question);
        setText('');
        setImage(null);
        setOptions([
          { label: 'a', image: '' },
          { label: 'b', image: '' },
          { label: 'c', image: '' },
          { label: 'd', image: '' },
        ]);
        setAnswer('');
        setQuestionCount(questionCount + 1);
        setShowModal(true);
      } else {
        console.error('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
            Question
          </label>
          <input
            type="text"
            id="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Question Image (Optional)
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
          {image && (
            <Image
              src={image}
              alt="Question"
              width={128} // Adjust the width as needed
              height={128} // Adjust the height as needed
              className="mt-2 object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Options (Upload Images for each option)
          </label>
          {options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="block text-gray-700 font-bold mb-1">
                {`${option.label})`}
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      handleOptionChange(index, reader.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              {option.image && (
                <Image
                  src={option.image}
                  alt={`Option ${option.label}`}
                  width={128} // Adjust the width as needed
                  height={128} // Adjust the height as needed
                  className="mt-2 object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="answer">
            Correct Answer (a, b, c, or d)
          </label>
          <input
            type="text"
            id="answer"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Save Question
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg">Question {questionCount} saved successfully!</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Add Next Question
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={() => {
                  setShowModal(false);
                  router.push('/nonverbalquiz');
                }}
              >
                Complete Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonverbalQuestionForm;


