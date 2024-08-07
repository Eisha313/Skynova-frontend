'use client';

import React from 'react';
import ReportForm from '../../../../components/reports/ReportForm'
import { useParams } from 'next/navigation';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';

const EditReportPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const reportId = Array.isArray(id) ? id[0] : id;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white overflow-auto">
          <ReportForm key={reportId} id={reportId} />
        </main>
      </div>
    </div>
  );
};

export default EditReportPage;

