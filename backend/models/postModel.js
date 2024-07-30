const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 3*24*60*60*1000),
        index: { expires: '3d' } // MongoDB TTL index to delete documents after 3 days
    }
},
{timestamps: true,})

const Post = mongoose.model("post", postSchema)

module.exports = Post
