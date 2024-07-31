
'use client'
import { useState } from "react";
import Link from "next/link";
interface Question{
    id:number,
    title:string,
    body:string
}
const CommunityQuestion=()=>{
    const [question,setQuestions]=useState<Question>({id:0, title:"",body:""})
    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const{name,value}=e.target
    setQuestions({...question,[name]:value})
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log('question submitted',question)
        try{
        const response=await fetch('http://192.168.18.26:3000/communityQuestions/createCommunityQuestion',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(question)
        })
        if(response.ok){
           console.log("successfully posted question")
        setQuestions({id:0,title:"",body:""})
        }

        
        else{
            console.log("error posting question",response.statusText)
        }
    }
    catch(error){

        console.log('error is',error),
        alert('there was an error submitting te question')
    }

    }
    return(
        <div className="container bg-white mx-auto">
             <div className="flex items-center justify-between  p-4">
                <Link href={'/userRender/viewCommunityQuestions'}>
            <button
          
          className="absolute right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          View All
        </button>
        </Link>
            </div>
            <h1 className=" flex flex-1 block font-bold text-lg text-gray-900 flex justify-center">Post a Community Question</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
            <label htmlFor="title"  className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            required />
            </div>
            <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
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
          className="absolute right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

            </form>
        </div>
        
    )
}
export default CommunityQuestion;