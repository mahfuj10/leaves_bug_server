const Whiteboard = require("../models/whiteboard.model");

const save = async(req, res, next) => {
    try {
        const { projectId, data } = req.body
        const whiteboard = await Whiteboard.findOne({ projectId })
        
        if(whiteboard){
            whiteboard.data = data
            await whiteboard.save()
        }else {
            const newWhiteboard = new Whiteboard({ projectId, data })
            await newWhiteboard.save()
        }

        return res.status(200).send(whiteboard)
    }catch(err){
        return next(err)
    }
};

const get = async(req, res, next) => {
    try {
        const whiteboard = await Whiteboard.findOne({ projectId: req.query.id})


        return res.status(200).send(whiteboard)
    }catch(err){
        return next(err)
    }
};

module.exports = {
    save,
    get
}