'use client';

import React from 'react';
import ReportDetails from '../../../../components/reports/ReportDetails';
import { useParams } from 'next/navigation';
import Sidebar from '../../../../components/sidebarDashboard'
import Header from '../../../../components/header'
import ResultDetails from '@/app/components/results/resultDetails';

const DetailReportPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const reportId = Array.isArray(id) ? id[0] : id;

  return <div className="flex h-screen overflow-hidden">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <main className="flex-1 p-4 bg-white overflow-auto">
    <ResultDetails key={reportId} id={reportId} />;
    </main>
  </div>
</div>
};

export default DetailReportPage;