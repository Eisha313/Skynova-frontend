import Sidebar from '@/app/components/sidebarDashboard';
import Header from '@/app/components/header';
import HeroesTable from '@/app/components/wingsOfGlory/heroTable';
import WingsResourcesTable from '@/app/components/wingsOfGlory/wingsResourcesTable';

const ResourcePage: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 bg-gray-50 overflow-auto">
                    <WingsResourcesTable />
                </main>
            </div>
        </div>
    );
};

export default ResourcePage;