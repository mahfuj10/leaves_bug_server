const Team = require("../models/team.model");

const getTeamById = async (teamId) => {
    try {
        const team = await Team.findById(teamId)
        .populate({
            path: 'createor',
            select: 'name email _id uid photoURL'
        })
        .populate({
            path: 'members',
            select: 'name email _id uid photoURL'
        })
        .populate({
            path: 'pendingMembers',
            select: 'name email _id uid photoURL'
        })
        .populate({
            path: 'admins',
            select: 'name email _id uid photoURL'
        })
        .populate('projects')

        return team
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


module.exports = {
    getTeamById,
};