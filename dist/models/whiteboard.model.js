"use strict";

var mongoose = require('mongoose');
var whiteboardSchema = new mongoose.Schema({
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
var Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);
module.exports = Whiteboard;