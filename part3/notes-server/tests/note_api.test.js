const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helpers = require("./tests_helper")

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helpers.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  //duita promise resolve nabhaye samma yo tala ko line ma await garxa
  await Promise.all(promiseArray)
})

const api = supertest(app)

describe("testing GET method", () =>{

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('there are two notes', async () => {
    const response = await helpers.notesInDb();
  
    expect(response).toHaveLength(helpers.initialNotes.length)
  })
  
  test('the first note is about HTTP methods', async () => {
    const response = await helpers.notesInDb();
    const contents = response.map((r) => r.content);
  
    expect(contents).toContain(helpers.initialNotes[0].content);
  })
})

describe("testing POST method", () =>{

  test('a note without content cannot be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/notes')
  
    expect(response.body).toHaveLength(helpers.initialNotes.length+1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})