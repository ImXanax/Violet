const { GuildMember, MessageEmbed, Message } = require('discord.js');
const { SlashCommandBuilder, time, userMention} = require('@discordjs/builders');
const { addMilliseconds } = require('date-fns');
const parse = require('parse-duration');
const { execute } = require('../../events/messageCreate');
const mongoose = require('mongoose');
const remindSchema = require('../../schema/remindSchema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remind')
        .setDescription('Schedules a reminder of your choice of time')
        .addStringOption(option => option.setName('time').setDescription("the time you want to be reminded"))
        .addStringOption(option => option.setName('reason').setDescription('what you want to be reminded about.')),

    async execute(ctx, client) {
        const timeInput = ctx.options.getString('time');
        const reasonInput = ctx.options.getString('reason');

        //Whole Numbers -> Hour
        const timeStr = isNaN(timeInput) ? timeInput : `${timeInput}hr`;
        const durationMs = parse(timeStr);
        if (!durationMs) return console.log("-> ERR IN PARSING");
        const sendAt = addMilliseconds(new Date(), durationMs);
        const t = time(new Date(sendAt))
        //Creating Profile In Mongo + Sending Message
        const reminder = await remindSchema.create({
            memberId: ctx.user.id,
            reason: reasonInput,
            createdAt: ctx.createdTimestamp,
            sendAt: sendAt
        }).then(() => {
            
            console.log("🔵PROFILE CREATED---");
            const reminderCreatedEmbed = new MessageEmbed()
                .setTitle("REMINDER CREATED")
                .setDescription(`**Reason:** ${reasonInput}\n**At:**${t}`)
                .setColor(`#36057c`)
            ctx.reply({ embeds: [reminderCreatedEmbed] });
        }).catch(e => { console.log(e) });
    }
}