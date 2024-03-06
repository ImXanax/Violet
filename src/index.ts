
import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { commandHandler } from "./handlers/commandHandler.js";
import { eventHandler } from "./handlers/eventHandler.js";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";



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
  commandHandler(client)
  //Event Handler
  eventHandler(client)
  
})();
client
  .login(process.env.token)
  .then(() => console.log("🟧 Loading..."))
  .catch((err) => console.error(err));


  /*
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file: string) => file.endsWith(".js"));

    for (const file of commandFiles) {
      try {
        const filePath = path.join(commandsPath, file);
        const { default: command } = await import(filePath);
        // console.log(chalk.bgBlue(command.data.data.name));
        client.commands.set(command.data.data.name, command.data);
      } catch (err) {
        console.error(err);
      }
    }
  }


  const eventsPath = path.join(__dirname, "events");
  const eventFiles: string[] = fs
    .readdirSync(eventsPath)
    .filter((file: string) => file.endsWith(".js"));

  for (const file of eventFiles) {
    try {
      const filePath = path.join(eventsPath, file);
      const { default: event } = await import(filePath);
      // console.log(chalk.bgYellow(`- ${event.name}`));
      if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
      } else {
        client.on(event.name, (...args) => event.run(...args));
      }
    } catch (err) {
      console.error(err);
    }
  }
  */