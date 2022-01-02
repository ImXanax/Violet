const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed} = require("discord.js");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
    async execute(interaction){
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY')
            );
        await interaction.reply({content:"Pong Bestie", components: [row] })
    }
}