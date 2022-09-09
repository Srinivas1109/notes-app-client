import React from 'react'
import "../Styles/Note.css"
import moment from 'moment'

const Note = (props) => {

  const handleOnNoteClick = (note) => {
    props.setActiveNote(note)
  }

  const noTagData = props.note.description.replace(/(<([^>]+)>)/ig, '')

  return (

    <div
      className={`note-container ${props.activeNoteId === props.note._id ? "current-editing" : ''}`}
      onClick={() => handleOnNoteClick(props.note)}>
      <div className="note-title">
        <span><i className="fa fa-sticky-note-o title-note-image"></i>
          {props.note.title}
        </span>
        <i className="fa fa-trash delete-note-icon" onClick={(e) => { props.deleteNote(e, props.note._id) }}></i>
      </div>
      <div className="note-description" >
        {noTagData.length > 30 ? noTagData.slice(0, 30) + "..." : noTagData}
      </div>
      <div className="note-modified">
        Modified {moment(new Date(props.note.modified)).fromNow()}
      </div>
    </div>
  )
}

export default Note