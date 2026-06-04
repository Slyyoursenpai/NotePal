import { useState, useEffect } from "react"
import NotesPage from "./pages/NotesPage"
import AskAIPage from "./pages/AskAIPage"
import BottomNav from "./components/BottomNav"

type Note = {   /// temporary note type check
  title: string
  content: string
}

export default function App() {
  const [page, setPage] = useState("notes")

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes")
    
    console.log("LOAD", saved)
    if (saved) {
      return JSON.parse(saved)
    }

    return [
      {
        title: "React Basics",
        content: "Components, Props, State"
      },
      {
        title: "TypeScript",
        content: "Types and Interfaces"
      }
    ]
  })
  /// save effect
  useEffect(() => {
    console.log("SAVE", notes)

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
  const deleteNote =(indexToDelete: number)=>{
    setNotes(
      notes.filter((_,index)=>index !== indexToDelete)
    )
  }

  return (
    <div>
      <h1>NotePal</h1>

      {page === "notes" && (
        <NotesPage 
        notes={notes} 
        setNotes={setNotes} 
        deleteNote={deleteNote}
        />
      )}

      {page === "askai" && <AskAIPage 
      
      />}

      <BottomNav setPage={setPage} currentPage={page} />
    </div>
  )
}