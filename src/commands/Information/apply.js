const {GuildMember,MessageEmbed, Message} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/messageCreate');
module.exports = {
    data:new SlashCommandBuilder()
    .setName('apply')
    .setDescription('sends DM for no reason'),
    async execute(ctx){
        try{
            const dm = await ctx.member.createDM()
            await dm.send({content:"hello"})
            .then(()=> {
                ctx.reply({content:"Message Sent!"})
                console.log(ctx);
            }).catch(()=>{
                ctx.reply({content:"There was an issue sending the message"});
            })
        }catch(e){
            console.error(e);
        }
    }
}