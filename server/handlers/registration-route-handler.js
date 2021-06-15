const CONSTANTS = require('../config/constants');
const passwordHash = require('../utils/password-hash');

const queryHandler = require('./query-handler');

registerRouteHandler = async (req, res) => {

    const body = req.body;

    const data = {
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        online: true,
        socketId: '',
        teams: [],
    };

    try {
        // Checks input to see if all required data is present
        if ('' === data.username) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else if ('' === data.password) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.PASSWORD_NOT_FOUND
            });
        } else if ('' === data.name) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.NAME_NOT_FOUND
            });
        } else if ('' === data.email) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.EMAIL_NOT_FOUND
            });
        } else {
            data.password = passwordHash.createHash(data.password);

            const result = await queryHandler.registerUser(data);

            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                userId: result.ops[0]._id,
                message: CONSTANTS.USER_REGISTRATION_OK,
            });
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_REGISTRATION_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

loginRouteHandler = async (req, res) => {

    const body = req.body;

    const data = {
        username: body.username,
        password: body.password,
    };

    try {
        // Checks input to see if all required data is present
        if ('' === data.username) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else if ('' === data.password) {
            return res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.PASSWORD_NOT_FOUND
            });
        } else {

            const result = await queryHandler.getUserByUsername(data.username);

            if (null === result || undefined === result) {
                res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error: true,
                    message: CONSTANTS.USER_LOGIN_FAILED,
                });
            } else {
                if (passwordHash.compareHash(data.password, result.password)) {
                    await queryHandler.makeUserOnline(result._id);

                    res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        error: false,
                        userId: result._id,
                        message: CONSTANTS.USER_LOGIN_OK
                    });
                } else {
                    res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                        error: true,
                        message: CONSTANTS.USER_LOGIN_FAILED
                    });
                }
            }
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

logoutRouteHandler = async (req, res) => {
    try {
        await queryHandler.logout(req.body.userId);

        res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            userId: req.body.userId,
            message: CONSTANTS.USER_LOGGED_OUT
        });
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            extraMessage: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

userNameCheckHandler = async (req, res) => {
    const username = (req.body.username).toLowerCase(); // Gets usernmae

    try {
        if ('' === username) { // Makes sure there is actually an input
            res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else {
            // Use await clause so we only continue on if this process has completed
            const count = await queryHandler.userNameCheck({ username: username });

            // Returns error if exists
            if (count == 0) {
                res.json({
                    error: false,
                    message: CONSTANTS.USERNAME_AVAILABLE_OK
                });
            } else {
                res.json({
                    error: true,
                    message: CONSTANTS.USERNAME_AVAILABLE_FAILED
                });
            }
        }
    } catch (err) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE,
            errorMessage: err,
        });
    }
}

module.exports = {
    registerRouteHandler,
    loginRouteHandler,
    logoutRouteHandler,
    userNameCheckHandler,
};

