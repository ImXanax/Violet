import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../structures/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Can you feel my heart"),
  async run(client: Client, interaction: ChatInputCommandInteraction) {
    try {
      console.log(interaction)
      const newEmbed = new EmbedBuilder()
        .setDescription("Pinging...")
        .setColor("Orange");
      const sent = await interaction.reply({
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
    } catch (err) {
      console.error(err);
    }
  },
});
