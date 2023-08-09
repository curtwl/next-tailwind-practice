import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from "react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-300`}>      
        <nav className="flex flex-row w-full h-full items-start justify-between bg-blue-200" >
          <div className="m-4 flex items-center">
            <h1 className="header-title">
              <Link href="." className="header-link">Digital Journal&nbsp;</Link>
            </h1>
            <h2>| Create a Note</h2>
          </div>
          <div className='header-login'>
            <Link href="login">Login</Link>
            <Link href="signup" className="header-signup">
              Sign Up
            </Link>
          </div>
              {/* <button id="logout-btn" >Logout</button> */}
        </nav>
        {children}
      </body>
    </html>
  )
}



// const Header = ({  }) => {

//   const pathsForJSX = {
//     '/': 'Create A Note',
//     '/login': 'Login',
//     '/signup': 'Signup',
//     '/account': 'Account'
//   }

//   const logoutUser = () => {

//   }

//   return (
//     <header onClick={logoutUser}>
//       <nav className="header-container" >
//         <div className='header-main'>
//           <h1 className="header-title"><Link to="/" className="header-link">Digital Journal&nbsp;</Link></h1>
//           <h2>| t</h2>
//         </div>
//         <div className='header-login'>
          
//             <button id="logout-btn" onClick={logoutUser}>Logout</button>
          
//         </div>
//       </nav>
//     </header>
// )}
