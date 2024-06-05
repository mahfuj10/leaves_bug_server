const express = require('express');
const notesController = require('../controllers/notes.controller');

const router = express.Router();

router.get('', notesController.get);
router.post('/create', notesController.create);
router.put('/update', notesController.update);
router.delete('/delete', notesController.delete_);

module.exports = router;