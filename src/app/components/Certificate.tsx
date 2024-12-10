
// import React from 'react';
// import Image from 'next/image';

// type CertificateProps = {
//   title: string;
//   description: string;
//   date: string;
// };

// const Certificate: React.FC<CertificateProps> = ({ title, description, date }) => {
//   const getStyles = () => {
//     if (title.toLowerCase().includes('basic')) {
//       return 'text-blue-700 border-blue-600';
//     } else if (title.toLowerCase().includes('medium')) {
//       return 'text-green-700 border-green-600';
//     } else if (title.toLowerCase().includes('advanced')) {
//       return 'text-orange-800 border-orange-600';
//     } else {
//       return 'text-blue-500 border-black'; 
//     }
//   };

//   const getTitleDescriptionColor = () => {
//     if (title.toLowerCase().includes('basic')) {
//       return 'text-blue-700';
//     } else if (title.toLowerCase().includes('medium')) {
//       return 'text-green-700';
//     } else if (title.toLowerCase().includes('advanced')) {
//       return 'text-orange-700';
//     } else {
//       return 'text-blue-500'; 
//     }
//   };

//   return (
//     <div className="relative p-12 max-w-3xl mx-auto shadow-lg overflow-hidden">
//       {/* Border Image */}
//       <div className="absolute inset-0">
//         <Image src="/border1.jpg" alt="Certificate Border" layout="fill" objectFit="fill" />
//       </div>

//       {/* Certificate Content */}
//       <div className="relative z-10 p-12 bg-white border-4 border-transparent rounded-3xl">
//         <div className="flex items-center mb-6">
//           <div className="relative mr-6">
//             <div className="w-32 h-32 bg-yellow-700 rounded-full flex items-center justify-center">
//               <Image src="/skylogo.svg" alt="Skynova Logo" width={120} height={120} />
//             </div>
//           </div>

//           <div className="flex-grow text-right">
//             <p className="text-lg font-serif italic">Date: {date}</p>
//           </div>
//         </div>

//         <div className="text-center mb-8">
//           <h1 className={`text-4xl font-serif font-bold mb-4 border-b-4 inline-block ${getStyles()}`}>
//             Certificate of Achievement
//           </h1>
//           <p className="text-lg font-sans mb-4 mt-4 text-black">
//             This is to certify that you have successfully completed the
//           </p>
//           <p className={`text-3xl font-serif font-semibold mb-4 ${getTitleDescriptionColor()}`}>{title}</p>
//           <p className="text-lg font-sans mb-6 text-black">mission exceptionally.</p>
//           <p className={`text-lg font-serif font-semibold mb-4 ${getTitleDescriptionColor()}`}>{description}</p>
//           <p className="text-lg font-sans text-black">And is therefore awarded this qualification with distinction.</p>
//         </div>

//         <div className="flex justify-between items-center mt-8">
//           <p className="text-lg font-sans italic text-blue-800">Skynova Projects</p>
//           <Image src="/s.svg" alt="Signature" width={100} height={100} className="h-24" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;
import React from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';

type CertificateProps = {
  title: string;
  description: string;
  date: string;
  qrValue: string; 
};

const Certificate: React.FC<CertificateProps> = ({ title, description, date, qrValue }) => {
  const getStyles = () => {
    if (title.toLowerCase().includes('basic')) {
      return 'text-blue-700 border-blue-600';
    } else if (title.toLowerCase().includes('medium')) {
      return 'text-blue-900 border-blue-600';
    } else if (title.toLowerCase().includes('advanced')) {
      return 'text-eisha border-eisha-600';
    } else {
      return 'text-blue-500 border-black'; 
    }
  };

  const getTitleDescriptionColor = () => {
    if (title.toLowerCase().includes('basic')) {
      return 'text-blue-700';
    } else if (title.toLowerCase().includes('medium')) {
      return 'text-blue-900';
    } else if (title.toLowerCase().includes('advanced')) {
      return 'text-eisha';
    } else {
      return 'text-blue-500'; 
    }
  };

  return (
    <div className="relative p-12 max-w-3xl mx-auto shadow-lg overflow-hidden">
      
      <div className="absolute inset-0">
        <Image src="/border1.jpg" alt="Certificate Border" layout="fill" objectFit="fill" />
      </div>

     
      <div className="relative z-10 p-12 bg-white border-4 border-transparent rounded-3xl">
        <div className="flex items-center mb-6">
          <div className="relative mr-6">
            <div className="w-32 h-32 bg-custom-image rounded-full flex items-center justify-center">
              <Image src="/skylogo.svg" alt="Skynova Logo" width={120} height={120} />
            </div>
          </div>

          <div className="flex-grow text-right">
            <p className="text-lg font-serif italic">Date: {date}</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-4xl font-serif font-bold mb-4 border-b-4 inline-block ${getStyles()}`}>
            Certificate of Achievement
          </h1>
          <p className="text-lg font-sans mb-4 mt-4 text-black">
            This is to certify that you have successfully completed the
          </p>
          <p className={`text-3xl font-serif font-semibold mb-4 ${getTitleDescriptionColor()}`}>{title}</p>
          <p className="text-lg font-sans mb-6 text-black">mission exceptionally.</p>
          <p className={`text-lg font-serif font-semibold mb-4 ${getTitleDescriptionColor()}`}>{description}</p>
          <p className="text-lg font-sans text-black">And is therefore awarded this qualification with distinction.</p>
        </div>

        
        <div className="flex justify-center mb-6">
          <div style={{ height: 'auto', maxWidth: '150px', width: '100%' }}>
            <QRCode
              size={128}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={qrValue} 
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>

        
        <div className="flex justify-between items-center mt-8">
          <p className="text-lg font-sans italic text-blue-800">Skynova Projects</p>
          <Image src="/s.svg" alt="Signature" width={100} height={100} className="h-24" />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
