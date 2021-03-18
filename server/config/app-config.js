const expressconfig  = require('./express-config');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

class AppConfig {
    constructor(app) {
        this.app = app;
    }

    includeConfig() {
        // Makes the app include all required dependencies
        this.app.use(bodyParser.json());
        this.app.use(cors());
        new expressconfig(this.app);
    }
}

module.exports = AppConfig;