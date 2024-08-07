import React from 'react';
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header';

import NotificationList from '../../components/notifications/notificationComponent'
import ComplaintList from '@/app/components/complaint/ComplaintList';

const   ComplaintPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />  
        <main className="flex-1 p-4 bg-white">
          <ComplaintList />
        </main>
      </div>
    </div>
  );
};

export default ComplaintPage;
