import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

// test('<NoteForm /> updates parent state and calls onSubmit', async () => {
//   const createNote = jest.fn(); //dummy function

//   render(<NoteForm onSubmit={createNote} />);

//   const input = screen.getByPlaceholderText('enter something here'); // Updated placeholder text
//   const sendButton = screen.getByText('save');

//   await userEvent.type(input, 'testing a form...');
//   await userEvent.click(sendButton);

//   expect(createNote.mock.calls).toHaveLength(1);
//   expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
// });

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn(); //dummy function
  
    let  {container} = render(<NoteForm onSubmit={createNote} />);
  
    
    const input = container.querySelector('.someThing'); // Updated placeholder text
    // const input = screen.getByPlaceholderText('enter something here'); // Updated placeholder text
    const sendButton = screen.getByText('save');
  
    await userEvent.type(input, 'testing a form...');
    await userEvent.click(sendButton);
  
    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
  });