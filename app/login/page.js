"use client"
import React from "react"
import styles from './page.module.css'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../slices/loginSlice'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login.loggedInUser)

  const loginUser = async (event) => {
      event.preventDefault()
      const userObject = {
        username: username,
        password: password,
      }
    
      try {
        const response = await axios.post('/api/login', userObject)
    
        if (response.status !== 200) {
          throw new Error('Username or password incorrect')
        }
    
        const user = response.data
        console.log(user)
        dispatch(setLoggedInUser(user.username))
        console.log(loggedInUser)
        // entriesService.setToken(user.accessToken)
        // loginService.setToken(user.accessToken)
        // showSuccess('Logged in successfully!')
        //loginContext.setLoggedInUser( {username: user.username, id: user.id} )
        //navigate('/')
      } catch (error) {
        // showError('Username or password incorrect')
        console.error(error)
      }
      // setTimeout(() => clearNotification(), 3000)
  }

    return (
        <div className="text-xl my-10 mx-auto grid gap-4 bg-white rounded-lg shadow-md p-5 w-3/4 min-h-3/4">
          <form className={styles.signupForm} onSubmit={loginUser}>
            <p className="text-xl my-12"><strong className="text-2xl">Login</strong> to create journals!</p>
            <label htmlFor="username">Username:</label>
            <input id="username" spellCheck="false" autoCapitalize="none" autoComplete="off"
                   type="text" value={username} onChange={({ target }) => 
                  {
                      setUsername(target.value.trim())
                  } 
            }/>
              
            <label htmlFor="password">Password:</label>
            <input id="password" spellCheck="false" autoCapitalize="none" type="password"
                   value={password} onChange={({ target }) => setPassword(target.value)} />
            <button className={styles.submitBtn} type='submit'>Login</button>
          </form>
          
        </div>
    )
}