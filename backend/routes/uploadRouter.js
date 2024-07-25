const express = require("express");
const upload = require("../middleware/multer");
const Post = require("../models/postModel");
const cloudinary = require("../utils/cloudinary");
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    // Uploading the image to cloudinary and storing the response
    const uploadResult = await cloudinary.uploader
      .upload(req.file?.path, { folder: "SocialMedia" })
      .catch((error) => {
        console.log(error);
      });

    // Extracting the "url" from the response to store into the db
    const imageUrl = await uploadResult.url;

    const userId = req.user._id;

    // Creating a new doc
    const newPost = await Post.create({
      title,
      description,
      imageUrl,
      createdBy: userId
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
