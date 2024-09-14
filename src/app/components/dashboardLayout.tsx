
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
          axios.get(`${baseURL}/aviators/countAviators`,{ withCredentials: true }),
          axios.get(`${baseURL}/jets/countJets`,{ withCredentials: true }),
          axios.get(`${baseURL}/cockpits/countCockpits`,{ withCredentials: true }),
          axios.get(`${baseURL}/missions/countMissions`,{ withCredentials: true }),
          axios.get(`${baseURL}/quizzes/countQuizzes`,{ withCredentials: true }),
          axios.get(`${baseURL}/resources/countResources`,{ withCredentials: true }),
          axios.get(`${baseURL}/suggestions/countSuggestions`,{ withCredentials: true }),
         
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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
           
            window.location.href = '/login';
          } else {
            console.error('Error fetching dashboard stats:', error.response?.data || error.message);
          }
        } else {
          
          console.error('Unexpected error:', error);
        }
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
            heading="Manage Aviators"
            count={stats.totalAviators}
            link="/viewuser"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Jets"
            count={stats.totalJets}
            link="/viewjets"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Cockpits"
            count={stats.totalCockpits}
            link="/cockpits"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Missions"
            count={stats.totalMissions}
            link="/missions"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Quizzes"
            count={stats.totalQuizzes}
            link="/quizPage"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Resources"
            count={stats.totalResources}
            link="/view-resource"
          />
          <InfoContainer
            icon={<FaQuestionCircle />}
            heading="Manage Suggestions"
            count={stats.totalSuggestions}
            link="/suggestion/viewsuggestion"
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
