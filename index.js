#!/usr/bin/env node

var xmpp = require('node-xmpp')
var config = require('./config');
var weather = require('./weather');
var lookup = require('./lookup');
//var jfgi = require('./jfgi');
var geodir = require('./geodir');

if(config.username === null || config.password === null) {
    console.err("Missing username or password in config.json");
    process.exit(1)
}

var client = new xmpp.Client({
    jid: config.username,
    password: config.password
});

client.on('online', function() {
    console.log('[ Jabber bot Online ]')

    client.send(new xmpp.Element('presence', { })
        .c('show').t('chat').up()
        .c('status').t('HAL - Heuristically programmed ALgorithmic computer')
    );

    // join room (and request no chat history)
    client.send(new xmpp.Element('presence', { to: config.room+'/'+config.nick }).
        c('x', { xmlns: 'http://jabber.org/protocol/muc' }).
        c('history', { maxstanzas: 0, seconds: 1})
    );
})

client.on('stanza', function(stanza) {
    // always log error stanzas
    if (stanza.attrs.type == 'error') {
        console.log('[error] ' + stanza);
        return;
    }

    // ignore everything that isn't a room message
    if (!stanza.is('message') || !stanza.attrs.type == 'groupchat') {
        return;
    }

    // ignore messages we sent
    if (stanza.attrs.from == config.room+'/'+config.nick) {
        return;
    }

    var body = stanza.getChild('body');
    // message without body is probably a topic change
    if (!body) {
        return;
    }

    var fromNick = "";
    if( stanza.attrs && stanza.attrs.from ) {
        fromNick = stanza.attrs.from.split('/')[1];
    }

    var message = body.getText();

    if (message.indexOf('!weather') === 0) {
        var place = message.replace('!weather','');

        if(place.length > 1) {
            weather(place, fromNick, function(forecast){
                return sendMessage(forecast);
            });
        }
        else {
            return sendMessage("Usage: !weather placename");
        }
    }

    if(message.indexOf('!daisy') === 0) {
        var daisy = "Daisy, Daisy, give me your answer do. I'm half crazy all for the love of you. It won't be a stylish marriage, I can't afford a carriage. But you'll look sweet upon the seat of a bicycle built for two.";
        return sendMessage(daisy);
    }

    if (message.indexOf('!lookup') === 0) {
        var query = message.replace('!lookup','');

        if(query.length > 1) {
            lookup(query, fromNick, function(answer){
                return sendMessage(answer);
            });
        }
        else {
            return sendMessage("Usage: !lookup question");
        }
    }

    // if (message.indexOf('!google') === 0) {
    //     var query = message.replace('!google','');
    //
    //     if(place.length > 1) {
    //         jfgi(query, function(answer){
    //             return sendMessage(answer);
    //         });
    //     }
    //     else {
    //         return sendMessage("Usage: !google something");
    //     }
    // }
});

function sendMessage(message) {
    var to = config.room;
    var ourmessage = new xmpp.Element(
        'message',
        { to: to, type: 'groupchat' }
    ).c('body').t(message);
    client.send(ourmessage);
}

client.on('error', function(e) {
    console.error(e)
});
