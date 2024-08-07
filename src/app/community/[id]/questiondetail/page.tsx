// import QuestionDetail from '../../../components/Community/QuestionDetail'

// const QuestionPage = ({ params }: { params: { id: string } }) => {
//     const { id } = params;
//     return <QuestionDetail id={id} />;
// };

// export default QuestionPage;'use client';
'use client'
import React from 'react';
import QuestionDetail from '../../../components/Community/QuestionDetail'
import { useParams } from 'next/navigation';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';
import ComplaintForm from '@/app/components/complaint/ComplaintForm';
import ComplaintDetail from '@/app/components/complaint/ComponentDetail';

const DetailComplaintPage: React.FC = () => {
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
          <QuestionDetail key={reportId} id={reportId} />
        </main>
      </div>
    </div>
  );
};

export default DetailComplaintPage;

