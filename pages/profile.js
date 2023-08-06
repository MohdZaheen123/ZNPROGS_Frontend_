

import { removeToken } from '@/lib/auth'
import Link from 'next/link'
import { fetcher } from '@/lib/api'
import { useAuth } from '../lib/authContext';
import { useEffect, useState } from "react";



const profile = (props) => {
  const logout = () => {
    removeToken()
  }
  const user = useAuth();


  const [image, setImage] = useState(null)
  const uploadtoclient = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }
  const uploadtoserver = () => {

  }

  if (user) {
    return (

      <>
        <section className="px-6 text-gray-400 bg-gray-900 body-font mt-28">
          <div className="container mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src="/profile.jpg" />
                <p className="text-white text-3xl relative z-1 bottom-28 left-4">{`Welcome Back ${props.username} 🤖`}</p>
              </div>
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">

                    {
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>

                    }

                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-white text-lg">{props.username}</h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <p className="text-lg text-gray-400"> Username: {props.username} <br /> Email: {props.email} <br /> Created At: {props.createdAt.substr(0, 10)} </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4">Take a look at the new blogs released!! and save your favorite ones <br />
                    go ahead and edit your profile and learn everyday <br />
                    <span className='text-red-700'>Eat Code Sleep(🍴  🖥️   💤)</span>
                  </p>

                  <div className=' flex flex-row'>
                    <Link href='/saved'><button className="flex mx-1 text-white bg-indigo-500 border-0 pt-2 pb-2 px-2 mb-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Saved posts</button></Link>
                    <button className="flex mx-1 text-white bg-indigo-500 border-0 pt-2 pb-2 px-2 mb-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={logout}>Logout</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  else {

    return (
      <div className='h-screen grid place-items-center'>
        <div className='text-xl'>     PLEASE LOGIN TO CONTINUE <br />
          CLICK HERE TO <a href="/login" className='text-blue-600'>LOGIN</a> 💻💻
        </div>
      </div>
    )
  }



}



export async function getServerSideProps(context) {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${context.req.cookies['jwt']}`
    }

  });
  return { props: data };
}

export default profile

