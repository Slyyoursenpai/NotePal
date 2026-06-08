function NoteCard(props:{title: string; content: string; onDelete: ()=>void}) 
{
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      
      <button onClick={props.onDelete}>
        Delete
      </button>
    </div>
  )
}
export default NoteCard