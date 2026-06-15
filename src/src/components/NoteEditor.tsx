import React from "react"
import type {Note} from "../types/Note"
import "./NoteEditor.css"

type Props = {
    note: Note
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
    onClose: () => void
}
export default function NoteEditor({
    note,
    notes,
    setNotes,
    onClose
}: Props){

    const updateTitle = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedNotes = notes.map(n =>
            n.id === note.id ? {
                ...n, title: e.target.value
            } : n
        )
        setNotes(updatedNotes)
    }

    const updateContent = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const updatedNotes = notes.map(n =>
            n.id === note.id ? {
                ...n, content: e.target.value
            } : n 
        )
        setNotes(updatedNotes)
    }

    return(
        <div className="note-editor-overlay" onClick={onClose}>
            <div className ="note-editor-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="note-editor-header">
                <button onClick={onClose}>
                    ← Notes
                </button>
            </div>
            <input
            className="editor-title"
            aria-label="Note title"
            placeholder="Untitled Note"
            value={
                notes.find(n => n.id === note.id)?.title || ""
            }
            onChange={updateTitle}
            />

            <textarea
            className="editor-content"
            aria-label="Note Content"
            placeholder="Start writing..."
            value={
                notes.find(n => n.id === note.id)?.content || ""
            }
            onChange={updateContent}
            />
        </div>
        </div>
    )
}