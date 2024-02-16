import { ActivityType, Client, EmbedBuilder, Events } from "discord.js";

module.exports = {
  name: Events.ClientReady,
  async run(client: Client) {
    if (!client.user || !client.application) return;
    // client.application.commands.fetch().then(c=>c.map(cmd=>{
    //   console.log(cmd.name)
    // }))
    console.log(`🟪 OPERATIONAL`);
    client.user.setPresence({
      activities: [{ name: "You" }],
      status: "dnd",
    });
    client.channels
      .fetch("1012390735611433031")
      .then((channel) => {
        if (channel?.isTextBased()) {
          const readyEmbed = new EmbedBuilder()
            .setDescription("```FUNCTIONAL```")
            .setColor("Purple");
          channel.send({ embeds: [readyEmbed] });
        }
      })
      .catch((err) => console.log(err));
  },
};
