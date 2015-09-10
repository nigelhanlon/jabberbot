/*
    Get a random Chuck Norris fact!
*/
var request = require('request');

function Chuck(fromNick, callback) {
    var uri = "http://api.icndb.com/jokes/random";

    request({'uri': uri}, function(error, response, body) {
        if(error){
            console.log(error);
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        body = JSON.parse(body);
        if(body.type !== 'success') {
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        return callback(body.value.joke);
    });
}

module.exports = Chuck;
