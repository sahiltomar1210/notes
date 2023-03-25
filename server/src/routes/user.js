const router = require("express").Router();
let User = require("../models/user");

router.route("/").post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email, password: password })
      .then((notes) => {
        if (!notes) {
          res.status(404).json({
            status: "Failed",
            message: "User does not exists!!",
          });
        } else {
          res.status(200).json({
            status: "Success",
            notes,
          });
        }
      })
      .catch((error) =>
        res.status(400).json({
          status: "Failed",
          message: "Server Error",
        }),
      );
  } catch (e) {}
});

router.route("/add").post(async (req, res) => {
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
        res.status(200).json({
          status: "Success",
          message: "User Created!!",
          data,
        });
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
