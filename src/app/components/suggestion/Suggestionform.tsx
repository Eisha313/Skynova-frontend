
// 'use client'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface SuggestionFormProps {
//   id?: string;
// }

// const SuggestionForm = ({ id }: SuggestionFormProps) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchSuggestion = async () => {
//       try {
//         if (id) {
//           const response = await axios.get(`http://localhost:4000/suggestions/viewSuggestion/${id}`);
//           const suggestion = response.data[0];
//           setTitle(suggestion?.title || '');
//           setDescription(suggestion?.description || '');
      
//         }
//       } catch (error) {
//         console.error('Error fetching suggestion:', error);
//       }
//     };

//     if (id) fetchSuggestion();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         // Edit existing suggestion
//         await axios.patch(`http://localhost:4000/suggestions/updateSuggestion/${id}`, { title, description });
//       } else {
//         // Create new suggestion
//         await axios.post('http://localhost:4000/suggestions/createSuggestion', { title, description });
//       }
//       alert('suggestion saved')
//       router.push('/suggestion/viewsuggestion')
//     } catch (error) {
//       console.error('Error saving suggestion:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Suggestion' : 'Create Suggestion'}</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-lg font-medium">Title</label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border rounded px-4 py-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-lg font-medium">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border rounded px-4 py-2 w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {id ? 'Update Suggestion' : 'Create Suggestion'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SuggestionForm;
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface SuggestionFormProps {
  id?: string;
}

const SuggestionForm = ({ id }: SuggestionFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion/${id}`,{withCredentials:true});
          const suggestion = response.data[0];
          setTitle(suggestion?.title || '');
          setDescription(suggestion?.description || '');
        }
      } catch (error) {
        console.error('Error fetching suggestion:', error);
      }
    };

    if (id) fetchSuggestion();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Edit existing suggestion
        await axios.patch(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/updateSuggestion/${id}`, { title, description ,withCredentails:true});
      } else {
        // Create new suggestion
        await axios.post('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/createSuggestion', { title, description,withCredentials:true });
      }
      alert('Suggestion saved');
      router.push('/suggestion/viewsuggestion');
    } catch (error) {
      console.error('Error saving suggestion:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {id ? 'Edit Suggestion' : 'Create Suggestion'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-lg font-medium">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-4 py-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            {id ? 'Update Suggestion' : 'Create Suggestion'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestionForm;
