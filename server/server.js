const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Database/conn");
const login = require("./router/Login");
const register = require("./router/Register");

// Handling JSON data
app.use(bodyParser.json());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors({ origin: "*" }));

// use router

app.use(register);
app.use(login);

// Heder

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

// create a api

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log("http://localhost:4000");
});
