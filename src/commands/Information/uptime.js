const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const {MessageEmbed} = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('Uptime')
    .setDescription('How long the bot has been operational'),
    async execute(interaction){
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const uptime = new MessageEmbed().setDescription(`\`\`\`${duration}\`\`\``);
        await interaction.reply(uptime);
    }
}