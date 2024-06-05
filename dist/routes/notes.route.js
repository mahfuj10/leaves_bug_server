"use strict";

var express = require('express');
var notesController = require('../controllers/notes.controller');
var router = express.Router();
router.get('/get', notesController.get);
router.post('/create', notesController.create);
router.put('/update', notesController.update);
router["delete"]('/delete', notesController.delete_);
module.exports = router;