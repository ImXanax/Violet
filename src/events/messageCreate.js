const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(client,message){
        if(message.content === 'Psst'){
            let response = new MessageEmbed()
                .setDescription('Hello Please Dont Use Me To Store Your Things Thanks!')
                .setColor('#36057c')
            message.author.send({embed:[response]});
        }     
    },
};