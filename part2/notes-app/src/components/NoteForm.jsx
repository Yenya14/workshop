import { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [newNote, setNewNote] = useState("");

  const mySubmit = (e) => {
    e.preventDefault();
    onSubmit({
      content: newNote,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  }

    return (
      <div>
        <h2>Create a new note</h2>
  
        <form onSubmit={mySubmit}>
          <input/>
          <input
            className="someThing"
            placeholder="enter something here"
            value={newNote}
            onChange={(e)=>setNewNote(e.target.value)}
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
  }

  export default NoteForm