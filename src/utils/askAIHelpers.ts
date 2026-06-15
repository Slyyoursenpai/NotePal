import type { Note } from "../types/Note"

export const retrieveNotes = (
  query: string,
  notes: Note[]
) => {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  )
}

export const generateAnswer = async (
  query: string,
  matchingNotes: Note[]
) => {
  return `I found ${matchingNotes.length} notes related to "${query}"`
}