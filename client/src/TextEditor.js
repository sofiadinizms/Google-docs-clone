import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {io} from 'socket.io-client'

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {

  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io('http://localhost:3001')
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  // useEffect(() => {
  // minuto 26:20
  // })

  const wrapperRef = useCallback((wrapper) => {
    
    if (wrapper == null) return

    wrapper.innerHML = ""
    
    const editor = document.createElement('div')
    wrapper.append(editor)
    
    const q = new Quill('#container', {theme: 'snow', modules: {toolbar: TOOLBAR_OPTIONS}})
    setQuill(q)

  }, [])
  
  return <div className="container" ref={wrapperRef}></div>
}
