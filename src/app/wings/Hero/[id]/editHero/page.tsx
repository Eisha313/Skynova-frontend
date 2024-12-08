
'use client';

import React from 'react';

import { useParams,useRouter } from 'next/navigation';

import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';
import AddHero from '@/app/components/wingsOfGlory/addHero';

const EditHeroPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const handleClose = () => {
    router.back(); 
  };

  const editId = Array.isArray(id) ? id[0] : id;

  return (
  <div className="flex h-screen">
  <Sidebar />
  
  <div className="flex-1 flex flex-col">
    <Header />  
    
    
    <main className="flex-1 p-4 bg-custom-image ">
   < AddHero  heroId={editId} onClose={handleClose}/>
   
    </main>
  </div>
</div>
  )
};

export default EditHeroPage;

