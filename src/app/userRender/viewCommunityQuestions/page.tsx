
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header'
import CommunityQuestions from'../../userComponents/communityQuestions'
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
        <CommunityQuestions/>
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;