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

server.post("/api/posts/:id/comments", (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  if (!text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the text."
    });
  } else if (!id || isNaN(id)) {
    return res.status(400).json({
      errorMessage: "Please provide a Numeric ID"
    });
  }
  try {
    db.findById(id).then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
      db.insertComment({ post_id: id, text }).then(data => {
        res.status(201).json({
          message: data
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "The comments information could not be retrieved."
    });
  }
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({
      errorMessage: "Please provide a Numeric Id"
    });
  }
  try {
    db.findById(id).then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
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

server.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({
      errorMessage: "Please provide a Numeric Id"
    });
  }
  try {
    db.findById(id).then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
      db.findPostComments(id).then(data => {
        res.status(200).json({
          data: data
        });
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
