const mongoose = require("mongoose");
const Post = require("../models/postModel");
const { deleteImage } = require("../utils/cloudinary");

//Get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
};


const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find({ privatePost: false }) 
      .populate("createdBy", "username") 
      .sort({ createdAt: -1 }); 
    
    res.status(200).json(posts); // Send the posts as a JSON response
  } catch (error) {
    console.error("Error fetching public posts:", error);
    res.status(500).json({ message: "Failed to fetch public posts." }); // Handle errors
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  // Check if the id provided in the params is genuine
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findByIdAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  // Deleting the image from cloudinary
  try {
    if (post) {
      const imageUrl = post.imageUrl;
      await deleteImage(imageUrl);
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update a Post
const updatePost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const { title, description, privatePost } = req.body;

  try {
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, privatePost },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "No such post" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a Post
const likePost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const username = req.query.username;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  try {
    if (post.likedBy.get(username)) {
      post.likedBy.delete(username);
      await post.save();
      return res
        .status(200)
        .json({ hasLiked: false, likes: post.likedBy.size });
    }

    post.likedBy.set(username, true);
    await post.save();
    res.status(200).json({ hasLiked: true, likes: post.likedBy.size });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPosts,getPublicPosts, deletePost, updatePost, likePost };
