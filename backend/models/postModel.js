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
    likedBy: {
        type: Map,  
        of: Boolean,
        default: new Map()

    },
    commentCount: {
        type: Number,
        default: 0,
    },
    privatePost: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true})

const Post = mongoose.model("post", postSchema)

module.exports = Post