// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Certificate from './Certificate'; // Import the Certificate component

// type Certificate = {
//   _id: string;
//   type: string;
//   title:string;
//   description: string;
// };

// interface CertificateDetailsProps {
//   id: string;
// }

// const CertificateDetails: React.FC<CertificateDetailsProps> = ({ id }) => {
//   const [certificate, setCertificate] = useState<Certificate | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:4000/certificates/viewCertificate/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           // Since the backend returns a single object, set it directly
//           if (data && data._id) {
//             setCertificate(data);
//           } else {
//             setError('Certificate not found');
//             console.error('Certificate not found');
//           }
//         })
//         .catch((error) => {
//           setError('Error fetching certificate');
//           console.error('Error fetching certificate:', error);
//         });
//     }
//   }, [id]);

//   if (error) return <div>{error}</div>;
//   if (!certificate) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Certificate Details</h2>
//       <div >
//         <button className='flex justify-end'>
//           Generate a certificate
//         </button>
//       </div>
//       <div className="bg-white shadow-md rounded p-4">
//         <Certificate
//           title={certificate.type}
//           description={certificate.description}
//           date={new Date().toLocaleDateString()}
         
//         />
//       </div>
//       <button
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={() => router.push('/certificate-page')}
//       >
//         Back to Certificates
//       </button>
//     </div>
//   );
// };

// export default CertificateDetails;
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import Certificate from './Certificate'; 

type Certificate = {
  _id: string;
  type: string;
  title: string;
  description: string;
};

interface CertificateDetailsProps {
  id: string;
}

const CertificateDetails: React.FC<CertificateDetailsProps> = ({ id }) => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificate/${id}`)
        .then((res) => res.json())
        .then((data) => {
          
          if (data && data._id) {
            setCertificate(data);
          } else {
            setError('Certificate not found');
            console.error('Certificate not found');
          }
        })
        .catch((error) => {
          setError('Error fetching certificate');
          console.error('Error fetching certificate:', error);
        });
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  if (error) return <div>{error}</div>;
  if (!certificate) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Certificate Details</h2>
      <div className="flex justify-end mb-4">
        <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded">
          Download Certificate
        </button>
      </div>
      <div ref={certificateRef} className="bg-white shadow-md rounded p-4">
        <Certificate
          title={certificate.type}
          description={certificate.description}
          date={new Date().toLocaleDateString()}
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push('/certificate-page')}
      >
        Back to Certificates
      </button>
    </div>
  );
};

export default CertificateDetails;
