const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'message',
    once: true,
    async execute(client){
        let userID = "413755451373518864";
        if(message.author === userID) {
            if(message.content === 'psst')
            {
                message.channel.send('Hello there!');
            }
        }
        
    },
};