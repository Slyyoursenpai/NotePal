import { useState, useEffect, useRef } from "react"
import type { Note } from "../types/Note"
//import AIResultCard from "../components/AIResultCard"
import {retrieveNotes} from "../utils/askAIHelpers"
import {generateAIResponse} from "../utils/geminiHelper"
import "./AskAIPage.css"
import {Send, Loader2} from "lucide-react"
import ChatMessage from "../components/ChatMessage"

function AskAIPage({
  notes,
  messages,
  setMessages
}:{
  notes: Note[]
  messages: {
    role: "user" | "assistant"
    content: string
  }[]
  setMessages: React.Dispatch<React.SetStateAction<{
    role: "user" | "assistant"
    content: string
  }[]>
  >
}) {
  

  const [question, setQuestion] = useState("")
  const [results, setResults] = useState<Note[]>([])
  const [message,setMessage] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  //const [aiAnswer, setAiAnswer] = useState("") // to store one answer
  const [isLoading, setIsLoading] = useState(false)
 /* const [messages, setMessages] = useState<
    {
      role: "user" | "assistant"
      content: string
      }[]
    >([]) */ //moved to app.tsx to retain message state
  
    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth"
      })
    }, [messages])

    //// temporary response box test
    /*useEffect(() => {
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
        ])
      }, []) */

  ///helper function for setResults([]), setAIAnswer("") to clear results
  const clearResults = () => {
    setResults([])
    //setAiAnswer("") // setting answer in single block (previous style)
  }

  const handleAsk = async () => {  
    if(!question.trim()){
     // setMessage("Please enter a question.")
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

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: question
      }
    ])
    setQuestion("")
    
    setIsLoading(true)
    setResults(matchingNotes)

    try {
      const answer = await generateAIResponse(
        question,
        context
      )

      //setAiAnswer(answer)
      setMessages(prev => [
      ...prev,
        {
          role: "assistant",
          content: answer
        }
      ])
      setMessage("")
    }
    
      catch (error: any) {
        if (error?.message?.includes("429")) {
          setMessage(
            "Gemini API quota exceeded. Please try again later."
          )
        } else {
          setMessage(
            "Failed to get AI response."
          )
        }
        console.error(error)
      }
    finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="askai-page">
      
      {messages.length === 0 && (
        <div className="empty-chat">
          <h1>Ask NotePal</h1>
          <h2>How can I help?</h2>
          <p>I can read across all your notes.</p>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
          ))}
          
          {isLoading && (
            <div className="thinking-row">
              <Loader2 size={16} className="spinner" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={bottomRef}></div>

      </div>

      <div className="chat-composer">
      <textarea
        id="chat-input"
        className="chat-input"
        placeholder="Ask NotePal..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e)=>{
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleAsk()
          }
        }}
        />
      <button 
      className="send-btn" aria-label="send message"
      onClick={handleAsk}>
        <Send size={18}/>
      </button>
    </div>

      {/*{aiAnswer && (
        <div className="ai-answer">
        <p>{aiAnswer}</p>
        </div>  // single answer block
      )} */}
      <p>{message}</p>
      {/**{results.length > 0 && (
        <h3 className="sources-title">Sources</h3>
      )}
  
      {results.map((note)=>(
        <AIResultCard
          key={note.id}
          note={note}
        />
      ))} **/}
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
