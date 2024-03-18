import {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import * as duration from "duration-fns";
import { Command } from "../../structures/Command.js";
import { X } from "../../funcs/Xan.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("How long was i awake for?"),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      const uptime = duration.normalize({
        milliseconds: interaction.client.uptime,
      });
      let timeString: string = "";
      Object.entries(uptime).forEach((timeValue) => {
        if (timeValue[1] !== 0)
          timeString += `${timeValue[1]} ${timeValue[0]} `;
      });
      const timeEmbed = new EmbedBuilder()
        .setDescription(`**${timeString}**`)
        .setColor(X.hex.primary);
      interaction.reply({ embeds: [timeEmbed] });
    } catch (err) {
      console.error(err);
    }
  },
});
