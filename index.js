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
    Client_ID: envVar.twitchClientId
}

fetch('https://api.twitch.tv/helix/users?login=UndefinedNO', {method: 'GET', headers: headers})
    .then(res => res.json())
    .then(json => console.log(json))


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