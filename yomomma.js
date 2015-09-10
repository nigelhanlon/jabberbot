/*
    Get a random Yo Momma Joke
*/
var request = require('request');

function YoMomma(fromNick, callback) {
    var uri = "http://api.yomomma.info/";

    request({'uri': uri}, function(error, response, body) {
        if(error){
            console.log(error);
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        body = JSON.parse(body);
        if(body.joke === undefined) {
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        return callback(body.joke);
    });
}

module.exports = YoMomma;
