// pages/certificates.tsx
import React from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebarDashboard";

import ResultList from "@/app/components/results/ResultList";

const ViewResultPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-custom-image overflow-auto">
          <ResultList />
        </main>
      </div>
    </div>
  );
};

export default ViewResultPage;
