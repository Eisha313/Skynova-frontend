
'use client';
import React, { useState } from 'react';
import VideoSection from './video-resource';
import DocumentSection from './document-resource';
import { FaTimes } from 'react-icons/fa'; 
import Link from 'next/link';

const ResourcePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm(''); 
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setShowAllVideos(false); 
    setShowAllDocuments(false); 
  };

  const toggleViewVideos = () => {
    setShowAllVideos(prev => !prev);
    setShowAllDocuments(false); 
  };

  const toggleViewDocuments = () => {
    setShowAllDocuments(prev => !prev);
    setShowAllVideos(false); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-auto mt-20">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 align-center">Resources</h1>
        <h2 className="text-gray-700 text-lg mb-4">
          Explore our resources categorized by type. Browse through videos and documents to find the information you need.
        </h2>

      
        <div className="flex justify-end items-center mb-6 space-x-2">
          <select 
            onChange={handleFilterChange} 
            value={filterType} 
            className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
          >
            <option value="All">All Resources</option>
            <option value="Video">Videos</option>
            <option value="Document">Documents</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <Link href="/userRender/addResource" className="px-4 py-2 rounded-md text-center bg-eisha text-white">
            Add Resource
          </Link>
        </div>
      </header>

      {(filterType === 'All' || filterType === 'Video') && (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Videos</h2>
          <VideoSection searchTerm={searchTerm} showAll={showAllVideos} />
          <button 
            onClick={toggleViewVideos} 
            className="mt-4 text-blue-500 hover:underline"
          >
            {showAllVideos ? 'View Less Videos' : 'View All Videos'}
          </button>
        </section>
      )}

      {(filterType === 'All' || filterType === 'Document') && (
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Documents</h2>
          <DocumentSection searchTerm={searchTerm} showAll={showAllDocuments} />
          <button 
            onClick={toggleViewDocuments} 
            className="mt-4 text-blue-500 hover:underline"
          >
            {showAllDocuments ? 'View Less Documents' : 'View All Documents'}
          </button>
        </section>
      )}
    </div>
  );
};

export default ResourcePage;
