"use strict";

var mongoose = require('mongoose');
var locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    "default": 0,
    required: false
  },
  "long": {
    type: Number,
    "default": 0,
    required: false
  }
}, {
  _id: false
}); // Disable automatic generation of _id for this subdocument schema

var userSchema = new mongoose.Schema({
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
    "default": null
  },
  phoneNumber: {
    type: String,
    "default": null
  },
  projectJoined: {
    type: [String],
    "default": []
  },
  projectInvited: {
    type: [String],
    "default": []
  },
  location: {
    type: locationSchema,
    required: false
  }
});
var User = mongoose.model('user', userSchema);
module.exports = User;