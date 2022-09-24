const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rev")
    .setDescription("reverse")
    .addStringOption((option) =>
      option.setName("text").setDescription("the text").setRequired(true)
    ),
  async execute(ctx, client) {
    const str = ctx.options.getString("text");
    let rev = []
    for (let i = str.length; i >= 0; i--) {
        rev.push(str[i])
    }
    const revEmbed = new MessageEmbed()
      .setDescription(`**INPUT:** ${str}\n**OUTPUT:** ${rev.join('')}`)
      .setColor("#36057c");
    ctx.reply({ embeds: [revEmbed] });
  },
};
