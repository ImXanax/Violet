const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
module.exports = {
    data:new SlashCommandBuilder()
    .setName('wlc')
    .setDescription('says welcome for no reason'),
    async execute(interaction){
        await interaction.reply('Welcome');
    }
}