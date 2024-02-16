import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";

export async function eventHandler(client:Client) {
  try {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles: string[] = fs
      .readdirSync(eventsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const {default: event} = await require(filePath)
      console.log(event)
      if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
      } else {
        client.on(event.name, (...args) => event.run(...args));
      }
    }
  } catch (err) {
    console.error(err);
  }
}
