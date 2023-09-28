const express = require("express");
const app = express();
const notesRouter = require("./controllers/notes");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();