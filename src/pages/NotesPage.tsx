import { useState } from "react"
import NoteCard from "../components/NoteCard"
import type { Note } from "../types/Note"
import "./NotesPage.css"

export default function NotesPage({
  notes,
  setNotes,
  deleteNote
}: {
  notes: Note[]
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  deleteNote: (idToDelete: number) => void
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent,setEditContent] = useState("")

  const addNote = () => {
    if (!title || !content) return
    setNotes([
      ...notes,
      {
        id: Date.now(),
        title,
        content
      }
    ])

    setTitle("")
    setContent("")
  }

  const handleSave = () => {
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
  }
  
  return (
    <div>
      <h2>My Notes</h2>

      <p>Search Notes</p>
      <input
        className="input-field"
        placeholder="Search Notes"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      
      <p>Create Note</p>

      <div className="create-note">
      <input
        className="input-field"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="input-field"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addNote}>
        Add Note
      </button>
      </div>

    <p>Notes</p>
    {notes
      .filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      )
      .map((note) => {

        return (
          <div key={note.id}>
            {note.id === editingId ? (
            <>
             <label>
              Title
              <input 
              className="input-field"
                value={editTitle} 
                onChange={(e) => 
                  setEditTitle(e.target.value)} 
              />
              </label>
              
              <label>
                Content
              <textarea
                className="input-field" 
                value={editContent} 
                onChange={(e) => 
                  setEditContent(e.target.value)} 
              />
              </label>
              <button onClick={handleSave}>Save</button>
            </>
          
            ):(
            <>
            <NoteCard
              title={note.title}
              content={note.content}
              onDelete={() => deleteNote(note.id)}
              onEdit={() => {
                setEditingId(note.id)
                setEditTitle(note.title)
                setEditContent(note.content)
              }}/>
            </>
            )}
          </div>
        )
      })}
    </div>
  )
}