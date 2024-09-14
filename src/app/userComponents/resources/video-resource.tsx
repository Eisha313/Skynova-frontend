
// 'use client'
// import React, { useEffect, useState } from 'react';

// interface Resource {
//   id: number;
//   title: string;
//   src?: string;
//   type: string;
// }

// const VideoSection: React.FC = () => {
//   const [videos, setVideos] = useState<Resource[]>([]);
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
//         const videoResources = data.filter(resource => resource.type === 'video');
//         setVideos(videoResources);
//       } catch (error) {
//         setError('Failed to load videos');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   if (loading) {
//     return <p className="text-gray-700">Loading videos...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {videos.map((video) => (
//         <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <video className="w-full h-56 object-cover" controls>
//             <source src={video.src} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold text-gray-800 truncate">{video.title}</h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoSection;
'use client'
import React, { useEffect, useState } from 'react';

interface Resource {
  id: number;
  title: string;
  src?: string; // This should be the YouTube embed URL
  type: string;
}

const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<Resource[]>([]);
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
        const videoResources = data.filter(resource => resource.type === 'video');
        setVideos(videoResources);
      } catch (error) {
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <p className="text-gray-700">Loading videos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {videos.map((video) => (
        <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <iframe
            className="w-full h-56"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 truncate">{video.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
