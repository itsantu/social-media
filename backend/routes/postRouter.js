const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")

// import controllers
const { getAllPosts, deletePost, updatePost } = require("../controllers/postsController");

router.use(requireAuth)
// Get all posts
router.get("/", getAllPosts);

// Delete a post with id reference
router.delete("/:id", deletePost)

router.patch("/:id", updatePost)

module.exports = router;
