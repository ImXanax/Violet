const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
module.exports = {
    data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
    async execute(interaction){
        await interaction.reply('Pong!');
    }
}