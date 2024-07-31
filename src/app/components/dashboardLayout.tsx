import React from 'react';
import DashboardContainer from './dashboardContainer';
import InfoContainer from './infocontainer';
import { FaTachometerAlt, FaUser, FaQuestionCircle } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <div className="p-90">
      <DashboardContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <InfoContainer
            icon={<FaTachometerAlt />}
            heading="Total Users"
            count={42} 
            link="/dashboard/details"
          />
          <InfoContainer
            icon={<FaUser />}
            heading="Total Aviators"
            count={123} 
            link="/users"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Jets"
            count={56} 
            link="/questions"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Cockpits"
            count={56} 
            link="/questions"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Missions"
            count={56} 
            link="/questions"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Quizzes"
            count={56} 
            link="/questions"
          />
           <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Resource"
            count={56} 
            link="/questions"
          />
        </div>
      </DashboardContainer>
      
    </div>
  );
};

export default Dashboard;
