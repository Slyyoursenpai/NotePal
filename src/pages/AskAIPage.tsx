import { useState } from "react"
import type { Note } from "../types/Note"
import AIResultCard from "../components/AIResultCard"
import {retrieveNotes} from "../utils/askAIHelpers"
import {generateAIResponse} from "../utils/geminiHelper"

function AskAIPage({
  notes 
}:{
  notes: Note[]
}) {
  
  //console.log(import.meta.env.VITE_API_KEY)

  const [question, setQuestion] = useState("")
  const [results, setResults] = useState<Note[]>([])
  const [message,setMessage] = useState("")
  const [aiAnswer, setAiAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  ///helper function for setResults([]), setAIAnswer("") to clear results
  const clearResults = () => {
    setResults([])
    setAiAnswer("")
   // setIsLoading(false)
  }
  /// 
  const handleAsk = async () => {  
   /// setAnswer(question)
    if(!question.trim()){
      setMessage("Please enter a question.")
      clearResults()
      return
    }

   const matchingNotes = retrieveNotes(question, notes)
    
 /*   const context = matchingNotes.map(
      (note) => `Title: ${note.title}\nContent: ${note.content}`
    ).join("\n\n") */

   /* if(matchingNotes.length===0){
     setMessage("No matching notes found.")
     clearResults()
      return
    } */

    const context = notes.map(
      (note, index) =>
        `NOTE ${index + 1}
    Title: ${note.title}
    Content: ${note.content}`
    ).join("\n\n")
    
    setIsLoading(true)
    setResults(matchingNotes)

    try {
      const answer = await generateAIResponse(
        question,
        context
      )

      setAiAnswer(answer)
      setMessage("")
    }
    catch (error: any) {
      console.error(error)
      setMessage("Failed to get AI response.")
    }
    finally {
      setIsLoading(false)
    }
   // setMessage("")
  }
  return (
    <div>
      <h1>Ask AI Page</h1>
      <input
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk}>Ask AI</button>
      
      {isLoading && (
      <p>Finding from notes...</p>
      )}

      {aiAnswer && (
        <div
          style={{
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "11px",
            marginTop: "10px" 
          }}
        >
        <p>{aiAnswer}</p>
        </div>
      )}
      <p>{message}</p>

      {results.length > 0 && (
        <p>{results.length} notes found</p>
      )}
  
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