//src/database/index.js
const database = {};

database.users = require('./models/user.model');

function initializeUsers(){
    const NAMES = ["marta", "carlos", "paloma", "alvaro", "javi"];
    NAMES.forEach((username) => {
        database.users.register(username, "123");
    });
}

function initializeDB(){
    initializeUsers();
    console.log("Database initialized");
}

initializeDB();

module.exports = database;