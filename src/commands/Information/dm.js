const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed, Message} = require("discord.js");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('dm')
    .setDescription('sends DM')
    .addStringOption(option =>option.setName('text').setDescription('Message You would like to send'))
    .addUserOption(option => option.setName('target').setDescription('person you want to send the Dm to')),
    async execute(ctx,client){
        const isAdmin = ctx.member.roles.cache.has("734431567912370196");
        const text = ctx.options.getString('text');
        const target = ctx.options.getUser('target');
        if(isAdmin){

            const embed  = new MessageEmbed().setDescription(`${text}`).setColor("#36057c")
            await target.send({embeds:[embed]})
                .then(()=>{ctx.reply({content:"Message Sent",ephemeral:true})})
                .catch((err)=>{console.log(err)})
        }else{
            ctx.reply({content:`You don't have permissions to use this`})
        }
    }
}