import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../structures/Command.js";
import { X } from "../../funcs/Xan.js";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("Sends a direct message to a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to DM")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("the message you want to DM")
        .setRequired(true)
    ),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");

    
  },
});
