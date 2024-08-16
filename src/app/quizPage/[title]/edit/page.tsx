import React from 'react';
import Sidebar from '../../../components/sidebarDashboard';
import Header from '../../../components/header';

import Link from 'next/link';



import QuizEditSimple from '../../../components/quizedit';

const EditPageSimple = ({params}:{
    params:{
        title:string
    }
}) => {

    const {title} = params;
    console.log("userTitle",title)
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-white">
          <QuizEditSimple title={title}/>
        </main>
      </div>
    </div>
  );
};

export default EditPageSimple;
