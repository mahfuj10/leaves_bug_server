"use strict";

var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  team_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    "default": ''
  },
  priority: {
    type: Object,
    "default": null
  },
  task_type: {
    type: String,
    "default": ''
  },
  status: {
    type: Object,
    "default": ''
  },
  tags: {
    type: [String],
    "default": []
  },
  assigns: {
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
  createdAt: {
    type: Date,
    "default": Date.now
  },
  resolvedAt: {
    type: Date,
    "default": null
  },
  due_date: {
    type: Date,
    "default": null
  },
  closedAt: {
    type: Date,
    "default": null
  }
}, {
  versionKey: false
});
var Task = mongoose.model('Task', taskSchema);
module.exports = Task;