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
    ),
  async execute(ctx, client) {
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    const chl = ctx.options.getChannel("channel");
    if (!isAdmin) {
      return ctx.reply("You lack the permission to use this command.");
    }

    const roleEmbed1 = new MessageEmbed()
      .setDescription(
        `
        :Raven: **Wither**
        #000000
        :Lightning: **Golem**
        #dadada
        :Apocalypse: **Overworld**
        #01e3ae
        :Moonlight: **Elytra**
        #b1bdf0
        :Waterfall: **Diamond**
        #5e80Fb
        :Butterfly: **River**
        #0044FF
        :Vanilla: **Desert**
        #ffc0a0
        :Clouds: **Badlands**
        #ff9393
        :Zephyr: **Tulip**
        #ed9fd7        
        `
      )
      .setColor("#36057c");
    const roleEmbed2 = new MessageEmbed().setDescription(`
        :Riot: **Shulker**
        #bf99e0
        :Euphoria: **Portal**
        #Df5bdf
        :Cyberpunk: **Enderman**
        #cb0ab8
        :Violet: **Void**
        #8e51e9
        :Amethyst: **Endermite**
        #7313c8
        :Olive_Branch: **Turtle**
        #9dd891
        :Serpent_Green: **Kelp**
        #4e812c
        :Sunlight: **Sand**
        #ffe58c
        :Torch: **Blaze**
        #ffd816
        :Jumpsuit: **Lava**
        #ff812d
        :Chrysalis: **Nether**
        #ed3030
        :Neon_Red: **Magma**
        #b70f0f
    `).setColor("#36057c")

    chl.send({ embeds: [roleEmbed1, roleEmbed2] }).then(() => {
      ctx.reply({ content: `message has been sent to <#${chl.id}>` });
    });
  },
};
