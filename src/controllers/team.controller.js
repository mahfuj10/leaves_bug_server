const Project = require("../models/project.model");
const Task = require("../models/task.model");
const Team = require("../models/team.model");
const User = require("../models/user.model");
const { getTeamById } = require("../services/team.service");

const create = async(req, res, next) => {
    try {
        const team = new Team(req.body);

        await team.save()

        return res.status(201).send(team)
    }catch(err){
        return next(err)
    }
};

const getById = async(req, res, next) => {
    try {
        const teamId = req.query.id;
        
        const team = await getTeamById(teamId)

        return res.status(200).send(team)
    }catch(err){
        return next(err)
    }
};

const update = async(req, res, next) => {
    try {
        const teamId = req.query.id;
        
        await Team.findByIdAndUpdate(teamId, req.body);

        const team = await getTeamById(teamId)

        return res.status(200).send(team)
    }catch(err){
        return next(err)
    }
};

const deleteTeamAndReferences = async(req, res, next) => {
    try {
    
    const teamId = req.params.teamId;

    const team = await Team.findById(teamId);

    if (!team) {
      return { success: false, message: 'Team not found' };
    }

    // Delete the team
    await Team.findByIdAndDelete(teamId);

    // Delete all projects associated with the team
    await Project.deleteMany({ team_id: teamId });
    
    // Delete all task associated with the team
    await Task.deleteMany({ team_id: teamId });

    // Find users who have joined the team and remove the team from their teamJoined array
    await User.updateMany(
      { teamJoined: { $in: [teamId] } },
      { $pull: { teamJoined: teamId } }
    );
    
    await User.updateMany(
      { teamInvited: { $in: [teamId] } },
      { $pull: { teamInvited: teamId } }
    );


    return res.status(200).send({ success: true, message: 'Team and associated references deleted successfully' })
    }catch(err){
        return next(err)
    }
};

module.exports = {
    create,
    getById,
    update,
    deleteTeamAndReferences
};