const HelpCenter = require("../models/help-center.model");

const saveMessage = async(req, res, next) => {
    try {
        const { user, message, _id } = req.body
        const response = await HelpCenter.findOne({ user })
console.log(response);
        if(response && response.messages){
            response.messages.push(message)
            await response.save()
        }else {
            const newMessage = new HelpCenter({
                _id,
                user,
                messages: [message]
            })
    
            await newMessage.save()
        }

        return res.status(201).send('saved')
    }catch(err){
        return next(err)
    }
};

const deleteMessage = async(req, res, next) => {
    try {
        await HelpCenter.findByIdAndDelete(req.query.id)

        return res.status(200).send('Message deleted')
    }catch(err){
        return next(err)
    }
};

const getMessages = async(req, res, next) => {
    try {
        const response = await HelpCenter.findOne({ user: req.query.id })

        if(!response){
            return res.status(200).send({
                user: req.query.id,
                messages: response.messages
            })
        }

        return res.status(200).send(response)
    }catch(err){
        return next(err)
    }
};

const getChats = async(req, res, next) => {
    try {
        const chats = await HelpCenter.find({})
                      .populate({
                        path: 'user',
                        select: 'name photoURL email uid'
                      })

        return res.status(200).send(chats)
    }catch(err){
        return next(err)
    }
};

const markMessagesSeen = async(req, res, next) => {
    try {
        const messageIds = req.body.ids
        const userId = req.body.userId

        const helpCenter = await HelpCenter.findOne({ user: userId });

        if (!helpCenter) {
            throw new Error('HelpCenter document not found for the user.');
        }

        helpCenter.messages.forEach(message => {
            if (messageIds.includes(String(message._id))) {
                message.seen = true;
            }
        });

        await helpCenter.save();


        return res.status(200).send('Messages marked as seen successfully.')
    }catch(err){
        return next(err)
    }
};


module.exports = {
    saveMessage,
    deleteMessage,
    getMessages,
    getChats,
    markMessagesSeen
};