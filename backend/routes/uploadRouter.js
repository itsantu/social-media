const express = require("express");
const upload = require("../middleware/multer");
const Post = require("../models/postModel");
const { cloudinary } = require("../utils/cloudinary");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Uploading the image to cloudinary and storing the response
    const uploadResult = await cloudinary.uploader
      .upload(req.file?.path, {
        folder: "SocialMedia",
        transformation: [
          { width: 800, height: 800, crop: "limit" }, // Resize image to a maximum width and height of 800px
          { quality: "auto" }, // Automatically adjust quality
          { fetch_format: "auto" }, // Automatically adjust format for better compression
        ],
      })
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
      createdBy: userId,
    });

    res.status(201).json(newPost);
    
// for automat the expire of cloudinary assets
     const publicId = await uploadResult.public_id;

      await setTimeout(async () => {
        try {
          const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
          console.log(`Deleted asset with public ID: ${publicId}`, result);
        } catch (err) {
          console.error(`Error deleting asset with public ID: ${publicId}`, err);
        }
      },3*24*50*60*1000);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
