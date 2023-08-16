//aru kasaile le lekheko code import gareko require bhaneko
const mongoose = require('mongoose')

//node le argument lai process.argv bhanni euta array/key ma haldinxa
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
//we'll just assume password pass bhako indexing bata from terminal
const password = process.argv[2]

const url =
//database ko address ko url 
  `mongodb+srv://leezamhr:${password}@cluster0.dzfcygl.mongodb.net/noteApp?retryWrites=true&w=majority`
//mongoose library chalayeko
//node server bata mongobd sanga kura garna lai banako library
mongoose.set('strictQuery',false)
//database lai connect gareko url bata
mongoose.connect(url)

//oject rakhna dini hai bhanera define gareko
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

//mongodb ma input garna lai
note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})