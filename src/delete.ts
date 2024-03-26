import { REST, Routes, DataResolver } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { config } from "dotenv";
const envFilePath = path.resolve(process.cwd(), ".dev.env");
config({ path: envFilePath });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    const token = process.env.token;
    // const guildId = process.env.guild_id;
    const clientId = process.env.client_id;

    const rest = new REST().setToken(token || "");

    if (!clientId)
      return console.log(chalk.red("Invalid GuildId or ClientId"));

    rest
      .put(Routes.applicationCommands(clientId), { body: [] })
      .then(() => console.log("Successfully deleted all guild commands."))
      .catch(console.error);
  } catch (error) {
    console.error(error);
  }
})();
