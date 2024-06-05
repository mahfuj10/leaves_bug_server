"use strict";

var express = require('express');
var router = express.Router();
var emailRoute = require('./email.route');
var userRoute = require('./user.route');
var teamRoute = require('./team.route');
var projectRoute = require('./project.route');
var taskRoute = require('./task.route');
var chatRoute = require('./chat.route');
var whiteboardRoute = require('./whiteboard.route');
var notesRoute = require('./notes.route');
router.use('/email', emailRoute);
router.use('/user', userRoute);
router.use('/team', teamRoute);
router.use('/project', projectRoute);
router.use('/task', taskRoute);
router.use('/chat', chatRoute);
router.use('/whiteboard', whiteboardRoute);
router.use('/notes', notesRoute);
module.exports = router;