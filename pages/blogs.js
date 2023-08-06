import { fetcher } from '@/lib/api'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useAuth } from '../lib/authContext';

const blogs = ({ blogs }) => {
  const [pageIndex, setPageIndex] = useState(1)

  const user = useAuth();

  useEffect(() => {
    let p = parseInt(Cookies.get('pagerem'));
    setPageIndex(p)
  }, [])


  const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&sort=id:DESC&pagination[page]=${Cookies.get('pagerem')}&pagination[pageSize]=5`, fetcher, {
    fallbackData: blogs
  })

  if (!data) {
    return <div>Loading...</div>;
  }
  else {

    if (user) {
      return (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="flex flex-wrap w-11/12 m-auto mb-20 relative top-36">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">ZnProgs All-Blogs</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">01000101 01100001 01110100 00100000 01000011 01101111 01100100 01100101 00100000 01010011 01101100 01100101 01100101 01110000 00101110  </p>
          </div>
          <div className="container px-5 pt-52 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">

              {
                data.data.map(item => {

                  return (
                    <div className="p-4 lg:w-1/3" key={item.id}>
                      <div className="h-92 bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{item.attributes.Category}</h2>
                        <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{item.attributes.Title}</h1>
                        <p className="leading-relaxed mb-3">{item.attributes.Description.substr(0, 50) + "..."}</p>
                        <Link href={'/blogpost/' + item.attributes.slug}>
                          <button className="text-white bg-indigo-500 border-0 py-1 my-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg">Learn more &#8674;</button>
                        </Link>
                        <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                          <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">

                          </span>
                          <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                          </span>
                        </div>
                        <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                          <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                            </svg>{item.attributes.likes}
                          </span>
                          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>{item.attributes.reviews ? item.attributes.reviews.data.length : 0}
                          </span>
                        </div>
                      </div>

                    </div>)
                })}

            </div>
          </div>

          <div className="space-x-2 space-y-2 my-8 mx-auto w-48">
            <button
              className={`md:p-2 rounded py-2 text-black p-2 ${pageIndex === 1 ? 'bg-gray-300' : 'bg-indigo-500'
                }`}
              disabled={pageIndex === 1}
              onClick={() => {
                setPageIndex(pageIndex - 1)
                Cookies.set('pagerem', pageIndex - 1)
              }}
            >
              Previous
            </button>
            <button
              className={`md:p-2 rounded py-2 text-black p-2 ${pageIndex === (data && data.meta.pagination.pageCount)
                ? 'bg-gray-300'
                : 'bg-indigo-500'
                }`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => {
                setPageIndex(pageIndex + 1)
                Cookies.set('pagerem', pageIndex + 1)
              }}
            >
              Next
            </button>
            <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount
              }`}</span>
          </div>
        </section>
      )
    }
    else {

      return (
        <div className='h-screen grid place-items-center'>
          <div className='text-xl'>     PLEASE LOGIN TO CONTINUE <br />
            CLICK HERE TO <a href="/login" className='text-blue-600'>LOGIN</a> / <a href="/signin" className='text-blue-600'>SIGN UP</a>💻💻
          </div>
        </div>
      )

    }

  }
}



export async function getStaticProps(context) {
  let a = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&sort=id:DESC&pagination[page]=1&pagination[pageSize]=5`)
  let blogs = await a.json();
  return {
    props: { blogs }
  }
}

export default blogs
