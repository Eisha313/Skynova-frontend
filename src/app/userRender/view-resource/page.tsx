
import Sidebar from '../../components/sidebarDashboard'
import Header from '@/app/components/LandingPage/header'
import CommunityQuestions from'../../userComponents/communityQuestions'
import ResourcePage from '../../userComponents/resources/view-resources'
const ResourceRender=()=>{
    return(
        <div className='flex h-screen'>
        {/* <Sidebar/> */}
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
        <ResourcePage/>
        </main>
        </div>
        </div>
    )
}
export default ResourceRender;