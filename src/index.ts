import { config } from "dotenv";
import { resolve } from "path";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { Vclient } from "./structures/Vclient";
import {commandHandler} from "./handlers/commandHandler";
import {eventHandler} from "./handlers/eventHandler";
import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";

const envFile = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";
const envFilePath = resolve(process.cwd(), envFile);
config({ path: envFilePath });

const client = new Vclient({ intents: [GatewayIntentBits.Guilds] });


(async () => {
  commandHandler(client)
  eventHandler(client)
  ready(client)
  interactionCreate(client)
})();
client.login(process.env.token);

