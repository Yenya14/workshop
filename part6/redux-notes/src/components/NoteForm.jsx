import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NoteForm = () => {

    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    const addNote = (event) => {
        event.preventDefault();
        const newNote = {
          content: event.target.myInput.value,
          important: true,
          id: notes.length + 1,
        }
        dispatch(createNote(newNote));
        event.target.myInput.value = null;
    };
    return (
        <form onSubmit = { addNote } >
            <input  name="myInput" />
            <button>Add note</button>
        </form>
    );
};

export default NoteForm;