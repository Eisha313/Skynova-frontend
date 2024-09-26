
import Sidebar from '../../components/sidebarDashboard'
import Header from '../../components/header'
import CompetencyEvaluation from '@/app/userComponents/competencyEvaluation/frontpage'
const AddQuestions=({ params }: { params: { id: string } }) => {
    const { id } = params;
    console.log('userTitle', id);
    return(
        <div className='flex h-screen'>
        <Sidebar/>
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen ">
        <CompetencyEvaluation id ={id}/>
        </main>
        </div>
        </div>
    )
}
export default AddQuestions;