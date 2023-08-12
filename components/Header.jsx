"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../app/slices/loginSlice'
<<<<<<< HEAD

=======
import dbConnect from '../app/utils/dbConnect'
>>>>>>> detached-branch
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
<<<<<<< HEAD
=======
  useEffect(() => {
    const test = async () => await dbConnect()
    test()
  }, [])
  
  //dbConnect()
>>>>>>> detached-branch
  const pathsForJSX = {
    '/': 'Create A Note',
    '/login': 'Login',
    '/signup': 'Signup',
    '/account': 'Account'
  }

  const pathname = usePathname()

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login.loggedInUser)

<<<<<<< HEAD
  // Here, you can use the setLoggedInUser action to update the store state.
=======
>>>>>>> detached-branch
  useEffect(() => {
    dispatch(setLoggedInUser('John Doe'))
  }, [dispatch])

<<<<<<< HEAD
  // You can access the loggedInUser here.
  console.log(loggedInUser)

=======
  console.log(loggedInUser)
>>>>>>> detached-branch
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