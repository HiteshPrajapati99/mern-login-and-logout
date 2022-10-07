const express = require("express");
const router = express.Router();
const User = require("../Database/scema");
let jwt = require("jsonwebtoken");
var secret = "Hiteshbhaiprajapati";

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email })
    .select("email password")
    .exec(function (err, user) {
      if (err) throw err;
      else {
        if (!user) {
          res.json({
            success: false,
            message: "email and password not provided !!!",
          });
        } else if (user) {
          if (!req.body.password) {
            res.json({ success: false, message: "No password provided" });
          } else {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              res.json({
                success: false,
                message: "Could not authenticate password",
              });
            } else {
              //res.send(user);
              var token = jwt.sign(
                { email: user.email, id: user._id },
                secret,
                { expiresIn: "24h" }
              );
              res.json({
                success: true,
                message: "User authenticated!",
                token: token,
              });
            }
          }
        }
      }
    });
});

router.use(function (req, res, next) {
  var token = req.body.token || req.body.query || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).json({ success: false, message: "Token invalid" });
      } else {
        // console.log("ufghfgh", decoded);
        req.decoded = decoded;

        next();
      }
    });
  } else {
    res.status(401).json({ success: false, message: "No token provided" });
  }
});

router.get("/profile", (req, res) => {
  User.findOne({ email: req.decoded.email }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, message: user });
    }
  });
});

router.put("/profile/edit/:id", function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "No user found" });
    } else {
      user.name = req.body.name;
      user.number = req.body.number;
      user.email = req.body.email;
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
});

module.exports = router;

// api urls

// post data url => "http://localhost:4000/register"
// get data url  => "http://localhost:4000/get"
// delet data url  =>  `http://localhost:4000/delet/${id}`
//  edit api data url => `http://localhost:4000/edit/${id}`
// get data using id => `http://localhost:4000/edit/${id}`

// get profile login user => "http://localhost:4000/profile"
