// 'use client'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Resource {
//   id: number;
//   title: string;
//   link?: string;
//   src?: string;
//   type: string;
// }

// const DocumentSection: React.FC = () => {
//   const [documents, setDocuments] = useState<Resource[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources'); 
//         if (!response.ok) {
//           throw new Error('Failed to fetch resources');
//         }
//         const data: Resource[] = await response.json();

//         // Filter the resources to only include documents
//         const documentResources = data.filter(resource => resource.type === 'document');
//         setDocuments(documentResources);
//       } catch (error) {
//         setError('Failed to load documents');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   if (loading) {
//     return <p>Loading documents...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <ul className="space-y-4">
//         {documents.map((doc) => (
//           <li key={doc.id} className="flex items-center space-x-4">
//             <div className="text-gray-600">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M8 0a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V6l-6-6H8zM9 2h5.5L17 4.5V16a1 1 0 01-1 1H9a1 1 0 01-1-1V2zm2 10a1 1 0 112 0v4a1 1 0 01-2 0v-4zM8 7h8v1H8V7z" />
//               </svg>
//             </div>
//             <Link href={doc.link || '#'} passHref>
//               <p className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
//                 {doc.title}
//               </p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocumentSection;
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Resource {
  id: number;
  title: string;
  link?: string;
  type: string;
}

const DocumentSection: React.FC = () => {
  const [documents, setDocuments] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResources',{credentials:'include'}); 
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data: Resource[] = await response.json();
        const documentResources = data.filter(resource => resource.type === 'document');
        setDocuments(documentResources);
      } catch (error) {
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <p className="text-gray-700">Loading documents...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="flex items-center space-x-4 border-b border-gray-300 pb-3">
            <div className="text-gray-600">
              <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 0a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V6l-6-6H8zM9 2h5.5L17 4.5V16a1 1 0 01-1 1H9a1 1 0 01-1-1V2zm2 10a1 1 0 112 0v4a1 1 0 01-2 0v-4zM8 7h8v1H8V7z" />
              </svg>
            </div>
            <Link href={doc.link || '#'} passHref>
              <a className="text-blue-600 hover:text-blue-800 font-semibold text-lg">{doc.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentSection;
