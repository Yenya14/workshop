import { useSelector, useDispatch } from "react-redux"; 
import { toggleImportanceOf } from "../reducers/noteReducer";

const Notes = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => {
        return state.filter;
    });
    const notes = useSelector((state) => {
        if(filter === "ALL")
        {
            return state.notes;
        }
        if(filter === "IMPORTANT")
        {
            return state.notes.filter((note) => {
                if(note.important === true)
                {
                    return true;
                }
            });
        }
        if(filter === "NONIMPORTANT")
        {
            return state.notes.filter((note) => {
                if(note.important === false)
                {
                    return true;
                }
            });
        }
    });

const toggleImportant = (id) => {
    dispatch(toggleImportanceOf(id));
};

    return (
        <ul>
            {notes.map((note) => 
                <li 
                    key = {note.id} onClick={ () => { toggleImportant(note.id) }}>
                    {note.content} <strong> {note.important ? 'important' : ''} </strong>
                </li>
            )};
      </ul>
    )
};

export default Notes;