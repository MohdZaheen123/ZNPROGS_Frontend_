import { Federant } from 'next/font/google'
import React, { useState } from 'react'
import { fetcher } from '@/lib/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contact = () => {

  const [feedback,setFeedback]=useState({
    name:"",
    message:""
  })
 

  const handlechange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
  }
  const handlesubmit= async(e)=>{

    e.preventDefault()


      const resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
           { data:feedback}
        )
      })

      console.log(resp);
    
            toast.success('Submitted succesfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
      setFeedback({
        name:'',
        message:''
      })
  }
  return (
    <section className="text-gray-400 bg-gray-900 body-font relative mt-16">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Contact Me</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Feel free to reach out me anytime. And do provide your valuable feedback here🤖🤖</p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <form onSubmit={handlesubmit}>
          <div className="flex flex-wrap -m-2">
        
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
                <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={feedback.name} onChange={handlechange} />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-400">Message</label>
                <textarea id="message" name="message" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={feedback.message} onChange={handlechange} ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit'>Submit</button>
            </div>
          </div>
            </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default contact
