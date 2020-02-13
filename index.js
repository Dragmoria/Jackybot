const Discord = require('discord.js');
const fetch = require("node-fetch");
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
}

const checkStatus = (res) => {
    if (res.ok) {
        console.log(res.statusText);
        return res;
    }
    else {
        throw MyCustomError(res.statusText);
    }
}

const findId = async function (url, info) {
    fetch(url, info)
    .then(checkStatus)
    .then((res) => {
        res.json()
    })
    .then((json) => {
        const id = json.data[0].id;
        return id;
    })
}

const test = findId('https://api.twitch.tv/helix/users?login=Loserfruit', {method: 'GET', headers: headers})



//discord message related
client.once('ready', () => {
    console.log('ready! Jackybot is up and running!');
});

client.on('message', message => {
    if(message.author.bot)
        return;
    if(message.content.toLowerCase() === 'hello')
        message.channel.send('Heyo!');
});


//envVar.discordToken
client.login(envVar.discordToken);