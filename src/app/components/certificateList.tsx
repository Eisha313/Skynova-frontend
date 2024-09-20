
// 'use client';

// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Search from './Search'
// import DownloadPDF from './DownloadCertificates'

// type Certificate = {
//   _id: string;
//   id: number;
//   type: string;
//   description: string;
// };

// const CertificateList: React.FC = () => {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [filteredCertificate, setFilteredCertificate] = useState<Certificate[]>([]);

//   useEffect(() => {
//     fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificates',{ credentials: 'include',})
//       .then((res) => res.json())
//       .then((data) => setCertificates(data))
//       .catch((error) => console.error('Error fetching certificates:', error));
//   }, []);

//   const deleteCertificate = (id: string) => {
//     fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/deleteCertificate/${id}`, { method: 'DELETE' , credentials: 'include',})
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message === 'Certificate deleted successfully') {
//           setCertificates(certificates.filter((certificate) => certificate._id !== id));
//         }
//       })
//       .catch((error) => console.error('Error deleting certificate:', error));
//   };
//   const handleSearchChange = (searchTerm: string) => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     const filtered = certificates.filter(certificate =>
//       certificate.type.toLowerCase().includes(lowerCaseSearchTerm) ||
//       certificate.description.toLowerCase().includes(lowerCaseSearchTerm) 
      
//     );
//     setFilteredCertificate(filtered);
//   };
 

//   return (
//     <div className="container mx-auto p-4">
//        <div className="flex flex-wrap justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">All Certificates</h1>
//         <div className="flex flex-wrap  space-x-4">
          
//           <Search onSearchChange={handleSearchChange} />
//           {/* <Sort onSortChange={handleSortChange} /> */}
//           {/* <Filter onFilterChange={handleFilterChange}/> */}
//           <DownloadPDF certificates={certificates} />
//           <Link 
//             href="/add-certificate" 
//             className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center"
          
//           >
//             Add Cerificate
//           </Link>
//         </div>
//       </div>
       
//       <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {certificates.map((certificate) => (
//           <div key={certificate._id} className="relative bg-white shadow-md rounded p-4 mb-4 border border-gray-300">
//             <h3 className="text-xl font-semibold">{certificate.type}</h3>
//             <p>{certificate.description}</p>
//             <div className="absolute right-4 top-4 flex space-x-2">
//               <Link href={`/certificate-page/${certificate._id}/editCertificate`} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
//                 <FaEdit className="text-gray-700" />
//               </Link>
//               <button onClick={() => deleteCertificate(certificate._id)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
//                 <FaTrash className="text-gray-700" />
//               </button>
//               <Link href={`/certificate-page/${certificate._id}/certificateDetails`} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
//                 <FaEye className="text-gray-700" />
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CertificateList;
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import DownloadPDF from './DownloadCertificates';

type Certificate = {
  _id: string;
  id: number;
  type: string;
  description: string;
};

const CertificateList: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificate, setFilteredCertificate] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificates', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((error) => console.error('Error fetching certificates:', error));
  }, []);

  const deleteCertificate = (id: string) => {
    fetch(`https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/deleteCertificate/${id}`, { method: 'DELETE', credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Certificate deleted successfully') {
          setCertificates(certificates.filter((certificate) => certificate._id !== id));
        }
      })
      .catch((error) => console.error('Error deleting certificate:', error));
  };

  const handleSearchChange = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = certificates.filter(certificate =>
      certificate.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      certificate.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredCertificate(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredCertificate(certificates);
  };

  // Render either filtered certificates or the entire list based on search input
  const certificatesToRender = filteredCertificate.length > 0 ? filteredCertificate : certificates;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Certificates</h1>
        <div className="flex flex-wrap space-x-4">
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} clearSearch={clearSearch} />
          <DownloadPDF certificates={certificates} />
          <Link href="/add-certificate" className="px-4 py-2 rounded-md text-center bg-eisha text-white flex iem-center">
            Add Certificate
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {certificatesToRender.map((certificate) => (
          <div key={certificate._id} className="relative bg-white shadow-md rounded p-4 mb-4 border border-gray-300">
            <h3 className="text-xl font-semibold">{certificate.type}</h3>
            <p>{certificate.description}</p>
            <div className="absolute right-4 top-4 flex space-x-2">
              <Link href={`/certificate-page/${certificate._id}/editCertificate`} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                <FaEdit className="text-gray-700" />
              </Link>
              <button onClick={() => deleteCertificate(certificate._id)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                <FaTrash className="text-gray-700" />
              </button>
              <Link href={`/certificate-page/${certificate._id}/certificateDetails`} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 border border-gray-400">
                <FaEye className="text-gray-700" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;
