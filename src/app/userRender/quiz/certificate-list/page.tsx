
import Header from '@/app/components/LandingPage/header'
import CertificatesList from '@/app/userComponents/Quiz/certificateList';
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
        <CertificatesList/>
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;