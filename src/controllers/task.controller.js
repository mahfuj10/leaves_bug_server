const { getIoInstance } = require("../config/socket");
const Task = require("../models/task.model");

const create = async(req, res, next) => {
    try {
        const task = new Task(req.body);
        await task.save()

        await task.populate('createor assigns');

        return res.status(201).send(task)
    }catch(err){
        return next(err)
    }
};

const get = async(req, res, next) => {
    try {
        const task = await Task.findById(req.query.id)

        return res.status(200).send(task)
    }catch(err){
        return next(err)
    }
};

const update = async(req, res, next) => {
    try {
        await Task.findByIdAndUpdate(req.query.id, req.body)

        const task = await Task.findById(req.query.id)

        return res.status(200).send(task)
    }catch(err){
        return next(err)
    }
};

const delete_ = async(req, res, next) => {
    try {
        const query = { _id: { $in: req.query.ids.split(',') } };
        console.log(req.query.ids.split(','));
        const result = await Task.deleteMany(query);

        return res.status(200).send(result)
    }catch(err){
        return next(err)
    }
};

module.exports = {
    create,
    get,
    update,
    delete_
}