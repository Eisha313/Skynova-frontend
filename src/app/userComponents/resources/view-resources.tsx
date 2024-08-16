// import React from 'react';
// import VideoSection from './video-resource';
// import DocumentSection from './document-resource';

// const ResourcePage: React.FC = () => {
//   return (
//     <div className="p-6">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 flex align-center">Resources</h1>
//         <p className="text-gray-600">Explore our resources categorized by type.</p>
//       </header>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h2>
//         <VideoSection />
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documents</h2>
//         <DocumentSection />
//       </section>
//     </div>
//   );
// };

// export default ResourcePage;







import React from 'react';
import VideoSection from './video-resource';
import DocumentSection from './document-resource';

const ResourcePage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-700 text-lg">Explore our resources categorized by type. Browse through videos and documents to find the information you need.</p> 
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Videos</h2>
        <VideoSection />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Documents</h2>
        <DocumentSection />
      </section>
    </div>
  );
};

export default ResourcePage;
