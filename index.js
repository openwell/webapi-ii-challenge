const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
