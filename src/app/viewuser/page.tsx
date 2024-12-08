import React from "react";
import Sidebar from "../components/sidebarDashboard";
import Header from "../components/header";
import ManageUsers from "../components/viewuser";

const VerbalPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-4 bg-custom-image w-full">
          <ManageUsers />
        </main>
      </div>
    </div>
  );
};

export default VerbalPage;
