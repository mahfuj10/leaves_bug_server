const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    taskId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    media: {
        type: [String],
        default: []
    },
},
 { timestamps: true }
);

const Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;
