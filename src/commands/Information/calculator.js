const {SlashCommandBuilder} = require('@discordjs/builders');
const { execute } = require('../../events/ready');
const wait = require('util').promisify(setTimeout);
const {MessageActionRow , MessageButton , MessageEmbed, Message} = require("discord.js");
module.exports = {
    data:new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('Calculates'),
    //.addStringOption(option =>option.setName('text').setDescription('Message You would like to send')),
    async execute(ctx,client){
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel("Primary")
                    .setStyle("PRIMARY")
            )
        
        await ctx.reply({content:"wokring ", components: [row]})

        const filter = i =>{
            i.deferUpdate();
            return i.user.id === ctx.user.id;
        };
        
        ctx.awaitMessageComponent({filter,componentType:'BUTTON',time:15000})
            .then(interaction => interaction.editReply('You Clicked Button'))
            .catch(err => console.log(" n o interactions were collected"))
    }
}