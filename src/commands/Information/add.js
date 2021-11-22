const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('add')
        .setDescription('How long the bot has been operational')
        .addIntegerOption(option => 
            option.setName("num")
                .setDescription('First Number')
                .setRequired(true))
        .addIntegerOption(option2 =>
            option2.setName("num2")
                .setDescription('Second Number')
                .setRequired(true)),
    async execute(interaction){ 
        const num1 = options.getNumber('num1')
        const num2 = options.getNumber('num2')
        interaction.reply({
            content: `Sum: ${num1+num2}`,
            ephemeral: true,
        })
    }
}