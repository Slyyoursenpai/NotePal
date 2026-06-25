import "./ChatMessage.css"
import ReactMarkdown from "react-markdown"

type Props = {
    role: "user" | "assistant"
    content: string
}

export default function ChatMessage({
    role,
    content
}: Props){
    return(
        <div className={`message ${role}`}>
            {role === "user" ? (
                <div className="message-bubble">
                    {content}
                </div>
        ) : (
        <div className="assistant-content">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )}
    </div>
  )
}