import { useState } from "react"
import type { Note } from "../types/Note"
import AIResultCard from "../components/AIResultCard"

function AskAIPage({
  notes 
}:{
  notes: Note[]
}) {
  const [question, setQuestion] = useState("")
  const [results, setResults] = useState<Note[]>([])
  const [message,setMessage] = useState("")

  const handleAsk = () => {
   /// setAnswer(question)
    if(!question.trim()){
      setMessage("Please enter a question.")
      setResults([])
      return

    }
    const matchingNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(question.toLowerCase()) ||
      note.content.toLowerCase().includes(question.toLowerCase())
    )


    if(matchingNotes.length===0){
      setMessage("No matching notes found.")
      setResults([])
      return
    }
  
    setResults(matchingNotes)
    setMessage("")
  }

  return (
    <div>
      <h1>Ask AI Page</h1>
      <p> Total Notes: {notes.length}</p>
      
      {notes.map((note)=>(
        <p key={note.id}>
          {note.title}
        </p>
      ))}

      <input
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk}>Ask AI</button>
      <p>{message}</p>

      {results.map((note)=>(
        <AIResultCard
          key={note.id}
          note={note}
        />
      ))}
    </div>
  )
}
export default AskAIPage

/****
Retrieval  Pipeline

Question
↓
handleAsk()
↓
filter()
↓
matchingNotes
↓
setResults(matchingNotes)
↓
map()
↓
Render notes
 */