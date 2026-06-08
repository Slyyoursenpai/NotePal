import type { Note } from "../types/Note"

//function AIResultCard(props: { note: Note })
export default function AIResultCard({
  note
}: {
  note: Note
}) {
  return (
    <div 
        style={{
            border:"1px solid gray",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px"
        }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  )
}