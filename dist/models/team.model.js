"use strict";

var mongoose = require('mongoose');
var teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    "default": ''
  },
  logo: {
    type: String,
    "default": null
  },
  members: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    "default": []
  },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    "default": []
  },
  createor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  pendingMembers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    "default": []
  },
  projects: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    "default": []
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});
var Team = mongoose.model('Team', teamSchema);
module.exports = Team;