const express = require('express');
const router = express.Router();

const emailRoute = require('./email.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const projectRoute = require('./project.route');
const taskRoute = require('./task.route');
const chatRoute = require('./chat.route');
const whiteboardRoute = require('./whiteboard.route');
const notesRoute = require('./notes.route');

router.use('/email', emailRoute)
router.use('/user', userRoute)
router.use('/team', teamRoute)
router.use('/project', projectRoute)
router.use('/task', taskRoute)
router.use('/chat', chatRoute)
router.use('/whiteboard', whiteboardRoute)
router.use('/notes', notesRoute)

module.exports = router
