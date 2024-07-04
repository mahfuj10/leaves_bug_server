const express = require('express');
const helpCenterController = require('../controllers/help-center.controller');

const router = express.Router();

router.post('/save-message', helpCenterController.saveMessage);
router.delete('/delete-message', helpCenterController.deleteMessage);
router.get('/messages', helpCenterController.getMessages);
router.get('/chats', helpCenterController.getChats);
router.put('/seen-messages', helpCenterController.markMessagesSeen);

module.exports = router;