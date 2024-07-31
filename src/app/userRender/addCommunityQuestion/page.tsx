
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header'
import CommunityQuestion from'../../userComponents/addCommunityQuestion'
const AddQuestions=()=>{
    return(
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen ">
        <CommunityQuestion/>
        </main>
        </div>
        </div>
    )
}
export default AddQuestions;