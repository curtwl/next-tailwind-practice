"use client"
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { useState, useContext } from 'react'
import Form from '../components/Form'
import Posts from '../components/Posts'

export default function Home() {
  const [journalEntries, setJournalEntries] = useState([])
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
        {/* {notificationMessage.message && <Notification />} */}
      </main>
  )
}
