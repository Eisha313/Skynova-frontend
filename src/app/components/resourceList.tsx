// 'use client'

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import axios from 'axios';

// interface Resource {
//     _id: string;
//     title: string;
//     type: string;
//     description: string;
// }

// const ResourceList: React.FC = () => {
//     const [resources, setResources] = useState<Resource[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources');
//                 setResources(response.data);
//             } catch (error) {
//                 setError('Failed to fetch resources.');
//             }
//         };

//         fetchResources();
//     }, []);

//     const handleDelete = async (id: string) => {
//         try {
//             await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/deleteResource/${id}`);
//             setResources(resources.filter(resource => resource._id !== id));
//         } catch (error) {
//             setError('Failed to delete resource.');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <h1 className="text-2xl font-bold mb-4">Resource List</h1>
//             <div className="overflow-x-auto">
//                 <div className="mb-4">
//                     <Link href="/addResource" className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
//                         Add Resource
//                     </Link>
//                 </div>
//                 <table className="min-w-full bg-white border border-gray-200">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="py-2 px-4 text-left">Title</th>
//                             <th className="py-2 px-4 text-left">Type</th>
//                             <th className="py-2 px-4 text-left">Description</th>
//                             <th className="py-2 px-4 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {resources.map(resource => (
//                             <tr key={resource._id} className="border-b hover:bg-gray-50">
//                                 <td className="py-2 px-4">{resource.title}</td>
//                                 <td className="py-2 px-4">{resource.type}</td>
//                                 <td className="py-2 px-4">{resource.description}</td>
//                                 <td className="py-2 px-4 text-center">
//                                     <div className="flex justify-center space-x-4">
//                                         <Link href={`/view-resource/${resource._id}/resourceDetails`}>
//                                             <FaEye className="text-blue-500 cursor-pointer" />
//                                         </Link>
//                                         <Link href={`/view-resource/${resource._id}/editResource`}>
//                                             <FaEdit className="text-yellow-500 cursor-pointer" />
//                                         </Link>
//                                         <FaTrash
//                                             className="text-red-500 cursor-pointer"
//                                             onClick={() => handleDelete(resource._id)}
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ResourceList;
'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Search from './Search';
interface Resource {
  _id: string;
  title: string;
  type: string;
  description: string;
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Resource | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources();
  }, [page, limit]);

  const fetchResources = async () => {
    try {
      const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources',{withCredentials:true});
      setResources(response.data);
      setTotalPages(Math.ceil(response.data.length / limit));
    } catch (error) {
      setError('Failed to fetch resources.');
    }
  };

  const handleSort = (key: keyof Resource) => {
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

  const sortedResources = [...resources];
  if (sortConfig.key) {
    sortedResources.sort((a, b) => compareValues(a[sortConfig.key!], b[sortConfig.key!], sortConfig.direction));
  }

  const handleSelectAll = () => {
    if (selectedResources.length === resources.length) {
      setSelectedResources([]);
    } else {
      setSelectedResources(resources.map(resource => resource._id));
    }
  };

  const handleSelectResource = (id: string) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter(selectedId => selectedId !== id));
    } else {
      setSelectedResources([...selectedResources, id]);
    }
  };

  const renderArrow = (key: keyof Resource) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '▷';
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/deleteResource/${id}`,{withCredentials:true});
      setResources(resources.filter(resource => resource._id !== id));
    } catch (error) {
      setError('Failed to delete resource.');
    }
  };
  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = resources.filter(resource =>
        resource.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        resource.description.toLowerCase().includes(lowerCaseSearchTerm) 
        // resource.username.toLowerCase().includes(lowerCaseSearchTerm) ||
        // resource.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        // resource.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredResources(filtered);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}
      {/* <h1 className="text-2xl font-bold mb-4">Resource List</h1> */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold">All Resources</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} />
          {/* <Filter onFilterChange={handleFilterChange} />
          <DownloadPDF users={filteredUsers}  /> */}
          <Link 
            href="/addResource" 
            className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center"
          
          >
            Add Resource
          </Link>
        </div>
      </div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedResources.length === resources.length}
                  onChange={handleSelectAll}
                />
              </th>
              {['Title', 'Type', 'Description', 'Actions'].map(header => (
                <th
                  key={header}
                  className="py-2 px-4 border-b border-gray-200 cursor-pointer text-center"
                  onClick={() => handleSort(header.toLowerCase() as keyof Resource)}
                >
                  {header} {renderArrow(header.toLowerCase() as keyof Resource)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedResources.map(resource => (
              <tr key={resource._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedResources.includes(resource._id)}
                    onChange={() => handleSelectResource(resource._id)}
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">{resource.title}</td>
                <td className="py-2 px-4 border-b text-center">{resource.type}</td>
                <td className="py-2 px-4 border-b text-center">{resource.description}</td>
                <td className="py-2 px-4 border-b border-gray-200 flex items-center justify-center gap-2">
                  <Link href={`/view-resource/${resource._id}/resourceDetails`}>
                    <button
                      className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    >
                      <FaEye className="text-gray-700" />
                    </button>
                  </Link>
                  <Link href={`/view-resource/${resource._id}/editResource`}>
                    <button
                      className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    >
                      <FaEdit className="text-gray-700" />
                    </button>
                  </Link>
               

               
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="text-red-500 hover:underline mr-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default ResourceList;
