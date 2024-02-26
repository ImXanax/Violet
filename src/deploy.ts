import { REST, Routes } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { config } from "dotenv";
const envFilePath = path.resolve(process.cwd(), ".dev.env");
config({ path: envFilePath });

// Construct and prepare an instance of the REST module

// and deploy your commands!
(async () => {
  try {
    const token = process.env.token;
    const guildId = process.env.guild_id;
    const clientId = process.env.client_id;
    
    const rest = new REST().setToken(token || "");
    const commands = [];
    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      // Grab all the command files from the commands directory you created earlier
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
      // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const {default: command} = await import(filePath);
        if ("data" in command.data && "run" in command.data) {
          commands.push(command.data.data.toJSON());
        } else {
          console.log(
            chalk.red(
              `[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`
            )
          );
        }
      }
    }
    console.log(chalk.bold(chalk.yellow(
      `- Refreshing ${commands.length} (/) commands.`
    )))
    if (!clientId || !guildId)
      return console.log(chalk.red("Invalid GuildId or ClientId"));
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log(chalk.bold(chalk.blue(
      `- Reloaded (/) commands.`
    )))
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
