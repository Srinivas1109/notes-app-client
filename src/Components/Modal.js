import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import '../Styles/Modal.css'
import { HOST_URL, USER_NOTES_DELETE_URL } from './constants'

const Modal = ({ showModal, closeModal, title, body, pText, nText, activeNote, setNotes, setActiveNote }) => {
    const { user } = useContext(AuthContext)
    const style = {
        transform: showModal.show ? "translateY(-10vh)" : "translateY(-100vh)",
        transition: "all 0.8s ease",
        opacity: '1'
    }
    // console.log(handleDelete)

    const handleDelete = async () => {
        // e.preventDefault()
        // console.log(credentials)
        let response = await fetch(`${HOST_URL}${USER_NOTES_DELETE_URL}${user._id}/${showModal.noteId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        response = await response.json()
        console.log(response)
        if (response.status === 200 && response.deletedCount > 0) {
            // navigateTo(`${NOTES_URL_FRONTEND}`)
            setNotes(prevNotes => {
                const newNotes = prevNotes.filter(note => note._id !== showModal.noteId)
                return newNotes
            })

            if (activeNote && activeNote._id === showModal.noteId) {
                setActiveNote(null)
            }
        } else {
            alert("Something went wrong in Deleting Note")
        }

    }
    const postiveAction = () => {
        handleDelete()
    }
    return (
        <div className='modal-wrapper' style={style}>
            {/* {console.log(showModal)} */}
            <div className="modal-container" >
                <div className="modal-title">
                    <p>{title ? title : "Pass title as a prop"}</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <div className="modal-content">
                    {body ? body : "Pass body as a prop"}
                </div>
                <div className="modal-footer">
                    <button className='positive-btn' onClick={postiveAction}>{pText ? pText : "Sure!"}</button>
                    <button className='negative-btn' onClick={closeModal}>{nText ? nText : "No"}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal