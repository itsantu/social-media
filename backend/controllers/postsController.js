const mongoose = require("mongoose");
const Post = require("../models/postModel");
const { deleteImage } = require("../utils/cloudinary");

//Get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });
  // for present time
  const time = new Date(Date.now()).toLocaleString();

  posts.map(async(post) => {
// it will check weather the present time matches the imageExpire. it will happen every time when some one hit the url "/"
    if(time === post.imageExpiry){
      await Post.findByIdAndDelete(post._id)

      const url = post.imageUrl
      let parts = url.split('/').slice(-2).join('/');
      let [publicId] = parts.split(".")
      try {
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        console.log(`Deleted asset with public ID: ${publicId}`, result);
      } catch (err) {
        console.error(`Error deleting asset with public ID: ${publicId}`, err);
      }
    }
  res.status(200).json(posts);
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
  const { title, description } = req.body;

  try {
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
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

module.exports = { getAllPosts, deletePost, updatePost };
