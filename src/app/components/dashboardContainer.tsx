import React from 'react';

interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 space-y-4">
      {children}
    </div>
  );
};

export default DashboardContainer;
