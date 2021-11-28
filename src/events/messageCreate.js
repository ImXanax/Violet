const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(client,message){
      if(message.channel.type === 'DM'){
          if(message.content==='hi'){
            let response = new MessageEmbed()
                .setDescription('Test')
                .setColor('#36057c')
             message.author.send({embed:[response]})
            }
        }
    },
};