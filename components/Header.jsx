"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../app/slices/loginSlice'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  const pathname = usePathname()

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login.loggedInUser)

  // Here, you can use the setLoggedInUser action to update the store state.
  useEffect(() => {
    dispatch(setLoggedInUser('John Doe'))
  }, [dispatch])

  // You can access the loggedInUser here.
  console.log(loggedInUser)

  return (
    <nav className="flex flex-row w-full h-full items-start md:items-center justify-between bg-blue-200" >
      <div className="m-4 flex items-center">
        <h1 className="">
          <Link href="." className="header-link">Digital Journal&nbsp;</Link>
        </h1>
        <h2>| {pathsForJSX[pathname]}</h2>
      </div>
      <div className='flex flex-row md:text-2xl'>
        <Link href="login" className="mr-6">Login</Link>
        <Link href="signup" className="mr-3">
          Sign Up
        </Link>
      </div>
        {/* <button id="logout-btn" >Logout</button> */}
  </nav>
  )
}

export default Header