const express = require('express');
const commentController = require('../controllers/comment.controller')

const router = express.Router();

router.post('/create', commentController.create);
router.get('/get', commentController.get);
router.delete('/delete', commentController.delete_);
router.get('/count', commentController.count);

module.exports = router;