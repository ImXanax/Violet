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
    .setName("userinfo")
    .setDescription("information about the user specified")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("the user which you would like to see information for")
        .setRequired(false)
    ),
  async execute(ctx, client) {
    const u = ctx.options.getUser("user");
    let userEmbed = new MessageEmbed();

    if (!u) {
      const pfp = await ctx.member.displayAvatarURL({ format: "jpg" });
      userEmbed
        .setTitle(`${ctx.user.tag}`)
        .setDescription(
          `
          **ACCOUNT** <@!${ctx.user.id}>
          **NICKNAME:** ${ctx.member.nickname}
          **ID:** ${ctx.user.id}
          **JOINED AT:**\n ${ctx.member.joinedAt}
          **CREATED ACCOUNT:**\n ${ctx.user.createdAt}
          `
        )
        .setColor(ctx.member.displayHexColor)
        .setThumbnail(pfp);
      return ctx.reply({ embeds: [userEmbed] });
    } else if (u) {
      try {
        const m = await ctx.guild.members.fetch(u.id);

        userEmbed
          .setTitle(`${u.tag}`)
          .setDescription(
          `
          **ACCOUNT** <@!${u.id}>
          **NICKNAME:** ${m.nickname}
          **ID:** ${u.id}
          **JOINED AT:**\n ${m.joinedAt}
          **CREATED ACCOUNT:**\n ${u.createdAt}  
          `
          )
          .setThumbnail(m.displayAvatarURL({ format: "jpg" }))
          .setColor(m.displayHexColor);

        return ctx.reply({ embeds: [userEmbed] });
      } catch (e) {
        console.error(e);
      }
    }
  },
};
