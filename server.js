const express = require("express");
const postRouter = require("./post/postRouter");
const server = express();

server.use(express.json()); // req.body
server.use("/api/posts", postRouter);

module.exports = server;
