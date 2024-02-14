import * as fs from "fs";
import * as path from "path";
import { Collection } from "discord.js";
import { Vclient } from "../structures/Vclient";

export async function eventHandler(client: Vclient) {
  try {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args: any) => event.run(...args));
      } else {
        client.on(event.name, (...args: any) => event.run(...args));
      }
    }
  } catch (err) {
    console.error(err);
  }
}
