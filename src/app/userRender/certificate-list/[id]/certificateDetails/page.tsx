'use client';

import React from 'react';
import CertificateDetails from '@/app/userComponents/Quiz/certificate';
import { useParams } from 'next/navigation';






import Header from '@/app/components/LandingPage/header';

const ViewCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const certificateId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="flex h-screen overflow-hidden">
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-custom-image overflow-auto">
        <CertificateDetails id={certificateId as string} />
        </main>
      </div>
    </div>
  );
};

export default ViewCertificatePage;

