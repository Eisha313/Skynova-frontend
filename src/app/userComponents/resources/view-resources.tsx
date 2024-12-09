// 'use client';
// import React, { useState } from 'react';
// import VideoSection from './video-resource';
// import DocumentSection from './document-resource';
// import { FaTimes } from 'react-icons/fa';
// import Link from 'next/link';
// import {
//   Button,
//   TextInput,
//   Select,
//   Group,
//   Grid,
//   Box,
//   Text,
//   Modal,
//   Notification,
// } from '@mantine/core';

// const ResourcePage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('All');
//   const [showAllVideos, setShowAllVideos] = useState(false);
//   const [showAllDocuments, setShowAllDocuments] = useState(false);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilterType(e.target.value);
//     setShowAllVideos(false);
//     setShowAllDocuments(false);
//   };

//   const toggleViewVideos = () => {
//     setShowAllVideos(prev => !prev);
//     setShowAllDocuments(false);
//   };

//   const toggleViewDocuments = () => {
//     setShowAllDocuments(prev => !prev);
//     setShowAllVideos(false);
//   };

//   return (
//     <div className="relative min-h-screen">
//       <div className='background-image-overlay'></div>
//       <div className="page-overlay" />
//       <div className="main-container">

//           <header className="text-center mb-8">
//   <div className="flex items-center justify-center">

//     <div className="h-1 bg-[#5AA0BC] w-12 sm:w-16 lg:w-20 rounded"></div>

//     <h1 className="mx-4 text-4xl font-extrabold text-white mb-2 font-inter">SkyNova Resources</h1>

//     <div className="h-1 bg-[#5AA0BC] w-12 sm:w-16 lg:w-20 rounded"></div>
//   </div>

//   <div className="w-full max-w-screen-lg mx-auto mt-6 px-10">
//   <h2 className="text-gray-300 text-lg mb-6 leading-relaxed">
//     Explore our resources categorized by type. Browse through videos and documents to find the information you need. More content can be added here if needed.
//   </h2>
// </div>

// {/* </header> */}

// <div className="flex justify-center items-center mb-6 space-x-2 w-full max-w-screen-lg mx-auto">
//   <select
//     onChange={handleFilterChange}
//     value={filterType}
//     className="bg-white border border-gray-300 rounded-md px-4 py-3 shadow-sm focus:outline-none"
//     style={{
//       backgroundColor: '#212C44',
//       borderColor: '#B5B5B540',
//       borderRadius: '12px',
//       color: 'white',
//     }}
//   >
//     <option value="All">All Resources</option>
//     <option value="Video">Videos</option>
//     <option value="Document">Documents</option>
//   </select>

//   <div className="relative w-full max-w-md">  {/* Increased the width of the search input */}
//     <TextInput
//       type="text"
//       placeholder="Search by title..."
//       value={searchTerm}
//       onChange={handleSearch}
//       styles={{
//         input: {
//           backgroundColor: '#212C44',
//           borderColor: '#B5B5B540',
//           borderRadius: '12px',
//           color: 'white',
//           height: '48px',  // Consistent height
//           padding: '0 16px', // Consistent padding
//           '::placeholder': { color: '#B5B5B540' },
//         },
//       }}
//     />
//     {searchTerm && (
//       <button
//         onClick={clearSearch}
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//       >
//         <FaTimes />
//       </button>
//     )}
//   </div>

//   <Link href="/userRender/addResource" className="px-6 py-3 rounded-md text-center bg-indigo-600 text-white hover:bg-indigo-700">
//     Add Resource
//   </Link>
// </div>

//         </header>

//         {(filterType === 'All' || filterType === 'Video') && (
//           <section className="mb-12">
//             <h2 className="text-3xl font-semibold text-white mb-4">Videos</h2>
//             <VideoSection searchTerm={searchTerm} showAll={showAllVideos} />
//             <button
//               onClick={toggleViewVideos}
//               className="mt-4 text-blue-400 hover:underline"
//             >
//               {showAllVideos ? 'View Less Videos' : 'View All Videos'}
//             </button>
//           </section>
//         )}

//         {(filterType === 'All' || filterType === 'Document') && (
//           <section>
//             <h2 className="text-3xl font-semibold text-white mb-4">Documents</h2>
//             <DocumentSection searchTerm={searchTerm} showAll={showAllDocuments} />
//             <button
//               onClick={toggleViewDocuments}
//               className="mt-4 text-blue-400 hover:underline"
//             >
//               {showAllDocuments ? 'View Less Documents' : 'View All Documents'}
//             </button>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResourcePage;
"use client";
import React, { useState } from "react";
import VideoSection from "./video-resource";
import DocumentSection from "./document-resource";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { TextInput } from "@mantine/core";

const ResourcePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => setSearchTerm("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setShowAllVideos(false);
    setShowAllDocuments(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1121] text-white">
      <div className="background-image-overlay" />
      <div className="page-overlay" />
      <div className="max-w-screen-xl  mx-auto px-4 py-12 z-10 relative">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 bg-[#5AA0BC] w-12 sm:w-16 lg:w-20 rounded"></div>
            <h1 className="mx-4 text-4xl font-extrabold font-inter">SkyNova Resources</h1>
            <div className="h-1 bg-[#5AA0BC] w-12 sm:w-16 lg:w-20 rounded"></div>
          </div>
          <p className="text-gray-300 text-lg">Browse videos and documents to find the information you need.</p>
        </header>

        {/* <div className="flex justify-center items-center space-x-4 mb-10">
          <select
            onChange={handleFilterChange}
            value={filterType}
            className="bg-[#212C44] border border-gray-600 text-white rounded-md px-4 py-2 focus:outline-none"
          >
            <option value="All">All Resources</option>
            <option value="Video">Videos</option>
            <option value="Document">Documents</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <TextInput
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              styles={{
                input: {
                  backgroundColor: '#212C44',
                  borderColor: '#B5B5B540',
                  borderRadius: '12px',
                  color: 'white',
                },
              }}
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

          <Link
            href="/userRender/addResource"
            className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add Resource
          </Link>
        </div> */}

        <div className="flex justify-center items-center space-x-4 mb-10">
          <select
            onChange={handleFilterChange}
            value={filterType}
            className="bg-[#212C44] border border-gray-600 text-white rounded-md px-4 py-2 h-12 focus:outline-none"
          >
            <option value="All">All Resources</option>
            <option value="Video">Videos</option>
            <option value="Document">Documents</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <TextInput
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  color: "white",
                  height: "48px",
                  lineHeight: "2rem",
                  fontSize: "1rem",
                },
              }}
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

          <Link
            href="/userRender/addResource"
            className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white h-12 flex items-center"
          >
            Add Resource
          </Link>
        </div>

        {(filterType === "All" || filterType === "Video") && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Videos</h2>
            <VideoSection searchTerm={searchTerm} showAll={showAllVideos} />
            <div className="text-center mt-4">
              <button onClick={() => setShowAllVideos(!showAllVideos)} className="text-blue-400 hover:underline">
                {showAllVideos ? "View Less Videos" : "View All Videos"}
              </button>
            </div>
          </section>
        )}

        {/* Document Section */}
        {(filterType === "All" || filterType === "Document") && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">Documents</h2>
            <DocumentSection searchTerm={searchTerm} showAll={showAllDocuments} />
            <div className="text-center mt-4">
              <button onClick={() => setShowAllDocuments(!showAllDocuments)} className="text-blue-400 hover:underline">
                {showAllDocuments ? "View Less Documents" : "View All Documents"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResourcePage;
