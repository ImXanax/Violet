import chalk from "chalk";
import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function eventHandler(client: Client) {
  try {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles: string[] = fs
      .readdirSync(eventsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of eventFiles) {
      try {
        const filePath = path.join('file://',eventsPath, file);
        const { default: event } = await import(filePath);
        // console.log(chalk.bgYellow(`- ${event}`));
        if (event.once) {
          client.once(event.name, (...args) => event.run(...args));
        } else {
          client.on(event.name, (...args) => event.run(...args));
        }
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
