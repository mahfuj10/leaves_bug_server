"use strict";

var express = require('express');
var chatController = require('../controllers/chat.controller');
var router = express.Router();
router.post('/create', chatController.create);
router.get('/get', chatController.get);
router.post('/message', chatController.newMessage);
router.get('/message/:chatId', chatController.getMessages);
router.post('/message/read', chatController.markAllMessagesAsRead);
router.put('/message/update', chatController.updateMessage);
router["delete"]('/message/delete', chatController.deleteMessage);
module.exports = router;