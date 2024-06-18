const Comment = require('../models/comment.model')

const create = async(req, res, next) => {
    try {
        const comment = new Comment(req.body);

        await comment.save()

        return res.status(201).send(comment)
    }catch(err){
        return next(err)
    }
};

const get = async(req, res, next) => {
    try {
        const taskId = req.query.id;

        if(!taskId){
           return res.status(404).send("Task id required ?id=YOUR_TASK_ID")
        }

        const comments = await Comment.find({ taskId })
                         .populate('sender');

        return res.status(200).send(comments)
    }catch(err){
        return next(err)
    }
};

const delete_ = async(req, res, next) => {
    try {
        const commentId = req.query.id;

        if(!commentId){
           return res.status(404).send("comment id required ?id=YOUR_TASK_ID")
        }

        const comment = await Comment.findByIdAndDelete(commentId)

        return res.status(200).send(comment)
    }catch(err){
        return next(err)
    }
};

const count = async(req, res, next) => {
    try {
        const taskId = req.query.id;

        if(!taskId){
           return res.status(404).send("Task id required ?id=YOUR_TASK_ID")
        }

        const count = await Comment.countDocuments({ taskId })

        return res.status(200).send({ count })
    }catch(err){
        return next(err)
    }
};

module.exports = {
    create,
    get,
    delete_,
    count
}