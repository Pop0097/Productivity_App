const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema (
    {
        username: {
            type: String, 
            required: true,
            trim: true,
        },
        name: {
            type: String, 
            required: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            trim: true,
        },
        password: {
            type: String, 
            required: true,
            trim: true,
        },
        teams: {
            type: Array,
            uniqueItems: true,
            required: false,
        },
        online: {
            type: Boolean, 
            required: true,
        },
        socketId: {
            type: String, 
            required: false,
            trim: true,
        }
    },
    {
        timestamps: true,
    },
);

const Team = new Schema (
    {
        name: {
            type: String, 
            required: true,
            trim: true,
        },
        organization: {
            type: String, 
            required: true,
            trim: true,
        },
        admin: {
            type: String, 
            required: true,
            trim: true,
        },
        members: {
            type: Array,
            uniqueItems: true,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const Task = new Schema (
    {
        name: {
            type: String, 
            required: true,
            trim: true,
        },
        subteam: {
            type: String, 
            required: true,
            trim: true,
        },
        creator: {
            type: String, 
            required: true,
            trim: true,
        },
        assignees: {
            type: Array,
            uniqueItems: true,
            required: false,
        },
        comments: {
            type: String, 
            required: true,
            trim: true,
        },
        priority: {
            type: Number,
            minimum: 1,
            maximum: 3,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('users', User);
const teamModel = mongoose.model('teams', Team);
const taskModel = mongoose.model('tasks', Task);

module.exports = {
    userModel,
    teamModel,
    taskModel,
}