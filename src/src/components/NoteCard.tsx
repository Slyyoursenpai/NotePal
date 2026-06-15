import "./NoteCard.css"
function NoteCard(props:{
  title: string
  content: string
  createdAt: string
  onDelete: ()=>void
  onOpen: ()=>void
})

{
    const formattedDate = new Date(
    props.createdAt
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  return (
    <div className="note-card" onClick={props.onOpen}>  
      <h3>{props.title}</h3>
      <p>{props.content.length > 120
        ? props.content.slice(0,120)+"...":props.content}</p>
        <p className="note-date">{formattedDate}</p>
      
      <div className="card-actions">
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation() 
            props.onDelete()}}>Delete</button>
      </div>
    </div>

  )
}
export default NoteCard