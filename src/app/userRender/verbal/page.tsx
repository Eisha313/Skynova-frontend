import Header from '@/app/components/header';
import Sidebar from '@/app/components/sidebarDashboard';
import QuizList from '@/app/userComponents/verbal/QuizList';
const ResourceRender=()=>{
    return(
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto ">
        <QuizList/>
        </main>
        </div>
        </div>
    )
}
export default ResourceRender;