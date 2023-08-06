import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} from "discord.js";
import axios from "axios";

import { Command } from "../Command";

export const Cat: Command = {
  name: "cat",
  description: "Returns a cat image",
  type: ApplicationCommandType.ChatInput,

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const apiUrl = `${process.env.cat_url}?api_key=${process.env.cat_api}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const img = new AttachmentBuilder(response.data[0].url);
        interaction.followUp({ files: [img] });
      })
      .catch((e) => {
        interaction.followUp({content:"failed to meow"})
        console.error(`Interaction Failed: ${e}`)
      });
  },
};
