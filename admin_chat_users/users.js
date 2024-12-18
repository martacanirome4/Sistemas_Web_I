const bcrypt = require("bcrypt");

const users = {};

users.comparePass = function(pass, hash, callback){
    bcrypt.compare(pass, hash, callback);
}

users.generateHash = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}

users.register = function(username, pass, role, callback){
    users.generateHash(pass, function(err, hash){
        users[username] = {username, hash, role, last_login: new Date().toISOString()};
       
        if (callback) {
            callback();
        };
    });
}

users.register('admin', 'admin','admin', function(){
    console.log('User admin successfully registered');
});
users.register('user', 'user','user');
users.register('gon', '12','admin');
users.register('juan', '12','user');

module.exports = users;