import "./NoteCard.css"
function NoteCard(props:{
  title: string; 
  content: string; 
  onDelete: ()=>void
  onEdit: ()=>void
})
{
  return (
    <div className="note-card">
      <h3>{props.title}</h3>
      <p>{props.content.length > 120
        ? props.content.slice(0,120)+"..."
        :props.content}
        </p>
      
      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={props.onEdit}>Edit</button>

        <button
          className="delete-btn"
          onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  )
}
export default NoteCard