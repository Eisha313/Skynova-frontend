// app/dashboard/page.tsx
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import Footer from '../components/footer';
import  Dashboard from '../components/dashboardLayout'

const DashboardPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white">
        <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
