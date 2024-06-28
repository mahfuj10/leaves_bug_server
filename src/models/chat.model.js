const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
