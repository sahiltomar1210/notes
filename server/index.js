const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/routes/user");
const Note = require("./src/routes/note");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(`${process.env.MONGOOSE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDb"))
  .catch((e) => console.log(e.message));

app.use("/users", User);
app.use("/notes", Note);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "API NOT FOUND",
  });
});

app.listen(3000, () => {
  console.log("server is running at Port 3000");
});
