import { useState } from "react"
import NoteCard from "../components/NoteCard"

type Note = {
  title: string
  content: string
}

export default function NotesPage({
  notes,
  setNotes,
  deleteNote
}: {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  deleteNote: (indexToDelete: number) => void
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const addNote = () => {
    if (!title || !content) return

    setNotes([
      ...notes,
      {
        title: title,
        content: content
      }
    ])

    setTitle("")
    setContent("")
  }

  return (
    <div>
      <h1>Notes Page</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      {notes.map((note, index) => (
        <NoteCard
          key={index}
          title={note.title}
          content={note.content}
          onDelete={()=>deleteNote(index)}
        />
      ))}
    </div>
  )
}