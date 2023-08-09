import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextChannel,
  CategoryChannel,
  TextBasedChannel,
  Embed,
} from "discord.js";

import { Command } from "../Command";

export const Sub: Command = {
  name: "sub",
  description: "submition",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "channel",
      description: "the channel",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "text",
      description: "what you want",
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const text = interaction.options.getString("text") ?? "none";
    const ch = interaction.options.getChannel("channel") as TextBasedChannel;
    
    const textEmbed = new EmbedBuilder()
      .setColor("#000000")
      .setDescription("Confirm Theory?");
    const msgEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setDescription(text)

    const deny = new ButtonBuilder()
      .setCustomId("deny")
      .setLabel("DENY")
      .setStyle(ButtonStyle.Danger);
    const conf = new ButtonBuilder()
      .setCustomId("conf")
      .setLabel("ACCEPT")
      .setStyle(ButtonStyle.Success);
    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      deny,
      conf
    );
    const response = await interaction.followUp({
      embeds: [textEmbed],
      components: [buttons],
    });
    const collectorFilter = (i: any) => i.user.id === interaction.user.id;
    try {
      const confirm = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });
      if (confirm.customId === "conf") {
        if(ch?.type === 0){
          await ch.send({embeds:[msgEmbed]})
          await confirm.update({embeds:[textEmbed.setDescription('SENT')], components:[]})
        }
      } else if (confirm.customId === "deny") {
        await confirm.update({embeds:[textEmbed.setDescription('DENIED')], components:[]})
      }
    } catch (e) {
      await interaction.editReply({ content: "took too long", components: [] });
      console.error(e);
    }
  },
};
