const express = require("express");
const db = require("../data/db.js");
const router = express.Router();

//EXPRESS ROUTER - ENDPOINTS

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Get by ID.
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json({ post: posts[0] });
      } else {
        res.status(404).json({ message: "This post was not found." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Post
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
  }

  db.insert({ title, contents })
    .then(postId => {
      res.status(201).json(postId.id);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Delete
router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json({ message: "Post deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Put
router.put("/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;
  db.update(id, body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// export
module.exports = router;
