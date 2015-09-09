var config = require('./config');
var wolfram = require('wolfram').createClient(config.wolframID);

function Lookup(query, fromNick, callback) {
    wolfram.query(query, function(err, result) {
        if(err) {
            console.log(error);
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        if(result.length > 1) {
            if(result[1].subpods !== undefined) {
                return callback(result[1].subpods[0].value);
            }
        }
        else{
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }
    });
}

module.exports = Lookup;
