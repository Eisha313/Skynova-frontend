
'use client'
import React from 'react';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';
import { useParams } from 'next/navigation';
import Result from '@/app/userComponents/Quiz/quizResult';


const EditQuizPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  
  const aviatorId = Array.isArray(id) ? id[0] : id;

  return(
  
  <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-[#212C44]">
        <Result id={aviatorId} />
        </main>
      </div>
    </div>
  )
};

export default EditQuizPage;
