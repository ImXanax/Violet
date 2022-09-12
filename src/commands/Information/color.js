const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");
const { color } = require("canvacord/src/Canvacord");
const Canvacord = require("canvacord/src/Canvacord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription("displays hex color code")
    .addStringOption((option) =>
      option
        .setName("hex")
        .setDescription("the hex code for the color you would like to see")
        .setRequired(true)
    ),
  async execute(ctx, client) {
    //the hex input
    const hex = ctx.options.getString("hex");
    //validate syntax of hex
    const startsWithTag = hex.startsWith("#", 0);
    const colorCode = startsWithTag ? hex : `#${hex}`;
    //check if input is hex
    const regHex = new RegExp(/#[0-9a-f]{6}/, "i");
    const isHex = regHex.test(colorCode);

    //if all paramaters passed
    if (isHex) {
      const hexImg = await Canvacord.color(colorCode, false, 150, 1000);
      const img = new MessageAttachment(hexImg).setName("color.jpg");
      const colorEmbed = new MessageEmbed()
        .setImage(`attachment://color.jpg`)
        .setColor(colorCode);

      ctx
        .reply({
          content: `__**${colorCode}**__`,
          embeds: [colorEmbed],
          files: [{ name: img.name, attachment: hexImg }],
        })
        .then(() => {
          console.log(`success`);
        })
        .catch((e) => {
          console.error(`ERR ${e}`);
        });
    } // if params dont match a hex code
    else {
      ctx.reply({
        content: `**${colorCode}** IS NOT A HEX CODE\n__HEX:__*#41fca2*`,
      });
    }
  },
};
