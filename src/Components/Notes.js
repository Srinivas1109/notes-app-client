import React, { useState, useEffect, useContext, useRef } from 'react'
import "../Styles/Notes.css"
import Note from './Note'
import Loader from './Loader'
import Editor from './Editor'
// import data from "./FakeData"
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import Modal from './Modal'
import AuthContext from '../Context/AuthContext'
import { HOST_URL, USER_NOTES_ADD_URL, USER_NOTES_URL } from './constants'
// import Mark from 'mark.js'
const Notes = () => {

  const [loading, setLoading] = useState(true) // later to true
  // eslint-disable-next-line
  // const [notes, setNotes] = useState(data)
  const { user } = useContext(AuthContext)
  const [notes, setNotes] = useState(null)
  const [activeNote, setActiveNote] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  // const [searchNotes, setSearchNotes] = useState(null)
  const [modal, setModal] = useState({ show: false, noteId: null })
  const notesRef = useRef(null)

  useEffect(() => {
    // console.log("User: ", user)
    getData()
    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    try {
      let response = await fetch(
        `${HOST_URL}${USER_NOTES_URL}`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              id: user?._id
            }
          )
        }
      )
      response = await response.json()
      // console.log(response)
      if (response.status === 200) {
        // console.log("response: ", response.notes.notes)
        setNotes(response.notes.notes)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const addNewNote = () => {
    setActiveNote(null);
    const dateTime = new Date()
    const newNoteId = uuid()
    const newNote = {
      user: user._id,
      _id: newNoteId,
      title: `Untitled ${moment().format('LLL')}`,
      // title: `Title${notes.length + 1}`,
      description: '',
      modified: dateTime
    }
    // setNotes(newAddedNotes)
    setNotes((prevNotes) => {
      const newAddedNotes = [newNote, ...prevNotes]
      return newAddedNotes
    })

    setActiveNote(newNote)
  }

  const saveNote = async () => {
    // const newNotes = notes.filter(note => note.id !== activeNote.id)

    // setNotes([...newNotes, { ...activeNote, modified: new Date() }])
    // setActiveNote(null)
    console.log("Save note: ", JSON.stringify(activeNote))
    try {
      const res = await fetch(`${HOST_URL}${USER_NOTES_ADD_URL}`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              "user": user._id,
              "_id": activeNote._id,
              "title": activeNote.title,
              "description": activeNote.description
            }
          )
        })
      const data = await res.json()
      if (data.status !== 200) {
        console.log(data)
        alert("Something went wrong notes cannot be added")
      }else{
        // activeNote._id = data.note._id
        setNotes((prevNotes)=>{
          const newNotes = prevNotes.filter(note => note._id !== activeNote._id)
          return [data.note, ...newNotes]
        })
        setActiveNote(data.note)
      }

    } catch (error) {
      console.log("Notes Add Error: ", error)
    }
  }
  const handDelete = (e, noteId) => {
    e.stopPropagation()
    setModal({ show: true, noteId: noteId })
    // if (0) {
    //   setNotes(prevNotes => {
    //     const newNotes = prevNotes.filter(note => note.id !== noteId)
    //     return newNotes
    //   })

    //   if (activeNote && activeNote.id === noteId) {
    //     setActiveNote(null)
    //   }
    // }
  }

  // const element = notesRef.current
  // element.addEventListener('scroll', ()=> console.log("Div scrolling"))

  const closeModal = () => {
    setModal({ show: false, noteId: null })
  }

  const handleOnChangeTitle = (e) => {
    setActiveNote((prev) => {
      setNotes(prevNotes => {
        const newNotes = prevNotes.filter(note => note._id !== prev._id)
        return [{ ...prev, title: e.target.value }, ...newNotes]
      })
      return {
        ...prev, title: e.target.value
      }
    })
  }

  const noteElements = notes && notes?.filter(
    item => {
      if (searchValue) {

        return item.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) || item.description.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      }else{
        return item
      }
    }
  ).map((note, index) => (
    <Note
      key={index}
      note={note}
      index={index}
      setActiveNote={setActiveNote}
      deleteNote={handDelete}
      activeNoteId={activeNote ? activeNote._id : null}
      notes={notes}
    />))

  // const searchResults = searchNotes && searchNotes.map((note, index) => (
  //   <Note
  //     key={index}
  //     note={note}
  //     index={index}
  //     setActiveNote={setActiveNote}
  //     deleteNote={handDelete}
  //     activeNoteId={activeNote ? activeNote._id : null}
  //   />))


  return (
    <div className='notes-wrapper' onClick={() => setModal(false)} >
      {modal.show && <div className='modal-back-drop' ></div>}
      {<Modal
        showModal={modal}
        setModal={setModal}
        closeModal={closeModal}
        notes={notes}
        activeNote={activeNote}
        setNotes={setNotes}
        setActiveNote={setActiveNote}
        title={"Are you sure?"}
        body={"Do you really want to delete this record? This process cannot be undone."}
        pText={"Delete"}
        nText={"Cancel"}
      />}
      {loading && <Loader />}
      <div className='user-all-notes'>
        <div className="notes-container">
          <div className="note-titles" ref={notesRef}>
            <div className="input-search">
              <input type="text" id='nav-search' name="nav-search" placeholder='Search notes here...' className='nav-search' value={searchValue} onChange={handleSearchValue} />
              <label htmlFor="nav-search"><i className="fa fa-search" style={{ fontSize: "20px", color: "gray", cursor: "pointer" }}></i></label>
              <hr />
            </div>
            {noteElements ? null : <div className='no-note-titles'><span className='no-note-titles-text'>No Notes</span></div>}
            {/* {(searchResults && searchResults.length) > 0 ? searchResults : noteElements} */}
            {noteElements}
          </div>
          <div className="note-edit">
            <div className="current-note-title">
              {
                activeNote ?
                  <span className='input-container margin-left'>
                    <i className="fa fa-sticky-note-o title-note-image"></i>
                    <input
                      value={activeNote.title}
                      className="active-title-input"
                      onChange={handleOnChangeTitle}
                      placeholder="Enter title here" />
                    <span className='active-note'> - Editing</span>
                  </span>
                  : <span className='margin-left'>
                    <i className="fa fa-sticky-note-o editor-title-note-image"></i> Notes</span>
              }
              <div className='btns'>
                {<button className="new-note" onClick={addNewNote}>New Note</button>}
                {activeNote && <button className="new-note" onClick={saveNote}>Save Note</button>}
              </div>
            </div>
            <div className="current-note-editor">
              {
                activeNote ?
                  <Editor
                    activeNote={activeNote}
                    title={activeNote.title}
                    description={activeNote.description}
                    setActiveNote={setActiveNote}
                    notes={notes}
                    setNotes={setNotes}
                  />
                  :
                  <div className='text-editor-container'>
                    <div className='no-note-img' />
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes