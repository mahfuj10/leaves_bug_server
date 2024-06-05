const mongoose = require('mongoose');

const whiteboardSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
}, {
    versionKey: false
});

const Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);

module.exports = Whiteboard;