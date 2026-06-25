import type { Note } from "../types/Note"

export const retrieveNotes = (
  query: string,
  notes: Note[]
) => {

  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2)

  return notes
    .map(note => {

      //const text =`${note.title} ${note.content}`.toLowerCase()
      const titleText = `${note.title}`.toLowerCase()
      const contentText = `${note.content}`.toLowerCase()

      let titleScore = 0
      let contentScore = 0
      let score = 0

      words.forEach(word => {
        if (titleText.includes(word)) {
          titleScore+=3
        }
        if (contentText.includes(word)){
          contentScore+=1
        }
      })
      score = titleScore+contentScore
      return {
        note,
        score
      }
    })

    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.note)
}