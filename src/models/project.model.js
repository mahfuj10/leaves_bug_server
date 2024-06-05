const mongoose = require('mongoose');

const defaultPrirites = [
  {name: 'low', color: 'silver'},
  {name: 'medium', color: 'blue'},
  {name: 'high', color: 'gold'},
  {name: 'urgent', color: 'red'}
]

const projectSchema = new mongoose.Schema({
    project_name: {
      type: String,
      required: true
    },
    team_id: { 
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'Team' 
    },
    creator: { 
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'user' 
    },
    start_date: { 
       type: Date, 
       default: null
    },
    target_end_date: { 
       type: Date, 
       default: null
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    sprints: [{
      name: {
        type: String,
        required: true
      },
      is_complete: {
        type: Boolean,
        default: false
      },
      task_types: {
        type: [String],
        default: ['Bug', 'Feature', 'Enhancement']
      },
      priorities: {
        type: [{
          name: String,
          color: String
        }],
        default: defaultPrirites
      },
      status: {
        type: [{
          name: String,
          color: String
        }, {_id: false}],
        required: true
      },
      start_date: {
        type: Date,
        default: null
      },
      target_end_date: {
        type: Date,
        default: null
      },
      tasks: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task'
        }],
        default: []
      }
    }]
  }, {
    versionKey: false
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;