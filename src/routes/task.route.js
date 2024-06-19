const express = require('express');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/create', taskController.create);
router.get('/get', taskController.get);
router.get('/my', taskController.getByCreator);
router.put('/update', taskController.update);
router.delete('/delete', taskController.delete_);

module.exports = router;