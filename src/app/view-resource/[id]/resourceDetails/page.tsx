
'use client'
import { useParams } from 'next/navigation';
import ResourceDetails from '../../../components/resourceDetails';
import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';

interface Params {
  id: string;
}

const ViewResourceDetailsPage = () => {
  const params = useParams() as unknown as Params;
  const { id } = params;

  return (
  <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-white">
        <ResourceDetails id={id} />
        </main>
      </div>
    </div>
  )
};
export default ViewResourceDetailsPage;

