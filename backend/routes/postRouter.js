const express = require("express");
const mongoose = require("mongoose")
const Post = require("../models/postModel")
const router = express.Router();

// const posts = require("../posts.json")

// Get all posts
router.get("/", async (req, res) => {
  
  const posts = await Post.find({})
  res.status(200).json(posts);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findByIdAndDelete({_id : id})

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }
  console.log(post)
  res.status(200).json(post);
})
module.exports = router;
