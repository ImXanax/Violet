const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed, Message} = require("discord.js");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies With Pong'),
    async execute(interaction){
        const embed  = new MessageEmbed().setDescription("Pong!").setColor("#36057c")
        interaction.reply({embeds:[embed]});
    }
}