
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DashboardContainer from './dashboardContainer';
// import InfoContainer from './infocontainer';
// import { FaUser, FaQuestionCircle } from 'react-icons/fa';
// import { ChartComponent } from '@/components/barChartComponent';
// import { PieChartComponent } from '@/components/pieChartComponent';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.18.54:3000';

// interface Stats {
//   totalAviators: number;
//   totalJets: number;
//   totalCockpits: number;
//   totalMissions: number;
//   totalQuizzes: number;
//   totalResources: number;
//   totalSuggestions: number;
// }

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<Stats>({
//     totalAviators: 0,
//     totalJets: 0,
//     totalCockpits: 0,
//     totalMissions: 0,
//     totalQuizzes: 0,
//     totalResources: 0,
//     totalSuggestions: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [
//           aviatorsRes,
//           jetsRes,
//           cockpitsRes,
//           missionsRes,
//           quizzesRes,
//           resourcesRes,
//           suggestionsRes,
//         ] = await Promise.all([
//           axios.get(`${baseURL}/aviators/countAviators`),
//           axios.get(`${baseURL}/jets/countJets`),
//           axios.get(`${baseURL}/cockpits/countCockpits`),
//           axios.get(`${baseURL}/missions/countMissions`),
//           axios.get(`${baseURL}/quizzes/countQuizzes`),
//           axios.get(`${baseURL}/resources/countResources`),
//           axios.get(`${baseURL}/suggestions/countSuggestions`),
//         ]);

//         console.log('Aviators:', aviatorsRes.data);
//         console.log('Jets:', jetsRes.data);
//         console.log('Cockpits:', cockpitsRes.data);
//         console.log('Missions:', missionsRes.data);
//         console.log('Quizzes:', quizzesRes.data);
//         console.log('Resources:', resourcesRes.data);
//         console.log('Suggestions:', suggestionsRes.data);

//         setStats({
//           totalAviators: aviatorsRes.data['Aviator Count'],
//           totalJets: jetsRes.data['Jet Count'],
//           totalCockpits: cockpitsRes.data['Cockpit Count'],
//           totalMissions: missionsRes.data['Mission Count'],
//           totalQuizzes: quizzesRes.data['Quiz Count'],
//           totalResources: resourcesRes.data['Resource Count'],
//           totalSuggestions: suggestionsRes.data['Suggestion Count'],
//         });
//       } catch (error) {
//         console.error('Error fetching dashboard stats:', error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="p-4">
//       <DashboardContainer>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           <InfoContainer
//             icon={<FaUser />}
//             heading="Total Aviators"
//             count={stats.totalAviators}
//             link="/viewuser"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Jets"
//             count={stats.totalJets}
//             link="/jets"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Cockpits"
//             count={stats.totalCockpits}
//             link="/cockpits"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Missions"
//             count={stats.totalMissions}
//             link="/missions"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Quizzes"
//             count={stats.totalQuizzes}
//             link="/quizzes"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Resources"
//             count={stats.totalResources}
//             link="/viewresources"
//           />
//           <InfoContainer
//             icon={<FaQuestionCircle />}
//             heading="Total Suggestions"
//             count={stats.totalSuggestions}
//             link="/suggestions"
//           />
//         </div>
//         <div className="mt-8 flex justify-center">
//           <div className="w-full max-w-4xl">
//             <ChartComponent />
//           </div>
//         </div>
//         <div className="mt-8 flex justify-center">
//           <div className="w-full max-w-4xl">
//             <PieChartComponent />
//           </div>
//         </div>
//       </DashboardContainer>
//     </div>
//   );
// };

// export default Dashboard;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardContainer from './dashboardContainer';
import InfoContainer from './infocontainer';
import { FaUser, FaQuestionCircle } from 'react-icons/fa';
import { ChartComponent } from '@/components/barChartComponent';
import { PieChartComponent } from '@/components/pieChartComponent';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://h192.168.18.54:3000';
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sky-nova-8ccaddc754ce.herokuapp.com';

interface Stats {
  totalAviators: number;
  totalJets: number;
  totalCockpits: number;
  totalMissions: number;
  totalQuizzes: number;
  totalResources: number;
  totalSuggestions: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalAviators: 0,
    totalJets: 0,
    totalCockpits: 0,
    totalMissions: 0,
    totalQuizzes: 0,
    totalResources: 0,
    totalSuggestions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          aviatorsRes,
          jetsRes,
          cockpitsRes,
          missionsRes,
          quizzesRes,
          resourcesRes,
          suggestionsRes,
        ] = await Promise.all([
          axios.get(`${baseURL}/aviators/countAviators`),
          axios.get(`${baseURL}/jets/countJets`),
          axios.get(`${baseURL}/cockpits/countCockpits`),
          axios.get(`${baseURL}/missions/countMissions`),
          axios.get(`${baseURL}/quizzes/countQuizzes`),
          axios.get(`${baseURL}/resources/countResources`),
          axios.get(`${baseURL}/suggestions/countSuggestions`),
        ]);

        console.log('Aviators:', aviatorsRes.data);
        console.log('Jets:', jetsRes.data);
        console.log('Cockpits:', cockpitsRes.data);
        console.log('Missions:', missionsRes.data);
        console.log('Quizzes:', quizzesRes.data);
        console.log('Resources:', resourcesRes.data);
        console.log('Suggestions:', suggestionsRes.data);

        setStats({
          totalAviators: aviatorsRes.data.aviatorCount,
          totalJets: jetsRes.data['Jet Count'],
          totalCockpits: cockpitsRes.data['Cockpit Count'],
          totalMissions: missionsRes.data['mission Count'],
          totalQuizzes: quizzesRes.data['Quiz Count'],
          totalResources: resourcesRes.data['Resource Count'],
          totalSuggestions: suggestionsRes.data['Suggestion Count'],
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4">
      <DashboardContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <InfoContainer
            icon={<FaUser />}
            heading="Total Aviators"
            count={stats.totalAviators}
            link="/viewuser"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Jets"
            count={stats.totalJets}
            link="/jets"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Cockpits"
            count={stats.totalCockpits}
            link="/cockpits"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Missions"
            count={stats.totalMissions}
            link="/missions"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Quizzes"
            count={stats.totalQuizzes}
            link="/quizzes"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Resources"
            count={stats.totalResources}
            link="/viewresources"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Total Suggestions"
            count={stats.totalSuggestions}
            link="/suggestions"
          />
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-4xl">
            <ChartComponent />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-4xl">
            <PieChartComponent />
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
