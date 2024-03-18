import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command.js";
import SimpleFm from "@solely/simple-fm";

import { resolve } from "path";
import { config } from "dotenv";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";
const envFilePath = resolve(process.cwd(), envFile);
config({ path: envFilePath });

const fetchLastFmData = async () => {
  const baseUrl = "http://ws.audioscrobbler.com/2.0";
  const method = "user.getinfo";
  const user = "lmxanax";
  const apiUri = `${baseUrl}?method=${method}&user=${user}&api_key=${process.env.lastfm_api}&format=json`;

  const res = await fetch(apiUri);
  return res;
};

export default new Command({
  data: new SlashCommandBuilder()
    .setName("fm")
    .setDescription("displays your last fm scrobbles"),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      if (!process.env.lastfm_api) return;
      await interaction.deferReply();
      const data = await fetchLastFmData();
      console.log(data);
      interaction.followUp(data.statusText);
    } catch (err) {
      interaction.followUp("failed");
      console.log(err);
    }
  },
});
