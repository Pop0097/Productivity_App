'use strict'

const express = require('express');
const http = require('http');

const routes = require('./web/routes');
const appConfig = require('./config/app-config');

class Server {
    constructor() {
        this.app = express();
        this.http = http.Server(this.app); // HTTP server initialization

        // Configure the server and include necessary routes
        this.appConfig();
        this.includesRoutes();
        
        // Establish ports and host
        const port = process.env.PORT || 5000;
        const host = process.env.HOST || 'localhost';

        // Connect to HTTP server
        this.http.listen(port, host, () => {
            console.log(`listening on http://${host}:${port}`);
        });
    }

    appConfig() {
        new appConfig(this.app).includeConfig();
    }

    includesRoutes() {
        this.app.use('/', routes); // Sets the defualt path for the routes
    }
}

const app = new Server();
module.exports = app;