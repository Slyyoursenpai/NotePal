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

      const text =
        `${note.title} ${note.content}`.toLowerCase()

      let score = 0

      words.forEach(word => {
        if (text.includes(word)) {
          score++
        }
      })

      return {
        note,
        score
      }
    })

    .filter(item => item.score > 0)

    .sort((a, b) => b.score - a.score)

    .map(item => item.note)
}