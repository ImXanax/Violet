import { ChannelType, Client, EmbedBuilder, Events, Message } from "discord.js";
import chalk from "chalk";
import { X } from "../funcs/Xan.js";

export default {
  name: Events.MessageCreate,
  async run(message: Message, client: Client) {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
      console.log(message);
      const dmLogEmbed = new EmbedBuilder()
        .addFields(
          { name: "Content:", value: `${message.content}` },
          { name: "ID:", value: `${message.author.id}` }
        )
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: message.author.avatarURL() ?? undefined,
        })
        .setFooter({ text: `Created At: ${message.createdAt}` });
        await client.channels.fetch("1012390735611433031").then((ch) => {
        if (ch?.isTextBased()) ch.send({ embeds: [dmLogEmbed] });
      });
    }
  },
};
