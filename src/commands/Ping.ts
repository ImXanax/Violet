import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

import { Command } from "../Command";

export const Ping: Command = {
  name: "ping",
  description: "can you feel my heart",
  type: ApplicationCommandType.ChatInput,

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const newEmbed = new EmbedBuilder()
      .setDescription("Pinging...")
      .setColor("Orange");
    const sent = await interaction.followUp({
      embeds: [newEmbed],
      fetchReply: true,
    });
    newEmbed
      .setDescription(
        `- **LATENCY:** ${
          sent.createdTimestamp - interaction.createdTimestamp
        }ms.\n- **PING:** ${client.ws.ping}ms`
      )
      .setColor("DarkGreen");

    interaction.editReply({ embeds: [newEmbed] });
  },
};
