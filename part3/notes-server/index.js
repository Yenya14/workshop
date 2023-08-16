const express = require("express")
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const {url, PORT} = require("./utils/config")
const {errorHandler, noHandlers, requestLogger}= require("./utils/middleware")
const {info} = require("./utils/logger")

app.use(express.json())

app.use(express.static("build"))

app.use(cors())
mongoose.set('strictQuery',false)
mongoose.connect(url)

//database ma xaina mongoose le nai cretae garirako
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.use(requestLogger)


//express le code short garxa

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((result)=>{
     response.json(result)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  //id ma jun number xa tei aauxa
  //javascript env bata baira jana paryo ki promise farkai halxa
  Note.findById(request.params.id).then((result)=>{  
  if (result) {
    response.json(result)
  } else {
    response.status(404).send(`There are no notes at ${request.params.id}`)
  }})
  //errorhandler bhako middleware lai argument pathako
  .catch((e)=>{
    next(e)
  })

})

app.put('/api/notes/:id', (request, response, next) => {

  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id, 

    { content, important },
    { new: true, runValidators: true, context: 'query' }
  ) 
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})
//jun http bata create server gareko hamro http bata object ma .listen bhanne method call garera server suru gareko

app.use(noHandlers)

// this has to be the last loaded middleware.
app.use(errorHandler)

//3001 ma sunum haii
app.listen(PORT)
info(`Server running on port ${PORT}`, "logging from index")