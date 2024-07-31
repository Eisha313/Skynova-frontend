// import React from 'react';
// import Sidebar from '../components/sidebarDashboard';
// import Header from '../components/header';
// import QuizManager from '../components/verbalcomponent';
// import Link from 'next/link';

// import ManageJets from '../components/manageJets';
// import ViewJets from '../components/viewjets';

// const VerbalPage: React.FC = () => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col">
//         <Header />  
        
        
//         <main className="flex-1 p-4 bg-white">
//           <ViewJets />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default VerbalPage;
import React from 'react';
import Sidebar from '../components/sidebarDashboard';
import Header from '../components/header';
import ViewJets from '../components/viewjets';

const VerbalPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 bg-white overflow-auto">
          <ViewJets />
        </main>
      </div>
    </div>
  );
};

export default VerbalPage;
