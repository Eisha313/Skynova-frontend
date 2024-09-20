
// 'use client';

// import Logo from './dashboardLogo';
// import NavItem from './NavItem';
// import { FaTachometerAlt, FaUser, FaQuestionCircle, FaPlane, FaCogs, FaTasks, FaBrain, FaBook } from 'react-icons/fa';
// import { usePathname } from 'next/navigation';
// import { DropdownProvider } from './DropdownContext';

// const Sidebar = () => {
//   const currentPath = usePathname();

//   return (
//     <DropdownProvider>
//       <div className="w-64 bg-gray-800 text-white flex flex-col h-screen overflow-y-auto">
//         <Logo />
//         <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
//         <NavItem href='/viewuser' text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
//           {/* <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} /> */}
//         </NavItem>
//         <NavItem href="/quizPage" text="Manage Quizzes" icon={<FaPlane />} currentPath={currentPath} />
//         <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
//         <NavItem href="/certificate-page" text="Manage Certificate" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
//           <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//         </NavItem>
//         <NavItem href="/view-resource"text="Manage Resources" icon={<FaTasks />} currentPath={currentPath}>
//           {/* <NavItem href="/addResource" text="Add Resource" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/view-resource" text="View Resource" icon={<FaBook />} currentPath={currentPath} /> */}
//         </NavItem>
//         <NavItem href="/community" text=" Manage Community" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem href="/notification/viewNotification" text="Manage Notification" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem href="/complaints/viewComplaints" text="Manage Complaints" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem href="/reports/viewReports" text="Manage Reports" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem href="/results/viewresults" text="Manage Results" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem href="/suggestion/viewsuggestion" text="Manage Suggestion" icon={<FaCogs />} currentPath={currentPath} />
       
//       </div>
//     </DropdownProvider>
//   );
// };

// export default Sidebar;
'use client';

import Logo from './dashboardLogo';
import NavItem from './NavItem';
import { FaTachometerAlt, FaUser, FaQuestionCircle, FaPlane, FaCogs, FaTasks, FaBrain, FaBook } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { DropdownProvider } from './DropdownContext';
import ThemeBackground from '../components/global/color'; // Import the ThemeBackground component

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <DropdownProvider>
      <div color="primary" 
     
      className="w-64 text-white-900 flex flex-col h-screen overflow-y-auto scroll-bg-blue-600 bg-eisha" >
        <div className='w-64' >
        <Logo />
        <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
        <NavItem href='/viewuser' text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
          {/* <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} /> */}
        </NavItem>
        <NavItem href="/quizPage" text="Manage Quizzes" icon={<FaPlane />} currentPath={currentPath} />
        <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
        <NavItem href="/certificate-page" text="Manage Certificate" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
          <NavItem href="/userRender/verbal" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/userRender/nonverbal" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
        </NavItem>
        <NavItem href="/view-resource" text="Manage Resources" icon={<FaTasks />} currentPath={currentPath}>
          {/* <NavItem href="/addResource" text="Add Resource" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/view-resource" text="View Resource" icon={<FaBook />} currentPath={currentPath} /> */}
        </NavItem>
        <NavItem href="/community" text="Manage Community" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/notification/viewNotification" text="Manage Notification" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/complaints/viewComplaints" text="Manage Complaints" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/reports/viewReports" text="Manage Reports" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/results/viewresults" text="Manage Results" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/suggestion/viewsuggestion" text="Manage Suggestion" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/userRender/view-resource" text="view resource" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/competencyEvaluation/competency" text="competency" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/userRender/verbal" text="Verbal Test" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem href="/userRender/viewCommunityQuestions" text="Community" icon={<FaCogs />} currentPath={currentPath} />
        </div>
      </div>
    </DropdownProvider>
  );
};

export default Sidebar;
