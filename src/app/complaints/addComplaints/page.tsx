import React from 'react';
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header'

import ComplaintList from '@/app/components/complaint/ComplaintList';
import ComplaintForm from '@/app/components/complaint/ComplaintForm';

const   ComplaintPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />  
        <main className="flex-1 p-4 bg-white">
          <ComplaintForm />
        </main>
      </div>
    </div>
  );
};

export default ComplaintPage;
