const express = require("express")
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { getComments, addComment, deleteComment, addReply, deleteReply } = require("../controllers/commentController");


router.use(requireAuth);

router.get("/:id", getComments);    // gets comments based on Post Id

router.post("/add-comment/:id", addComment);    // posts comments based on Post Id

router.delete("/delete-comment", deleteComment);    // Deletes comment based on comment id

router.post("/add-reply/:id",addReply)      // adds reply based on comment id

router.delete("/delete-reply/:id",deleteReply)      // deletes reply based on post and comment id

module.exports = router