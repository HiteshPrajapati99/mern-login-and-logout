const express = require("express");
const router = express.Router();
const User = require("../Database/scema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  var user = new User();

  user.name = req.body.name;
  user.number = req.body.number;
  user.email = req.body.email;
  user.password = req.body.password;
  if (
    req.body.name == null ||
    req.body.name == "" ||
    req.body.number == null ||
    req.body.number == "" ||
    req.body.email == null ||
    req.body.email == "" ||
    req.body.password == null ||
    req.body.password == ""
  ) {
    res.json({
      success: false,
      message: "Ensure Name, Number, Email and Password were provided",
    });
  } else {
    user.save(function (err) {
      if (err) {
        if (err.errors != null) {
          if (err.errors.name) {
            res.json({
              success: false,
              message: "Required minimum digits 3 of  Name",
            });
          } else if (err.errors.email) {
            res.json({ success: false, message: err.errors.email.message });
          } else if (err.errors.password) {
            res.json({ success: false, message: err.errors.password.message });
          }
        } else {
          res.json({ success: false, message: err });
        }
      } else {
        res.json({ success: true, message: "Successfully Registered !" });
      }
    });
  }
});

module.exports = router;
