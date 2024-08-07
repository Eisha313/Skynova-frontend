// pages/certificates.tsx
import React from 'react';
import Sidebar from '../../components/sidebarDashboard';
import Header from '../../components/header';

import NotificationForm from '../../components/notifications/NotificationForm'
import ReportForm from '../../components/reports/ReportForm'

const AddReportPage: React.FC = () => {
  
    
    
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-white overflow-auto">
              <ReportForm />
            </main>
          </div>
        </div>
      );
    };
    
    export default AddReportPage;
    



