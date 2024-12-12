
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Search from './Search';
import { ArrowUpDown } from 'lucide-react';
import { MdDownload } from 'react-icons/md';

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
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources', { withCredentials: true });
      setResources(response.data);
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
    return direction === 'asc' ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
  };

  const sortedResources = [...resources].sort((a, b) => {
    if (sortConfig.key) {
      return compareValues(a[sortConfig.key], b[sortConfig.key], sortConfig.direction);
    }
    return 0;
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/deleteResource/${id}`, { withCredentials: true });
      setResources(resources.filter(resource => resource._id !== id));
    } catch (error) {
      setError('Failed to delete resource.');
    }
  };

  const confirmDeleteSelected = async () => {
    try {
      await Promise.all(selectedResources.map(id =>
        axios.delete(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/deleteResource/${id}`, { withCredentials: true })
      ));
      setResources(resources.filter(resource => !selectedResources.includes(resource._id)));
      setSelectedResources([]);
    } catch (error) {
      setError('Failed to delete selected resources.');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredResources = sortedResources.filter(resource =>
    (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType ? resource.type === filterType : true)
  );

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResources = filteredResources.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Resource List', 20, 20);
    const headers = [['Title', 'Type', 'Description']];
    const data = filteredResources.map(resource => [resource.title, resource.type, resource.description]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });
    doc.save('resources.pdf');
  };

  const renderArrow = (key: keyof Resource) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpDown className="h-4 w-4 inline ml-2" />
      ) : (
        <ArrowUpDown className="h-4 w-4 inline ml-2 rotate-180" />
      );
    }
    return <ArrowUpDown className="h-4 w-4 inline ml-2" />;
  };

  return (
    <div className=" mx-auto  p-4 bg-hassan">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex mt-24 flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-white text-center ">All Resources</h2>
        <div className="flex flex-1 justify-end space-x-2">
          <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} clearSearch={clearSearch} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2 text-white border border-white/30 rounded-xl bg-transparent hover:border-[#5AA0BC] active:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none">
            <option className='bg-transparent text-black' value="">All Types</option>
            
            <option className='bg-transparent text-black' value="pdf">PDFs</option>


            <option className='bg-transparent text-black' value="image">Images</option>
            <option className='bg-transparent text-black' value="video">Videos</option>
          </select>
          <button onClick={generatePDF} 
          className="text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300"
          >
          <MdDownload  />
          </button>
          <Link href="/addResource" className="px-4 py-2 rounded-md text-center bg-eisha text-white">
            Add Resource
          </Link>
          {selectedResources.length > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 rounded-md text-center bg-red-600 text-white"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete the selected resources?</h3>
            <div className="flex justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmDeleteSelected} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-eisha text-white">
          <tr>
            <th className="py-6 px-4 border-b">
              <input
                type="checkbox"
                checked={selectedResources.length === resources.length}
                onChange={() => setSelectedResources(selectedResources.length === resources.length ? [] : resources.map(resource => resource._id))}
              />
            </th>
            {['Title', 'Type', 'Description', 'Actions'].map(header => (
              <th
                key={header}
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Resource)}
              >
                <div className="flex items-center justify-center">
                  {header}
                  {(header === 'Title' || header === 'Type' || header === 'Description') && renderArrow(header.toLowerCase() as keyof Resource)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-[#212C44] py-4 text-white'>
  {currentResources.length > 0 ? (
    currentResources.map(resource => (
      <tr key={resource._id} className="border-b">
        <td className="py-2 px-4 text-center">
          <input
            type="checkbox"
            checked={selectedResources.includes(resource._id)}
            onChange={() => setSelectedResources(selectedResources.includes(resource._id) ? selectedResources.filter(id => id !== resource._id) : [...selectedResources, resource._id])}
          />
        </td>
        <td className="py-2 px-4 text-center">{resource.title}</td>
        <td className="py-2 px-4 text-center">{resource.type}</td>
        <td className="py-2 px-4 text-center max-w-xs overflow-hidden whitespace-nowrap text-ellipsis">
          {resource.description}
        </td>
        <div className='flex justify-center'>
        <td className="py-2 px-4   flex space-x-2 ">
  <Link href={`/view-resource/${resource._id}/resourceDetails`} passHref>
    <button
      className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FaEye className="text-gray-700" />
    </button>
  </Link>
  <Link href={`/view-resource/${resource._id}/editResource`} passHref>
    <button
      className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
      style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FaEdit className="text-gray-700" />
    </button>
  </Link>
  <button
    onClick={() => handleDelete(resource._id)}
    className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
    style={{ height: "33px", display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <FaTrash className="text-gray-700" />
  </button>
</td>
</div>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="py-4 text-center">No resources found</td>
    </tr>
  )}
</tbody>

      </table>

      
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredResources.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
