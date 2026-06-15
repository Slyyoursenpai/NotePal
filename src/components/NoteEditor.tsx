import type {Note} from "../types/Note"
import "./NoteEditor.css"

type Props = {
    note: Note
    onClose: () => void
}
export default function NoteEditor({
    note,
    onClose
}: Props){
    return(
        <div className="note-editor-overlay" onClick={onClose}>
            <div className ="note-editor-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="note-editor-header">
                <button onClick={onClose}>
                    ← Notes
                </button>
            </div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
        </div>
    )
}