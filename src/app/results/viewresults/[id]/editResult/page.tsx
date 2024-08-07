'use client';

import React from 'react';
import ResultForm from '@/app/components/results/ResultForm';
import { useParams } from 'next/navigation';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';

const EditResultPage: React.FC = () => {
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
          <ResultForm key={reportId} id={reportId} />
        </main>
      </div>
    </div>
  );
};

export default EditResultPage;

