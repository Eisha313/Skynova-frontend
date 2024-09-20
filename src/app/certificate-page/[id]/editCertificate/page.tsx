
// 'use client';

// import React from 'react';
// import CertificateForm from '../../../components/certificateForm';
// import { useParams } from 'next/navigation';

// const EditCertificatePage: React.FC = () => {
//   const params = useParams();
//   const { id } = params;

//   // Ensure id is a string
//   const certificateId = Array.isArray(id) ? id[0] : id;

//   return <CertificateForm key={certificateId} id={certificateId} />;
// };

// export default EditCertificatePage;

'use client';

import React from 'react';
import CertificateDetails from '../../../components/certificateDetails'
import { useParams } from 'next/navigation';
import CertificateForm from '../../../components/certificateForm';





import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';


const ViewCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const certificateId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white overflow-auto">
        <CertificateForm key={certificateId} id={certificateId} />;
        </main>
      </div>
    </div>
  );
};

export default ViewCertificatePage;

