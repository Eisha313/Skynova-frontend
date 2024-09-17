import React from 'react';
import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebarDashboard';



import QuizAttempt from '@/app/userComponents/verbal/QuizAttempt';

const EditPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    console.log('userTitle', id);
  
    return (
      <div className="flex h-screen">
        <Sidebar />
  
        <div className="flex-1 flex flex-col">
          <Header />
  
          <main className="flex-1 p-4 bg-white">
            <QuizAttempt id={id} />
          </main>
        </div>
      </div>
    );
  };
  
  export default EditPage;
  