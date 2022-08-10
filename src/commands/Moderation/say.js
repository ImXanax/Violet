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
    .setName("say")
    .setDescription("sends your message to the specified channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel the message will be sent in")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("the message that will be sent to the user")
        .setRequired(true)
    ),
  async execute(ctx, client) {
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    const msg = ctx.options.getString("text");
    const chl = ctx.options.getChannel("channel");
    if (!isAdmin) {
      const img = new MessageAttachment("src/assets/img/x.png");
      return ctx.reply({ files: [img] });
    }
    //   let chlEmbed = new MessageEmbed()
    //     .setTitle()
    //     .setDescription()
    //     .setColor("#0014e9");
    chl.send({ content: msg }).then(() => {
      ctx.reply({ content: `\`${msg}\` has been sent to <#${chl.id}>` });
    });
  },
};
