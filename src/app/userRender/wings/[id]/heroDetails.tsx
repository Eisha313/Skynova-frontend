

import Header from '@/app/components/LandingPage/header';

import HeroDetails from '@/app/userComponents/wings/heroDetails'
const ViewQuestions=()=>{
    return(
        <div className='flex h-screen'>
        
        <div className='flex-1 flex flex-col'>
        <Header/>
        <main className="flex-1 p-4 bg-gray h-screen overflow-auto">
        <HeroDetails/>
        </main>
        </div>
        </div>
    )
}
export default ViewQuestions;