import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command.js";
import Warn from "../../database/schemas/warnsSchema.js";
import { EmbedBuilder } from "@discordjs/builders";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("gives a user a warn")
    .addSubcommand((command) =>
      command
        .setName("add")
        .setDescription("adds a warn to user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to warn")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("the reason for the warn")
        )
    )
    .addSubcommand((command) =>
      command
        .setName("view")
        .setDescription("view warns from a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to view")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command
        .setName("remove")
        .setDescription("removes a warn from user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to remove the warn from")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("warnid")
            .setDescription("id of the warn you want to delete")
            .setRequired(true)
        )
    ),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    // Warn Add
    if (interaction.options.getSubcommand() === "add") {
      const user = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason") ?? "No Reason...";

      const warnEmbed = new EmbedBuilder()
        .setTitle("Warn Added.")
        .setColor(234122);

      const warn = new Warn({
        userId: user?.id,
        reason: reason,
      });

      warn
        .save()
        .then((doc): void => {
          warnEmbed.addFields(
            {
              name: "Reason",
              value: doc.reason,
            },
            { name: "User ID", value: doc.userId },
            { name: "Warn ID", value: doc.warnId },
            { name: "Date", value: doc.date.toDateString() }
          );
          interaction.reply({ embeds: [warnEmbed] });
        })
        .catch((err) => {
          interaction.reply({ content: `${err.msg}`, ephemeral: true });
        });
    }

    // Warn View
    if (interaction.options.getSubcommand() === "view") {
      const user = interaction.options.getUser("user");
      let formatedWarn = "";
      const warnlistEmbed = new EmbedBuilder()
        .setTitle("User Warns:")
        .setColor(234122);

      let userWarns = await Warn.find({ userId: user?.id });
      if (userWarns.length === 0) {
        interaction.reply({
          content: "User has no warns",
          ephemeral: true,
        });
      } else {
        userWarns.forEach((warn) => {
          let time = Math.floor(warn.date.getTime() / 1000).toString();
          formatedWarn += `**[${warn.warnId}]**\n${warn.reason}\n<t:${time}:R>\n\n`;
        });
        warnlistEmbed
          .setDescription(formatedWarn)
          .setFooter({ text: `User ID: ${user?.id}` });
        interaction.reply({ embeds: [warnlistEmbed] });
      }
    }

    // Warn Remove
    if (interaction.options.getSubcommand() === "remove") {
      const user = interaction.options.getUser("user");
      const id = interaction.options.getString("warnid");

      await Warn.findOneAndDelete({ userId: user?.id, warnId: id })
        .then((res) => {
          interaction.reply({content:`Warn Deleted.`})
        })
        .catch((err) => {
          interaction.reply({
            content: "There was an error deleting the warn",
            ephemeral: true,
          });
          console.error(err);
        });
    }
  },
});
