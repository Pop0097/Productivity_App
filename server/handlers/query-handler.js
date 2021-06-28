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

    // Creates a case-insensitive index for when we search for these items
    db.collection('users').createIndex(
        { name: 1 },
        { collation: { locale: 'en', strength: 2 } }
    );

    db.collection('teams').createIndex(
        { name: 1 },
        { collation: { locale: 'en', strength: 2 } }
    );

    /* 
    db.collection('teams').createIndex( // Allows us to search via text for teams with a specific name
         {
             name: "text",
         }
     ); 
     */
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
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOneAndUpdate({ _id: ObjectID(userId) }, {
                "$set": { // Sets values for the parameters
                    'online': false,
                }
            }, (err, result) => { // Error catching
                if (err) {
                    reject(err);
                }
                resolve(result.value);
            });
        } catch (err) {
            reject(err);
        }
    });
}

makeUserOnline = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOneAndUpdate({ _id: ObjectID(userId) }, {
                "$set": { // Sets values for the parameters
                    'online': true,
                }
            }, (err, result) => { // Error catching
                if (err) {
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
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').find({ username: username })
                .toArray((error, result) => { // Converts found items to an array of objects
                    if (error) {
                        reject(error);
                    }
                    resolve(result[0]); // Only returns first occurence
                });
        } catch (error) {
            reject(error)
        }
    });
}

getUsersByUsername = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').find({ username: { $regex: data.username, $options: "$i" } })
                .toArray((error, result) => { // Converts found items to an array of objects
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
        } catch (error) {
            reject(error)
        }
    });
}

userNameCheck = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').find(data).collation({ locale: 'en', strength: 2 })
                .count((error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
        } catch (error) {
            reject(error)
        }
    });
}

getUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOne(
                {
                    _id: ObjectID(data.userId)
                }, (error, result) => {
                    if (error) {
                        reject(result);
                    }
                    resolve(result);
                }
            )
        } catch (error) {
            reject(error)
        }
    });
}

createTeam = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').insertOne(data, (err, result) => {
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

teamNameCheck = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').find(data).collation({ locale: 'en', strength: 2 })
                .count((err, result) => {
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

checkUserInTeam = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').find({ _id: ObjectID(data.teamId) })
                .toArray((error, result) => { // Converts found items to an array of objects
                    if (error) {
                        reject(error);
                    }

                    if (result[0].members.includes(data.userId)) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        } catch (error) {
            reject(error)
        }
    });
}

addMemberToTeam = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').findOneAndUpdate(
                {
                    _id: ObjectID(data.teamId)
                },
                {
                    $addToSet: { // Appends this element to array
                        members: data.userId
                    }
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err);
        }
    });
}

addTeamToMember = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOneAndUpdate(
                {
                    _id: ObjectID(data.userId)
                },
                {
                    $addToSet: { // Appends this element to array
                        teams: data.teamId
                    }
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err);
        }
    })
}

removeMemberFromTeam = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').findOneAndUpdate(
                {
                    _id: ObjectID(data.teamId)
                },
                {
                    $pull: { // Removes all instances of this element from array
                        members: data.userId
                    }
                }, (err, result) => {
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

removeTeamFromMember = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOneAndUpdate(
                {
                    _id: ObjectID(data.userId)
                },
                {
                    $pull: { // Removes all instances of this element from array
                        teams: data.teamId
                    }
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err);
        }
    })
}

getTeamById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').findOne(
                {
                    _id: ObjectID(data.id),
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err)
        }
    });
}

getTeamByName = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('teams').find(
                {
                    name: { // Finds all documents with substring data.name in name 
                        $regex: data.name,
                        $options: '$i',
                    }
                }).toArray((err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });

        } catch (err) {
            reject(err)
        }
    });
}

getUsersTeams = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('users').findOne(
                {
                    _id: ObjectID(data.userId),
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err)
        }
    })
}

getTeamTasksById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').find(
                {
                    teamId: data.teamId,
                }).toArray().then(items => {
                    resolve(items)
                }).catch(err => {
                    reject(err)
                })
        } catch (err) {
            reject(err)
        }
    })
}

createTask = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').insertOne(data, (err, result) => {
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

deleteTask = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').findOneAndDelete({
                _id: ObjectID(data._id),
            }, (err, result) => {
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

completeTask = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').findOneAndUpdate(
                {
                    _id: ObjectID(data._id)
                },
                {
                    '$set': {
                        'completed': true
                    }
                }, (error, result) => {
                    if (error) {
                        reject(result);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err);
        }
    });
}

incompleteTask = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').findOneAndUpdate(
                {
                    _id: ObjectID(data._id)
                },
                {
                    '$set': {
                        'completed': false
                    }
                }, (error, result) => {
                    if (error) {
                        reject(result);
                    }

                    resolve(result);
                });
        } catch (err) {
            reject(err);
        }
    });
}

getTaskById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.collection('tasks').findOne(
                {
                    _id: ObjectID(data.taskId)
                }, (error, result) => {
                    if (error) {
                        reject(result);
                    }

                    resolve(result);
                }
            )
        } catch (err) {
            reject(err)
        }
    })
}

/* Helpers end */

module.exports = {
    /* User Stuff */
    registerUser,
    logout,
    makeUserOnline,
    getUserByUsername,
    getUsersByUsername,
    userNameCheck,
    getUserById,

    /* Team Stuff */
    createTeam,
    teamNameCheck,
    checkUserInTeam,
    addMemberToTeam,
    addTeamToMember,
    removeMemberFromTeam,
    removeTeamFromMember,
    getTeamById,
    getTeamByName,
    getUsersTeams,
    getTeamTasksById,

    /* Task Stuff */
    createTask,
    deleteTask,
    completeTask,
    incompleteTask,
    getTaskById
};