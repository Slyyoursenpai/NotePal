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
  const [aiAnswer, setAiAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const retrieveNotes = (query: string) => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    )
  }
  //// helper function for answer generation and return
  const generateAnswer = async (
    query:string,
    matchingNotes: Note[]
  ) => {
    return `I found ${matchingNotes.length} notes related to "${query}"`
  }

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
     // setResults([])
     // setAiAnswer("")
      clearResults()
      return
    }

    const matchingNotes = retrieveNotes(question)   
     /**  notes.filter((note) =>
      note.title.toLowerCase().includes(question.toLowerCase()) ||
      note.content.toLowerCase().includes(question.toLowerCase())
    ) **/

    if(matchingNotes.length===0){
      setMessage("No matching notes found.")
     // setResults([])
     // setAiAnswer("")
     clearResults()
      return
    }

    setResults(matchingNotes)
    
    setIsLoading(true)

    const answer = await generateAnswer(
      question, matchingNotes
    )

    {isLoading && (
      <p>Finding from notes...</p>
    )}
    setAiAnswer(answer)
    /*setAiAnswer(
      `I found ${matchingNotes.length} notes related to "${question}"`
    ) */
    setIsLoading(false)
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
    
      {aiAnswer && (
        <div
          style={{
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px" 
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