const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    once: true,
    async execute(message,client){
        let userID = "413755451373518864";
        console.log(message.content);
        if(message.author === userID) {
            if(message.content === 'psst')
            {
                message.channel.send('Hello there!');
            }
        }
        
    },
};