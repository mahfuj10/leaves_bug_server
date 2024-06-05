"use strict";

var express = require('express');
var whiteboardController = require('../controllers/whiteboard.controller');
var router = express.Router();
router.post('/save', whiteboardController.save);
router.get('/get', whiteboardController.get);
module.exports = router;