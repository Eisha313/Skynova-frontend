
'use client';

import React from 'react';
import CertificateForm from '../../../components/certificateForm';
import { useParams } from 'next/navigation';
import ResourceForm from '@/app/components/addResources';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';

const EditCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const editId = Array.isArray(id) ? id[0] : id;

  return (
  <div className="flex h-screen">
  <Sidebar />
  
  <div className="flex-1 flex flex-col">
    <Header />  
    
    
    <main className="flex-1 p-4 bg-white">
   < ResourceForm key={editId} id={editId} />
    </main>
  </div>
</div>
  )
};

export default EditCertificatePage;

