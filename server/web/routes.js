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
router.post('/registration/getUserById', registrationRouteHandler.getUserById);
router.post('/registration/getUsersByUsername', registrationRouteHandler.getUsersByUsername);
/* Registration Routes ends */

/* Team creation and management starts */
router.post('/team/createTeam', teamRouteHandler.createTeamRouteHandler);
router.get('/team/teamNameAvailable', teamRouteHandler.teamNameCheckHandler);
router.put('/team/addMember', teamRouteHandler.addMemberRouteHandler);
router.put('/team/removeMember', teamRouteHandler.removeMemberRouteHandler);
router.get('/team/getMembers', teamRouteHandler.getMembersRouteHandler);
router.get('/team/searchTeams', teamRouteHandler.searchTeamsHandler);
router.post('/team/getUsersTeams', teamRouteHandler.getUsersTeams);
router.post('/team/getTeamById', teamRouteHandler.getTeamById);
router.post('/team/getTeamTasksById', teamRouteHandler.getTasksForTeamId);
/* Team creation and management ends */

/* Task creation and management starts */
router.post('/task/createTask', taskRouteHandler.createTaskHander);
router.delete('/task/deleteTask', taskRouteHandler.deleteTaskHandler);
router.put('/task/completeTask', taskRouteHandler.completeTaskHandler);
router.put('/task/incompleteTask', taskRouteHandler.incompleteTaskHandler);
router.post('/task/getTaskById', taskRouteHandler.getTaskById);
/* Task creation and management ends */

module.exports = router;