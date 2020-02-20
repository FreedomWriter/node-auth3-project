const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use("/", (req, res) => {
  res.send("<h5>Ready to serve</h5>");
});

server.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

module.exports = server;
