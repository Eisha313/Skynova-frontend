
import React from 'react';
import AviatorForm from '../components/addaviator';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';

const CreateAviatorPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-custom-image overflow-auto">
          <AviatorForm />
        </main>
      </div>
    </div>
  );
};

export default CreateAviatorPage;

