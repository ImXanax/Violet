import {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import * as duration from "duration-fns";
import { Command } from "../../structures/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("How long was i awake for?"),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      const uptime = duration.normalize({
        milliseconds: interaction.client.uptime,
      });
      let timeString: string = ''
      const formattedUptime = Object.entries(uptime);
      formattedUptime.forEach((item) => {
        console.log(item[1]);
        if (item[1] !== 0){
            timeString += `${item[1]} ${item[0]} `
        }
      });
      const timeEmbed = new EmbedBuilder()
        .setDescription(timeString)
        .setColor(`Blurple`);
      interaction.reply({ embeds: [timeEmbed] });
    } catch (err) {
      console.error(err);
    }
  },
});
