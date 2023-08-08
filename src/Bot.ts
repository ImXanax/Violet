import { Client , ClientOptions} from "discord.js";
import ready from "./listeners/ready"
import interactionCreate from "./listeners/interactionCreate";
import * as dotenv from 'dotenv'
dotenv.config();
console.log("⬛ LOADING...");
const client = new Client({
    intents: []
});
ready(client)
interactionCreate(client)
client.login(process.env.token)