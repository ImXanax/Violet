import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

import { Command } from "../Command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a gretting",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "hay";
    await interaction
      .followUp({ ephemeral: true, content })
      .then((a: any) => {
        return console.log("done");
      })
      .catch((e): any => {
        return console.error(e);
      });
  },
};
