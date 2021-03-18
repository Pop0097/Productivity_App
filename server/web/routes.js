const routeHandler = require('../handlers/route-handler');

const express = require('express');
const router = express.Router();

/* Registration Routes starts */
router.post('/register', routeHandler.registerRouteHandler);
router.get('/usernameAvailable', routeHandler.userNameCheckHandler);
router.post('/login', routeHandler.loginRouteHandler);
router.post('/logout', routeHandler.logoutRouteHandler);
/* Registration Routes ends */

/* Team creation and management starts */
/* Team creation and management ends */

/* Task creation and management starts */
/* Task creation and management ends */

module.exports = router;