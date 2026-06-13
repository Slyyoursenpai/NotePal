import "./Header.css";
import {Sparkles, Plus} from "lucide-react";

function Header({
    onAddNote,
    showCreateNote
}:{
    onAddNote: ()=> void
    showCreateNote: boolean
}){
    return (
        <header className="header">
            <div className="header-title">
                <Sparkles size={20} />
            <h1>NotePal</h1>
            </div>
            <button className="add-note-btn" onClick={onAddNote}>
                {showCreateNote ? "✕ Cancel" : "+ Add Note"}
            </button>
        </header>
    )
}
export default Header 