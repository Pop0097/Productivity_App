const CONSTANTS = require('../config/constants');

/* Connecting to database starts */

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dotenv = require('dotenv').config();

const mongoClient = new MongoClient(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = null; // Stores database instance in this variable

mongoClient.connect((err, client) => {
    if (err) {
        console.error(err);
    }

    db = client.db(process.env.MONGO_DBNAME);
}); 

/* Connecting to database ends */

/* Helpers begin */

/* Helpers end */

module.exports = {};