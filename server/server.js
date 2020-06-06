const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./routes");

const apiPort = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", Routes);

app.all("*", function (req, res) {
  res.send("route not mapped");
});

const server = app.listen(apiPort || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

module.exports = server;
