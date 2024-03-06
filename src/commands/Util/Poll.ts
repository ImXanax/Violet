import {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

import { Command } from "../../structures/Command.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Choices choices..."),
  async run(interaction: ChatInputCommandInteraction) {
    try {
      const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel("Confirm")
        .setStyle(ButtonStyle.Primary)
      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger)

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirm,cancel
      );
      interaction.reply({ components: [row], content: "Test" });
    } catch (err) {
      console.error(err);
    }
  },
});
