import { useState } from "react"
import NoteCard from "../components/NoteCard"
import type { Note } from "../types/Note"
import "./NotesPage.css"

export default function NotesPage({
  notes,
  setNotes,
  deleteNote,
  showCreateNote,
  onNoteAdded,
  setSelectedNote
}: {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  deleteNote: (idToDelete: number) => void
  showCreateNote: boolean
  onNoteAdded: ()=> void
  setSelectedNote: (note:Note)=>void
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [search, setSearch] = useState("")
 // const [editingId, setEditingId] = useState<number | null>(null)
  //const [editTitle, setEditTitle] = useState("")
  //const [editContent,setEditContent] = useState("")

  const addNote = () => {
    if (!title || !content) return
    setNotes([
      ...notes,
      {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString()
      }
    ])
    setTitle("")
    setContent("")
    onNoteAdded()
  }

 /* const handleSave = () => {
    if (editingId === null) return
    
    const updatedNotes = notes.map((note) => {
      if (note.id === editingId){
        return {
          ...note,
          title: editTitle,
          content: editContent
        }
      }
      return note
    })

    setNotes(updatedNotes)
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
  } */
  
  return (
    <div>

      <h3>Search Notes</h3>
      <input
        className="search-input"
        placeholder="Search Notes"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      
      {showCreateNote && (
        <div className="create-note-card">
        <div className="create-note">
        <h4>Create Note</h4>
        <input
          className="input-field"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input-field"
          placeholder="Start writing. NotePal can read everything you put here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addNote}>
          Save Note
        </button>
        </div>
      </div>
      )}

    <h3>My Notes</h3>
    <div className="notes-grid">
    {notes
      .filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      )
      .map((note) => {

        return (
          <div key={note.id}>
            <NoteCard
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
              onDelete={() => deleteNote(note.id)}
              onOpen={() => setSelectedNote(note)}
            />
          </div>
        )
      })}
      </div>
    </div>
  )
}