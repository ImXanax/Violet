const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("displays your or a users avatar")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user you would see the avatar for")
        .setRequired(false)
    ),
  async execute(ctx, client) {
    const u = ctx.options.getUser("user");
    let avatarEmbed = new MessageEmbed();
    if (!u) {
      avatarEmbed
        .setImage(ctx.member.displayAvatarURL({ format: "jpg", size: 1024 }))
        .setColor("#0014e9");
      ctx.reply({ embeds: [avatarEmbed] });
    } else if (u) {
      avatarEmbed
        .setImage(u.displayAvatarURL({ format: "jpg", size: 1024 }))
        .setColor("#36057c");
      ctx.reply({ embeds: [avatarEmbed] });
    }
  },
};
