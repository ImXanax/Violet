const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(client,message){``
         if(message.channel.type=== "DM"){
         message.reply({content:"yo"})
     }
    },
};