import { useState } from "react"
import type { Note } from "../types/Note"
import AIResultCard from "../components/AIResultCard"
import {retrieveNotes} from "../utils/askAIHelpers"
import {generateAIResponse} from "../utils/geminiHelper"
import "./AskAIPage.css"

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
  }

  const handleAsk = async () => {  
    if(!question.trim()){
      setMessage("Please enter a question.")
      clearResults()
      return
    }

   const matchingNotes = retrieveNotes(question, notes)
    
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
  }
  return (
    <div>
      <h1>Ask Notepal</h1>
      <h2>How can I help?</h2>
      <p>I can read across all your notes.</p>
      <input
        className="input-field"
        placeholder="Ask NotePal..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        />

      <button 
      className="ask-btn"
      onClick={handleAsk}>Ask AI</button>
      
      {isLoading && (
      <p className="loading-text">Searching your notes...</p>
      )}

      {aiAnswer && (
        <div className="ai-answer">
        <p>{aiAnswer}</p>
        </div>
      )}
      <p>{message}</p>

      {results.length > 0 && (
        <h3 className="sources-title">Sources</h3>
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