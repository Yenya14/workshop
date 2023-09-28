const app = require("express").Router();
const { Note } = require("../models/index");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

app.get("/", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const note = await Note.create(req.body);
  res.json(note);
});

app.get("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id);
  console.log(JSON.stringify(req.note, null, 2));
  if (req.note) {
    res.json(req.note);
  } else {
    res.status(404).send("no data found");
  }
});

app.put("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id);
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = app;