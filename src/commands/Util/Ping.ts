import {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../structures/Command.js";
import { X } from "../../funcs/Xan.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Can you feel my heart"),
  async run(interaction: ChatInputCommandInteraction) {
    try {
      const newEmbed = new EmbedBuilder()
        .setDescription("Pinging...")
        .setColor(X.hex.secondary);
      const sent = await interaction.reply({
        embeds: [newEmbed],
        fetchReply: true,
      });
      newEmbed
        .setDescription(
          `- **LATENCY:** ${
            sent.createdTimestamp - interaction.createdTimestamp
          }ms.\n- **PING:** ${interaction.client.ws.ping}ms`
        )
        .setColor(X.hex.primary);
      interaction.editReply({ embeds: [newEmbed] });
    } catch (err) {
      console.error(err);
    }
  },
});
