const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./src/routes/user");
const Note = require("./src/routes/note");
app.use(express.json());
app.use(cors());
mongoose
  .connect(`mongodb+srv://sahil:sahil@cluster.fsqhtkp.mongodb.net/notes`)
  .then(console.log("connected to MongoDb"))
  .catch((e) => console.log(e.message));

app.use("/users", User);
app.use("/notes", Note);

app.get("*", (req, res) => {
  res.send("API NOT FOUND");
});

app.listen(8080, () => {
  console.log("server is running");
});
