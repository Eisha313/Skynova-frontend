
import Sidebar from '../../components/sidebarDashboard'
import Header from '@/app/components/LandingPage/header'
import MainResourceDisplay from '@/app/userComponents/wings/main'
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
        <MainResourceDisplay/>
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;