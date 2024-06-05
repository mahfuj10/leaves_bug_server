const express = require('express');
const whiteboardController = require('../controllers/whiteboard.controller');

const router = express.Router();

router.post('/save', whiteboardController.save);
router.get('', whiteboardController.get);

module.exports = router;