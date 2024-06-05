const { getIoInstance } = require("../config/socket");
const Project = require("../models/project.model");
const Task = require("../models/task.model");
const Team = require("../models/team.model");
const { getTeamById } = require("../services/team.service");

const create = async(req, res, next) => {
    try {
        const project = new Project(req.body);
       
        await project.save()

        return res.status(201).send(project)
    }catch(err){
        return next(err)
    }
};

const update = async(req, res, next) => {
    try {
        const id = req.query.id;

        const project = await Project.findByIdAndUpdate(id, req.body)

        return res.status(200).send(project)
    }catch(err){
        return next(err)
    }
};

const addSprint = async(req, res, next) => {
    try {
        const id = req.query.projectId;

        const project = await Project.findById(id)

        project.sprints.push(req.body)

        await project.save()

        return res.status(200).send(project)
    }catch(err){
        return next(err)
    }
};

const update_sprint = async(req, res, next) => {
    try {
        const id = req.query.id;
console.log(req.body);
        let update = {
            $set: {}
        };

        if (req.body.status) {
            update.$set['sprints.$.status'] = req.body.status;
        }
        
        if (req.body.tasks) {
            update.$set['sprints.$.tasks'] = req.body.tasks;
        }
        
        if (req.body.name) {
            update.$set['sprints.$.name'] = req.body.name;
        }
        
        if (req.body.is_complete  !== undefined) {
            update.$set['sprints.$.is_complete'] = Boolean(req.body.is_complete);
        }
        
        if (req.body.task_types) {
            update.$set['sprints.$.task_types'] = req.body.task_types;
        }
        
        if (req.body.priorities) {
            update.$set['sprints.$.priorities'] = req.body.priorities;
        }
        
        if (req.body.start_date) {
            update.$set['sprints.$.start_date'] = req.body.start_date;
        }
        
        if (req.body.target_end_date) {
            update.$set['sprints.$.target_end_date'] = req.body.target_end_date;
        }

        const query = {
            'sprints._id': id
        }

        const project = await Project.findOneAndUpdate(query, update, { new: true })

        return res.status(200).send(project)
    }catch(err){
        return next(err)
    }
};

const deleteSprint = async(req, res, next) => {
    try {
        const id = req.query.id

        const query = {
            'sprints._id': id
        };

        const sprint = await Project.findOne(query);

        const taskIds = sprint.sprints.find(s => s._id.toString() === id).tasks;

        await Task.deleteMany({ _id: { $in: taskIds } });
        
        const update = {
            $pull: {
                sprints: { _id: id }
            }
        };
        
        const project = await Project.findOneAndUpdate(query, update, { new: true })

        return res.status(200).send(project)
    }catch(err){
        return next(err)
    }
};

const add_task_into_sprint = async(req, res, next) => {
    try {
        const projectId = req.query.projectId; 
        const taskId = req.query.taskId; 
        const sprintIndex = req.body.sprintIndex

        const update = {
            $push: { [`sprints.${sprintIndex}.tasks`]: taskId }
          };
          
        const project = await Project.findByIdAndUpdate(
            projectId,
            update,
            { new: true }
          );

        return res.status(200).send(project)
    }catch(err){
        return next(err)
    }
};

const getById = async(req, res, next) => {
    try {
        const id = req.query.id;

        const project = await Project.findById(id)
        .populate({
            path: 'sprints',
            populate: [
                {
                    path: 'tasks',
                    populate: [
                        {
                            path: 'assigns',
                            select: '_id photoURL email name'
                        },
                        {
                            path: 'createor',
                            select: '_id photoURL email name'
                        }
                    ]
                }
            ]
        });

        return res.status(200).send(project)
    }catch(err){
        console.log(err);
        return next(err)
    }
};

const delete_project = async(req, res, next) => {
    try {
        const id = req.query.id;

        const project = await Project.findByIdAndDelete(id)

        const team = await Team.findById(project.team_id)

        const projectIds = team.projects.filter(projectId => projectId !== id)
        team.projects = projectIds

        await team.save()

        const taskIds = []

        for(const sprint of project.sprints){
            taskIds.push(...sprint.tasks.map(task => task.toString()));
        }
        
        await Task.deleteMany({ _id: { $in: taskIds } });

        return res.status(200).send(`${project.project_name} deleted successfully.`)
    }catch(err){
        return next(err)
    }
};


module.exports = {
    create,
    update,
    getById,
    update_sprint,
    delete_project,
    add_task_into_sprint,
    addSprint,
    deleteSprint
};