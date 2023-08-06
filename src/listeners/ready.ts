import { ActivityType, Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }
    await client.application.commands.set(Commands);
    console.log(`🟪 OPERATIONAL`);
    client.user.setPresence({ activities: [{ name: "You" }], status: "dnd" });
  });
};
