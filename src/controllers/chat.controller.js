const { Mongoose, Types } = require("mongoose");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const create = async(req, res, next) => {
    try {
        const chat = new Chat(req.body);

        await chat.save()

        return res.status(201).send(chat)
    }catch(err){
        return next(err)
    }
};

const get = async(req, res, next) => {
    try {
        const { userId, teamId } = req.query

        const query = { 
            teamId,
            participants: { $all: [userId] },
        }
        
        const chat = await Chat.find(query)
                     .populate('participants creator');

        return res.status(200).send(chat)
    }catch(err){
        return next(err)
    }
};

const delete_ = async(req, res, next) => {
    try {
        const chatId = req.query.id;

        await Chat.findByIdAndDelete(chatId)
        await Message.deleteMany({ chat: chatId })

        return res.status(200).send('Deleted')
    }catch(err){
        return next(err)
    }
};

const newMessage = async(req, res, next) => {
    try {
        const message = new Message(req.body)

        await message.save()

        return res.status(201).send(message)
    }catch(err){
        return next(err)
    }
};

const getMessages = async(req, res, next) => {
    try {
        const { chatId } = req.params
        const { limit = 20, before } = req.query;
    
        const query = { chat: chatId };

    
        if (before != 'undefined') {
          query.createdAt = { $lt: before };
        }
        
        
        const count = await Message.countDocuments({ chat: chatId })
        // .limit(parseInt(limit))

        const messages = await Message.find(query)
          .sort({ createdAt: -1 })
          .populate({
            path: 'sender',
            select: '_id name email uid photoURL'
          })
          .populate({
            path: 'readBy',
            select: '_id name email uid photoURL'
          })
          .populate({
              path: 'chat',
              select: 'participants chatName teamId'
           })
          .populate({
              path: 'reactions.user',
              select: '_id name email uid photoURL'
           })
console.log(messages);
        return res.status(200).send({ count, messages });
      } catch (error) {
        return res.status(500).send(error);
      }
    
};

const markAllMessagesAsRead = async(req, res, next) => {
    try {
        const { messageIds } = req.body;
        const userId = req.query.id; 

        if (!messageIds || !Array.isArray(messageIds)) {
            return res.status(400).json({ error: 'messageIds must be an array of message IDs' });
        }

        const result = await Message.updateMany(
            { _id: { $in: messageIds }, readBy: { $ne: userId } },
            { $addToSet: { readBy: userId } }
        );

       return res.status(200).json({ message: 'Messages marked as read', result });
    }catch(err){
        return next(err)
    }
}
const updateMessage = async(req, res, next) => {
    try {
        console.log(req.body);
        const messageId = req.query.id; 

        if (!messageId) {
            return res.status(400).json({ error: 'message id required in query.' });
        }

        const result = await Message.findByIdAndUpdate(messageId, req.body);

       return res.status(200).send(result);
    }catch(err){
        return next(err)
    }
}

const deleteMessage = async(req, res, next) => {
    try {
        const messageId = req.query.id; 

        if (!messageId) {
            return res.status(400).json({ error: 'message id required in query.' });
        }

        const result = await Message.findByIdAndDelete(messageId);

       return res.status(200).send(result);
    }catch(err){
        return next(err)
    }
}

module.exports = {
    create,
    get,
    newMessage,
    getMessages,
    markAllMessagesAsRead,
    updateMessage,
    deleteMessage,
    delete_
}