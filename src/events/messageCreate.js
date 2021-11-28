const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message,client){
        console.log('fire');
        let userId = '413755451373518864';
        console.log('fired');
        if (message.author === userId){
            console.log('fireed');
            if(message.content ==='Hii'){
                console.log('fireeed');
                message.channel.send('HELLO');
            }
        }
    },
};