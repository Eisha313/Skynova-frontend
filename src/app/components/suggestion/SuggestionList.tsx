
// // 'use client';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'; // Import the icons
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';

// // const SuggestionsList = () => {
// //     const [suggestions, setSuggestions] = useState<any[]>([]);
// //     const router = useRouter();

// //     useEffect(() => {
// //         const fetchSuggestions = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:4000/suggestions/viewSuggestion');
// //                 setSuggestions(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching suggestions:', error);
// //             }
// //         };
// //         fetchSuggestions();
// //     }, []);

// //     const handleDelete = async (id: string) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/suggestions/deleteSuggestion/${id}`);
// //             // Refresh the list after deletion
// //             setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
// //         } catch (error) {
// //             console.error('Error deleting suggestion:', error);
// //         }
// //     };

// //     return (
// //         <div className="p-4">
// //             <h1 className="text-2xl font-bold mb-4">Suggestions List</h1>
// //             <Link href='/suggestion/addsuggestion'>
// //                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
// //                     Add Suggestion
// //                 </button>
// //             </Link>
// //             <ul>
// //                 {suggestions.map((suggestion) => (
// //                     <li key={suggestion._id} className="mb-2 p-4 border rounded flex items-center justify-between">
// //                         <div>
// //                             <h2 className="text-xl font-semibold">{suggestion.title}</h2>
// //                             <p>{suggestion.description}</p>
// //                         </div>
// //                         <div className="flex space-x-4">
// //                             <Link href={`/suggestion/viewsuggestion/${suggestion._id}/detailSuggestion`}>
// //                                 <FaEye className="text-blue-500 cursor-pointer" title="View" />
// //                             </Link>
// //                             <Link href={`/suggestion/viewsuggestion/${suggestion._id}/editSuggestion`}>
// //                                 <FaEdit className="text-green-500 cursor-pointer" title="Edit" />
// //                             </Link>
// //                             <FaTrash
// //                                 className="text-red-500 cursor-pointer"
// //                                 title="Delete"
// //                                 onClick={() => handleDelete(suggestion._id)}
// //                             />
// //                         </div>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default SuggestionsList;
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
//                 const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion');
//                 setSuggestions(response.data);
//             } catch (error) {
//                 console.error('Error fetching suggestions:', error);
//             }
//         };
//         fetchSuggestions();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/deleteSuggestion/${id}`);
//             // Refresh the list after deletion
//             setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
//         } catch (error) {
//             console.error('Error deleting suggestion:', error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-4">
//             <div className="w-full max-w-4xl">
//                 <div className="flex justify-end mb-4">
//                     <Link href='/suggestion/addsuggestion'>
//                         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                             Add Suggestion
//                         </button>
//                     </Link>
//                 </div>
//                 <h1 className="text-2xl font-bold mb-4 text-center">Suggestions List</h1>
//                 <ul>
//                     {suggestions.map((suggestion) => (
//                         <li key={suggestion._id} className="mb-2 p-4 border rounded flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{suggestion.title}</h2>
//                                 <p>{suggestion.description}</p>
//                             </div>
//                             <div className="flex space-x-4">
//                                 <Link href={`/suggestion/viewsuggestion/${suggestion._id}/detailSuggestion`}>
//                                     <FaEye className="text-blue-500 cursor-pointer" title="View" />
//                                 </Link>
//                                 <Link href={`/suggestion/viewsuggestion/${suggestion._id}/editSuggestion`}>
//                                     <FaEdit className="text-green-500 cursor-pointer" title="Edit" />
//                                 </Link>
//                                 <FaTrash
//                                     className="text-red-500 cursor-pointer"
//                                     title="Delete"
//                                     onClick={() => handleDelete(suggestion._id)}
//                                 />
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default SuggestionsList;
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Suggestion {
    _id: string;
    title: string;
    description: string;
}

const SuggestionsList = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Suggestion | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
    const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                // const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestion?page=${page}&limit=${limit}');
                const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/viewSuggestions');
                setSuggestions(response.data.data);
                setTotalPages(response.data.meta.totalPages);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };
        fetchSuggestions();
    }, [page, limit]);

    const handleSort = (key: keyof Suggestion) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const compareValues = (a: any, b: any, direction: 'asc' | 'desc') => {
        if (a === b) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
        if (typeof a === 'string' && typeof b === 'string') {
            return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
        }
        return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
    };

    const sortedSuggestions: Suggestion[] = [...(suggestions || [])];

    if (sortConfig.key) {
        sortedSuggestions.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
    }

    const handleSelectAll = () => {
        if (suggestions?.length > 0 && selectedSuggestions.length === suggestions.length) {
            setSelectedSuggestions([]);
        } else {
            setSelectedSuggestions(suggestions?.map(suggestion => suggestion._id) || []);
        }
    };

    const handleSelectSuggestion = (id: string) => {
        if (selectedSuggestions.includes(id)) {
            setSelectedSuggestions(selectedSuggestions.filter(selectedId => selectedId !== id));
        } else {
            setSelectedSuggestions([...selectedSuggestions, id]);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete('https://sky-nova-8ccaddc754ce.herokuapp.com/suggestions/deleteSuggestion/${id}');
            setSuggestions(suggestions.filter(suggestion => suggestion._id !== id));
        } catch (error) {
            console.error('Error deleting suggestion:', error);
        }
    };

    const renderArrow = (key: keyof Suggestion) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '▷';
    };
    return(
    <div className="overflow-x-auto">
    <div className="flex justify-between mb-4">
        <Link href='/suggestion/addsuggestion'>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add Suggestion
            </button>
        </Link>
        <div className="flex items-center">
            <button
                onClick={() => handleSelectAll()}
                className="px-4 py-2 bg-gray-200 rounded"
            >
                {selectedSuggestions.length === (suggestions?.length || 0) ? 'Deselect All' : 'Select All'}
            </button>
        </div>
    </div>
    <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
            <tr>
                <th className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedSuggestions.length === (suggestions?.length || 0)}
                        onChange={handleSelectAll}
                    />
                </th>
                <th onClick={() => handleSort('title')} className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    Title {renderArrow('title')}
                </th>
                <th onClick={() => handleSort('description')} className="py-2 px-4 border-b bg-gray-700 cursor-pointer">
                    Description {renderArrow('description')}
                </th>
                <th className="py-2 px-4 border-b bg-gray-700">Actions</th>
            </tr>
        </thead>
        <tbody>
            {sortedSuggestions.map(suggestion => (
                <tr key={suggestion._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                        <input
                            type="checkbox"
                            checked={selectedSuggestions.includes(suggestion._id)}
                            onChange={() => handleSelectSuggestion(suggestion._id)}
                        />
                    </td>
                    <td className="py-2 px-4 border-b">{suggestion.title}</td>
                    <td className="py-2 px-4 border-b">{suggestion.description}</td>
                    <td className="py-2 px-4 border-b flex items-center space-x-2">
                        <Link href={`/suggestion/editsuggestion/${suggestion._id}`}>
                            <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                        </Link>
                        <FaEye
                            onClick={() => router.push(`/suggestion/viewsuggestion/${suggestion._id}`)}
                            className="text-green-500 cursor-pointer hover:text-green-700"
                        />
                        <FaTrash
                            onClick={() => handleDelete(suggestion._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

    {/* Pagination Controls */}
    <div className="flex justify-between mt-4">
        <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
            Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
            Page {page} of {totalPages}
        </span>
        <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
            Next
        </button>
    </div>
</div>
);
};

export default SuggestionsList;