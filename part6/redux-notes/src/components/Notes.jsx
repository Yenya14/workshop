import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state;
  });

  const toggleImportant = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => {
            toggleImportant(note.id);
          }}
        >
          {note.content} <strong>{note.important ? "important" : ""}</strong>
        </li>
      ))}
    </ul>
  );
};

export default Notes;