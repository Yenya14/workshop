import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
];

const noteReducer = createSlice({
    name: "notes",
    initialState,
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
export { createNote, toggleImportanceOf };

export default noteReducer.reducer;
