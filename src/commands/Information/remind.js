const {GuildMember,MessageEmbed, Message} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/messageCreate');
module.exports = {
    data:new SlashCommandBuilder()
    .setName('remind')
    .setDescription('sends DM for no reason')
    .addSubcommand(subcommand =>
        subcommand
            .setName('new')
            .setDescription('Create a new reminder')
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName('old')
            .setDescription("describes")    
            ),
    async execute(ctx){
            if(ctx.options.getSubcommand() === 'new'){
                ctx.reply('new')
            }
            else if(ctx.options.getSubcommand() === 'old'){
                ctx.reply('old')
            }
            else{
                ctx.reply('no subcommand was used')
            }

        /*try{
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
        }*/
    }
}