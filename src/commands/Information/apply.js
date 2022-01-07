const {GuildMember,MessageEmbed, Message} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/messageCreate');
module.exports = {
    data:new SlashCommandBuilder()
    .setName('apply')
    .setDescription('sends DM for no reason'),
    async execute(ctx){
        let dmMessage = Message;
        try{
            const dm = await ctx.member.createDM()
            dmMessage = await dm.send({content:"hello"})
        }catch(e){
            console.error(e);
        }
    }
}