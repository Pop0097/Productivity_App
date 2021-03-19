const { query } = require('express');
const CONSTANTS = require('../config/constants');

const queryHandler = require('./query-handler');

createTeamRouteHandler = async (req, res) => {
    const body = req.body;

    data = {
        name: body.name,
        organization: body.organization,
        adminId: body.adminId,
        members: [],
    };

    try {
        // Checks input to see if all required data is present
        if ('' === data.name) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_NAME_NOT_FOUND
            });
        } else if ('' === data.organization) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.ORGANIZATION_NOT_FOUND
            });
        } else if ('' === data.adminId) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.ADMIN_ID_NOT_FOUND
            }); 
        } else {
            const result = await queryHandler.createTeam(data);

            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                teamId: result.ops[0]._id,
                teamName: result.ops[0].name,
                message: CONSTANTS.TEAM_REGISTRATION_OK,
            });
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TEAM_REGISTRATION_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

teamNameCheckHandler = async (req, res) => {
    const name = req.body.name.toLowerCase();

    try {
        if (name === '') {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_NAME_NOT_FOUND
            });
        } else {
            const count = await queryHandler.teamNameCheck({ name: name });

            if (count == 0) {
                res.json({
                    error: false,
                    message: CONSTANTS.TEAM_NAME_AVAILABLE_OK
                });
            } else {
                res.json({
                    error: true,
                    message: CONSTANTS.TEAM_NAME_AVAILABLE_FAILED
                });
            }
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TEAM_NAME_AVAILABLE_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

addMemberRouteHandler = async (req, res) => {
    const body = req.body;

    const data = {
        teamId: body.teamId,
        userId: body.userId,
    };

    try {
        if ('' === data.teamId) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_ID_NOT_FOUND
            });
        } else if ('' === data.userId) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USER_ID_NOT_FOUND
            });
        } else {

            const count = await queryHandler.checkUserInTeam(data);

            if (0 == count) {
                const result = await queryHandler.addMemberToTeam(data);

                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: false,
                    message: CONSTANTS.TEAM_ADD_MEMBER_PASSED,
                });
            } else {
                res.json({
                    error: true,
                    message: CONSTANTS.USER_AREADY_ADDED
                });
            }
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TEAM_ADD_MEMBER_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

removeMemberRouteHandler = async (req, res) => {
    const body = req.body;

    const data = {
        teamId: body.teamId,
        userId: body.userId,
    };

    try {
        if ('' === data.teamId) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_ID_NOT_FOUND
            });
        } else if ('' === data.userId) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USER_ID_NOT_FOUND
            });
        } else {

            const count = await queryHandler.checkUserInTeam(data);

            if (1 == count) {
                const result = await queryHandler.removeMemberFromTeam(data);

                res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                    error: false,
                    message: CONSTANTS.TEAM_REMOVE_MEMBER_PASSED,
                });
            } else {
                res.json({
                    error: true,
                    message: CONSTANTS.USER_DOES_NOT_EXIST
                });
            }
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.TEAM_REMOVE_MEMBER_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

searchTeamsHandler = async (req, res) => {

}

getMembersRouteHandler = async (req, res) => {
    const data = {
        id: req.body.id,
    };

    try {
        if ('' === data.name) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.TEAM_NAME_NOT_FOUND
            });
        } else {
            const result = await queryHandler.getTeamById(data);

            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                result: result.members,
                message: CONSTANTS.GETTING_MEMBERS_SUCCESS,
            });
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.GETTING_MEMBERS_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

module.exports = {
    createTeamRouteHandler,
    teamNameCheckHandler,
    addMemberRouteHandler,
    removeMemberRouteHandler,
    searchTeamsHandler,
    getMembersRouteHandler,
};