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
      <p>{props.content}</p>
      
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