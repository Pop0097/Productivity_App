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

    // Creates a case-insensitive index for when we search for usernames
    db.collection('users').createIndex(
        { username: 1 },
        { collation: { locale: 'en', strength: 2 } }
    );
}); 

/* Connecting to database ends */

/* Helpers begin */

registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').insertOne(data, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
}

logout = (userId) => {
    const data = {
        $set : {
            'online' : false,
        }
    }
    return new Promise (async (resolve, reject) => {
        try {
            db.collection('users').updateOne({ _id : ObjectID(userId) }, data, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            })
        } catch (err) {
            reject(err);
        }
    });
}

makeUserOnline = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            db.collection('users').findOneAndUpdate({ _id : ObjectID(userId) }, { 
                "$set": { // Sets values for the parameters
                    'online': true,
                } 
            }, (err, result) => { // Error catching
                if( err ){
                    reject(err);
                }
                resolve(result.value);
            });
        } catch (error) {
            reject(error)
        }	
    });
}

getUserByUsername = (username) => {
    return new Promise( async (resolve, reject) => {
        try {
            db.collection('users').find({ username :  username })
                .toArray( (error, result) => { // Converts found items to an array of objects
                    if( error ){
                        reject(error);
                    }
                    resolve(result[0]); // Only returns first occurence
                });
        } catch (error) {
            reject(error)
        }	
    });
}

userNameCheck = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            db.collection('users').find(data).collation({ locale: 'en', strength: 2 })
                .count( (error, result) => {
                    if( error ){
                        reject(error);
                    }
                    resolve(result);
                });
        } catch (error) {
            reject(error)
        }
    });
}

/* Helpers end */

module.exports = {
    registerUser,
    logout,
    makeUserOnline,
    getUserByUsername,
    userNameCheck,
};