const Notification = require('../models/notification.model')

const create = async(req, res, next) => {
    try {
        const notification = new Notification(req.body);

        await notification.save()

        return res.status(201).send(notification)
    }catch(err){
        return next(err)
    }
};

const getByUserId = async(req, res, next) => {
    try {
        const userId = req.query.id;

        const notifications = await Notification.find({ visibleTo: userId });

        return res.status(200).send(notifications)
    }catch(err){
        return next(err)
    }
};

const markAllNotificationAsRead = async(req, res, next) => {
    try {
        const { ids } = req.body;
        const userId = req.query.id; 

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ error: 'messageIds must be an array of message IDs' });
        }

        const result = await Notification.updateMany(
            { _id: { $in: ids }, readBy: { $ne: userId } },
            { $addToSet: { readBy: userId } }
        );

       return res.status(200).json({ message: 'Notification marked as read', result });
    }catch(err){
        return next(err)
    }
}

const removeUserFromAllNotifications = async(req, res, next) => {
    try {
        const userId = req.query.id

        await Notification.updateMany(
            { visibleTo: userId },
            { $pull: { visibleTo: userId } }
        );

       return res.status(200).json({ message: `User ${userId} removed from all notifications` });
    }catch(err){
        return next(err)
    }
}

const removeUserFromVisibleTo = async(req, res, next) => {
    try {
        const userId = req.query.id
        const notificationId = req.params.notificationId

        await Notification.updateOne(
            { _id: notificationId },
            { $pull: { visibleTo: userId } }
        );

       return res.status(200).json({ message: `User ${userId} removed from notification ${notificationId}` });
    }catch(err){
        return next(err)
    }
}

module.exports = {
    create,
    getByUserId,
    markAllNotificationAsRead,
    removeUserFromAllNotifications,
    removeUserFromVisibleTo
}