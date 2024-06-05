"use strict";

var express = require('express');
var taskController = require('../controllers/task.controller');
var router = express.Router();
router.post('/create', taskController.create);
router.get('/get', taskController.get);
router.put('/update', taskController.update);
router["delete"]('/delete', taskController.delete_);
module.exports = router;