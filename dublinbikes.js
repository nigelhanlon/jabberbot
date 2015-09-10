/*
    Check Dublin boke available outside office.
*/
var request = require('request');
var parseString = require('xml2js').parseString;

function DublinBikes(fromNick, callback) {
    var uri = "http://www.dublinbikes.ie/service/stationdetails/dublin/31";
    request({'uri': uri}, function(error, response, body) {
        if(error){
            console.log(error);
            return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
        }

        parseString(body, function (err, result) {
            if(error) {
                return callback("I'm sorry, " + fromNick + ". I'm afraid I can't do that.");
            }
            var message = result.station.available + " bikes available out of " + result.station.total;
            return callback(message);
        });
    });
}

module.exports = DublinBikes;
