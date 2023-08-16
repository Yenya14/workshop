const mongoose = require('mongoose');
const {info} = require("./utils/logger");


if (process.argv.length < 3) {
  info('give password as argument');
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);     //collection name

const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

note.save().then(() => {                    //note bata input garna note.save()
  info('note saved!');
  mongoose.connection.close();
})