"use client"
import styles from './Form.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editModal } from '../app/slices/editModalSlice'
import { setNotificationMessage, clearNotification } from '../app/slices/notificationSlice'

const Form = ({journalEntries, setJournalEntries}) => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const dispatch = useDispatch()
  const editModal = useSelector(state => state.editModal.editModal)

  const addEntry = async (event) => {
    event.preventDefault()
    
    const newEntry = {
      title: postTitle,
      content: postBody
    }

    try {
        const response = await fetch('/api/entries', { 
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEntry)
        })
        const data = await response.json()
        setJournalEntries([...journalEntries, data])
        dispatch(setNotificationMessage({ message: "Entry created!", type: "success" }))
      } catch (error) {
        dispatch(setNotificationMessage({ message: "Could not create entry", type: "error" }))
      }

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
        <button className="min-w-[80px] w-auto px-3 py-3 bg-blue-500 text-white text-base font-medium rounded border-none mt-5 mb-10" 
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form