
'use client';

import React from 'react';

import { useParams,useRouter } from 'next/navigation';

import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';
import WingsResources from '@/app/components/wingsOfGlory/wingsResources';

const AddWingsPage: React.FC = () => {
 
  const router = useRouter();

  const handleClose = () => {
    router.back(); 
  };

 
  return (
  <div className="flex h-screen">
  <Sidebar />
  
  <div className="flex-1 flex flex-col">
    <Header />  
    
    
    <main className="flex-1 p-4 bg-white">
   < WingsResources  onClose={handleClose}/>
   
    </main>
  </div>
</div>
  )
};

export default AddWingsPage;

