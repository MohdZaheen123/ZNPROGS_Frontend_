
import Script from 'next/script'
import Link from 'next/link'
import { useAuth } from '../lib/authContext';

const Navbar = () => {
  const user = useAuth();
  return (
    <div className='block'>
        <link rel="stylesheet" href="/styles.css" />
<nav className="navbar">
        <div className="logo">
          <h1><a href="/">ZnProgs</a></h1>
        </div>
        <ul className="nav_menu">
          <li className="nav_items">
            <Link className='navlink' href='/'>Home</Link>
          </li>
          <li className="nav_items">
            <Link className='navlink' href='/about'>About</Link>
          </li>
          <li className="nav_items">
            <Link className='navlink' href='/blogs'>Blogs</Link>
          </li>
          {
            user?<li className="nav_items">
            <Link className='navlink' href='/profile'>Profile</Link>
          </li>:<li className="nav_items">
            <Link className='navlink' href='/login'>login</Link>
          </li>
          }
          
          <li className="nav_items">
            <Link className='navlink' href='/contact'>Contact</Link>
          </li>

        </ul>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
     <Script src="/js/navscript.js" />
    </div>
  )
}




export default Navbar









// import Head from 'next/head'
// import Script from 'next/script'
// import Link from 'next/link'

// const Navbar = () => {
//   return (
//     <div>
//         <link rel="stylesheet" href="/styles.css" />
// <nav className="navbar">
//         <div className="logo">
//           <h1><a href="/">ZnProgs</a></h1>
//         </div>
//         <ul className="nav_menu">
//           <li className="nav_items">
//             <Link className='navlink' href='/'>Home</Link>
//           </li>
//           <li className="nav_items">
//             <Link className='navlink' href='/about'>About</Link>
//           </li>
//           <li className="nav_items">
//             <Link className='navlink' href='/blogs'>Blogs</Link>
//           </li>
//           <li className="nav_items">
//             <Link className='navlink' href='/login'>login</Link>
//           </li>
//           <li className="nav_items">
//             <Link className='navlink' href='/contact'>Contact us</Link>
//           </li>

//         </ul>
//         <div className="hamburger">
//           <span className="bar"></span>
//           <span className="bar"></span>
//           <span className="bar"></span>
//         </div>
//       </nav>
//      <Script src="/js/navscript.js" />
//     </div>
//   )
// }




// export default Navbar


