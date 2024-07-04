const mongoose = require('mongoose');

const HelpCenterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    messages: {
        type: [{
            _id: mongoose.Schema.Types.ObjectId,
            sender: {
              type: String,
              required: true
            },
            content: {
              type: String,
              required: true
            },
            media: {
                type: [String],
                default: []
            },
            seen: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
        default: []
    }
},
 { timestamps: true }
);

const HelpCenter = mongoose.model('HelpCenter', HelpCenterSchema);

module.exports = HelpCenter;
