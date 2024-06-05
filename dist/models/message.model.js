"use strict";

var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  content: {
    type: String,
    required: false
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    "default": []
  }],
  reactions: {
    type: [{
      reaction: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      }
    }],
    "default": []
  },
  media: {
    type: [String],
    "default": []
  }
}, {
  timestamps: true
});
var Message = mongoose.model('Message', messageSchema);
module.exports = Message;