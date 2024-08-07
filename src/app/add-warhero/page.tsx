import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import WarHeroForm from '../components/WarHeroForm';
 

const QuizPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />  
        <main className="flex-1 p-4 bg-white">
          <WarHeroForm />
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
