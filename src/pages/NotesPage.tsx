import { useState } from "react"
import NoteCard from "../components/NoteCard"
import type { Note } from "../types/Note"
import "./NotesPage.css"

export default function NotesPage({
  notes,
  //setNotes,
  deleteNote,
 // showCreateNote,
  //onNoteAdded,
  setSelectedNote
}: {
  notes: Note[]
  //setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  deleteNote: (idToDelete: number) => void
 // showCreateNote: boolean
 // onNoteAdded: ()=> void
  setSelectedNote: (note:Note)=>void
}) {
 // const [title, setTitle] = useState("")
 // const [content, setContent] = useState("")
  const [search, setSearch] = useState("")

 {/*} const addNote = () => {
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
    //onNoteAdded()
  } **/}

  const filteredNotes = notes.filter(
    (note) => note.title.toLowerCase().includes(search.toLowerCase())||
              note.content.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>

      {/*<h3>Search Notes</h3> */}
      <input
        id="search-input"
        className="search-input"
        placeholder="Search Notes"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      
      {/**{showCreateNote && (
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
      )} **/}

    <h3>My Notes</h3>
      {filteredNotes.length === 0 ? (
      <div className="empty-state">
        {search ? (
          <h3>No notes found</h3>
        ) : (
        <>
          <h3>No notes yet</h3>
          <p>Create your first note using the Add Note button.</p>
        </>
        )}</div>):(
          <div className="notes-grid">
          {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
              onDelete={() => deleteNote(note.id)}
              onOpen={() => setSelectedNote(note)}
            />
          </div>
        ))}
        </div>
      )}
    </div>
  )
}