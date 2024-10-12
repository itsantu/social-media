const { Schema, model, default: mongoose } = require("mongoose");

const replySchema = new Schema({
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {timestamps: true});

const commentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    username: {
        type: String,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [replySchema],  // Array of replies (not recursive anymore)
}, {timestamps: true});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
