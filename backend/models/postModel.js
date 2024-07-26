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
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:'7d'
    }
}, {timestamps: true})

const Post = mongoose.model("post", postSchema)

module.exports = Post
