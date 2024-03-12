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
import { mongoConnect } from "./database/mongoConnect.js";


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
  commandHandler(client);
  //Event Handler
  eventHandler(client);
  // Connect DB
  mongoConnect()
})();
client
  .login(process.env.token)
  .then(() => console.log("🟧 Loading..."))
  .catch((err) => console.error(err));
