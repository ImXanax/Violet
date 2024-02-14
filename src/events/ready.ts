import { ActivityType, Client } from "discord.js";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;
    client.application.commands.fetch().then(c=>c.map(cmd=>{
      console.log(cmd.name)
    }))
    console.log(`🟪 OPERATIONAL`);
    client.user.setPresence({ activities: [{ name: "You" }], status: "dnd" });
  });
};
