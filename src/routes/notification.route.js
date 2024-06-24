const express = require('express');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

router.post('/create', notificationController.create);
router.get('/get', notificationController.getByUserId);
router.put('/read', notificationController.markAllNotificationAsRead);
router.delete('/visibleTo/all', notificationController.removeUserFromAllNotifications);
router.delete('/visibleTo/:notificationId', notificationController.removeUserFromVisibleTo);

module.exports = router;