const router = require("express").Router();
let Notes = require("../models/note");

router.route("/").get((req, res) => {
  const user = req.body.username;
  Notes.find({ user: user })
    .then((notes) => {
      if (notes.length < 1) {
        res.status(404).json({
          status: "Failed",
          message: "Create your first note",
        });
      } else {
        res.status(200).json({
          status: "Success",
          notes,
        });
      }
    })
    .catch((error) =>
      res.status(400).json({ status: "Failed", message: error }),
    );
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
    .then(() =>
      res.status(200).json({
        status: "Success",
        message: "Note added",
      }),
    )
    .catch((error) =>
      res.status(400).json({
        status: "Failed",
        message: error,
      }),
    );
});

router.route("/:id").get((req, res) => {
  Notes.findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: "Success",
          data,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "No notes present with this Id!!",
        });
      }
    })
    .catch((error) =>
      res.status(400).json({ status: "Failed", message: error }),
    );
});

router.route("/:id").delete((req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          status: "Success",
          message: "Note Deleted",
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "No notes present with this Id to delete!!",
        });
      }
    })
    .catch((error) =>
      res.status(400).json({ status: "Failed", message: error }),
    );
});

router.route("/update/:id").post((req, res) => {
  Notes.findById(req.params.id)
    .then((notes) => {
      if (notes) {
        notes.user = req.body.username;
        notes.description = req.body.description;
        notes.title = req.body.title;

        notes
          .save()
          .then(() => res.json("Note updated"))
          .catch((error) =>
            res.status(400).json({ status: "Failed", message: error }),
          );
      } else {
        res.status(400).json({
          status: "Failed",
          message: "No notes present with this Id to update!!",
        });
      }
    })
    .catch((error) =>
      res.status(400).json({ status: "Failed", message: error }),
    );
});

router.route("*").get((req, res) => {
  res.status(400).json({
    message: "Api not found",
  });
});

module.exports = router;
