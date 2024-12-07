'use client'
import React from 'react';
import Sidebar from '@/app/components/sidebarDashboard';
import AviatorForm from '../../../components/addaviator'
import Header from '@/app/components/header';
import { useParams } from 'next/navigation';

const EditAviatorPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  
  const aviatorId = Array.isArray(id) ? id[0] : id;

  return(
  //  <AviatorForm id={aviatorId} />;
  <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-custom-image">
        <AviatorForm id={aviatorId} />
        </main>
      </div>
    </div>
  )
};

export default EditAviatorPage;
