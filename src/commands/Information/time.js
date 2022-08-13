const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
} = require("discord.js");
const moment = require('moment-timezone')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("displays summary of timezones"),
  async execute(ctx, client) {
      const dateEmbed = new MessageEmbed()
        .setTitle('__TIMEZONES__')
        .setDescription(`
        :flag_us: \`LA/PDT:\`\n ${moment().tz('America/Los_Angeles').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_us: \`LA/PST:\`\n ${moment().tz('America/Los_Angeles').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_us: \`NY/EDT:\`\n ${moment().tz('America/New_York').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_us: \`NY/EST:\`\n ${moment().tz('America/New_York').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_au: \`AU/EST:\`\n ${moment().tz('Australia/Sydney').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_jp: \`TK/JST:\`\n ${moment().tz('Asia/Tokyo').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_ir: \`IR/IRST:\`\n ${moment().tz('Asia/Tehran').format('**HH:mm** - dddd, MMMM Do')}\n
        :flag_gb: \`EU/BST:\`\n ${moment().tz('Europe/London').format('**HH:mm** - dddd, MMMM Do')}\n
        `).setColor('#36057c')

    ctx.reply({embeds:[dateEmbed]})
  },
};
