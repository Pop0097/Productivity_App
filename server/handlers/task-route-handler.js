const CONSTANTS = require('../config/constants');

const queryHandler = require('./query-handler');

createTaskHander = async (req, res) => {
    const body = req.body;

    const data = {
        name: body.name,
        teamId: body._id,
        subteam: body.subteam,
        creatorId: body.creator,
        assignees: [],
        comments: body.comments,
        priority: body.priority,
    };

    try {
         if ('' === data.name) {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TASK_NAME_NOT_FOUND,
            });
         } else if ('' === data.teamId) {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_ID_NOT_FOUND,
            });
         } else if ('' === data.subteam) {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.SUBTEAM_NOT_FOUND,
            });
         } else if ('' === data.creatorId) {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.CREATOR_NOT_FOUND,
            });
         } else if (0 == data.priority) {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.PRIORITY_NOT_FOUND,
            });
         } else {
            const result = await queryHandler.createTask(data);

            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                taskId: result.ops[0]._id,
                message: CONSTANTS.TASK_REGISTRATION_OK,
            });
         }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TASK_REGISTRATION_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_HTTP_CODE,
            errorMessage: err,
        });
    }
}

deleteTaskHandler = async (req, res) => {
    const data = {
        _id: req.body._id,
    };

    try {
        if (data._id === '') {
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TASK_ID_NOT_FOUND,
            });
        } else {
            await queryHandler.deleteTask(data);

            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                message: CONSTANTS.TASK_DELETE_OK,
            });
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TASK_DELETE_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_HTTP_CODE,
            errorMessage: err,
        });
    }
}

completeTaskHandler = async (req, res) => {

}

addAssigneeHandler = async (req, res) => {

}

removeAssigneeHandler = async (req, res) => {

}

module.exports = {
    createTaskHander,
    deleteTaskHandler,
    completeTaskHandler,
    addAssigneeHandler,
    removeAssigneeHandler
};