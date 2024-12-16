const database = {};

database.user = require('./models/user.model');

function initializeUsers(){
    const NAMES = ["marta", "alberto", "ana", "daniel", "silvia"];
    NAMES.forEach(function(username){
        database.user.register(username, "1234");
    });
}

function initializeDB(){
    initializeUsers();
    console.log('Database initialized! hehee')
}

initializeDB();

module.exports = database;