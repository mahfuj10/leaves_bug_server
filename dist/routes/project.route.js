"use strict";

var express = require('express');
var projectController = require('../controllers/project.controller');
var router = express.Router();
router.post('/create', projectController.create);
router.get('/get', projectController.getById);
router.put('/update', projectController.update);
router.put('/update_sprint', projectController.update_sprint);
router["delete"]('/delete', projectController.delete_project);
router.post('/add-task', projectController.add_task_into_sprint);
router.post('/add-sprint', projectController.addSprint);
router["delete"]('/delete-sprint', projectController.deleteSprint);
module.exports = router;