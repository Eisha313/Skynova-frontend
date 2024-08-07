import React from 'react';
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header';

import NotificationList from '../../components/notifications/notificationComponent'

const NotificationPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />  
        <main className="flex-1 p-4 bg-white">
          <NotificationList />
        </main>
      </div>
    </div>
  );
};

export default NotificationPage;
