import { useState } from "react"
import type { Note } from "../types/Note"
import "./NoteEditor.css"

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  onClose: () => void
}

export default function CreateNoteModal({
  setNotes,
  onClose
}: Props) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = () => {

    if (!content.trim()) return

    const newNote: Note = {
      id: Date.now(),
      title: title.trim() || "Untitled Note",
      content,
      createdAt: new Date().toISOString()
    }

    setNotes(prev => [...prev, newNote])
    onClose()
  }

  return (
    <div
      className="note-editor-overlay"
      onClick={onClose}
    >
      <div
        className="note-editor-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="note-editor-header">

          <button onClick={onClose}>
            ← Cancel
          </button>

          <button
            className="save-note-btn"
            onClick={handleSave}
          >
            Save
          </button>

        </div>
        <input
          className="editor-title"
          placeholder="Untitled Note"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="editor-content"
          placeholder="Start writing..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
      </div>
    </div>
  )
}