function BottomNav(props: {
  setPage: (page: string) => void
  currentPage: string
}) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <button onClick={() => props.setPage("notes")}>
        Notes {props.currentPage === "notes" ? "●" : ""}
      </button>

      <button onClick={() => props.setPage("askai")}>
        Ask AI {props.currentPage === "askai" ? "●" : ""}
      </button>
    </div>
  )
}

export default BottomNav