const Discord = require('discord.js');
const fetch = require("node-fetch");
const TwitchWebhook = require('twitch-webhook');
require('dotenv').config();

const prefix = "&";
const envVar = {
    discordToken: process.env.DISCORD_TOKEN,
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchToken: process.env.TWITCH_TOKEN
};

const client = new Discord.Client();


//twitch api code


//${envVar.twitchClientId}

const headers = {
    'Client-ID': envVar.twitchClientId
};

const checkStatus = (res) => {
    if (res.ok) {
        console.log(res.statusText);
        return res;
    }
    else {
        throw MyCustomError(res.statusText);
    }
}
/*
const findId = async function (url, info) {
    fetch(url, info)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => console.log(json))
}

const test = findId('https://api.twitch.tv/helix/users?login=UndefinedNO', {method: 'GET', headers: headers})
*/
const getId = async function (url, info) {
    const json = await fetch(url, info);
    console.log(json);

    return json.map(data => ({
        id: data[0].id,
        login: data[0].login
    }))
};



(async function () { 
    try { 
        const people = await getId('https://api.twitch.tv/helix/users?login=UndefinedNO', {method: 'GET', headers: headers})
        console.log(people);
    } catch (e) {
        console.log("error: ", e)
    }
})








//discord message related
client.once('ready', () => {
    console.log('ready! Jackybot is up and running!');
});

client.on('message', message => {
    if(message.author.bot)
        return;
    if(message.content.toLowerCase() === 'hello')
        message.channel.send('Hey!');
});


//envVar.discordToken
client.login(envVar.discordToken);