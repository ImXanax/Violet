const { Embed } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Levels = require(`../funcs/Levels`);
module.exports = {
  name: "messageCreate",
  on: true,
  async execute(message, client) {
    if (message.author.bot) return;
    //DM
    if (message.channel.type === "DM") {
      if (message.author.bot) return;
      const dmEmbed = new MessageEmbed()
        .setTitle(`DM FROM: ${message.author.tag}`)
        .setDescription(`**__MESSAGE:__**\n\`\`\`${message.content}\`\`\``)
        .setThumbnail(message.author.displayAvatarURL({ format: "jpg" }))
        .setFooter({ text: `ID: ${message.author.id} | ${message.createdAt}` })
        .setColor("#F28C28");
      client.channels
        .fetch("1007029324915945482")
        .then((chl) => {
          chl.send({ embeds: [dmEmbed] });
        })
        .catch((e) => console.log(`ERR FETCHING CHANNEL: ${e}`));
    }

    //LEVEL SYSTEM
    const randomXp = Math.floor(Math.random() * 9) + 1; //1-15
    const hasLeveledUp = await Levels.addXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      const levelUpEmbed = new MessageEmbed()
        .setDescription(
          `***__YOU HAVE LEVELED UP__***\n*${
            user.level - 1
          }* <:pick1:1014180863786881145> <:dot7:866171765759934494><:dot6:866171711749881856><:dot5:866171671907008543><:dot2:866171407023865876> <:pick2:1014180745289420800> **${
            user.level
          }**`
        )
        .setColor("#36057c")
        .setThumbnail(
          message.author.displayAvatarURL({ format: "jpg", dynamic: true })
        );
      message.reply({
        content: `<@!${message.author.id}>`,
        embeds: [levelUpEmbed],
      });
    }
  },
};
