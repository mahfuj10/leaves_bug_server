const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    teamId: {
        type: String,
        default: null
    },
    imageURL: {
        type: String,
        required: true
    },
    redirectURL: {
        type: String,
        default: null
    },
    content: {
        type: String,
        required: true
    },
    visibleTo: [{
        type: String,
        default: []
    }],
    readBy: [{
        type: String,
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: false });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
