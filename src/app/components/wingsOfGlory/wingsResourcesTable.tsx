"use client";
import { useEffect, useState } from "react";
import { Resource } from "@/types/types";
import WingsResources from "./wingsResources";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import autoTable from 'jspdf-autotable';
import Search from "../Search";
import { jsPDF } from 'jspdf';
import { ArrowUpDown } from 'lucide-react';
import { MdDownload } from 'react-icons/md';
import DeleteConfirmationModal from "../confirmationModal";
import ReactPlayer from 'react-player';
const WingsResourcesTable = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [modalResource, setModalResource] = useState<Resource | null>(null);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{ key: keyof Resource | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For delete confirmation modal
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);


  useEffect(() => {
    const fetchResources = async () => {
      const res = await fetch(
        "https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/viewWingsOfGloryResources",
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setResources(data);
    };
    fetchResources();
  }, []);

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
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };
  const filteredResources = sortedResources.filter(resource =>
    (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    const headers = [['Name', 'Type', 'Description']];
    const data = filteredResources.map(resource => [resource.name, resource.type, resource.description]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });
    doc.save('wingsOfGloryresources.pdf');
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
  // const handleDelete = async (id: string) => {
  //   await fetch(
  //     `https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/deleteWingsOfGloryResource/${id}`,
  //     { method: "DELETE", credentials: "include" }
  //   );
  //   setResources((prev) => prev.filter((res) => res._id !== id));
  // };
  const handleDeleteConfirmation = (id: string) => {
    setResourceToDelete(id); // Set the resource to delete
    setDeleteModalVisible(true); // Show the confirmation modal
  };

  const handleDelete = async () => {
    if (resourceToDelete) {
      await fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/wingsOfGloryResources/deleteWingsOfGloryResource/${resourceToDelete}`, {
        method: "DELETE",
        credentials: "include"
      });
      setResources((prev) => prev.filter((res) => res._id !== resourceToDelete));
      setDeleteModalVisible(false); // Hide the modal after deletion
      setResourceToDelete(null); // Reset the resource to delete
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
        
      <h2 className="text-lg font-semibold mb-4">Wings Resources</h2>
    
      <div className="flex flex-1 justify-end space-x-2 ">
          <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} clearSearch={clearSearch} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="p-2 border rounded">
            <option value="">All Types</option>
            <option value="document">Documents</option>
            <option value="image">Quotes</option>
            <option value="video">Videos</option>
          </select>
          <button onClick={generatePDF} className="text-gray-800 px-4 py-2 rounded-md flex items-center justify-center border-2 border-gray-300 hover:border-current transition-all duration-300">
          <MdDownload  />
          </button>
        <Link
          href="/wings/wingsResources/addWingsResources"
          className="px-4 py-2 rounded-md text-center bg-eisha text-white flex items-center"
        >
          Add Resource
        </Link> </div>
      
      
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
           
            {['Sr No ','Name', 'Type', 'Description','Content', 'Actions'].map(header => (
              <th
                key={header}
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleSort(header.toLowerCase() as keyof Resource)}
              >
                <div className="flex items-center justify-center">
                  {header}
                  {(header === 'Name' || header === 'Type' || header === 'Description') && renderArrow(header.toLowerCase() as keyof Resource)}
                </div>
              </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={resource._id} className="text-center">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{resource.name}</td>
              <td className="py-2">{resource.type}</td>
              <td className="py-2">{resource.description}</td>
              
              <td className="py-2">{resource.content}</td>
              {/* <td className="py-2 space-x-2">
                <button onClick={() => setModalResource(resource)} className="text-blue-500">View</button>
                <button onClick={() => handleDelete(resource.id!)} className="text-red-500">Delete</button>
                <button onClick={() => setEditingResourceId(resource.id!)} className="text-green-500">Edit</button>
              </td> */}
              <td className="py-2 px-4 text-center border-b flex space-x-2 items-center">
                
                  <button
                  onClick={() => setModalResource(resource)}
                    className="text-blue-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    style={{
                      height: "33px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaEye className="text-gray-700" />
                  </button>
                
                <Link
                  href={`/wings/wingsResources/${resource._id}/editWingsResources`}
                  passHref
                >
                  <button
                    className="text-green-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                    style={{
                      height: "33px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaEdit className="text-gray-700" />
                  </button>
                </Link>
                <button
                 onClick={() => handleDeleteConfirmation(resource._id)}
                    className="text-red-500 hover:underline bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400"
                  style={{
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaTrash className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModalVisible && (
          <DeleteConfirmationModal
            onConfirm={handleDelete}
            onCancel={() => setDeleteModalVisible(false)}
          />
        )}
      {/* {modalResource && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <h3 className="text-lg font-bold mb-2">{modalResource.name}</h3>
            <p>
              <strong>Description:</strong> {modalResource.description}
            </p>
            <p>
              <strong>Type:</strong> {modalResource.type}
            </p>
            <p>
              <strong>Content:</strong> {modalResource.content}
            </p>
            <button
              onClick={() => setModalResource(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
     

     {modalResource && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
      
      {/* Modal Header */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2">
        {modalResource.name}
      </h3>

      {/* Modal Content */}
      <div className="space-y-4">
        <p className="text-gray-700">
          <span className="font-semibold">Description:</span> {modalResource.description}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Type:</span> {modalResource.type}
        </p>

        {/* Video Player or Content Text */}
        {ReactPlayer.canPlay(modalResource.content) ? (
          <div className="overflow-hidden rounded-lg mb-4">
            <ReactPlayer url={modalResource.content} width="100%" height="100%" controls />
          </div>
        ) : (
          <p className="text-gray-700">
            <span className="font-semibold">Content:</span> {modalResource.content}
          </p>
        )}
      </div>

      {/* Modal Footer with Close Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setModalResource(null)}
          className="px-6 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      {editingResourceId && (
        <WingsResources
          resourceId={editingResourceId}
          onClose={() => setEditingResourceId(null)}
        />
      )}
    </div>
    </div>
  );
};

export default WingsResourcesTable;