
// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; // Import the icons
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const SuggestionsList = () => {
//     const [suggestions, setSuggestions] = useState<any[]>([]);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchSuggestions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/suggestions/viewSuggestion');
//                 setSuggestions(response.data);
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//             }
//         };
//         fetchSuggestions();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             await axios.delete(`http://localhost:4000/suggestions/deleteSuggestion/${id}`);
//             // Refresh the list after deletion
//             setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
//         } catch (error) {
//             console.error('Error deleting suggestion:', error);
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Suggestions List</h1>
//             <Link href='/suggestion/addsuggestion'>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     Add Suggestion
//                 </button>
//             </Link>
//             <ul>
//                 {suggestions.map((suggestion) => (
//                     <li key={suggestion._id} className="mb-2 p-4 border rounded flex items-center justify-between">
//                         <div>
//                             <h2 className="text-xl font-semibold">{suggestion.title}</h2>
//                             <p>{suggestion.description}</p>
//                         </div>
//                         <div className="flex space-x-4">
//                             <Link href={`/suggestion/viewsuggestion/${suggestion._id}/detailSuggestion`}>
//                                 <FaEye className="text-blue-500 cursor-pointer" title="View" />
//                             </Link>
//                             <Link href={`/suggestion/viewsuggestion/${suggestion._id}/editSuggestion`}>
//                                 <FaEdit className="text-green-500 cursor-pointer" title="Edit" />
//                             </Link>
//                             <FaTrash
//                                 className="text-red-500 cursor-pointer"
//                                 title="Delete"
//                                 onClick={() => handleDelete(suggestion._id)}
//                             />
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SuggestionsList;
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; // Import the icons
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SuggestionsList = () => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion');
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };
        fetchSuggestions();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/deleteSuggestion/${id}`);
            // Refresh the list after deletion
            setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
        } catch (error) {
            console.error('Error deleting suggestion:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-4xl">
                <div className="flex justify-end mb-4">
                    <Link href='/suggestion/addsuggestion'>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add Suggestion
                        </button>
                    </Link>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center">Suggestions List</h1>
                <ul>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion._id} className="mb-2 p-4 border rounded flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{suggestion.title}</h2>
                                <p>{suggestion.description}</p>
                            </div>
                            <div className="flex space-x-4">
                                <Link href={`/suggestion/viewsuggestion/${suggestion._id}/detailSuggestion`}>
                                    <FaEye className="text-blue-500 cursor-pointer" title="View" />
                                </Link>
                                <Link href={`/suggestion/viewsuggestion/${suggestion._id}/editSuggestion`}>
                                    <FaEdit className="text-green-500 cursor-pointer" title="Edit" />
                                </Link>
                                <FaTrash
                                    className="text-red-500 cursor-pointer"
                                    title="Delete"
                                    onClick={() => handleDelete(suggestion._id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SuggestionsList;
