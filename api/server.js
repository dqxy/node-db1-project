const express = require("express");

const PostRouter = require("../router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", PostRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
