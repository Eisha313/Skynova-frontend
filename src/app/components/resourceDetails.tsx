
// 'use client'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// interface Resource {
//   _id: string;
//   title: string;
//   type: string;
//   description: string;
//   // Add other fields based on your resource model
// }

// interface ResourceDetailsProps {
//   id: string;
// }

// const ResourceDetails: React.FC<ResourceDetailsProps> = ({ id }) => {
//   const [resource, setResource] = useState<Resource | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResource = async () => {
//       try {
//         const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResource/${id}`,{withCredentials:true});
//         console.log(response.data); 
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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6 border rounded-md bg-gray-50 shadow-lg max-w-3xl mx-auto">
//       {resource ? (
//         <div>
//           <h1 className="text-3xl font-bold mb-6 text-center">{resource.title}</h1>
//           <p className="mb-4"><strong>Type:</strong> {resource.type}</p>
//           <p className="mb-4"><strong>Description:</strong> {resource.description}</p>
          
//           <Link href="/view-resource">
//             <div className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
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
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactPlayer from 'react-player/lazy'; // Import ReactPlayer to handle video files

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
        const response = await axios.get(`https://sky-nova-8ccaddc754ce.herokuapp.com/resources/viewResource/${id}`, { withCredentials: true });
        console.log(response.data);
        const resourceData = response.data.length > 0 ? response.data[0] : null;
        setResource(resourceData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch resource');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  const isVideoLink = (url: string) => {
    return ReactPlayer.canPlay(url);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 border rounded-md bg-gray-50 shadow-lg max-w-3xl mx-auto">
      {resource ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">{resource.title}</h1>
          <p className="mb-4"><strong>Type:</strong> {resource.type}</p>
          <p className="mb-4"><strong>Description:</strong> {resource.description}</p>

          {/* Render resource based on type */}
          {resource.resourceFile && resource.resourceFile.endsWith('.mp4') && (
            <video className="w-full h-56" controls>
              <source src={resource.resourceFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {resource.resourceImage && isVideoLink(resource.resourceImage) && (
            <ReactPlayer url={resource.resourceImage} width="100%" height="360px" controls />
          )}

          {resource.resourceImage && !isVideoLink(resource.resourceImage) && (
            <img
              src={resource.resourceImage}
              alt={resource.title}
              className="w-full h-56 object-cover mt-4"
            />
          )}

          {resource.resourceFile && resource.type === 'pdf' && (
            <iframe
              src={resource.resourceFile}
              className="w-full h-96 mt-4"
              frameBorder="0"
              title="Document Viewer"
            />
          )}

          <Link href="/view-resource">
            <div className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
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
