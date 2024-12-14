const express = require("express")
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { getComments, addComment, deleteComment, addReply, deleteReply } = require("../controllers/commentController");


router.get("/:id", getComments);    // gets comments based on Post Id

router.use(requireAuth);

router.post("/add-comment/:id", addComment);    // posts comments based on Post Id

router.delete("/delete-comment", deleteComment);    // Deletes comment based on comment id

router.post("/add-reply",addReply)      // adds reply based on comment id

router.delete("/delete-reply",deleteReply)      // deletes reply based on post and comment id

module.exports = router