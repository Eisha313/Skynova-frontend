import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import ResourceList from '../components/resourceList'

const ResourcePage: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 bg-gray-50 overflow-auto">
                    <ResourceList />
                </main>
            </div>
        </div>
    );
};

export default ResourcePage;
