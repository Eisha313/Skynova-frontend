
// 'use client'
// import { useState } from "react";
// import Link from "next/link";
// import { Router } from "lucide-react";
// import { useRouter } from "next/navigation";
// interface Question{
//     id:number,
//     title:string,
//     body:string
// }
// const CommunityQuestion=()=>{
//     const [question,setQuestions]=useState<Question>({id:0, title:"",body:""})
//     const router=useRouter()

//     const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
//     const{name,value}=e.target
//     setQuestions({...question,[name]:value})
//     }
//     const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault();
//         console.log('question submitted',question)
//         try{
//         const response=await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/createCommunityQuestion',{
//             method:'POST',
//             headers:{
//                 'content-type':'application/json'
//             },
//             body:JSON.stringify(question)
//         })
//         if(response.ok){
//            console.log("successfully posted question")
//         setQuestions({id:0,title:"",body:""})
//         router.push('/userRender/viewCommunityQuestions')
      
//         }

        
//         else{
//             console.log("error posting question",response.statusText)
//         }
//     }
//     catch(error){

//         console.log('error is',error),
//         alert('there was an error submitting te question')
//     }

//     }
//     return(
//         <div className="container bg-white mx-auto">
//              <div className="flex items-center justify-between  p-4">
//                 <Link href={'/userRender/viewCommunityQuestions'}>
//             <button
          
//           className="absolute right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         >
//           View All
//         </button>
//         </Link>
//             </div>
//             <h1 className=" flex flex-1 block font-bold text-lg text-gray-900 flex justify-center">Post a Community Question</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//             <label htmlFor="title"  className="block text-sm font-medium text-gray-700">Title</label>
//             <input type="text"
//             name="title"
//             value={question.title}
//             onChange={handleChange}
//              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
//             required />
//             </div>
//             <div>
//           <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
//           <textarea
//             name="body"
//             value={question.body}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
//             rows={4}
//           />
//         </div>
//         <button
//           type="submit"
//           className="absolute right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         >
//           Submit
//         </button>

//             </form>
//         </div>
        
//     )
// }
// export default CommunityQuestion;
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

interface Question {
  id: number;
  title: string;
  body: string;
}

const CommunityQuestion = () => {
  const [question, setQuestion] = useState<Question>({ id: 0, title: '', body: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Question submitted', question);
    try {
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/communityQuestions/createCommunityQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        console.log('Successfully posted question');
        setQuestion({ id: 0, title: '', body: '' });
        router.push('/userRender/viewCommunityQuestions');
      } else {
        console.error('Error posting question', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the question');
    }
  };

  return (
    <div className="container bg-white mx-auto p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Link href="/userRender/viewCommunityQuestions">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            View All
          </button>
        </Link>
      </div>
      <h1 className="font-bold text-lg text-gray-900 text-center mb-4">Post a Community Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            name="body"
            value={question.body}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommunityQuestion;
