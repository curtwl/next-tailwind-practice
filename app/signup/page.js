"use client"
import styles from './page.module.css'
import React from "react"
import { useState, useContext } from 'react'
// import { LoginContext, NotificationContext } from "../components/ContextProvider"
// import Notification from "../components/Notification"
// import signupService from '../services/signupService'
// import loginService from '../services/loginService'
// import entriesService from '../services/entriesService'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate()
    // const loginContext = useContext(LoginContext)
    // const { showSuccess, showError, clearNotification, notificationMessage } = useContext(NotificationContext)

    const addUser = async (event) => {
        event.preventDefault()
        const userObject = {
          username: username,
          password: password,
        }

        // let user = null
        // try {
        //     user = await signupService.signup(userObject)
        //     showSuccess(`Welcome to Chingu Journal, ${username}!`)
        //   } catch (error) {
        //     showError('Please try again')
        //     console.error(error)
        //   }
        //   setTimeout(() => clearNotification(), 3000)

        // if (user) {
        //   try {
        //       const token = await loginService.login(userObject)

        //       entriesService.setToken(token.accessToken)
        //       loginContext.setLoggedInUser( {username: user.username, id: user.id} )
        //       navigate('/')
        //     } catch (error) {
        //       console.error(error)
        //     }
        //   }
    }

    return (
      <div className="bg-green">
      <div className="text-xl my-10 mx-auto grid bg-white rounded-lg shadow-md p-5 w-3/4">
        <form className={styles.signupform} onSubmit={addUser}>
          <p><strong>Sign up</strong> to create journals!</p>
          <label htmlFor="username">Username:</label>
          <input id="username" value={username} onChange={({ target }) => 
              {
                  setUsername(target.value)
              } 
          }/>
          
          <label htmlFor="password">Password:</label>
          <input id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          <button className={styles.submitbtn} type='submit'>Sign Up</button>
        </form>
      {/* {notificationMessage.message && <Notification />} */}
      </div>
      </div>
    )
}