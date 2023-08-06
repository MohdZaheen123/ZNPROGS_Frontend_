import { fetcher } from '@/lib/api';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const saved = (props) => {


  if (props.data == 0) {
    return (
      <div className='h-screen grid place-items-center'>
        <div className='text-xl'>     NO SAVED POST AVAILABLE <br />
          GO AHEAD AND CHECKOUT <a href="/blogs" className='text-blue-400'>BLOGS📚📚</a>
        </div>
      </div>
    )
  }
  else {
    let dat = props.data[0].attributes.blogs.data
    return (

      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
            {
              dat.map((d) => {
                return (
                  <div className="py-8 flex flex-wrap md:flex-nowrap" key={d.attributes.slug}>
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-white">{`Category : ${d.attributes.Category.toUpperCase()}`}</span>
                      <span className="mt-1 text-gray-500 text-sm">{d.attributes.createdAt}</span>
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-2xl font-medium text-white title-font mb-2">{d.attributes.Title.toUpperCase()}</h2>
                      <p className="leading-relaxed">{d.attributes.Description}</p>
                      <Link href={`/blogpost/${d.attributes.slug}`}> <button className="flex mx-1 text-white bg-indigo-500 border-0 pt-2 pb-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Learn more</button></Link>
                    </div>
                  </div>
                )
              })
            }


          </div>
        </div>
      </section>
    )
  }




}



export async function getServerSideProps(context) {
  let b = context.req.cookies['username']
  const resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts?populate=*&filters[name][$eq]=${b}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${context.req.cookies['jwt']}`
    }
  });


  return { props: resp };


}
export default saved
