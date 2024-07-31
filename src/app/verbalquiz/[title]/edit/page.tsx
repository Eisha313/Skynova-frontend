import React from 'react';
import Sidebar from '../../../components/sidebarDashboard';
import Header from '../../../components/header';
import QuizManager from '../../../components/verbalcomponent';
import Link from 'next/link';


import EditQuiz from '../../../components/verbalquizedit';

const EditPage = ({params}:{
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
          <EditQuiz title={title}/>
        </main>
      </div>
    </div>
  );
};

export default EditPage;
