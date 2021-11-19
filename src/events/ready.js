const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const embed = new MessageEmbed()
            .setDescription("\`\`\` IM BACK BITCH \`\`\`")
            .setColor('#03f2ff')
        client.channels.cache.get('762670306824290321').send("READY");
        console.log('Ready!');
    },
};