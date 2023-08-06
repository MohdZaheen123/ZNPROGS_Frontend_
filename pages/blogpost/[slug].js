import { fetcher } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";

const Slug = ({ blog }) => {


  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {

    const fun = async () => {
      let d = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts?filters[name][$eq]=${Cookies.get('username')}&populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          Authorization: `bearer ${Cookies.get('jwt')}`
        }
      })
      console.log(d)
      if (d.data == 0) {
        setNewuser(true)
        setBlogid(blog.id)
      }
      else {
        setBlogid(blog.id)
        setPostid(d.data[0].id)

        let blogar = []

        let arr = d.data[0].attributes.blogs.data
        for (let i = 0; i < arr.length; i++) {
          blogar.push(arr[i].id)
          if (arr[i].attributes.slug == slug) {
            let a = document.getElementById('savebtn')
            a.style.backgroundColor = "red"
            a.innerText = 'Unsave Post'
            let c = d.data[0].id;
            setSave(c)
          }
        }
        setBlogarr(blogar)
      }

    }
    fun()


  }, [])

  const [pageIndex, setPageIndex] = useState(1)
  const [pageCount, setPageCount] = useState(0)


  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews?populate=*&filters[blogName]=${blog.attributes.Title}&sort=id:DESC&pagination[page]=${pageIndex}&pagination[pageSize]=5`, fetcher, {
    fallbackData: blog.attributes.reviews
  })


  // console.log(data);


  useEffect(() => {
    if (data) {
      if (data.meta) {

        setPageCount(data.meta.pagination.pageCount)
      }
    }
  }, [])


  const [save, setSave] = useState(null)
  const [like, setLike] = useState(false)
  const [newuser, setNewuser] = useState(false)
  const [postid, setPostid] = useState(null)
  const [blogid, setBlogid] = useState(null)
  const [blogarr, setBlogarr] = useState([])
  const [textr, setTextr] = useState('')


  const likepost = async () => {
    let c = blog.attributes.likes
    let a = document.getElementById('likebtn')
    if (!like) {
      a.style.backgroundColor = "red"
      a.style.color = "white"
      a.innerText = 'Unlike'
      setLike(true)
      let b = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${blogid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': "application/json",
          Authorization: `bearer ${Cookies.get('jwt')}`
        },
        body: JSON.stringify({
          data: {
            likes: c + 1
          }
        })
      })
    }
    else {
      a.style.backgroundColor = ""
      a.innerText = 'Like Post'
      setLike(false)
      let b = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${blogid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': "application/json",
          Authorization: `bearer ${Cookies.get('jwt')}`
        },
        body: JSON.stringify({
          data: {
            likes: c
          }
        })
      })
    }
  }

  const savepost = async () => {
    let a = document.getElementById('savebtn')


    // condition for new users

    if (newuser) {
      if (!save) {
        a.style.backgroundColor = "red"
        a.innerText = 'Unsave Post'
        blogarr.push(blogid)
        let resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json",
            Authorization: `bearer ${Cookies.get('jwt')}`
          },
          body: JSON.stringify({
            data: {
              blogs: blogarr,
              name: Cookies.get('username')
            }
          })
        })
        setNewuser(false)
        setSave(resp.data.id)
      }
      // else {
      //   setNewuser(true)
      // }
    }

    // condition for old users
    else {
      if (!save) {
        a.style.backgroundColor = "red"
        a.innerText = 'Unsave Post'

        blogarr.push(blogid)
        let resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts/${postid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': "application/json",
            Authorization: `bearer ${Cookies.get('jwt')}`
          },
          body: JSON.stringify({
            data: {
              blogs: blogarr
            }
          })
        })
        setSave(postid)

      }
      else {
        a.style.backgroundColor = ""
        a.innerText = 'Save Post'
        blogarr.pop(blogid)
        let resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts/${save}`, {
          method: 'PUT',
          headers: {
            'Content-Type': "application/json",
            Authorization: `bearer ${Cookies.get('jwt')}`
          },
          body: JSON.stringify({
            data: {
              blogs: blogarr
            }
          })
        })
        setSave(null)
        if (blogarr == 0) {
          let resp = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/saved-posts/${save}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': "application/json",
              Authorization: `bearer ${Cookies.get('jwt')}`
            },
          })
          setNewuser(true)
        }
      }

    }
  }

  const subreview = async () => {
    let r = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${Cookies.get('jwt')}`
      },
      body: JSON.stringify({
        data: {
          name: Cookies.get('username'),
          blog: [blog.id],
          blogName: blog.attributes.Title,
          reviewTxt: textr
        }
      })
    })
    mutate()
    setTextr('')
  }

  const handlechange = (e) => {
    setTextr(e.target.value)
  }

  // blog.attributes.CoverImg.data.attributes.url
  return (
    <div className={styles.blog}>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-2 pt-24 pb-8 items-center justify-center flex-col">
          <Image width={500} height={600} className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={blog.attributes.CoverImg.data ? `${blog.attributes.CoverImg.data.attributes.url}` : "https://dummyimage.com/720x600"} />
          {/* <Image width={600} height={600} className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={blog.attributes.CoverImg.data ? `${blog.attributes.CoverImg.data.attributes.url}` : "https://dummyimage.com/720x600"} /> */}
          <div className=" lg:w-11/12 w-full">
            <h1 className="title-font sm:text-6xl text-3xl mt-8 mb-12 font-medium text-white">{blog.attributes.Title}</h1>
            <p className="leading-relaxed mb-12 sm:text-2xl text-xl bg-gray-700 text-blue-400 p-4">{blog.attributes.Description}</p>
            <p className="text-xl">{blog.attributes.Content}</p>
            <div className="flex justify-center mt-12">
              <button id='savebtn' className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={savepost}>Save post</button>
              <button id='likebtn' className="ml-4 inline-flex text-black bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 hover:text-white rounded text-lg" onClick={likepost}>Like Post</button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto flex px-2  items-center justify-center flex-col">

        <h3 className="title-font sm:text-6xl text-3xl mt-8 mb-12 font-medium text-white">Reviews</h3>
        <div id='review' className='mb-4 text-lg bg-gray-700 w-11/12 rounded-lg'>
          {data ? (
            data.data == null ? (<div className='text-center m-8'>NO REVIEW YET 👻👻</div>)
              : (data.data.map(item => {
                return (
                  <div key={item.id} className='m-8 '>  <p className='m-4 text-blue-400 '>{item.attributes.name}</p>
                    <p className='mx-4'>{item.attributes.reviewTxt}</p> </div>)
              }))) : (<div>loading</div>)
          }

          <button
            className={`md:p-2 rounded py-2 text-black p-2 m-4 ${pageIndex === 1 ? 'bg-gray-300' : 'bg-indigo-500'
              }`}
            disabled={pageIndex === 1}
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous
          </button>
          <button
            className={`md:p-2 rounded py-2 text-black p-2 ${pageIndex === (pageCount)
              ? 'bg-gray-300'
              : 'bg-indigo-500'
              }`}
            disabled={pageIndex == pageCount || pageCount == 0}
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
          </button>
          <span className='m-4'>{`${pageIndex} of ${pageCount
            }`}</span>
        </div>
        <textarea rows="3" cols="30" className='bg-gray-700 w-11/12 p-4 rounded-lg mb-8' placeholder='Review this post' value={textr} onChange={handlechange}></textarea>

        <button type="button" className=" mb-8 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={subreview}>SUBMIT</button>
      </div>
    </div>
  )
}


// const KRMD = styled < any > (ReactMarkdown)`
//   h1 {
//     font-size: 3rem;
//   }
//   h2 {
//     font-size: 1.2rem;
//   }
//   p {
//     font-style: italic;
//   }

//   pre {
//     color: #ccc;
//     background: #2d2d2d;
//     font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
//     font-size: 1em;
//     text-align: left;
//     white-space: pre;
//     word-spacing: normal;
//     word-break: normal;
//     word-wrap: normal;
//     line-height: 1.5;
//     -moz-tab-size: 4;
//     -o-tab-size: 4;
//     tab-size: 4;
//     -webkit-hyphens: none;
//     -moz-hyphens: none;
//     -ms-hyphens: none;
//     hyphens: none;
//     padding: 1em;
//     margin: 35px 0;
//     overflow: auto;
//   }

//   code {
//     color: #ccc;
//     background: none;
//     font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
//     font-size: 1em;
//     text-align: left;
//     white-space: pre;
//     word-spacing: normal;
//     word-break: normal;
//     word-wrap: normal;
//     line-height: 1.5;
//     -moz-tab-size: 4;
//     -o-tab-size: 4;
//     tab-size: 4;
//     -webkit-hyphens: none;
//     -moz-hyphens: none;
//     -ms-hyphens: none;
//     hyphens: none;
//   }
// `;


export async function getServerSideProps(context) {
  let a = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*&filters[slug]=` + context.query.slug)
  let blog = await a.json();
  return {
    props: { blog: blog.data[0] }
  }
}

export default Slug
