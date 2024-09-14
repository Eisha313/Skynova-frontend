// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface SuggestionDetailProps {
//   id: string;
// }

// const SuggestionDetail: React.FC<SuggestionDetailProps> = ({ id }) => {
//   const [suggestion, setSuggestion] = useState<any>(null);

//   useEffect(() => {
//     const fetchSuggestion = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/suggestions/viewSuggestion/${id}`);
//         setSuggestion(response.data[0]);
//       } catch (error) {
//         console.error('Error fetching suggestion:', error);
//       }
//     };
//     fetchSuggestion();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/suggestions/deleteSuggestion/${id}`);
//       window.location.href = '/suggestions'; // Redirect after deletion
//     } catch (error) {
//       console.error('Error deleting suggestion:', error);
//     }
//   };

//   if (!suggestion) return <div>Loading...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">{suggestion.title}</h1>
//       <p className="mb-4">{suggestion.description}</p>
//       <button
//         onClick={handleDelete}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default SuggestionDetail;
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SuggestionDetailProps {
  id: string;
}

const SuggestionDetail: React.FC<SuggestionDetailProps> = ({ id }) => {
  const [suggestion, setSuggestion] = useState<any>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion/${id}`,{withCredentials:true});
        setSuggestion(response.data[0]);
      } catch (error) {
        console.error('Error fetching suggestion:', error);
      }
    };
    fetchSuggestion();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/deleteSuggestion/${id}`,{withCredentials:true});
      window.location.href = '/suggestions'; // Redirect after deletion
    } catch (error) {
      console.error('Error deleting suggestion:', error);
    }
  };

  if (!suggestion) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{suggestion.title}</h1>
        <p className="mb-4 text-center">{suggestion.description}</p>
        <div className="flex justify-center">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionDetail;
