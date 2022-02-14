const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed, Message} = require("discord.js");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
    async execute(ctx,client){
        const embed  = new MessageEmbed()
            .setTitle("PONG")
            .setDescription(`**Latency:** \`${Date.now() - ctx.createdTimestamp}ms\`\n**API:** \`${Math.round(client.ws.ping)}ms\``)
            .setColor("#36057c")
        ctx.reply({embeds:[embed]});
    }
}