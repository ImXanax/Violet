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
    .setName("join")
    .setDescription("manual labor if the bot was offline")
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("str").setDescription("tha number").setRequired(true)
    ),
  async execute(ctx, client) {
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    if (!isAdmin) {
      return ctx.reply("You lack the permission to use this command.");
    }
    const user = ctx.options.getUser("user");
    const str = ctx.options.getString("str");
    ctx.guild.members
      .fetch(user.id)
      .then((member) => {

        let date = new Date(member.user.createdTimestamp);
        date = `\`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${
          date.getMinutes()
        }:${date.getSeconds()}\``;
        let joined = new Date(member.joinedTimestamp)

        const welcomeEmbed = new MessageEmbed()
          .setTitle(`𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ${member.user.tag}`)
          .setDescription(
            `𝗕𝗔𝗟𝗗 𝗖𝗢𝗗𝗘: ${str}\n𝗣𝗥𝗢𝗙𝗜𝗟𝗘: <@!${member.id}>\n𝗖𝗥𝗘𝗔𝗧𝗘𝗗: ${date}`
          )
          .setColor("#36057c")
          .setThumbnail(member.displayAvatarURL({ format: "jpg" }))
          .setFooter({ text: `ID: ${member.id} | JOINED: ${joined.toUTCString()}`});

        
        const wlChannelId = `1007018534242631730`;
        client.channels
          .fetch(wlChannelId)
          .then((chl) => {
            chl.send({ embeds: [welcomeEmbed] });
          })
          .catch((e) => console.error(`ERR FETCHING CHANNEL: ${e}`));
      })
      .catch((e) => console.error(`ERR in getting member: ${e}`));
  },
};
