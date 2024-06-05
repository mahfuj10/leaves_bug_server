const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        default: 0,
        required: false
    },
    long: {
        type: Number,
        default: 0,
        required: false
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        default: null
    },
    teamJoined: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }],
        default: []
    },
    teamInvited: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }],
        default: []
    },
    location: {
        type: locationSchema,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;
