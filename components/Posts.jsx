"use client"
import styles from './Posts.module.css'
// import EditForm from './EditForm'
// import entriesService from '../services/entriesService'
import { useState, useContext } from 'react'
// import { EditModalContext, LoginContext, NotificationContext } from "./ContextProvider"

const Posts = ({journalEntries, setJournalEntries}) => {
  const [entryToEdit, setEntryToEdit] = useState(null)
  const [editedPostTitle, setEditedPostTitle] = useState('')
  const [editedPostBody, setEditedPostBody] = useState('')
//   const editModalContext = useContext(EditModalContext)
//   const loginContext = useContext(LoginContext)
//   const { showSuccess, showError, clearNotification } = useContext(NotificationContext)

  const editEntryHandler = (entry) => {
    setEntryToEdit(entry)
    setEditedPostTitle(entry.title)
    setEditedPostBody(entry.content)
    // editModalContext.setEditModal(true)
  }
console.log(journalEntries)

  const deleteEntryHandler = async (entry) => {
    try {
      if (window.confirm("Are you sure you want to delete this entry?")) {
        await fetch(`/api/entries/${entry.id}`, {
          method: 'DELETE'
        })
        // showSuccess("Journal entry deleted successfully")
        // setTimeout(() => clearNotification(), 3500)
        setJournalEntries(journalEntries.filter((e) => e.id !== entry.id))
      }
    } catch (error) {
        console.error(error)
        // if (error.response?.status === 401) {
        //   showError("You can only delete your own entries")
        // } else {
        //   showError("Server error. Please try again!")
        // }
        // setTimeout(() => clearNotification(), 3500)
      }
    }

  const reversedEntries = journalEntries ? [...journalEntries].reverse() : null
  const postsHTML = reversedEntries.map((entry) => (
    <article className={styles.postsContainerElement} key={entry.id} >
      <div className={styles.title}>{entry.title}</div>
      <div className={styles.content}>{entry.content}</div>
      <div className={styles.editDelete}>
        <button className={styles.edit} type='submit' onClick={() => editEntryHandler(entry)}>Edit</button> 
        <button className={styles.delete} type='submit' onClick={() => deleteEntryHandler(entry)}>Delete</button>
      </div>
    </article>
  ))

  return (
    <>
    <div className={styles.postsContainer}>
      {postsHTML}

    </div>
    {/* {editModalContext.editModal && <EditForm 
                        journalEntries={journalEntries}
                        setJournalEntries={setJournalEntries}
                        entryToEdit={entryToEdit}
                        editedPostTitle={editedPostTitle}
                        setEditedPostTitle={setEditedPostTitle}
                        editedPostBody={editedPostBody}
                        setEditedPostBody={setEditedPostBody}
                      />} */}
    </>
  )
}

export default Posts
