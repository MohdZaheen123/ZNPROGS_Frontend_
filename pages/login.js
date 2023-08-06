import { fetcher } from '@/lib/api'
import { setToken } from '@/lib/auth'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
  const [userD, setUserD] = useState({
    email: '',
    password: ''
  })
  const handlesubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: userD.email,
          password: userD.password
        })
      })
       setToken(userData)
            toast.success('Login success', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    } catch{
      toast.error('Wrong credentials', {
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
  const handlechange = (e) => {
    setUserD({ ...userD, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font mt-19 h-screen">
        <div className="container px-5  mx-auto flex flex-wrap items-center pt-24">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white ml-5">Go ahead and login to explore new technologies 🧑‍💻🧑‍💻 </h1>
            <p className="leading-relaxed mt-4 ml-5">please sign up if you don't have an account. and also do give your valuable feedback to me.</p>

          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col  w-full mt-10 my-10 md:mt-0  md:relative top-40">
            <h2 className="text-white text-3xl font-medium title-font mb-5">Login</h2>
            <form onSubmit={handlesubmit}>
              <div className="relative mb-4">
                <div className="relative mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                  <input type="email" id="email" name="email" value={userD.email} onChange={handlechange} className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                <input type="password" id="password" name="password" value={userD.password} onChange={handlechange} className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>

              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit'>Login</button>
            </form>
            <p className=" mt-3 text-base">Don't have account yet? <a href="/signin" className='text-xl text-blue-400'>SignIn</a></p>
          </div>
          <div className="p-4 md:w-1/2 w-full md:relative bottom-28">
            <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-500 mb-4" viewBox="0 0 975.036 975.036">
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p className="leading-relaxed mb-6">“Ask for feedback from people with diverse backgrounds. Each one will tell you one useful thing. If you’re at the top of the chain, sometimes people won’t give you honest feedback because they’re afraid. In this case, disguise yourself, or get feedback from other sources.”</p>
              <a className="inline-flex items-center">
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-white">Steve Jobs</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default login
