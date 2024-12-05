
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useUser } from '@/app/components/context/userContext';
// import { useRouter } from 'next/navigation';

// type CertificateProps = {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
// };

// const Certificate: React.FC<CertificateProps> = ({ _id, title, description, date }) => {
//   const getStyles = () => {
//     if (title.toLowerCase().includes('basic')) {
//       return 'text-blue-700 border-blue-600';
//     } else if (title.toLowerCase().includes('medium')) {
//       return 'text-yellow-700 border-yellow-600';
//     } else if (title.toLowerCase().includes('advanced')) {
//       return 'text-green-700 border-green-600';
//     }
//     return 'text-gray-700 border-gray-600';
//   };

//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/userRender/certificate-list/${_id}/certificateDetails`);
//   };

//   return (
//     <div
//       className={`border p-4 rounded-lg shadow cursor-pointer hover:shadow-lg ${getStyles()}`}
//       onClick={handleClick}
//     >
//       <h2 className="font-bold text-lg">{title}</h2>
//       <p>{description}</p>
//       <small>Issued on: {date}</small>
//     </div>
//   );
// };

// const CertificatesList: React.FC = () => {
//   const { firstName, lastName, token,_id } = useUser();
//   const [certificates, setCertificates] = useState([]);

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         // const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificates', {
//           const response = await fetch('http://localhost:4000/certificates/viewCertificates', {  
//         headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCertificates(data);
//         } else {
//           console.error('Failed to fetch certificates');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     if (token) fetchCertificates();
//   }, [token]);

//   if (!certificates.length) {
//     return <p className="text-white text-center bg-gray-800 p-4 rounded-lg shadow-md">No certificates available yet. Complete quizzes to earn certificates!</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
//       {certificates.map((cert: any) => (
//         <Certificate
//           key={cert._id}
//           _id={cert._id}
//           title={cert.type}
//           description={`${cert.description} - Awarded to ${firstName || 'User'} ${lastName || ''}`}
//           date={new Date(cert.createdAt).toLocaleDateString()}
//         />
//       ))}
//     </div>
//   );
// };

// export default CertificatesList;
'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/components/context/userContext';
import { useRouter } from 'next/navigation';

type CertificateProps = {
  _id: string;
  title: string;
  description: string;
  date: string;
};

const Certificate: React.FC<CertificateProps> = ({ _id, title, description, date }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/userRender/certificate-list/${_id}/certificateDetails`);
  };

  return (
    <div className="flex justify-between items-center p-4 mb-8 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg border border-gray-600 cursor-pointer">
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-sm">{description}</p>
        <small className="text-gray-400">Issued on: {date}</small>
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        View Certificate
      </button>
    </div>
  );
};

const CertificatesList: React.FC = () => {
  const { firstName, lastName, token } = useUser();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('http://localhost:4000/certificates/viewCertificates', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCertificates(data);
        } else {
          console.error('Failed to fetch certificates');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (token) fetchCertificates();
  }, [token]);

  if (!certificates.length) {
    return (
      <p className="text-white text-center bg-gray-800 p-4 rounded-lg shadow-md">
        No certificates available yet. Complete quizzes to earn certificates!
      </p>
    );
  }

  return (
    <div className="mt-10 px-4">
      {certificates.map((cert: any) => (
        <Certificate
          key={cert._id}
          _id={cert._id}
          title={cert.type}
          description={`
           
          Awarded to
           ${cert.description} 
           

          
           `}
          date={new Date(cert.createdAt).toLocaleDateString()}
        />
      ))}
    </div>
    
  );
};

export default CertificatesList;
