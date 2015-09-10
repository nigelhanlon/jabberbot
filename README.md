# Jabberbot

Jabberbot is a basic XMPP client program that responds to various commands given in a chat room. Cirrently it supports lookups with Wolfram Alpha, weather reports via Yahoo and a few joke APIs (Chuck Norris and YoMamma).

It is not meant to be a serious project, but rather a template and example for others to build on.


## Installation

Firstly, you will need Node v0.12 or higher installed and a Linux/Unix system. It might work on Windows but haven't tested it.

The basic steps are checkout the repo, install it via npm and run jabberbot.js.

You will also need to edit config.json with the settings for your Jabber server.

```
$ git checkout

$ npm install

$ vim config.json

{
    "username": "me@my-jabber-server.com",
    "password": "awesome password",
    "room": "some-room@my-jabber-server.com",
    "nick": "HAL9000",
    "wolframID": "REQUEST THIS APP ID"
}


$ node ./jabberbot.js

```

## Commands

The following commands are supported:

```
‎[12:43:03] ‎nigel‎: !lookup the population of ireland
‎[12:43:09] ‎HAL9000‎: 4.68 million people  (world rank: 121st)  (2014 estimate)

[12:43:32] ‎nigel‎: !chuck
‎[12:43:32] ‎HAL9000‎: All roads lead to Chuck Norris. And by the transitive property, a roundhouse kick to the face.

‎[12:43:51] ‎nigel‎: !weather dublin,ie
‎[12:43:52] ‎HAL9000‎: Currently 15C, broken clouds

[12:44:13] ‎nigel‎: !yomomma
‎[12:44:14] ‎HAL9000‎: Yo mama is so fat she can be my bear

‎[12:44:28] ‎nigel‎: !bikes
‎[12:44:28] ‎HAL9000‎: 0 bikes available out of 20

```

## Data Sources

- The !lookup module uses the Wolfram Alpha API and Node Package https://www.npmjs.com/package/wolfram-alpha.

- The !yomomma module uses the API from http://yomomma.info.

- The !chuck module makes use of The Internet Chuch Norris Database: http://www.icndb.com/api/

- The !weather module calls the OpenWeatherMap API at http://openweathermap.org/api.

- The !bikes module makes a call to http://www.dublinbikes.ie/All-Stations/Station-map to find available bikes next to our office.

## License

MIT License (MIT)
