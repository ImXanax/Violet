const { SlashCommandBuilder, time } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, Message, MessageActionRow, GuildMember, Guild } = require("discord.js");
const { execute } = require("../../events/ready");
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),
    async execute(ctx, client) {
        setTimeout(()=>{
            console.log('inside?')
        },10000)
        console.log('after?')
        
    }
}