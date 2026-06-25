import { useState, useEffect } from "react"
import NotesPage from "./pages/NotesPage"
import AskAIPage from "./pages/AskAIPage"
import BottomNav from "./components/BottomNav"
import type { Note } from "./types/Note"
import "./App.css"
import Header from "./components/Header"
import NoteEditor from "./components/NoteEditor"
import CreateNoteModal from "./components/CreateNoteModal"


export default function App() {
  const [page, setPage] = useState("notes")
  //const [showCreateNote, setShowCreateNote] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  // for ai message save/load
  const [messages, setMessages] = useState<{ 
      role: "user" | "assistant"
      content: string}[]>(() => {
        const saved = localStorage.getItem("messages")
        try{
          if (saved) {
            return JSON.parse(saved)
          }
      } catch (error){
          console.error("Failed to load messages", error)
        }
        return []
      })
    // for user notes save/load
  const [notes, setNotes] = useState<Note[]>(() => {
    try{
      const saved = localStorage.getItem("notes")
      if (saved) {
        return JSON.parse(saved) 
      }
    } catch(error){
      console.error("Failed to load notes", error)
    }
    return [
      { /// test data for notes
        id: 1,
        title: "React Basics",
        content: "Components, Props, State",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "TypeScript",
        content: "Types and Interfaces",
        createdAt: new Date().toISOString()
      }
    ]
  })

    //// temporary response box test
    useEffect(() => {
      if (messages.length==0){
      setMessages([
      {
        role: "assistant",
        content: `
      # React

      React uses:

      - Components
      - State
      - Props

      \`\`\`js
      const x = 1;
      \`\`\`

      > Important note
      `
          }
        ])}
      }, []) 

  /// save effect for notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes)
    )}, [notes])

  /// save effect for messages
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages))
  }, [messages])

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
      setShowCreateModal(true)
      }
     // showCreateNote={showCreateModal}
    />

    {selectedNote && (
      <NoteEditor
        note={selectedNote}
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
        onClose={() => setSelectedNote(null)}
      />
    )}

    {showCreateModal && (
      <CreateNoteModal
        setNotes={setNotes}
        onClose={() => setShowCreateModal(false)}
      />
    )}

      <main className="content">

        {page === "notes" && (
          <NotesPage
            notes={notes}
           // setNotes={setNotes}
            deleteNote={deleteNote}
            //showCreateNote={showCreateNote}
            //onNoteAdded={()=>setShowCreateNote(false)}
            setSelectedNote={setSelectedNote}
          />
        )}

        {page === "askai" && (
          <AskAIPage notes={notes} 
          messages={messages}
          setMessages={setMessages}
          
          />
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