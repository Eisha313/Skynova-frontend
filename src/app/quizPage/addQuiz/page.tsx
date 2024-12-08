// pages/createCertificate.tsx
import React from 'react';
// import CertificateForm from '../components/certificateForm';
import Sidebar from '../../components/sidebarDashboard';
import Header from '../../components/header'

import QuizForm from '@/app/components/quizform';





const CertificatesPage: React.FC = () => {
  
    
    
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-custom-image overflow-auto">
              <QuizForm />
            </main>
          </div>
        </div>
      );
    };
    
    export default CertificatesPage;
    





