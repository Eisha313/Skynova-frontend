import React from 'react';
import Sidebar from '../../../components/sidebarDashboard';
import Header from '../../../components/header';
import QuizManager from '../../../components/verbalcomponent';
import Link from 'next/link';


import EditQuiz from '../../../components/verbalquizedit';

const EditPage = ({params}:{
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
          <EditQuiz id={id}/>
        </main>
      </div>
    </div>
  );
};

export default EditPage;
