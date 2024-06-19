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

const getByCreator = async(req, res, next) => {
    try {
        const creatorId = req.query.id;
        const search = req.query.search;
        const page = parseInt(req.query.page) || 1;
        const limit = 3;

        const searchQuery = { createor: creatorId }

        if(search){
           searchQuery.title = { $regex: search, $options: 'i' };
        }

        const count = await Task.countDocuments(searchQuery)
        
        const tasks = await Task.find(searchQuery)
                      .skip((page - 1) * limit)
                      .limit(limit);

        return res.status(200).send({
            tasks,
            count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        })
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
    delete_,
    getByCreator
}