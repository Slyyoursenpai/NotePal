import { useState } from "react"
import type { Note } from "../types/Note"
function AskAIPage({
  notes 
}:{
  notes: Note[]
}) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleAsk = () => {
   /// setAnswer(question)
    if(!question.trim()){
      setAnswer("Please enter a question.")
      return

    }
    const matchingNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(question.toLowerCase()) ||
      note.content.toLowerCase().includes(question.toLowerCase())
    )


    if(matchingNotes.length===0){
      setAnswer("No matching notes found.")
      return
    }
  
    setAnswer(
      matchingNotes.map((note) => `${note.title}: ${note.content}`)
      .join("|")
    )
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
      <p>{answer}</p>
    </div>
  )
}

export default AskAIPage