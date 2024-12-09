import ChangePasswordForm from "@/app/components/changepassword";
// import React from "react";

// const ChangePasswordPage = () => {
//   return <ChangePasswordForm />;
// };

// export default ChangePasswordPage;

import Header from '@/app/components/LandingPage/header'
import CertificatesList from '@/app/userComponents/Quiz/certificateList';
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-custom-image h-screen overflow-auto mt-20">
        <ChangePasswordForm />;
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;