import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command.js";
import SimpleFm from "@solely/simple-fm";
import { resolve } from "path";
import { config } from "dotenv";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";
const envFilePath = resolve(process.cwd(), envFile);
config({ path: envFilePath });

export default new Command({
  data: new SlashCommandBuilder()
    .setName("fm")
    .setDescription("displays your last fm scrobbles"),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      if (process.env.lastfm_api) console.log(process.env.lastfm_api);
      else return;
      await interaction.deferReply();
      const fm = new SimpleFm(process.env.lastfm_api);
      await fm.user
        .getRecentTracks({ username: "lmxanax" })
        .then((res) => {
          console.log(res);
          interaction.followUp({ content: "success" });
        })
        .catch((err) => {
          interaction.followUp({ content: "failed" });
          console.error(err);
        });
    } catch (err) {
      console.log(err);
    }
  },
});