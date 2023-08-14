"use client"
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import Form from '../components/Form'
import Posts from '../components/Posts'
import Notification from '@/components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, setToken } from './slices/loginSlice'
import { clearNotification } from './slices/notificationSlice'

export default function Home() {
  const [journalEntries, setJournalEntries] = useState([])
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)
  const notificationMessage = useSelector(state => state.notification.notificationMessage)
  //const loggedInUser = useSelector((state) => state.login.loggedInUser)

  useEffect(() => {
    async function tryToLogin() {
      try {
        const response = await axios.post('/api/login', { username: '' })
        const user = response.data
        dispatch(setLoggedInUser(user.username))
        dispatch(setToken(response.data.tokenFromCookie.value))
        console.log(token)
      } catch (error) {
        console.log(error)
      }
    }

    async function loadEntries() {
      try {
        const response = await axios.get('/api/entries')
        const intialEntries = response.data
        console.log(intialEntries, 'use effect intialEntries')
        setJournalEntries(intialEntries)
      } catch (error) {
        console.log(error)
      }
    }
    console.log('use effect')
    tryToLogin()
    loadEntries()
  }, [])
console.log(notificationMessage?.message)
  return (
    <main className="w-11/12 my-10 mx-auto">
        <section >
          <Form
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        </section>
        <section>
          <Posts 
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        </section>
        {notificationMessage.message && <Notification />}
      </main>
  )
}
