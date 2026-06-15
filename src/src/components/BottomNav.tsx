import "../components/BottomNav.css"
import {StickyNote, MessageSquare} from "lucide-react"

function BottomNav(props: {
  setPage: (page: string) => void
  currentPage: string
}) {
  return (
    <div className="bottom-nav">
      <button className={
          props.currentPage === "notes" ? "nav-button active" : "nav-button"
        } onClick={() => props.setPage("notes")}>
          <StickyNote size={18}/>
        <span>Notes</span>
        </button>

      <button className={
        props.currentPage === "askai" ? "nav-button active" : "nav-button"
        } onClick={() => props.setPage("askai")}>
         <MessageSquare size={18}/> 
        <span>Ask AI</span>
        </button>
    </div>
  )
}
export default BottomNav