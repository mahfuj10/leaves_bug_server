const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    updator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
},
 { timestamps: true }
);

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;
