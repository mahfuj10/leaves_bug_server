"use strict";

var mongoose = require('mongoose');
var NotesSchema = new mongoose.Schema({
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
    "default": ''
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
  }
}, {
  timestamps: true
});
var Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;