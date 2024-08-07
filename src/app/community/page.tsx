
import Sidebar from '../components/sidebarDashboard'
import Header from '../components/header'
import CommunityQuestions from'../components/Community/CommunityQuestion'
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen ">
        <CommunityQuestions/>
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;