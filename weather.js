var request = require('request');

function Weather(place, fromNick, callback) {
    var uri = "http://api.openweathermap.org/data/2.5/weather?q=";
    uri += place;
    uri += "&units=metric";

    request({'uri': uri}, function(error, response, body) {
        if(error){
            console.log(error);
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        body = JSON.parse(body);
        if(body.main === undefined) {
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        var weather = "Currently " + body.main.temp + "C, " + body.weather[0].description;
        return callback(weather);
    });
}

module.exports = Weather;
