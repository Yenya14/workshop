import { createSlice } from "@reduxjs/toolkit";
import notesService from "../services/notes"

const noteReducer = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        createNote(state, action) {
            const newState = state.concat(action.payload);
            return newState;
        },
        toggleImportanceOf(state, action) {
            let myNote = state.find((note) => 
                note.id === action.payload
            );
            let changedNote = { ...myNote, important: !myNote.important};
            return state.map((note) =>  
                note.id === changedNote.id ? changedNote : note
            );
        }
    },
});

const { createNote, toggleImportanceOf } = noteReducer.actions;

const makeNote = (newNote) => {
    return async (dispatch) => {
        const myNote = await notesService.createNew(newNote)
        dispatch(createNote(myNote))
    }
}

export { createNote, toggleImportanceOf, makeNote };

export default noteReducer.reducer;
