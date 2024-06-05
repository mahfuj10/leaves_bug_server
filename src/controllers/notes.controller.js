const Notes = require("../models/notes.model");

const create = async(req, res, next) => {
    try {
        const note = new Notes(req.body);
        
        await note.save()

        return res.status(201).send(note)
    }catch(err){
        return next(err)
    }
};

const get = async(req, res, next) => {
    try {
        const notes = await Notes.find({ projectId: req.query.id })
                      .populate({
                        path: 'creator',
                        select: 'name photoURL email'
                      })
                      .populate({
                        path: 'updator',
                        select: 'name photoURL email'
                      });
        
        return res.status(201).send(notes)
    }catch(err){
        return next(err)
    }
};

const update = async(req, res, next) => {
    try {
        const note = await Notes.findByIdAndUpdate(req.query.id, req.body);
        
        return res.status(201).send(note)
    }catch(err){
        return next(err)
    }
};

const delete_ = async(req, res, next) => {
    try {
        const note = await Notes.findByIdAndDelete(req.query.id);
        
        return res.status(200).send(note)
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