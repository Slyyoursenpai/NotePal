import { useState, useEffect } from "react"
import NotesPage from "./pages/NotesPage"
import AskAIPage from "./pages/AskAIPage"
import BottomNav from "./components/BottomNav"
import type { Note } from "./types/Note"
import "./App.css"
import Header from "./components/Header"

export default function App() {
  const [page, setPage] = useState("notes")
  const [showCreateNote, setShowCreateNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes")
    
    if (saved) {
      return JSON.parse(saved) 
    }

    return [
      {
        id: 1,
        title: "React Basics",
        content: "Components, Props, State"
      },
      {
        id: 2,
        title: "TypeScript",
        content: "Types and Interfaces"
      }
    ]
  })

  /// save effect
  useEffect(() => {

    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    )
  }, [notes])
  /// load effect
 /* useEffect(() => {
    const saved = localStorage.getItem("notes")
    console.log("LOAD", saved)

    if (saved){
      setNotes(JSON.parse(saved))
    }
  }, []) */
  //delete
  const deleteNote =(idToDelete: number)=>{
    setNotes(
      notes.filter((note)=>note.id !== idToDelete)
    )
  }

  return (
  <div className="app">
    <div className="app-container">
    <Header
      onAddNote={() => 
      setShowCreateNote(!showCreateNote)
      }
      showCreateNote={showCreateNote}
    />

      <main className="content">

        {page === "notes" && (
          <NotesPage
            notes={notes}
            setNotes={setNotes}
            deleteNote={deleteNote}
            showCreateNote={showCreateNote}
            onNoteAdded={()=>setShowCreateNote(false)}
            setSelectedNote={setSelectedNote}
          />
        )}

        {page === "askai" && (
          <AskAIPage notes={notes}/>
        )}
      </main>
      
      <BottomNav
        setPage={setPage}
        currentPage={page}
      />
    </div>
  </div>
)
}