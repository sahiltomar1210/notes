const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.route("/").post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const user = email.split("@");
    const username = user[0];
    if (!email || !password || !confirmPassword) {
      res.status(404).json({
        status: "Failed",
        message: "Please fill all the details",
      });
    } else if (email === "" || password === "" || confirmPassword === "") {
      res.status(404).json({
        status: "Failed",
        message: "Please fill all the details",
      });
    } else if (password !== confirmPassword) {
      res.status(404).json({
        status: "Failed",
        message: "Password and Confirm Password are not same",
      });
    } else {
      const data = await User.create({
        email,
        password,
        username,
      });
      if (data) {
        res.send(data);
      }
    }
  } catch (e) {
    if (e.code === 11000) {
      res.status(404).json({
        status: "Failed",
        message: "User already exists",
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
});

module.exports = router;
