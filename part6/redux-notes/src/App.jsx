import { useEffect } from "react";
import {useDispatch} from "react-redux";
import notesService from "./services/notes"
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { createNote } from "./reducers/noteReducer";


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    notesService
    .getAll()
    .then((response)=>{
      dispatch(createNote(response))
    })
  },[])

  return (
    <div>
      <VisibilityFilter />
      <NoteForm />
      <Notes />
    </div>
  )
}

export default App;