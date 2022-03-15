const moment = require('moment-timezone')
const { SlashCommandBuilder, time, Embed } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, Message, MessageActionRow, GuildMember, Guild } = require("discord.js");
const { execute } = require("../../events/ready");
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('shows time in different timezones'),
    async execute(ctx, client) {
        const times = new MessageEmbed()
            .setDescription(`
:flag_us:\`CALI:\`\n${moment().tz("America/Los_Angeles").format("**HH:mm** *PT* - dddd, MMMM Do")}\n
<:yeehaw:744598905332826244>\`TEXAS:\`\n${moment().tz("America/Chicago").format("**HH:mm** *CT* - dddd, MMMM Do")}\n
:flag_ir:\`IRAN:\`\n${moment().tz("Asia/Tehran").format("**HH:mm** *IRT* - dddd, MMMM Do")}`)
            .setColor(`#36057c`)
        ctx.reply({embeds:[times]})

    }
}






