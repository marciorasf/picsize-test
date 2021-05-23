const express = require("express");
const cors = require("cors");
const Routes = require("./routes");

const apiPort = process.env.PORT || 3100;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/", Routes);

const server = app.listen(apiPort, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

// Exit on docker stop
process.on('SIGINT', () => {
  process.exit(0)
})

module.exports = server;
