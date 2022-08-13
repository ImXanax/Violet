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
    .setName("role")
    .setDescription("sends your message to the specified channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("the channel the message will be sent in")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("str").setDescription("o").setRequired(true)
    ),
  async execute(ctx, client) {
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    const chl = ctx.options.getChannel("channel");
    const str = ctx.options.getString("str")
    if (!isAdmin) {
      return ctx.reply("You lack the permission to use this command.");
    }

    const roleEmbed1 = new MessageEmbed()
      .setDescription(
        `
        **__COLORS:__**
        <:Raven:866775351622762526> **Wither ** #000000\n <:Lightning:866775421340352524> **Golem** #dadada\n <:Apocalypse:866787694239154266> **Overworld** #01e3ae\n <:Moonlight:866775523195355207> **Elytra** #b1bdf0\n <:Waterfall:866775592712011787> **Diamond** #5e80Fb\n <:Butterfly:866775676392570880> **River** #0044FF\n <:Vanilla:866775941475467284> **Desert** #ffc0a0\n <:Clouds:866776007980875786> **Badlands** #ff9393\n <:Zephyr:866776168203550780> **Tulip** #ed9fd7\n        
        `
      )
      .setColor("#36057c");
    const roleEmbed2 = new MessageEmbed()
      .setDescription(
        `
    <:Riot:866776322559049758> **Shulker** #bf99e0\n <:Euphoria:866776409292406844> **Portal** #Df5bdf\n <:Cyberpunk:866776491266146304> **Enderman** #cb0ab8\n <:Violet:866776625923883068> **Void** #8e51e9\n <:Amethyst:866777697798979623> **Endermite** #7313c8\n <:Olive_Branch:866778299384856596> **Turtle** #9dd891\n <:Serpent_Green:866778478724775976> **Kelp** #4e812c\n <:Sunlight:866778568835334194> **Sand** #ffe58c\n <:Torch:866778612186611722> **Blaze** #ffd816\n <:Jumpsuit:866778672409214986> **Lava** #ff812d\n <:Chrysalis:866778728326627328> **Nether** #ed3030\n <:Neon_Red:866778777727926292> **Magma** #b70f0f\n
    `
      )
      .setColor("#36057c");

    const pronounEmbed = new MessageEmbed()
      .setDescription(`
        **__PRONOUNS:__**

        🔵 He/Him
🔴 She/Her
🟡 They/Them
⚪ Neopronouns
🟣 Ask For Pronouns
      `)
      .setColor("#36057c");

const miscEmbed = new MessageEmbed()
      .setDescription(`
        **__ANNOUNCEMENTS:__**
        <:dot10:866172039450066964> *** ANNOUNCEMENTS |*** *This role will be pinged for general server updates, news, changes or server events*\n
        <:dot9:866172008441446420> *** MINECRAFT |*** *This role will be pinged for Minecraft gaming events, SMP updates & changes*\n
        <:dot7:866171765759934494> *** BALDCHAT |*** *This role will be pinged for planned voice calls in the voice channels*\n
      `)
      .setColor("#36057c");
    if(str === '1') return chl.send({embeds:[roleEmbed1]})
    else if(str === '2') return chl.send({embeds:[roleEmbed2]})
    else if(str === '3') return chl.send({embeds:[pronounEmbed]})
    else if(str === '4') return chl.send({embeds:[miscEmbed]})
  },
};
