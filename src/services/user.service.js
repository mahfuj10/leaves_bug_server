const User = require("../models/user.model");

const getById = async (id, filter = 'uid') => {
    try {
      let query ;

      if(filter === 'uid'){
        query = {uid: id}
      }
      if(filter === 'id'){
        query = {_id: id}
      }

        const user = await User.findOne(query)
        .populate({
          path: 'teamJoined',
          select: 'name description members projects logo createor',
          populate: {
            path: 'createor',
            select: '_id email uid photoURL name'
          }
       })
        .populate({
          path: 'teamInvited',
          select: 'name description members projects logo createor',
          populate: {
            path: 'createor',
            select: '_id email uid photoURL name'
          }
       })

        return user;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


module.exports = {
    getById,
};