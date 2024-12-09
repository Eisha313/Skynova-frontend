"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
// import { Document } from "react-pdf";

import PDFViewer from "./PDFViewer";

interface Resource {
  _id: string;
  title: string;
  type: string;
  description: string;
  resourceFile?: string | null;
  resourceImage?: string | null;
}

interface ResourceDetailsProps {
  id: string;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ id }) => {
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResource/${id}`, {
          withCredentials: true,
        });
        const resourceData = response.data.length > 0 ? response.data[0] : null;
        setResource(resourceData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch resource");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  const isVideoLink = (url: string) => ReactPlayer.canPlay(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 border h-full min-h-full rounded-md bg-[#212C44] shadow-lg max-w-3xl mx-auto">
      {resource ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center text-white">{resource.title}</h1>
          <p className="text-gray-300 mb-4">
            <strong className="font-bold text-white text-lg">Type:</strong> {resource.type}
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="font-bold text-white text-lg">Description:</strong> {resource.description}
          </p>

          {resource.type === "pdf" && (
            <button className="bg-eisha text-white px-4 py-2 rounded-md hover:bg-eisha">
              <a href={resource.resourceFile!} download target="_blank" rel="noreferrer" className="text-white">
                Download PDF
              </a>
            </button>
          )}

          {resource.resourceFile && isVideoLink(resource.resourceFile) && (
            <ReactPlayer url={resource.resourceFile} width="100%" height="240px" controls />
          )}
          {resource.resourceImage && isVideoLink(resource.resourceImage) && (
            <ReactPlayer url={resource.resourceImage} width="100%" height="500px" controls />
          )}

          {/* Render Image */}
          {resource.resourceImage && !isVideoLink(resource.resourceImage) && (
            <img src={resource.resourceImage} alt={resource.title} className="w-full h-56 object-cover mt-4" />
          )}

          {resource.resourceFile && resource.type === "pdf" && (
            <PDFViewer pdfUrl={"https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"} />
            // <Document file={resource.resourceFile}>
            //   <Page pageNumber={1} />
            // </Document>
          )}

          <Link href="/userRender/view-resource">
            <div className="mt-6 inline-block px-6 py-3 bg-eisha text-white rounded-md hover:bg-eisha cursor-pointer">
              Back to Resources
            </div>
          </Link>
        </div>
      ) : (
        <p>No resource found</p>
      )}
    </div>
  );
};

export default ResourceDetails;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import ReactPlayer from 'react-player/lazy';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'; // For PDF rendering

// interface Resource {
//   _id: string;
//   title: string;
//   type: string;
//   description: string;
//   resourceFile?: string | null;
//   resourceImage?: string | null;
// }

// interface ResourceDetailsProps {
//   id: string;
// }

// const ResourceDetails: React.FC<ResourceDetailsProps> = ({ id }) => {
//   const [resource, setResource] = useState<Resource | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [numPages, setNumPages] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchResource = async () => {
//       try {
//         const response = await axios.get(
//           `https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResource/${id}`,
//           { withCredentials: true }
//         );
//         const resourceData = response.data.length > 0 ? response.data[0] : null;
//         setResource(resourceData);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch resource');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchResource();
//     }
//   }, [id]);

//   const isVideoLink = (url: string) => ReactPlayer.canPlay(url);

//   const handleDocumentLoadSuccess = ({ numPages: total }: { numPages: number }) => {
//     setNumPages(total);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6 border h-full min-h-full rounded-md bg-[#212C44] shadow-lg max-w-3xl mx-auto">
//       {resource ? (
//         <div>
//           <h1 className="text-3xl font-bold mb-6 text-center text-white">{resource.title}</h1>
//           <p className="text-gray-300 mb-4">
//             <strong className="font-bold text-white text-lg">Type:</strong> {resource.type}
//           </p>
//           <p className="text-gray-300 mb-4">
//             <strong className="font-bold text-white text-lg">Description:</strong> {resource.description}
//           </p>

//           {/* Render Video */}
//           {resource.resourceFile && isVideoLink(resource.resourceFile) && (
//             <ReactPlayer
//               url={resource.resourceFile}
//               width="100%"
//               height="240px"
//               controls
//             />
//           )}

//           {/* Render Image */}
//           {resource.resourceImage && !isVideoLink(resource.resourceImage) && (
//             <img
//               src={resource.resourceImage}
//               alt={resource.title}
//               className="w-full h-56 object-cover mt-4"
//             />
//           )}

//           {/* Render PDF */}
//           {resource.resourceFile && resource.type === 'pdf' && (
//             <div className="mt-4">
//               <Document
//                 file={resource.resourceFile}
//                 onLoadSuccess={handleDocumentLoadSuccess}
//                 className="border rounded-md"
//               >
//                 {Array.from(new Array(numPages), (el, index) => (
//                   <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                 ))}
//               </Document>
//               <a
//                 href={resource.resourceFile}
//                 download
//                 className="block mt-4 text-center text-blue-500 hover:underline"
//               >
//                 Download Document
//               </a>
//             </div>
//           )}

//           <Link href="/userRender/view-resource">
//             <div className="mt-6 inline-block px-6 py-3 bg-eisha text-white rounded-md hover:bg-eisha cursor-pointer">
//               Back to Resources
//             </div>
//           </Link>
//         </div>
//       ) : (
//         <p>No resource found</p>
//       )}
//     </div>
//   );
// };

// export default ResourceDetails;
