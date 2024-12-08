// pages/certificates.tsx
import React from "react";
import Sidebar from "../../components/sidebarDashboard";
import Header from "../../components/header";

import ReportsList from "../../components/reports/ReportsList";
// import SuggestionList from '@/app/components/results/ResultList';
import SuggestionsList from "@/app/components/suggestion/SuggestionList";
const ViewSuggestionPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white overflow-auto">
          <SuggestionsList />
        </main>
      </div>
    </div>
  );
};

export default ViewSuggestionPage;
