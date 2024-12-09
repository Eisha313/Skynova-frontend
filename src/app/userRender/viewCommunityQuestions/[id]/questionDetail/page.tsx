import QuestionDetail from '../../../../userComponents/detailQuestion';
// import Header from '../../../components/header';
import Header from '@/app/components/LandingPage/header';
const QuestionPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
  
  
    <div className='flex h-screen'>
        
    <div className='flex-1 flex flex-col'>
    <Header/>
    <main className="flex-1 p-4 mt-20 h-screen bg-custom-image overflow-auto">
    <QuestionDetail id={id} />
    </main>
    </div>
    </div>
  
  

  )
};

export default QuestionPage;










