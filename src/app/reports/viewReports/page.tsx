// pages/certificates.tsx
import React from 'react';
import Sidebar from '../../components/sidebarDashboard';
import Header from '../../components/header';


import ReportsList from '../../components/reports/ReportsList';

const AddNotificationPage: React.FC = () => {
  
    
    
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-white overflow-auto">
              <ReportsList />
            </main>
          </div>
        </div>
      );
    };
    
    export default AddNotificationPage;
    


