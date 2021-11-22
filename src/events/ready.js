const { Embed } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const embed = new MessageEmbed().setDescription(`\`\`\`All System's Operational\`\`\``).setColor('#36057c')
        client.channels.cache.get('762670306824290321').send({embeds:[embed]});
        console.log('✅ The bot is online -l||l-');
    },
};