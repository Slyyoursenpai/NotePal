import type { Note } from "../types/Note"

//function AIResultCard(props: { note: Note })
export default function AIResultCard({
  note
}: {
  note: Note
}) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  )
}