import React from 'react'
import { useState } from 'react'
import { fetcher } from '@/lib/api'
import { setToken } from '@/lib/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'


const Signin = () => {

  const [userD, setUserD] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handlechange = (e) => {
    setUserD({ ...userD, [e.target.name]: e.target.value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()

    const userData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userD.name,
        email: userD.email,
        password: userD.password
      })
    })
    console.log(userD.password);
    if (userData.error) {
      toast.error(userData.error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      setToken(userData)
      toast('🦄 Sign in successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }
  }


  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center h-screen">

        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-12 mx-auto">
          <h2 className="text-white text-3xl font-medium title-font mb-5">Sign Up</h2>
          <form onSubmit={handlesubmit}>
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">Full Name</label>
              <input type="text" id="full-name" value={userD.name} onChange={handlechange} name="name" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
              <input type="email" value={userD.email} onChange={handlechange} name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
              <input type="password" value={userD.password} onChange={handlechange} name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit'>Sign up</button>
          </form>
          <p className="text-base mt-3">Already have account? <Link href="/login" className='text-xl text-blue-400'>Login</Link></p>
        </div>
      </div>
      <ToastContainer />
    </section>
  )

}


export default Signin

