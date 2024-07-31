// 'use client'

// import Logo from './dashboardLogo';
// import NavItem from './NavItem';
// import { FaTachometerAlt, FaUser, FaQuestionCircle, FaPlane, FaCogs, FaTasks, FaBrain, FaBook } from 'react-icons/fa';
// import { usePathname } from 'next/navigation';

// const Sidebar = () => {
//   const currentPath = usePathname();

//   return (
//     <div className="w-64 bg-gray-800 text-white flex flex-col">
//       <Logo />
//       <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
//       <NavItem text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
//         <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//       <NavItem text="Manage Quizzes" icon={<FaQuestionCircle />} currentPath={currentPath}>
//         <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//       <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
//       <NavItem href="/manage-environments" text="Manage Environments" icon={<FaCogs />} currentPath={currentPath} />
//       <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
//         <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//     </div>
//   );
// };

// export default Sidebar;













// 'use client'

// import Logo from './dashboardLogo';
// import NavItem from './NavItem';
// import { FaTachometerAlt, FaUser, FaQuestionCircle, FaPlane, FaCogs, FaTasks, FaBrain, FaBook } from 'react-icons/fa';
// import { usePathname } from 'next/navigation';

// const Sidebar = () => {
//   const currentPath = usePathname();

//   return (
//     <div className="w-64 bg-gray-800 text-white flex flex-col">
//       <Logo />
//       <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
//       <NavItem text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
//         <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//       <NavItem text="Manage Quizzes" icon={<FaQuestionCircle />} currentPath={currentPath}>
//         <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//       <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
//       <NavItem href="/manage-environments" text="Manage Environments" icon={<FaCogs />} currentPath={currentPath} />
//       <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
//         <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//         <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//       </NavItem>
//     </div>
//   );
// };

// export default Sidebar;



// 'use client';

// import Logo from './dashboardLogo';
// import NavItem from './NavItem';
// import { FaTachometerAlt, FaUser, FaQuestionCircle, FaPlane, FaCogs, FaTasks, FaBrain, FaBook } from 'react-icons/fa';
// import { usePathname } from 'next/navigation';
// import { DropdownProvider } from './DropdownContext'; // Import the provider

// const Sidebar = () => {
//   const currentPath = usePathname();

//   return (
//     <DropdownProvider>
//       <div className="w-64 bg-gray-800 text-white flex flex-col">
//         <Logo />
//         <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
//         <NavItem text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
//           <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} />
//         </NavItem>
//         <NavItem text="Manage Quizzes" icon={<FaQuestionCircle />} currentPath={currentPath}>
//           <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//         </NavItem>
//         <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
//         <NavItem href="/manage-environments" text="Manage Environments" icon={<FaCogs />} currentPath={currentPath} />
//         <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
//           <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
//           <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
//         </NavItem>
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

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <DropdownProvider>
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <Logo />
        <NavItem href="/dashboard" text="Dashboard" icon={<FaTachometerAlt />} currentPath={currentPath} />
        <NavItem text="Manage Users" icon={<FaUser />} currentPath={currentPath}>
          <NavItem href="/viewuser" text="View User" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/addaviator" text="Add User" icon={<FaBook />} currentPath={currentPath} />
        </NavItem>
        <NavItem text="Manage Quizzes" icon={<FaQuestionCircle />} currentPath={currentPath}>
          <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
        </NavItem>
        <NavItem href="/viewjets" text="Manage Jets" icon={<FaPlane />} currentPath={currentPath} />
        <NavItem href="/manage-environments" text="Manage Environments" icon={<FaCogs />} currentPath={currentPath} />
        <NavItem text="Manage Aptitude Tests" icon={<FaTasks />} currentPath={currentPath}>
          <NavItem href="/verbalquiz" text="Verbal Quiz" icon={<FaBrain />} currentPath={currentPath} />
          <NavItem href="/nonverbalquiz" text="NonVerbal Quiz" icon={<FaBook />} currentPath={currentPath} />
        </NavItem>
      </div>
    </DropdownProvider>
  );
};

export default Sidebar;
