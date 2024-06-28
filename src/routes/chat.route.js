const express = require('express');
const chatController = require('../controllers/chat.controller')

const router = express.Router();

router.post('/create', chatController.create);
router.get('/get', chatController.get);
router.post('/message', chatController.newMessage);
router.get('/message/:chatId', chatController.getMessages);
router.post('/message/read', chatController.markAllMessagesAsRead);
router.put('/message/update', chatController.updateMessage);
router.delete('/message/delete', chatController.deleteMessage);
router.delete('/delete', chatController.delete_);

module.exports = router;