const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const Routes = require("./routes");

const apiPort = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("../client/build"));

app.use("/api", Routes);

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const server = app.listen(apiPort || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

module.exports = server;
