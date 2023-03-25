const router = require("express").Router();
let Notes = require("../models/note");

router.route("/").get((req, res) => {
  Notes.find()
    .then((notes) => res.json(notes))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("/add").post((req, res) => {
  const user = req.body.username;
  const title = req.body.title;
  const description = req.body.description;

  const newNote = new Notes({
    user,
    description,
    title,
  });

  newNote
    .save()
    .then(() => res.json("Note added"))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("/:id").get((req, res) => {
  Notes.findById(req.params.id)
    .then((notes) => res.json(notes))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("/:id").delete((req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted"))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("/update/:id").post((req, res) => {
  Notes.findById(req.params.id)
    .then((notes) => {
      notes.user = req.body.username;
      notes.description = req.body.description;
      notes.title = req.body.title;

      notes
        .save()
        .then(() => res.json("Note updated"))
        .catch((error) => res.status(400).json(`Error: ${error}`));
    })
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("*").get((req, res) => {
  res.status(400).json({
    message: "Api not found",
  });
});

module.exports = router;
