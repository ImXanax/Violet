import { config } from "dotenv";
import { resolve } from "path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { commandHandler } from "./handlers/commandHandler";
import { eventHandler } from "./handlers/eventHandler";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";
const envFilePath = resolve(process.cwd(), envFile);
config({ path: envFilePath });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
  ],
});
client.commands = new Collection();

(async () => {
  //Command Handler
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(filePath);
      client.commands.set(command.data.data.name, command.data);
    }
  }
  //Event Handler
  const eventsPath = path.join(__dirname, "events");
  const eventFiles: string[] = fs
    .readdirSync(eventsPath)
    .filter((file: string) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { default: event } = await import(filePath);
    console.log(event.name);
    if (event.once) {
      client.once(event.name, (...args) => event.run(...args));
    } else {
      client.on(event.name, (...args) => event.run(...args));
    }
  }
})();

client.login(process.env.token);
