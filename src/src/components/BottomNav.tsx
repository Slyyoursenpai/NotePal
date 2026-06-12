import "../components/BottomNav.css"
function BottomNav(props: {
  setPage: (page: string) => void
  currentPage: string
}) {
  return (
    <div className="bottom-nav">
      <button className={
          props.currentPage === "notes" ? "nav-button active" : "nav-button"
        } onClick={() => props.setPage("notes")}>Notes</button>

      <button className={
        props.currentPage === "askai" ? "nav-button active" : "nav-button"
        } onClick={() => props.setPage("askai")}>Ask AI</button>
    </div>
  )
}
export default BottomNav