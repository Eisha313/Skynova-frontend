'use client';
import { useState } from 'react';
import ManageNonverbalQuizzes from '../components/manageNonverbalQuizzes';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';


const NonverbalQuizManager = () => {
  const [showQuizForm, setShowQuizForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      
      <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-white">
        <ManageNonverbalQuizzes onAddQuiz={() => setShowQuizForm(true)} />
        </main>
      </div>
    </div>
      
      
      
    </div>
  );
};



const NonverbalPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-white">
          <NonverbalQuizManager />
        </main>
      </div>
    </div>
  );
};

export default NonverbalPage;
