// pages/certificates.tsx
import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import ViewJets from '../components/viewjets';
import CertificateList from '../components/certificateList';

const CertificatesPage: React.FC = () => {
  
    
    
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-custom-image overflow-auto">
              <CertificateList />
            </main>
          </div>
        </div>
      );
    };
    
    export default CertificatesPage;
    



