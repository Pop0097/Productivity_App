const registrationRouteHandler = require('../handlers/registration-route-handler');
const teamRouteHandler = require('../handlers/team-route-handler');
const taskRouteHandler = require('../handlers/task-route-handler');

const express = require('express');
const router = express.Router();

/* Registration Routes starts */
router.post('/registration/register', registrationRouteHandler.registerRouteHandler);
router.get('/registration/usernameAvailable', registrationRouteHandler.userNameCheckHandler);
router.post('/registration/login', registrationRouteHandler.loginRouteHandler);
router.post('/registration/logout', registrationRouteHandler.logoutRouteHandler);
/* Registration Routes ends */

/* Team creation and management starts */
router.post('/team/createTeam', teamRouteHandler.createTeamRouteHandler);
router.get('/team/teamNameAvailable', teamRouteHandler.teamNameCheckHandler);
router.put('/team/addMember', teamRouteHandler.addMemberRouteHandler);
router.put('/team/removeMember', teamRouteHandler.removeMemberRouteHandler);
router.get('/team/getMembers', teamRouteHandler.getMembersRouteHandler);
router.get('/team/searchTeams', teamRouteHandler.searchTeamsHandler);
/* Team creation and management ends */

/* Task creation and management starts */
router.post('/task/createTask', taskRouteHandler.createTaskHander);
router.delete('/task/deleteTask', taskRouteHandler.deleteTaskHandler);
/* Task creation and management ends */

module.exports = router; 