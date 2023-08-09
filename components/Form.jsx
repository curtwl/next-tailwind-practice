"use client"
import styles from './Form.module.css'
// import entriesService from '../services/entriesService'
import { useState, useContext } from 'react'
//import { EditModalContext, NotificationContext } from "./ContextProvider"

const Form = ({journalEntries, setJournalEntries}) => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
//   const editModalContext = useContext(EditModalContext)
//   const { showSuccess, showError, clearNotification } = useContext(NotificationContext)

  const addEntry = async (event) => {
    event.preventDefault()
    
    const newEntry = {
      title: postTitle,
      content: postBody
    }

    setJournalEntries(journalEntries.concat(newEntry))
    // try {
    //   const res = await entriesService.createEntry(newEntry)
    //   setJournalEntries(journalEntries.concat(res))
    //   showSuccess("Entry created!")
    //   setTimeout(() => clearNotification(), 3000)
    // } catch (error) {
    //   console.error(error)
    //   showError("Could not create entry")
    //   setTimeout(() => clearNotification(), 3000)
    // }

    setPostTitle('')
    setPostBody('')
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={addEntry}>
        <label htmlFor="postTitle" className={styles.title}>Title:</label>
        <input id="postTitle" className={styles.postTitle} value={postTitle} onChange={({ target }) => setPostTitle(target.value)} />
        <label htmlFor="postBody">Body:</label>
        <textarea id="postBody" className={styles.postBody} value={postBody} onChange={({ target }) => setPostBody(target.value)} />
        <p>Use the form above to create a post.</p>
        <button className={styles.submitBtn} type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form