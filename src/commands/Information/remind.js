const {GuildMember,MessageEmbed, Message} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {addMilliseconds}=require('date-fns')
const parse = require('parse-duration')
const { execute } = require('../../events/messageCreate');
const mongoose = require('mongoose')
const remindSchema = require('../../schema/remindSchema.js');
module.exports = {
    data:new SlashCommandBuilder()
        .setName('remind')
        .setDescription('sends DM for no reason')
        .addStringOption(option => option.setName('text').setDescription('what you want to be reminded about.'))
        .addNumberOption(option => option.setName('time').setDescription("the time you want to be reminded")),
    async execute(ctx){
        const text = ctx.options.getString('text')
        const time = ctx.options.getNumber('time')
        
        const timeStr = isNan(time)?time:`${time}hr`
        const durationMs = parse(timeStr)
        if(!durationMs) return console.log("err at durationMs")
        const sendAt = addMilliseconds(new Date(), durationMs);


        const em = new MessageEmbed()
            .setName('Reminder Created')
            .setDescription(`Reminder: ${text}\nSend At: ${time}`)
            .setColor("#002233")

        // left here
        const dm = await ctx.member.createDM();
        await dm.send({embeds:[em]})
    }
}