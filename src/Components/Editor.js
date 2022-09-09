import React, { useEffect } from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');
import "../Styles/Notes.css"
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export default function Editor(props) {
    const theme = 'snow';
    // const theme = 'bubble';

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            ['link', 'image', 'video'],
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ],
    };

    const placeholder = 'Start editing your note...';

    const formats = ['bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent',
        'size', 'header',
        'link', 'image', 'video',
        'color', 'background',
        'clean',];

    // const customStyles={['<style>.ql-editor { padding: 0; }</style>']}

    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });
    useEffect(() => {
        if (quill) {
            if (props.activeNote) {
                // quill.setText(props.description)
                quill.root.innerHTML = props.description
            }
            quill.on('text-change', () => {
                props.setActiveNote((prev) => {
                    props.setNotes(prevNotes => {
                        const newNotes = prevNotes.filter(note => note._id !== prev._id)
                        return [{ ...prev, title: prev.title, description: quill.root.innerHTML, modified: new Date() }, ...newNotes]
                    })
                    return {
                        ...prev, description: quill.root.innerHTML
                    }
                })
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
        // eslint-disable-next-line
    }, [quill, props.activeNote._id])

    return (
        <div className='text-editor-container'>
            <div ref={quillRef} className="text-editor" />
        </div>
    );
};