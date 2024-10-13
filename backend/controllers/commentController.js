const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const { default: mongoose } = require("mongoose");

const getComments = async (req, res) => {
  const { id } = req.params;

  const isValidPostId = await Post.findById(id);
  if (!isValidPostId) {
    return res.status(400).json({ error: "No such posts!" });
  }

  try {
    const comments = await Comment.find({ postId: id }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;

  const { username, comment } = req.body;

  const isValidUsername = await User.find({ username });
  if (!isValidUsername) {
    return res.status(404).json({ error: "No such user found" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid post ID" });
  }

  try {
    const newComment = new Comment({
      postId: id,
      username,
      comment,
    });

    await Post.findByIdAndUpdate(id, { $inc: { commentCount: 1 } });

    await newComment.save();
    return res.status(201).json({ success: true, newComment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id, postId, decrementValue } = req.query; 
  
  const isValidComment = await Comment.findById(id);
  if (!isValidComment) {
    return res.status(400).json({ error: "No such comment!" });
  }

  try {
    await Comment.findByIdAndDelete(id);
    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: -decrementValue } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status({ error: error.message });
  }
};

const addReply = async (req, res) => {
  const { id, postId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  try {
    const { username, comment } = req.body;
    const isValidUsername = await User.findOne({ username });
    if (!isValidUsername) {
      return res.status(404).json({ error: "No such user found" });
    }

    const reply = {
      username,
      comment,
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $push: { replies: reply } }, // Add the reply to the replies array
      { new: true } // Return the updated comment
    );

    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    return res
      .status(200)
      .json({ success: "Reply added successfully", updatedComment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteReply = async (req, res) => {
  const { id, postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  try {
    const { replyid } = req.headers;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $pull: { replies: { _id: replyid } } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Reply not found!" });
    }

    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });

    return res.status(200).json({ success: true, updatedComment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
  addReply,
  deleteReply,
};
