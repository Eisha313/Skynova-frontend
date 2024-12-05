import React from 'react';
import Sidebar from '../../../components/sidebarDashboard';
import Header from '../../../components/header';

import Link from 'next/link';



import QuizEditSimple from '../../../components/quizedit';

const EditPageSimple = ({params}:{
    params:{
        id:string
    }
}) => {

    const {id} = params;
    console.log("userTitle",id)
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />  
        
        
        <main className="flex-1 p-4 bg-white">
          <QuizEditSimple id={id}/>
        </main>
      </div>
    </div>
  );
};

export default EditPageSimple;
