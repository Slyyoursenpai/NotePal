import "./NoteCard.css"
function NoteCard(props:{
  title: string; 
  content: string; 
  onDelete: ()=>void
  onEdit: ()=>void
  onOpen: ()=>void
})
{
  return (
    <div className="note-card" onClick={props.onOpen}>  
      <h3>{props.title}</h3>
      <p>{props.content.length > 120
        ? props.content.slice(0,120)+"..."
        :props.content}
        </p>
      
      <div className="card-actions">
      <button
        onClick={(e) => {
          e.stopPropagation()
          props.onEdit()
        }}>Edit</button>
        
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