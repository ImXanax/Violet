import { Client, Collection } from "discord.js";
import * as fs from "fs";
import * as path from "path";

export async function commandHandler(client:Client) {
  try {
    const foldersPath = path.join(__dirname, "../commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file: string) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const { default: command } = await require(filePath);
        client.commands.set(command.data.data.name, command.data);
      }
    }
  } catch (err) {
    console.error(err);
  }
}