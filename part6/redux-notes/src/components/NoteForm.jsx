import { useDispatch, useSelector } from "react-redux";
import { makeNote } from "../reducers/noteReducer";

const NoteForm = () => {

    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    const addNote = (event) => {
        event.preventDefault();
        const newNote = {
          content: event.target.myInput.value,
          important: true,
        }
        dispatch(makeNote(newNote))
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