const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    db.insert(req.body).then(data => {
      res.status(201).json({
        message: data
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

server.get("/api/posts", (req, res) => {
  try {
    db.find().then(data => {
      res.status(200).json({
        data: data
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
