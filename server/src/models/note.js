const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    user: String,
    title: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

const Notes = mongoose.model("notes", notesSchema);

module.exports = Notes;
