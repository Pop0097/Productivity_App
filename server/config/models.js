const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
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
            additionalItems: true,
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

const Team = new Schema(
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
        adminId: {
            type: String,
            required: true,
            trim: true,
        },
        members: {
            type: Array,
            uniqueItems: true,
            required: false,
            additionalItems: true,
        }
    },
    {
        timestamps: true,
    }
);

const Task = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        teamId: {

        },
        subteam: {
            type: String,
            required: true,
            trim: true,
        },
        creatorId: {
            type: String,
            required: true,
            trim: true,
        },
        assignees: {
            type: Array,
            uniqueItems: true,
            required: false,
            additionalItems: true,
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
        },
        completed: {
            type: Boolean,
            required: true
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