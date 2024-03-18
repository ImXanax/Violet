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
    const message = interaction.options.getString("message") ?? "Nothing";
    try {
      const dmEmbed = new EmbedBuilder()
        .setDescription(message)
        .setColor(X.hex.primary);
      const resEmbed = new EmbedBuilder()
        .addFields(
          {
            name: "Message:",
            value: message,
          },
          {
            name: "User ID:",
            value: `${user?.id}`,
          },
          {
            name: "Username:",
            value: `${user?.username}`,
          }
        )
        .setFooter({
          text: `Sent At: ${interaction.createdAt}`,
          iconURL:
            user?.avatarURL({ forceStatic: true, size: 32 }) ?? undefined,
        })
        .setColor(X.hex.primary);

      const dm = await user?.createDM();
      dm?.send({ embeds: [dmEmbed] }).then(() => {
        interaction.reply({ embeds: [resEmbed] });
      });
    } catch (err) {
      interaction.reply("Failed");

      console.log(err);
    }
  },
});
