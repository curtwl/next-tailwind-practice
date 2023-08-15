"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../app/slices/loginSlice'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login.loggedInUser)

  const logoutUser = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST'
    })
    dispatch(setLoggedInUser(null))
    router.push('/')
  }

  console.log(loggedInUser)
  return (
    <nav className="flex flex-row w-full h-full items-start md:items-center justify-between bg-blue-200" >
      <div className="m-4 flex flex-col items-start md:flex-row md:items-center">
        <h1 className="">
          <Link href="." className="header-link">Digital Journal&nbsp;</Link>
        </h1>
        <h2>| {pathsForJSX[pathname]}</h2>
      </div>
      <div className='flex flex-row md:text-2xl'>
      {loggedInUser ? 
          <button id="logout-btn" onClick={logoutUser}>Logout</button>
          :  
        <Link href="login" className="mr-6">{ 'Log In' } </Link>
      }
        <Link href="signup" className="mr-3">
        { loggedInUser ? loggedInUser : 'Sign Up' }
        </Link>
      </div>
  </nav>
  )
}

export default Header