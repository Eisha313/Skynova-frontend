import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import NonverbalQuizManager from '../components/NonverbalQuizManager';
import MedicalList from '../components/medicalDetailsList';

const NonverbalPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-custom-image">
          <MedicalList/>
        </main>
      </div>
    </div>
  );
};

export default NonverbalPage;
