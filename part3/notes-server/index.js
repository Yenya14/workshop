const express = require("express")
const app = express();
//request body ma object ma convert garera pathauxa
app.use(express.json())
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();

app.use(express.static("build"))

app.use(cors())
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)

//database ma xaina mongoose le nai cretae garirako
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next();
} 
app.use(requestLogger)

let notes=[]

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
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  //kun naya note banako request.body ma aako
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
//jun http bata create server gareko hamro http bata object ma .listen bhanne method call garera server suru gareko

app.use((request, response, next) => {
 response.status(404).send("no code available to handle this request")
} )

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

//3001 ma sunum haii
app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`)