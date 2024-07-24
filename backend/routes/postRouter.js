const express = require("express");
const router = express.Router();

// import controllers
const { getAllPosts, deletePost, updatePost } = require("../controllers/postsController")

// Get all posts
router.get("/", getAllPosts);

// Delete a post with id reference
router.delete("/:id", deletePost)

router.patch("/:id", updatePost)

module.exports = router;
