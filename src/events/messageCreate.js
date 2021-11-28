const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message,client){
        if (message.channel.type === 'DM') {
            console.log(message.content)
        }
    },
};