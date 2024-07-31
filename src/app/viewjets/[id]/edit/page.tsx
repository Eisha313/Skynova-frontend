import React from 'react';
import Sidebar from '../../../components/sidebarDashboard';
import Header from '../../../components/header';
import QuizManager from '../../../components/verbalcomponent';

import EditJetPage from '../../../components/editjet';

const VerbalPage = ({params}:{
    params:{
        id:string
    }
}) => {

    const {id} = params;
    console.log("userId",id)
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-white">
          <EditJetPage id={id}/>
        </main>
      </div>
    </div>
  );
};

export default VerbalPage;
