"use strict";

var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    trim: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: true
});
var Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;